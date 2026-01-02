import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAdminNotify } from '@/lib/notify'

export type QuoteStatus = 'pending' | 'reviewed' | 'converted' | 'expired'

export interface Quote {
  id: string
  reference_number: string
  lead_id: string | null
  total_amount: number
  currency: string
  billing_period: string
  status: QuoteStatus
  created_at: string
  updated_at: string
  // Joined from leads table
  lead_name?: string
  lead_email?: string
  // Phase 7A: UTM marketing attribution fields (read-only)
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
}

export interface QuoteItem {
  id: string
  quote_id: string
  service_id: string | null
  plan_id: string | null
  service_title: string
  plan_name: string
  price_amount: number
  currency: string
  created_at: string
}

export interface QuoteUpdateInput {
  status?: QuoteStatus
  // Note: Internal notes would require schema change, using leads.notes instead
}

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { notifySuccess, notifyError, notifyInfo } = useAdminNotify()

  const fetchQuotes = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Two-query pattern: fetch quotes and leads separately to avoid RLS join issues
      // Step 1: Fetch quotes
      const { data: quotesData, error: quotesError } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false })

      if (quotesError) {
        throw quotesError
      }

      // Step 2: Extract unique lead_ids and fetch leads separately
      const leadIds = (quotesData || [])
        .map(q => q.lead_id)
        .filter((id): id is string => id !== null)

      let leadsMap: Record<string, { name: string; email: string }> = {}

      if (leadIds.length > 0) {
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('id, name, email')
          .in('id', leadIds)

        if (leadsError) {
          console.warn('Error fetching leads for quotes:', leadsError)
          // Continue without lead data rather than failing entirely
        } else {
          leadsMap = (leadsData || []).reduce((acc, lead) => {
            acc[lead.id] = { name: lead.name, email: lead.email }
            return acc
          }, {} as Record<string, { name: string; email: string }>)
        }
      }

      // Step 3: Merge lead info into quotes
      const typedData: Quote[] = (quotesData || []).map((quote) => ({
        id: quote.id,
        reference_number: quote.reference_number,
        lead_id: quote.lead_id,
        total_amount: quote.total_amount,
        currency: quote.currency,
        billing_period: quote.billing_period,
        status: quote.status as QuoteStatus,
        created_at: quote.created_at,
        updated_at: quote.updated_at,
        lead_name: quote.lead_id ? leadsMap[quote.lead_id]?.name : undefined,
        lead_email: quote.lead_id ? leadsMap[quote.lead_id]?.email : undefined,
        // Phase 7A: UTM fields
        utm_source: quote.utm_source || null,
        utm_medium: quote.utm_medium || null,
        utm_campaign: quote.utm_campaign || null,
        utm_content: quote.utm_content || null,
        utm_term: quote.utm_term || null,
      }))

      setQuotes(typedData)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch quotes'
      setError(message)
      console.error('Error fetching quotes:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchQuotes()
  }, [fetchQuotes])

  const fetchQuoteItems = useCallback(async (quoteId: string): Promise<QuoteItem[]> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('quote_items')
        .select('*')
        .eq('quote_id', quoteId)
        .order('created_at', { ascending: true })

      if (fetchError) {
        throw fetchError
      }

      return (data || []) as QuoteItem[]
    } catch (err) {
      console.error('Error fetching quote items:', err)
      return []
    }
  }, [])

  const updateQuote = useCallback(async (id: string, input: QuoteUpdateInput): Promise<boolean> => {
    try {
      const updateData: Record<string, unknown> = {}

      if (input.status !== undefined) {
        updateData.status = input.status
      }

      if (Object.keys(updateData).length === 0) {
        notifyInfo('No changes to save')
        return true
      }

      const { error: updateError } = await supabase
        .from('quotes')
        .update(updateData)
        .eq('id', id)

      if (updateError) {
        throw updateError
      }

      notifySuccess('Quote updated successfully')
      await fetchQuotes()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update quote'
      notifyError(`Error updating quote: ${message}`)
      console.error('Error updating quote:', err)
      return false
    }
  }, [fetchQuotes, notifySuccess, notifyError, notifyInfo])

  // Note: No createQuote function - quotes come from public wizard only
  // Note: No deleteQuote function - MVP restriction

  return {
    quotes,
    isLoading,
    error,
    updateQuote,
    fetchQuoteItems,
    refetch: fetchQuotes,
  }
}
