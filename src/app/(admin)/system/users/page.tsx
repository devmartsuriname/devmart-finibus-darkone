import { useState } from 'react'
import { Card, CardHeader, CardBody, Table, Button, Form, Spinner, Row, Col, Badge, Image } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useUsers, User, UserRole } from './hooks/useUsers'
import UserRoleModal from './components/UserRoleModal'
import DeleteUserModal from './components/DeleteUserModal'

const getRoleBadge = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return <Badge bg="danger">Admin</Badge>
    case 'moderator':
      return <Badge bg="info">Editor</Badge>
    case 'user':
      return <Badge bg="secondary">Viewer</Badge>
    default:
      return <Badge bg="secondary">{role}</Badge>
  }
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const UsersPage = () => {
  const { users, isLoading, error, updateUserRole, deleteUser } = useUsers()
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    user.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setShowRoleModal(true)
  }

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  return (
    <>
      <PageTitle subName="System" title="Users" />

      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Users</h5>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="search"
                  placeholder="Search users..."
                  style={{ width: '200px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Note: User creation is Phase 13E.3 scope */}
              </div>
            </CardHeader>

            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="text-muted mt-2 mb-0">Loading users...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">
                    {searchTerm ? 'No users match your search' : 'No users found'}
                  </h5>
                  <p className="text-muted mb-0">
                    {searchTerm
                      ? 'Try a different search term'
                      : 'Users will appear here when they register'}
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th style={{ width: '100px' }}>Role</th>
                        <th>Created</th>
                        <th>Last Login</th>
                        <th style={{ width: '100px' }} className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.user_id}>
                          <td>
                            {user.avatar_url ? (
                              <Image
                                src={user.avatar_url}
                                alt={user.display_name}
                                roundedCircle
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              />
                            ) : (
                              <div
                                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: '40px', height: '40px' }}
                              >
                                <IconifyIcon icon="bx:user" className="text-muted" />
                              </div>
                            )}
                          </td>
                          <td>
                            <span className="fw-medium">{user.display_name}</span>
                          </td>
                          <td>{user.email}</td>
                          <td>{getRoleBadge(user.role)}</td>
                          <td>{formatDate(user.created_at)}</td>
                          <td>{formatDate(user.last_sign_in_at)}</td>
                          <td className="text-end">
                            <Button
                              variant="soft-primary"
                              size="sm"
                              className="me-1"
                              onClick={() => handleEditClick(user)}
                              title="Edit Role"
                            >
                              <IconifyIcon icon="bx:edit" />
                            </Button>
                            <Button
                              variant="soft-danger"
                              size="sm"
                              onClick={() => handleDeleteClick(user)}
                              title="Delete"
                            >
                              <IconifyIcon icon="bx:trash" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Edit Role Modal */}
      <UserRoleModal
        show={showRoleModal}
        onClose={() => {
          setShowRoleModal(false)
          setSelectedUser(null)
        }}
        onUpdate={updateUserRole}
        user={selectedUser}
      />

      {/* Delete Modal */}
      <DeleteUserModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedUser(null)
        }}
        onDelete={deleteUser}
        user={selectedUser}
      />

      <Footer />
    </>
  )
}

export default UsersPage
