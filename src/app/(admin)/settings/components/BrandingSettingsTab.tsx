import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import MediaPicker from './MediaPicker'

interface BrandingSettingsTabProps {
  values: {
    logo_media_id: string
    favicon_media_id: string
    primary_color: string
    secondary_color: string
    accent_color: string
  }
  onChange: (key: string, value: string) => void
}

const BrandingSettingsTab = ({ values, onChange }: BrandingSettingsTabProps) => {
  return (
    <>
      <MediaPicker
        value={values.logo_media_id}
        onChange={(mediaId) => onChange('logo_media_id', mediaId)}
        label="Site Logo"
        helpText="Select logo image from Media Library (recommended: PNG or SVG)"
      />

      <MediaPicker
        value={values.favicon_media_id}
        onChange={(mediaId) => onChange('favicon_media_id', mediaId)}
        label="Favicon"
        helpText="Select favicon from Media Library (recommended: ICO, PNG, or SVG, 32x32 or 16x16)"
      />

      {/* Theme Colors */}
      <Card className="mt-4">
        <Card.Header>
          <h6 className="mb-0">Theme Colors</h6>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Primary Color</Form.Label>
            <div className="d-flex align-items-center gap-3">
              <Form.Control
                type="color"
                value={values.primary_color}
                onChange={(e) => onChange('primary_color', e.target.value)}
                style={{ width: '60px', height: '40px', padding: '2px' }}
              />
              <Form.Control
                type="text"
                value={values.primary_color}
                onChange={(e) => onChange('primary_color', e.target.value)}
                placeholder="#D90A2C"
                style={{ maxWidth: '120px' }}
              />
              <Form.Text className="text-muted">
                Main brand color (buttons, links, accents)
              </Form.Text>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Secondary Color</Form.Label>
            <div className="d-flex align-items-center gap-3">
              <Form.Control
                type="color"
                value={values.secondary_color}
                onChange={(e) => onChange('secondary_color', e.target.value)}
                style={{ width: '60px', height: '40px', padding: '2px' }}
              />
              <Form.Control
                type="text"
                value={values.secondary_color}
                onChange={(e) => onChange('secondary_color', e.target.value)}
                placeholder="#17161A"
                style={{ maxWidth: '120px' }}
              />
              <Form.Text className="text-muted">
                Secondary brand color (backgrounds, headers)
              </Form.Text>
            </div>
          </Form.Group>

          <Form.Group className="mb-0">
            <Form.Label>Accent Color</Form.Label>
            <div className="d-flex align-items-center gap-3">
              <Form.Control
                type="color"
                value={values.accent_color}
                onChange={(e) => onChange('accent_color', e.target.value)}
                style={{ width: '60px', height: '40px', padding: '2px' }}
              />
              <Form.Control
                type="text"
                value={values.accent_color}
                onChange={(e) => onChange('accent_color', e.target.value)}
                placeholder="#F7941D"
                style={{ maxWidth: '120px' }}
              />
              <Form.Text className="text-muted">
                Accent color for highlights and CTAs
              </Form.Text>
            </div>
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  )
}

export default BrandingSettingsTab
