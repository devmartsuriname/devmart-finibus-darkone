/**
 * ProjectSeoTab Component
 * 
 * Phase 4C: Projects SEO Expansion
 * Reusable SEO tab component for Projects modal following ServiceSeoTab pattern.
 */

import { Form, Row, Col, Alert } from 'react-bootstrap'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'

interface ProjectSeoTabProps {
  projectTitle: string
  metaTitle: string
  metaDescription: string
  ogImageMediaId: string
  canonicalUrl: string
  noindex: boolean
  disabled: boolean
  errors: Record<string, string>
  onMetaTitleChange: (value: string) => void
  onMetaDescriptionChange: (value: string) => void
  onOgImageMediaIdChange: (value: string) => void
  onCanonicalUrlChange: (value: string) => void
  onNoindexChange: (value: boolean) => void
}

const ProjectSeoTab = ({
  projectTitle,
  metaTitle,
  metaDescription,
  ogImageMediaId,
  canonicalUrl,
  noindex,
  disabled,
  errors,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onOgImageMediaIdChange,
  onCanonicalUrlChange,
  onNoindexChange
}: ProjectSeoTabProps) => {

  const getCharacterCountClass = (current: number, max: number): string => {
    if (current > max) return 'text-danger'
    if (current > max * 0.9) return 'text-warning'
    return 'text-muted'
  }

  return (
    <div>
      {/* SEO Fallback Info Alert - matches Pages/Blog/Services pattern */}
      <Alert variant="info" className="mb-4">
        <strong>SEO Fallback Order</strong>
        <p className="mb-0 small mt-1">
          If these fields are empty, SEO values will fall back to:<br />
          1. Project Title ("{projectTitle}")<br />
          2. Project Description<br />
          3. Global SEO Settings
        </p>
      </Alert>

      <Form>
        {/* Meta Title */}
        <Form.Group className="mb-3">
          <Form.Label>Meta Title</Form.Label>
          <Form.Control
            type="text"
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            placeholder={projectTitle || 'Project title will be used'}
            maxLength={70}
            isInvalid={!!errors.metaTitle}
            disabled={disabled}
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
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            placeholder="Enter a compelling description for search engines..."
            maxLength={160}
            isInvalid={!!errors.metaDescription}
            disabled={disabled}
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
              onChange={onOgImageMediaIdChange}
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
            onChange={(e) => onCanonicalUrlChange(e.target.value)}
            placeholder="https://example.com/projects/project-name"
            isInvalid={!!errors.canonicalUrl}
            disabled={disabled}
          />
          {errors.canonicalUrl && (
            <Form.Text className="text-danger">{errors.canonicalUrl}</Form.Text>
          )}
          <Form.Text className="text-muted">
            Optional. Use to specify the preferred URL if this project page has duplicate content.
          </Form.Text>
        </Form.Group>

        {/* Noindex */}
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="project-noindex-switch"
            label="Exclude from search engines (noindex)"
            checked={noindex}
            onChange={(e) => onNoindexChange(e.target.checked)}
            disabled={disabled}
          />
          <Form.Text className="text-muted">
            When enabled, search engines will be asked not to index this project page.
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ProjectSeoTab
