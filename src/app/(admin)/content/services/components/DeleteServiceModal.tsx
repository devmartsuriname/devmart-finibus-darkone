import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'
import { Service } from '../hooks/useServices'

interface DeleteServiceModalProps {
  show: boolean
  onClose: () => void
  onDelete: (id: string) => Promise<boolean>
  service: Service | null
}

const DeleteServiceModal = ({ show, onClose, onDelete, service }: DeleteServiceModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!service) return

    setIsDeleting(true)
    const success = await onDelete(service.id)
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
          Are you sure you want to delete <strong>"{service?.title}"</strong>?
        </p>
        <p className="text-muted mt-2 mb-0">
          This action cannot be undone. The service and all related process steps and pricing plans will be permanently removed.
        </p>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
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

export default DeleteServiceModal