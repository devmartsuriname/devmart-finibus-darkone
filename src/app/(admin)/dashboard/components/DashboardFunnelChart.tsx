import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'

interface MarketingEventCount {
  event_type: string
  count: number
}

interface DashboardFunnelChartProps {
  data: MarketingEventCount[]
}

const eventLabels: Record<string, string> = {
  quote_started: 'Quote Started',
  quote_step_completed: 'Steps Completed',
  quote_submitted: 'Quote Submitted',
  contact_form_submitted: 'Contact Submitted',
  service_pricing_cta_clicked: 'Pricing CTA Clicked',
}

const DashboardFunnelChart = ({ data }: DashboardFunnelChartProps) => {
  // Order events for funnel visualization
  const orderedEvents = ['quote_started', 'quote_step_completed', 'quote_submitted', 'contact_form_submitted', 'service_pricing_cta_clicked']
  
  const eventMap = new Map(data.map((d) => [d.event_type, d.count]))
  const categories = orderedEvents.filter((e) => eventMap.has(e)).map((e) => eventLabels[e] || e)
  const values = orderedEvents.filter((e) => eventMap.has(e)).map((e) => eventMap.get(e) || 0)

  const chartOptions: ApexOptions = {
    series: [
      {
        name: 'Events',
        type: 'bar',
        data: values,
      },
    ],
    chart: {
      height: 280,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius: 4,
      },
    },
    colors: ['#7e67fe'],
    xaxis: {
      categories: categories,
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          fontSize: '11px',
        },
      },
    },
    yaxis: {
      min: 0,
      axisBorder: {
        show: false,
      },
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toString()
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' events'
        },
      },
    },
  }

  return (
    <Col lg={8}>
      <Card className="card-height-100">
        <CardHeader className="d-flex align-items-center justify-content-between gap-2">
          <h4 className="mb-0 flex-grow-1">Marketing Funnel</h4>
        </CardHeader>
        <CardBody className="pt-0">
          {data.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-0">No marketing events recorded yet</p>
              <small className="text-muted">Events will appear as users interact with the site</small>
            </div>
          ) : (
            <div dir="ltr">
              <div className="apex-charts">
                <ReactApexChart options={chartOptions} series={chartOptions.series} height={280} type="bar" />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </Col>
  )
}

export default DashboardFunnelChart
