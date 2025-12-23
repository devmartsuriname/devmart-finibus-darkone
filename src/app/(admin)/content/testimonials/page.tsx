import { useState } from 'react'
import { Card, CardHeader, CardBody, Table, Button, Form, Spinner, Row, Col, Badge, Image } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useTestimonials, Testimonial } from './hooks/useTestimonials'
import TestimonialModal from './components/TestimonialModal'
import DeleteTestimonialModal from './components/DeleteTestimonialModal'

const TestimonialsPage = () => {
  const { testimonials, isLoading, error, createTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter testimonials by search term
  const filteredTestimonials = testimonials.filter((testimonial) =>
    testimonial.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (testimonial.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEditClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setShowEditModal(true)
  }

  const handleDeleteClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setShowDeleteModal(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge bg="success">Published</Badge>
      default:
        return <Badge bg="secondary">Draft</Badge>
    }
  }

  const truncateQuote = (quote: string, maxLength: number = 60) => {
    if (quote.length <= maxLength) return quote
    return quote.substring(0, maxLength) + '...'
  }

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-muted">-</span>
    return (
      <span className="text-warning">
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </span>
    )
  }

  return (
    <>
      <PageTitle subName="Content" title="Testimonials" />

      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Testimonials</h5>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="search"
                  placeholder="Search testimonials..."
                  style={{ width: '200px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                  Add Testimonial
                </Button>
              </div>
            </CardHeader>

            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="text-muted mt-2 mb-0">Loading testimonials...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : filteredTestimonials.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">
                    {searchTerm ? 'No testimonials match your search' : 'No testimonials yet'}
                  </h5>
                  <p className="text-muted mb-3">
                    {searchTerm
                      ? 'Try a different search term'
                      : 'Create your first testimonial to get started'}
                  </p>
                  {!searchTerm && (
                    <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                      Add Testimonial
                    </Button>
                  )}
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>Avatar</th>
                        <th>Author</th>
                        <th>Quote</th>
                        <th style={{ width: '100px' }}>Rating</th>
                        <th style={{ width: '100px' }}>Status</th>
                        <th style={{ width: '80px' }}>Featured</th>
                        <th style={{ width: '100px' }} className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTestimonials.map((testimonial) => (
                        <tr key={testimonial.id}>
                          <td>
                            {testimonial.avatar_url ? (
                              <Image
                                src={testimonial.avatar_url}
                                alt={testimonial.author_name}
                                roundedCircle
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              />
                            ) : (
                              <div
                                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: '40px', height: '40px' }}
                              >
                                <IconifyIcon icon="bx:user" className="text-muted" />
                              </div>
                            )}
                          </td>
                          <td>
                            <div>
                              <span className="fw-medium">{testimonial.author_name}</span>
                              {(testimonial.author_title || testimonial.company) && (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    {testimonial.author_title}
                                    {testimonial.author_title && testimonial.company && ', '}
                                    {testimonial.company}
                                  </small>
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            <span title={testimonial.quote}>
                              {truncateQuote(testimonial.quote)}
                            </span>
                          </td>
                          <td>{renderStars(testimonial.rating)}</td>
                          <td>{getStatusBadge(testimonial.status)}</td>
                          <td>
                            {testimonial.featured ? (
                              <Badge bg="info">
                                {testimonial.display_order ? `#${testimonial.display_order}` : 'Yes'}
                              </Badge>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td className="text-end">
                            <Button
                              variant="soft-primary"
                              size="sm"
                              className="me-1"
                              onClick={() => handleEditClick(testimonial)}
                              title="Edit"
                            >
                              <IconifyIcon icon="bx:edit" />
                            </Button>
                            <Button
                              variant="soft-danger"
                              size="sm"
                              onClick={() => handleDeleteClick(testimonial)}
                              title="Delete"
                            >
                              <IconifyIcon icon="bx:trash" />
                            </Button>
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

      {/* Create Modal */}
      <TestimonialModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={createTestimonial}
      />

      {/* Edit Modal */}
      <TestimonialModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedTestimonial(null)
        }}
        onSave={createTestimonial}
        onUpdate={updateTestimonial}
        testimonial={selectedTestimonial}
      />

      {/* Delete Modal */}
      <DeleteTestimonialModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedTestimonial(null)
        }}
        onDelete={deleteTestimonial}
        testimonial={selectedTestimonial}
      />

      <Footer />
    </>
  )
}

export default TestimonialsPage
