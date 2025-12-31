import { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Form, Spinner, Tabs, Tab, Row, Col } from 'react-bootstrap'
import { BlogPost, BlogPostInput, generateSlug, isValidSlug } from '../hooks/useBlogPosts'
import { ContentBlock, compileBlocksToHtml, validateContentBlocks } from '../utils/compileContent'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'
import ContentBlocksEditor from './ContentBlocksEditor'
import CategorySelector from './CategorySelector'
import TagsInput from './TagsInput'

interface BlogPostModalProps {
  show: boolean
  onClose: () => void
  onSave: (input: BlogPostInput) => Promise<boolean>
  onUpdate?: (id: string, input: Partial<BlogPostInput>) => Promise<boolean>
  post?: BlogPost | null
}

const BlogPostModal = ({ show, onClose, onSave, onUpdate, post }: BlogPostModalProps) => {
  const isEditMode = !!post

  // Tab state
  const [activeTab, setActiveTab] = useState('content')

  // Content tab state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [excerpt, setExcerpt] = useState('')
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const [legacyContent, setLegacyContent] = useState('') // For backward compatibility
  const [isLegacyMode, setIsLegacyMode] = useState(false)

  // Taxonomy tab state
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])

  // Media & Publishing tab state
  const [featuredImageId, setFeaturedImageId] = useState<string>('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [publishedAt, setPublishedAt] = useState('')

  // SEO tab state
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [ogImageId, setOgImageId] = useState('')
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [noindex, setNoindex] = useState(false)

  // UI state
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when modal opens/closes or post changes
  useEffect(() => {
    if (show) {
      if (post) {
        setTitle(post.title)
        setSlug(post.slug)
        setSlugManuallyEdited(true)
        setExcerpt(post.excerpt || '')
        
        // Handle content blocks - check if post has structured content
        const blocks = post.content_blocks as unknown as ContentBlock[] | null
        if (blocks && Array.isArray(blocks) && blocks.length > 0) {
          setContentBlocks(blocks)
          setIsLegacyMode(false)
          setLegacyContent('')
        } else {
          // Legacy mode: use plain textarea for existing HTML content
          setContentBlocks([])
          setIsLegacyMode(true)
          setLegacyContent(post.content || '')
        }
        
        // Taxonomy
        setCategory(post.category || '')
        setTags(post.tags || [])
        
        // Media & Publishing
        setFeaturedImageId(post.featured_image_media_id || '')
        setStatus(post.status as 'draft' | 'published')
        setPublishedAt(post.published_at ? post.published_at.split('T')[0] : '')
        
        // SEO
        setMetaTitle(post.meta_title || '')
        setMetaDescription(post.meta_description || '')
        setOgImageId(post.og_image_media_id || '')
        setCanonicalUrl(post.canonical_url || '')
        setNoindex(post.noindex ?? false)
      } else {
        resetForm()
      }
      setErrors({})
      setActiveTab('content')
    }
  }, [show, post])

  const resetForm = useCallback(() => {
    setTitle('')
    setSlug('')
    setSlugManuallyEdited(false)
    setExcerpt('')
    setContentBlocks([])
    setLegacyContent('')
    setIsLegacyMode(false)
    setCategory('')
    setTags([])
    setFeaturedImageId('')
    setStatus('draft')
    setPublishedAt('')
    setMetaTitle('')
    setMetaDescription('')
    setOgImageId('')
    setCanonicalUrl('')
    setNoindex(false)
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

    // Title
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.length > 200) {
      newErrors.title = 'Title must be 200 characters or less'
    }

    // Slug
    if (!slug.trim()) {
      newErrors.slug = 'Slug is required'
    } else if (!isValidSlug(slug)) {
      newErrors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens'
    }

    // Excerpt
    if (excerpt && excerpt.length > 300) {
      newErrors.excerpt = 'Excerpt must be 300 characters or less'
    }

    // Content
    if (isLegacyMode) {
      if (!legacyContent.trim()) {
        newErrors.content = 'Content is required'
      }
    } else {
      if (contentBlocks.length === 0) {
        newErrors.content = 'At least one content block is required'
      } else {
        const validation = validateContentBlocks(contentBlocks)
        if (!validation.valid) {
          newErrors.content = validation.error || 'Invalid content blocks'
        }
      }
    }

    // SEO validation
    if (metaTitle && metaTitle.length > 70) {
      newErrors.metaTitle = 'Meta title must be 70 characters or less'
    }
    if (metaDescription && metaDescription.length > 160) {
      newErrors.metaDescription = 'Meta description must be 160 characters or less'
    }
    if (canonicalUrl && !isValidUrl(canonicalUrl)) {
      newErrors.canonicalUrl = 'Invalid URL format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async () => {
    if (!validate()) {
      // Switch to tab with first error
      if (errors.title || errors.slug || errors.excerpt || errors.content) {
        setActiveTab('content')
      } else if (errors.metaTitle || errors.metaDescription || errors.canonicalUrl) {
        setActiveTab('seo')
      }
      return
    }

    setIsSaving(true)

    // Compile content
    let finalContent: string
    if (isLegacyMode) {
      finalContent = legacyContent.trim()
    } else {
      finalContent = compileBlocksToHtml(contentBlocks)
    }

    const input: BlogPostInput = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || undefined,
      content: finalContent,
      content_blocks: isLegacyMode ? [] : contentBlocks,
      category: category || null,
      tags: tags,
      featured_image_media_id: featuredImageId || null,
      status,
      published_at: status === 'published' ? (publishedAt ? new Date(publishedAt).toISOString() : null) : null,
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      og_image_media_id: ogImageId || null,
      canonical_url: canonicalUrl.trim() || null,
      noindex,
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

  // Convert legacy content to blocks (simple paragraph conversion)
  const handleConvertToBlocks = () => {
    if (!legacyContent.trim()) return
    
    // Simple conversion: split by paragraphs and create paragraph blocks
    const paragraphs = legacyContent
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0)
    
    const blocks: ContentBlock[] = paragraphs.map((p, index) => ({
      id: `converted_${Date.now()}_${index}`,
      type: 'paragraph' as const,
      content: p.replace(/<[^>]*>/g, ''), // Strip HTML tags
    }))
    
    setContentBlocks(blocks)
    setIsLegacyMode(false)
    setLegacyContent('')
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="xl">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">{isEditMode ? 'Edit Post' : 'Create New Post'}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ minHeight: '500px' }}>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'content')}
          className="mb-4"
        >
          {/* Tab 1: Content */}
          <Tab eventKey="content" title="Content">
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
                  <Form.Text className={excerpt.length > 280 ? 'text-danger' : 'text-muted'}>
                    {excerpt.length}/300 characters
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <div className="text-muted small mb-2">
                  {isLegacyMode ? 'Legacy HTML Mode' : 'Structured Blocks Mode'}
                </div>
              </Col>
            </Row>

            {/* Content Editor */}
            <Form.Group className="mb-3">
              <Form.Label>Content <span className="text-danger">*</span></Form.Label>
              
              {isLegacyMode ? (
                <>
                  <div className="alert alert-info small mb-2">
                    This post uses legacy HTML content. You can edit the HTML directly or convert to structured blocks.
                  </div>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Write your post content here (HTML supported)..."
                    value={legacyContent}
                    onChange={(e) => setLegacyContent(e.target.value)}
                    isInvalid={!!errors.content}
                    disabled={isSaving}
                    style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                  />
                  <div className="mt-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={handleConvertToBlocks}
                      disabled={isSaving || !legacyContent.trim()}
                    >
                      Convert to Structured Blocks
                    </Button>
                  </div>
                </>
              ) : (
                <ContentBlocksEditor
                  blocks={contentBlocks}
                  onChange={setContentBlocks}
                  disabled={isSaving}
                />
              )}
              
              {errors.content && <div className="invalid-feedback d-block">{errors.content}</div>}
            </Form.Group>
          </Tab>

          {/* Tab 2: Taxonomy */}
          <Tab eventKey="taxonomy" title="Taxonomy">
            <CategorySelector
              value={category}
              onChange={setCategory}
              disabled={isSaving}
            />
            
            <TagsInput
              value={tags}
              onChange={setTags}
              disabled={isSaving}
            />
          </Tab>

          {/* Tab 3: Media & Publishing */}
          <Tab eventKey="media" title="Media & Publishing">
            <Row>
              <Col md={6}>
                <MediaPicker
                  value={featuredImageId}
                  onChange={setFeaturedImageId}
                  label="Featured Image"
                  helpText="Select an image from the Media Library"
                />
              </Col>
              <Col md={6}>
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
          </Tab>

          {/* Tab 4: SEO */}
          <Tab eventKey="seo" title="SEO">
            <div className="alert alert-secondary small mb-4">
              If these fields are empty, Global SEO Settings will be used as fallback.
            </div>
            
            <Row>
              <Col md={6}>
                {/* Meta Title */}
                <Form.Group className="mb-3">
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="SEO title (defaults to post title)"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    isInvalid={!!errors.metaTitle}
                    disabled={isSaving}
                    maxLength={70}
                  />
                  {errors.metaTitle && <div className="invalid-feedback d-block">{errors.metaTitle}</div>}
                  <Form.Text className={metaTitle.length > 60 ? 'text-warning' : 'text-muted'}>
                    {metaTitle.length}/70 characters {metaTitle.length > 60 && '(nearing limit)'}
                  </Form.Text>
                </Form.Group>

                {/* OG Image */}
                <MediaPicker
                  value={ogImageId}
                  onChange={setOgImageId}
                  label="OG Image (Social Sharing)"
                  helpText="Image shown when shared on social media"
                />
              </Col>
              
              <Col md={6}>
                {/* Meta Description */}
                <Form.Group className="mb-3">
                  <Form.Label>Meta Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="SEO description (defaults to excerpt)"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    isInvalid={!!errors.metaDescription}
                    disabled={isSaving}
                    maxLength={160}
                  />
                  {errors.metaDescription && <div className="invalid-feedback d-block">{errors.metaDescription}</div>}
                  <Form.Text className={metaDescription.length > 140 ? 'text-warning' : 'text-muted'}>
                    {metaDescription.length}/160 characters {metaDescription.length > 140 && '(nearing limit)'}
                  </Form.Text>
                </Form.Group>

                {/* Canonical URL */}
                <Form.Group className="mb-3">
                  <Form.Label>Canonical URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://example.com/original-post"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    isInvalid={!!errors.canonicalUrl}
                    disabled={isSaving}
                  />
                  {errors.canonicalUrl && <div className="invalid-feedback d-block">{errors.canonicalUrl}</div>}
                  <Form.Text className="text-muted">
                    Only set if this is a republished post
                  </Form.Text>
                </Form.Group>

                {/* Noindex Toggle */}
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="noindex-switch"
                    label="Noindex (hide from search engines)"
                    checked={noindex}
                    onChange={(e) => setNoindex(e.target.checked)}
                    disabled={isSaving}
                  />
                  <Form.Text className="text-muted">
                    Enable to prevent search engines from indexing this post
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
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
            isEditMode ? 'Save Changes' : 'Create Post'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BlogPostModal
