import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface RecentLead {
  id: string
  name: string
  email: string
  source: string
  status: string
  created_at: string
}

interface DashboardRecentLeadsProps {
  leads: RecentLead[]
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return <span className="badge badge-soft-info">New</span>
    case 'contacted':
      return <span className="badge badge-soft-primary">Contacted</span>
    case 'qualified':
      return <span className="badge badge-soft-success">Qualified</span>
    case 'closed':
      return <span className="badge badge-soft-secondary">Closed</span>
    default:
      return <span className="badge badge-soft-secondary">{status}</span>
  }
}

const DashboardRecentLeads = ({ leads }: DashboardRecentLeadsProps) => {
  return (
    <Col xl={6}>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <h4 className="card-title mb-0">Recent Leads</h4>
          <Link to="/crm/leads" className="btn btn-sm btn-light">
            View All
          </Link>
        </CardHeader>
        <CardBody className="pb-1">
          {leads.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted mb-0">No leads yet</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 table-centered">
                <thead>
                  <tr>
                    <th className="py-1">Name</th>
                    <th className="py-1">Source</th>
                    <th className="py-1">Status</th>
                    <th className="py-1">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <span className="fw-medium">{lead.name}</span>
                        <br />
                        <small className="text-muted">{lead.email}</small>
                      </td>
                      <td className="text-capitalize">{lead.source.replace('_', ' ')}</td>
                      <td>{getStatusBadge(lead.status)}</td>
                      <td>{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </Col>
  )
}

export default DashboardRecentLeads
