import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

interface KPICardProps {
  title: string
  count: string
  icon: string
  series: number[]
}

const KPICard = ({ title, count, icon, series }: KPICardProps) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 50,
      sparkline: {
        enabled: true,
      },
    },
    series: [
      {
        data: series,
      },
    ],
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    markers: {
      size: 0,
    },
    colors: ['#7e67fe'],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return ''
          },
        },
      },
      marker: {
        show: false,
      },
    },
    fill: {
      opacity: [1],
      type: ['gradient'],
      gradient: {
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xs={6}>
            <p className="text-muted mb-0 text-truncate">{title}</p>
            <h3 className="text-dark mt-2 mb-0">{count}</h3>
          </Col>
          <Col xs={6}>
            <div className="ms-auto avatar-md bg-soft-primary rounded">
              <IconifyIcon style={{ padding: '12px' }} icon={icon} className="fs-32 avatar-title text-primary" />
            </div>
          </Col>
        </Row>
      </CardBody>
      <ReactApexChart options={chartOptions} series={chartOptions.series} height={50} type="area" />
    </Card>
  )
}

interface DashboardKPICardsProps {
  totalLeads: number
  totalQuotes: number
  totalQuoteValue: number
  totalContentItems: number
}

const DashboardKPICards = ({ totalLeads, totalQuotes, totalQuoteValue, totalContentItems }: DashboardKPICardsProps) => {
  // Generate simple sparkline data based on counts
  const generateSparkline = (value: number): number[] => {
    const base = Math.max(value / 10, 1)
    return [
      Math.round(base * 0.5),
      Math.round(base * 0.7),
      Math.round(base * 0.6),
      Math.round(base * 0.9),
      Math.round(base * 0.8),
      Math.round(base * 1.0),
      Math.round(base * 0.85),
      Math.round(base * 0.95),
      Math.round(base * 1.1),
      Math.round(base * 1.0),
      value,
    ]
  }

  const formatCurrency = (value: number): string => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`
    }
    return `$${value.toFixed(0)}`
  }

  const kpiCards: KPICardProps[] = [
    {
      title: 'Total Leads',
      count: totalLeads.toLocaleString(),
      icon: 'solar:users-group-two-rounded-broken',
      series: generateSparkline(totalLeads),
    },
    {
      title: 'Total Quotes',
      count: totalQuotes.toLocaleString(),
      icon: 'solar:document-text-outline',
      series: generateSparkline(totalQuotes),
    },
    {
      title: 'Quote Value',
      count: formatCurrency(totalQuoteValue),
      icon: 'solar:wallet-outline',
      series: generateSparkline(totalQuoteValue / 100),
    },
    {
      title: 'Content Items',
      count: totalContentItems.toLocaleString(),
      icon: 'solar:file-text-outline',
      series: generateSparkline(totalContentItems),
    },
  ]

  return (
    <Row>
      {kpiCards.map((card, idx) => (
        <Col md={6} xl={3} key={idx}>
          <KPICard {...card} />
        </Col>
      ))}
    </Row>
  )
}

export default DashboardKPICards
