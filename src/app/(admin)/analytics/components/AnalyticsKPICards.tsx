import { Row, Col, Card } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { Icon } from '@iconify/react'

interface KPICardProps {
  title: string
  count: string | number
  icon: string
  series: { data: number[] }[]
}

const KPICard = ({ title, count, icon, series }: KPICardProps) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      sparkline: { enabled: true },
      height: 35,
    },
    stroke: {
      width: 1.5,
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    colors: ['#7e67fe'],
    tooltip: {
      enabled: false,
    },
  }

  return (
    <Card className="overflow-hidden">
      <Card.Body className="p-3">
        <Row className="align-items-center">
          <Col xs={8}>
            <p className="text-muted mb-1 text-truncate">{title}</p>
            <h3 className="mb-0">{count}</h3>
          </Col>
          <Col xs={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center">
              <Icon icon={icon} className="fs-2 text-primary opacity-75" />
            </div>
          </Col>
        </Row>
        <div className="mt-2">
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="area"
            height={35}
          />
        </div>
      </Card.Body>
    </Card>
  )
}

interface AnalyticsKPICardsProps {
  totalLeads: number
  totalQuotes: number
  totalEvents: number
  conversionRate: number
}

const generateSparkline = (base: number): number[] => {
  return Array.from({ length: 7 }, () => 
    Math.max(0, base + Math.floor(Math.random() * 10) - 5)
  )
}

const AnalyticsKPICards = ({
  totalLeads,
  totalQuotes,
  totalEvents,
  conversionRate,
}: AnalyticsKPICardsProps) => {
  const kpiData = [
    {
      title: 'Total Leads',
      count: totalLeads,
      icon: 'solar:users-group-rounded-bold-duotone',
      series: [{ data: generateSparkline(totalLeads) }],
    },
    {
      title: 'Total Quotes',
      count: totalQuotes,
      icon: 'solar:document-text-bold-duotone',
      series: [{ data: generateSparkline(totalQuotes) }],
    },
    {
      title: 'Marketing Events',
      count: totalEvents,
      icon: 'solar:chart-2-bold-duotone',
      series: [{ data: generateSparkline(totalEvents) }],
    },
    {
      title: 'Funnel Conversion',
      count: `${conversionRate}%`,
      icon: 'solar:graph-up-bold-duotone',
      series: [{ data: generateSparkline(conversionRate) }],
    },
  ]

  return (
    <Row className="g-3">
      {kpiData.map((kpi, index) => (
        <Col key={index} xs={12} sm={6} xl={3}>
          <KPICard
            title={kpi.title}
            count={kpi.count}
            icon={kpi.icon}
            series={kpi.series}
          />
        </Col>
      ))}
    </Row>
  )
}

export default AnalyticsKPICards
