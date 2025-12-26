import { useState, useEffect } from 'react'
import { Modal, Button, Form, Spinner, Row, Col, Card } from 'react-bootstrap'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'
import type { InsideStoryData, LatestNewsData, ProgressStat } from '../hooks/useAboutPageBlocks'

interface AboutPageSectionEditModalProps {
  show: boolean
  sectionKey: 'inside_story' | 'latest_news'
  sectionLabel: string
  sectionData: unknown
  loading: boolean
  onClose: () => void
  onSave: (data: Record<string, unknown>) => Promise<boolean>
}

const AboutPageSectionEditModal = ({
  show,
  sectionKey,
  sectionLabel,
  sectionData,
  loading,
  onClose,
  onSave
}: AboutPageSectionEditModalProps) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (show) {
      const initialData = typeof sectionData === 'object' && sectionData !== null 
        ? { ...sectionData as Record<string, unknown> }
        : {}
      setFormData(initialData)
    }
  }, [show, sectionData])

  const handleSubmit = async () => {
    setIsSaving(true)
    await onSave(formData)
    setIsSaving(false)
  }

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const renderInsideStoryFields = () => {
    const data = formData as InsideStoryData
    const progressStats = data.progress_stats || []

    const updateProgressStat = (index: number, field: keyof ProgressStat, value: string | number) => {
      const newStats = [...progressStats]
      newStats[index] = { ...newStats[index], [field]: value }
      updateField('progress_stats', newStats)
    }

    return (
      <>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Section Label</Form.Label>
              <Form.Control
                type="text"
                value={data.section_label || ''}
                onChange={(e) => updateField('section_label', e.target.value)}
                placeholder="Inside Story"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="inside-story-enabled"
                label="Section Enabled"
                checked={data.enabled !== false}
                onChange={(e) => updateField('enabled', e.target.checked)}
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={data.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="We are creative Agency that creates beautiful."
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={data.description || ''}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="About description text"
            disabled={isSaving}
          />
        </Form.Group>

        {/* Main Image */}
        <Form.Group className="mb-3">
          <MediaPicker
            label="Main Image"
            value={data.main_image_media_id || ''}
            onChange={(mediaId) => updateField('main_image_media_id', mediaId)}
            helpText="Main story image"
          />
        </Form.Group>

        <hr className="my-4" />
        <h6 className="mb-3">CTO/Founder Message</h6>

        <Form.Group className="mb-3">
          <Form.Label>CTO Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={data.cto_message || ''}
            onChange={(e) => updateField('cto_message', e.target.value)}
            placeholder="CTO message text"
            disabled={isSaving}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CTO Name</Form.Label>
              <Form.Control
                type="text"
                value={data.cto_name || ''}
                onChange={(e) => updateField('cto_name', e.target.value)}
                placeholder="Carlo Rabil."
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CTO Title</Form.Label>
              <Form.Control
                type="text"
                value={data.cto_title || ''}
                onChange={(e) => updateField('cto_title', e.target.value)}
                placeholder="CTO & FOUNDER, Finibus"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* CTO Signature */}
        <Form.Group className="mb-3">
          <MediaPicker
            label="CTO Signature"
            value={data.cto_signature_media_id || ''}
            onChange={(mediaId) => updateField('cto_signature_media_id', mediaId)}
            helpText="Signature image"
          />
        </Form.Group>

        <hr className="my-4" />
        <h6 className="mb-3">Progress Stats ({progressStats.length} items)</h6>

        {progressStats.map((stat, index) => (
          <Card key={index} className="mb-2">
            <Card.Body className="py-2">
              <Row className="align-items-center">
                <Col md={8}>
                  <Form.Control
                    type="text"
                    size="sm"
                    value={stat.label || ''}
                    onChange={(e) => updateProgressStat(index, 'label', e.target.value)}
                    placeholder="Skill label"
                    disabled={isSaving}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="number"
                    size="sm"
                    value={stat.percent || 0}
                    onChange={(e) => updateProgressStat(index, 'percent', parseInt(e.target.value) || 0)}
                    placeholder="%"
                    min={0}
                    max={100}
                    disabled={isSaving}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </>
    )
  }

  const renderLatestNewsFields = () => {
    const data = formData as LatestNewsData

    return (
      <>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Section Label</Form.Label>
              <Form.Control
                type="text"
                value={data.section_label || ''}
                onChange={(e) => updateField('section_label', e.target.value)}
                placeholder="Blog"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="latest-news-enabled"
                label="Section Enabled"
                checked={data.enabled !== false}
                onChange={(e) => updateField('enabled', e.target.checked)}
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Section Title</Form.Label>
          <Form.Control
            type="text"
            value={data.section_title || ''}
            onChange={(e) => updateField('section_title', e.target.value)}
            placeholder="Latest news And Article modern design."
            disabled={isSaving}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>View All Button Label</Form.Label>
              <Form.Control
                type="text"
                value={data.view_all_label || ''}
                onChange={(e) => updateField('view_all_label', e.target.value)}
                placeholder="View All Blog"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>View All URL</Form.Label>
              <Form.Control
                type="text"
                value={data.view_all_url || ''}
                onChange={(e) => updateField('view_all_url', e.target.value)}
                placeholder="/blog"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Number of Posts to Display</Form.Label>
          <Form.Control
            type="number"
            value={data.posts_count || 2}
            onChange={(e) => updateField('posts_count', parseInt(e.target.value) || 2)}
            min={1}
            max={6}
            disabled={isSaving}
          />
          <Form.Text className="text-muted">
            Posts are pulled from the Blog module.
          </Form.Text>
        </Form.Group>
      </>
    )
  }

  const renderFields = () => {
    switch (sectionKey) {
      case 'inside_story':
        return renderInsideStoryFields()
      case 'latest_news':
        return renderLatestNewsFields()
      default:
        return null
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">Edit {sectionLabel}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {renderFields()}
      </Modal.Body>
      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={onClose} disabled={loading || isSaving}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading || isSaving}>
          {isSaving ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AboutPageSectionEditModal
