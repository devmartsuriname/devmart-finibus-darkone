/**
 * Breadcrumb Component
 * 
 * Migrated from Finibus to React 18 + react-router-dom v6
 */

import React from 'react'
import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  pageName: string
}

function Breadcrumb({ pageName }: BreadcrumbProps) {
  return (
    <div className="breadcrumb-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-content">
              <h1>{pageName}</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {pageName}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
