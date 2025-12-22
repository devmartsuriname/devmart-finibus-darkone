import Form from 'react-bootstrap/Form'

interface SocialSettingsTabProps {
  values: {
    facebook_url: string
    instagram_url: string
    linkedin_url: string
    youtube_url: string
  }
  onChange: (key: string, value: string) => void
  errors: Record<string, string>
}

const SocialSettingsTab = ({ values, onChange, errors }: SocialSettingsTabProps) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Facebook URL</Form.Label>
        <Form.Control
          type="url"
          value={values.facebook_url}
          onChange={(e) => onChange('facebook_url', e.target.value)}
          placeholder="https://facebook.com/yourpage"
          isInvalid={!!errors.facebook_url}
          maxLength={255}
        />
        {errors.facebook_url && (
          <Form.Control.Feedback type="invalid">
            {errors.facebook_url}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Instagram URL</Form.Label>
        <Form.Control
          type="url"
          value={values.instagram_url}
          onChange={(e) => onChange('instagram_url', e.target.value)}
          placeholder="https://instagram.com/yourprofile"
          isInvalid={!!errors.instagram_url}
          maxLength={255}
        />
        {errors.instagram_url && (
          <Form.Control.Feedback type="invalid">
            {errors.instagram_url}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>LinkedIn URL</Form.Label>
        <Form.Control
          type="url"
          value={values.linkedin_url}
          onChange={(e) => onChange('linkedin_url', e.target.value)}
          placeholder="https://linkedin.com/company/yourcompany"
          isInvalid={!!errors.linkedin_url}
          maxLength={255}
        />
        {errors.linkedin_url && (
          <Form.Control.Feedback type="invalid">
            {errors.linkedin_url}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>YouTube URL</Form.Label>
        <Form.Control
          type="url"
          value={values.youtube_url}
          onChange={(e) => onChange('youtube_url', e.target.value)}
          placeholder="https://youtube.com/@yourchannel"
          isInvalid={!!errors.youtube_url}
          maxLength={255}
        />
        {errors.youtube_url && (
          <Form.Control.Feedback type="invalid">
            {errors.youtube_url}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </>
  )
}

export default SocialSettingsTab
