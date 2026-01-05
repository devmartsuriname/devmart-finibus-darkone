/**
 * MaintenancePage
 * 
 * Purpose: Display maintenance mode message when site is under maintenance.
 * Uses exact Finibus ErrorPage pattern for 1:1 parity.
 * 
 * Phase 13D.4 — Maintenance Mode Implementation
 * 
 * CSS Classes Used (from _error_page.scss):
 * - .notfound-error
 * - .error-wrapper
 * - .error-content
 * - .cmn-btn
 * 
 * Image Asset: /images/error.png (existing Finibus asset)
 */

import React from "react";
import { Link } from "react-router-dom";

interface MaintenancePageProps {
  message?: string;
}

function MaintenancePage({ message }: MaintenancePageProps) {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const displayMessage = message || 
    "We're currently performing scheduled maintenance to improve your experience. Please check back shortly.";

  return (
    <>
      <section className="notfound-error">
        <div className="container">
          <div className="error-wrapper">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6 col-xl-6 or2">
                <div className="error-content">
                  <h2>Maintenance</h2>
                  <h1>We'll Be Back Soon</h1>
                  <p>{displayMessage}</p>
                  <div className="cmn-btn">
                    <Link onClick={scrollTop} to="/">
                      Back to home
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-6 or1">
                <div className="error-img">
                  <img src="/images/error.png" alt="maintenance" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MaintenancePage;
