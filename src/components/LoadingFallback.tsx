import { Container, Spinner } from 'react-bootstrap'

interface LoadingFallbackProps {
  message?: string
}

const LoadingFallback = ({ message = 'Loading...' }: LoadingFallbackProps) => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="text-center">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">{message}</span>
        </Spinner>
        <p className="text-muted mt-2 mb-0">{message}</p>
      </div>
    </Container>
  )
}

export default LoadingFallback
