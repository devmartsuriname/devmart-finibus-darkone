/**
 * ContactSubmit Component
 * 
 * Phase 6D-5: Quote Wizard Step 4
 * 
 * Collects user contact information before quote submission.
 * Uses existing ContactForm patterns from Finibus template.
 * 
 * Fields:
 * - Name (required)
 * - Email (required)
 * - Company (optional)
 * - Phone (optional)
 * - Message (optional)
 * 
 * No new CSS - reuses .contact-form pattern.
 */

import React from 'react';

interface ContactSubmitProps {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  honeypot: string;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errorMessage: string | null;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: () => Promise<void>;
  onPrev: () => void;
}

function ContactSubmit({
  name,
  email,
  company,
  phone,
  message,
  honeypot,
  isSubmitting,
  submitStatus,
  errorMessage,
  onFieldChange,
  onSubmit,
  onPrev,
}: ContactSubmitProps) {
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12">
        {/* Step header - .title.black pattern */}
        <div className="title black text-center">
          <span>Step 4</span>
          <h2>Your Information</h2>
        </div>
        <p className="text-center text-muted mb-4">
          Enter your contact details to receive your quote
        </p>
      </div>
      
      <div className="col-lg-8 col-xl-6">
        {/* Contact form - reuses .contact-form pattern */}
        <div className="contact-form">
          {/* Error message display */}
          {submitStatus === 'error' && errorMessage && (
            <p style={{ color: '#dc3545', marginBottom: '1rem', marginTop: 0, textAlign: 'center' }}>
              {errorMessage}
            </p>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Honeypot field - hidden from humans, bots fill it */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => onFieldChange('honeypot', e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
            />
            
            <div className="row">
              {/* Name - Required */}
              <div className="col-xl-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name *"
                  value={name}
                  onChange={(e) => onFieldChange('name', e.target.value)}
                  required
                />
              </div>
              
              {/* Email - Required */}
              <div className="col-xl-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address *"
                  value={email}
                  onChange={(e) => onFieldChange('email', e.target.value)}
                  required
                />
              </div>
              
              {/* Company - Optional */}
              <div className="col-xl-6">
                <input
                  type="text"
                  name="company"
                  placeholder="Company name (optional)"
                  value={company}
                  onChange={(e) => onFieldChange('company', e.target.value)}
                />
              </div>
              
              {/* Phone - Optional */}
              <div className="col-xl-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number (optional)"
                  value={phone}
                  onChange={(e) => onFieldChange('phone', e.target.value)}
                />
              </div>
              
              {/* Message - Optional */}
              <div className="col-12">
                <textarea
                  name="message"
                  cols={30}
                  rows={5}
                  placeholder="Additional notes or requirements (optional)"
                  value={message}
                  onChange={(e) => onFieldChange('message', e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        
        {/* Navigation - .cmn-btn pattern */}
        <div className="d-flex justify-content-between mt-4">
          <div className="cmn-btn">
            <a href="#!" onClick={(e) => { e.preventDefault(); onPrev(); }}>
              Previous
            </a>
          </div>
          <div className="cmn-btn">
            <a 
              href="#!" 
              onClick={(e) => { 
                e.preventDefault(); 
                if (!isSubmitting) {
                  handleSubmit(e);
                }
              }}
              style={{ 
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quote'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSubmit;
