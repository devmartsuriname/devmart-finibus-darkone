/**
 * Header Component
 * 
 * Phase 11G-B: Navigation hygiene cleanup
 * - Removed demo links (Home 02, Blog Standard, Error 404)
 * - Flattened menu structure (no dropdowns for single-destination items)
 * - Menu reflects only actual implemented routes
 * 
 * Migrated from Finibus to React 18 + react-router-dom v6
 */

import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import AnimatedCursor from 'react-animated-cursor'

function Header() {
  const [sidebar, setSidebar] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setSidebar(false)
  }, [location.pathname])

  // Sticky Menu Area
  useEffect(() => {
    const isSticky = () => {
      const header = document.querySelector('.position_top')
      const scrollTop = window.scrollY
      if (header) {
        scrollTop >= 200
          ? header.classList.add('sticky')
          : header.classList.remove('sticky')
      }
    }

    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  }, [])

  const showSidebar = () => {
    setSidebar(!sidebar)
  }

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={30}
        color="30, 179, 107"
        outerAlpha={0.5}
        innerScale={0.7}
        outerScale={1.5}
        clickables={[
          'a',
          'i',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link',
        ]}
      />
      <header className="position_top">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col col-sm-3 col-md-3 col-lg-3 col-xl-2">
              <div className="logo">
                <Link onClick={scrollTop} to="/">
                  <img src="/images/logo.png" alt="Devmart Logo" />
                </Link>
              </div>
            </div>
            <div className="col col-sm-5 col-md-6 col-lg-6 col-xl-8 text-end">
              <nav className={sidebar ? 'main-nav slidenav' : 'main-nav'}>
                <div className="mobile-menu-logo">
                  <Link onClick={scrollTop} to="/">
                    <img src="/images/logo.png" alt="Devmart Logo" />
                  </Link>
                </div>
                <ul>
                  {/* Home - Flat link, no dropdown */}
                  <li>
                    <NavLink 
                      onClick={scrollTop} 
                      to="/"
                      className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      Home
                    </NavLink>
                  </li>

                  {/* About Us */}
                  <li>
                    <NavLink 
                      onClick={scrollTop} 
                      to="/about"
                      className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      About us
                    </NavLink>
                  </li>

                  {/* Services - Flat link, details via slug */}
                  <li>
                    <NavLink 
                      onClick={scrollTop} 
                      to="/service"
                      className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      Services
                    </NavLink>
                  </li>

                  {/* Projects - Flat link, details via slug */}
                  <li>
                    <NavLink 
                      onClick={scrollTop} 
                      to="/project"
                      className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      Projects
                    </NavLink>
                  </li>

                  {/* Blog - Flat link, details via slug */}
                  <li>
                    <NavLink 
                      onClick={scrollTop} 
                      to="/blog"
                      className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      Blog
                    </NavLink>
                  </li>

                  {/* Contact Us */}
                  <li>
                    <NavLink 
                      onClick={scrollTop} 
                      to="/contact"
                      className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      Contact us
                    </NavLink>
                  </li>
                </ul>
                <div className="get-quate dn">
                  <div className="cmn-btn">
                    <Link onClick={scrollTop} to="/contact">
                      Get a quote
                    </Link>
                  </div>
                </div>
              </nav>
              <div className="mobile-menu">
                <div
                  onClick={showSidebar}
                  className={sidebar ? 'cross-btn h-active' : 'cross-btn'}
                >
                  <span className="cross-top" />
                  <span className="cross-middle" />
                  <span className="cross-bottom" />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2 text-end">
              <div className="get-quate">
                <div className="cmn-btn">
                  <Link onClick={scrollTop} to="/contact">
                    Get a quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
