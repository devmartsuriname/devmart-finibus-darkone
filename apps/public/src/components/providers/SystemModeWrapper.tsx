/**
 * SystemModeWrapper
 * 
 * Purpose: Centralized routing guard for operational modes.
 * Wraps the main Routes component to handle system modes.
 * 
 * Phase 13D.3 — Coming Soon Wiring
 * Phase 13D.4 — Maintenance Mode Implementation
 * 
 * Priority Hierarchy:
 *   1. Maintenance Mode (highest) — Renders MaintenancePage directly
 *   2. Coming Soon Mode — Redirects to /commingsoon
 *   3. Normal Operation (default)
 * 
 * IMPORTANT: Route path is /commingsoon (double "m") — Finibus original spelling
 * 
 * Admin Safety: This wrapper ONLY exists in apps/public.
 * The admin app (apps/admin on port 8080) is completely separate and unaffected.
 */

import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSystemSettings } from '../../hooks/useSystemSettings';
import MaintenancePage from '../pages/maintenance/MaintenancePage';

interface SystemModeWrapperProps {
  children: React.ReactNode;
}

function SystemModeWrapper({ children }: SystemModeWrapperProps) {
  const { settings, isLoading } = useSystemSettings();
  const location = useLocation();

  // Don't block during initial load - show normal content
  // This prevents flash of maintenance/coming-soon during settings fetch
  if (isLoading) {
    return <>{children}</>;
  }

  // ============================================================
  // Priority 1: Maintenance Mode (HIGHEST PRIORITY)
  // ============================================================
  // When maintenance_mode is enabled, render MaintenancePage directly.
  // This bypasses all routing and shows the maintenance message.
  // Note: This only affects the public app (apps/public).
  // Admin app (apps/admin) is completely separate and unaffected.
  if (settings.maintenance_mode) {
    return <MaintenancePage />;
  }
  // ============================================================

  // Loop prevention: if already on /commingsoon, don't redirect
  // Uses exact match to prevent issues with similar paths
  if (location.pathname === '/commingsoon') {
    return <>{children}</>;
  }

  // Priority 2: Coming Soon Mode
  // Redirects ALL public routes to /commingsoon when enabled
  if (settings.coming_soon_enabled) {
    return <Navigate to="/commingsoon" replace />;
  }

  // Priority 3: Normal Operation
  return <>{children}</>;
}

export default SystemModeWrapper;
