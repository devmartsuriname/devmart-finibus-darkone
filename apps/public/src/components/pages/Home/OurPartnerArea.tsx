import React, { useState } from "react";
import { useHomepageSettings, PartnerItem } from "../../../hooks/useHomepageSettings";
import { useNewsletterSubscribe } from "../../../hooks/useNewsletterSubscribe";

// Static fallback partners (Finibus defaults)
const STATIC_PARTNERS: PartnerItem[] = [
  { logo: "/images/partner-icons/partner-1.png", url: "www.example.com" },
  { logo: "/images/partner-icons/partner-2.png", url: "www.example.com" },
  { logo: "/images/partner-icons/partner-3.png", url: "www.example.com" },
  { logo: "/images/partner-icons/partner-4.png", url: "www.example.com" },
  { logo: "/images/partner-icons/partner-5.png", url: "www.example.com" },
  { logo: "/images/partner-icons/partner-6.png", url: "www.example.com" },
  { logo: "/images/partner-icons/partner-7.png", url: "www.example.com" },
  { logo: "/images/partner-icons/partner-8.png", url: "www.example.com" },
  { logo: "/images/partner-icons/partner-9.png", url: "www.example.org" },
  { logo: "/images/partner-icons/partner-10.png", url: "www.example.com" }
];

function OurPartnerArea() {
  const { data: homepageData } = useHomepageSettings();
  const { subscribe, isSubmitting } = useNewsletterSubscribe();
  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  
  // Use DB partners or fallback to static
  const partners = homepageData?.partners?.length ? homepageData.partners : STATIC_PARTNERS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email);
    setMessage({ text: result.message, success: result.success });
    if (result.success) {
      setEmail("");
    }
    // Clear message after 5 seconds
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <>
      <section className="our-partner">
        <div className="container-fluid g-0 overflow-hidden">
          <div className="row align-items-center g-0">
            <div className="col-12 col-xl-6">
              <div className="newsletter">
                <div className="subscribes">
                  <span>Get In Touch</span>
                  <h1>Subscribe Our</h1>
                  <h2>Newsletter</h2>
                  <div className="subscribe-form">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Type Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                      <input 
                        type="submit" 
                        value={isSubmitting ? "..." : "Connect"} 
                        disabled={isSubmitting}
                      />
                    </form>
                    {message && (
                      <p style={{ 
                        marginTop: '10px', 
                        color: message.success ? '#28a745' : '#dc3545',
                        fontSize: '14px'
                      }}>
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="our-clients">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-4 col-xl-6">
                    <div className="title">
                      <span>Our partner</span>
                      <h2>Join Our Client Network.</h2>
                    </div>
                  </div>
                  {partners.map((partner, index) => (
                    <div key={index} className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                      <div className="single-client">
                        <img
                          src={partner.logo}
                          alt="partner"
                        />
                        <div className="client-hover">
                          <span>{partner.url}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OurPartnerArea;
