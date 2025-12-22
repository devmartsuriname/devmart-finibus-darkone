import AnimationStar from '@/components/AnimationStar'
import Footer from '@/components/layout/Footer'
import LoadingFallback from '@/components/LoadingFallback'
import ErrorBoundary from '@/components/ErrorBoundary'
import { ChildrenType } from '@/types/component-props'
import { lazy, Suspense } from 'react'
import { Container } from 'react-bootstrap'

const TopNavigationBar = lazy(() => import('@/components/layout/TopNavigationBar/page'))
const VerticalNavigationBar = lazy(() => import('@/components/layout/VerticalNavigationBar/page'))

const AdminLayout = ({ children }: ChildrenType) => {
  return (
    <div className="wrapper">
      <Suspense fallback={<div className="topbar" />}>
        <TopNavigationBar />
      </Suspense>
      <Suspense fallback={<div className="app-sidebar" />}>
        <VerticalNavigationBar />
      </Suspense>
      <AnimationStar />
      <div className="page-content">
        <Container fluid>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading page..." />}>
              {children}
            </Suspense>
          </ErrorBoundary>
        </Container>
        <Footer />
      </div>
    </div>
  )
}

export default AdminLayout
