# Phase 13D — System Toggles & Operational Controls

**Status:** 📋 PLANNING COMPLETE — NOT AUTHORIZED FOR EXECUTION  
**Created:** 2026-01-05  
**Phase:** Documentation & Planning Only

---

## 1. Overview

Phase 13D introduces system-level operational controls that allow administrators to safely manage the public frontend state without code deployments. This phase wires **existing frontend routes** to admin-controlled settings, enabling Coming Soon and Maintenance modes.

**CRITICAL CLARIFICATION:** This phase does NOT create new pages. It wires the **existing** `/commingsoon` route to admin toggles.

---

## 2. Existing Frontend Assets (No Changes Needed)

### 2.1 Coming Soon Page — ALREADY EXISTS

| Property | Value |
|----------|-------|
| **Route** | `/commingsoon` |
| **Component** | `apps/public/src/components/pages/commingSoon/CommingSoonPage.tsx` |
| **Layout** | Standalone (no Header/Footer wrapper) |
| **Template** | Finibus original — 1:1 parity maintained |
| **Features** | Countdown timer, email subscription form, social links |

**Route Definition (App.tsx line 137):**
```tsx
<Route path="/commingsoon" element={<CommingSoonPage />} />
```

**This page is NOT being created — it already exists and must remain 1:1 Finibus.**

### 2.2 Maintenance Page — TO BE CREATED

| Property | Value |
|----------|-------|
| **Route** | Conditional rendering (not a dedicated route) |
| **Component** | `apps/public/src/components/pages/maintenance/MaintenancePage.tsx` |
| **Layout** | Standalone (no Header/Footer) |
| **Pattern** | Mirror CommingSoonPage structure |

**Note:** MaintenancePage will be a minimal, static page following Finibus visual patterns. No countdown, no email form — just a maintenance message.

---

## 3. Proposed Settings Keys (5 New Keys)

| Key | Category | Type | Default | Description |
|-----|----------|------|---------|-------------|
| `maintenance_mode` | system | boolean-as-text | `"false"` | Full site offline — shows maintenance page |
| `coming_soon_enabled` | system | boolean-as-text | `"false"` | Redirect all traffic to Coming Soon page |
| `coming_soon_message` | system | text | `""` | Custom message for Coming Soon page |
| `quotes_enabled` | system | boolean-as-text | `"true"` | Enable/disable Quote Wizard submissions |
| `contact_form_enabled` | system | boolean-as-text | `"true"` | Enable/disable Contact Form submissions |

**Storage:** Existing `settings` table (no schema changes).

---

## 4. Priority Order — Mode Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Mode Priority Order                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Priority 1: MAINTENANCE MODE (highest)                      │
│    └── If maintenance_mode = true                            │
│    └── Show: MaintenancePage (new component)                 │
│    └── Block: ALL public routes                              │
│    └── Allow: Admin dashboard (separate app)                 │
│                                                              │
│  Priority 2: COMING SOON MODE                                │
│    └── If coming_soon_enabled = true                         │
│    └── AND maintenance_mode = false                          │
│    └── Show: CommingSoonPage (EXISTING /commingsoon route)   │
│    └── Block: ALL other public routes                        │
│    └── Allow: Admin dashboard (separate app)                 │
│                                                              │
│  Priority 3: NORMAL MODE (default)                           │
│    └── If both modes = false                                 │
│    └── Show: Normal site operation                           │
│    └── All routes accessible                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Key Point:** When Coming Soon is active, users are NOT redirected to `/commingsoon` — instead, the Coming Soon page **replaces** all routes at the App.tsx level. The `/commingsoon` route remains accessible for direct linking.

---

## 5. Architecture — Three Layers

### Layer 1: Database Configuration (Settings Keys)

