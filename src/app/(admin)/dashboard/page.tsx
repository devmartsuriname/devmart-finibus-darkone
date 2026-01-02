import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import { Row, Spinner } from 'react-bootstrap'
import { useDashboardStats } from './hooks/useDashboardStats'
import DashboardKPICards from './components/DashboardKPICards'
import DashboardSourceChart from './components/DashboardSourceChart'
import DashboardFunnelChart from './components/DashboardFunnelChart'
import DashboardRecentLeads from './components/DashboardRecentLeads'
import DashboardRecentQuotes from './components/DashboardRecentQuotes'
import DashboardContentBreakdown from './components/DashboardContentBreakdown'
import DashboardQuotesBreakdown from './components/DashboardQuotesBreakdown'

const DashboardPage = () => {
  const { kpis, contentBreakdown, quotesBreakdown, leadsBySource, marketingEvents, recentLeads, recentQuotes, isLoading, error } = useDashboardStats()

  if (isLoading) {
    return (
      <>
        <PageTitle subName="Devmart" title="Dashboard" />
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="text-muted mt-2 mb-0">Loading dashboard...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <PageTitle subName="Devmart" title="Dashboard" />
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <PageTitle subName="Devmart" title="Dashboard" />
      
      {/* Row 1: KPI Cards */}
      <DashboardKPICards 
        totalLeads={kpis.totalLeads}
        totalQuotes={kpis.totalQuotes}
        totalQuoteValue={kpis.totalQuoteValue}
        totalContentItems={kpis.totalContentItems}
      />
      
      {/* Row 2: Charts */}
      <Row>
        <DashboardFunnelChart data={marketingEvents} />
        <DashboardSourceChart data={leadsBySource} />
      </Row>
      
      {/* Row 3: Content & Quotes Breakdown */}
      <Row>
        <DashboardContentBreakdown data={contentBreakdown} />
        <DashboardQuotesBreakdown data={quotesBreakdown} />
      </Row>
      
      {/* Row 4: Recent Tables */}
      <Row>
        <DashboardRecentLeads leads={recentLeads} />
        <DashboardRecentQuotes quotes={recentQuotes} />
      </Row>
      
      <Footer />
    </>
  )
}

export default DashboardPage
