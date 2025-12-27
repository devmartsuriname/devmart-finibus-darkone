/**
 * Footer Component
 * 
 * Migrated from Finibus to React 18 + react-router-dom v6
 * - Link updated for v6 API
 * - Removed process.env.PUBLIC_URL (not needed in Vite)
 * - Phase 6.1: Wired to Admin Settings with safe fallbacks
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePublicSettings } from '../../hooks/usePublicSettings'

function Footer() {
  const { settings } = usePublicSettings();
  
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link onClick={scrollTop} to="/">
                    <img src="/images/logo.png" alt="Devmart Logo" />
                  </Link>
                </div>
                <address>
                  <h4>Office</h4>
                  <p>{settings.contact_address}</p>
                </address>
                <ul className="social-media-icons">
                  {settings.facebook_url && (
                    <li>
                      <a
                        rel="noopener noreferrer"
                        href={settings.facebook_url}
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                  )}
                  {settings.linkedin_url && (
                    <li>
                      <a
                        rel="noopener noreferrer"
                        href={settings.linkedin_url}
                        target="_blank"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  )}
                  {settings.instagram_url && (
                    <li>
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={settings.instagram_url}
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                  )}
                  {settings.youtube_url && (
                    <li>
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={settings.youtube_url}
                      >
                        <i className="fab fa-youtube" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
              <div className="footer-widget">
                <h4>Our Services</h4>
                <ul className="footer-menu">
                  <li>
                    <Link onClick={scrollTop} to="/service-details">
                      Strategy &amp; Research
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/service-details">
                      Web Development
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/service-details">
                      Web Solution
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/service-details">
                      Digital Marketing
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/service-details">
                      App Design
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/service-details">
                      App Development
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
              <div className="footer-widget">
                <h4>Company</h4>
                <ul className="footer-menu">
                  <li>
                    <Link onClick={scrollTop} to="/about">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/service">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/project">
                      Project
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/blog">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/contact">
                      Career
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/service">
                      Pricing Plan
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
              <div className="footer-widget">
                <h4>Contacts</h4>
                <div className="number">
                  <div className="num-icon">
                    <i className="fas fa-phone-alt" />
                  </div>
                  <div className="phone">
                    <a rel="noopener noreferrer" href={`tel:${settings.contact_phone.replace(/\s/g, '')}`}>
                      {settings.contact_phone}
                    </a>
                  </div>
                </div>
                <div className="office-mail">
                  <div className="mail-icon">
                    <i className="far fa-envelope" />
                  </div>
                  <div className="email">
                    <a rel="noopener noreferrer" href={`mailto:${settings.contact_email}`}>
                      {settings.contact_email}
                    </a>
                  </div>
                </div>
                <div className="address">
                  <div className="address-icon">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <p>{settings.contact_address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-12 col-md-4 col-lg-4 col-xl-5">
                <div className="copy-txt">
                  <span>
                    Copyright 2024 <b>{settings.site_name}</b> | Powered by{' '}
                    <a
                      rel="noopener noreferrer"
                      href="https://www.devmart.sr/"
                      target="_blank"
                    >
                      {settings.site_name}
                    </a>
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-8 col-lg-8 col-xl-7">
                <ul className="footer-bottom-menu">
                  <li>
                    <Link onClick={scrollTop} to="/commingsoon">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/commingsoon">
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/commingsoon">
                      Support Policy
                    </Link>
                  </li>
                  <li>
                    <Link onClick={scrollTop} to="/commingsoon">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="scroll-top opacity">
        <ScrollButton />
      </div>
    </>
  )
}

export default Footer

const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop
      if (scrolled > 800) {
        setVisible(true)
      } else if (scrolled <= 100) {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <i
      className="bi bi-arrow-up"
      onClick={scrollToTop}
      style={{ display: visible ? 'inline' : 'none' }}
    >
      <span>top</span>
    </i>
  )
}
