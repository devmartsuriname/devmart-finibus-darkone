/**
 * =========================================================
 * PUBLIC FRONTEND LOCKED — PHASE 2 COMPLETE
 * =========================================================
 * 
 * Status: LOCKED
 * Phase: 2 — Finibus Parity Complete
 * Date: 2025-12-21
 * 
 * This frontend has achieved 1:1 parity with the Finibus demo.
 * All 13 routes verified and operational.
 * 
 * HARD LOCK RULES:
 * - Do NOT modify any files in apps/public
 * - Do NOT add new features
 * - Do NOT refactor or optimize
 * - Do NOT update dependencies
 * - Any changes require explicit user authorization
 * 
 * Public Frontend locked after Phase 2 – Finibus Parity Complete
 * =========================================================
 */

import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

// Layout Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'

// Providers
import { BrandingProvider } from './components/providers/BrandingProvider'

// Page Components
import HomePage from './components/pages/Home/HomePage'
import HomePage2 from './components/pages/Home2/HomePage2'
import AboutPage from './components/pages/aboutUs/AboutPage'
import ServicesPage from './components/pages/service/ServicesPage'
import ServiceDetailsPage from './components/pages/ServiceDetails/ServiceDetailsPage'
import ProjectsPage from './components/pages/projects/ProjectsPage'
import ProjectDetailsPage from './components/pages/projectDetails/ProjectDetailsPage'
import BlogPage from './components/pages/blog/BlogPage'
import BlogStandardPage from './components/pages/blogStandard/BlogStandardPage'
import BlogDetailsPage from './components/pages/blogDetails/BlogDetailsPage'
import ContactPage from './components/pages/contact/ContactPage'
import CommingSoonPage from './components/pages/commingSoon/CommingSoonPage'
import ErrorPage from './components/pages/Error/ErrorPage'

/**
 * Main Layout wrapper with Header/Footer
 * Used for most pages except standalone pages like Coming Soon
 */
function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

/**
 * Dark theme layout for Home2
 */
function DarkLayout() {
  return (
    <div className="dark">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

/**
 * Home Layout - includes Header/Footer with HomePage content
 */
function HomeLayout() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  )
}

/**
 * Home2 Layout - dark theme with Header/Footer
 */
function Home2Layout() {
  return (
    <div className="dark">
      <Header />
      <HomePage2 />
      <Footer />
    </div>
  )
}

/**
 * Root App Component
 * 
 * Route structure migrated from react-router-dom v5 to v6:
 * - Switch -> Routes
 * - component={X} -> element={<X />}
 * - Nested routes use Outlet
 * 
 * Route mapping (1:1 with original Finibus):
 * - / -> HomePage (with Header/Footer)
 * - /home2 -> HomePage2 (dark theme with Header/Footer)
 * - /about -> AboutPage
 * - /service -> ServicesPage
 * - /service-details -> ServiceDetails
 * - /project -> ProjectsPage
 * - /project-details -> ProjectDetailsPage
 * - /blog -> BlogPage (listing)
 * - /blog/:slug -> BlogDetailsPage (detail)
 * - /blog-standard -> BlogStandardPage
 * - /contact -> ContactPage
 * - /commingsoon -> CommingSoonPage (standalone)
 * - /error -> ErrorPage
 */
function App() {
  return (
    <BrandingProvider>
      <Routes>
        {/* Standalone pages (no layout wrapper) */}
        <Route path="/commingsoon" element={<CommingSoonPage />} />
        
        {/* Home pages with their own layout */}
        <Route path="/" element={<HomeLayout />} />
        <Route path="/home2" element={<Home2Layout />} />
        
        {/* Pages with standard Header/Footer layout */}
        <Route element={<MainLayout />}>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicesPage />} />
          {/* Dynamic service details with slug parameter */}
          <Route path="/service-details/:slug" element={<ServiceDetailsPage />} />
          {/* Fallback for /service-details without slug - redirects to services list */}
          <Route path="/service-details" element={<ServiceDetailsPage />} />
          <Route path="/project" element={<ProjectsPage />} />
          {/* Dynamic project details with slug parameter */}
          <Route path="/project-details/:slug" element={<ProjectDetailsPage />} />
          {/* Fallback for /project-details without slug - shows ErrorPage */}
          <Route path="/project-details" element={<ErrorPage />} />
          <Route path="/blog" element={<BlogPage />} />
          {/* Dynamic blog details with slug parameter */}
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />
          <Route path="/blog-standard" element={<BlogStandardPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/error" element={<ErrorPage />} />
          {/* Catch-all for 404 - inside MainLayout for Header/Footer */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrandingProvider>
  )
}

export default App
