/**
 * Support Policy Page
 * 
 * Phase 13C: Legal & System Pages
 * 
 * Content seeded exactly as provided by Devmart via Live Documents.
 * No content rewriting, summarization, or reinterpretation.
 */

import React from 'react'
import LegalPageLayout from './LegalPageLayout'

function SupportPolicyPage() {
  return (
    <LegalPageLayout pageName="Support Policy">
      <h2>Support Policy</h2>
      <p className="legal-date">Last updated: January 2026</p>
      
      <div className="legal-section">
        <p>
          This Support Policy outlines how Devmart Consulting Ltd. provides support services to clients with active service agreements. Support availability and scope depend on your service tier and contract terms.
        </p>
      </div>

      <div className="legal-section">
        <h3>1. Support Channels</h3>
        <p>We offer support through the following channels:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:support@devmart.sr">support@devmart.sr</a> (all tiers)</li>
          <li><strong>Client Portal:</strong> Ticket submission and tracking (Professional and Enterprise tiers)</li>
          <li><strong>Phone:</strong> Direct line for urgent issues (Enterprise tier only)</li>
          <li><strong>Scheduled Calls:</strong> Regular check-ins as defined in your service agreement</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>2. Support Hours</h3>
        <ul>
          <li><strong>Standard Support:</strong> Monday to Friday, 9:00 AM – 5:30 PM (UK time), excluding bank holidays</li>
          <li><strong>Extended Support:</strong> Monday to Friday, 8:00 AM – 8:00 PM (UK time) – available for Professional tier</li>
          <li><strong>Priority Support:</strong> 24/7 for critical issues – available for Enterprise tier</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>3. Response Times</h3>
        <p>We aim to respond within the following timeframes based on issue priority:</p>
        <ul>
          <li><strong>Critical (System Down):</strong> 1 hour (Enterprise), 4 hours (Professional), 8 hours (Standard)</li>
          <li><strong>High (Major Feature Impacted):</strong> 4 hours (Enterprise), 8 hours (Professional), 24 hours (Standard)</li>
          <li><strong>Medium (Minor Feature Impacted):</strong> 8 hours (Enterprise), 24 hours (Professional), 48 hours (Standard)</li>
          <li><strong>Low (General Inquiry):</strong> 24 hours (Enterprise), 48 hours (Professional), 72 hours (Standard)</li>
        </ul>
        <p>Response times are measured during support hours only.</p>
      </div>

      <div className="legal-section">
        <h3>4. What Is Covered</h3>
        <p>Support includes:</p>
        <ul>
          <li>Bug fixes for delivered solutions</li>
          <li>Clarification on system functionality</li>
          <li>Guidance on using delivered features</li>
          <li>Minor configuration adjustments</li>
          <li>Security patches and critical updates</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>5. What Is Not Covered</h3>
        <p>The following are outside the scope of standard support:</p>
        <ul>
          <li>New feature development or enhancements</li>
          <li>Issues caused by unauthorized modifications</li>
          <li>Third-party integrations not implemented by Devmart</li>
          <li>Training beyond initial handover sessions</li>
          <li>Hardware or infrastructure issues outside our control</li>
        </ul>
        <p>These services may be available under separate agreements.</p>
      </div>

      <div className="legal-section">
        <h3>6. Escalation Process</h3>
        <p>If your issue is not resolved satisfactorily, you may escalate:</p>
        <ul>
          <li><strong>Level 1:</strong> Support Team (initial contact)</li>
          <li><strong>Level 2:</strong> Technical Lead (unresolved after 48 hours)</li>
          <li><strong>Level 3:</strong> Account Manager (unresolved after 5 business days)</li>
          <li><strong>Level 4:</strong> Director (exceptional circumstances)</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>7. Client Responsibilities</h3>
        <p>To ensure effective support, clients agree to:</p>
        <ul>
          <li>Provide clear and detailed issue descriptions</li>
          <li>Grant necessary access for troubleshooting</li>
          <li>Respond to requests for information promptly</li>
          <li>Maintain backups of critical data</li>
          <li>Report issues through designated channels</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>8. Service Level Agreement (SLA)</h3>
        <p>
          Specific SLA terms, including uptime guarantees and compensation for breaches, are defined in your individual service agreement. This Support Policy provides general guidelines and may be superseded by contract-specific terms.
        </p>
      </div>

      <div className="legal-section">
        <h3>9. Policy Updates</h3>
        <p>
          We may update this Support Policy periodically. Clients will be notified of material changes via email. Continued use of support services after changes constitutes acceptance.
        </p>
      </div>

      <div className="legal-section">
        <h3>10. Contact</h3>
        <p>
          For support inquiries, please contact: <a href="mailto:support@devmart.sr">support@devmart.sr</a>
        </p>
      </div>
    </LegalPageLayout>
  )
}

export default SupportPolicyPage
