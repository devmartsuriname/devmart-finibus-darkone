import { useState } from 'react'
import { Card, CardHeader, CardBody, Table, Button, Form, Spinner, Row, Col, Badge, Image } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useServices, Service } from './hooks/useServices'
import ServiceModal from './components/ServiceModal'
import DeleteServiceModal from './components/DeleteServiceModal'
import { ServiceMediaSeeder } from './components/ServiceMediaSeeder'

const ServicesPage = () => {
  const { services, isLoading, error, createService, updateService, deleteService } = useServices()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEditClick = (service: Service) => {
    setSelectedService(service)
    setShowEditModal(true)
  }

  const handleDeleteClick = (service: Service) => {
    setSelectedService(service)
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

  // Check if any service has a missing icon
  const hasMissingMedia = services.some((s) => !s.icon_url)

  return (
    <>
      <PageTitle subName="Content" title="Services" />

      {/* Show seeder if media is missing */}
      {hasMissingMedia && !isLoading && (
        <Row className="mb-3">
          <Col xs={12}>
            <ServiceMediaSeeder />
          </Col>
        </Row>
      )}

      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Services</h5>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="search"
                  placeholder="Search services..."
                  style={{ width: '200px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                  <IconifyIcon icon="bx:plus" className="me-1" />
                  Add Service
                </Button>
              </div>
            </CardHeader>

            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="text-muted mt-2 mb-0">Loading services...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">
                    {searchTerm ? 'No services match your search' : 'No services yet'}
                  </h5>
                  <p className="text-muted mb-3">
                    {searchTerm
                      ? 'Try a different search term'
                      : 'Create your first service to get started'}
                  </p>
                  {!searchTerm && (
                    <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                      <IconifyIcon icon="bx:plus" className="me-1" />
                      Add Service
                    </Button>
                  )}
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>Icon</th>
                        <th>Title</th>
                        <th style={{ width: '80px' }}>Order</th>
                        <th style={{ width: '100px' }}>Status</th>
                        <th style={{ width: '150px' }}>Updated</th>
                        <th style={{ width: '100px' }} className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredServices.map((service) => (
                        <tr key={service.id}>
                          <td>
                            {service.icon_url ? (
                              <Image
                                src={service.icon_url}
                                alt={service.title}
                                rounded
                                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                              />
                            ) : (
                              <div
                                className="bg-light rounded d-flex align-items-center justify-content-center"
                                style={{ width: '40px', height: '40px' }}
                              >
                                <IconifyIcon icon="bx:cube" className="text-muted" />
                              </div>
                            )}
                          </td>
                          <td>
                            <div>
                              <span className="fw-medium">{service.title}</span>
                              <br />
                              <small className="text-muted">{service.short_description.substring(0, 50)}...</small>
                            </div>
                          </td>
                          <td>
                            <Badge bg="light" text="dark">{service.display_order}</Badge>
                          </td>
                          <td>{getStatusBadge(service.status)}</td>
                          <td>
                            <small className="text-muted">
                              {new Date(service.updated_at).toLocaleDateString()}
                            </small>
                          </td>
                          <td className="text-end">
                            <Button
                              variant="soft-primary"
                              size="sm"
                              className="me-1"
                              onClick={() => handleEditClick(service)}
                              title="Edit"
                            >
                              <IconifyIcon icon="bx:edit" />
                            </Button>
                            <Button
                              variant="soft-danger"
                              size="sm"
                              onClick={() => handleDeleteClick(service)}
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
      <ServiceModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={createService}
      />

      {/* Edit Modal */}
      <ServiceModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedService(null)
        }}
        onSave={createService}
        onUpdate={updateService}
        service={selectedService}
      />

      {/* Delete Modal */}
      <DeleteServiceModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedService(null)
        }}
        onDelete={deleteService}
        service={selectedService}
      />

      <Footer />
    </>
  )
}

export default ServicesPage