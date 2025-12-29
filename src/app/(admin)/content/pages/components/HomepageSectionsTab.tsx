import { useState } from 'react'
import { Table, Form, Button, Spinner, Badge } from 'react-bootstrap'
import { 
  SECTION_KEYS, 
  SECTION_LABELS, 
  SECTION_TYPES,
  type SectionKey,
  type HomepageData,
  type StatItem
} from '../hooks/useHomepageBlocks'
import HomepageSectionEditModal from './HomepageSectionEditModal'

interface HomepageSectionsTabProps {
  data: HomepageData | null
  loading: boolean
  onToggleEnabled: (sectionKey: SectionKey, enabled: boolean) => Promise<boolean>
  onUpdateSection: (sectionKey: SectionKey, sectionData: Record<string, unknown>) => Promise<boolean>
  getSectionEnabled: (sectionKey: SectionKey) => boolean
  onSaveStats: (stats: StatItem[]) => Promise<boolean>
}

const HomepageSectionsTab = ({
  data,
  loading,
  onToggleEnabled,
  onUpdateSection,
  getSectionEnabled,
  onSaveStats
}: HomepageSectionsTabProps) => {
  const [editingSection, setEditingSection] = useState<SectionKey | null>(null)
  const [togglingSection, setTogglingSection] = useState<SectionKey | null>(null)

  const handleToggle = async (sectionKey: SectionKey, enabled: boolean) => {
    setTogglingSection(sectionKey)
    await onToggleEnabled(sectionKey, enabled)
    setTogglingSection(null)
  }

  const handleSaveSection = async (sectionKey: SectionKey, sectionData: Record<string, unknown>) => {
    const success = await onUpdateSection(sectionKey, sectionData)
    if (success) {
      setEditingSection(null)
    }
    return success
  }

  return (
    <>
      <div className="mb-3">
        <p className="text-muted small mb-0">
          Manage homepage sections. Order is fixed per Finibus template. 
          Toggle visibility or edit content for each section.
        </p>
      </div>

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
          {SECTION_KEYS.map((sectionKey, index) => {
            const isEnabled = getSectionEnabled(sectionKey)
            const isToggling = togglingSection === sectionKey
            const sectionType = SECTION_TYPES[sectionKey]

            return (
              <tr key={sectionKey}>
                <td className="align-middle">
                  {isToggling ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <Form.Check
                      type="switch"
                      id={`section-toggle-${sectionKey}`}
                      checked={isEnabled}
                      onChange={(e) => handleToggle(sectionKey, e.target.checked)}
                      disabled={loading}
                    />
                  )}
                </td>
                <td className="align-middle">
                  <span className="fw-medium">{index + 1}. {SECTION_LABELS[sectionKey]}</span>
                </td>
                <td className="align-middle">
                  <Badge 
                    bg={sectionType === 'ui_block' ? 'primary' : 'secondary'}
                    className="text-uppercase small"
                  >
                    {sectionType === 'ui_block' ? 'UI Block' : 'Dynamic'}
                  </Badge>
                </td>
                <td className="align-middle text-end">
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 text-primary"
                    onClick={() => setEditingSection(sectionKey)}
                    disabled={loading}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      {/* Section Edit Modal */}
      {editingSection && (
        <HomepageSectionEditModal
          show={!!editingSection}
          sectionKey={editingSection}
          sectionLabel={SECTION_LABELS[editingSection]}
          sectionType={SECTION_TYPES[editingSection]}
          sectionData={data?.[editingSection] || {}}
          allData={data}
          loading={loading}
          onClose={() => setEditingSection(null)}
          onSave={(sectionData) => handleSaveSection(editingSection, sectionData)}
          onSaveStats={onSaveStats}
        />
      )}
    </>
  )
}

export default HomepageSectionsTab
