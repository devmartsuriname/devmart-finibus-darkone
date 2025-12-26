import { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Spinner, Badge, Table, Form } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import { 
  useGlobalBlocks, 
  type GlobalBlockKey,
  GLOBAL_BLOCK_LABELS,
  GLOBAL_BLOCK_DESCRIPTIONS
} from './hooks/useGlobalBlocks'
import GlobalBlockEditModal from './components/GlobalBlockEditModal'

const GlobalBlocksPage = () => {
  const { 
    blocks, 
    loading, 
    fetchGlobalBlocks, 
    updateBlockData,
    toggleBlockEnabled,
    getBlockEnabled,
    getBlockByKey
  } = useGlobalBlocks()
  
  const [editingBlock, setEditingBlock] = useState<GlobalBlockKey | null>(null)
  const [togglingBlock, setTogglingBlock] = useState<GlobalBlockKey | null>(null)

  useEffect(() => {
    fetchGlobalBlocks()
  }, [fetchGlobalBlocks])

  const handleToggle = async (blockKey: GlobalBlockKey, enabled: boolean) => {
    setTogglingBlock(blockKey)
    await toggleBlockEnabled(blockKey, enabled)
    setTogglingBlock(null)
  }

  const handleSaveBlock = async (blockKey: GlobalBlockKey, blockData: Record<string, unknown>) => {
    const success = await updateBlockData(blockKey, blockData)
    if (success) {
      setEditingBlock(null)
    }
    return success
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      <PageTitle subName="Content" title="Global Blocks" />

      <Row>
        <Col xs={12}>
          <Card>
            <Card.Header>
              <div>
                <h4 className="header-title mb-0">Shared UI Blocks</h4>
                <p className="text-muted mb-0 mt-1 small">
                  Manage UI blocks that are shared across multiple pages. Changes here affect all pages using these blocks.
                </p>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {loading && blocks.length === 0 ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="text-muted mt-2 mb-0">Loading global blocks...</p>
                </div>
              ) : blocks.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">No global blocks found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="mb-0" hover>
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>Active</th>
                        <th>Block</th>
                        <th>Description</th>
                        <th style={{ width: '160px' }}>Last Updated</th>
                        <th style={{ width: '80px' }} className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blocks.map((block) => {
                        const blockKey = block.block_key as GlobalBlockKey
                        const isEnabled = getBlockEnabled(blockKey)
                        const isToggling = togglingBlock === blockKey

                        return (
                          <tr key={block.id}>
                            <td className="align-middle">
                              {isToggling ? (
                                <Spinner animation="border" size="sm" />
                              ) : (
                                <Form.Check
                                  type="switch"
                                  id={`block-toggle-${blockKey}`}
                                  checked={isEnabled}
                                  onChange={(e) => handleToggle(blockKey, e.target.checked)}
                                  disabled={loading}
                                />
                              )}
                            </td>
                            <td className="align-middle">
                              <span className="fw-medium">
                                {GLOBAL_BLOCK_LABELS[blockKey] || blockKey}
                              </span>
                              <Badge bg="warning" className="ms-2 small">Shared</Badge>
                            </td>
                            <td className="align-middle text-muted small">
                              {GLOBAL_BLOCK_DESCRIPTIONS[blockKey] || '—'}
                            </td>
                            <td className="align-middle text-muted small">
                              {formatDate(block.updated_at)}
                            </td>
                            <td className="align-middle text-end">
                              <Button
                                variant="link"
                                size="sm"
                                className="text-primary p-0"
                                onClick={() => setEditingBlock(blockKey)}
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
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Usage</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small mb-2">
                Global blocks are used on the following pages:
              </p>
              <ul className="text-muted small mb-0">
                <li><strong>CTA Strip:</strong> Homepage, About page</li>
                <li><strong>Why Choose Us:</strong> Homepage, About page</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      {editingBlock && (
        <GlobalBlockEditModal
          show={!!editingBlock}
          blockKey={editingBlock}
          blockLabel={GLOBAL_BLOCK_LABELS[editingBlock]}
          blockData={getBlockByKey(editingBlock)?.data || {}}
          loading={loading}
          onClose={() => setEditingBlock(null)}
          onSave={(blockData) => handleSaveBlock(editingBlock, blockData)}
        />
      )}

      <Footer />
    </>
  )
}

export default GlobalBlocksPage
