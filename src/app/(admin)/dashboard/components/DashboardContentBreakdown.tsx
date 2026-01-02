import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'

interface ContentBreakdown {
  blogPublished: number
  blogDraft: number
  projectsActive: number
  projectsInactive: number
  servicesActive: number
  servicesInactive: number
}

interface DashboardContentBreakdownProps {
  data: ContentBreakdown
}

const DashboardContentBreakdown = ({ data }: DashboardContentBreakdownProps) => {
  const series = [
    data.blogPublished,
    data.blogDraft,
    data.projectsActive,
    data.servicesActive,
  ]
  const labels = ['Blog (Published)', 'Blog (Draft)', 'Projects', 'Services']
  const colors = ['#17c553', '#6c757d', '#7e67fe', '#f9b931']

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
    { label: 'Blog (Published)', count: data.blogPublished, color: '#17c553' },
    { label: 'Blog (Draft)', count: data.blogDraft, color: '#6c757d' },
    { label: 'Projects', count: data.projectsActive, color: '#7e67fe' },
    { label: 'Services', count: data.servicesActive, color: '#f9b931' },
  ]

  return (
    <Col lg={6}>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between gap-2">
          <h4 className="card-title flex-grow-1 mb-0">Content Breakdown</h4>
        </CardHeader>
        <CardBody>
          {total === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted mb-0">No content data available</p>
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
                      <th className="py-1">Type</th>
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

export default DashboardContentBreakdown
