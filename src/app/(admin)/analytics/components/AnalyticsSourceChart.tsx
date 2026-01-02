import { Card, CardBody, CardHeader, CardTitle, Table } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface AnalyticsSourceChartProps {
  leadsBySource: { source: string; count: number }[]
}

const formatSource = (source: string): string => {
  return source
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const AnalyticsSourceChart = ({ leadsBySource }: AnalyticsSourceChartProps) => {
  const labels = leadsBySource.map((l) => formatSource(l.source))
  const series = leadsBySource.map((l) => l.count)
  const total = series.reduce((a, b) => a + b, 0)

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 200,
    },
    labels,
    colors: ['#17c553', '#7e67fe', '#f9b931', '#7942ed', '#fa5c7c'],
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
          Leads by Source
        </CardTitle>
      </CardHeader>
      <CardBody>
        {leadsBySource.length > 0 ? (
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
                  <th>Source</th>
                  <th className="text-end">Count</th>
                  <th className="text-end">%</th>
                </tr>
              </thead>
              <tbody>
                {leadsBySource.map((item, idx) => (
                  <tr key={idx}>
                    <td>{formatSource(item.source)}</td>
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
            No leads recorded yet
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default AnalyticsSourceChart
