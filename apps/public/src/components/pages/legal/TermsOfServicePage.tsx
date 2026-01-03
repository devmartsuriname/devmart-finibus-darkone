/**
 * Terms of Service Page
 * 
 * Phase 13C: Legal & System Pages
 * 
 * Content seeded exactly as provided by Devmart via Live Documents.
 * No content rewriting, summarization, or reinterpretation.
 */

import React from 'react'
import LegalPageLayout from './LegalPageLayout'

function TermsOfServicePage() {
  return (
    <LegalPageLayout pageName="Terms of Service">
      <h2>Terms of Service</h2>
      <p className="legal-date">Last updated: January 2026</p>
      
      <div className="legal-section">
        <p>
          These Terms of Service ("Agreement") govern the provision of consulting, development, and related services by Devmart Consulting Ltd. ("Devmart", "we", "us") to clients ("Client", "you"). By engaging our services, you agree to these terms.
        </p>
      </div>

      <div className="legal-section">
        <h3>1. Services</h3>
        <p>
          Devmart provides technology consulting, software development, and digital transformation services as described in individual Statements of Work (SOW) or service agreements. The specific scope, deliverables, and timelines will be defined in each SOW.
        </p>
      </div>

      <div className="legal-section">
        <h3>2. Engagement Process</h3>
        <ul>
          <li><strong>Discovery:</strong> Initial consultation to understand your requirements</li>
          <li><strong>Proposal:</strong> Detailed scope, timeline, and pricing provided</li>
          <li><strong>Agreement:</strong> Signed SOW or contract before work commences</li>
          <li><strong>Delivery:</strong> Work delivered according to agreed milestones</li>
          <li><strong>Handover:</strong> Final deliverables and documentation provided</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>3. Client Obligations</h3>
        <p>To enable successful delivery, you agree to:</p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Make decisions and provide feedback within agreed timeframes</li>
          <li>Ensure availability of key stakeholders</li>
          <li>Provide access to necessary systems and resources</li>
          <li>Pay invoices according to agreed terms</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>4. Payment Terms</h3>
        <ul>
          <li>Payment terms are specified in each SOW (typically Net 14 or Net 30)</li>
          <li>Deposits may be required for new clients or large projects</li>
          <li>Late payments may incur interest at 4% above the Bank of England base rate</li>
          <li>We reserve the right to pause work if payments are overdue</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>5. Intellectual Property</h3>
        <ul>
          <li><strong>Client Materials:</strong> You retain ownership of all materials you provide</li>
          <li><strong>Deliverables:</strong> Upon full payment, you receive ownership of custom deliverables created specifically for you</li>
          <li><strong>Pre-existing IP:</strong> We retain ownership of our pre-existing tools, frameworks, and methodologies</li>
          <li><strong>License:</strong> You receive a perpetual license to use any of our pre-existing IP incorporated into deliverables</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>6. Confidentiality</h3>
        <p>
          Both parties agree to keep confidential any proprietary or sensitive information disclosed during the engagement. This obligation survives termination of the agreement. Confidential information excludes information that is publicly available or independently developed.
        </p>
      </div>

      <div className="legal-section">
        <h3>7. Warranties and Liability</h3>
        <ul>
          <li>We warrant that services will be performed with reasonable skill and care</li>
          <li>We will remedy any defects in deliverables reported within 30 days of delivery</li>
          <li>Our total liability is limited to the fees paid under the relevant SOW</li>
          <li>We are not liable for indirect, consequential, or special damages</li>
          <li>We do not warrant that deliverables will be error-free or meet all your expectations</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>8. Termination</h3>
        <ul>
          <li>Either party may terminate with 30 days written notice</li>
          <li>Immediate termination is permitted for material breach</li>
          <li>Upon termination, you pay for all work completed to date</li>
          <li>We will provide all completed work and documentation upon final payment</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>9. Force Majeure</h3>
        <p>
          Neither party is liable for delays or failures caused by circumstances beyond reasonable control, including natural disasters, pandemics, war, or government actions. Affected timelines will be adjusted accordingly.
        </p>
      </div>

      <div className="legal-section">
        <h3>10. Dispute Resolution</h3>
        <p>
          Disputes will first be addressed through good-faith negotiation. If unresolved within 30 days, parties may pursue mediation before legal action. This Agreement is governed by the laws of England and Wales.
        </p>
      </div>

      <div className="legal-section">
        <h3>11. General Provisions</h3>
        <ul>
          <li>This Agreement constitutes the entire understanding between parties</li>
          <li>Amendments must be in writing and signed by both parties</li>
          <li>No waiver of any term shall be deemed a continuing waiver</li>
          <li>If any provision is unenforceable, remaining provisions continue in effect</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>12. Contact</h3>
        <p>
          For questions about these Terms of Service, please contact us at: <a href="mailto:legal@devmart.co.uk">legal@devmart.co.uk</a>
        </p>
      </div>
    </LegalPageLayout>
  )
}

export default TermsOfServicePage
