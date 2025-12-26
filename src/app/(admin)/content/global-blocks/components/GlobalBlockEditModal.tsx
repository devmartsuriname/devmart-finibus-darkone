import { useState, useEffect } from 'react'
import { Modal, Button, Form, Spinner, Row, Col, Card } from 'react-bootstrap'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'
import type { 
  GlobalBlockKey, 
  CtaStripData, 
  WhyChooseUsData,
  SkillItem 
} from '../hooks/useGlobalBlocks'

interface GlobalBlockEditModalProps {
  show: boolean
  blockKey: GlobalBlockKey
  blockLabel: string
  blockData: unknown
  loading: boolean
  onClose: () => void
  onSave: (data: Record<string, unknown>) => Promise<boolean>
}

const GlobalBlockEditModal = ({
  show,
  blockKey,
  blockLabel,
  blockData,
  loading,
  onClose,
  onSave
}: GlobalBlockEditModalProps) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (show) {
      const initialData = typeof blockData === 'object' && blockData !== null 
        ? { ...blockData as Record<string, unknown> }
        : {}
      setFormData(initialData)
    }
  }, [show, blockData])

  const handleSubmit = async () => {
    setIsSaving(true)
    await onSave(formData)
    setIsSaving(false)
  }

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const renderCtaStripFields = () => {
    const data = formData as CtaStripData

    return (
      <>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="cta-strip-enabled"
            label="Block Enabled"
            checked={data.enabled !== false}
            onChange={(e) => updateField('enabled', e.target.checked)}
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title Line 1</Form.Label>
          <Form.Control
            type="text"
            value={data.title_line1 || ''}
            onChange={(e) => updateField('title_line1', e.target.value)}
            placeholder="First line of title"
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title Line 2</Form.Label>
          <Form.Control
            type="text"
            value={data.title_line2 || ''}
            onChange={(e) => updateField('title_line2', e.target.value)}
            placeholder="Second line of title"
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title Line 3</Form.Label>
          <Form.Control
            type="text"
            value={data.title_line3 || ''}
            onChange={(e) => updateField('title_line3', e.target.value)}
            placeholder="Third line of title"
            disabled={isSaving}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CTA Button Label</Form.Label>
              <Form.Control
                type="text"
                value={data.cta_label || ''}
                onChange={(e) => updateField('cta_label', e.target.value)}
                placeholder="Let's Talk"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CTA Button URL</Form.Label>
              <Form.Control
                type="text"
                value={data.cta_url || ''}
                onChange={(e) => updateField('cta_url', e.target.value)}
                placeholder="/contact"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <MediaPicker
            label="Background Image"
            value={data.background_media_id || ''}
            onChange={(mediaId) => updateField('background_media_id', mediaId)}
            helpText="Background image for the CTA strip"
          />
        </Form.Group>
      </>
    )
  }

  const renderWhyChooseUsFields = () => {
    const data = formData as WhyChooseUsData
    const skills = data.skills || []

    const updateSkill = (index: number, field: keyof SkillItem, value: string | number) => {
      const newSkills = [...skills]
      newSkills[index] = { ...newSkills[index], [field]: value }
      updateField('skills', newSkills)
    }

    const addSkill = () => {
      updateField('skills', [...skills, { label: '', percent: 0, sublabel: '' }])
    }

    const removeSkill = (index: number) => {
      const newSkills = skills.filter((_, i) => i !== index)
      updateField('skills', newSkills)
    }

    return (
      <>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="why-choose-enabled"
            label="Block Enabled"
            checked={data.enabled !== false}
            onChange={(e) => updateField('enabled', e.target.checked)}
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Section Title</Form.Label>
          <Form.Control
            type="text"
            value={data.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Why Choose Us"
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Section Subtitle</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={data.subtitle || ''}
            onChange={(e) => updateField('subtitle', e.target.value)}
            placeholder="Subtitle text"
            disabled={isSaving}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Video URL</Form.Label>
              <Form.Control
                type="text"
                value={data.video_url || ''}
                onChange={(e) => updateField('video_url', e.target.value)}
                placeholder="https://youtube.com/..."
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Video Poster URL</Form.Label>
              <Form.Control
                type="text"
                value={data.video_poster || ''}
                onChange={(e) => updateField('video_poster', e.target.value)}
                placeholder="/images/video-poster.jpg"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <MediaPicker
            label="Section Image"
            value={data.image_media_id || ''}
            onChange={(mediaId) => updateField('image_media_id', mediaId)}
            helpText="Main image for the section"
          />
        </Form.Group>

        <hr className="my-4" />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Skills ({skills.length} items)</h6>
          <Button variant="outline-primary" size="sm" onClick={addSkill} disabled={isSaving}>
            + Add Skill
          </Button>
        </div>

        {skills.map((skill, index) => (
          <Card key={index} className="mb-2">
            <Card.Body className="py-2">
              <Row className="align-items-center">
                <Col md={5}>
                  <Form.Control
                    type="text"
                    size="sm"
                    value={skill.label || ''}
                    onChange={(e) => updateSkill(index, 'label', e.target.value)}
                    placeholder="Skill label"
                    disabled={isSaving}
                  />
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    size="sm"
                    value={skill.percent || 0}
                    onChange={(e) => updateSkill(index, 'percent', parseInt(e.target.value) || 0)}
                    placeholder="%"
                    min={0}
                    max={100}
                    disabled={isSaving}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    size="sm"
                    value={skill.sublabel || ''}
                    onChange={(e) => updateSkill(index, 'sublabel', e.target.value)}
                    placeholder="Sublabel"
                    disabled={isSaving}
                  />
                </Col>
                <Col md={1}>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-danger p-0"
                    onClick={() => removeSkill(index)}
                    disabled={isSaving}
                  >
                    ×
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </>
    )
  }

  const renderFields = () => {
    switch (blockKey) {
      case 'cta_strip':
        return renderCtaStripFields()
      case 'why_choose_us':
        return renderWhyChooseUsFields()
      default:
        return null
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">Edit {blockLabel}</Modal.Title>
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

export default GlobalBlockEditModal
