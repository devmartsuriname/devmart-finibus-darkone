import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuthContext } from '@/context/useAuthContext'
import { notifySuccess, notifyError } from '@/lib/notify'

export interface Setting {
  key: string
  value: string
  category: string
  description: string | null
  created_at: string
  updated_at: string
  updated_by: string | null
}

export interface SettingsByCategory {
  general: Setting[]
  seo: Setting[]
  social: Setting[]
  branding: Setting[]
}

export interface SettingUpdate {
  key: string
  value: string
}

export const useSettings = () => {
  const { user } = useAuthContext()
  const [settings, setSettings] = useState<Setting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const { data, error: fetchError } = await supabase
        .from('settings')
        .select('*')
        .order('key')
      
      if (fetchError) {
        throw fetchError
      }
      
      setSettings(data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch settings'
      setError(message)
      notifyError(`Error loading settings: ${message}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const getSettingsByCategory = useCallback((): SettingsByCategory => {
    return {
      general: settings.filter(s => s.category === 'general'),
      seo: settings.filter(s => s.category === 'seo'),
      social: settings.filter(s => s.category === 'social'),
      branding: settings.filter(s => s.category === 'branding'),
    }
  }, [settings])

  const getSettingValue = useCallback((key: string): string => {
    const setting = settings.find(s => s.key === key)
    return setting?.value || ''
  }, [settings])

  const updateSettings = useCallback(async (updates: SettingUpdate[]): Promise<boolean> => {
    if (!user?.id) {
      notifyError('You must be logged in to update settings')
      return false
    }

    try {
      setIsSaving(true)
      setError(null)

      // Update each setting with updated_by tracking
      for (const update of updates) {
        const { error: updateError } = await supabase
          .from('settings')
          .update({
            value: update.value,
            updated_by: user.id,
          })
          .eq('key', update.key)

        if (updateError) {
          throw updateError
        }
      }

      // Refresh settings after update
      await fetchSettings()
      
      notifySuccess('Settings saved successfully')
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save settings'
      setError(message)
      notifyError(`Error saving settings: ${message}`)
      return false
    } finally {
      setIsSaving(false)
    }
  }, [user?.id, fetchSettings])

  return {
    settings,
    isLoading,
    isSaving,
    error,
    getSettingsByCategory,
    getSettingValue,
    updateSettings,
    refetch: fetchSettings,
  }
}