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
      <Form.Group className="mb-3">
        <Form.Label>Default Meta Title</Form.Label>
        <Form.Control
          type="text"
          value={values.default_meta_title}
          onChange={(e) => onChange('default_meta_title', e.target.value)}
          placeholder="Enter default page title"
          maxLength={60}
        />
        <Form.Text className="text-muted">
          Fallback title tag for pages (max 60 characters recommended)
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
        <Form.Text className="text-muted">
          Fallback meta description for pages (max 160 characters recommended)
        </Form.Text>
      </Form.Group>

      <MediaPicker
        value={values.default_og_image_media_id}
        onChange={(mediaId) => onChange('default_og_image_media_id', mediaId)}
        label="Default Open Graph Image"
        helpText="Default image for social media sharing (select from Media Library)"
      />
    </>
  )
}

export default SeoSettingsTab
