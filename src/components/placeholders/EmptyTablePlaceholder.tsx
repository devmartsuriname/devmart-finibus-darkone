import { Card, CardBody, CardHeader, CardTitle, Table } from 'react-bootstrap'

type EmptyTablePlaceholderProps = {
  title: string
  columns: string[]
  emptyMessage?: string
}

const EmptyTablePlaceholder = ({ title, columns, emptyMessage = 'No data available' }: EmptyTablePlaceholderProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h5">{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <Table responsive className="mb-0">
          <thead className="table-light">
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={columns.length} className="text-center text-muted py-4">
                {emptyMessage}
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default EmptyTablePlaceholder
