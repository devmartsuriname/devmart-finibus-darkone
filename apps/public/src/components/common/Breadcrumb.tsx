import React from 'react'
import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  pageName: string
}

function Breadcrumb({ pageName }: BreadcrumbProps) {
  return (
    <section className="breadcrumbs">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-wrapper">
              <h1>{pageName}</h1>
              <span>
                <Link to="/">Home</Link>
                <i>
                  <img src="/images/icons/breadcrumb-arrow.svg" alt="images" />
                </i>
                {pageName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Breadcrumb
