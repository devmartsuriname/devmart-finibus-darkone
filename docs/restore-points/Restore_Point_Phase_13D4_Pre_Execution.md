# Restore Point — Phase 13D.4 Pre-Execution

**Created:** 2026-01-05  
**Purpose:** Pre-execution snapshot before Phase 13D.4 (Maintenance Mode + Countdown Fields)

---

## Files Snapshotted

### 1. apps/public/src/components/providers/SystemModeWrapper.tsx

**Lines:** 1-65

```typescript
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
```

### 2. Coming Soon Page Location

| Property | Value |
|----------|-------|
| Route | `/commingsoon` |
| Component | `apps/public/src/components/pages/commingSoon/CommingSoonPage.tsx` |
| DateCounter | `apps/public/src/components/pages/commingSoon/DateCounter.tsx` |

### 3. Maintenance Page Directory

**Status:** Does NOT exist (to be created in Phase 13D.4)

```
apps/public/src/components/pages/maintenance/
└── (empty - directory does not exist)
```

### 4. Admin Settings System Tab (src/app/(admin)/settings/components/SystemSettingsTab.tsx)

**Current Fields:**
- Maintenance Mode (toggle)
- Coming Soon Mode (toggle)
- Coming Soon Message (textarea, max 500 chars)
- Quote Wizard Enabled (toggle)
- Contact Form Enabled (toggle)

**Missing Fields (to be added in 13D.4):**
- Coming Soon Countdown Enabled (toggle)
- Coming Soon Countdown Target (datetime input)

### 5. System Settings Keys (Database)

| Key | Value | Category |
|-----|-------|----------|
| maintenance_mode | false | system |
| coming_soon_enabled | false | system |
| coming_soon_message | (empty) | system |
| quotes_enabled | true | system |
| contact_form_enabled | true | system |

---

## Rollback Instructions

If Phase 13D.4 needs to be rolled back:

1. **Delete MaintenancePage component:**
   ```bash
   rm -rf apps/public/src/components/pages/maintenance/
   ```

2. **Revert SystemModeWrapper.tsx:**
   - Remove MaintenancePage import
   - Re-comment the maintenance_mode guard

3. **Revert SystemSettingsTab.tsx:**
   - Remove countdown fields

4. **Revert useSystemSettings.ts:**
   - Remove countdown_enabled and countdown_target from interface and parsing

5. **Revert DateCounter.tsx:**
   - Restore hardcoded 30-day countdown

6. **Remove new settings keys:**
   ```sql
   DELETE FROM public.settings 
   WHERE key IN ('coming_soon_countdown_enabled', 'coming_soon_countdown_target');
   ```

---

## Phase 13D.4 Scope

**Authorized:**
- Create MaintenancePage component (Finibus 1:1 using ErrorPage pattern)
- Wire maintenance_mode as Priority #1 in SystemModeWrapper
- Add countdown fields to Admin Settings > System tab
- Wire countdown to DateCounter (no redesign)

**Not Authorized:**
- Any redesign of CommingSoonPage
- Any redesign of ErrorPage
- Schema changes beyond INSERT
- External notification channels
