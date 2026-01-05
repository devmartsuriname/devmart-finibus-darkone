import { useState, useEffect } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import { User, UserRole } from '../hooks/useUsers'

interface UserRoleModalProps {
  show: boolean
  onClose: () => void
  onUpdate: (userId: string, role: UserRole) => Promise<boolean>
  user: User | null
}

const ROLE_OPTIONS: { value: UserRole; label: string; description: string }[] = [
  { value: 'admin', label: 'Admin', description: 'Full access to all modules' },
  { value: 'moderator', label: 'Editor', description: 'Content modules + read-only CRM' },
  { value: 'user', label: 'Viewer', description: 'Read-only access' },
]

const UserRoleModal = ({ show, onClose, onUpdate, user }: UserRoleModalProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('user')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role)
    }
  }, [user])

  const handleSubmit = async () => {
    if (!user) return

    setIsUpdating(true)
    const success = await onUpdate(user.user_id, selectedRole)
    setIsUpdating(false)

    if (success) {
      onClose()
    }
  }

  const handleClose = () => {
    if (!isUpdating) {
      onClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title as="h5">Edit User Role</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <p className="mb-1">
            <strong>User:</strong> {user?.display_name}
          </p>
          <p className="text-muted mb-0">
            <small>{user?.email}</small>
          </p>
        </div>

        <Form.Group>
          <Form.Label>Select Role</Form.Label>
          {ROLE_OPTIONS.map((option) => (
            <Form.Check
              key={option.value}
              type="radio"
              id={`role-${option.value}`}
              name="userRole"
              label={
                <span>
                  <strong>{option.label}</strong>
                  <br />
                  <small className="text-muted">{option.description}</small>
                </span>
              }
              checked={selectedRole === option.value}
              onChange={() => setSelectedRole(option.value)}
              className="mb-2"
            />
          ))}
        </Form.Group>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={handleClose} disabled={isUpdating}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={isUpdating || selectedRole === user?.role}
        >
          {isUpdating ? (
            <>
              <Spinner size="sm" className="me-1" />
              Updating...
            </>
          ) : (
            'Update Role'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserRoleModal
