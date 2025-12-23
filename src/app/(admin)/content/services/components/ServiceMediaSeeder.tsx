/**
 * ServiceMediaSeeder Component
 * 
 * Admin utility component to seed service icons and process step images
 * from Finibus template assets into the Media Library.
 * 
 * This component should only be used once during initial setup.
 * After seeding, it can be removed or hidden.
 */

import { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Alert, Spinner } from 'react-bootstrap'
import { seedAllServiceMedia } from '../utils/seedServiceMedia'

interface SeedStatus {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
  details?: {
    iconsUploaded: number
    stepsUploaded: number
    servicesUpdated: number
    processStepsUpdated: number
  }
}

export function ServiceMediaSeeder() {
  const [seedStatus, setSeedStatus] = useState<SeedStatus>({
    status: 'idle',
    message: '',
  })

  const handleSeed = async () => {
    setSeedStatus({ status: 'loading', message: 'Seeding service media...' })

    const result = await seedAllServiceMedia()

    if (result.success) {
      setSeedStatus({
        status: 'success',
        message: result.message,
        details: result.details,
      })
    } else {
      setSeedStatus({
        status: 'error',
        message: result.message,
      })
    }
  }

  return (
    <Card className="mb-4 border-warning bg-warning bg-opacity-10">
      <CardHeader className="border-bottom">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <i className="ti ti-database fs-5"></i>
          Service Media Seeder
        </h5>
        <small className="text-muted">
          One-time utility to upload Finibus service icons and process step images to the Media Library
          and link them to the corresponding services and steps.
        </small>
      </CardHeader>
      <CardBody>
        {seedStatus.status === 'idle' && (
          <div>
            <p className="text-muted mb-2">
              This will upload 7 service icons and 3 process step images, then update:
            </p>
            <ul className="text-muted small mb-3">
              <li>7 services with their icon_media_id</li>
              <li>21 process steps with their image_media_id</li>
            </ul>
            <Button onClick={handleSeed} variant="primary">
              Seed Service Media
            </Button>
          </div>
        )}

        {seedStatus.status === 'loading' && (
          <Alert variant="info" className="d-flex align-items-center gap-2 mb-0">
            <Spinner animation="border" size="sm" />
            <span>{seedStatus.message}</span>
          </Alert>
        )}

        {seedStatus.status === 'success' && (
          <Alert variant="success" className="mb-0">
            <h6 className="alert-heading">Success!</h6>
            <p className="mb-2">{seedStatus.message}</p>
            {seedStatus.details && (
              <ul className="small mb-0">
                <li>Icons uploaded: {seedStatus.details.iconsUploaded}</li>
                <li>Step images uploaded: {seedStatus.details.stepsUploaded}</li>
                <li>Services updated: {seedStatus.details.servicesUpdated}</li>
                <li>Process steps updated: {seedStatus.details.processStepsUpdated}</li>
              </ul>
            )}
          </Alert>
        )}

        {seedStatus.status === 'error' && (
          <Alert variant="danger" className="mb-0">
            <h6 className="alert-heading">Error</h6>
            <p className="mb-0">{seedStatus.message}</p>
          </Alert>
        )}
      </CardBody>
    </Card>
  )
}
