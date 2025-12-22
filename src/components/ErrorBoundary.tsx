import { Component, ErrorInfo, ReactNode } from 'react'
import { Card, Button, Container } from 'react-bootstrap'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Container className="py-5">
          <Card className="border-danger">
            <Card.Header className="bg-danger text-white">
              <h5 className="mb-0">Error: Something went wrong</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-3">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <div className="d-flex gap-2">
                <Button variant="primary" onClick={this.handleReset}>
                  Try Again
                </Button>
                <Button variant="outline-secondary" onClick={() => window.location.reload()}>
                  Reload Page
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
