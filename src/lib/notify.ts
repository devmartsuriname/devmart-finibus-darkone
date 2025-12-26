/**
 * Canonical Admin Notification Wrapper
 * 
 * Phase 10B: Admin Global Text-Only Save Messages
 * 
 * This module enforces text-only notifications (no icons) across all Admin modules.
 * Uses react-toastify with standardized configuration.
 * 
 * USAGE:
 * - Import: import { notifySuccess, notifyError } from '@/lib/notify'
 * - Call: notifySuccess('Message saved') or notifyError('Failed to save')
 * 
 * DO NOT use direct toast.* calls in Admin hooks/components.
 * All notifications should go through this wrapper for consistency.
 */

import { toast, ToastOptions } from 'react-toastify'

/**
 * Base configuration for all notifications
 * - icon: false — No SVG icons, text-only
 * - position: top-right — Consistent placement
 */
const baseConfig: ToastOptions = {
  icon: false,
  position: 'top-right',
}

/**
 * Display a success notification (text-only, top-right)
 * @param message - The success message to display
 */
export const notifySuccess = (message: string): void => {
  toast.success(message, baseConfig)
}

/**
 * Display an error notification (text-only, top-right)
 * @param message - The error message to display
 */
export const notifyError = (message: string): void => {
  toast.error(message, baseConfig)
}

/**
 * Display an info notification (text-only, top-right)
 * @param message - The info message to display
 */
export const notifyInfo = (message: string): void => {
  toast.info(message, baseConfig)
}

/**
 * Display a warning notification (text-only, top-right)
 * @param message - The warning message to display
 */
export const notifyWarning = (message: string): void => {
  toast.warn(message, baseConfig)
}
