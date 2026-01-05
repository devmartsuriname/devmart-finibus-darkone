import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAdminNotify } from '@/lib/notify'

export type UserRole = 'admin' | 'moderator' | 'user'

export interface User {
  user_id: string
  email: string
  display_name: string
  avatar_url: string | null
  role: UserRole
  created_at: string
  last_sign_in_at: string | null
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { notifySuccess, notifyError } = useAdminNotify()

  // Ref pattern for stable notify functions
  const notifySuccessRef = useRef(notifySuccess)
  const notifyErrorRef = useRef(notifyError)

  useEffect(() => {
    notifySuccessRef.current = notifySuccess
    notifyErrorRef.current = notifyError
  })

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase.rpc('get_admin_user_list')

      if (fetchError) {
        throw fetchError
      }

      setUsers((data || []) as User[])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users'
      setError(message)
      console.error('Error fetching users:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const updateUserRole = useCallback(async (userId: string, newRole: UserRole): Promise<boolean> => {
    try {
      // Check if user_roles record exists
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .single()

      if (existingRole) {
        // Update existing role
        const { error: updateError } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId)

        if (updateError) throw updateError
      } else {
        // Insert new role
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole })

        if (insertError) throw insertError
      }

      notifySuccessRef.current('User role updated successfully')
      await fetchUsers()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user role'
      notifyErrorRef.current(`Error updating role: ${message}`)
      console.error('Error updating user role:', err)
      return false
    }
  }, [fetchUsers])

  const deleteUser = useCallback(async (userId: string): Promise<boolean> => {
    try {
      // Delete from user_roles first (FK constraint)
      const { error: roleDeleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)

      if (roleDeleteError) {
        console.warn('Role delete error (may not exist):', roleDeleteError)
      }

      // Delete from profiles
      const { error: profileDeleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)

      if (profileDeleteError) {
        console.warn('Profile delete error (may not exist):', profileDeleteError)
      }

      // Note: Cannot delete from auth.users via client - requires Edge Function with service_role
      // For now, we just clean up the associated data
      
      notifySuccessRef.current('User data deleted successfully')
      await fetchUsers()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user'
      notifyErrorRef.current(`Error deleting user: ${message}`)
      console.error('Error deleting user:', err)
      return false
    }
  }, [fetchUsers])

  return {
    users,
    isLoading,
    error,
    updateUserRole,
    deleteUser,
    refetch: fetchUsers,
  }
}
