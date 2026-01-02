import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'

interface QuotesBreakdown {
  pending: number
  reviewed: number
  converted: number
  expired: number
  totalValue: number
  currency: string
}

interface DashboardQuotesBreakdownProps {
  data: QuotesBreakdown
}

const DashboardQuotesBreakdown = ({ data }: DashboardQuotesBreakdownProps) => {
  const series = [data.pending, data.reviewed, data.converted, data.expired]
  const labels = ['Pending', 'Reviewed', 'Converted', 'Expired']
  const colors = ['#f9b931', '#7e67fe', '#17c553', '#ff6c6c']

  const total = series.reduce((sum, val) => sum + val, 0)

  const chartOptions: ApexOptions = {
    chart: {
      height: 180,
      type: 'donut',
    },
    series: series,
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: false,
            total: {
              showAlways: true,
              show: true,
            },
          },
        },
      },
    },
    labels: labels,
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
    fill: {
      type: 'gradient',
    },
  }

  const tableData = [
    { label: 'Pending', count: data.pending, color: '#f9b931' },
    { label: 'Reviewed', count: data.reviewed, color: '#7e67fe' },
    { label: 'Converted', count: data.converted, color: '#17c553' },
    { label: 'Expired', count: data.expired, color: '#ff6c6c' },
  ]

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Col lg={6}>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between gap-2">
          <h4 className="card-title flex-grow-1 mb-0">Quotes by Status</h4>
          <span className="badge bg-primary-subtle text-primary">
            {formatCurrency(data.totalValue, data.currency)} Total
          </span>
        </CardHeader>
        <CardBody>
          {total === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted mb-0">No quote data available</p>
            </div>
          ) : (
            <>
              <div dir="ltr">
                <div className="apex-charts">
                  <ReactApexChart height={180} options={chartOptions} series={series} type="donut" />
                </div>
              </div>
              <div className="table-responsive mb-n1 mt-2">
                <table className="table table-nowrap table-borderless table-sm table-centered mb-0">
                  <thead className="bg-light bg-opacity-50 thead-sm">
                    <tr>
                      <th className="py-1">Status</th>
                      <th className="py-1">Count</th>
                      <th className="py-1">Perc.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <span
                            className="d-inline-block rounded-circle me-1"
                            style={{ width: 8, height: 8, backgroundColor: item.color }}
                          />
                          {item.label}
                        </td>
                        <td>{item.count.toLocaleString()}</td>
                        <td>{total > 0 ? Math.round((item.count / total) * 100) : 0}%</td>
                      </tr>
                    ))}
                    <tr className="fw-semibold">
                      <td>Total</td>
                      <td>{total.toLocaleString()}</td>
                      <td>100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </Col>
  )
}

export default DashboardQuotesBreakdown
