/**
 * Terms of Use Page
 * 
 * Phase 13C: Legal & System Pages
 * 
 * Content seeded exactly as provided by Devmart via Live Documents.
 * No content rewriting, summarization, or reinterpretation.
 */

import React from 'react'
import LegalPageLayout from './LegalPageLayout'

function TermsOfUsePage() {
  return (
    <LegalPageLayout pageName="Terms of Use">
      <h2>Terms of Use</h2>
      <p className="legal-date">Last updated: January 2026</p>
      
      <div className="legal-section">
        <p>
          Welcome to the Devmart Consulting Ltd. website. By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
        </p>
      </div>

      <div className="legal-section">
        <h3>1. Website Use</h3>
        <p>You may use this website for lawful purposes only. You agree not to:</p>
        <ul>
          <li>Use the website in any way that violates applicable laws or regulations</li>
          <li>Attempt to gain unauthorized access to any part of the website</li>
          <li>Interfere with or disrupt the website's functionality</li>
          <li>Transmit any malicious code, viruses, or harmful content</li>
          <li>Collect or harvest any information from the website without permission</li>
          <li>Use automated systems to access the website without our consent</li>
        </ul>
      </div>

      <div className="legal-section">
        <h3>2. Intellectual Property</h3>
        <p>
          All content on this website, including text, graphics, logos, images, and software, is the property of Devmart Consulting Ltd. or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
        </p>
      </div>

      <div className="legal-section">
        <h3>3. User Content</h3>
        <p>
          If you submit any content to our website (such as through contact forms or project inquiries), you grant us a non-exclusive, royalty-free license to use, reproduce, and display such content for business purposes. You represent that you have the right to submit such content and that it does not violate any third-party rights.
        </p>
      </div>

      <div className="legal-section">
        <h3>4. Disclaimer of Warranties</h3>
        <p>
          This website is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. We disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
        </p>
      </div>

      <div className="legal-section">
        <h3>5. Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, Devmart Consulting Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this website. Our total liability shall not exceed £100.
        </p>
      </div>

      <div className="legal-section">
        <h3>6. External Links</h3>
        <p>
          This website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of these external sites. Inclusion of any link does not imply endorsement by Devmart.
        </p>
      </div>

      <div className="legal-section">
        <h3>7. Modifications</h3>
        <p>
          We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website after any changes constitutes acceptance of the new terms.
        </p>
      </div>

      <div className="legal-section">
        <h3>8. Governing Law</h3>
        <p>
          These Terms of Use shall be governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>
      </div>

      <div className="legal-section">
        <h3>9. Severability</h3>
        <p>
          If any provision of these Terms of Use is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
        </p>
      </div>

      <div className="legal-section">
        <h3>10. Contact</h3>
        <p>
          For questions about these Terms of Use, please contact us at: <a href="mailto:legal@devmart.sr">legal@devmart.sr</a>
        </p>
      </div>
    </LegalPageLayout>
  )
}

export default TermsOfUsePage
