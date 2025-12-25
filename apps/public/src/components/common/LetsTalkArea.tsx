/**
 * LetsTalkArea Component
 * 
 * Migrated from Finibus to React 18 + react-router-dom v6
 * Phase 7: Wired to homepage_settings.cta
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { useHomepageSettings, CtaData } from '../../hooks/useHomepageSettings'

// Static fallback CTA (Finibus default)
const STATIC_CTA: CtaData = {
  title_line1: "About Your Next",
  title_line2: "Project",
  title_line3: "Your Mind",
  cta_label: "Get In Touch",
  cta_url: "/contact"
};

function LetsTalkArea() {
  const { data: homepageData } = useHomepageSettings();
  
  // Use DB data or fallback to static
  const cta = homepageData?.cta || STATIC_CTA;

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <section className="lets-talk sec-pad">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-9 col-lg-8 col-xl-7">
            <div className="title special">
              <span>Let's Talk</span>
              <h2>
                {cta.title_line1} <br />
                <b>{cta.title_line2}</b> {cta.title_line3}
              </h2>
            </div>
          </div>
          <div className="col-md-3 col-lg-4 col-xl-5 text-end">
            <div className="getin-touch">
              <div className="cmn-btn">
                <Link onClick={scrollTop} to={cta.cta_url}>
                  {cta.cta_label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LetsTalkArea
