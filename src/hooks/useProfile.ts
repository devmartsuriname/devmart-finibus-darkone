import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuthContext } from '@/context/useAuthContext'

export interface Profile {
  id: string
  display_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export function useProfile() {
  const { user } = useAuthContext()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    if (!user?.id) {
      setProfile(null)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (fetchError) {
        // Profile might not exist yet for existing users
        if (fetchError.code === 'PGRST116') {
          setProfile(null)
        } else {
          throw fetchError
        }
      } else {
        setProfile(data)
      }
      setError(null)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const updateProfile = useCallback(
    async (updates: { display_name?: string; avatar_url?: string }) => {
      if (!user?.id) {
        throw new Error('No user logged in')
      }

      try {
        const { data, error: updateError } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single()

        if (updateError) throw updateError
        
        setProfile(data)
        return { success: true, data }
      } catch (err) {
        console.error('Error updating profile:', err)
        const message = err instanceof Error ? err.message : 'Failed to update profile'
        return { success: false, error: message }
      }
    },
    [user?.id]
  )

  // Get display name with fallback to email prefix
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'User'

  return {
    profile,
    displayName,
    isLoading,
    error,
    updateProfile,
    refetch: fetchProfile,
  }
}
