import Card from 'react-bootstrap/Card'
import MediaPicker from './MediaPicker'

interface BrandingSettingsTabProps {
  values: {
    logo_media_id: string
    favicon_media_id: string
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

      {/* Coming Soon placeholder for color/font theming */}
      <Card className="mt-4 bg-light border-dashed">
        <Card.Body className="text-center py-4">
          <h5 className="text-muted mb-2">Theme Customization</h5>
          <p className="text-muted mb-0 small">
            Color and font customization options are coming in a future update.
          </p>
        </Card.Body>
      </Card>
    </>
  )
}

export default BrandingSettingsTab
