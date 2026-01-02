import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface RecentQuote {
  id: string
  reference_number: string
  total_amount: number
  currency: string
  billing_period: string
  status: string
  created_at: string
}

interface DashboardRecentQuotesProps {
  quotes: RecentQuote[]
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <span className="badge badge-soft-warning">Pending</span>
    case 'sent':
      return <span className="badge badge-soft-info">Sent</span>
    case 'accepted':
      return <span className="badge badge-soft-success">Accepted</span>
    case 'declined':
      return <span className="badge badge-soft-danger">Declined</span>
    default:
      return <span className="badge badge-soft-secondary">{status}</span>
  }
}

const DashboardRecentQuotes = ({ quotes }: DashboardRecentQuotesProps) => {
  return (
    <Col xl={6}>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <h4 className="card-title mb-0">Recent Quotes</h4>
          <Link to="/crm/quotes" className="btn btn-sm btn-light">
            View All
          </Link>
        </CardHeader>
        <CardBody>
          {quotes.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted mb-0">No quotes yet</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 table-centered">
                <thead>
                  <tr>
                    <th className="py-1">Reference</th>
                    <th className="py-1">Amount</th>
                    <th className="py-1">Status</th>
                    <th className="py-1">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id}>
                      <td>
                        <span className="fw-medium">{quote.reference_number}</span>
                        <br />
                        <small className="text-muted text-capitalize">{quote.billing_period}</small>
                      </td>
                      <td>{formatCurrency(quote.total_amount, quote.currency)}</td>
                      <td>{getStatusBadge(quote.status)}</td>
                      <td>{formatDate(quote.created_at)}</td>
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

export default DashboardRecentQuotes
