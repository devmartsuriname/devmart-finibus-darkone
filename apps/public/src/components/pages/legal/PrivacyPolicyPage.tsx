/**
 * Privacy Policy Page
 * 
 * Phase 13C: Legal & System Pages
 * 
 * Content seeded exactly as provided by Devmart via Live Documents.
 * No content rewriting, summarization, or reinterpretation.
 */

import React from 'react'
import LegalPageLayout from './LegalPageLayout'

function PrivacyPolicyPage() {
  return (
    <LegalPageLayout pageName="Privacy Policy">
      <h2>Privacy Policy</h2>
      <p className="legal-date">Last updated: January 2026</p>
      
      <div className="legal-section">
        <p>
          Devmart Consulting Ltd. ("Devmart", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services.
        </p>
      </div>

      <div className="legal-section">
        <h3>1. Information We Collect</h3>
        <p>We may collect the following types of information:</p>
        
        <h4>Personal Information</h4>
        <ul>
          <li>Name, email address, phone number</li>
          <li>Company name and job title</li>
          <li>Billing and payment information</li>
          <li>Any other information you voluntarily provide</li>
        </ul>
        
        <h4>Usage Data</h4>
        <ul>
          <li>IP address, browser type, operating system</li>
          <li>Pages visited, time spent on pages</li>
          <li>Referring URLs and exit pages</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>2. How We Use Your Information</h3>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Respond to inquiries and provide customer support</li>
          <li>Send promotional communications (with your consent)</li>
          <li>Monitor and analyze usage trends</li>
          <li>Comply with legal obligations</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>3. Information Sharing</h3>
        <p>We do not sell your personal information. We may share your information with:</p>
        <ul>
          <li>Service providers who assist in our operations</li>
          <li>Professional advisors (lawyers, accountants)</li>
          <li>Law enforcement when required by law</li>
          <li>Business partners with your explicit consent</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>4. Data Security</h3>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
        </p>
      </div>

      <div className="legal-section">
        <h3>5. Your Rights</h3>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to or restrict processing</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>6. Cookies and Tracking</h3>
        <p>
          We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings. Essential cookies are required for basic site functionality.
        </p>
      </div>

      <div className="legal-section">
        <h3>7. Third-Party Links</h3>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.
        </p>
      </div>

      <div className="legal-section">
        <h3>8. Children's Privacy</h3>
        <p>
          Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
        </p>
      </div>

      <div className="legal-section">
        <h3>9. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on this page with an updated revision date.
        </p>
      </div>

      <div className="legal-section">
        <h3>10. Contact Us</h3>
        <p>
          If you have questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@devmart.sr">privacy@devmart.sr</a>
        </p>
      </div>
    </LegalPageLayout>
  )
}

export default PrivacyPolicyPage
