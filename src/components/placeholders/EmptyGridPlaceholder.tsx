import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'

type EmptyGridPlaceholderProps = {
  title: string
  emptyMessage?: string
}

const EmptyGridPlaceholder = ({ title, emptyMessage = 'No items available' }: EmptyGridPlaceholderProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h5">{title}</CardTitle>
      </CardHeader>
      <CardBody className="text-center py-5">
        <div className="mb-3">
          <i className="bx bx-folder-open text-muted" style={{ fontSize: '48px' }}></i>
        </div>
        <p className="text-muted mb-0">{emptyMessage}</p>
      </CardBody>
    </Card>
  )
}

export default EmptyGridPlaceholder
