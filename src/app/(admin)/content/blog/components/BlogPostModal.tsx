import { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Form, Spinner, Row, Col } from 'react-bootstrap'
import { BlogPost, BlogPostInput, generateSlug, isValidSlug } from '../hooks/useBlogPosts'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'

interface BlogPostModalProps {
  show: boolean
  onClose: () => void
  onSave: (input: BlogPostInput) => Promise<boolean>
  onUpdate?: (id: string, input: Partial<BlogPostInput>) => Promise<boolean>
  post?: BlogPost | null
}

const BlogPostModal = ({ show, onClose, onSave, onUpdate, post }: BlogPostModalProps) => {
  const isEditMode = !!post

  // Form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [featuredImageId, setFeaturedImageId] = useState<string>('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [publishedAt, setPublishedAt] = useState('')

  // UI state
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when modal opens/closes or post changes
  useEffect(() => {
    if (show) {
      if (post) {
        setTitle(post.title)
        setSlug(post.slug)
        setSlugManuallyEdited(true) // Assume slug was set intentionally
        setExcerpt(post.excerpt || '')
        setContent(post.content)
        setFeaturedImageId(post.featured_image_media_id || '')
        setStatus(post.status as 'draft' | 'published')
        setPublishedAt(post.published_at ? post.published_at.split('T')[0] : '')
      } else {
        resetForm()
      }
      setErrors({})
    }
  }, [show, post])

  const resetForm = useCallback(() => {
    setTitle('')
    setSlug('')
    setSlugManuallyEdited(false)
    setExcerpt('')
    setContent('')
    setFeaturedImageId('')
    setStatus('draft')
    setPublishedAt('')
    setErrors({})
  }, [])

  // Auto-generate slug from title (unless manually edited)
  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slugManuallyEdited) {
      setSlug(generateSlug(value))
    }
  }

  const handleSlugChange = (value: string) => {
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
    setSlugManuallyEdited(true)
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.length > 200) {
      newErrors.title = 'Title must be 200 characters or less'
    }

    if (!slug.trim()) {
      newErrors.slug = 'Slug is required'
    } else if (!isValidSlug(slug)) {
      newErrors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens'
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required'
    }

    if (excerpt && excerpt.length > 300) {
      newErrors.excerpt = 'Excerpt must be 300 characters or less'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setIsSaving(true)

    const input: BlogPostInput = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || undefined,
      content: content.trim(),
      featured_image_media_id: featuredImageId || null,
      status,
      published_at: status === 'published' ? (publishedAt ? new Date(publishedAt).toISOString() : null) : null,
    }

    let success = false
    if (isEditMode && onUpdate && post) {
      success = await onUpdate(post.id, input)
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
    <Modal show={show} onHide={handleClose} centered size="xl">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">{isEditMode ? 'Edit Post' : 'Create New Post'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={8}>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  isInvalid={!!errors.title}
                  disabled={isSaving}
                  maxLength={200}
                />
                {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
              </Form.Group>

              {/* Slug */}
              <Form.Group className="mb-3">
                <Form.Label>Slug <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="post-url-slug"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  isInvalid={!!errors.slug}
                  disabled={isSaving}
                />
                {errors.slug && <div className="invalid-feedback d-block">{errors.slug}</div>}
                <Form.Text className="text-muted">
                  URL-friendly identifier. Auto-generated from title.
                </Form.Text>
              </Form.Group>

              {/* Excerpt */}
              <Form.Group className="mb-3">
                <Form.Label>Excerpt</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Brief summary of the post (optional)"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  isInvalid={!!errors.excerpt}
                  disabled={isSaving}
                  maxLength={300}
                />
                {errors.excerpt && <div className="invalid-feedback d-block">{errors.excerpt}</div>}
                <Form.Text className="text-muted">
                  {excerpt.length}/300 characters
                </Form.Text>
              </Form.Group>

              {/* Content */}
              <Form.Group className="mb-3">
                <Form.Label>Content <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  isInvalid={!!errors.content}
                  disabled={isSaving}
                />
                {errors.content && <div className="invalid-feedback d-block">{errors.content}</div>}
              </Form.Group>
            </Col>

            <Col md={4}>
              {/* Featured Image - using MediaPicker */}
              <MediaPicker
                value={featuredImageId}
                onChange={setFeaturedImageId}
                label="Featured Image"
                helpText="Select an image from the Media Library"
              />

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

              {/* Published Date (only for published status) */}
              {status === 'published' && (
                <Form.Group className="mb-3">
                  <Form.Label>Publish Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    disabled={isSaving}
                  />
                  <Form.Text className="text-muted">
                    Leave blank for current date/time
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
            isEditMode ? 'Save Changes' : 'Create Post'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BlogPostModal
