/**
 * Marketing Events Page
 * 
 * Phase 7B: Read-only list of marketing events for admin analytics.
 * Uses Darkone patterns from LeadsPage (Card, Table, Badge, Spinner).
 */

import { Card, CardHeader, CardBody, Table, Badge, Spinner, Row, Col } from 'react-bootstrap';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/PageTitle';
import { useMarketingEvents } from '../hooks/useMarketingEvents';

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getEventBadge = (eventType: string) => {
  switch (eventType) {
    case 'quote_started':
      return <Badge bg="info">Quote Started</Badge>;
    case 'quote_step_completed':
      return <Badge bg="primary">Step Completed</Badge>;
    case 'quote_submitted':
      return <Badge bg="success">Quote Submitted</Badge>;
    case 'contact_form_submitted':
      return <Badge bg="warning" text="dark">Contact Submitted</Badge>;
    case 'service_pricing_cta_clicked':
      return <Badge bg="secondary">CTA Clicked</Badge>;
    default:
      return <Badge bg="secondary">{eventType}</Badge>;
  }
};

const MarketingEventsPage = () => {
  const { events, isLoading, error } = useMarketingEvents();

  return (
    <>
      <PageTitle subName="Analytics" title="Marketing Events" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <h5 className="card-title mb-0">Recent Events</h5>
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" />
                  <p className="text-muted mt-2 mb-0">Loading events...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">No events recorded yet</h5>
                  <p className="text-muted mb-0">Events will appear here as users interact with the site</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Event</th>
                        <th>Source</th>
                        <th>Timestamp</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr key={event.id}>
                          <td>{getEventBadge(event.event_type)}</td>
                          <td className="text-capitalize">{event.source?.replace(/_/g, ' ') || '-'}</td>
                          <td>{formatDate(event.created_at)}</td>
                          <td>
                            <small className="text-muted">
                              {Object.keys(event.metadata || {}).length > 0
                                ? JSON.stringify(event.metadata)
                                : '-'}
                            </small>
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
  );
};

export default MarketingEventsPage;
