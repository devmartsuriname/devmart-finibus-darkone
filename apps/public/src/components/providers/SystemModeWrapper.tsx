/**
 * SystemModeWrapper
 * 
 * Purpose: Centralized routing guard for operational modes.
 * Wraps the main Routes component to handle Coming Soon redirects.
 * 
 * Phase 13D.3 — System Toggles Wiring
 * 
 * Priority Hierarchy:
 *   1. Maintenance Mode (highest) — DEFERRED to Phase 13D.4
 *   2. Coming Soon Mode — Redirects to /commingsoon
 *   3. Normal Operation (default)
 * 
 * IMPORTANT: Route path is /commingsoon (double "m") — Finibus original spelling
 */

import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSystemSettings } from '../../hooks/useSystemSettings';

interface SystemModeWrapperProps {
  children: React.ReactNode;
}

function SystemModeWrapper({ children }: SystemModeWrapperProps) {
  const { settings, isLoading } = useSystemSettings();
  const location = useLocation();

  // Don't block during initial load - show normal content
  // This prevents flash of Coming Soon during settings fetch
  if (isLoading) {
    return <>{children}</>;
  }

  // Loop prevention: if already on /commingsoon, don't redirect
  // Uses exact match to prevent issues with similar paths
  if (location.pathname === '/commingsoon') {
    return <>{children}</>;
  }

  // ============================================================
  // Priority 1: Maintenance Mode (DEFERRED — Phase 13D.4)
  // ============================================================
  // When maintenance_mode is enabled, site should show a maintenance page.
  // This requires Phase 13D.4 to create MaintenancePage component.
  // For now, maintenance_mode = true will NOT trigger any redirect.
  // Uncomment below when MaintenancePage is authorized and created:
  //
  // if (settings.maintenance_mode) {
  //   // Exclude admin paths if needed (future consideration)
  //   return <Navigate to="/maintenance" replace />;
  // }
  // ============================================================

  // Priority 2: Coming Soon Mode
  // Redirects ALL public routes to /commingsoon when enabled
  if (settings.coming_soon_enabled) {
    return <Navigate to="/commingsoon" replace />;
  }

  // Priority 3: Normal Operation
  return <>{children}</>;
}

export default SystemModeWrapper;