```sql
-- NO SCHEMA CHANGES — INSERT only into existing settings table
INSERT INTO settings (key, value, category, description) VALUES
  ('maintenance_mode', 'false', 'system', 'Enable maintenance mode for public site'),
  ('coming_soon_enabled', 'false', 'system', 'Show Coming Soon page instead of normal site'),
  ('coming_soon_message', '', 'system', 'Custom message for Coming Soon page'),
  ('quotes_enabled', 'true', 'system', 'Allow quote wizard submissions'),
  ('contact_form_enabled', 'true', 'system', 'Allow contact form submissions')
ON CONFLICT (key) DO NOTHING;
```

### Layer 2: Admin Control UI (Settings → System Tab)

**Location:** New tab in Admin Settings page  
**Pattern:** Existing Darkone Form.Check switch pattern

```
┌─────────────────────────────────────────────────────────────┐
│ Settings                                                     │
├─────────────────────────────────────────────────────────────┤
│ General | SEO | Social | Branding | System                   │
│                          ↑ NEW TAB                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SITE AVAILABILITY                                           │
│  ─────────────────                                           │
│  [●] Maintenance Mode                                        │
│      When enabled, the public site shows a maintenance       │
│      page. Admin dashboard remains accessible.               │
│                                                              │
│  [○] Coming Soon Mode                                        │
│      When enabled, shows Coming Soon page to visitors.       │
│      Maintenance Mode takes priority if both are enabled.    │
│                                                              │
│  Coming Soon Message (optional)                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  FEATURE CONTROLS                                            │
│  ────────────────                                            │
│  [●] Quote Wizard Enabled                                    │
│      Allow visitors to submit quote requests.                │
│                                                              │
│  [●] Contact Form Enabled                                    │
│      Allow visitors to submit contact inquiries.             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Layer 3: Public Frontend Consumption

**File:** `apps/public/src/hooks/usePublicSettings.ts`

**Changes Required:**
1. Add system keys to `PUBLIC_SETTINGS_KEYS` whitelist
2. Add to `PublicSettings` interface
3. Add fallback values (modes disabled, features enabled)

**Conditional Rendering Logic (App.tsx):**

```tsx
// Pseudocode — NOT implementation
function App() {
  const { settings, isLoading } = usePublicSettings();
  
  // Loading state
  if (isLoading) return <LoadingSpinner />;
  
  // Priority 1: Maintenance Mode
  if (settings.maintenance_mode === 'true') {
    return <MaintenancePage />;
  }
  
  // Priority 2: Coming Soon Mode
  if (settings.coming_soon_enabled === 'true') {
    return <CommingSoonPage message={settings.coming_soon_message} />;
  }
  
  // Priority 3: Normal routing
  return (
    <Routes>
      {/* ... existing routes ... */}
    </Routes>
  );
}
```

---

## 6. Feature Toggle Behavior

### 6.1 Quote Wizard Toggle

**File:** `apps/public/src/components/pages/quote/QuoteWizard.tsx`

| Setting Value | Behavior |
|---------------|----------|
| `quotes_enabled = 'true'` | Normal wizard operation |
| `quotes_enabled = 'false'` | Show disabled message, hide form |

**Disabled State UI (within existing component, no layout changes):**
```
┌─────────────────────────────────────────────────────────────┐
│  Quote requests are temporarily unavailable.                 │
│  Please contact us directly at contact@devmart.sr           │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Contact Form Toggle

**File:** `apps/public/src/components/pages/contact/ContactForm.tsx`

| Setting Value | Behavior |
|---------------|----------|
| `contact_form_enabled = 'true'` | Normal form operation |
| `contact_form_enabled = 'false'` | Show disabled message, hide form |

---

## 7. Files to Create (Execution Phase)

| File | Purpose |
|------|---------|
| `src/app/(admin)/settings/components/SystemSettingsTab.tsx` | New settings tab component |
| `apps/public/src/components/pages/maintenance/MaintenancePage.tsx` | Maintenance mode page |

---

## 8. Files to Modify (Execution Phase)

| File | Change |
|------|--------|
| `src/app/(admin)/settings/page.tsx` | Add System tab to navigation |
| `apps/public/src/hooks/usePublicSettings.ts` | Add system keys to whitelist |
| `apps/public/src/App.tsx` | Add conditional mode wrapper |
| `apps/public/src/components/pages/quote/QuoteWizard.tsx` | Add quotes_enabled check |
| `apps/public/src/components/pages/contact/ContactForm.tsx` | Add contact_form_enabled check |

