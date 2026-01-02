import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface DashboardKPI {
  totalLeads: number
  totalQuotes: number
  totalQuoteValue: number
  totalContentItems: number
}

interface LeadsBySource {
  source: string
  count: number
  percentage: number
}

interface MarketingEventCount {
  event_type: string
  count: number
}

interface RecentLead {
  id: string
  name: string
  email: string
  source: string
  status: string
  created_at: string
}

interface RecentQuote {
  id: string
  reference_number: string
  total_amount: number
  currency: string
  billing_period: string
  status: string
  created_at: string
}

export interface DashboardStats {
  kpis: DashboardKPI
  leadsBySource: LeadsBySource[]
  marketingEvents: MarketingEventCount[]
  recentLeads: RecentLead[]
  recentQuotes: RecentQuote[]
  isLoading: boolean
  error: string | null
}

export const useDashboardStats = (): DashboardStats => {
  const [kpis, setKpis] = useState<DashboardKPI>({
    totalLeads: 0,
    totalQuotes: 0,
    totalQuoteValue: 0,
    totalContentItems: 0,
  })
  const [leadsBySource, setLeadsBySource] = useState<LeadsBySource[]>([])
  const [marketingEvents, setMarketingEvents] = useState<MarketingEventCount[]>([])
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([])
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch all data in parallel
        const [
          leadsResult,
          quotesResult,
          blogResult,
          projectsResult,
          servicesResult,
          eventsResult,
          recentLeadsResult,
          recentQuotesResult,
        ] = await Promise.all([
          supabase.from('leads').select('id, source, name, email, status, created_at'),
          supabase.from('quotes').select('id, total_amount, reference_number, currency, billing_period, status, created_at'),
          supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
          supabase.from('projects').select('id', { count: 'exact', head: true }),
          supabase.from('services').select('id', { count: 'exact', head: true }),
          supabase.from('marketing_events').select('event_type'),
          supabase.from('leads').select('id, name, email, source, status, created_at').order('created_at', { ascending: false }).limit(5),
          supabase.from('quotes').select('id, reference_number, total_amount, currency, billing_period, status, created_at').order('created_at', { ascending: false }).limit(5),
        ])

        // Calculate KPIs
        const leads = leadsResult.data || []
        const quotes = quotesResult.data || []
        const totalQuoteValue = quotes.reduce((sum, q) => sum + (q.total_amount || 0), 0)
        const contentCount = (blogResult.count || 0) + (projectsResult.count || 0) + (servicesResult.count || 0)

        setKpis({
          totalLeads: leads.length,
          totalQuotes: quotes.length,
          totalQuoteValue,
          totalContentItems: contentCount,
        })

        // Calculate leads by source
        const sourceMap: Record<string, number> = {}
        leads.forEach((lead) => {
          const source = lead.source || 'Unknown'
          sourceMap[source] = (sourceMap[source] || 0) + 1
        })
        const totalLeadsCount = leads.length || 1
        const sourceData = Object.entries(sourceMap).map(([source, count]) => ({
          source,
          count,
          percentage: Math.round((count / totalLeadsCount) * 100),
        }))
        setLeadsBySource(sourceData)

        // Calculate marketing events by type
        const events = eventsResult.data || []
        const eventMap: Record<string, number> = {}
        events.forEach((event) => {
          eventMap[event.event_type] = (eventMap[event.event_type] || 0) + 1
        })
        const eventData = Object.entries(eventMap).map(([event_type, count]) => ({
          event_type,
          count,
        }))
        setMarketingEvents(eventData)

        // Set recent data
        setRecentLeads(recentLeadsResult.data || [])
        setRecentQuotes(recentQuotesResult.data || [])

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return {
    kpis,
    leadsBySource,
    marketingEvents,
    recentLeads,
    recentQuotes,
    isLoading,
    error,
  }
}
