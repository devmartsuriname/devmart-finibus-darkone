/**
 * ContactUsArea Component
 * 
 * Phase 6.1: Wired to Admin Settings with safe fallbacks
 * Displays Location, Phone, Email cards
 */

import React from "react";
import { usePublicSettings } from "../../../hooks/usePublicSettings";

function ContactUsArea() {
  const { settings } = usePublicSettings();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-xl-6">
            <div className="title black">
              <span>Get In Touch</span>
              <h2>contact us if you have more questions.</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-4 col-xl-4">
            <div className="office-info">
              <div className="icon">
                <i className="bi bi-geo-alt" />
              </div>
              <h4>Location</h4>
              <p>{settings.contact_address}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4">
            <div className="office-info">
              <div className="icon">
                <i className="bi bi-telephone" />
              </div>
              <h4>Phone</h4>
              <a href={`tel:${settings.contact_phone.replace(/\s/g, '')}`}>
                {settings.contact_phone}
              </a>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4">
            <div className="office-info">
              <div className="icon">
                <i className="bi bi-envelope" />
              </div>
              <h4>Email</h4>
              <a href={`mailto:${settings.contact_email}`}>
                {settings.contact_email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUsArea;
