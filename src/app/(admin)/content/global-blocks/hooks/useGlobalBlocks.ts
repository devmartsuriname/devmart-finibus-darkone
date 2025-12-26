import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { notifySuccess, notifyError } from '@/lib/notify'

// Global block keys
export const GLOBAL_BLOCK_KEYS = [
  'cta_strip',
  'why_choose_us'
] as const

export type GlobalBlockKey = typeof GLOBAL_BLOCK_KEYS[number]

// Block display names
export const GLOBAL_BLOCK_LABELS: Record<GlobalBlockKey, string> = {
  cta_strip: 'CTA Strip (Let\'s Talk)',
  why_choose_us: 'Why Choose Us'
}

// Block descriptions
export const GLOBAL_BLOCK_DESCRIPTIONS: Record<GlobalBlockKey, string> = {
  cta_strip: 'Call-to-action strip used across multiple pages',
  why_choose_us: 'Why Choose Us section with skills and video'
}

// Type definitions for block data
export interface CtaStripData {
  enabled?: boolean
  title_line1?: string
  title_line2?: string
  title_line3?: string
  cta_label?: string
  cta_url?: string
  background_media_id?: string | null
}

export interface SkillItem {
  label?: string
  percent?: number
  sublabel?: string
}

export interface WhyChooseUsData {
  enabled?: boolean
  title?: string
  subtitle?: string
  skills?: SkillItem[]
  video_url?: string
  video_poster?: string
  image_media_id?: string | null
}

export interface GlobalBlock {
  id: string
  block_key: GlobalBlockKey
  data: CtaStripData | WhyChooseUsData | Record<string, unknown>
  updated_at: string
  updated_by: string | null
}

export const useGlobalBlocks = () => {
  const [blocks, setBlocks] = useState<GlobalBlock[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGlobalBlocks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: result, error: fetchError } = await supabase
        .from('global_blocks')
        .select('*')
        .order('block_key', { ascending: true })

      if (fetchError) throw fetchError
      
      setBlocks((result as GlobalBlock[]) || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch global blocks'
      setError(message)
      notifyError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const getBlockByKey = useCallback((blockKey: GlobalBlockKey): GlobalBlock | undefined => {
    return blocks.find(b => b.block_key === blockKey)
  }, [blocks])

  const updateBlockData = useCallback(async (
    blockKey: GlobalBlockKey,
    data: Record<string, unknown>
  ): Promise<boolean> => {
    setLoading(true)
    const jsonData = JSON.parse(JSON.stringify(data))
    try {
      const { error: updateError } = await supabase
        .from('global_blocks')
        .update({ data: jsonData })
        .eq('block_key', blockKey)

      if (updateError) throw updateError

      // Update local state
      setBlocks(prev => prev.map(block => 
        block.block_key === blockKey 
          ? { ...block, data: jsonData }
          : block
      ))
      
      notifySuccess('Global block saved')
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save global block'
      notifyError(message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleBlockEnabled = useCallback(async (
    blockKey: GlobalBlockKey,
    enabled: boolean
  ): Promise<boolean> => {
    const block = blocks.find(b => b.block_key === blockKey)
    if (!block) return false

    const currentData = block.data || {}
    const newData = {
      ...currentData,
      enabled
    }

    return updateBlockData(blockKey, newData)
  }, [blocks, updateBlockData])

  const getBlockEnabled = useCallback((blockKey: GlobalBlockKey): boolean => {
    const block = blocks.find(b => b.block_key === blockKey)
    if (!block) return true
    
    const data = block.data as { enabled?: boolean }
    return data?.enabled !== false
  }, [blocks])

  return {
    blocks,
    loading,
    error,
    fetchGlobalBlocks,
    getBlockByKey,
    updateBlockData,
    toggleBlockEnabled,
    getBlockEnabled,
    GLOBAL_BLOCK_KEYS,
    GLOBAL_BLOCK_LABELS,
    GLOBAL_BLOCK_DESCRIPTIONS
  }
}