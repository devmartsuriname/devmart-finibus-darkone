import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import { ProcessStepInput } from '../hooks/useServices'
import MediaPicker from '@/app/(admin)/settings/components/MediaPicker'
import IconifyIcon from '@/components/wrapper/IconifyIcon'

interface ProcessStepsEditorProps {
  steps: ProcessStepInput[]
  onChange: (steps: ProcessStepInput[]) => void
  disabled?: boolean
}

const ProcessStepsEditor = ({ steps, onChange, disabled }: ProcessStepsEditorProps) => {
  const addStep = () => {
    const newStep: ProcessStepInput = {
      step_number: steps.length + 1,
      title: '',
      description: '',
      image_media_id: null,
    }
    onChange([...steps, newStep])
  }

  const updateStep = (index: number, field: keyof ProcessStepInput, value: any) => {
    const updated = [...steps]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index)
    // Renumber steps
    updated.forEach((step, i) => {
      step.step_number = i + 1
    })
    onChange(updated)
  }

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === steps.length - 1)
    ) {
      return
    }

    const updated = [...steps]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const temp = updated[index]
    updated[index] = updated[newIndex]
    updated[newIndex] = temp

    // Renumber steps
    updated.forEach((step, i) => {
      step.step_number = i + 1
    })
    onChange(updated)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Process Steps</h6>
        <Button variant="outline-primary" size="sm" onClick={addStep} disabled={disabled}>
          <IconifyIcon icon="bx:plus" className="me-1" />
          Add Step
        </Button>
      </div>

      {steps.length === 0 ? (
        <Card className="border-dashed">
          <Card.Body className="text-center py-4">
            <p className="text-muted mb-2">No process steps defined</p>
            <Button variant="primary" size="sm" onClick={addStep} disabled={disabled}>
              Add First Step
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div className="d-flex flex-column gap-3">
          {steps.map((step, index) => (
            <Card key={index} className="border">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center py-2">
                <span className="fw-medium">Step {step.step_number}</span>
                <div className="d-flex gap-1">
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => moveStep(index, 'up')}
                    disabled={disabled || index === 0}
                    title="Move Up"
                  >
                    <IconifyIcon icon="bx:chevron-up" />
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => moveStep(index, 'down')}
                    disabled={disabled || index === steps.length - 1}
                    title="Move Down"
                  >
                    <IconifyIcon icon="bx:chevron-down" />
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className="text-danger"
                    onClick={() => removeStep(index)}
                    disabled={disabled}
                    title="Remove"
                  >
                    <IconifyIcon icon="bx:trash" />
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Step title"
                        value={step.title}
                        onChange={(e) => updateStep(index, 'title', e.target.value)}
                        disabled={disabled}
                        maxLength={100}
                      />
                    </Form.Group>

                    <Form.Group className="mb-0">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Step description"
                        value={step.description}
                        onChange={(e) => updateStep(index, 'description', e.target.value)}
                        disabled={disabled}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <MediaPicker
                      value={step.image_media_id || ''}
                      onChange={(val) => updateStep(index, 'image_media_id', val || null)}
                      label="Step Image"
                      helpText="Optional image"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProcessStepsEditor