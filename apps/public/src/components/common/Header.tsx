/**
 * Header Component
 * 
 * Migrated from Finibus to React 18 + react-router-dom v6
 * - Link/NavLink updated for v6 API
 * - Removed process.env.PUBLIC_URL (not needed in Vite)
 * - Removed react-animated-cursor (optional enhancement, can be added later)
 */

import React, { useEffect, useState, useReducer } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AnimatedCursor from 'react-animated-cursor'

// Menu state reducer
const initialState = { activeMenu: '' }

function reducer(state: { activeMenu: string }, action: { type: string }) {
  switch (action.type) {
    case 'homeOne':
      return { activeMenu: 'homeOne' }
    case 'service':
      return { activeMenu: 'service' }
    case 'projects':
      return { activeMenu: 'projects' }
    case 'blogs':
      return { activeMenu: 'blogs' }
    case 'pages':
      return { activeMenu: 'pages' }
    default:
      return { activeMenu: '' }
  }
}

function Header() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [sidebar, setSidebar] = useState(false)

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
                  {/* Home Menu */}
                  <li
                    className="has-child active"
                    onClick={() => dispatch({ type: 'homeOne' })}
                  >
                    <Link to="#" className={state.activeMenu === 'homeOne' ? 'active' : ''}>
                      Home
                    </Link>
                    <i className="bi bi-chevron-down" />
                    <ul
                      className={
                        state.activeMenu === 'homeOne'
                          ? 'sub-menu d-block'
                          : 'sub-menu d-none'
                      }
                    >
                      <li>
                        <Link onClick={scrollTop} to="/">
                          Home 01
                        </Link>
                      </li>
                      <li>
                        <NavLink onClick={scrollTop} to="/home2">
                          Home 02
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* About Us */}
                  <li>
                    <NavLink onClick={scrollTop} to="/about">
                      About us
                    </NavLink>
                  </li>

                  {/* Services Menu */}
                  <li
                    className="has-child"
                    onClick={() => dispatch({ type: 'service' })}
                  >
                    <Link onClick={scrollTop} to="#">
                      Services
                    </Link>
                    <i className="bi bi-chevron-down" />
                    <ul
                      className={
                        state.activeMenu === 'service'
                          ? 'sub-menu d-block'
                          : 'sub-menu d-none'
                      }
                    >
                      <li>
                        <NavLink onClick={scrollTop} to="/service">
                          Service
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={scrollTop} to="/service-details">
                          Service Details
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* Projects Menu */}
                  <li
                    className="has-child"
                    onClick={() => dispatch({ type: 'projects' })}
                  >
                    <Link onClick={scrollTop} to="#">
                      Projects
                    </Link>
                    <i className="bi bi-chevron-down" />
                    <ul
                      className={
                        state.activeMenu === 'projects'
                          ? 'sub-menu d-block'
                          : 'sub-menu d-none'
                      }
                    >
                      <li>
                        <NavLink onClick={scrollTop} to="/project">
                          Project
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={scrollTop} to="/project-details">
                          Project Details
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* Blogs Menu */}
                  <li
                    className="has-child"
                    onClick={() => dispatch({ type: 'blogs' })}
                  >
                    <Link to="#">Blogs</Link>
                    <i className="bi bi-chevron-down" />
                    <ul
                      className={
                        state.activeMenu === 'blogs'
                          ? 'sub-menu d-block'
                          : 'sub-menu d-none'
                      }
                    >
                      <li>
                        <NavLink onClick={scrollTop} to="/blog">
                          Blog
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={scrollTop} to="/blog-standard">
                          Blog standard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={scrollTop} to="/blog">
                          Blog Details
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* Pages Menu */}
                  <li
                    className="has-child"
                    onClick={() => dispatch({ type: 'pages' })}
                  >
                    <Link to="#">Pages</Link>
                    <i className="bi bi-chevron-down" />
                    <ul
                      className={
                        state.activeMenu === 'pages'
                          ? 'sub-menu d-block'
                          : 'sub-menu d-none'
                      }
                    >
                      <li>
                        <NavLink onClick={scrollTop} to="/commingsoon">
                          Coming soon
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={scrollTop} to="/error">
                          Error 404
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* Contact Us */}
                  <li>
                    <NavLink onClick={scrollTop} to="/contact">
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
