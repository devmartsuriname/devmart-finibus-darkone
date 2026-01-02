import { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Form, Spinner, Row, Col } from 'react-bootstrap'
import { Lead, LeadStatus, LeadUpdateInput } from '../hooks/useLeads'

interface LeadDetailModalProps {
  show: boolean
  onClose: () => void
  onUpdate: (id: string, input: LeadUpdateInput) => Promise<boolean>
  lead: Lead | null
}

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'closed', label: 'Closed' },
]

const LeadDetailModal = ({ show, onClose, onUpdate, lead }: LeadDetailModalProps) => {
  // Form state (only editable fields)
  const [status, setStatus] = useState<LeadStatus>('new')
  const [notes, setNotes] = useState('')

  // UI state
  const [isSaving, setIsSaving] = useState(false)

  // Reset form when modal opens or lead changes
  useEffect(() => {
    if (show && lead) {
      setStatus(lead.status)
      setNotes(lead.notes || '')
    }
  }, [show, lead])

  const handleSubmit = async () => {
    if (!lead) return

    setIsSaving(true)

    const input: LeadUpdateInput = {
      status,
      notes: notes.trim() || null,
    }

    const success = await onUpdate(lead.id, input)

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

  if (!lead) return null

  return (
    <Modal show={show} onHide={handleClose} centered size="xl">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">Lead Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          {/* Left Column - Read-only Lead Information */}
          <Col md={6}>
            <h6 className="text-muted mb-3">Contact Information</h6>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-muted small">Name</Form.Label>
              <Form.Control
                type="text"
                value={lead.name}
                disabled
                plaintext
                className="fw-medium"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted small">Email</Form.Label>
              <Form.Control
                type="email"
                value={lead.email}
                disabled
                plaintext
              />
            </Form.Group>

            {lead.subject && (
              <Form.Group className="mb-3">
                <Form.Label className="text-muted small">Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={lead.subject}
                  disabled
                  plaintext
                />
              </Form.Group>
            )}

            {lead.message && (
              <Form.Group className="mb-3">
                <Form.Label className="text-muted small">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={lead.message}
                  disabled
                  className="bg-light"
                />
              </Form.Group>
            )}

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small">Source</Form.Label>
                  <Form.Control
                    type="text"
                    value={lead.source}
                    disabled
                    plaintext
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small">Submitted</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatDate(lead.created_at)}
                    disabled
                    plaintext
                    className="small"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Phase 7A: Marketing Attribution (Read-Only) */}
            {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
              <>
                <h6 className="text-muted mb-3 mt-4">Marketing Attribution</h6>
                <Row>
                  {lead.utm_source && (
                    <Col xs={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">UTM Source</Form.Label>
                        <Form.Control
                          type="text"
                          value={lead.utm_source}
                          disabled
                          plaintext
                          className="small"
                        />
                      </Form.Group>
                    </Col>
                  )}
                  {lead.utm_medium && (
                    <Col xs={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">UTM Medium</Form.Label>
                        <Form.Control
                          type="text"
                          value={lead.utm_medium}
                          disabled
                          plaintext
                          className="small"
                        />
                      </Form.Group>
                    </Col>
                  )}
                  {lead.utm_campaign && (
                    <Col xs={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">UTM Campaign</Form.Label>
                        <Form.Control
                          type="text"
                          value={lead.utm_campaign}
                          disabled
                          plaintext
                          className="small"
                        />
                      </Form.Group>
                    </Col>
                  )}
                </Row>
                {(lead.utm_content || lead.utm_term) && (
                  <Row>
                    {lead.utm_content && (
                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-muted small">UTM Content</Form.Label>
                          <Form.Control
                            type="text"
                            value={lead.utm_content}
                            disabled
                            plaintext
                            className="small"
                          />
                        </Form.Group>
                      </Col>
                    )}
                    {lead.utm_term && (
                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-muted small">UTM Term</Form.Label>
                          <Form.Control
                            type="text"
                            value={lead.utm_term}
                            disabled
                            plaintext
                            className="small"
                          />
                        </Form.Group>
                      </Col>
                    )}
                  </Row>
                )}
              </>
            )}
          </Col>

          {/* Right Column - Editable Fields */}
          <Col md={6}>
            <h6 className="text-muted mb-3">Lead Management</h6>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value as LeadStatus)}
                disabled={isSaving}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Internal Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Add internal notes about this lead..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isSaving}
              />
              <Form.Text className="text-muted">
                Notes are visible to admins only
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
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

export default LeadDetailModal
