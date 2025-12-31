/**
 * ProjectModal Component
 * 
 * Phase 5.4+ Hotfix: Updated to match Services modal standard
 * - size="xl"
 * - Tabs: Basic Info | Process Steps
 * - New fields: website, start_date, end_date, check_launch_content, check_launch_image
 */

import { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Form, Spinner, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Project, ProjectInput, PROJECT_CATEGORIES, generateSlug, isValidSlug, useProjects, ProjectProcessStepInput } from '../hooks/useProjects'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'
import ProjectProcessStepsEditor from './ProjectProcessStepsEditor'
import ProjectSeoTab from './ProjectSeoTab'

interface ProjectModalProps {
  show: boolean
  onClose: () => void
  onSave: (input: ProjectInput) => Promise<{ success: boolean; id?: string }>
  onUpdate?: (id: string, input: Partial<ProjectInput>) => Promise<boolean>
  project?: Project | null
}

const ProjectModal = ({ show, onClose, onSave, onUpdate, project }: ProjectModalProps) => {
  const isEditMode = !!project
  const { fetchProcessSteps, saveProcessSteps } = useProjects()

  // Form state - Basic Info
  const [title, setTitle] = useState('')
  const [heading, setHeading] = useState('')
  const [slug, setSlug] = useState('')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [description, setDescription] = useState('')
  const [imageId, setImageId] = useState<string>('')
  const [featuredImageId, setFeaturedImageId] = useState<string>('')
  const [category, setCategory] = useState<string>(PROJECT_CATEGORIES[0])
  const [isFeatured, setIsFeatured] = useState(false)
  const [displayOrder, setDisplayOrder] = useState<string>('')
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft')
  const [client, setClient] = useState('')

  // New fields (Phase 5.4+)
  const [website, setWebsite] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [checkLaunchContent, setCheckLaunchContent] = useState('')
  const [checkLaunchImageId, setCheckLaunchImageId] = useState<string>('')

  // SEO fields (Phase 4C)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [ogImageMediaId, setOgImageMediaId] = useState<string>('')
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [noindex, setNoindex] = useState(false)

  // Process Steps
  const [processSteps, setProcessSteps] = useState<ProjectProcessStepInput[]>([])

  // UI state
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingSteps, setIsLoadingSteps] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState('basic')

  // Reset form when modal opens/closes or project changes
  useEffect(() => {
    if (show) {
      if (project) {
        setTitle(project.title)
        setHeading(project.heading)
        setSlug(project.slug)
        setSlugManuallyEdited(true)
        setDescription(project.description || '')
        setImageId(project.image_media_id || '')
        setFeaturedImageId(project.featured_image_media_id || '')
        setCategory(project.category)
        setIsFeatured(project.is_featured)
        setDisplayOrder(project.display_order?.toString() || '')
        setStatus(project.status)
        setClient(project.client || '')
        // New fields
        setWebsite(project.website || '')
        setStartDate(project.start_date || '')
        setEndDate(project.end_date || '')
        setCheckLaunchContent(project.check_launch_content || '')
        setCheckLaunchImageId(project.check_launch_image_media_id || '')
        // SEO fields (Phase 4C)
        setMetaTitle(project.meta_title || '')
        setMetaDescription(project.meta_description || '')
        setOgImageMediaId(project.og_image_media_id || '')
        setCanonicalUrl(project.canonical_url || '')
        setNoindex(project.noindex || false)
        // Load process steps
        loadProcessSteps(project.id)
      } else {
        resetForm()
      }
      setErrors({})
      setActiveTab('basic')
    }
  }, [show, project])

  const loadProcessSteps = async (projectId: string) => {
    setIsLoadingSteps(true)
    try {
      const steps = await fetchProcessSteps(projectId)
      setProcessSteps(steps.map(s => ({
        step_number: s.step_number,
        title: s.title,
        description: s.description || '',
        image_media_id: s.image_media_id,
      })))
    } catch (err) {
      console.error('Error loading process steps:', err)
    } finally {
      setIsLoadingSteps(false)
    }
  }

  const resetForm = useCallback(() => {
    setTitle('')
    setHeading('')
    setSlug('')
    setSlugManuallyEdited(false)
    setDescription('')
    setImageId('')
    setFeaturedImageId('')
    setCategory(PROJECT_CATEGORIES[0])
    setIsFeatured(false)
    setDisplayOrder('')
    setStatus('draft')
    setClient('')
    setWebsite('')
    setStartDate('')
    setEndDate('')
    setCheckLaunchContent('')
    setCheckLaunchImageId('')
    // SEO fields (Phase 4C)
    setMetaTitle('')
    setMetaDescription('')
    setOgImageMediaId('')
    setCanonicalUrl('')
    setNoindex(false)
    setProcessSteps([])
    setErrors({})
  }, [])

  // Auto-generate slug from title
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

    if (!heading.trim()) {
      newErrors.heading = 'Heading is required'
    } else if (heading.length > 300) {
      newErrors.heading = 'Heading must be 300 characters or less'
    }

    if (!slug.trim()) {
      newErrors.slug = 'Slug is required'
    } else if (!isValidSlug(slug)) {
      newErrors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens'
    }

    if (!category) {
      newErrors.category = 'Category is required'
    }

    if (displayOrder && isNaN(parseInt(displayOrder))) {
      newErrors.displayOrder = 'Display order must be a number'
    }

    // Canonical URL validation (Phase 4C)
    if (canonicalUrl.trim()) {
      try {
        new URL(canonicalUrl.trim())
      } catch {
        newErrors.canonicalUrl = 'Please enter a valid URL'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setIsSaving(true)

    const input: ProjectInput = {
      title: title.trim(),
      heading: heading.trim(),
      slug: slug.trim(),
      description: description.trim() || null,
      image_media_id: imageId || null,
      featured_image_media_id: featuredImageId || null,
      category,
      is_featured: isFeatured,
      display_order: displayOrder ? parseInt(displayOrder) : null,
      status,
      client: client.trim() || null,
      website: website.trim() || null,
      start_date: startDate || null,
      end_date: endDate || null,
      check_launch_content: checkLaunchContent.trim() || null,
      check_launch_image_media_id: checkLaunchImageId || null,
      // SEO fields (Phase 4C)
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      og_image_media_id: ogImageMediaId || null,
      canonical_url: canonicalUrl.trim() || null,
      noindex,
    }

    let success = false
    let projectId = project?.id

    if (isEditMode && onUpdate && project) {
      success = await onUpdate(project.id, input)
    } else {
      const result = await onSave(input)
      success = result.success
      if (result.id) {
        projectId = result.id
      }
    }

    // Save process steps if we have a project ID
    if (success && projectId) {
      await saveProcessSteps(projectId, processSteps)
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
        <Modal.Title as="h5">{isEditMode ? 'Edit Project' : 'Add Project'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'basic')} className="mb-3">
          <Tab eventKey="basic" title="Basic Info">
            <Form>
              <Row>
                <Col md={8}>
                  {/* Title */}
                  <Form.Group className="mb-3">
                    <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter project title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      isInvalid={!!errors.title}
                      disabled={isSaving}
                      maxLength={200}
                    />
                    {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
                  </Form.Group>

                  {/* Heading */}
                  <Form.Group className="mb-3">
                    <Form.Label>Heading <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Short description or tagline"
                      value={heading}
                      onChange={(e) => setHeading(e.target.value)}
                      isInvalid={!!errors.heading}
                      disabled={isSaving}
                      maxLength={300}
                    />
                    {errors.heading && <div className="invalid-feedback d-block">{errors.heading}</div>}
                  </Form.Group>

                  {/* Slug */}
                  <Form.Group className="mb-3">
                    <Form.Label>Slug <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="project-url-slug"
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

                  {/* Description */}
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Detailed project description (optional)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={isSaving}
                    />
                  </Form.Group>

                  <Row>
                    {/* Client */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Client</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Client name (optional)"
                          value={client}
                          onChange={(e) => setClient(e.target.value)}
                          disabled={isSaving}
                        />
                      </Form.Group>
                    </Col>

                    {/* Website */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="www.example.com"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          disabled={isSaving}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    {/* Start Date */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          disabled={isSaving}
                        />
                      </Form.Group>
                    </Col>

                    {/* End Date */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          disabled={isSaving}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Check & Launch Content */}
                  <Form.Group className="mb-3">
                    <Form.Label>Check & Launch Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Content for the Check & Launch section (optional)"
                      value={checkLaunchContent}
                      onChange={(e) => setCheckLaunchContent(e.target.value)}
                      disabled={isSaving}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  {/* Thumbnail Image */}
                  <MediaPicker
                    value={imageId}
                    onChange={setImageId}
                    label="Thumbnail Image"
                    helpText="Select thumbnail from Media Library"
                  />

                  {/* Featured Image */}
                  <MediaPicker
                    value={featuredImageId}
                    onChange={setFeaturedImageId}
                    label="Featured Image"
                    helpText="Banner image for project details"
                  />

                  {/* Check & Launch Image */}
                  <MediaPicker
                    value={checkLaunchImageId}
                    onChange={setCheckLaunchImageId}
                    label="Check & Launch Image"
                    helpText="Image for Check & Launch section"
                  />

                  {/* Category */}
                  <Form.Group className="mb-3">
                    <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      isInvalid={!!errors.category}
                      disabled={isSaving}
                    >
                      {PROJECT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                    {errors.category && <div className="invalid-feedback d-block">{errors.category}</div>}
                  </Form.Group>

                  {/* Status */}
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as 'draft' | 'published' | 'archived')}
                      disabled={isSaving}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Featured Checkbox */}
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="is-featured"
                      label="Featured Project"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      disabled={isSaving}
                    />
                  </Form.Group>

                  {/* Display Order (only if featured) */}
                  {isFeatured && (
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
          </Tab>

          <Tab eventKey="steps" title="Process Steps" disabled={!isEditMode}>
            {isLoadingSteps ? (
              <div className="text-center py-4">
                <Spinner animation="border" size="sm" />
                <p className="text-muted mt-2">Loading process steps...</p>
              </div>
            ) : (
              <ProjectProcessStepsEditor
                steps={processSteps}
                onChange={setProcessSteps}
                disabled={isSaving}
              />
            )}
          </Tab>

          <Tab eventKey="seo" title="SEO">
            <ProjectSeoTab
              projectTitle={title}
              metaTitle={metaTitle}
              metaDescription={metaDescription}
              ogImageMediaId={ogImageMediaId}
              canonicalUrl={canonicalUrl}
              noindex={noindex}
              disabled={isSaving}
              errors={errors}
              onMetaTitleChange={setMetaTitle}
              onMetaDescriptionChange={setMetaDescription}
              onOgImageMediaIdChange={setOgImageMediaId}
              onCanonicalUrlChange={setCanonicalUrl}
              onNoindexChange={setNoindex}
            />
          </Tab>
        </Tabs>
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
            isEditMode ? 'Save Changes' : 'Add Project'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProjectModal
