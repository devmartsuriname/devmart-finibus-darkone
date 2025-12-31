/**
 * ContentBlocksEditor — Structured Content Editing UI
 * 
 * Allows authoring blog content as structured blocks (JSONB).
 * On save, blocks are compiled to HTML for public rendering.
 * 
 * Uses existing react-bootstrap components only (no external editors).
 */

import { useCallback } from 'react'
import { Form, Button, Card, ButtonGroup, Badge } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import { 
  ContentBlock, 
  generateBlockId, 
  createEmptyBlock 
} from '../utils/compileContent'

interface ContentBlocksEditorProps {
  blocks: ContentBlock[]
  onChange: (blocks: ContentBlock[]) => void
  disabled?: boolean
}

const BLOCK_TYPE_OPTIONS = [
  { value: 'paragraph', label: 'Paragraph', icon: 'solar:text-bold' },
  { value: 'heading', label: 'Heading', icon: 'solar:text-field-bold' },
  { value: 'list', label: 'List', icon: 'solar:list-bold' },
  { value: 'quote', label: 'Quote', icon: 'solar:quote-bold' },
  { value: 'image', label: 'Image', icon: 'solar:gallery-bold' },
] as const

const ContentBlocksEditor = ({ blocks, onChange, disabled }: ContentBlocksEditorProps) => {
  
  const addBlock = useCallback((type: ContentBlock['type']) => {
    const newBlock = createEmptyBlock(type)
    onChange([...blocks, newBlock])
  }, [blocks, onChange])

  const updateBlock = useCallback((id: string, updates: Partial<ContentBlock>) => {
    onChange(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ))
  }, [blocks, onChange])

  const deleteBlock = useCallback((id: string) => {
    onChange(blocks.filter(block => block.id !== id))
  }, [blocks, onChange])

  const moveBlock = useCallback((id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(block => block.id === id)
    if (index === -1) return
    
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= blocks.length) return
    
    const newBlocks = [...blocks]
    const [removed] = newBlocks.splice(index, 1)
    newBlocks.splice(newIndex, 0, removed)
    onChange(newBlocks)
  }, [blocks, onChange])

  const updateListItem = useCallback((blockId: string, itemIndex: number, value: string) => {
    const block = blocks.find(b => b.id === blockId)
    if (!block || block.type !== 'list' || !block.items) return
    
    const newItems = [...block.items]
    newItems[itemIndex] = value
    updateBlock(blockId, { items: newItems })
  }, [blocks, updateBlock])

  const addListItem = useCallback((blockId: string) => {
    const block = blocks.find(b => b.id === blockId)
    if (!block || block.type !== 'list') return
    
    const newItems = [...(block.items || []), '']
    updateBlock(blockId, { items: newItems })
  }, [blocks, updateBlock])

  const removeListItem = useCallback((blockId: string, itemIndex: number) => {
    const block = blocks.find(b => b.id === blockId)
    if (!block || block.type !== 'list' || !block.items) return
    
    const newItems = block.items.filter((_, i) => i !== itemIndex)
    updateBlock(blockId, { items: newItems.length > 0 ? newItems : [''] })
  }, [blocks, updateBlock])

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    const typeOption = BLOCK_TYPE_OPTIONS.find(opt => opt.value === block.type)
    
    return (
      <Card key={block.id} className="mb-3 border">
        <Card.Header className="d-flex justify-content-between align-items-center py-2 bg-light">
          <div className="d-flex align-items-center gap-2">
            <Badge bg="secondary" className="d-flex align-items-center gap-1">
              <Icon icon={typeOption?.icon || 'solar:document-bold'} width={14} />
              {typeOption?.label || block.type}
            </Badge>
            <span className="text-muted small">#{index + 1}</span>
          </div>
          <ButtonGroup size="sm">
            <Button 
              variant="outline-secondary" 
              onClick={() => moveBlock(block.id, 'up')}
              disabled={disabled || index === 0}
              title="Move up"
            >
              <Icon icon="solar:arrow-up-linear" width={16} />
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={() => moveBlock(block.id, 'down')}
              disabled={disabled || index === blocks.length - 1}
              title="Move down"
            >
              <Icon icon="solar:arrow-down-linear" width={16} />
            </Button>
            <Button 
              variant="outline-danger" 
              onClick={() => deleteBlock(block.id)}
              disabled={disabled}
              title="Delete block"
            >
              <Icon icon="solar:trash-bin-trash-linear" width={16} />
            </Button>
          </ButtonGroup>
        </Card.Header>
        <Card.Body className="py-3">
          {block.type === 'heading' && (
            <>
              <Form.Group className="mb-2">
                <Form.Label className="small text-muted mb-1">Level</Form.Label>
                <Form.Select
                  size="sm"
                  value={block.level || 2}
                  onChange={(e) => updateBlock(block.id, { level: parseInt(e.target.value) as 2 | 3 | 4 })}
                  disabled={disabled}
                  style={{ width: '120px' }}
                >
                  <option value={2}>H2</option>
                  <option value={3}>H3</option>
                  <option value={4}>H4</option>
                </Form.Select>
              </Form.Group>
              <Form.Control
                type="text"
                placeholder="Heading text..."
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                disabled={disabled}
              />
            </>
          )}
          
          {block.type === 'paragraph' && (
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Paragraph text..."
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              disabled={disabled}
            />
          )}
          
          {block.type === 'quote' && (
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Quote text..."
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              disabled={disabled}
              className="fst-italic"
            />
          )}
          
          {block.type === 'image' && (
            <Form.Control
              type="text"
              placeholder="Image URL (e.g., https://example.com/image.jpg)"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              disabled={disabled}
            />
          )}
          
          {block.type === 'list' && (
            <div>
              {(block.items || []).map((item, itemIndex) => (
                <div key={itemIndex} className="d-flex gap-2 mb-2">
                  <span className="text-muted pt-2">•</span>
                  <Form.Control
                    type="text"
                    placeholder={`List item ${itemIndex + 1}...`}
                    value={item}
                    onChange={(e) => updateListItem(block.id, itemIndex, e.target.value)}
                    disabled={disabled}
                  />
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeListItem(block.id, itemIndex)}
                    disabled={disabled || (block.items?.length || 0) <= 1}
                    title="Remove item"
                  >
                    <Icon icon="solar:minus-circle-linear" width={16} />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => addListItem(block.id)}
                disabled={disabled}
                className="mt-1"
              >
                <Icon icon="solar:add-circle-linear" width={16} className="me-1" />
                Add Item
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    )
  }

  return (
    <div>
      {/* Block List */}
      {blocks.length === 0 ? (
        <Card className="mb-3 border-dashed">
          <Card.Body className="text-center text-muted py-4">
            <Icon icon="solar:document-add-bold" width={32} className="mb-2 opacity-50" />
            <p className="mb-0">No content blocks yet. Add blocks below to build your post.</p>
          </Card.Body>
        </Card>
      ) : (
        blocks.map((block, index) => renderBlockEditor(block, index))
      )}
      
      {/* Add Block Buttons */}
      <div className="d-flex flex-wrap gap-2 mt-3">
        <span className="text-muted small align-self-center me-2">Add block:</span>
        {BLOCK_TYPE_OPTIONS.map(option => (
          <Button
            key={option.value}
            variant="outline-primary"
            size="sm"
            onClick={() => addBlock(option.value)}
            disabled={disabled}
            className="d-flex align-items-center gap-1"
          >
            <Icon icon={option.icon} width={16} />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ContentBlocksEditor
