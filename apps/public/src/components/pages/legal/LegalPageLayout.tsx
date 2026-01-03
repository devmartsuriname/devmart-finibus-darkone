/**
 * LegalPageLayout Component
 * 
 * Shared layout for all legal/compliance pages.
 * Uses existing Frontend Uniformity Library patterns.
 * 
 * Phase 13C: Legal & System Pages
 * 
 * Pattern matches: ContactPage, AboutPage structure
 * - Breadcrumb header
 * - Main content section with sec-pad
 * - LetsTalkArea CTA footer
 */

import React from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import LetsTalkArea from '../../common/LetsTalkArea'

interface LegalPageLayoutProps {
  pageName: string
  children: React.ReactNode
}

function LegalPageLayout({ pageName, children }: LegalPageLayoutProps) {
  return (
    <>
      <Breadcrumb pageName={pageName} />
      <section className="legal-content sec-pad">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="legal-content-wrapper">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
      <LetsTalkArea />
    </>
  )
}

export default LegalPageLayout
