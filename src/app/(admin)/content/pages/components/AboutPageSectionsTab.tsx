import { useState } from 'react'
import { Table, Form, Button, Spinner, Badge, Alert } from 'react-bootstrap'
import { 
  ABOUT_SECTION_KEYS, 
  ABOUT_SECTION_LABELS, 
  ABOUT_SECTION_TYPES,
  type AboutSectionKey,
  type AboutPageData 
} from '../hooks/useAboutPageBlocks'
import AboutPageSectionEditModal from './AboutPageSectionEditModal'

interface AboutPageSectionsTabProps {
  data: AboutPageData | null
  loading: boolean
  onToggleEnabled: (sectionKey: 'inside_story' | 'latest_news', enabled: boolean) => Promise<boolean>
  onUpdateSection: (sectionKey: 'inside_story' | 'latest_news', sectionData: Record<string, unknown>) => Promise<boolean>
  getSectionEnabled: (sectionKey: 'inside_story' | 'latest_news') => boolean
}

const AboutPageSectionsTab = ({
  data,
  loading,
  onToggleEnabled,
  onUpdateSection,
  getSectionEnabled
}: AboutPageSectionsTabProps) => {
  const [editingSection, setEditingSection] = useState<'inside_story' | 'latest_news' | null>(null)
  const [togglingSection, setTogglingSection] = useState<AboutSectionKey | null>(null)

  const handleToggle = async (sectionKey: 'inside_story' | 'latest_news', enabled: boolean) => {
    setTogglingSection(sectionKey)
    await onToggleEnabled(sectionKey, enabled)
    setTogglingSection(null)
  }

  const handleSaveSection = async (sectionKey: 'inside_story' | 'latest_news', sectionData: Record<string, unknown>) => {
    const success = await onUpdateSection(sectionKey, sectionData)
    if (success) {
      setEditingSection(null)
    }
    return success
  }

  const isEditableSection = (sectionKey: AboutSectionKey): sectionKey is 'inside_story' | 'latest_news' => {
    return ABOUT_SECTION_TYPES[sectionKey] === 'page_block'
  }

  const getBadgeVariant = (type: 'page_block' | 'shared_block' | 'dynamic_module') => {
    switch (type) {
      case 'page_block': return 'primary'
      case 'shared_block': return 'warning'
      case 'dynamic_module': return 'secondary'
    }
  }

  const getBadgeLabel = (type: 'page_block' | 'shared_block' | 'dynamic_module') => {
    switch (type) {
      case 'page_block': return 'Page Block'
      case 'shared_block': return 'Shared'
      case 'dynamic_module': return 'Dynamic'
    }
  }

  return (
    <>
      <div className="mb-3">
        <p className="text-muted small mb-0">
          Manage About page sections. Order is fixed per Finibus template. 
          Shared blocks are managed in Global Blocks settings.
        </p>
      </div>

      <Alert variant="info" className="mb-3">
        <strong>Page Blocks</strong> are editable here. <strong>Shared Blocks</strong> are managed via{' '}
        <a href="/content/global-blocks" className="alert-link">Content → Global Blocks</a>.{' '}
        <strong>Dynamic</strong> modules pull from their respective admin sections.
      </Alert>

      <Table hover className="mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ width: '50px' }}>Active</th>
            <th>Section</th>
            <th style={{ width: '120px' }}>Type</th>
            <th style={{ width: '80px' }} className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ABOUT_SECTION_KEYS.map((sectionKey, index) => {
            const sectionType = ABOUT_SECTION_TYPES[sectionKey]
            const isEditable = isEditableSection(sectionKey)
            const isEnabled = isEditable ? getSectionEnabled(sectionKey) : true
            const isToggling = togglingSection === sectionKey

            return (
              <tr key={sectionKey}>
                <td className="align-middle">
                  {isEditable ? (
                    isToggling ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <Form.Check
                        type="switch"
                        id={`section-toggle-${sectionKey}`}
                        checked={isEnabled}
                        onChange={(e) => handleToggle(sectionKey, e.target.checked)}
                        disabled={loading}
                      />
                    )
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="align-middle">
                  <span className="fw-medium">{index + 1}. {ABOUT_SECTION_LABELS[sectionKey]}</span>
                </td>
                <td className="align-middle">
                  <Badge 
                    bg={getBadgeVariant(sectionType)}
                    className="text-uppercase small"
                  >
                    {getBadgeLabel(sectionType)}
                  </Badge>
                </td>
                <td className="align-middle text-end">
                  {isEditable ? (
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-primary"
                      onClick={() => setEditingSection(sectionKey)}
                      disabled={loading}
                    >
                      Edit
                    </Button>
                  ) : sectionType === 'shared_block' ? (
                    <a 
                      href="/content/global-blocks" 
                      className="btn btn-link btn-sm p-0 text-muted"
                    >
                      Manage
                    </a>
                  ) : sectionType === 'dynamic_module' ? (
                    <span className="text-muted small">
                      {sectionKey === 'testimonials' ? (
                        <a href="/content/testimonials" className="text-muted">View</a>
                      ) : (
                        'Dynamic'
                      )}
                    </span>
                  ) : null}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      {/* Section Edit Modal */}
      {editingSection && (
        <AboutPageSectionEditModal
          show={!!editingSection}
          sectionKey={editingSection}
          sectionLabel={ABOUT_SECTION_LABELS[editingSection]}
          sectionData={data?.[editingSection] || {}}
          loading={loading}
          onClose={() => setEditingSection(null)}
          onSave={(sectionData) => handleSaveSection(editingSection, sectionData)}
        />
      )}
    </>
  )
}

export default AboutPageSectionsTab
