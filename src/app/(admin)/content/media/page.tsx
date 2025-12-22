import { useState } from 'react'
import { Card, CardHeader, CardBody, Table, Button, Form, Spinner, Row, Col } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useMediaLibrary, formatFileSize } from './hooks/useMediaLibrary'
import AddMediaModal from './components/AddMediaModal'
import DeleteMediaModal from './components/DeleteMediaModal'
import type { Tables } from '@/integrations/supabase/types'

type MediaItem = Tables<'media'>

const MediaPage = () => {
  const { media, isLoading, error, uploadMedia, deleteMedia, copyToClipboard } = useMediaLibrary()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter media by search term (UI only)
  const filteredMedia = media.filter((item) =>
    item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleDeleteClick = (mediaItem: MediaItem) => {
    setSelectedMedia(mediaItem)
    setShowDeleteModal(true)
  }

  const handleViewClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return 'bx:image'
    if (fileType === 'application/pdf') return 'bx:file-blank'
    return 'bx:file'
  }

  const isImageType = (fileType: string) => fileType.startsWith('image/')

  return (
    <>
      <PageTitle subName="Content" title="Media Library" />

      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Media Files</h5>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="search"
                  placeholder="Search files..."
                  style={{ width: '200px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                  <IconifyIcon icon="bx:plus" className="me-1" />
                  Add Media
                </Button>
              </div>
            </CardHeader>

            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="text-muted mt-2 mb-0">Loading media files...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="text-center py-5">
                  <IconifyIcon 
                    icon="bx:folder-open" 
                    className="text-muted mb-3" 
                    style={{ fontSize: '64px' }} 
                  />
                  <h5 className="text-muted">
                    {searchTerm ? 'No files match your search' : 'No media files yet'}
                  </h5>
                  <p className="text-muted mb-3">
                    {searchTerm 
                      ? 'Try a different search term' 
                      : 'Upload your first file to get started'}
                  </p>
                  {!searchTerm && (
                    <Button variant="primary" onClick={() => setShowAddModal(true)}>
                      <IconifyIcon icon="bx:cloud-upload" className="me-1" />
                      Upload File
                    </Button>
                  )}
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>Preview</th>
                        <th>Filename</th>
                        <th style={{ width: '100px' }}>Type</th>
                        <th style={{ width: '100px' }}>Size</th>
                        <th style={{ width: '120px' }}>Uploaded</th>
                        <th style={{ width: '180px' }} className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMedia.map((item) => (
                        <tr key={item.id}>
                          <td>
                            {isImageType(item.file_type) ? (
                              <img
                                src={item.public_url}
                                alt={item.alt_text || item.filename}
                                className="avatar-sm rounded"
                                style={{ objectFit: 'cover' }}
                              />
                            ) : (
                              <div className="avatar-sm">
                                <span className="avatar-title bg-light text-primary rounded">
                                  <IconifyIcon icon={getFileTypeIcon(item.file_type)} />
                                </span>
                              </div>
                            )}
                          </td>
                          <td>
                            <div>
                              <span className="fw-medium text-truncate d-block" style={{ maxWidth: '250px' }}>
                                {item.filename}
                              </span>
                              {item.title && (
                                <small className="text-muted">{item.title}</small>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark">
                              {item.file_type.split('/')[1]?.toUpperCase() || item.file_type}
                            </span>
                          </td>
                          <td>{formatFileSize(item.file_size)}</td>
                          <td>{formatDate(item.created_at)}</td>
                          <td className="text-end">
                            <Button
                              variant="soft-info"
                              size="sm"
                              className="me-1"
                              onClick={() => handleViewClick(item.public_url)}
                              title="View"
                            >
                              <IconifyIcon icon="bx:show" />
                            </Button>
                            <Button
                              variant="soft-secondary"
                              size="sm"
                              className="me-1"
                              onClick={() => copyToClipboard(item.public_url)}
                              title="Copy URL"
                            >
                              <IconifyIcon icon="bx:copy" />
                            </Button>
                            <Button
                              variant="soft-danger"
                              size="sm"
                              onClick={() => handleDeleteClick(item)}
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

      {/* Add Media Modal */}
      <AddMediaModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onUpload={uploadMedia}
      />

      {/* Delete Confirmation Modal */}
      <DeleteMediaModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedMedia(null)
        }}
        onDelete={deleteMedia}
        mediaItem={selectedMedia}
      />

      <Footer />
    </>
  )
}

export default MediaPage
