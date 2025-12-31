import { useState, useEffect } from 'react'
import { Form, Button, Spinner, Row, Col, Alert } from 'react-bootstrap'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'

interface PageSeoData {
  meta_title: string
  meta_description: string
  og_image_media_id: string
  canonical_url: string
  noindex: boolean
}

interface PageSeoTabProps {
  pageTitle: string
  metaTitle: string
  metaDescription: string
  ogImageMediaId: string
  canonicalUrl: string
  noindex: boolean
  loading: boolean
  onSave: (data: PageSeoData) => Promise<void>
}

const PageSeoTab = ({
  pageTitle,
  metaTitle: initialMetaTitle,
  metaDescription: initialMetaDescription,
  ogImageMediaId: initialOgImageMediaId,
  canonicalUrl: initialCanonicalUrl,
  noindex: initialNoindex,
  loading,
  onSave
}: PageSeoTabProps) => {
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [ogImageMediaId, setOgImageMediaId] = useState('')
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [noindex, setNoindex] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setMetaTitle(initialMetaTitle || '')
    setMetaDescription(initialMetaDescription || '')
    setOgImageMediaId(initialOgImageMediaId || '')
    setCanonicalUrl(initialCanonicalUrl || '')
    setNoindex(initialNoindex || false)
    setHasChanges(false)
    setErrors({})
  }, [initialMetaTitle, initialMetaDescription, initialOgImageMediaId, initialCanonicalUrl, initialNoindex])

  const handleFieldChange = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value)
    setHasChanges(true)
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (metaTitle && metaTitle.length > 70) {
      newErrors.metaTitle = 'Meta title must be 70 characters or less'
    }
    
    if (metaDescription && metaDescription.length > 160) {
      newErrors.metaDescription = 'Meta description must be 160 characters or less'
    }
    
    if (canonicalUrl && canonicalUrl.trim()) {
      try {
        new URL(canonicalUrl.trim())
      } catch {
        newErrors.canonicalUrl = 'Please enter a valid URL'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    
    setIsSaving(true)
    try {
      await onSave({
        meta_title: metaTitle.trim(),
        meta_description: metaDescription.trim(),
        og_image_media_id: ogImageMediaId,
        canonical_url: canonicalUrl.trim(),
        noindex
      })
      setHasChanges(false)
    } finally {
      setIsSaving(false)
    }
  }

  const getCharacterCountClass = (current: number, max: number): string => {
    if (current > max) return 'text-danger'
    if (current > max * 0.9) return 'text-warning'
    return 'text-muted'
  }

  return (
    <div>
      {/* SEO Fallback Info Alert - matches Blog pattern */}
      <Alert variant="info" className="mb-4">
        <strong>SEO Fallback Order</strong>
        <p className="mb-0 small mt-1">
          If these fields are empty, SEO values will fall back to:<br />
          1. Page Title ("{pageTitle}")<br />
          2. Global SEO Settings
        </p>
      </Alert>

      <Form>
        {/* Meta Title */}
        <Form.Group className="mb-3">
          <Form.Label>Meta Title</Form.Label>
          <Form.Control
            type="text"
            value={metaTitle}
            onChange={(e) => handleFieldChange(setMetaTitle)(e.target.value)}
            placeholder={pageTitle || 'Page title will be used'}
            maxLength={70}
            isInvalid={!!errors.metaTitle}
            disabled={isSaving || loading}
          />
          {errors.metaTitle && (
            <Form.Text className="text-danger">{errors.metaTitle}</Form.Text>
          )}
          <Form.Text className={getCharacterCountClass(metaTitle.length, 70)}>
            {metaTitle.length}/70 characters. Used in browser tab and search results.
          </Form.Text>
        </Form.Group>

        {/* Meta Description */}
        <Form.Group className="mb-3">
          <Form.Label>Meta Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={metaDescription}
            onChange={(e) => handleFieldChange(setMetaDescription)(e.target.value)}
            placeholder="Enter a compelling description for search engines..."
            maxLength={160}
            isInvalid={!!errors.metaDescription}
            disabled={isSaving || loading}
          />
          {errors.metaDescription && (
            <Form.Text className="text-danger">{errors.metaDescription}</Form.Text>
          )}
          <Form.Text className={getCharacterCountClass(metaDescription.length, 160)}>
            {metaDescription.length}/160 characters. Used in search result snippets.
          </Form.Text>
        </Form.Group>

        {/* OG Image */}
        <Row className="mb-3">
          <Col md={6}>
            <MediaPicker
              value={ogImageMediaId}
              onChange={(value) => handleFieldChange(setOgImageMediaId)(value)}
              label="Open Graph Image"
              helpText="Image shown when sharing on social media (1200x630 recommended)"
            />
          </Col>
        </Row>

        {/* Canonical URL */}
        <Form.Group className="mb-3">
          <Form.Label>Canonical URL</Form.Label>
          <Form.Control
            type="url"
            value={canonicalUrl}
            onChange={(e) => handleFieldChange(setCanonicalUrl)(e.target.value)}
            placeholder="https://example.com/page"
            isInvalid={!!errors.canonicalUrl}
            disabled={isSaving || loading}
          />
          {errors.canonicalUrl && (
            <Form.Text className="text-danger">{errors.canonicalUrl}</Form.Text>
          )}
          <Form.Text className="text-muted">
            Optional. Use to specify the preferred URL if this page has duplicate content.
          </Form.Text>
        </Form.Group>

        {/* Noindex */}
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="noindex-switch"
            label="Exclude from search engines (noindex)"
            checked={noindex}
            onChange={(e) => handleFieldChange(setNoindex)(e.target.checked)}
            disabled={isSaving || loading}
          />
          <Form.Text className="text-muted">
            When enabled, search engines will be asked not to index this page.
          </Form.Text>
        </Form.Group>

        <div className="mt-4 pt-3 border-top">
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSaving || loading || !hasChanges}
          >
            {isSaving ? (
              <>
                <Spinner size="sm" className="me-1" />
                Saving SEO...
              </>
            ) : (
              'Save SEO Settings'
            )}
          </Button>
          {hasChanges && (
            <span className="text-muted small ms-3">
              You have unsaved changes
            </span>
          )}
        </div>
      </Form>
    </div>
  )
}

export default PageSeoTab
