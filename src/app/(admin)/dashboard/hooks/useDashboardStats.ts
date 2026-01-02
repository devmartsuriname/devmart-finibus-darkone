import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface DashboardKPI {
  totalLeads: number
  totalQuotes: number
  totalQuoteValue: number
  totalContentItems: number
}

interface ContentBreakdown {
  blogPublished: number
  blogDraft: number
  projectsActive: number
  projectsInactive: number
  servicesActive: number
  servicesInactive: number
}

interface QuotesBreakdown {
  pending: number
  reviewed: number
  converted: number
  expired: number
  totalValue: number
  currency: string
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
  contentBreakdown: ContentBreakdown
  quotesBreakdown: QuotesBreakdown
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
  const [contentBreakdown, setContentBreakdown] = useState<ContentBreakdown>({
    blogPublished: 0,
    blogDraft: 0,
    projectsActive: 0,
    projectsInactive: 0,
    servicesActive: 0,
    servicesInactive: 0,
  })
  const [quotesBreakdown, setQuotesBreakdown] = useState<QuotesBreakdown>({
    pending: 0,
    reviewed: 0,
    converted: 0,
    expired: 0,
    totalValue: 0,
    currency: 'USD',
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
          supabase.from('blog_posts').select('id, status'),
          supabase.from('projects').select('id, status'),
          supabase.from('services').select('id, status'),
          supabase.from('marketing_events').select('event_type'),
          supabase.from('leads').select('id, name, email, source, status, created_at').order('created_at', { ascending: false }).limit(5),
          supabase.from('quotes').select('id, reference_number, total_amount, currency, billing_period, status, created_at').order('created_at', { ascending: false }).limit(5),
        ])

        // Calculate KPIs and breakdowns
        const leads = leadsResult.data || []
        const quotes = quotesResult.data || []
        const blogs = blogResult.data || []
        const projects = projectsResult.data || []
        const services = servicesResult.data || []

        const totalQuoteValue = quotes.reduce((sum, q) => sum + (q.total_amount || 0), 0)
        
        // Content breakdown
        const blogPublished = blogs.filter(b => b.status === 'published').length
        const blogDraft = blogs.filter(b => b.status === 'draft').length
        const projectsActive = projects.filter(p => p.status === 'published').length
        const projectsInactive = projects.length - projectsActive
        const servicesActive = services.filter(s => s.status === 'active').length
        const servicesInactive = services.length - servicesActive

        const contentCount = blogs.length + projects.length + services.length

        setKpis({
          totalLeads: leads.length,
          totalQuotes: quotes.length,
          totalQuoteValue,
          totalContentItems: contentCount,
        })

        setContentBreakdown({
          blogPublished,
          blogDraft,
          projectsActive,
          projectsInactive,
          servicesActive,
          servicesInactive,
        })

        // Quotes breakdown by status
        const quotesPending = quotes.filter(q => q.status === 'pending').length
        const quotesReviewed = quotes.filter(q => q.status === 'reviewed').length
        const quotesConverted = quotes.filter(q => q.status === 'converted').length
        const quotesExpired = quotes.filter(q => q.status === 'expired').length
        const defaultCurrency = quotes[0]?.currency || 'USD'

        setQuotesBreakdown({
          pending: quotesPending,
          reviewed: quotesReviewed,
          converted: quotesConverted,
          expired: quotesExpired,
          totalValue: totalQuoteValue,
          currency: defaultCurrency,
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
    contentBreakdown,
    quotesBreakdown,
    leadsBySource,
    marketingEvents,
    recentLeads,
    recentQuotes,
    isLoading,
    error,
  }
}
