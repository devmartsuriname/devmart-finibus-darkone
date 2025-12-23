import { useEffect, useState } from 'react'
import { Card, Row, Col, Form, InputGroup, Button, Spinner, Badge, Table } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import { usePages, type Page } from './hooks/usePages'
import PageEditModal from './components/PageEditModal'

const PagesPage = () => {
  const { pages, loading, fetchPages, updatePage } = usePages()
  const [search, setSearch] = useState('')
  const [editingPage, setEditingPage] = useState<Page | null>(null)

  useEffect(() => {
    fetchPages()
  }, [fetchPages])

  const filteredPages = pages.filter((page) => {
    const searchLower = search.toLowerCase()
    return (
      page.title.toLowerCase().includes(searchLower) ||
      page.slug.toLowerCase().includes(searchLower)
    )
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <>
      <PageTitle subName="Content" title="Pages" />

      <Row>
        <Col xs={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h4 className="header-title mb-0">Static Pages</h4>
                <p className="text-muted mb-0 mt-1 small">
                  Manage SEO metadata for predefined site pages. Slugs are fixed.
                </p>
              </div>
              <InputGroup style={{ maxWidth: 300 }}>
                <Form.Control
                  type="text"
                  placeholder="Search pages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Card.Header>
            <Card.Body className="p-0">
              {loading && pages.length === 0 ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="text-muted mt-2 mb-0">Loading pages...</p>
                </div>
              ) : filteredPages.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">
                    {search ? 'No pages match your search.' : 'No pages found.'}
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="mb-0" hover>
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Updated</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPages.map((page) => (
                        <tr key={page.id}>
                          <td>
                            <span className="fw-medium">{page.title}</span>
                            {page.meta_title && (
                              <div className="text-muted small text-truncate" style={{ maxWidth: 250 }}>
                                {page.meta_title}
                              </div>
                            )}
                          </td>
                          <td>
                            <code className="text-muted">/{page.slug}</code>
                          </td>
                          <td>
                            <Badge bg={page.is_published ? 'success' : 'secondary'}>
                              {page.is_published ? 'Published' : 'Draft'}
                            </Badge>
                          </td>
                          <td className="text-muted">{formatDate(page.updated_at)}</td>
                          <td className="text-end">
                            <Button
                              variant="link"
                              size="sm"
                              className="text-primary p-0"
                              onClick={() => setEditingPage(page)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <PageEditModal
        show={!!editingPage}
        page={editingPage}
        loading={loading}
        onClose={() => setEditingPage(null)}
        onSave={updatePage}
      />

      <Footer />
    </>
  )
}

export default PagesPage
