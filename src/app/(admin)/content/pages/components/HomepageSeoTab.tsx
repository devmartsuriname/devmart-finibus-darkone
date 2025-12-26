import { useState, useEffect } from 'react'
import { Form, Button, Spinner, Row, Col } from 'react-bootstrap'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'
import type { HomepageData } from '../hooks/useHomepageBlocks'

interface HomepageSeoTabProps {
  data: HomepageData | null
  loading: boolean
  onSave: (seoData: HomepageData['seo']) => Promise<boolean>
}

const HomepageSeoTab = ({ data, loading, onSave }: HomepageSeoTabProps) => {
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [ogImageMediaId, setOgImageMediaId] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (data?.seo) {
      setMetaTitle(data.seo.meta_title || '')
      setMetaDescription(data.seo.meta_description || '')
      setOgImageMediaId(data.seo.og_image_media_id || '')
    }
    setHasChanges(false)
  }, [data])

  const handleFieldChange = (setter: (value: string) => void) => (value: string) => {
    setter(value)
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    const success = await onSave({
      meta_title: metaTitle || undefined,
      meta_description: metaDescription || undefined,
      og_image_media_id: ogImageMediaId || undefined
    })
    if (success) {
      setHasChanges(false)
    }
    setIsSaving(false)
  }

  return (
    <div>
      <div className="mb-3">
        <p className="text-muted small mb-0">
          Configure SEO metadata for the homepage. These values are used in search engine results and social sharing.
        </p>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Meta Title</Form.Label>
          <Form.Control
            type="text"
            value={metaTitle}
            onChange={(e) => handleFieldChange(setMetaTitle)(e.target.value)}
            placeholder="Devmart | Professional Software Development"
            maxLength={70}
            disabled={isSaving || loading}
          />
          <Form.Text className="text-muted">
            {metaTitle.length}/70 characters. Used in browser tab and search results.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Meta Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={metaDescription}
            onChange={(e) => handleFieldChange(setMetaDescription)(e.target.value)}
            placeholder="Devmart provides innovative software solutions..."
            maxLength={160}
            disabled={isSaving || loading}
          />
          <Form.Text className="text-muted">
            {metaDescription.length}/160 characters. Used in search result snippets.
          </Form.Text>
        </Form.Group>

        <Row>
          <Col md={6}>
            <MediaPicker
              value={ogImageMediaId}
              onChange={(value) => handleFieldChange(setOgImageMediaId)(value)}
              label="Open Graph Image"
              helpText="Image shown when sharing on social media (1200x630 recommended)"
            />
          </Col>
        </Row>

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

export default HomepageSeoTab
