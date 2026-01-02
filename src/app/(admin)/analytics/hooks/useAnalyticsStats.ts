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

export const useAnalyticsStats = () => {
  const [data, setData] = useState<AnalyticsStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchAnalyticsStats = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch total leads
        const { count: totalLeads } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })

        // Fetch total quotes
        const { count: totalQuotes } = await supabase
          .from('quotes')
          .select('*', { count: 'exact', head: true })

        // Fetch total marketing events
        const { count: totalEvents } = await supabase
          .from('marketing_events')
          .select('*', { count: 'exact', head: true })

        // Fetch events by type
        const { data: eventsData } = await supabase
          .from('marketing_events')
          .select('event_type')

        const eventCounts: Record<string, number> = {}
        eventsData?.forEach((event) => {
          const type = event.event_type
          eventCounts[type] = (eventCounts[type] || 0) + 1
        })

        const eventsByType = Object.entries(eventCounts).map(([type, count]) => ({
          type,
          count,
        }))

        // Calculate conversion rate (quote_submitted / quote_started)
        const quoteStarted = eventCounts['quote_started'] || 0
        const quoteSubmitted = eventCounts['quote_submitted'] || 0
        const conversionRate = quoteStarted > 0 
          ? Math.round((quoteSubmitted / quoteStarted) * 100) 
          : 0

        // Fetch quotes by billing period
        const { data: quotesData } = await supabase
          .from('quotes')
          .select('billing_period')

        const billingCounts: Record<string, number> = {}
        quotesData?.forEach((quote) => {
          const period = quote.billing_period
          billingCounts[period] = (billingCounts[period] || 0) + 1
        })

        const quotesByBilling = Object.entries(billingCounts).map(([period, count]) => ({
          period,
          count,
        }))

        // Fetch leads by source
        const { data: leadsData } = await supabase
          .from('leads')
          .select('source')

        const sourceCounts: Record<string, number> = {}
        leadsData?.forEach((lead) => {
          const source = lead.source
          sourceCounts[source] = (sourceCounts[source] || 0) + 1
        })

        const leadsBySource = Object.entries(sourceCounts).map(([source, count]) => ({
          source,
          count,
        }))

        setData({
          totalLeads: totalLeads || 0,
          totalQuotes: totalQuotes || 0,
          totalEvents: totalEvents || 0,
          conversionRate,
          eventsByType,
          quotesByBilling,
          leadsBySource,
        })
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch analytics stats'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyticsStats()
  }, [])

  return { data, isLoading, error }
}
