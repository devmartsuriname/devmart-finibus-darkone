import { Row, Col } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import AnalyticsKPICards from './components/AnalyticsKPICards'
import AnalyticsEventsChart from './components/AnalyticsEventsChart'
import AnalyticsBillingChart from './components/AnalyticsBillingChart'
import AnalyticsSourceChart from './components/AnalyticsSourceChart'
import { useAnalyticsStats } from './hooks/useAnalyticsStats'

const AnalyticsPage = () => {
  const { data, isLoading } = useAnalyticsStats()

  if (isLoading) {
    return (
      <>
        <PageTitle subName="Devmart" title="Analytics" />
        <div className="text-center py-5">Loading analytics...</div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <PageTitle subName="Devmart" title="Analytics" />

      {/* Row 1: KPI Cards */}
      <AnalyticsKPICards
        totalLeads={data?.totalLeads || 0}
        totalQuotes={data?.totalQuotes || 0}
        totalEvents={data?.totalEvents || 0}
        conversionRate={data?.conversionRate || 0}
      />

      {/* Row 2: Events Chart + Billing Chart */}
      <Row className="mt-3 g-3">
        <Col xs={12} lg={8}>
          <AnalyticsEventsChart eventsByType={data?.eventsByType || []} />
        </Col>
        <Col xs={12} lg={4}>
          <AnalyticsBillingChart quotesByBilling={data?.quotesByBilling || []} />
        </Col>
      </Row>

      {/* Row 3: Leads by Source */}
      <Row className="mt-3 g-3">
        <Col xs={12} lg={6}>
          <AnalyticsSourceChart leadsBySource={data?.leadsBySource || []} />
        </Col>
      </Row>

      <Footer />
    </>
  )
}

export default AnalyticsPage
