import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Table, Button, Form, Spinner, Row, Col, Badge } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useQuotes, Quote, QuoteStatus, QuoteItem } from './hooks/useQuotes'
import QuoteDetailModal from './components/QuoteDetailModal'

const getStatusBadge = (status: QuoteStatus) => {
  switch (status) {
    case 'pending':
      return <Badge bg="primary">Pending</Badge>
    case 'reviewed':
      return <Badge bg="info">Reviewed</Badge>
    case 'converted':
      return <Badge bg="success">Converted</Badge>
    case 'expired':
      return <Badge bg="secondary">Expired</Badge>
    default:
      return <Badge bg="secondary">{status}</Badge>
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format(amount)
}

const QuotesPage = () => {
  const { quotes, isLoading, error, updateQuote, fetchQuoteItems } = useQuotes()
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [selectedQuoteItems, setSelectedQuoteItems] = useState<QuoteItem[]>([])
  const [isLoadingItems, setIsLoadingItems] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filter quotes by search term and status
  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.reference_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quote.lead_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quote.lead_email || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewClick = async (quote: Quote) => {
    setSelectedQuote(quote)
    setShowDetailModal(true)
    
    // Fetch quote items
    setIsLoadingItems(true)
    const items = await fetchQuoteItems(quote.id)
    setSelectedQuoteItems(items)
    setIsLoadingItems(false)
  }

  const handleCloseModal = () => {
    setShowDetailModal(false)
    setSelectedQuote(null)
    setSelectedQuoteItems([])
  }

  return (
    <>
      <PageTitle subName="CRM" title="Quotes" />

      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h5 className="card-title mb-0">Quotes</h5>
              <div className="d-flex gap-2 align-items-center flex-wrap">
                <Form.Select
                  size="sm"
                  style={{ width: '140px' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="converted">Converted</option>
                  <option value="expired">Expired</option>
                </Form.Select>
                <Form.Control
                  type="search"
                  placeholder="Search quotes..."
                  style={{ width: '200px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Note: No "Add Quote" button - quotes come from public wizard only */}
              </div>
            </CardHeader>

            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="text-muted mt-2 mb-0">Loading quotes...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : filteredQuotes.length === 0 ? (
                <div className="text-center py-5">
                  <IconifyIcon icon="mingcute:document-2-line" className="fs-1 text-muted mb-3" />
                  <h5 className="text-muted">
                    {searchTerm || statusFilter !== 'all'
                      ? 'No quotes match your filters'
                      : 'No quotes submitted yet'}
                  </h5>
                  <p className="text-muted mb-0">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Try a different search term or filter'
                      : 'Quotes will appear here when visitors complete the quote wizard'}
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Reference</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th style={{ width: '100px' }}>Total</th>
                        <th style={{ width: '90px' }}>Billing</th>
                        <th style={{ width: '100px' }}>Date</th>
                        <th style={{ width: '100px' }}>Status</th>
                        <th style={{ width: '80px' }} className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQuotes.map((quote) => (
                        <tr key={quote.id}>
                          <td>
                            <span className="fw-medium">{quote.reference_number}</span>
                          </td>
                          <td>{quote.lead_name || <span className="text-muted">—</span>}</td>
                          <td>{quote.lead_email || <span className="text-muted">—</span>}</td>
                          <td>{formatCurrency(quote.total_amount, quote.currency)}</td>
                          <td>
                            <span className="text-capitalize">{quote.billing_period}</span>
                          </td>
                          <td>{formatDate(quote.created_at)}</td>
                          <td>{getStatusBadge(quote.status)}</td>
                          <td className="text-end">
                            <Button
                              variant="soft-primary"
                              size="sm"
                              onClick={() => handleViewClick(quote)}
                              title="View / Edit"
                            >
                              <IconifyIcon icon="bx:show" />
                            </Button>
                            {/* Note: No Delete button - MVP restriction */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Detail/Edit Modal */}
      <QuoteDetailModal
        show={showDetailModal}
        onClose={handleCloseModal}
        onUpdate={updateQuote}
        quote={selectedQuote}
        quoteItems={selectedQuoteItems}
        isLoadingItems={isLoadingItems}
      />

      <Footer />
    </>
  )
}

export default QuotesPage
