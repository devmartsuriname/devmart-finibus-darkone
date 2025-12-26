import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { notifySuccess, notifyError } from '@/lib/notify'

// About page section keys in fixed Finibus order
export const ABOUT_SECTION_KEYS = [
  'inside_story',
  'why_choose',  // Shared - read-only, managed in Global Blocks
  'testimonials', // Dynamic module
  'latest_news',
  'cta'          // Shared - read-only, managed in Global Blocks
] as const

export type AboutSectionKey = typeof ABOUT_SECTION_KEYS[number]

// Section display names matching Finibus About page
export const ABOUT_SECTION_LABELS: Record<AboutSectionKey, string> = {
  inside_story: 'Inside Story',
  why_choose: 'Why Choose Us',
  testimonials: 'Testimonials',
  latest_news: 'Latest News',
  cta: 'Let\'s Talk CTA'
}

// Section type indicators
export const ABOUT_SECTION_TYPES: Record<AboutSectionKey, 'page_block' | 'shared_block' | 'dynamic_module'> = {
  inside_story: 'page_block',
  why_choose: 'shared_block',
  testimonials: 'dynamic_module',
  latest_news: 'page_block',
  cta: 'shared_block'
}

// Type definitions for About page section data
export interface ProgressStat {
  label: string
  percent: number
}

export interface InsideStoryData {
  enabled?: boolean
  section_label?: string
  title?: string
  description?: string
  main_image_url?: string
  main_image_media_id?: string | null
  cto_message?: string
  cto_name?: string
  cto_title?: string
  cto_signature_url?: string
  cto_signature_media_id?: string | null
  progress_stats?: ProgressStat[]
}

export interface LatestNewsData {
  enabled?: boolean
  section_label?: string
  section_title?: string
  view_all_label?: string
  view_all_url?: string
  posts_count?: number
}

export interface AboutPageData {
  inside_story?: InsideStoryData
  latest_news?: LatestNewsData
}

export const useAboutPageBlocks = () => {
  const [data, setData] = useState<AboutPageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAboutPageData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: result, error: fetchError } = await supabase
        .from('page_settings')
        .select('data')
        .eq('page_slug', 'about')
        .single()

      if (fetchError) throw fetchError
      
      const pageData = result?.data as AboutPageData | null
      setData(pageData || {})
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch About page data'
      setError(message)
      notifyError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateAboutPageData = useCallback(async (newData: AboutPageData): Promise<boolean> => {
    setLoading(true)
    const jsonData = JSON.parse(JSON.stringify(newData))
    try {
      const { error: updateError } = await supabase
        .from('page_settings')
        .update({ data: jsonData })
        .eq('page_slug', 'about')

      if (updateError) throw updateError

      setData(newData)
      notifySuccess('About page settings saved')
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save About page data'
      notifyError(message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSection = useCallback(async (
    sectionKey: 'inside_story' | 'latest_news',
    sectionData: Record<string, unknown>
  ): Promise<boolean> => {
    if (!data) return false

    const newData = {
      ...data,
      [sectionKey]: sectionData
    }

    return updateAboutPageData(newData)
  }, [data, updateAboutPageData])

  const toggleSectionEnabled = useCallback(async (
    sectionKey: 'inside_story' | 'latest_news',
    enabled: boolean
  ): Promise<boolean> => {
    if (!data) return false

    const currentSection = data[sectionKey] || {}
    
    const newData = {
      ...data,
      [sectionKey]: {
        ...currentSection,
        enabled
      }
    }

    return updateAboutPageData(newData)
  }, [data, updateAboutPageData])

  const getSectionEnabled = useCallback((sectionKey: 'inside_story' | 'latest_news'): boolean => {
    if (!data) return true
    
    const section = data[sectionKey]
    
    if (typeof section === 'object' && section !== null) {
      return section.enabled !== false
    }
    
    return true
  }, [data])

  return {
    data,
    loading,
    error,
    fetchAboutPageData,
    updateAboutPageData,
    updateSection,
    toggleSectionEnabled,
    getSectionEnabled,
    ABOUT_SECTION_KEYS,
    ABOUT_SECTION_LABELS,
    ABOUT_SECTION_TYPES
  }
}