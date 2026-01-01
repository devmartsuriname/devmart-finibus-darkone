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

      // Fetch quotes with LEFT JOIN on leads for name/email
      const { data, error: fetchError } = await supabase
        .from('quotes')
        .select(`
          *,
          leads (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      // Transform data to include lead_name and lead_email at top level
      const typedData: Quote[] = (data || []).map((quote: any) => ({
        id: quote.id,
        reference_number: quote.reference_number,
        lead_id: quote.lead_id,
        total_amount: quote.total_amount,
        currency: quote.currency,
        billing_period: quote.billing_period,
        status: quote.status as QuoteStatus,
        created_at: quote.created_at,
        updated_at: quote.updated_at,
        lead_name: quote.leads?.name || null,
        lead_email: quote.leads?.email || null,
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
