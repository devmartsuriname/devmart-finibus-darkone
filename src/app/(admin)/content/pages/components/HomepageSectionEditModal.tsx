import { useState, useEffect } from 'react'
import { Modal, Button, Form, Spinner, Row, Col, Card, Alert } from 'react-bootstrap'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'
import type { SectionKey, HomepageData, HeroSlide, StatItem, PartnerItem, SkillItem } from '../hooks/useHomepageBlocks'

interface HomepageSectionEditModalProps {
  show: boolean
  sectionKey: SectionKey
  sectionLabel: string
  sectionType: 'ui_block' | 'dynamic_module'
  sectionData: unknown
  allData: HomepageData | null
  loading: boolean
  onClose: () => void
  onSave: (data: Record<string, unknown>) => Promise<boolean>
  onSaveStats?: (stats: StatItem[]) => Promise<boolean>
}

const HomepageSectionEditModal = ({
  show,
  sectionKey,
  sectionLabel,
  sectionType,
  sectionData,
  allData,
  loading,
  onClose,
  onSave,
  onSaveStats
}: HomepageSectionEditModalProps) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [statsData, setStatsData] = useState<StatItem[]>([])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (show) {
      // Initialize form data from section data
      const initialData = typeof sectionData === 'object' && sectionData !== null 
        ? { ...sectionData as Record<string, unknown> }
        : {}
      
      // Handle special cases for array data
      if (sectionKey === 'partners' && Array.isArray(sectionData)) {
        setFormData({ enabled: true, items: sectionData })
      } else {
        setFormData(initialData)
      }

      // Initialize stats data from allData (stats stored at root level)
      if (sectionKey === 'home_about' && allData?.stats) {
        setStatsData([...allData.stats])
      }
    }
  }, [show, sectionData, sectionKey, allData])

  const handleSubmit = async () => {
    setIsSaving(true)
    
    // Save section data
    const sectionSaved = await onSave(formData)
    
    // If this is home_about, also save stats (stored at root level)
    if (sectionKey === 'home_about' && onSaveStats) {
      await onSaveStats(statsData)
    }
    
    setIsSaving(false)
  }

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const renderDynamicModuleFields = () => {
    return (
      <>
        <Alert variant="info" className="mb-3">
          This is a dynamic module. Content is managed via the respective admin section.
          Only wrapper text fields are editable here.
        </Alert>
        
        <Form.Group className="mb-3">
          <Form.Label>Section Title</Form.Label>
          <Form.Control
            type="text"
            value={(formData.section_title as string) || ''}
            onChange={(e) => updateField('section_title', e.target.value)}
            placeholder="Section title"
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Section Subtitle</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={(formData.section_subtitle as string) || ''}
            onChange={(e) => updateField('section_subtitle', e.target.value)}
            placeholder="Section subtitle/description"
            disabled={isSaving}
          />
        </Form.Group>

        {(sectionKey === 'portfolio' || sectionKey === 'blog') && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>View All Button Text</Form.Label>
              <Form.Control
                type="text"
                value={(formData.view_all_text as string) || ''}
                onChange={(e) => updateField('view_all_text', e.target.value)}
                placeholder="View All"
                disabled={isSaving}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>View All Button URL</Form.Label>
              <Form.Control
                type="text"
                value={(formData.view_all_url as string) || ''}
                onChange={(e) => updateField('view_all_url', e.target.value)}
                placeholder="/portfolio or /blog"
                disabled={isSaving}
              />
            </Form.Group>
          </>
        )}
      </>
    )
  }

  const renderHeroFields = () => {
    const slides = (formData.slides as HeroSlide[]) || []
    
    const updateSlide = (index: number, field: string, value: string) => {
      const newSlides = [...slides]
      newSlides[index] = { ...newSlides[index], [field]: value }
      updateField('slides', newSlides)
    }

    return (
      <>
        <p className="text-muted small mb-3">
          Edit hero slider content. Each slide has title, description, and CTA buttons.
        </p>
        
        {slides.map((slide, index) => (
          <Card key={index} className="mb-3">
            <Card.Header className="py-2">
              <span className="fw-medium">Slide {index + 1}</span>
            </Card.Header>
            <Card.Body>
              {/* Background Image MediaPicker */}
              <Form.Group className="mb-3">
                <MediaPicker
                  label="Background Image"
                  value={slide.background_media_id || ''}
                  onChange={(mediaId) => updateSlide(index, 'background_media_id', mediaId || '')}
                  helpText="Select a background image for this slide."
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title Prefix</Form.Label>
                    <Form.Control
                      type="text"
                      value={slide.title_prefix || ''}
                      onChange={(e) => updateSlide(index, 'title_prefix', e.target.value)}
                      placeholder="Best solution for your"
                      disabled={isSaving}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title Highlight</Form.Label>
                    <Form.Control
                      type="text"
                      value={slide.title_highlight || ''}
                      onChange={(e) => updateSlide(index, 'title_highlight', e.target.value)}
                      placeholder="Business."
                      disabled={isSaving}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Subtitle</Form.Label>
                <Form.Control
                  type="text"
                  value={slide.subtitle || ''}
                  onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
                  placeholder="Creative"
                  disabled={isSaving}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={slide.description || ''}
                  onChange={(e) => updateSlide(index, 'description', e.target.value)}
                  placeholder="Slide description"
                  disabled={isSaving}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CTA 1 Label</Form.Label>
                    <Form.Control
                      type="text"
                      value={slide.cta1_label || ''}
                      onChange={(e) => updateSlide(index, 'cta1_label', e.target.value)}
                      placeholder="About us"
                      disabled={isSaving}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CTA 1 URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={slide.cta1_url || ''}
                      onChange={(e) => updateSlide(index, 'cta1_url', e.target.value)}
                      placeholder="/about"
                      disabled={isSaving}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CTA 2 Label</Form.Label>
                    <Form.Control
                      type="text"
                      value={slide.cta2_label || ''}
                      onChange={(e) => updateSlide(index, 'cta2_label', e.target.value)}
                      placeholder="How we work"
                      disabled={isSaving}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CTA 2 URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={slide.cta2_url || ''}
                      onChange={(e) => updateSlide(index, 'cta2_url', e.target.value)}
                      placeholder="/project-details"
                      disabled={isSaving}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </>
    )
  }

  const renderAboutFields = () => {
    const skills = (formData.skills as SkillItem[]) || []

    const updateStat = (index: number, field: string, value: string | number) => {
      const newStats = [...statsData]
      newStats[index] = { ...newStats[index], [field]: value }
      setStatsData(newStats)
    }

    const updateSkill = (index: number, field: string, value: string | number) => {
      const newSkills = [...skills]
      newSkills[index] = { ...newSkills[index], [field]: value }
      updateField('skills', newSkills)
    }

    return (
      <>
        {/* About Image 1 (Main/Bottom) */}
        <Form.Group className="mb-3">
          <MediaPicker
            label="About Image 1 (Main)"
            value={(formData.image_1_media_id as string) || ''}
            onChange={(mediaId) => updateField('image_1_media_id', mediaId)}
            helpText="Main bottom image for the About section."
          />
        </Form.Group>

        {/* About Image 2 (Overlay/Top) */}
        <Form.Group className="mb-3">
          <MediaPicker
            label="About Image 2 (Overlay)"
            value={(formData.image_2_media_id as string) || ''}
            onChange={(mediaId) => updateField('image_2_media_id', mediaId)}
            helpText="Smaller overlay image at the top-right corner."
          />
        </Form.Group>

        {/* Mission Icon */}
        <Form.Group className="mb-3">
          <MediaPicker
            label="Mission Icon"
            value={(formData.mission_icon_media_id as string) || ''}
            onChange={(mediaId) => updateField('mission_icon_media_id', mediaId)}
            helpText="Icon displayed next to the Mission text."
          />
        </Form.Group>

        {/* CTO/Founder Signature */}
        <Form.Group className="mb-3">
          <MediaPicker
            label="CTO/Founder Signature"
            value={(formData.cto_signature_media_id as string) || ''}
            onChange={(mediaId) => updateField('cto_signature_media_id', mediaId)}
            helpText="Signature or badge image for CTO/Founder section."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={(formData.title as string) || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Direction with our company."
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={(formData.description as string) || ''}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="About description"
            disabled={isSaving}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CTA Label</Form.Label>
              <Form.Control
                type="text"
                value={(formData.cta_label as string) || ''}
                onChange={(e) => updateField('cta_label', e.target.value)}
                placeholder="About more"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CTA URL</Form.Label>
              <Form.Control
                type="text"
                value={(formData.cta_url as string) || ''}
                onChange={(e) => updateField('cta_url', e.target.value)}
                placeholder="/about"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Mission Title</Form.Label>
          <Form.Control
            type="text"
            value={(formData.mission_title as string) || ''}
            onChange={(e) => updateField('mission_title', e.target.value)}
            placeholder="Our Mission"
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mission Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={(formData.mission_text as string) || ''}
            onChange={(e) => updateField('mission_text', e.target.value)}
            placeholder="Mission description"
            disabled={isSaving}
          />
        </Form.Group>

        {/* Skills */}
        <h6 className="mt-4 mb-3">Skills</h6>
        {skills.map((skill, index) => (
          <Row key={index} className="mb-2">
            <Col md={6}>
              <Form.Control
                type="text"
                value={skill.label || ''}
                onChange={(e) => updateSkill(index, 'label', e.target.value)}
                placeholder="Skill name"
                disabled={isSaving}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="number"
                value={skill.percent || 0}
                onChange={(e) => updateSkill(index, 'percent', parseInt(e.target.value) || 0)}
                placeholder="%"
                min={0}
                max={100}
                disabled={isSaving}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                value={skill.sublabel || ''}
                onChange={(e) => updateSkill(index, 'sublabel', e.target.value)}
                placeholder="Sublabel"
                disabled={isSaving}
              />
            </Col>
          </Row>
        ))}

        {/* Stats Editor */}
        <h6 className="mt-4 mb-3">Stats ({statsData.length} items)</h6>
        {statsData.length === 0 ? (
          <Alert variant="info" className="mb-3">
            No stats configured yet. Stats data is stored at the root level of homepage settings.
          </Alert>
        ) : (
          statsData.map((stat, index) => (
            <Card key={index} className="mb-2">
              <Card.Body className="py-2">
                <Row className="align-items-center">
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={stat.value?.toString() || ''}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                      placeholder="Value (e.g., 500+)"
                      disabled={isSaving}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={stat.label || ''}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      placeholder="Label"
                      disabled={isSaving}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={stat.icon || ''}
                      onChange={(e) => updateStat(index, 'icon', e.target.value)}
                      placeholder="Icon (path or class)"
                      disabled={isSaving}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </>
    )
  }

  const renderPartnersFields = () => {
    const items = Array.isArray(formData.items) 
      ? formData.items as PartnerItem[]
      : Array.isArray(sectionData) 
        ? sectionData as PartnerItem[]
        : []

    const updatePartner = (index: number, field: string, value: string) => {
      const newItems = [...items]
      newItems[index] = { ...newItems[index], [field]: value }
      updateField('items', newItems)
    }

    return (
      <>
        <p className="text-muted small mb-3">
          Edit partner logos and links. ({items.length} partners)
        </p>
        
        {items.map((partner, index) => (
          <Card key={index} className="mb-3">
            <Card.Header className="py-2">
              <span className="fw-medium">{partner.name || `Partner ${index + 1}`}</span>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Partner Name</Form.Label>
                <Form.Control
                  type="text"
                  value={partner.name || ''}
                  onChange={(e) => updatePartner(index, 'name', e.target.value)}
                  placeholder="Partner name"
                  disabled={isSaving}
                />
              </Form.Group>

              {/* Logo MediaPicker - optional override for legacy logo path */}
              <Form.Group className="mb-3">
                <MediaPicker
                  label="Logo (Media Library)"
                  value={partner.logo_media_id || ''}
                  onChange={(mediaId) => updatePartner(index, 'logo_media_id', mediaId || '')}
                  helpText="Select from Media Library (takes precedence over legacy path)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Logo Path (Legacy)</Form.Label>
                <Form.Control
                  type="text"
                  value={partner.logo || ''}
                  onChange={(e) => updatePartner(index, 'logo', e.target.value)}
                  placeholder="/images/partner-icons/partner.png"
                  disabled={isSaving}
                />
                <Form.Text className="text-muted">
                  Legacy path - used if no Media Library selection is made
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  value={partner.url || ''}
                  onChange={(e) => updatePartner(index, 'url', e.target.value)}
                  placeholder="https://partner-website.com"
                  disabled={isSaving}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        ))}
      </>
    )
  }

  const renderWhyChooseFields = () => {
    const skills = (formData.skills as SkillItem[]) || []

    const updateSkill = (index: number, field: string, value: string | number) => {
      const newSkills = [...skills]
      newSkills[index] = { ...newSkills[index], [field]: value }
      updateField('skills', newSkills)
    }

    return (
      <>
        {/* Section Image MediaPicker */}
        <Form.Group className="mb-3">
          <MediaPicker
            label="Section Image"
            value={(formData.image_media_id as string) || ''}
            onChange={(mediaId) => updateField('image_media_id', mediaId)}
            helpText="Image displayed in the Why Choose Us section."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={(formData.title as string) || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Success is just around the next online corner"
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            type="text"
            value={(formData.video_url as string) || ''}
            onChange={(e) => updateField('video_url', e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Video Poster Image (Legacy)</Form.Label>
          <Form.Control
            type="text"
            value={(formData.video_poster as string) || ''}
            onChange={(e) => updateField('video_poster', e.target.value)}
            placeholder="/images/play-video.jpg"
            disabled={isSaving}
          />
          <Form.Text className="text-muted">
            Legacy path for video poster image
          </Form.Text>
        </Form.Group>

        {/* Skills */}
        <h6 className="mt-4 mb-3">Skills</h6>
        {skills.map((skill, index) => (
          <Row key={index} className="mb-2">
            <Col md={8}>
              <Form.Control
                type="text"
                value={skill.label || ''}
                onChange={(e) => updateSkill(index, 'label', e.target.value)}
                placeholder="Skill name"
                disabled={isSaving}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="number"
                value={skill.percent || 0}
                onChange={(e) => updateSkill(index, 'percent', parseInt(e.target.value) || 0)}
                placeholder="%"
                min={0}
                max={100}
                disabled={isSaving}
              />
            </Col>
          </Row>
        ))}
      </>
    )
  }

  const renderCtaFields = () => {
    return (
      <>
        {/* Background Image MediaPicker */}
        <Form.Group className="mb-3">
          <MediaPicker
            label="Background Image"
            value={(formData.background_media_id as string) || ''}
            onChange={(mediaId) => updateField('background_media_id', mediaId)}
            helpText="Optional background image for the CTA section."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title Line 1</Form.Label>
          <Form.Control
            type="text"
            value={(formData.title_line1 as string) || ''}
            onChange={(e) => updateField('title_line1', e.target.value)}
            placeholder="About Your Next"
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title Line 2</Form.Label>
          <Form.Control
            type="text"
            value={(formData.title_line2 as string) || ''}
            onChange={(e) => updateField('title_line2', e.target.value)}
            placeholder="Project"
            disabled={isSaving}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title Line 3</Form.Label>
          <Form.Control
            type="text"
            value={(formData.title_line3 as string) || ''}
            onChange={(e) => updateField('title_line3', e.target.value)}
            placeholder="Your Mind"
            disabled={isSaving}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CTA Label</Form.Label>
              <Form.Control
                type="text"
                value={(formData.cta_label as string) || ''}
                onChange={(e) => updateField('cta_label', e.target.value)}
                placeholder="Get In Touch"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CTA URL</Form.Label>
              <Form.Control
                type="text"
                value={(formData.cta_url as string) || ''}
                onChange={(e) => updateField('cta_url', e.target.value)}
                placeholder="/contact"
                disabled={isSaving}
              />
            </Form.Group>
          </Col>
        </Row>
      </>
    )
  }

  const renderSectionFields = () => {
    if (sectionType === 'dynamic_module') {
      return renderDynamicModuleFields()
    }

    switch (sectionKey) {
      case 'hero':
        return renderHeroFields()
      case 'home_about':
        return renderAboutFields()
      case 'partners':
        return renderPartnersFields()
      case 'why_choose':
        return renderWhyChooseFields()
      case 'cta':
        return renderCtaFields()
      default:
        return (
          <Alert variant="warning">
            Section editor for "{sectionLabel}" is not yet implemented.
          </Alert>
        )
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">Edit: {sectionLabel}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Enable/Disable Toggle */}
        <Form.Group className="mb-4 pb-3 border-bottom">
          <Form.Check
            type="switch"
            id="section-enabled-toggle"
            label="Section Enabled"
            checked={(formData.enabled as boolean) !== false}
            onChange={(e) => updateField('enabled', e.target.checked)}
            disabled={isSaving}
          />
          <Form.Text className="text-muted">
            Disabled sections are hidden on the public homepage.
          </Form.Text>
        </Form.Group>

        {/* Section-specific fields */}
        {renderSectionFields()}
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={onClose} disabled={isSaving || loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isSaving || loading}>
          {isSaving ? (
            <>
              <Spinner size="sm" className="me-1" />
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

export default HomepageSectionEditModal
