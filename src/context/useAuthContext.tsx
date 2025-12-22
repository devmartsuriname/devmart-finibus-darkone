import type { User, Session } from '@supabase/supabase-js'
import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import type { ChildrenType } from '@/types/component-props'

export type AuthContextType = {
  user: User | null
  session: Session | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: ChildrenType) {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user has admin role
  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle()

      if (error) {
        console.error('Error checking admin role:', error)
        return false
      }

      return !!data
    } catch (err) {
      console.error('Error checking admin role:', err)
      return false
    }
  }

  useEffect(() => {
    // Set up auth state listener FIRST (per Supabase best practices)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)

        // Check admin role after auth state changes (using setTimeout to avoid deadlock)
        if (newSession?.user) {
          setTimeout(() => {
            checkAdminRole(newSession.user.id).then(setIsAdmin)
          }, 0)
        } else {
          setIsAdmin(false)
        }

        if (event === 'SIGNED_OUT') {
          setIsAdmin(false)
        }
      }
    )

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession)
      setUser(existingSession?.user ?? null)

      if (existingSession?.user) {
        checkAdminRole(existingSession.user.id).then((hasAdmin) => {
          setIsAdmin(hasAdmin)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error: error ? new Error(error.message) : null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setIsAdmin(false)
    navigate('/auth/sign-in')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!session,
        isAdmin,
        isLoading,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
