import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import { supabase } from '@/integrations/supabase/client'

interface MediaItem {
  id: string
  filename: string
  public_url: string
  file_type: string
}

interface MediaPickerProps {
  value: string // Media UUID
  onChange: (mediaId: string) => void
  label: string
  helpText?: string
}

const MediaPicker = ({ value, onChange, label, helpText }: MediaPickerProps) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('media')
          .select('id, filename, public_url, file_type')
          .in('file_type', ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/x-icon'])
          .order('filename')

        if (error) throw error
        setMediaItems(data || [])
      } catch (err) {
        console.error('Failed to fetch media:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMedia()
  }, [])

  // Find selected media when value changes
  useEffect(() => {
    if (value && mediaItems.length > 0) {
      const found = mediaItems.find(m => m.id === value)
      setSelectedMedia(found || null)
    } else {
      setSelectedMedia(null)
    }
  }, [value, mediaItems])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      
      {/* Preview */}
      {selectedMedia && (
        <div className="mb-2 p-2 border rounded bg-light d-flex align-items-center gap-2">
          <Image
            src={selectedMedia.public_url}
            alt={selectedMedia.filename}
            style={{ maxHeight: '48px', maxWidth: '80px', objectFit: 'contain' }}
            rounded
          />
          <span className="text-muted small">{selectedMedia.filename}</span>
        </div>
      )}
      
      <div className="d-flex gap-2">
        <Form.Select
          value={value}
          onChange={handleChange}
          disabled={isLoading}
          className="flex-grow-1"
        >
          <option value="">-- Select from Media Library --</option>
          {mediaItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.filename}
            </option>
          ))}
        </Form.Select>
        
        {value && (
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleClear}
            title="Clear selection"
          >
            Clear
          </Button>
        )}
        
        {isLoading && (
          <Spinner animation="border" size="sm" className="align-self-center" />
        )}
      </div>
      
      {helpText && (
        <Form.Text className="text-muted">{helpText}</Form.Text>
      )}
    </Form.Group>
  )
}

export default MediaPicker
