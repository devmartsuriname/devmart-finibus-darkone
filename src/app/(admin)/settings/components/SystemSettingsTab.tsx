import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

/**
 * System settings values interface.
 * All values are guaranteed strings - the parent component ensures defaults.
 */
export interface SystemSettingsValues {
  maintenance_mode: string
  coming_soon_enabled: string
  coming_soon_message: string
  quotes_enabled: string
  contact_form_enabled: string
}

/**
 * Default values for system settings.
 * Used to guarantee no undefined values reach form controls.
 */
export const SYSTEM_SETTINGS_DEFAULTS: SystemSettingsValues = {
  maintenance_mode: 'false',
  coming_soon_enabled: 'false',
  coming_soon_message: '',
  quotes_enabled: 'true',
  contact_form_enabled: 'true',
}

interface SystemSettingsTabProps {
  values: SystemSettingsValues
  onChange: (key: string, value: string) => void
}

/**
 * SystemSettingsTab - Admin UI for system toggle controls.
 * 
 * Manages operational toggles:
 * - Maintenance Mode (site availability)
 * - Coming Soon Mode (pre-launch state)
 * - Feature toggles (quotes, contact form)
 * 
 * All values are stored as strings ("true"/"false") in the database.
 * Form.Check switches convert boolean state to string values on change.
 * 
 * @pattern Darkone 1:1 - Uses Form.Check switches following existing settings patterns
 */
const SystemSettingsTab = ({ values, onChange }: SystemSettingsTabProps) => {
  // Ensure all values have guaranteed string defaults to prevent undefined errors
  const safeValues: SystemSettingsValues = {
    maintenance_mode: values.maintenance_mode ?? SYSTEM_SETTINGS_DEFAULTS.maintenance_mode,
    coming_soon_enabled: values.coming_soon_enabled ?? SYSTEM_SETTINGS_DEFAULTS.coming_soon_enabled,
    coming_soon_message: values.coming_soon_message ?? SYSTEM_SETTINGS_DEFAULTS.coming_soon_message,
    quotes_enabled: values.quotes_enabled ?? SYSTEM_SETTINGS_DEFAULTS.quotes_enabled,
    contact_form_enabled: values.contact_form_enabled ?? SYSTEM_SETTINGS_DEFAULTS.contact_form_enabled,
  }

  return (
    <>
      {/* Site Availability Section */}
      <Card className="mb-4">
        <Card.Header>
          <h6 className="mb-0">Site Availability</h6>
        </Card.Header>
        <Card.Body>
          {/* Maintenance Mode Toggle */}
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="maintenance-mode"
              label="Maintenance Mode"
              checked={safeValues.maintenance_mode === 'true'}
              onChange={(e) => onChange('maintenance_mode', e.target.checked ? 'true' : 'false')}
            />
            <Form.Text className="text-muted">
              When enabled, the public site shows a maintenance page. Admin dashboard remains accessible.
            </Form.Text>
          </Form.Group>

          {/* Coming Soon Toggle */}
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="coming-soon-enabled"
              label="Coming Soon Mode"
              checked={safeValues.coming_soon_enabled === 'true'}
              onChange={(e) => onChange('coming_soon_enabled', e.target.checked ? 'true' : 'false')}
            />
            <Form.Text className="text-muted">
              When enabled, shows Coming Soon page to visitors. Maintenance Mode takes priority if both are enabled.
            </Form.Text>
          </Form.Group>

          {/* Coming Soon Message */}
          <Form.Group className="mb-0">
            <Form.Label>Coming Soon Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={safeValues.coming_soon_message}
              onChange={(e) => onChange('coming_soon_message', e.target.value)}
              placeholder="Optional custom message for Coming Soon page"
              maxLength={500}
            />
            <Form.Text className="text-muted">
              Custom message displayed on the Coming Soon page (optional, max 500 characters)
            </Form.Text>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Feature Controls Section */}
      <Card>
        <Card.Header>
          <h6 className="mb-0">Feature Controls</h6>
        </Card.Header>
        <Card.Body>
          {/* Quote Wizard Toggle */}
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="quotes-enabled"
              label="Quote Wizard Enabled"
              checked={safeValues.quotes_enabled === 'true'}
              onChange={(e) => onChange('quotes_enabled', e.target.checked ? 'true' : 'false')}
            />
            <Form.Text className="text-muted">
              Allow visitors to submit quote requests through the Quote Wizard.
            </Form.Text>
          </Form.Group>

          {/* Contact Form Toggle */}
          <Form.Group className="mb-0">
            <Form.Check
              type="switch"
              id="contact-form-enabled"
              label="Contact Form Enabled"
              checked={safeValues.contact_form_enabled === 'true'}
              onChange={(e) => onChange('contact_form_enabled', e.target.checked ? 'true' : 'false')}
            />
            <Form.Text className="text-muted">
              Allow visitors to submit contact inquiries through the Contact Form.
            </Form.Text>
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  )
}

export default SystemSettingsTab
