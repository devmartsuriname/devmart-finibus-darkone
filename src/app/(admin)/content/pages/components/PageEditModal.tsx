import { useState, useEffect } from 'react'
import { Modal, Button, Spinner, Tabs, Tab } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import type { Page, PageUpdateInput } from '../hooks/usePages'
import { useHomepageBlocks } from '../hooks/useHomepageBlocks'
import HomepageSectionsTab from './HomepageSectionsTab'
import HomepageSeoTab from './HomepageSeoTab'

interface PageEditModalProps {
  show: boolean
  page: Page | null
  loading: boolean
  onClose: () => void
  onSave: (id: string, input: PageUpdateInput) => Promise<boolean>
}

const PageEditModal = ({ show, page, loading, onClose, onSave }: PageEditModalProps) => {
  const [title, setTitle] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState('page-info')

  // Homepage-specific hook
  const {
    data: homepageData,
    loading: homepageLoading,
    fetchHomepageData,
    toggleSectionEnabled,
    updateSection,
    getSectionEnabled,
    updateSeoData
  } = useHomepageBlocks()

  // Detect if this is the Homepage
  const isHomepage = page?.slug === '/'

  useEffect(() => {
    if (page) {
      setTitle(page.title)
      setMetaTitle(page.meta_title || '')
      setMetaDescription(page.meta_description || '')
      setIsPublished(page.is_published)
      setErrors({})
      setActiveTab('page-info')

      // Fetch homepage data if this is the homepage
      if (page.slug === '/') {
        fetchHomepageData()
      }
    }
  }, [page, fetchHomepageData])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.length > 100) {
      newErrors.title = 'Title must be 100 characters or less'
    }
    
    if (metaTitle && metaTitle.length > 70) {
      newErrors.metaTitle = 'Meta title must be 70 characters or less'
    }
    
    if (metaDescription && metaDescription.length > 160) {
      newErrors.metaDescription = 'Meta description must be 160 characters or less'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!page || !validate()) return

    const input: PageUpdateInput = {
      title: title.trim(),
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      is_published: isPublished,
    }

    const success = await onSave(page.id, input)
    if (success) {
      onClose()
    }
  }

  if (!page) return null

  // Render standard page modal (non-Homepage)
  if (!isHomepage) {
    return (
      <Modal show={show} onHide={onClose} centered size="xl">
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title as="h5">Edit Page</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* Slug - READ ONLY */}
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                value={page.slug}
                disabled
                readOnly
                className="bg-light text-muted"
              />
              <Form.Text className="text-muted">
                Slug is fixed and cannot be changed.
              </Form.Text>
            </Form.Group>

            {/* Title */}
            <Form.Group className="mb-3">
              <Form.Label>Title <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!!errors.title}
                maxLength={100}
                placeholder="Page title"
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              <Form.Text className="text-muted">
                {title.length}/100 characters
              </Form.Text>
            </Form.Group>

            {/* Meta Title */}
            <Form.Group className="mb-3">
              <Form.Label>Meta Title</Form.Label>
              <Form.Control
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                isInvalid={!!errors.metaTitle}
                maxLength={70}
                placeholder="SEO meta title (optional)"
              />
              <Form.Control.Feedback type="invalid">{errors.metaTitle}</Form.Control.Feedback>
              <Form.Text className="text-muted">
                {metaTitle.length}/70 characters
              </Form.Text>
            </Form.Group>

            {/* Meta Description */}
            <Form.Group className="mb-3">
              <Form.Label>Meta Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                isInvalid={!!errors.metaDescription}
                maxLength={160}
                placeholder="SEO meta description (optional)"
              />
              <Form.Control.Feedback type="invalid">{errors.metaDescription}</Form.Control.Feedback>
              <Form.Text className="text-muted">
                {metaDescription.length}/160 characters
              </Form.Text>
            </Form.Group>

            {/* Published Status */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="is-published"
                label="Published"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <Form.Text className="text-muted">
                Published pages are visible to the public.
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-top">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }

  // Render Homepage modal with tabs (Page Info, Sections, SEO)
  return (
    <Modal show={show} onHide={onClose} centered size="xl">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">Edit Page — Homepage</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs 
          activeKey={activeTab} 
          onSelect={(k) => setActiveTab(k || 'page-info')} 
          className="mb-3"
        >
          {/* Tab 1: Page Info */}
          <Tab eventKey="page-info" title="Page Info">
            <Form onSubmit={handleSubmit}>
              {/* Slug - READ ONLY */}
              <Form.Group className="mb-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="text"
                  value={page.slug}
                  disabled
                  readOnly
                  className="bg-light text-muted"
                />
                <Form.Text className="text-muted">
                  Homepage slug is fixed as "/".
                </Form.Text>
              </Form.Group>

              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isInvalid={!!errors.title}
                  maxLength={100}
                  placeholder="Page title"
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                <Form.Text className="text-muted">
                  {title.length}/100 characters
                </Form.Text>
              </Form.Group>

              {/* Published Status */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="is-published-homepage"
                  label="Published"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Published pages are visible to the public.
                </Form.Text>
              </Form.Group>

              <div className="mt-4 pt-3 border-top">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Page Info'
                  )}
                </Button>
              </div>
            </Form>
          </Tab>

          {/* Tab 2: Sections (UI Blocks) */}
          <Tab eventKey="sections" title="Sections">
            {homepageLoading && !homepageData ? (
              <div className="text-center py-4">
                <Spinner animation="border" size="sm" />
                <p className="text-muted mt-2">Loading sections...</p>
              </div>
            ) : (
              <HomepageSectionsTab
                data={homepageData}
                loading={homepageLoading}
                onToggleEnabled={toggleSectionEnabled}
                onUpdateSection={updateSection}
                getSectionEnabled={getSectionEnabled}
              />
            )}
          </Tab>

          {/* Tab 3: SEO */}
          <Tab eventKey="seo" title="SEO">
            {homepageLoading && !homepageData ? (
              <div className="text-center py-4">
                <Spinner animation="border" size="sm" />
                <p className="text-muted mt-2">Loading SEO settings...</p>
              </div>
            ) : (
              <HomepageSeoTab
                data={homepageData}
                loading={homepageLoading}
                onSave={updateSeoData}
              />
            )}
          </Tab>
        </Tabs>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={onClose} disabled={loading || homepageLoading}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PageEditModal
