import { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Form, Spinner, Row, Col } from 'react-bootstrap'
import { Testimonial, TestimonialInput } from '../hooks/useTestimonials'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'

interface TestimonialModalProps {
  show: boolean
  onClose: () => void
  onSave: (input: TestimonialInput) => Promise<boolean>
  onUpdate?: (id: string, input: Partial<TestimonialInput>) => Promise<boolean>
  testimonial?: Testimonial | null
}

const TestimonialModal = ({ show, onClose, onSave, onUpdate, testimonial }: TestimonialModalProps) => {
  const isEditMode = !!testimonial

  // Form state
  const [authorName, setAuthorName] = useState('')
  const [authorTitle, setAuthorTitle] = useState('')
  const [company, setCompany] = useState('')
  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState<string>('5')
  const [avatarId, setAvatarId] = useState<string>('')
  const [featured, setFeatured] = useState(false)
  const [displayOrder, setDisplayOrder] = useState<string>('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')

  // UI state
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when modal opens/closes or testimonial changes
  useEffect(() => {
    if (show) {
      if (testimonial) {
        setAuthorName(testimonial.author_name)
        setAuthorTitle(testimonial.author_title || '')
        setCompany(testimonial.company || '')
        setQuote(testimonial.quote)
        setRating(testimonial.rating?.toString() || '5')
        setAvatarId(testimonial.avatar_media_id || '')
        setFeatured(testimonial.featured)
        setDisplayOrder(testimonial.display_order?.toString() || '')
        setStatus(testimonial.status)
      } else {
        resetForm()
      }
      setErrors({})
    }
  }, [show, testimonial])

  const resetForm = useCallback(() => {
    setAuthorName('')
    setAuthorTitle('')
    setCompany('')
    setQuote('')
    setRating('5')
    setAvatarId('')
    setFeatured(false)
    setDisplayOrder('')
    setStatus('draft')
    setErrors({})
  }, [])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!authorName.trim()) {
      newErrors.authorName = 'Author name is required'
    } else if (authorName.length > 100) {
      newErrors.authorName = 'Author name must be 100 characters or less'
    }

    if (!quote.trim()) {
      newErrors.quote = 'Quote is required'
    } else if (quote.length > 1000) {
      newErrors.quote = 'Quote must be 1000 characters or less'
    }

    if (rating && (parseInt(rating) < 1 || parseInt(rating) > 5)) {
      newErrors.rating = 'Rating must be between 1 and 5'
    }

    if (displayOrder && isNaN(parseInt(displayOrder))) {
      newErrors.displayOrder = 'Display order must be a number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setIsSaving(true)

    const input: TestimonialInput = {
      author_name: authorName.trim(),
      author_title: authorTitle.trim() || null,
      company: company.trim() || null,
      quote: quote.trim(),
      rating: rating ? parseInt(rating) : null,
      avatar_media_id: avatarId || null,
      featured,
      display_order: displayOrder ? parseInt(displayOrder) : null,
      status,
    }

    let success = false
    if (isEditMode && onUpdate && testimonial) {
      success = await onUpdate(testimonial.id, input)
    } else {
      success = await onSave(input)
    }

    setIsSaving(false)

    if (success) {
      onClose()
    }
  }

  const handleClose = () => {
    if (!isSaving) {
      onClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">{isEditMode ? 'Edit Testimonial' : 'Add Testimonial'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={8}>
              {/* Author Name */}
              <Form.Group className="mb-3">
                <Form.Label>Author Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter author name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  isInvalid={!!errors.authorName}
                  disabled={isSaving}
                  maxLength={100}
                />
                {errors.authorName && <div className="invalid-feedback d-block">{errors.authorName}</div>}
              </Form.Group>

              {/* Author Title */}
              <Form.Group className="mb-3">
                <Form.Label>Author Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., CEO, Marketing Director"
                  value={authorTitle}
                  onChange={(e) => setAuthorTitle(e.target.value)}
                  disabled={isSaving}
                  maxLength={100}
                />
              </Form.Group>

              {/* Company */}
              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company name (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={isSaving}
                  maxLength={100}
                />
              </Form.Group>

              {/* Quote */}
              <Form.Group className="mb-3">
                <Form.Label>Quote <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter the testimonial quote"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  isInvalid={!!errors.quote}
                  disabled={isSaving}
                  maxLength={1000}
                />
                {errors.quote && <div className="invalid-feedback d-block">{errors.quote}</div>}
                <Form.Text className="text-muted">
                  {quote.length}/1000 characters
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={4}>
              {/* Avatar Image */}
              <MediaPicker
                value={avatarId}
                onChange={setAvatarId}
                label="Avatar Image"
                helpText="Select avatar from Media Library"
              />

              {/* Rating */}
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  isInvalid={!!errors.rating}
                  disabled={isSaving}
                >
                  <option value="">No rating</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </Form.Select>
                {errors.rating && <div className="invalid-feedback d-block">{errors.rating}</div>}
              </Form.Group>

              {/* Status */}
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  disabled={isSaving}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Form.Select>
              </Form.Group>

              {/* Featured Checkbox */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="is-featured"
                  label="Featured Testimonial"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  disabled={isSaving}
                />
              </Form.Group>

              {/* Display Order (only if featured) */}
              {featured && (
                <Form.Group className="mb-3">
                  <Form.Label>Display Order</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="1, 2, 3..."
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    isInvalid={!!errors.displayOrder}
                    disabled={isSaving}
                    min={1}
                  />
                  {errors.displayOrder && <div className="invalid-feedback d-block">{errors.displayOrder}</div>}
                  <Form.Text className="text-muted">
                    Order for featured display
                  </Form.Text>
                </Form.Group>
              )}
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? (
            <>
              <Spinner size="sm" className="me-1" />
              {isEditMode ? 'Saving...' : 'Creating...'}
            </>
          ) : (
            isEditMode ? 'Save Changes' : 'Add Testimonial'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TestimonialModal
