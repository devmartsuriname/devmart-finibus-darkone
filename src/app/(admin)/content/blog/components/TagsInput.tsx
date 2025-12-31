/**
 * TagsInput — Simple Array Input for Tags
 * 
 * Allows entering tags as comma-separated values or individual chips.
 * Stores as TEXT[] array in blog_posts.tags
 */

import { useState, useCallback } from 'react'
import { Form, Badge, Button } from 'react-bootstrap'
import { Icon } from '@iconify/react'

interface TagsInputProps {
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
}

const TagsInput = ({ value, onChange, disabled }: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('')

  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim().toLowerCase()
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed])
    }
  }, [value, onChange])

  const removeTag = useCallback((tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }, [value, onChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    
    // If user types comma or presses comma, add the tag
    if (newValue.includes(',')) {
      const parts = newValue.split(',')
      parts.forEach((part, index) => {
        // Add all parts except the last (which becomes the new input)
        if (index < parts.length - 1) {
          addTag(part)
        }
      })
      setInputValue(parts[parts.length - 1])
    } else {
      setInputValue(newValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputValue.trim()) {
        addTag(inputValue)
        setInputValue('')
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Remove last tag if backspace on empty input
      removeTag(value[value.length - 1])
    }
  }

  const handleBlur = () => {
    // Add remaining input as tag on blur
    if (inputValue.trim()) {
      addTag(inputValue)
      setInputValue('')
    }
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>Tags</Form.Label>
      
      {/* Tag chips */}
      <div className="d-flex flex-wrap gap-1 mb-2">
        {value.map(tag => (
          <Badge 
            key={tag} 
            bg="primary" 
            className="d-flex align-items-center gap-1 py-1 px-2"
          >
            {tag}
            <Button
              variant="link"
              className="p-0 text-white"
              onClick={() => removeTag(tag)}
              disabled={disabled}
              style={{ lineHeight: 1 }}
            >
              <Icon icon="solar:close-circle-bold" width={14} />
            </Button>
          </Badge>
        ))}
      </div>
      
      {/* Input */}
      <Form.Control
        type="text"
        placeholder="Add tags (press Enter or comma to add)..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        disabled={disabled}
      />
      <Form.Text className="text-muted">
        Separate tags with commas or press Enter to add each tag
      </Form.Text>
    </Form.Group>
  )
}

export default TagsInput