---

## 9. Guardian Rules Compliance

| Rule | Status | Notes |
|------|--------|-------|
| Admin UI 1:1 Darkone | ✅ COMPLIANT | Uses existing Form.Check switch pattern |
| Public UI 1:1 Finibus | ✅ COMPLIANT | Uses existing CommingSoonPage, new MaintenancePage follows pattern |
| No schema changes | ✅ COMPLIANT | INSERT only, no ALTER TABLE |
| No new dependencies | ✅ COMPLIANT | Uses existing react-bootstrap |
| No layout changes | ✅ COMPLIANT | Conditional rendering, not restructuring |
| Existing routes preserved | ✅ COMPLIANT | `/commingsoon` remains accessible |

---

## 10. Explicitly OUT OF SCOPE

| Item | Reason |
|------|--------|
| Notification system changes | Not part of 13D |
| Email notifications when toggles change | External provider (Phase 7D) |
| Scheduled toggle activation (cron) | Feature expansion |
| IP whitelist during maintenance | Feature expansion |
| Preview mode for admins on public site | Feature expansion |
| Custom maintenance/coming soon page styling | Finibus lock |
| Toggle audit logging | Feature expansion |
| Blog comments toggle | Blog features frozen |
| Per-service enable/disable | Scope creep |

---

## 11. Execution Sub-Phases (Proposed)

| Sub-Phase | Description | Status |
|-----------|-------------|--------|
| 13D.1 | Database seeding (5 new settings keys) | ❌ NOT AUTHORIZED |
| 13D.2 | Admin SystemSettingsTab component | ❌ NOT AUTHORIZED |
| 13D.3 | Public settings consumption update | ❌ NOT AUTHORIZED |
| 13D.4 | MaintenancePage component | ❌ NOT AUTHORIZED |
| 13D.5 | Conditional routing wrapper in App.tsx | ❌ NOT AUTHORIZED |
| 13D.6 | Feature toggle integration (Quote/Contact) | ❌ NOT AUTHORIZED |
| 13D.7 | Verification & documentation | ❌ NOT AUTHORIZED |

---

## 12. Verification Criteria (For Execution Phase)

- [ ] All 5 system settings appear in Admin Settings → System tab
- [ ] Toggle switches follow Darkone Form.Check pattern
- [ ] Maintenance Mode shows MaintenancePage on public site
- [ ] Coming Soon Mode shows existing CommingSoonPage on public site
- [ ] Maintenance Mode takes priority over Coming Soon Mode
- [ ] `/commingsoon` route remains directly accessible
- [ ] Quote Wizard shows disabled state when quotes_enabled=false
- [ ] Contact Form shows disabled state when contact_form_enabled=false
- [ ] Admin dashboard remains accessible in all modes
- [ ] No console errors in any mode
- [ ] All toggles default to "safe" state (features enabled, modes disabled)

---

## 13. Rollback Strategy

**If issues arise during execution:**

1. **Database rollback:**
   ```sql
   DELETE FROM settings WHERE key IN (
     'maintenance_mode', 
     'coming_soon_enabled', 
     'coming_soon_message', 
     'quotes_enabled', 
     'contact_form_enabled'
   );
   ```

2. **Code rollback:** Revert to documented restore point

3. **No schema rollback needed:** INSERT only

---

## 14. Status

**Phase 13D Status:** 📋 PLANNING COMPLETE — NOT AUTHORIZED FOR EXECUTION

**HARD STOP:** Await explicit authorization before any implementation.

---

## 15. Summary

Phase 13D wires the **existing** `/commingsoon` route and a new MaintenancePage to admin-controlled settings, enabling safe operational control without code deployments. The priority order (Maintenance > Coming Soon > Normal) ensures predictable behavior. All changes follow existing patterns with no schema modifications.

**Next Step:** Await authorization for Phase 13D execution sub-phases.
