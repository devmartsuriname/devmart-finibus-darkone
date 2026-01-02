import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAdminNotify } from '@/lib/notify'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed'

export interface Lead {
  id: string
  name: string
  email: string
  subject: string | null
  message: string | null
  source: string
  status: LeadStatus
  notes: string | null
  created_at: string
  updated_at: string
  // Phase 7A: UTM marketing attribution fields (read-only)
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
}

export interface LeadUpdateInput {
  status?: LeadStatus
  notes?: string | null
}

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { notifySuccess, notifyError, notifyInfo } = useAdminNotify()

  const fetchLeads = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      // Type assertion to handle the status field properly
      const typedData: Lead[] = (data || []).map((lead: any) => ({
        ...lead,
        status: lead.status as LeadStatus,
      }))

      setLeads(typedData)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch leads'
      setError(message)
      console.error('Error fetching leads:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const updateLead = useCallback(async (id: string, input: LeadUpdateInput): Promise<boolean> => {
    try {
      const updateData: Record<string, unknown> = {}

      if (input.status !== undefined) {
        updateData.status = input.status
      }
      if (input.notes !== undefined) {
        updateData.notes = input.notes
      }

      if (Object.keys(updateData).length === 0) {
        notifyInfo('No changes to save')
        return true
      }

      const { error: updateError } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', id)

      if (updateError) {
        throw updateError
      }

      notifySuccess('Lead updated successfully')
      await fetchLeads()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update lead'
      notifyError(`Error updating lead: ${message}`)
      console.error('Error updating lead:', err)
      return false
    }
  }, [fetchLeads, notifySuccess, notifyError, notifyInfo])

  // Note: No createLead function - leads come from public forms only
  // Note: No deleteLead function - MVP restriction per Phase_4_Module_Leads.md

  return {
    leads,
    isLoading,
    error,
    updateLead,
    refetch: fetchLeads,
  }
}
