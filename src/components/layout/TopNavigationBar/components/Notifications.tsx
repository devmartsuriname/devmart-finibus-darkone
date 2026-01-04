import IconifyIcon from '@/components/wrapper/IconifyIcon'
import SimplebarReactClient from '@/components/wrapper/SimplebarReactClient'
import { useNotifications, Notification } from '@/hooks/useNotifications'
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const NotificationItem = ({ notification, onMarkRead }: { notification: Notification; onMarkRead: (id: string) => void }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    onMarkRead(notification.id)
    if (notification.link) {
      navigate(notification.link)
    }
  }

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

  return (
    <DropdownItem 
      className={`py-3 border-bottom text-wrap ${!notification.is_read ? 'bg-soft-primary' : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="d-flex">
        <div className="flex-shrink-0">
          <div className="avatar-sm me-2">
            <span className={`avatar-title ${!notification.is_read ? 'bg-primary text-white' : 'bg-soft-info text-info'} fs-20 rounded-circle`}>
              <IconifyIcon icon={getTypeIcon(notification.type)} />
            </span>
          </div>
        </div>
        <div className="flex-grow-1">
          <span className="mb-0 fw-semibold">{notification.title}</span>
          <span className="mb-0 text-wrap d-block text-muted">{notification.message}</span>
          <small className="text-muted">
            {new Date(notification.created_at).toLocaleString()}
          </small>
        </div>
      </div>
    </DropdownItem>
  )
}

const Notifications = () => {
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } = useNotifications()
  const latestNotifications = notifications.slice(0, 5)

  return (
    <Dropdown className="topbar-item">
      <DropdownToggle
        as={'a'}
        type="button"
        className="topbar-button position-relative content-none"
        id="page-header-notifications-dropdown"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <IconifyIcon icon="solar:bell-bing-outline" className="fs-22 align-middle" />
        {unreadCount > 0 && (
          <span className="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill">
            {unreadCount > 99 ? '99+' : unreadCount}
            <span className="visually-hidden">unread messages</span>
          </span>
        )}
      </DropdownToggle>
      <DropdownMenu className="py-0 dropdown-lg dropdown-menu-end" aria-labelledby="page-header-notifications-dropdown">
        <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
          <Row className="align-items-center">
            <Col>
              <h6 className="m-0 fs-16 fw-semibold">
                Notifications {unreadCount > 0 && `(${unreadCount})`}
              </h6>
            </Col>
            <Col xs={'auto'}>
              {unreadCount > 0 && (
                <Link 
                  to="" 
                  className="text-dark text-decoration-underline"
                  onClick={(e) => {
                    e.preventDefault()
                    markAllAsRead()
                  }}
                >
                  <small>Clear All</small>
                </Link>
              )}
            </Col>
          </Row>
        </div>
        <SimplebarReactClient style={{ maxHeight: 280 }}>
          {isLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" size="sm" />
            </div>
          ) : latestNotifications.length === 0 ? (
            <div className="text-center py-4 text-muted">
              <IconifyIcon icon="solar:bell-off-outline" className="fs-24 mb-2 d-block" />
              <small>No notifications</small>
            </div>
          ) : (
            latestNotifications.map((notification) => (
              <NotificationItem 
                key={notification.id} 
                notification={notification}
                onMarkRead={markAsRead}
              />
            ))
          )}
        </SimplebarReactClient>
        <div className="text-center py-3">
          <Link to="/notifications" className="btn btn-primary btn-sm">
            View All Notifications <IconifyIcon icon="bx:right-arrow-alt" className="ms-1" />
          </Link>
        </div>
      </DropdownMenu>
    </Dropdown>
  )
}

export default Notifications
