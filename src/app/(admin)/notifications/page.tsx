import { useState } from 'react'
import { Card, CardHeader, CardBody, Table, Button, Spinner, Row, Col, Badge } from 'react-bootstrap'
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrapper/IconifyIcon'
import { useNotifications, Notification } from '@/hooks/useNotifications'
import { useNavigate } from 'react-router-dom'

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'new_lead':
      return 'solar:user-plus-outline'
    case 'new_quote':
      return 'solar:document-text-outline'
    default:
      return 'solar:bell-outline'
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'new_lead':
      return <Badge bg="primary">Lead</Badge>
    case 'new_quote':
      return <Badge bg="info">Quote</Badge>
    default:
      return <Badge bg="secondary">{type}</Badge>
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const NotificationsPage = () => {
  const { notifications, isLoading, error, markAsRead, markAllAsRead, unreadCount } = useNotifications()
  const navigate = useNavigate()

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.link) {
      navigate(notification.link)
    }
  }

  return (
    <>
      <PageTitle subName="System" title="Notifications" />

      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                All Notifications
                {unreadCount > 0 && (
                  <Badge bg="primary" className="ms-2">{unreadCount} unread</Badge>
                )}
              </h5>
              <div className="d-flex gap-2 align-items-center">
                {unreadCount > 0 && (
                  <Button variant="soft-primary" size="sm" onClick={markAllAsRead}>
                    <IconifyIcon icon="solar:check-read-outline" className="me-1" />
                    Mark All as Read
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="text-muted mt-2 mb-0">Loading notifications...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-5">
                  <IconifyIcon icon="solar:bell-off-outline" className="fs-48 text-muted mb-3" />
                  <h5 className="text-muted">No notifications yet</h5>
                  <p className="text-muted mb-0">
                    You'll receive notifications when new leads or quotes are submitted
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '40px' }}></th>
                        <th>Notification</th>
                        <th style={{ width: '100px' }}>Type</th>
                        <th style={{ width: '180px' }}>Date</th>
                        <th style={{ width: '100px' }}>Status</th>
                        <th style={{ width: '80px' }} className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications.map((notification) => (
                        <tr 
                          key={notification.id}
                          className={!notification.is_read ? 'bg-soft-primary' : ''}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <td className="text-center">
                            <IconifyIcon 
                              icon={getTypeIcon(notification.type)} 
                              className={`fs-20 ${!notification.is_read ? 'text-primary' : 'text-muted'}`}
                            />
                          </td>
                          <td>
                            <span className="fw-medium">{notification.title}</span>
                            <br />
                            <small className="text-muted">{notification.message}</small>
                          </td>
                          <td>{getTypeBadge(notification.type)}</td>
                          <td>
                            <small>{formatDate(notification.created_at)}</small>
                          </td>
                          <td>
                            {notification.is_read ? (
                              <Badge bg="secondary">Read</Badge>
                            ) : (
                              <Badge bg="success">Unread</Badge>
                            )}
                          </td>
                          <td className="text-end">
                            {notification.link && (
                              <Button
                                variant="soft-primary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleNotificationClick(notification)
                                }}
                                title="View"
                              >
                                <IconifyIcon icon="bx:right-arrow-alt" />
                              </Button>
                            )}
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

      <Footer />
    </>
  )
}

export default NotificationsPage
