import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'
import type { Tables } from '@/integrations/supabase/types'

type MediaItem = Tables<'media'>

interface DeleteMediaModalProps {
  show: boolean
  onClose: () => void
  onDelete: (mediaItem: MediaItem) => Promise<boolean>
  mediaItem: MediaItem | null
}

const DeleteMediaModal = ({ show, onClose, onDelete, mediaItem }: DeleteMediaModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!mediaItem) return
    
    setIsDeleting(true)
    const success = await onDelete(mediaItem)
    setIsDeleting(false)
    
    if (success) {
      onClose()
    }
  }

  const handleClose = () => {
    if (!isDeleting) {
      onClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">Confirm Delete</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <p className="mb-0">
          Are you sure you want to delete <strong>"{mediaItem?.filename}"</strong>?
        </p>
        <p className="text-muted mt-2 mb-0">
          This action cannot be undone. The file will be permanently removed from storage.
        </p>
      </Modal.Body>
      
      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button 
          variant="danger" 
          onClick={handleDelete} 
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <Spinner size="sm" className="me-1" />
              Deleting...
            </>
          ) : (
            'Delete'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteMediaModal
