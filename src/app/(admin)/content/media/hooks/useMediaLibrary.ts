import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { notifySuccess, notifyError } from '@/lib/notify'
import type { Tables } from '@/integrations/supabase/types'

type MediaItem = Tables<'media'>

export const useMediaLibrary = () => {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMedia = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        console.error('Error fetching media:', fetchError)
        setError(fetchError.message)
        return
      }

      setMedia(data || [])
    } catch (err) {
      console.error('Error fetching media:', err)
      setError('Failed to fetch media')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  const uploadMedia = async (
    file: File,
    metadata: { title?: string; alt_text?: string }
  ): Promise<boolean> => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        notifyError('You must be logged in to upload files')
        return false
      }

      // Generate unique path: userId/timestamp-filename
      const timestamp = Date.now()
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const storagePath = `${user.id}/${timestamp}-${sanitizedFilename}`

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(storagePath, file)

      if (uploadError) {
        console.error('Storage upload error:', uploadError)
        notifyError(`Upload failed: ${uploadError.message}`)
        return false
      }

      // Get public URL (bucket is PUBLIC)
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(storagePath)

      // Insert metadata row
      const { error: insertError } = await supabase
        .from('media')
        .insert({
          filename: file.name,
          storage_path: storagePath,
          public_url: urlData.publicUrl,
          file_type: file.type,
          file_size: file.size,
          title: metadata.title || null,
          alt_text: metadata.alt_text || null,
          uploaded_by: user.id,
        })

      if (insertError) {
        console.error('Database insert error:', insertError)
        notifyError(`Failed to save metadata: ${insertError.message}`)
        // Attempt to clean up the uploaded file
        await supabase.storage.from('media').remove([storagePath])
        return false
      }

      notifySuccess('File uploaded successfully')
      await fetchMedia()
      return true
    } catch (err) {
      console.error('Upload error:', err)
      notifyError('An unexpected error occurred during upload')
      return false
    }
  }

  const deleteMedia = async (mediaItem: MediaItem): Promise<boolean> => {
    try {
      // Delete from storage first
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([mediaItem.storage_path])

      if (storageError) {
        console.error('Storage delete error:', storageError)
        notifyError(`Storage delete failed: ${storageError.message}`)
        return false
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', mediaItem.id)

      if (dbError) {
        console.error('Database delete error:', dbError)
        notifyError(`Database delete failed: ${dbError.message}`)
        return false
      }

      notifySuccess('File deleted successfully')
      await fetchMedia()
      return true
    } catch (err) {
      console.error('Delete error:', err)
      notifyError('An unexpected error occurred during deletion')
      return false
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      notifySuccess('URL copied to clipboard')
    }).catch(() => {
      notifyError('Failed to copy URL')
    })
  }

  return {
    media,
    isLoading,
    error,
    refetch: fetchMedia,
    uploadMedia,
    deleteMedia,
    copyToClipboard,
  }
}

// Utility function for formatting file sizes
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}