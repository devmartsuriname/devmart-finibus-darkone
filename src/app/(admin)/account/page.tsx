import { useState } from 'react'
import { Card, CardHeader, CardBody, Form, Button, Spinner, Row, Col, Alert } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useProfile } from '@/hooks/useProfile'
import { useAuthContext } from '@/context/useAuthContext'
import { toast } from 'react-toastify'
import avatar1 from '@/assets/images/users/avatar-1.jpg'

const AccountPage = () => {
  const { user } = useAuthContext()
  const { profile, isLoading, error, updateProfile, refetch } = useProfile()
  
  const [displayName, setDisplayName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Initialize form values when profile loads
  if (profile && !initialized) {
    setDisplayName(profile.display_name || '')
    setAvatarUrl(profile.avatar_url || '')
    setInitialized(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!displayName.trim()) {
      toast.error('Display name is required')
      return
    }

    setIsSaving(true)
    try {
      const result = await updateProfile({
        display_name: displayName.trim(),
        avatar_url: avatarUrl.trim() || null,
      })

      if (result.success) {
        toast.success('Profile updated successfully')
        refetch()
      } else {
        toast.error(result.error || 'Failed to update profile')
      }
    } catch (err) {
      toast.error('An error occurred while saving')
    } finally {
      setIsSaving(false)
    }
  }

  const currentAvatarUrl = avatarUrl || avatar1

  return (
    <>
      <PageTitle subName="System" title="My Account" />

      <Row>
        <Col lg={8}>
          <Card>
            <CardHeader>
              <h5 className="card-title mb-0">Profile Settings</h5>
            </CardHeader>

            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="text-muted mt-2 mb-0">Loading profile...</p>
                </div>
              ) : error ? (
                <Alert variant="danger">
                  <strong>Error:</strong> {error}
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-4">
                    <Col md={3} className="text-center">
                      <img
                        src={currentAvatarUrl}
                        alt="Profile avatar"
                        className="rounded-circle mb-3"
                        width={120}
                        height={120}
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = avatar1
                        }}
                      />
                    </Col>
                    <Col md={9}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="bg-light"
                        />
                        <Form.Text className="text-muted">
                          Email cannot be changed
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Display Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Enter your display name"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Avatar URL</Form.Label>
                        <Form.Control
                          type="url"
                          value={avatarUrl}
                          onChange={(e) => setAvatarUrl(e.target.value)}
                          placeholder="https://example.com/avatar.jpg"
                        />
                        <Form.Text className="text-muted">
                          Enter a URL to an image for your profile picture
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="soft-secondary"
                      type="button"
                      onClick={() => {
                        setDisplayName(profile?.display_name || '')
                        setAvatarUrl(profile?.avatar_url || '')
                      }}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <IconifyIcon icon="solar:check-circle-outline" className="me-1" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <CardHeader>
              <h5 className="card-title mb-0">Account Information</h5>
            </CardHeader>
            <CardBody>
              <div className="mb-3">
                <small className="text-muted d-block">User ID</small>
                <code className="small">{user?.id || 'N/A'}</code>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Account Created</small>
                <span>
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </span>
              </div>
              <div>
                <small className="text-muted d-block">Last Updated</small>
                <span>
                  {profile?.updated_at
                    ? new Date(profile.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'N/A'}
                </span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Footer />
    </>
  )
}

export default AccountPage
