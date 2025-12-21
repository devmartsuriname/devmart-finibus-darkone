import { Card, CardBody } from 'react-bootstrap'

type ComingSoonPlaceholderProps = {
  title: string
  description?: string
}

const ComingSoonPlaceholder = ({ title, description }: ComingSoonPlaceholderProps) => {
  return (
    <Card>
      <CardBody className="text-center py-5">
        <div className="mb-3">
          <i className="bx bx-time-five text-muted" style={{ fontSize: '48px' }}></i>
        </div>
        <h4 className="text-muted mb-2">{title}</h4>
        {description && <p className="text-muted mb-0">{description}</p>}
      </CardBody>
    </Card>
  )
}

export default ComingSoonPlaceholder
