import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

// Layout Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'

// Page Components
import HomePage from './components/pages/Home/HomePage'
import HomePage2 from './components/pages/Home2/HomePage2'
import AboutPage from './components/pages/aboutUs/AboutPage'
import ServicesPage from './components/pages/service/ServicesPage'
import ServiceDetails from './components/pages/ServiceDetails/ServiceDetails'
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
 * - /blog -> BlogPage
 * - /blog-standard -> BlogStandardPage
 * - /blog-details -> BlogDetailsPage
 * - /contact -> ContactPage
 * - /commingsoon -> CommingSoonPage (standalone)
 * - /error -> ErrorPage
 */
function App() {
  return (
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
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/project" element={<ProjectsPage />} />
        <Route path="/project-details" element={<ProjectDetailsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-standard" element={<BlogStandardPage />} />
        <Route path="/blog-details" element={<BlogDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Route>
      
      {/* Catch-all for 404 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
