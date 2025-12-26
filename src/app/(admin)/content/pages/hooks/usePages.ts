import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { notifySuccess, notifyError } from '@/lib/notify'

export interface Page {
  id: string
  slug: string
  title: string
  meta_title: string | null
  meta_description: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface PageUpdateInput {
  title: string
  meta_title?: string | null
  meta_description?: string | null
  is_published: boolean
}

export const usePages = () => {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await supabase
        .from('pages')
        .select('*')
        .order('title', { ascending: true })

      if (fetchError) throw fetchError
      setPages(data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch pages'
      setError(message)
      notifyError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePage = useCallback(async (id: string, input: PageUpdateInput): Promise<boolean> => {
    setLoading(true)
    try {
      // Validate title length
      if (input.title.length > 100) {
        throw new Error('Title must be 100 characters or less')
      }
      
      // Validate meta_title length
      if (input.meta_title && input.meta_title.length > 70) {
        throw new Error('Meta title must be 70 characters or less')
      }
      
      // Validate meta_description length
      if (input.meta_description && input.meta_description.length > 160) {
        throw new Error('Meta description must be 160 characters or less')
      }

      const { error: updateError } = await supabase
        .from('pages')
        .update({
          title: input.title,
          meta_title: input.meta_title || null,
          meta_description: input.meta_description || null,
          is_published: input.is_published,
        })
        .eq('id', id)

      if (updateError) throw updateError

      notifySuccess('Page updated successfully')
      await fetchPages()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update page'
      notifyError(message)
      return false
    } finally {
      setLoading(false)
    }
  }, [fetchPages])

  return {
    pages,
    loading,
    error,
    fetchPages,
    updatePage,
  }
}