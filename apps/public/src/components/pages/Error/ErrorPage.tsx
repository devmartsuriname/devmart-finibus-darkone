import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <section className="error-page sec-mar">
      <div className="container text-center">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <Link to="/" className="cmn-btn">Back to Home</Link>
      </div>
    </section>
  )
}

export default ErrorPage
