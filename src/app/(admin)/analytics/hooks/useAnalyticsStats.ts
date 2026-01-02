import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface AnalyticsStats {
  totalLeads: number
  totalQuotes: number
  totalEvents: number
  conversionRate: number
  eventsByType: { type: string; count: number }[]
  quotesByBilling: { period: string; count: number }[]
  leadsBySource: { source: string; count: number }[]
}

interface UseAnalyticsStatsReturn {
  data: AnalyticsStats | null
  isLoading: boolean
  error: string | null
}

export const useAnalyticsStats = (): UseAnalyticsStatsReturn => {
  const [data, setData] = useState<AnalyticsStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch all data in parallel
        const [
          leadsCountResult,
          quotesCountResult,
          eventsCountResult,
          eventsDataResult,
          quotesDataResult,
          leadsDataResult,
        ] = await Promise.all([
          supabase.from('leads').select('*', { count: 'exact', head: true }),
          supabase.from('quotes').select('*', { count: 'exact', head: true }),
          supabase.from('marketing_events').select('*', { count: 'exact', head: true }),
          supabase.from('marketing_events').select('event_type'),
          supabase.from('quotes').select('billing_period'),
          supabase.from('leads').select('source'),
        ])

        const totalLeads = leadsCountResult.count || 0
        const totalQuotes = quotesCountResult.count || 0
        const totalEvents = eventsCountResult.count || 0

        // Process events by type
        const eventsData = eventsDataResult.data || []
        const eventCounts: Record<string, number> = {}
        eventsData.forEach((event) => {
          const type = event.event_type
          eventCounts[type] = (eventCounts[type] || 0) + 1
        })
        const eventsByType = Object.entries(eventCounts).map(([type, count]) => ({
          type,
          count,
        }))

        // Calculate conversion rate
        const quoteStarted = eventCounts['quote_started'] || 0
        const quoteSubmitted = eventCounts['quote_submitted'] || 0
        const conversionRate = quoteStarted > 0 
          ? Math.round((quoteSubmitted / quoteStarted) * 100) 
          : 0

        // Process quotes by billing period
        const quotesData = quotesDataResult.data || []
        const billingCounts: Record<string, number> = {}
        quotesData.forEach((quote) => {
          const period = quote.billing_period
          billingCounts[period] = (billingCounts[period] || 0) + 1
        })
        const quotesByBilling = Object.entries(billingCounts).map(([period, count]) => ({
          period,
          count,
        }))

        // Process leads by source
        const leadsData = leadsDataResult.data || []
        const sourceCounts: Record<string, number> = {}
        leadsData.forEach((lead) => {
          const source = lead.source
          sourceCounts[source] = (sourceCounts[source] || 0) + 1
        })
        const leadsBySource = Object.entries(sourceCounts).map(([source, count]) => ({
          source,
          count,
        }))

        setData({
          totalLeads,
          totalQuotes,
          totalEvents,
          conversionRate,
          eventsByType,
          quotesByBilling,
          leadsBySource,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics stats')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { data, isLoading, error }
}
