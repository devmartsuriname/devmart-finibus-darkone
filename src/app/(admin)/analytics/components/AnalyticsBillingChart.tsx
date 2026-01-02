import { Card, CardBody, CardHeader, CardTitle, Table } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface AnalyticsBillingChartProps {
  quotesByBilling: { period: string; count: number }[]
}

const formatPeriod = (period: string): string => {
  return period.charAt(0).toUpperCase() + period.slice(1)
}

const AnalyticsBillingChart = ({ quotesByBilling }: AnalyticsBillingChartProps) => {
  const labels = quotesByBilling.map((q) => formatPeriod(q.period))
  const series = quotesByBilling.map((q) => q.count)
  const total = series.reduce((a, b) => a + b, 0)

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 200,
    },
    labels,
    colors: ['#7e67fe', '#17c553', '#7942ed', '#f9b931'],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '12px',
            },
            value: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '12px',
              formatter: () => String(total),
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 180,
          },
        },
      },
    ],
  }

  return (
    <Card>
      <CardHeader className="border-bottom bg-transparent">
        <CardTitle as="h5" className="mb-0">
          Quotes by Billing Period
        </CardTitle>
      </CardHeader>
      <CardBody>
        {quotesByBilling.length > 0 ? (
          <>
            <ReactApexChart
              options={chartOptions}
              series={series}
              type="donut"
              height={200}
            />
            <Table className="table-sm mt-3 mb-0" borderless>
              <thead>
                <tr>
                  <th>Period</th>
                  <th className="text-end">Count</th>
                  <th className="text-end">%</th>
                </tr>
              </thead>
              <tbody>
                {quotesByBilling.map((item, idx) => (
                  <tr key={idx}>
                    <td>{formatPeriod(item.period)}</td>
                    <td className="text-end">{item.count}</td>
                    <td className="text-end">
                      {total > 0 ? Math.round((item.count / total) * 100) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <div className="text-center text-muted py-5">
            No quotes recorded yet
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default AnalyticsBillingChart
