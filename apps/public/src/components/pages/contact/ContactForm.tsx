import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { usePublicSettings } from "../../../hooks/usePublicSettings";
import { useSystemSettings } from "../../../hooks/useSystemSettings";
import { captureUtmParams, getUtmData } from "../../../hooks/useUtmCapture";
import { trackEvent } from "../../../hooks/useMarketingEvents";

function ContactForm() {
  // Capture UTM params on mount
  useEffect(() => {
    captureUtmParams();
  }, []);
  const { settings } = usePublicSettings();
  const { settings: systemSettings } = useSystemSettings();
  
  // Feature guard: check if contact form is enabled
  const isFormDisabled = !systemSettings.contact_form_enabled;
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  // Honeypot for anti-spam (hidden from users)
  const [honeypot, setHoneypot] = useState("");
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Feature guard: if form is disabled, show message and return
    if (isFormDisabled) {
      setSubmitStatus('error');
      setErrorMessage('Contact form is temporarily unavailable. Please try again later.');
      return;
    }
    
    // Anti-spam: if honeypot is filled, silently "succeed" without DB insert
    if (honeypot) {
      setSubmitStatus('success');
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      return;
    }
    
    // Client-side validation
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Get UTM data for marketing attribution
    const utmData = getUtmData();
    
    const { error } = await supabase
      .from('leads')
      .insert({
        name: trimmedName,
        email: trimmedEmail,
        subject: subject.trim() || null,
        message: trimmedMessage,
        source: 'contact_form',
        ...utmData,
      });
    
    setIsSubmitting(false);
    
    if (error) {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } else {
      // Phase 7B: Track contact form submission
      trackEvent({ eventType: 'contact_form_submitted', source: 'contact_form' });
      setSubmitStatus('success');
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  };

  return (
    <>
      <div className="contact-information">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-6">
              <div className="contact-form">
                <h3>Have Any Questions</h3>
                {/* Status messages - minimal inline styling to avoid layout shift */}
                {submitStatus === 'success' && (
                  <p style={{ color: '#28a745', marginBottom: '1rem', marginTop: 0 }}>
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p style={{ color: '#dc3545', marginBottom: '1rem', marginTop: 0 }}>
                    {errorMessage}
                  </p>
                )}
                <form
                  onSubmit={handleSubmit}
                  action="#"
                  method="post"
                >
                  {/* Honeypot field - hidden from humans, bots fill it */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                  />
                  <div className="row">
                    <div className="col-12">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-xl-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-xl-6">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        name="message"
                        cols={30}
                        rows={10}
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="submit"
                        value={isSubmitting ? "Sending..." : (isFormDisabled ? "Temporarily Unavailable" : "Send Message")}
                        disabled={isSubmitting || isFormDisabled}
                        style={(isSubmitting || isFormDisabled) ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                  />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="google-map">
                <iframe
                  title="Google Map"
                  src={settings.google_maps_embed_url}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
