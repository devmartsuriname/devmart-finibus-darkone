import { lazy } from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'

// Devmart Admin Pages
const Dashboard = lazy(() => import('@/app/(admin)/dashboard/page'))
const Blog = lazy(() => import('@/app/(admin)/content/blog/page'))
const Projects = lazy(() => import('@/app/(admin)/content/projects/page'))
const Pages = lazy(() => import('@/app/(admin)/content/pages/page'))
const Media = lazy(() => import('@/app/(admin)/content/media/page'))
const Testimonials = lazy(() => import('@/app/(admin)/content/testimonials/page'))
const Services = lazy(() => import('@/app/(admin)/content/services/page'))
const GlobalBlocks = lazy(() => import('@/app/(admin)/content/global-blocks/page'))
const Leads = lazy(() => import('@/app/(admin)/crm/leads/page'))
const Quotes = lazy(() => import('@/app/(admin)/crm/quotes/page'))
const Analytics = lazy(() => import('@/app/(admin)/analytics/page'))
const MarketingEvents = lazy(() => import('@/app/(admin)/analytics/events/page'))
const Settings = lazy(() => import('@/app/(admin)/settings/page'))

// Auth Routes
const AuthSignIn = lazy(() => import('@/app/(other)/auth/sign-in/page'))
const AuthSignUp = lazy(() => import('@/app/(other)/auth/sign-up/page'))
const ResetPassword = lazy(() => import('@/app/(other)/auth/reset-password/page'))
const LockScreen = lazy(() => import('@/app/(other)/auth/lock-screen/page'))
const Error404 = lazy(() => import('@/app/(other)/error-pages/pages-404/page'))

export type RoutesProps = {
  path: RouteProps['path']
  name: string
  element: RouteProps['element']
  exact?: boolean
}

const initialRoutes: RoutesProps[] = [
  {
    path: '/',
    name: 'root',
    element: <Navigate to="/dashboard" />,
  },
]

// Devmart Admin Routes
const adminRoutes: RoutesProps[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: <Dashboard />,
  },
  {
    path: '/content/blog',
    name: 'Blog',
    element: <Blog />,
  },
  {
    path: '/content/projects',
    name: 'Projects',
    element: <Projects />,
  },
  {
    path: '/content/pages',
    name: 'Pages',
    element: <Pages />,
  },
  {
    path: '/content/media',
    name: 'Media Library',
    element: <Media />,
  },
  {
    path: '/content/testimonials',
    name: 'Testimonials',
    element: <Testimonials />,
  },
  {
    path: '/content/services',
    name: 'Services',
    element: <Services />,
  },
  {
    path: '/content/global-blocks',
    name: 'Global Blocks',
    element: <GlobalBlocks />,
  },
  {
    path: '/crm/leads',
    name: 'Leads',
    element: <Leads />,
  },
  {
    path: '/crm/quotes',
    name: 'Quotes',
    element: <Quotes />,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    element: <Analytics />,
  },
  {
    path: '/analytics/events',
    name: 'Marketing Events',
    element: <MarketingEvents />,
  },
  {
    path: '/settings',
    name: 'Settings',
    element: <Settings />,
  },
]

export const authRoutes: RoutesProps[] = [
  {
    name: 'Sign In',
    path: '/auth/sign-in',
    element: <AuthSignIn />,
  },
  {
    name: 'Sign Up',
    path: '/auth/sign-up',
    element: <AuthSignUp />,
  },
  {
    name: 'Reset Password',
    path: '/auth/reset-password',
    element: <ResetPassword />,
  },
  {
    name: 'Lock Screen',
    path: '/auth/lock-screen',
    element: <LockScreen />,
  },
  {
    name: '404 Error',
    path: '/error-pages/pages-404',
    element: <Error404 />,
  },
]

export const appRoutes = [
  ...initialRoutes,
  ...adminRoutes,
]
