import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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

      {/* Brand Colors Section */}
      <Card className="mt-4">
        <Card.Header>
          <h6 className="mb-0">Brand Colors</h6>
        </Card.Header>
        <Card.Body>
          <p className="text-muted small mb-3">
            These colors apply to the public frontend only. Fonts remain locked to Finibus defaults.
          </p>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Primary Color</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Form.Control
                    type="color"
                    value={values.primary_color}
                    onChange={(e) => onChange('primary_color', e.target.value)}
                    style={{ width: '50px', height: '38px', padding: '2px', cursor: 'pointer' }}
                  />
                  <Form.Control
                    type="text"
                    value={values.primary_color}
                    onChange={(e) => onChange('primary_color', e.target.value)}
                    placeholder="#D90A2C"
                    maxLength={7}
                    style={{ width: '100px' }}
                  />
                </div>
                <Form.Text className="text-muted">
                  Main brand color (buttons, links)
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Secondary Color</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Form.Control
                    type="color"
                    value={values.secondary_color}
                    onChange={(e) => onChange('secondary_color', e.target.value)}
                    style={{ width: '50px', height: '38px', padding: '2px', cursor: 'pointer' }}
                  />
                  <Form.Control
                    type="text"
                    value={values.secondary_color}
                    onChange={(e) => onChange('secondary_color', e.target.value)}
                    placeholder="#17161A"
                    maxLength={7}
                    style={{ width: '100px' }}
                  />
                </div>
                <Form.Text className="text-muted">
                  Secondary brand color (headers, dark sections)
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Accent Color</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Form.Control
                    type="color"
                    value={values.accent_color}
                    onChange={(e) => onChange('accent_color', e.target.value)}
                    style={{ width: '50px', height: '38px', padding: '2px', cursor: 'pointer' }}
                  />
                  <Form.Control
                    type="text"
                    value={values.accent_color}
                    onChange={(e) => onChange('accent_color', e.target.value)}
                    placeholder="#F7941D"
                    maxLength={7}
                    style={{ width: '100px' }}
                  />
                </div>
                <Form.Text className="text-muted">
                  Accent color (highlights, CTAs)
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default BrandingSettingsTab
