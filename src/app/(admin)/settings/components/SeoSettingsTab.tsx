import Form from 'react-bootstrap/Form'
import MediaPicker from './MediaPicker'

interface SeoSettingsTabProps {
  values: {
    default_meta_title: string
    default_meta_description: string
    default_og_image_media_id: string
  }
  onChange: (key: string, value: string) => void
}

const SeoSettingsTab = ({ values, onChange }: SeoSettingsTabProps) => {
  return (
    <>
      <div className="alert alert-info small mb-4">
        <strong>Global SEO Fallbacks:</strong> These values are used when individual content items 
        (blog posts, pages) don't have their own SEO fields set. The fallback order is:
        <ol className="mb-0 mt-2">
          <li>Content-specific SEO fields (if set)</li>
          <li>Content-derived values (title, excerpt, featured image)</li>
          <li>These global defaults (lowest priority)</li>
        </ol>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Default Meta Title</Form.Label>
        <Form.Control
          type="text"
          value={values.default_meta_title}
          onChange={(e) => onChange('default_meta_title', e.target.value)}
          placeholder="Enter default page title"
          maxLength={70}
        />
        <Form.Text className={values.default_meta_title.length > 60 ? 'text-warning' : 'text-muted'}>
          {values.default_meta_title.length}/70 characters 
          {values.default_meta_title.length > 60 && ' (nearing optimal limit)'}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Default Meta Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={values.default_meta_description}
          onChange={(e) => onChange('default_meta_description', e.target.value)}
          placeholder="Enter default meta description"
          maxLength={160}
        />
        <Form.Text className={values.default_meta_description.length > 155 ? 'text-warning' : 'text-muted'}>
          {values.default_meta_description.length}/160 characters
          {values.default_meta_description.length > 155 && ' (nearing limit)'}
        </Form.Text>
      </Form.Group>

      <MediaPicker
        value={values.default_og_image_media_id}
        onChange={(mediaId) => onChange('default_og_image_media_id', mediaId)}
        label="Default Open Graph Image"
        helpText="Default image for social media sharing. Used when content has no featured image or OG image set."
      />
    </>
  )
}

export default SeoSettingsTab
