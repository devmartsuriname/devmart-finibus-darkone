import Form from 'react-bootstrap/Form'

interface GeneralSettingsTabProps {
  values: {
    site_name: string
    site_tagline: string
    contact_email: string
    contact_phone: string
    contact_address: string
  }
  onChange: (key: string, value: string) => void
  errors: Record<string, string>
}

const GeneralSettingsTab = ({ values, onChange, errors }: GeneralSettingsTabProps) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Site Name</Form.Label>
        <Form.Control
          type="text"
          value={values.site_name}
          onChange={(e) => onChange('site_name', e.target.value)}
          placeholder="Enter site name"
          maxLength={100}
        />
        <Form.Text className="text-muted">
          The name of your site or company
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tagline</Form.Label>
        <Form.Control
          type="text"
          value={values.site_tagline}
          onChange={(e) => onChange('site_tagline', e.target.value)}
          placeholder="Enter tagline or slogan"
          maxLength={200}
        />
        <Form.Text className="text-muted">
          A short description or slogan for your site
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contact Email</Form.Label>
        <Form.Control
          type="email"
          value={values.contact_email}
          onChange={(e) => onChange('contact_email', e.target.value)}
          placeholder="email@example.com"
          isInvalid={!!errors.contact_email}
          maxLength={255}
        />
        {errors.contact_email && (
          <Form.Control.Feedback type="invalid">
            {errors.contact_email}
          </Form.Control.Feedback>
        )}
        <Form.Text className="text-muted">
          Primary contact email address
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contact Phone</Form.Label>
        <Form.Control
          type="tel"
          value={values.contact_phone}
          onChange={(e) => onChange('contact_phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
          maxLength={50}
        />
        <Form.Text className="text-muted">
          Primary contact phone number
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={values.contact_address}
          onChange={(e) => onChange('contact_address', e.target.value)}
          placeholder="Enter physical address"
          maxLength={500}
        />
        <Form.Text className="text-muted">
          Physical or mailing address
        </Form.Text>
      </Form.Group>
    </>
  )
}

export default GeneralSettingsTab
