import { Card, CardBody, Col, Row } from 'react-bootstrap'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useAuthContext } from '@/context/useAuthContext'

const AccessDenied = () => {
  const { signOut, user } = useAuthContext()

  return (
    <div className="account-pages py-5">
      <div className="container">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-lg">
              <CardBody className="p-5 text-center">
                <div className="mb-4">
                  <IconifyIcon 
                    icon="solar:shield-warning-bold" 
                    className="text-danger" 
                    style={{ fontSize: '64px' }} 
                  />
                </div>
                <h3 className="fw-bold text-dark mb-3">Access Denied</h3>
                <p className="text-muted mb-4">
                  You are signed in as <strong>{user?.email}</strong>, but your account does not have administrator privileges.
                </p>
                <p className="text-muted mb-4">
                  Please contact a system administrator if you believe this is an error.
                </p>
                <button 
                  onClick={signOut} 
                  className="btn btn-dark btn-lg fw-medium"
                >
                  <IconifyIcon icon="solar:logout-3-outline" className="me-2" />
                  Sign Out
                </button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AccessDenied
