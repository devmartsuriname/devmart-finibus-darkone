/**
 * CategorySelector — Category Dropdown with Add-New Option
 * 
 * Provides controlled suggestions from predefined list
 * plus ability to add custom category values.
 */

import { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { Icon } from '@iconify/react'

interface CategorySelectorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

// Predefined category suggestions (can be extended)
const CATEGORY_SUGGESTIONS = [
  'Technology',
  'Business',
  'Design',
  'Government',
  'Enterprise',
  'Strategy',
  'Development',
  'Innovation',
]

const CategorySelector = ({ value, onChange, disabled }: CategorySelectorProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customValue, setCustomValue] = useState('')

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value
    if (selected === '__add_new__') {
      setShowCustomInput(true)
      setCustomValue('')
    } else {
      onChange(selected)
      setShowCustomInput(false)
    }
  }

  const handleAddCustom = () => {
    if (customValue.trim()) {
      onChange(customValue.trim())
      setShowCustomInput(false)
      setCustomValue('')
    }
  }

  const handleCancelCustom = () => {
    setShowCustomInput(false)
    setCustomValue('')
  }

  // Check if current value is not in suggestions (custom category)
  const isCustomCategory = value && !CATEGORY_SUGGESTIONS.includes(value)

  return (
    <Form.Group className="mb-3">
      <Form.Label>Category</Form.Label>
      
      {!showCustomInput ? (
        <>
          <Form.Select
            value={isCustomCategory ? '' : value}
            onChange={handleSelectChange}
            disabled={disabled}
          >
            <option value="">Select a category...</option>
            {CATEGORY_SUGGESTIONS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="__add_new__">+ Add new category...</option>
          </Form.Select>
          
          {isCustomCategory && (
            <div className="mt-2 d-flex align-items-center gap-2">
              <span className="badge bg-secondary">{value}</span>
              <Button
                variant="link"
                size="sm"
                className="p-0 text-muted"
                onClick={() => onChange('')}
                disabled={disabled}
              >
                <Icon icon="solar:close-circle-linear" width={16} /> Clear
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter new category name..."
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              disabled={disabled}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddCustom()
                } else if (e.key === 'Escape') {
                  handleCancelCustom()
                }
              }}
            />
            <Button 
              variant="primary" 
              onClick={handleAddCustom}
              disabled={disabled || !customValue.trim()}
            >
              Add
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={handleCancelCustom}
              disabled={disabled}
            >
              Cancel
            </Button>
          </InputGroup>
          <Form.Text className="text-muted">
            Press Enter to add or Escape to cancel
          </Form.Text>
        </>
      )}
    </Form.Group>
  )
}

export default CategorySelector
