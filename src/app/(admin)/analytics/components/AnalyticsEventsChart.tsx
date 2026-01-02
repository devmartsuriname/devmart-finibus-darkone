import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, CardHeader } from 'react-bootstrap'

interface AnalyticsEventsChartProps {
  eventsByType: { type: string; count: number }[]
}

const eventLabels: Record<string, string> = {
  quote_started: 'Quote Started',
  quote_step_completed: 'Steps Completed',
  quote_submitted: 'Quote Submitted',
  contact_form_submitted: 'Contact Submitted',
  service_pricing_cta_clicked: 'Pricing CTA Clicked',
}

const formatEventType = (type: string): string => {
  return eventLabels[type] || type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const AnalyticsEventsChart = ({ eventsByType }: AnalyticsEventsChartProps) => {
  // Order events for funnel visualization (matching Dashboard pattern)
  const orderedEvents = ['quote_started', 'quote_step_completed', 'quote_submitted', 'contact_form_submitted', 'service_pricing_cta_clicked']
  
  const eventMap = new Map(eventsByType.map((e) => [e.type, e.count]))
  const categories = orderedEvents.filter((e) => eventMap.has(e)).map((e) => formatEventType(e))
  const values = orderedEvents.filter((e) => eventMap.has(e)).map((e) => eventMap.get(e) || 0)

  // If no ordered events found, fall back to raw data
  const finalCategories = categories.length > 0 ? categories : eventsByType.map((e) => formatEventType(e.type))
  const finalValues = values.length > 0 ? values : eventsByType.map((e) => e.count)

  const chartOptions: ApexOptions = {
    series: [
      {
        name: 'Events',
        type: 'bar',
        data: finalValues,
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
      categories: finalCategories,
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
    <Card className="card-height-100">
      <CardHeader className="d-flex align-items-center justify-content-between gap-2">
        <h4 className="mb-0 flex-grow-1">Events by Type</h4>
      </CardHeader>
      <CardBody className="pt-0">
        {eventsByType.length > 0 ? (
          <div dir="ltr">
            <div className="apex-charts">
              <ReactApexChart options={chartOptions} series={chartOptions.series} height={280} type="bar" />
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted mb-0">No marketing events recorded yet</p>
            <small className="text-muted">Events will appear as users interact with the site</small>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default AnalyticsEventsChart
