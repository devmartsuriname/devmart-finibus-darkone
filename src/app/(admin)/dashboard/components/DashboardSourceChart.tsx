import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'

interface LeadsBySource {
  source: string
  count: number
  percentage: number
}

interface DashboardSourceChartProps {
  data: LeadsBySource[]
}

const DashboardSourceChart = ({ data }: DashboardSourceChartProps) => {
  const series = data.map((d) => d.count)
  const labels = data.map((d) => d.source)
  const colors = ['#7e67fe', '#17c553', '#7942ed', '#f9b931', '#ff6c6c']

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
    colors: colors.slice(0, data.length),
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

  const totalLeads = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <Col lg={4}>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between gap-2">
          <h4 className="card-title flex-grow-1 mb-0">Leads by Source</h4>
        </CardHeader>
        <CardBody>
          {data.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted mb-0">No lead data available</p>
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
                      <th className="py-1">Source</th>
                      <th className="py-1">Count</th>
                      <th className="py-1">Perc.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, idx) => (
                      <tr key={idx}>
                        <td className="text-capitalize">{item.source.replace('_', ' ')}</td>
                        <td>{item.count.toLocaleString()}</td>
                        <td>{item.percentage}%</td>
                      </tr>
                    ))}
                    <tr className="fw-semibold">
                      <td>Total</td>
                      <td>{totalLeads.toLocaleString()}</td>
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

export default DashboardSourceChart
