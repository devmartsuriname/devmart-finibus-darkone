import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAdminNotify } from '@/lib/notify'

// Section keys in fixed Finibus order
export const SECTION_KEYS = [
  'hero',
  'services', 
  'home_about',
  'partners',
  'portfolio',
  'why_choose',
  'testimonials',
  'blog',
  'cta'
] as const

export type SectionKey = typeof SECTION_KEYS[number]

// Section display names matching Finibus
export const SECTION_LABELS: Record<SectionKey, string> = {
  hero: 'Hero Slider',
  services: 'Services',
  home_about: 'About + Stats',
  partners: 'Partners',
  portfolio: 'Portfolio',
  why_choose: 'Why Choose Us',
  testimonials: 'Testimonials',
  blog: 'Latest Blog',
  cta: 'CTA Strip'
}

// Section type indicators
export const SECTION_TYPES: Record<SectionKey, 'ui_block' | 'dynamic_module'> = {
  hero: 'ui_block',
  services: 'dynamic_module',
  home_about: 'ui_block',
  partners: 'ui_block',
  portfolio: 'dynamic_module',
  why_choose: 'ui_block',
  testimonials: 'dynamic_module',
  blog: 'dynamic_module',
  cta: 'ui_block'
}

// Type definitions for section data
export interface HeroSlide {
  title_prefix?: string
  title_highlight?: string
  subtitle?: string
  description?: string
  cta1_label?: string
  cta1_url?: string
  cta2_label?: string
  cta2_url?: string
  image?: string
  background_media_id?: string
}

export interface StatItem {
  value?: string | number
  label?: string
  icon?: string
}

export interface PartnerItem {
  name?: string
  logo?: string
  logo_media_id?: string
  url?: string
}

export interface SkillItem {
  label?: string
  percent?: number
  sublabel?: string
}

export interface HomepageData {
  hero?: {
    enabled?: boolean
    slides?: HeroSlide[]
  }
  services?: {
    enabled?: boolean
    section_title?: string
    section_subtitle?: string
  }
  home_about?: {
    enabled?: boolean
    title?: string
    description?: string
    image_media_id?: string
    cta_label?: string
    cta_url?: string
    mission_title?: string
    mission_text?: string
    skills?: SkillItem[]
  }
  stats?: StatItem[]
  partners?: PartnerItem[] | { enabled?: boolean; items?: PartnerItem[] }
  portfolio?: {
    enabled?: boolean
    section_title?: string
    section_subtitle?: string
    view_all_text?: string
    view_all_url?: string
  }
  why_choose?: {
    enabled?: boolean
    title?: string
    subtitle?: string
    skills?: SkillItem[]
    video_url?: string
    video_poster?: string
    image_media_id?: string
  }
  testimonials?: {
    enabled?: boolean
    section_title?: string
    section_subtitle?: string
  }
  blog?: {
    enabled?: boolean
    section_title?: string
    section_subtitle?: string
    view_all_text?: string
    view_all_url?: string
  }
  cta?: {
    enabled?: boolean
    title_line1?: string
    title_line2?: string
    title_line3?: string
    cta_label?: string
    cta_url?: string
    background_media_id?: string
  }
  seo?: {
    meta_title?: string
    meta_description?: string
    og_image_media_id?: string
  }
}

export const useHomepageBlocks = () => {
  const [data, setData] = useState<HomepageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { notifySuccess, notifyError } = useAdminNotify()

  const fetchHomepageData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: result, error: fetchError } = await supabase
        .from('homepage_settings')
        .select('data')
        .eq('id', 1)
        .single()

      if (fetchError) throw fetchError
      
      // Cast the data properly
      const homepageData = result?.data as HomepageData | null
      setData(homepageData || {})
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch homepage data'
      setError(message)
      notifyError(message)
    } finally {
      setLoading(false)
    }
  }, [notifyError])

  const updateHomepageData = useCallback(async (newData: HomepageData): Promise<boolean> => {
    setLoading(true)
    // Convert to JSON-compatible format for Supabase
    const jsonData = JSON.parse(JSON.stringify(newData))
    try {
      const { error: updateError } = await supabase
        .from('homepage_settings')
        .update({ data: jsonData })
        .eq('id', 1)

      if (updateError) throw updateError

      setData(newData)
      notifySuccess('Homepage settings saved')
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save homepage data'
      notifyError(message)
      return false
    } finally {
      setLoading(false)
    }
  }, [notifySuccess, notifyError])

  const updateSection = useCallback(async (
    sectionKey: SectionKey,
    sectionData: Record<string, unknown>
  ): Promise<boolean> => {
    if (!data) return false

    const newData = {
      ...data,
      [sectionKey]: sectionData
    }

    return updateHomepageData(newData)
  }, [data, updateHomepageData])

  const toggleSectionEnabled = useCallback(async (
    sectionKey: SectionKey,
    enabled: boolean
  ): Promise<boolean> => {
    if (!data) return false

    // Handle different data structures
    const currentSection = data[sectionKey] || {}
    
    // For sections that might be arrays (partners, stats), we need special handling
    if (sectionKey === 'partners' && Array.isArray(data.partners)) {
      const newData = {
        ...data,
        partners: { enabled, items: data.partners }
      }
      return updateHomepageData(newData)
    }

    const newData = {
      ...data,
      [sectionKey]: {
        ...(typeof currentSection === 'object' && !Array.isArray(currentSection) ? currentSection : {}),
        enabled
      }
    }

    return updateHomepageData(newData)
  }, [data, updateHomepageData])

  const getSectionEnabled = useCallback((sectionKey: SectionKey): boolean => {
    if (!data) return true // Default to enabled
    
    const section = data[sectionKey]
    
    // Handle array sections (legacy format)
    if (Array.isArray(section)) return true
    
    // Handle object sections
    if (typeof section === 'object' && section !== null) {
      return (section as { enabled?: boolean }).enabled !== false
    }
    
    return true
  }, [data])

  const updateSeoData = useCallback(async (seoData: HomepageData['seo']): Promise<boolean> => {
    if (!data) return false

    const newData = {
      ...data,
      seo: seoData
    }

    return updateHomepageData(newData)
  }, [data, updateHomepageData])

  const updateStats = useCallback(async (stats: StatItem[]): Promise<boolean> => {
    if (!data) return false

    const newData = {
      ...data,
      stats
    }

    return updateHomepageData(newData)
  }, [data, updateHomepageData])

  return {
    data,
    loading,
    error,
    fetchHomepageData,
    updateHomepageData,
    updateSection,
    toggleSectionEnabled,
    getSectionEnabled,
    updateSeoData,
    updateStats,
    SECTION_KEYS,
    SECTION_LABELS,
    SECTION_TYPES
  }
}
