/**
 * Canonical Admin Notification Wrapper
 * 
 * Phase 10B: Admin Global Text-Only Save Messages
 * 
 * This module provides the useAdminNotify() hook for text-only notifications
 * across all Admin modules. Uses Bootstrap Toast via useNotificationContext
 * for UX parity with the login success banner.
 * 
 * USAGE:
 * - Import: import { useAdminNotify } from '@/lib/notify'
 * - In hook: const { notifySuccess, notifyError, notifyInfo, notifyWarning } = useAdminNotify()
 * - Call: notifySuccess('Message saved')
 * 
 * DO NOT use direct toast.* calls from react-toastify in Admin hooks/components.
 * All notifications should go through this wrapper for consistency.
 * 
 * FEATURES:
 * - Text-only (no icons)
 * - Top-right placement (matches login banner)
 * - Auto-dismiss after ~2-3 seconds
 * - No scope leakage to Auth routes
 */

import { useNotificationContext } from '@/context/useNotificationContext'

/**
 * Admin notification hook using Bootstrap Toast.
 * Provides UX parity with the login success banner.
 */
export const useAdminNotify = () => {
  const { showNotification } = useNotificationContext()

  /**
   * Display a success notification (green, top-right)
   * @param message - The success message to display
   */
  const notifySuccess = (message: string): void => {
    showNotification({ message, variant: 'success', delay: 3000 })
  }

  /**
   * Display an error notification (red, top-right)
   * @param message - The error message to display
   */
  const notifyError = (message: string): void => {
    showNotification({ message, variant: 'danger', delay: 4000 })
  }

  /**
   * Display an info notification (blue, top-right)
   * @param message - The info message to display
   */
  const notifyInfo = (message: string): void => {
    showNotification({ message, variant: 'info', delay: 3000 })
  }

  /**
   * Display a warning notification (yellow, top-right)
   * @param message - The warning message to display
   */
  const notifyWarning = (message: string): void => {
    showNotification({ message, variant: 'warning', delay: 3000 })
  }

  return { notifySuccess, notifyError, notifyInfo, notifyWarning }
}
