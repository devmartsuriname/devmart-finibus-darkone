import { useState } from 'react'
import { Card, CardHeader, CardBody, Table, Button, Form, Spinner, Row, Col, Badge } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useBlogPosts, BlogPost } from './hooks/useBlogPosts'
import BlogPostModal from './components/BlogPostModal'
import DeleteBlogPostModal from './components/DeleteBlogPostModal'

const BlogPage = () => {
  const { posts, isLoading, error, createPost, updatePost, deletePost } = useBlogPosts()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter posts by search term (UI only)
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEditClick = (post: BlogPost) => {
    setSelectedPost(post)
    setShowEditModal(true)
  }

  const handleDeleteClick = (post: BlogPost) => {
    setSelectedPost(post)
    setShowDeleteModal(true)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return <Badge bg="success">Published</Badge>
    }
    return <Badge bg="secondary">Draft</Badge>
  }

  return (
    <>
      <PageTitle subName="Content" title="Blog" />

      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Blog Posts</h5>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="search"
                  placeholder="Search posts..."
                  style={{ width: '200px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                  <IconifyIcon icon="bx:plus" className="me-1" />
                  Add Post
                </Button>
              </div>
            </CardHeader>

            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="text-muted mt-2 mb-0">Loading blog posts...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-5">
                  <IconifyIcon
                    icon="bx:file-blank"
                    className="text-muted mb-3"
                    style={{ fontSize: '64px' }}
                  />
                  <h5 className="text-muted">
                    {searchTerm ? 'No posts match your search' : 'No blog posts yet'}
                  </h5>
                  <p className="text-muted mb-3">
                    {searchTerm
                      ? 'Try a different search term'
                      : 'Create your first blog post to get started'}
                  </p>
                  {!searchTerm && (
                    <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                      <IconifyIcon icon="bx:plus" className="me-1" />
                      Create Post
                    </Button>
                  )}
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th style={{ width: '100px' }}>Status</th>
                        <th style={{ width: '120px' }}>Published</th>
                        <th style={{ width: '120px' }}>Updated</th>
                        <th style={{ width: '120px' }} className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPosts.map((post) => (
                        <tr key={post.id}>
                          <td>
                            <div>
                              <span className="fw-medium">{post.title}</span>
                              <br />
                              <small className="text-muted">/{post.slug}</small>
                            </div>
                          </td>
                          <td>{getStatusBadge(post.status)}</td>
                          <td>{formatDate(post.published_at)}</td>
                          <td>{formatDate(post.updated_at)}</td>
                          <td className="text-end">
                            <Button
                              variant="soft-primary"
                              size="sm"
                              className="me-1"
                              onClick={() => handleEditClick(post)}
                              title="Edit"
                            >
                              <IconifyIcon icon="bx:edit" />
                            </Button>
                            <Button
                              variant="soft-danger"
                              size="sm"
                              onClick={() => handleDeleteClick(post)}
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
      <BlogPostModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={createPost}
      />

      {/* Edit Modal */}
      <BlogPostModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedPost(null)
        }}
        onSave={createPost}
        onUpdate={updatePost}
        post={selectedPost}
      />

      {/* Delete Modal */}
      <DeleteBlogPostModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedPost(null)
        }}
        onDelete={deletePost}
        post={selectedPost}
      />

      <Footer />
    </>
  )
}

export default BlogPage
