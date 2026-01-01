/**
 * QuoteConfirmation Component
 * 
 * Phase 6D-5: Quote Wizard Step 5
 * 
 * Displays success confirmation after quote submission.
 * Shows reference number for tracking.
 * 
 * No new CSS - reuses .title.black and .cmn-btn patterns.
 */

import React from 'react';
import { Link } from 'react-router-dom';

interface QuoteConfirmationProps {
  referenceNumber: string | null;
}

function QuoteConfirmation({ referenceNumber }: QuoteConfirmationProps) {
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8 col-xl-6">
        {/* Step header - .title.black pattern */}
        <div className="title black text-center">
          <span>Step 5</span>
          <h2>Quote Submitted!</h2>
        </div>
        
        {/* Success message */}
        <div className="text-center" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Checkmark icon using text */}
          <div style={{ 
            fontSize: '4rem', 
            color: '#28a745', 
            marginBottom: '1rem' 
          }}>
            ✓
          </div>
          
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Thank you! Your quote request has been received.
          </p>
          
          {/* Reference number display */}
          {referenceNumber && (
            <div style={{ 
              background: '#f8f9fa', 
              padding: '1rem 2rem', 
              borderRadius: '8px',
              display: 'inline-block',
              marginBottom: '1.5rem'
            }}>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                Your Reference Number
              </p>
              <p style={{ 
                margin: '0.5rem 0 0', 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                color: '#333',
                letterSpacing: '1px'
              }}>
                {referenceNumber}
              </p>
            </div>
          )}
          
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            We will contact you shortly to discuss your requirements.
          </p>
        </div>
        
        {/* Return to home - .cmn-btn pattern */}
        <div className="text-center">
          <div className="cmn-btn" style={{ display: 'inline-block' }}>
            <Link to="/">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteConfirmation;
