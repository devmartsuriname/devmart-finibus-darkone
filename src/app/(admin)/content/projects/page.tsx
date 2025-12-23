import { useState } from 'react'
import { Card, CardHeader, CardBody, Table, Button, Form, Spinner, Row, Col, Badge, Image } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useProjects, Project } from './hooks/useProjects'
import ProjectModal from './components/ProjectModal'
import DeleteProjectModal from './components/DeleteProjectModal'

const ProjectsPage = () => {
  const { projects, isLoading, error, createProject, updateProject, deleteProject } = useProjects()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter projects by search term
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.heading.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEditClick = (project: Project) => {
    setSelectedProject(project)
    setShowEditModal(true)
  }

  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project)
    setShowDeleteModal(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge bg="success">Published</Badge>
      case 'archived':
        return <Badge bg="warning">Archived</Badge>
      default:
        return <Badge bg="secondary">Draft</Badge>
    }
  }

  return (
    <>
      <PageTitle subName="Content" title="Projects" />

      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Projects</h5>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="search"
                  placeholder="Search projects..."
                  style={{ width: '200px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                  <IconifyIcon icon="bx:plus" className="me-1" />
                  Add Project
                </Button>
              </div>
            </CardHeader>

            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="text-muted mt-2 mb-0">Loading projects...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">
                    {searchTerm ? 'No projects match your search' : 'No projects yet'}
                  </h5>
                  <p className="text-muted mb-3">
                    {searchTerm
                      ? 'Try a different search term'
                      : 'Create your first project to get started'}
                  </p>
                  {!searchTerm && (
                    <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                      <IconifyIcon icon="bx:plus" className="me-1" />
                      Add Project
                    </Button>
                  )}
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>Thumb</th>
                        <th>Title</th>
                        <th style={{ width: '120px' }}>Category</th>
                        <th style={{ width: '100px' }}>Status</th>
                        <th style={{ width: '80px' }}>Featured</th>
                        <th style={{ width: '100px' }} className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => (
                        <tr key={project.id}>
                          <td>
                            {project.image_url ? (
                              <Image
                                src={project.image_url}
                                alt={project.title}
                                rounded
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              />
                            ) : (
                              <div
                                className="bg-light rounded d-flex align-items-center justify-content-center"
                                style={{ width: '40px', height: '40px' }}
                              >
                                <IconifyIcon icon="bx:image" className="text-muted" />
                              </div>
                            )}
                          </td>
                          <td>
                            <div>
                              <span className="fw-medium">{project.title}</span>
                              <br />
                              <small className="text-muted">{project.heading}</small>
                            </div>
                          </td>
                          <td>
                            <Badge bg="light" text="dark">{project.category}</Badge>
                          </td>
                          <td>{getStatusBadge(project.status)}</td>
                          <td>
                            {project.is_featured ? (
                              <Badge bg="info">
                                {project.display_order ? `#${project.display_order}` : 'Yes'}
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
                              onClick={() => handleEditClick(project)}
                              title="Edit"
                            >
                              <IconifyIcon icon="bx:edit" />
                            </Button>
                            <Button
                              variant="soft-danger"
                              size="sm"
                              onClick={() => handleDeleteClick(project)}
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
      <ProjectModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={createProject}
      />

      {/* Edit Modal */}
      <ProjectModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedProject(null)
        }}
        onSave={createProject}
        onUpdate={updateProject}
        project={selectedProject}
      />

      {/* Delete Modal */}
      <DeleteProjectModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedProject(null)
        }}
        onDelete={deleteProject}
        project={selectedProject}
      />

      <Footer />
    </>
  )
}

export default ProjectsPage
