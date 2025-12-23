import { Form, Button, Card, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { PricingPlanInput } from '../hooks/useServices'
import IconifyIcon from '@/components/wrapper/IconifyIcon'

interface PricingPlansEditorProps {
  plans: PricingPlanInput[]
  onChange: (plans: PricingPlanInput[]) => void
  disabled?: boolean
}

const PricingPlansEditor = ({ plans, onChange, disabled }: PricingPlansEditorProps) => {
  const monthlyPlans = plans.filter(p => p.billing_period === 'monthly')
  const yearlyPlans = plans.filter(p => p.billing_period === 'yearly')

  const addPlan = (billingPeriod: 'monthly' | 'yearly') => {
    const existingPlans = billingPeriod === 'monthly' ? monthlyPlans : yearlyPlans
    const newPlan: PricingPlanInput = {
      billing_period: billingPeriod,
      plan_name: '',
      plan_subtitle: '',
      price_amount: 0,
      currency: 'USD',
      features: [''],
      cta_label: 'Get Started',
      display_order: existingPlans.length + 1,
      status: 'draft',
    }
    onChange([...plans, newPlan])
  }

  const updatePlan = (planIndex: number, field: keyof PricingPlanInput, value: any) => {
    const updated = [...plans]
    updated[planIndex] = { ...updated[planIndex], [field]: value }
    onChange(updated)
  }

  const removePlan = (planIndex: number) => {
    onChange(plans.filter((_, i) => i !== planIndex))
  }

  const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
    const updated = [...plans]
    const features = [...updated[planIndex].features]
    features[featureIndex] = value
    updated[planIndex] = { ...updated[planIndex], features }
    onChange(updated)
  }

  const addFeature = (planIndex: number) => {
    const updated = [...plans]
    updated[planIndex] = { ...updated[planIndex], features: [...updated[planIndex].features, ''] }
    onChange(updated)
  }

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const updated = [...plans]
    updated[planIndex] = {
      ...updated[planIndex],
      features: updated[planIndex].features.filter((_, i) => i !== featureIndex),
    }
    onChange(updated)
  }

  const renderPlanCard = (plan: PricingPlanInput, planIndex: number) => (
    <Card key={planIndex} className="border mb-3">
      <Card.Header className="bg-light d-flex justify-content-between align-items-center py-2">
        <span className="fw-medium">{plan.plan_name || 'New Plan'}</span>
        <Button
          variant="light"
          size="sm"
          className="text-danger"
          onClick={() => removePlan(planIndex)}
          disabled={disabled}
          title="Remove Plan"
        >
          <IconifyIcon icon="bx:trash" />
        </Button>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Small Business"
                value={plan.plan_name}
                onChange={(e) => updatePlan(planIndex, 'plan_name', e.target.value)}
                disabled={disabled}
                maxLength={50}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Plan Subtitle</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Single Business"
                value={plan.plan_subtitle || ''}
                onChange={(e) => updatePlan(planIndex, 'plan_subtitle', e.target.value)}
                disabled={disabled}
                maxLength={100}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                value={plan.price_amount}
                onChange={(e) => updatePlan(planIndex, 'price_amount', parseFloat(e.target.value) || 0)}
                disabled={disabled}
                min={0}
                step={0.01}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>CTA Label</Form.Label>
              <Form.Control
                type="text"
                placeholder="Get Started"
                value={plan.cta_label || ''}
                onChange={(e) => updatePlan(planIndex, 'cta_label', e.target.value)}
                disabled={disabled}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={plan.status}
                onChange={(e) => updatePlan(planIndex, 'status', e.target.value)}
                disabled={disabled}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-0">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Label className="mb-0">Features</Form.Label>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => addFeature(planIndex)}
              disabled={disabled}
            >
              <IconifyIcon icon="bx:plus" className="me-1" />
              Add Feature
            </Button>
          </div>
          {plan.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="d-flex gap-2 mb-2">
              <Form.Control
                type="text"
                placeholder="Feature description"
                value={feature}
                onChange={(e) => updateFeature(planIndex, featureIndex, e.target.value)}
                disabled={disabled}
              />
              <Button
                variant="light"
                size="sm"
                className="text-danger"
                onClick={() => removeFeature(planIndex, featureIndex)}
                disabled={disabled || plan.features.length <= 1}
              >
                <IconifyIcon icon="bx:x" />
              </Button>
            </div>
          ))}
        </Form.Group>
      </Card.Body>
    </Card>
  )

  return (
    <Tabs defaultActiveKey="monthly" className="mb-3">
      <Tab eventKey="monthly" title="Monthly Plans">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Monthly Pricing</h6>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => addPlan('monthly')}
            disabled={disabled}
          >
            <IconifyIcon icon="bx:plus" className="me-1" />
            Add Monthly Plan
          </Button>
        </div>

        {monthlyPlans.length === 0 ? (
          <Card className="border-dashed">
            <Card.Body className="text-center py-4">
              <p className="text-muted mb-2">No monthly plans defined</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => addPlan('monthly')}
                disabled={disabled}
              >
                Add First Monthly Plan
              </Button>
            </Card.Body>
          </Card>
        ) : (
          monthlyPlans.map((plan) => {
            const globalIndex = plans.findIndex(p => p === plan)
            return renderPlanCard(plan, globalIndex)
          })
        )}
      </Tab>

      <Tab eventKey="yearly" title="Yearly Plans">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Yearly Pricing</h6>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => addPlan('yearly')}
            disabled={disabled}
          >
            <IconifyIcon icon="bx:plus" className="me-1" />
            Add Yearly Plan
          </Button>
        </div>

        {yearlyPlans.length === 0 ? (
          <Card className="border-dashed">
            <Card.Body className="text-center py-4">
              <p className="text-muted mb-2">No yearly plans defined</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => addPlan('yearly')}
                disabled={disabled}
              >
                Add First Yearly Plan
              </Button>
            </Card.Body>
          </Card>
        ) : (
          yearlyPlans.map((plan) => {
            const globalIndex = plans.findIndex(p => p === plan)
            return renderPlanCard(plan, globalIndex)
          })
        )}
      </Tab>
    </Tabs>
  )
}

export default PricingPlansEditor