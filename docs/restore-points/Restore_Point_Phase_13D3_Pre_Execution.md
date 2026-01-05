# Restore Point — Phase 13D.3 Pre-Execution

**Created:** 2026-01-05  
**Phase:** 13D.3 — Public Settings Consumption + Coming Soon Wiring  
**Status:** PRE-EXECUTION SNAPSHOT

---

## Objective

Capture the current state of public app files before Phase 13D.3 wiring for system toggles.

---

## Route Confirmation

| Property | Value |
|----------|-------|
| Coming Soon Route | `/commingsoon` (double "m") |
| Component Path | `apps/public/src/components/pages/commingSoon/CommingSoonPage.tsx` |
| App.tsx Reference | Line 137: `<Route path="/commingsoon" element={<CommingSoonPage />} />` |

---

## Files to be Created

| File | Purpose |
|------|---------|
| `apps/public/src/hooks/useSystemSettings.ts` | System settings hook |
| `apps/public/src/components/providers/SystemModeWrapper.tsx` | Centralized routing guard |

---

## Files to be Modified

### 1. apps/public/src/App.tsx (176 lines)

**Current State:** Standard routing without system mode wrapper

**Key Lines:**
- Line 24-26: React and router imports
- Line 45: CommingSoonPage import
- Line 131-173: App component with Routes
- Line 137: `/commingsoon` standalone route

**Planned Change:** Import SystemModeWrapper and wrap Routes component

---

### 2. apps/public/src/components/pages/contact/ContactForm.tsx (199 lines)

**Current State:** Form submission without feature guard

**Key Functions:**
- Line 28-91: handleSubmit (DB insert)
- Line 170-175: Submit button

**Planned Change:** Add `useSystemSettings` guard to disable submission when `contact_form_enabled = false`

---

### 3. apps/public/src/components/pages/quote/QuoteWizard.tsx (478 lines)

**Current State:** Full wizard without feature guard

**Key Functions:**
- Line 96-301: Main wizard logic
- Line 160-300: handleQuoteSubmit

**Planned Change:** Add early return with disabled message when `quotes_enabled = false`

---

### 4. apps/public/src/components/pages/commingSoon/CommingSoonPage.tsx (57 lines)

**Current State:** Static text content

**Key Lines:**
- Line 11-15: Static paragraph text

**Planned Change:** Replace static text with `settings.coming_soon_message` fallback

---

## Database Settings Keys (Already Seeded in 13D.1)

| Key | Default Value |
|-----|---------------|
| `maintenance_mode` | `'false'` |
| `coming_soon_enabled` | `'false'` |
| `coming_soon_message` | `''` |
| `quotes_enabled` | `'true'` |
| `contact_form_enabled` | `'true'` |

---

## Rollback Procedure

If issues arise after Phase 13D.3 execution:

1. Delete created files:
   ```bash
   rm apps/public/src/hooks/useSystemSettings.ts
   rm apps/public/src/components/providers/SystemModeWrapper.tsx
   ```

2. Revert modified files to this snapshot:
   - `apps/public/src/App.tsx` — Remove SystemModeWrapper import and wrapper
   - `apps/public/src/components/pages/contact/ContactForm.tsx` — Remove useSystemSettings usage
   - `apps/public/src/components/pages/quote/QuoteWizard.tsx` — Remove useSystemSettings usage
   - `apps/public/src/components/pages/commingSoon/CommingSoonPage.tsx` — Restore static paragraph

3. Database: No rollback needed (settings values remain, just not consumed)

---

## Guardian Rules Verification

| Rule | Pre-Execution Status |
|------|---------------------|
| Admin UI 1:1 Darkone | ✅ No admin changes planned |
| Public UI 1:1 Finibus | ✅ Logic-only changes, no layout/styling |
| No schema changes | ✅ No migrations planned |
| Existing routes preserved | ✅ `/commingsoon` exact route reused |

---

## Execution Authorization

Phase 13D.3 authorized with mandatory corrections:
- Redirect target: `/commingsoon` (exact spelling)
- Loop prevention guard for `/commingsoon`
- Logic-only changes, no UI redesign
- Maintenance mode: DOCUMENTED ONLY (commented code)
