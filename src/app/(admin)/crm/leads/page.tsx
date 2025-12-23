import { useState } from 'react'
import { Card, CardHeader, CardBody, Table, Button, Form, Spinner, Row, Col, Badge } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useLeads, Lead, LeadStatus } from './hooks/useLeads'
import LeadDetailModal from './components/LeadDetailModal'

const getStatusBadge = (status: LeadStatus) => {
  switch (status) {
    case 'new':
      return <Badge bg="primary">New</Badge>
    case 'contacted':
      return <Badge bg="info">Contacted</Badge>
    case 'qualified':
      return <Badge bg="success">Qualified</Badge>
    case 'closed':
      return <Badge bg="secondary">Closed</Badge>
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

const LeadsPage = () => {
  const { leads, isLoading, error, updateLead } = useLeads()
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter leads by search term
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.subject || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewClick = (lead: Lead) => {
    setSelectedLead(lead)
    setShowDetailModal(true)
  }

  return (
    <>
      <PageTitle subName="CRM" title="Leads" />

      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Leads</h5>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="search"
                  placeholder="Search leads..."
                  style={{ width: '200px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Note: No "Add Lead" button - leads come from public forms only */}
              </div>
            </CardHeader>

            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="text-muted mt-2 mb-0">Loading leads...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">
                    {searchTerm ? 'No leads match your search' : 'No leads captured yet'}
                  </h5>
                  <p className="text-muted mb-0">
                    {searchTerm
                      ? 'Try a different search term'
                      : 'Leads will appear here when visitors submit the contact form'}
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Source</th>
                        <th>Date</th>
                        <th style={{ width: '100px' }}>Status</th>
                        <th style={{ width: '80px' }} className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id}>
                          <td>
                            <span className="fw-medium">{lead.name}</span>
                            {lead.subject && (
                              <>
                                <br />
                                <small className="text-muted" title={lead.subject}>
                                  {lead.subject.length > 40
                                    ? lead.subject.substring(0, 40) + '...'
                                    : lead.subject}
                                </small>
                              </>
                            )}
                          </td>
                          <td>{lead.email}</td>
                          <td>
                            <span className="text-capitalize">{lead.source.replace('_', ' ')}</span>
                          </td>
                          <td>{formatDate(lead.created_at)}</td>
                          <td>{getStatusBadge(lead.status)}</td>
                          <td className="text-end">
                            <Button
                              variant="soft-primary"
                              size="sm"
                              onClick={() => handleViewClick(lead)}
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
      <LeadDetailModal
        show={showDetailModal}
        onClose={() => {
          setShowDetailModal(false)
          setSelectedLead(null)
        }}
        onUpdate={updateLead}
        lead={selectedLead}
      />

      <Footer />
    </>
  )
}

export default LeadsPage
