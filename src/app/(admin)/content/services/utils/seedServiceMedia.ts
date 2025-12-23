/**
 * Service Media Seeding Utility
 * 
 * This file provides utilities to seed service icons and process step images
 * from the Finibus template assets into the Media Library and link them to
 * the Services and Process Steps tables.
 * 
 * Usage: Run from the Admin UI via the ServiceMediaSeeder component.
 */

import { supabase } from '@/integrations/supabase/client'

// Base URL for public assets served from the app
const PUBLIC_ASSETS_BASE = '/uploads/services'

// Supabase storage base URL (from existing media records)
const STORAGE_BASE_URL = 'https://hwrlkrrdqbtgyjpsrijh.supabase.co/storage/v1/object/public/media'

// Service icon mapping: display_order -> icon filename
export const SERVICE_ICON_MAP: Record<number, string> = {
  1: 'service-icon-1.png', // Web Design
  2: 'service-icon-2.png', // App Design
  3: 'service-icon-3.png', // Developing
  4: 'service-icon-4.png', // Graphic Design
  5: 'service-icon-5.png', // Video Animation
  6: 'service-icon-6.png', // 3D Design
  7: 'service-icon-7.png', // UI/UX Design
}

// Process step image mapping: step_number -> image filename
export const STEP_IMAGE_MAP: Record<number, string> = {
  1: 'step-1.png',
  2: 'step-2.jpg',
  3: 'step-3.jpg',
}

interface SeedResult {
  success: boolean
  message: string
  details?: {
    iconsUploaded: number
    stepsUploaded: number
    servicesUpdated: number
    processStepsUpdated: number
  }
}

/**
 * Fetches a file from the public URL and returns it as a Blob
 */
async function fetchPublicAsset(filename: string): Promise<Blob> {
  const response = await fetch(`${PUBLIC_ASSETS_BASE}/${filename}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${filename}: ${response.status}`)
  }
  return response.blob()
}

/**
 * Uploads an image to Supabase storage and creates a media record
 */
async function uploadAndCreateMediaRecord(
  filename: string,
  storagePath: string,
  altText: string,
  userId: string
): Promise<string | null> {
  try {
    // Check if media record already exists
    const { data: existingMedia } = await supabase
      .from('media')
      .select('id')
      .eq('storage_path', storagePath)
      .maybeSingle()

    if (existingMedia) {
      console.log(`Media already exists for ${storagePath}, returning existing ID`)
      return existingMedia.id
    }

    // Fetch the file from public assets
    const blob = await fetchPublicAsset(filename)
    const file = new File([blob], filename, { type: blob.type })

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(storagePath, file, { upsert: true })

    if (uploadError) {
      console.error(`Upload error for ${filename}:`, uploadError)
      throw uploadError
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(storagePath)

    // Create media record
    const { data: mediaRecord, error: insertError } = await supabase
      .from('media')
      .insert({
        filename,
        storage_path: storagePath,
        public_url: urlData.publicUrl,
        file_type: file.type || (filename.endsWith('.png') ? 'image/png' : 'image/jpeg'),
        file_size: file.size,
        title: altText,
        alt_text: altText,
        uploaded_by: userId,
      })
      .select('id')
      .single()

    if (insertError) {
      console.error(`Insert error for ${filename}:`, insertError)
      throw insertError
    }

    return mediaRecord.id
  } catch (error) {
    console.error(`Failed to process ${filename}:`, error)
    return null
  }
}

/**
 * Seeds all service icons into the Media Library and links them to services
 */
export async function seedServiceIcons(userId: string): Promise<{ uploaded: number; updated: number }> {
  let uploaded = 0
  let updated = 0

  // Get all services ordered by display_order
  const { data: services, error: fetchError } = await supabase
    .from('services')
    .select('id, display_order, title')
    .order('display_order')

  if (fetchError || !services) {
    throw new Error(`Failed to fetch services: ${fetchError?.message}`)
  }

  for (const service of services) {
    const iconFilename = SERVICE_ICON_MAP[service.display_order]
    if (!iconFilename) continue

    const storagePath = `finibus/icons/${iconFilename}`
    const altText = `${service.title} icon`

    const mediaId = await uploadAndCreateMediaRecord(
      iconFilename,
      storagePath,
      altText,
      userId
    )

    if (mediaId) {
      uploaded++

      // Update service with icon_media_id
      const { error: updateError } = await supabase
        .from('services')
        .update({ icon_media_id: mediaId })
        .eq('id', service.id)

      if (!updateError) {
        updated++
      }
    }
  }

  return { uploaded, updated }
}

/**
 * Seeds all process step images into the Media Library and links them to steps
 */
export async function seedProcessStepImages(userId: string): Promise<{ uploaded: number; updated: number }> {
  let uploaded = 0
  let updated = 0

  // Upload the 3 step images first
  const stepMediaIds: Record<number, string> = {}

  for (const [stepNum, filename] of Object.entries(STEP_IMAGE_MAP)) {
    const storagePath = `finibus/services/${filename}`
    const altText = `Process step ${stepNum}`

    const mediaId = await uploadAndCreateMediaRecord(
      filename,
      storagePath,
      altText,
      userId
    )

    if (mediaId) {
      stepMediaIds[parseInt(stepNum)] = mediaId
      uploaded++
    }
  }

  // Get all process steps
  const { data: steps, error: fetchError } = await supabase
    .from('service_process_steps')
    .select('id, step_number')

  if (fetchError || !steps) {
    throw new Error(`Failed to fetch process steps: ${fetchError?.message}`)
  }

  // Update each step with the corresponding image
  for (const step of steps) {
    const mediaId = stepMediaIds[step.step_number]
    if (!mediaId) continue

    const { error: updateError } = await supabase
      .from('service_process_steps')
      .update({ image_media_id: mediaId })
      .eq('id', step.id)

    if (!updateError) {
      updated++
    }
  }

  return { uploaded, updated }
}

/**
 * Main seeding function that seeds both icons and step images
 */
export async function seedAllServiceMedia(): Promise<SeedResult> {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return {
        success: false,
        message: 'Authentication required. Please log in as an admin.',
      }
    }

    // Seed service icons
    const iconResult = await seedServiceIcons(user.id)

    // Seed process step images
    const stepResult = await seedProcessStepImages(user.id)

    return {
      success: true,
      message: `Successfully seeded service media.`,
      details: {
        iconsUploaded: iconResult.uploaded,
        stepsUploaded: stepResult.uploaded,
        servicesUpdated: iconResult.updated,
        processStepsUpdated: stepResult.updated,
      },
    }
  } catch (error) {
    console.error('Seed error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
