import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'
import { User } from '../hooks/useUsers'

interface DeleteUserModalProps {
  show: boolean
  onClose: () => void
  onDelete: (userId: string) => Promise<boolean>
  user: User | null
}

const DeleteUserModal = ({ show, onClose, onDelete, user }: DeleteUserModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!user) return

    setIsDeleting(true)
    const success = await onDelete(user.user_id)
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
          Are you sure you want to delete the user <strong>"{user?.display_name}"</strong>?
        </p>
        <p className="text-muted mt-2 mb-0">
          This will remove the user's profile and role data. The authentication record will remain in Supabase.
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

export default DeleteUserModal
