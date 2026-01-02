import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface AnalyticsEventsChartProps {
  eventsByType: { type: string; count: number }[]
}

const formatEventType = (type: string): string => {
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const AnalyticsEventsChart = ({ eventsByType }: AnalyticsEventsChartProps) => {
  const categories = eventsByType.map((e) => formatEventType(e.type))
  const data = eventsByType.map((e) => e.count)

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: '11px',
        },
        rotate: -45,
        rotateAlways: eventsByType.length > 4,
      },
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ['#7e67fe'],
    tooltip: {
      y: {
        formatter: (val: number) => `${val} events`,
      },
    },
    grid: {
      borderColor: '#f1f1f1',
    },
  }

  const series = [
    {
      name: 'Events',
      data,
    },
  ]

  return (
    <Card>
      <CardHeader className="border-bottom bg-transparent">
        <CardTitle as="h5" className="mb-0">
          Events by Type
        </CardTitle>
      </CardHeader>
      <CardBody>
        {eventsByType.length > 0 ? (
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="bar"
            height={300}
          />
        ) : (
          <div className="text-center text-muted py-5">
            No marketing events recorded yet
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default AnalyticsEventsChart
