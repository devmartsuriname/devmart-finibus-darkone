import { AuthProvider } from '@/context/useAuthContext'
import { LayoutProvider } from '@/context/useLayoutContext'
import { NotificationProvider } from '@/context/useNotificationContext'
import { ChildrenType } from '@/types/component-props'
import { HelmetProvider } from 'react-helmet-async'

/**
 * Phase 10B: Removed ToastContainer (react-toastify)
 * 
 * Admin notifications now use Bootstrap Toast via useNotificationContext.
 * This ensures:
 * - No scope leakage to Auth routes
 * - UX parity with login success banner
 * - Text-only, top-right placement
 */

const AppProvidersWrapper = ({ children }: ChildrenType) => {
  return (
    <>
      <HelmetProvider>
        <AuthProvider>
          <LayoutProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </LayoutProvider>
        </AuthProvider>
      </HelmetProvider>
    </>
  )
}
export default AppProvidersWrapper
