import { Card, CardBody, CardHeader } from 'react-bootstrap'
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
  const colors = ['#17c553', '#7e67fe', '#f9b931', '#7942ed', '#fa5c7c']

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
    colors: colors.slice(0, leadsBySource.length),
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

  return (
    <Card>
      <CardHeader className="d-flex align-items-center justify-content-between gap-2">
        <h4 className="card-title flex-grow-1 mb-0">Leads by Source</h4>
      </CardHeader>
      <CardBody>
        {leadsBySource.length > 0 ? (
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
                    <th className="py-1">Source</th>
                    <th className="py-1">Count</th>
                    <th className="py-1">Perc.</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsBySource.map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-capitalize">{formatSource(item.source)}</td>
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
