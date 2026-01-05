import { useState, useEffect, useCallback } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import { useSettings, SettingUpdate } from './hooks/useSettings'
import GeneralSettingsTab from './components/GeneralSettingsTab'
import SeoSettingsTab from './components/SeoSettingsTab'
import SocialSettingsTab from './components/SocialSettingsTab'
import BrandingSettingsTab from './components/BrandingSettingsTab'
import SystemSettingsTab, { SYSTEM_SETTINGS_DEFAULTS } from './components/SystemSettingsTab'

// Validation helpers
const isValidEmail = (email: string): boolean => {
  if (!email) return true // Empty is allowed
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidUrl = (url: string): boolean => {
  if (!url) return true // Empty is allowed
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Google Maps embed URL validation prefix (STRICT)
const GOOGLE_MAPS_EMBED_PREFIX = 'https://www.google.com/maps/embed?pb='

interface FormValues {
  // General
  site_name: string
  site_tagline: string
  contact_email: string
  contact_phone: string
  contact_address: string
  google_maps_embed_url: string
  // SEO
  default_meta_title: string
  default_meta_description: string
  default_og_image_media_id: string
  // Social
  facebook_url: string
  instagram_url: string
  linkedin_url: string
  youtube_url: string
  // Branding
  logo_media_id: string
  favicon_media_id: string
  primary_color: string
  secondary_color: string
  accent_color: string
  // System (all values are strings: "true"/"false" for booleans)
  maintenance_mode: string
  coming_soon_enabled: string
  coming_soon_message: string
  quotes_enabled: string
  contact_form_enabled: string
}

const INITIAL_VALUES: FormValues = {
  site_name: '',
  site_tagline: '',
  contact_email: '',
  contact_phone: '',
  contact_address: '',
  google_maps_embed_url: '',
  default_meta_title: '',
  default_meta_description: '',
  default_og_image_media_id: '',
  facebook_url: '',
  instagram_url: '',
  linkedin_url: '',
  youtube_url: '',
  logo_media_id: '',
  favicon_media_id: '',
  primary_color: '#D90A2C',
  secondary_color: '#17161A',
  accent_color: '#F7941D',
  // System - guaranteed string defaults to prevent undefined values
  maintenance_mode: SYSTEM_SETTINGS_DEFAULTS.maintenance_mode,
  coming_soon_enabled: SYSTEM_SETTINGS_DEFAULTS.coming_soon_enabled,
  coming_soon_message: SYSTEM_SETTINGS_DEFAULTS.coming_soon_message,
  quotes_enabled: SYSTEM_SETTINGS_DEFAULTS.quotes_enabled,
  contact_form_enabled: SYSTEM_SETTINGS_DEFAULTS.contact_form_enabled,
}

const SettingsPage = () => {
  const { settings, isLoading, isSaving, error, updateSettings, getSettingValue } = useSettings()
  const [activeTab, setActiveTab] = useState('general')
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_VALUES)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [hasChanges, setHasChanges] = useState(false)

  // Populate form values when settings load
  useEffect(() => {
    if (settings.length > 0) {
      const newValues: FormValues = {
        site_name: getSettingValue('site_name'),
        site_tagline: getSettingValue('site_tagline'),
        contact_email: getSettingValue('contact_email'),
        contact_phone: getSettingValue('contact_phone'),
        contact_address: getSettingValue('contact_address'),
        google_maps_embed_url: getSettingValue('google_maps_embed_url'),
        default_meta_title: getSettingValue('default_meta_title'),
        default_meta_description: getSettingValue('default_meta_description'),
        default_og_image_media_id: getSettingValue('default_og_image_media_id'),
        facebook_url: getSettingValue('facebook_url'),
        instagram_url: getSettingValue('instagram_url'),
        linkedin_url: getSettingValue('linkedin_url'),
        youtube_url: getSettingValue('youtube_url'),
        logo_media_id: getSettingValue('logo_media_id'),
        favicon_media_id: getSettingValue('favicon_media_id'),
        primary_color: getSettingValue('primary_color') || '#D90A2C',
        secondary_color: getSettingValue('secondary_color') || '#17161A',
        accent_color: getSettingValue('accent_color') || '#F7941D',
        // System settings - use defaults if not present to guarantee string values
        maintenance_mode: getSettingValue('maintenance_mode') || SYSTEM_SETTINGS_DEFAULTS.maintenance_mode,
        coming_soon_enabled: getSettingValue('coming_soon_enabled') || SYSTEM_SETTINGS_DEFAULTS.coming_soon_enabled,
        coming_soon_message: getSettingValue('coming_soon_message'),
        quotes_enabled: getSettingValue('quotes_enabled') || SYSTEM_SETTINGS_DEFAULTS.quotes_enabled,
        contact_form_enabled: getSettingValue('contact_form_enabled') || SYSTEM_SETTINGS_DEFAULTS.contact_form_enabled,
      }
      setFormValues(newValues)
      setHasChanges(false)
    }
  }, [settings, getSettingValue])

  const handleChange = useCallback((key: string, value: string) => {
    setFormValues(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
    
    // Clear error for this field
    setFormErrors(prev => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {}

    // Validate email
    if (!isValidEmail(formValues.contact_email)) {
      errors.contact_email = 'Please enter a valid email address'
    }

    // Validate URLs
    const urlFields = ['facebook_url', 'instagram_url', 'linkedin_url', 'youtube_url'] as const
    for (const field of urlFields) {
      if (!isValidUrl(formValues[field])) {
        errors[field] = 'Please enter a valid URL'
      }
    }

    // Google Maps embed URL validation (STRICT)
    if (formValues.google_maps_embed_url && !formValues.google_maps_embed_url.startsWith(GOOGLE_MAPS_EMBED_PREFIX)) {
      errors.google_maps_embed_url = 'URL must start with https://www.google.com/maps/embed?pb='
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formValues])

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    const updates: SettingUpdate[] = Object.entries(formValues).map(([key, value]) => ({
      key,
      value,
    }))

    const success = await updateSettings(updates)
    if (success) {
      setHasChanges(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <PageTitle subName="System" title="Settings" />
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading settings...</span>
          </Spinner>
        </div>
        <Footer />
      </>
    )
  }

  if (error && settings.length === 0) {
    return (
      <>
        <PageTitle subName="System" title="Settings" />
        <Alert variant="danger">
          Failed to load settings: {error}
        </Alert>
        <Footer />
      </>
    )
  }

  return (
    <>
      <PageTitle subName="System" title="Settings" />

      <Row>
        <Col xs={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Site Settings</h5>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
              >
                {isSaving ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </Card.Header>
            <Card.Body>
              <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'general')}>
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="general">General</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="seo">SEO</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="social">Social</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="branding">Branding</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="system">System</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="general">
                        <GeneralSettingsTab
                          values={{
                            site_name: formValues.site_name,
                            site_tagline: formValues.site_tagline,
                            contact_email: formValues.contact_email,
                            contact_phone: formValues.contact_phone,
                            contact_address: formValues.contact_address,
                            google_maps_embed_url: formValues.google_maps_embed_url,
                          }}
                          onChange={handleChange}
                          errors={formErrors}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="seo">
                        <SeoSettingsTab
                          values={{
                            default_meta_title: formValues.default_meta_title,
                            default_meta_description: formValues.default_meta_description,
                            default_og_image_media_id: formValues.default_og_image_media_id,
                          }}
                          onChange={handleChange}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="social">
                        <SocialSettingsTab
                          values={{
                            facebook_url: formValues.facebook_url,
                            instagram_url: formValues.instagram_url,
                            linkedin_url: formValues.linkedin_url,
                            youtube_url: formValues.youtube_url,
                          }}
                          onChange={handleChange}
                          errors={formErrors}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="branding">
                        <BrandingSettingsTab
                          values={{
                            logo_media_id: formValues.logo_media_id,
                            favicon_media_id: formValues.favicon_media_id,
                            primary_color: formValues.primary_color,
                            secondary_color: formValues.secondary_color,
                            accent_color: formValues.accent_color,
                          }}
                          onChange={handleChange}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="system">
                        <SystemSettingsTab
                          values={{
                            maintenance_mode: formValues.maintenance_mode,
                            coming_soon_enabled: formValues.coming_soon_enabled,
                            coming_soon_message: formValues.coming_soon_message,
                            quotes_enabled: formValues.quotes_enabled,
                            contact_form_enabled: formValues.contact_form_enabled,
                          }}
                          onChange={handleChange}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Footer />
    </>
  )
}

export default SettingsPage
