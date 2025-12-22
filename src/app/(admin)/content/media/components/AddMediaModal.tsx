import { useState, useCallback } from 'react'
import { Modal, Button, Form, Spinner, Row, Col, Card } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { formatFileSize } from '../hooks/useMediaLibrary'

interface AddMediaModalProps {
  show: boolean
  onClose: () => void
  onUpload: (file: File, metadata: { title?: string; alt_text?: string }) => Promise<boolean>
}

// Validation constants
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']

const AddMediaModal = ({ show, onClose, onUpload }: AddMediaModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [altText, setAltText] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const resetForm = useCallback(() => {
    setSelectedFile(null)
    setPreview(null)
    setTitle('')
    setAltText('')
    setValidationError(null)
    setIsUploading(false)
  }, [])

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleFileDrop = (acceptedFiles: File[]) => {
    setValidationError(null)
    
    if (acceptedFiles.length === 0) return
    
    const file = acceptedFiles[0]
    
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setValidationError(`File type not allowed. Allowed: ${ALLOWED_TYPES.map(t => t.split('/')[1]).join(', ')}`)
      return
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setValidationError(`File too large. Maximum size: ${formatFileSize(MAX_FILE_SIZE)}`)
      return
    }
    
    setSelectedFile(file)
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    
    setIsUploading(true)
    
    const success = await onUpload(selectedFile, {
      title: title.trim() || undefined,
      alt_text: altText.trim() || undefined,
    })
    
    setIsUploading(false)
    
    if (success) {
      handleClose()
    }
  }

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setSelectedFile(null)
    setPreview(null)
    setValidationError(null)
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">Upload Media</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {!selectedFile ? (
          <Dropzone 
            onDrop={handleFileDrop} 
            maxFiles={1}
            accept={{
              'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
              'application/pdf': ['.pdf']
            }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div 
                className={`dropzone dropzone-custom text-center p-4 ${isDragActive ? 'border-primary' : ''}`}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <IconifyIcon 
                  icon="bx:cloud-upload" 
                  className="text-primary mb-2" 
                  style={{ fontSize: '48px' }} 
                />
                <h5 className="mb-1">Drop files here or click to upload</h5>
                <p className="text-muted mb-0">
                  Supported: JPEG, PNG, GIF, WebP, PDF (Max 10MB)
                </p>
              </div>
            )}
          </Dropzone>
        ) : (
          <Card className="mb-0 shadow-none border">
            <div className="p-3">
              <Row className="align-items-center">
                {preview ? (
                  <Col xs="auto">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="avatar-lg rounded bg-light"
                      style={{ objectFit: 'cover' }}
                    />
                  </Col>
                ) : (
                  <Col xs="auto">
                    <div className="avatar-lg">
                      <span className="avatar-title bg-primary rounded fs-24">
                        {selectedFile.name.split('.').pop()?.toUpperCase()}
                      </span>
                    </div>
                  </Col>
                )}
                <Col className="ps-0">
                  <h6 className="mb-1 text-truncate" style={{ maxWidth: '300px' }}>
                    {selectedFile.name}
                  </h6>
                  <p className="mb-0 text-muted">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </Col>
                <Col xs="auto">
                  <Button 
                    variant="soft-danger" 
                    size="sm" 
                    onClick={removeFile}
                    disabled={isUploading}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        )}
        
        {validationError && (
          <div className="alert alert-danger mt-3 mb-0">
            {validationError}
          </div>
        )}
        
        {selectedFile && (
          <div className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Title (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isUploading}
                maxLength={200}
              />
            </Form.Group>
            
            <Form.Group className="mb-0">
              <Form.Label>Alt Text (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Describe the image for accessibility"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                disabled={isUploading}
                maxLength={255}
              />
              <Form.Text className="text-muted">
                Alternative text helps with accessibility and SEO.
              </Form.Text>
            </Form.Group>
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={handleClose} disabled={isUploading}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? (
            <>
              <Spinner size="sm" className="me-1" />
              Uploading...
            </>
          ) : (
            'Upload'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddMediaModal
