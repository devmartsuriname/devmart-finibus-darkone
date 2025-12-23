import { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Form, Spinner, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Service, ServiceInput, ServiceProcessStep, ServicePricingPlan, ProcessStepInput, PricingPlanInput, generateSlug, isValidSlug, useServices } from '../hooks/useServices'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'
import ProcessStepsEditor from './ProcessStepsEditor'
import PricingPlansEditor from './PricingPlansEditor'

interface ServiceModalProps {
  show: boolean
  onClose: () => void
  onSave: (input: ServiceInput) => Promise<{ success: boolean; id?: string }>
  onUpdate?: (id: string, input: Partial<ServiceInput>) => Promise<boolean>
  service?: Service | null
}

const ServiceModal = ({ show, onClose, onSave, onUpdate, service }: ServiceModalProps) => {
  const isEditMode = !!service
  const { fetchProcessSteps, saveProcessSteps, fetchPricingPlans, savePricingPlans } = useServices()

  // Form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [shortDescription, setShortDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [iconId, setIconId] = useState<string>('')
  const [displayOrder, setDisplayOrder] = useState<string>('0')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')

  // Related data
  const [processSteps, setProcessSteps] = useState<ProcessStepInput[]>([])
  const [pricingPlans, setPricingPlans] = useState<PricingPlanInput[]>([])

  // UI state
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingRelated, setIsLoadingRelated] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState('basic')

  // Reset form when modal opens/closes or service changes
  useEffect(() => {
    if (show) {
      if (service) {
        setTitle(service.title)
        setSlug(service.slug)
        setSlugManuallyEdited(true)
        setShortDescription(service.short_description)
        setFullDescription(service.full_description || '')
        setIconId(service.icon_media_id || '')
        setDisplayOrder(service.display_order.toString())
        setStatus(service.status)
        loadRelatedData(service.id)
      } else {
        resetForm()
      }
      setErrors({})
      setActiveTab('basic')
    }
  }, [show, service])

  const loadRelatedData = async (serviceId: string) => {
    setIsLoadingRelated(true)
    try {
      const [steps, plans] = await Promise.all([
        fetchProcessSteps(serviceId),
        fetchPricingPlans(serviceId),
      ])
      
      setProcessSteps(steps.map(s => ({
        step_number: s.step_number,
        title: s.title,
        description: s.description,
        image_media_id: s.image_media_id,
      })))
      
      setPricingPlans(plans.map(p => ({
        billing_period: p.billing_period,
        plan_name: p.plan_name,
        plan_subtitle: p.plan_subtitle,
        price_amount: p.price_amount,
        currency: p.currency,
        features: p.features,
        cta_label: p.cta_label,
        display_order: p.display_order,
        status: p.status,
      })))
    } catch (err) {
      console.error('Error loading related data:', err)
    } finally {
      setIsLoadingRelated(false)
    }
  }

  const resetForm = useCallback(() => {
    setTitle('')
    setSlug('')
    setSlugManuallyEdited(false)
    setShortDescription('')
    setFullDescription('')
    setIconId('')
    setDisplayOrder('0')
    setStatus('draft')
    setProcessSteps([])
    setPricingPlans([])
    setErrors({})
  }, [])

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
    } else if (title.length > 100) {
      newErrors.title = 'Title must be 100 characters or less'
    }

    if (!slug.trim()) {
      newErrors.slug = 'Slug is required'
    } else if (!isValidSlug(slug)) {
      newErrors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens'
    }

    if (!shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required'
    } else if (shortDescription.length > 200) {
      newErrors.shortDescription = 'Short description must be 200 characters or less'
    }

    if (isNaN(parseInt(displayOrder))) {
      newErrors.displayOrder = 'Display order must be a number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setIsSaving(true)

    const input: ServiceInput = {
      title: title.trim(),
      slug: slug.trim(),
      short_description: shortDescription.trim(),
      full_description: fullDescription.trim() || null,
      icon_media_id: iconId || null,
      display_order: parseInt(displayOrder) || 0,
      status,
    }

    let success = false
    let serviceId = service?.id

    if (isEditMode && onUpdate && service) {
      success = await onUpdate(service.id, input)
    } else {
      // For create, get the new ID from the result
      const result = await onSave(input)
      success = result.success
      if (result.id) {
        serviceId = result.id
      }
    }

    // Save related data if we have a service ID
    if (success && serviceId) {
      await Promise.all([
        saveProcessSteps(serviceId, processSteps),
        savePricingPlans(serviceId, pricingPlans),
      ])
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
        <Modal.Title as="h5">{isEditMode ? 'Edit Service' : 'Add Service'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'basic')} className="mb-3">
          <Tab eventKey="basic" title="Basic Info">
            <Form>
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter service title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      isInvalid={!!errors.title}
                      disabled={isSaving}
                      maxLength={100}
                    />
                    {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Slug <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="service-url-slug"
                      value={slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      isInvalid={!!errors.slug}
                      disabled={isSaving}
                    />
                    {errors.slug && <div className="invalid-feedback d-block">{errors.slug}</div>}
                    <Form.Text className="text-muted">URL-friendly identifier.</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Short Description <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Brief description for service cards (max 200 chars)"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      isInvalid={!!errors.shortDescription}
                      disabled={isSaving}
                      maxLength={200}
                    />
                    {errors.shortDescription && <div className="invalid-feedback d-block">{errors.shortDescription}</div>}
                    <Form.Text className="text-muted">{shortDescription.length}/200</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Full Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Detailed service description (optional)"
                      value={fullDescription}
                      onChange={(e) => setFullDescription(e.target.value)}
                      disabled={isSaving}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <MediaPicker
                    value={iconId}
                    onChange={setIconId}
                    label="Service Icon"
                    helpText="Select icon from Media Library"
                  />

                  <Form.Group className="mb-3">
                    <Form.Label>Display Order</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0, 1, 2..."
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(e.target.value)}
                      isInvalid={!!errors.displayOrder}
                      disabled={isSaving}
                      min={0}
                    />
                    {errors.displayOrder && <div className="invalid-feedback d-block">{errors.displayOrder}</div>}
                  </Form.Group>

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
                </Col>
              </Row>
            </Form>
          </Tab>

          <Tab eventKey="steps" title="Process Steps" disabled={!isEditMode}>
            {isLoadingRelated ? (
              <div className="text-center py-4">
                <Spinner animation="border" size="sm" />
                <p className="text-muted mt-2">Loading process steps...</p>
              </div>
            ) : (
              <ProcessStepsEditor
                steps={processSteps}
                onChange={setProcessSteps}
                disabled={isSaving}
              />
            )}
          </Tab>

          <Tab eventKey="pricing" title="Pricing Plans" disabled={!isEditMode}>
            {isLoadingRelated ? (
              <div className="text-center py-4">
                <Spinner animation="border" size="sm" />
                <p className="text-muted mt-2">Loading pricing plans...</p>
              </div>
            ) : (
              <PricingPlansEditor
                plans={pricingPlans}
                onChange={setPricingPlans}
                disabled={isSaving}
              />
            )}
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
            isEditMode ? 'Save Changes' : 'Add Service'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ServiceModal