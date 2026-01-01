import { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Form, Spinner, Row, Col, Table, Badge } from 'react-bootstrap'
import { Quote, QuoteStatus, QuoteUpdateInput, QuoteItem } from '../hooks/useQuotes'

interface QuoteDetailModalProps {
  show: boolean
  onClose: () => void
  onUpdate: (id: string, input: QuoteUpdateInput) => Promise<boolean>
  quote: Quote | null
  quoteItems: QuoteItem[]
  isLoadingItems: boolean
}

const STATUS_OPTIONS: { value: QuoteStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'converted', label: 'Converted' },
  { value: 'expired', label: 'Expired' },
]

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

const QuoteDetailModal = ({ show, onClose, onUpdate, quote, quoteItems, isLoadingItems }: QuoteDetailModalProps) => {
  // Form state (only editable fields)
  const [status, setStatus] = useState<QuoteStatus>('pending')

  // UI state
  const [isSaving, setIsSaving] = useState(false)

  // Reset form when modal opens or quote changes
  useEffect(() => {
    if (show && quote) {
      setStatus(quote.status)
    }
  }, [show, quote])

  const handleSubmit = async () => {
    if (!quote) return

    setIsSaving(true)

    const input: QuoteUpdateInput = {
      status,
    }

    const success = await onUpdate(quote.id, input)

    setIsSaving(false)

    if (success) {
      onClose()
    }
  }

  const handleClose = useCallback(() => {
    if (!isSaving) {
      onClose()
    }
  }, [isSaving, onClose])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount)
  }

  if (!quote) return null

  return (
    <Modal show={show} onHide={handleClose} centered size="xl">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">Quote Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          {/* Left Column - Read-only Quote Information */}
          <Col md={6}>
            <h6 className="text-muted mb-3">Quote Information</h6>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-muted small">Reference Number</Form.Label>
              <Form.Control
                type="text"
                value={quote.reference_number}
                disabled
                plaintext
                className="fw-medium"
              />
            </Form.Group>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small">Total Amount</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatCurrency(quote.total_amount, quote.currency)}
                    disabled
                    plaintext
                    className="fw-medium"
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small">Billing Period</Form.Label>
                  <Form.Control
                    type="text"
                    value={quote.billing_period === 'monthly' ? 'Monthly' : 'Yearly'}
                    disabled
                    plaintext
                  />
                </Form.Group>
              </Col>
            </Row>

            <h6 className="text-muted mb-3 mt-4">Contact Information</h6>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted small">Name</Form.Label>
              <Form.Control
                type="text"
                value={quote.lead_name || 'N/A'}
                disabled
                plaintext
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted small">Email</Form.Label>
              <Form.Control
                type="email"
                value={quote.lead_email || 'N/A'}
                disabled
                plaintext
              />
            </Form.Group>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small">Submitted</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatDate(quote.created_at)}
                    disabled
                    plaintext
                    className="small"
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small">Last Updated</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatDate(quote.updated_at)}
                    disabled
                    plaintext
                    className="small"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>

          {/* Right Column - Editable Fields */}
          <Col md={6}>
            <h6 className="text-muted mb-3">Quote Management</h6>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value as QuoteStatus)}
                disabled={isSaving}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Text className="text-muted d-block mb-4">
              Current status: {getStatusBadge(quote.status)}
            </Form.Text>

            {/* Note: Internal notes would require schema change */}
            <div className="alert alert-light mt-4">
              <small className="text-muted">
                <strong>Tip:</strong> To add internal notes, use the Lead detail view (CRM → Leads).
              </small>
            </div>
          </Col>
        </Row>

        {/* Quote Items Section */}
        <hr className="my-4" />
        <h6 className="text-muted mb-3">Selected Services</h6>

        {isLoadingItems ? (
          <div className="text-center py-3">
            <Spinner animation="border" size="sm" />
            <span className="ms-2 text-muted">Loading items...</span>
          </div>
        ) : quoteItems.length === 0 ? (
          <div className="text-center py-3 text-muted">
            No services found for this quote.
          </div>
        ) : (
          <div className="table-responsive">
            <Table className="table-sm mb-0">
              <thead className="table-light">
                <tr>
                  <th>Service</th>
                  <th>Tier</th>
                  <th className="text-end" style={{ width: '120px' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {quoteItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.service_title}</td>
                    <td>{item.plan_name}</td>
                    <td className="text-end">
                      {formatCurrency(item.price_amount, item.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-light">
                <tr>
                  <td colSpan={2} className="fw-medium text-end">Total:</td>
                  <td className="fw-medium text-end">
                    {formatCurrency(quote.total_amount, quote.currency)}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? (
            <>
              <Spinner size="sm" className="me-1" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default QuoteDetailModal
