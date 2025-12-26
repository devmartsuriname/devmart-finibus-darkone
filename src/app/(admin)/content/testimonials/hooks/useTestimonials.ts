import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAdminNotify } from '@/lib/notify'

export interface Testimonial {
  id: string
  author_name: string
  author_title: string | null
  company: string | null
  quote: string
  rating: number | null
  avatar_media_id: string | null
  featured: boolean
  status: 'draft' | 'published'
  display_order: number | null
  published_at: string | null
  created_at: string
  updated_at: string
  // Joined data
  avatar_url?: string | null
}

export interface TestimonialInput {
  author_name: string
  author_title?: string | null
  company?: string | null
  quote: string
  rating?: number | null
  avatar_media_id?: string | null
  featured?: boolean
  status: 'draft' | 'published'
  display_order?: number | null
  published_at?: string | null
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { notifySuccess, notifyError } = useAdminNotify()

  const fetchTestimonials = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch testimonials with joined avatar URL
      const { data, error: fetchError } = await supabase
        .from('testimonials')
        .select(`
          *,
          avatar:avatar_media_id (public_url)
        `)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      // Transform data to flatten media URLs
      const transformedData: Testimonial[] = (data || []).map((testimonial: any) => ({
        ...testimonial,
        avatar_url: testimonial.avatar?.public_url || null,
        avatar: undefined,
      }))

      setTestimonials(transformedData)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch testimonials'
      setError(message)
      console.error('Error fetching testimonials:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const createTestimonial = useCallback(async (input: TestimonialInput): Promise<boolean> => {
    try {
      const insertData = {
        author_name: input.author_name,
        quote: input.quote,
        author_title: input.author_title || null,
        company: input.company || null,
        rating: input.rating || null,
        avatar_media_id: input.avatar_media_id || null,
        featured: input.featured || false,
        status: input.status,
        display_order: input.display_order || null,
        published_at: input.status === 'published' ? (input.published_at || new Date().toISOString()) : null,
      }

      const { error: insertError } = await supabase
        .from('testimonials')
        .insert(insertData as any)

      if (insertError) {
        throw insertError
      }

      notifySuccess('Testimonial created successfully')
      await fetchTestimonials()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create testimonial'
      notifyError(`Error creating testimonial: ${message}`)
      console.error('Error creating testimonial:', err)
      return false
    }
  }, [fetchTestimonials, notifySuccess, notifyError])

  const updateTestimonial = useCallback(async (id: string, input: Partial<TestimonialInput>): Promise<boolean> => {
    try {
      const updateData: Record<string, unknown> = {}
      
      if (input.author_name !== undefined) updateData.author_name = input.author_name
      if (input.author_title !== undefined) updateData.author_title = input.author_title || null
      if (input.company !== undefined) updateData.company = input.company || null
      if (input.quote !== undefined) updateData.quote = input.quote
      if (input.rating !== undefined) updateData.rating = input.rating || null
      if (input.avatar_media_id !== undefined) updateData.avatar_media_id = input.avatar_media_id || null
      if (input.featured !== undefined) updateData.featured = input.featured
      if (input.display_order !== undefined) updateData.display_order = input.display_order || null
      
      if (input.status !== undefined) {
        updateData.status = input.status
        if (input.status === 'published') {
          updateData.published_at = input.published_at || new Date().toISOString()
        }
      }

      const { error: updateError } = await supabase
        .from('testimonials')
        .update(updateData as any)
        .eq('id', id)

      if (updateError) {
        throw updateError
      }

      notifySuccess('Testimonial updated successfully')
      await fetchTestimonials()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update testimonial'
      notifyError(`Error updating testimonial: ${message}`)
      console.error('Error updating testimonial:', err)
      return false
    }
  }, [fetchTestimonials, notifySuccess, notifyError])

  const deleteTestimonial = useCallback(async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (deleteError) {
        throw deleteError
      }

      notifySuccess('Testimonial deleted successfully')
      await fetchTestimonials()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete testimonial'
      notifyError(`Error deleting testimonial: ${message}`)
      console.error('Error deleting testimonial:', err)
      return false
    }
  }, [fetchTestimonials, notifySuccess, notifyError])

  return {
    testimonials,
    isLoading,
    error,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch: fetchTestimonials,
  }
}
