# Architecture Documentation

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized

---

## Overview

This document outlines the architecture decisions and validation requirements for the Devmart project.

---

## Project Structure

- **Public Frontend:** Finibus template (apps/public or src/)
- **Admin Backend:** Darkone template (apps/admin)
- **Database:** Supabase
- **Authentication:** Supabase Auth (planned, demo auth currently active)

---

## Runtime Validation

### Clean-Environment Testing Requirement

**Mandatory for acceptance:** All runtime validation must be performed in a clean environment before results are accepted.

#### Required Test Environments

1. **Incognito mode** (all extensions disabled)
2. **Clean browser profile** (no extensions, fresh cache)
3. **Lovable Preview** (isolated sandbox)

#### Validation Criteria

- **PASS:** 0 errors, 0 warnings in clean environments
- **External/Out of Scope:** Errors originating from `contentScript.js` or other extension scripts
- **FAIL:** Any error originating from application code (`src/`, `apps/`)

#### Error Attribution Process

1. Capture error in normal browser
2. Reproduce in Incognito mode
3. If error disappears → External (browser extension)
4. If error persists → Application bug (requires fix)

### Stability Fixes Applied (2025-12-27)

**Public App:**
- Header.tsx: Fixed `/blog-details` → `/blog` (route was undefined)
- Footer.tsx: Fixed 4x placeholder `#` links → `/commingsoon`

**Admin App:**
- useMediaLibrary.ts: Applied useRef pattern for `notifySuccess`/`notifyError`
- useGlobalBlocks.ts: Applied useRef pattern, removed unstable deps from `useCallback` arrays

**Result:** All fixes are wiring/stability only, no new features added.

---

## Template Rules

### Finibus (Public Frontend)
- 100% 1:1 template parity required
- No modifications to Bootstrap
- No SCSS refactors
- No token changes

### Darkone (Admin Backend)
- 100% 1:1 template parity required
- Demo auth remains active (Supabase auth planned)
- Dashboard layout and sidebar preserved

---

## Phase 11B — Branding Settings (2025-12-27)

**Status:** ✅ **COMPLETE**

### Scope
- Admin can manage theme colors via Settings → Branding tab
- Color keys: `primary_color`, `secondary_color`, `accent_color`
- Public frontend color injection: **NOT IMPLEMENTED** (requires explicit authorization)

### Settings Flow Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Admin Settings Page                       │
├─────────────────────────────────────────────────────────────┤
│  FormValues (React state)                                    │
│    ├── general keys (site_name, contact_email, etc.)        │
│    ├── seo keys (default_meta_title, etc.)                  │
│    ├── social keys (facebook_url, etc.)                     │
│    └── branding keys (primary_color, secondary_color, etc.) │
├─────────────────────────────────────────────────────────────┤
│  handleChange(key, value) → updates FormValues + hasChanges │
├─────────────────────────────────────────────────────────────┤
│  handleSave() → updateSettings(updates[])                   │
│    └── supabase.from('settings').update() for each key      │
├─────────────────────────────────────────────────────────────┤
│  fetchSettings() → refreshes FormValues from DB             │
└─────────────────────────────────────────────────────────────┘
```

### Constraints
- **Fonts LOCKED** — No font customization added
- **No SCSS modifications** — UI changes only
- **No layout redesign** — Replaced placeholder content only

### Files Modified
1. `src/app/(admin)/settings/page.tsx` — Added color keys to form state
2. `src/app/(admin)/settings/components/BrandingSettingsTab.tsx` — Added color pickers

### Regression Verification
All Settings tabs (General/SEO/Social/Branding) verified: Save + Persist + 0 errors

---

## Phase 11C — Color Map Contract (2025-12-27)

**Status:** 📋 **DOCUMENTATION ONLY**

### Objective
Define injection strategy for public frontend branding colors with regression-resistant approach.

### Document Reference
- `docs/phase-11/Phase_11C_Color_Map_Contract.md`

### Architecture (Planned — Not Implemented)
```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Admin Panel    │     │    Supabase      │     │  Public Frontend │
│   (Darkone)      │     │    (settings)    │     │    (Finibus)     │
├──────────────────┤     ├──────────────────┤     ├──────────────────┤
│ Color Pickers    │────▶│ primary_color    │────▶│ useBrandingColors│
│ (BrandingTab)    │     │ secondary_color  │     │      ↓           │
│                  │     │ accent_color     │     │ :root CSS vars   │
│                  │     │                  │     │ --theme-color    │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

### Incremental Rollout (Phased)
| Phase | Target | Risk | Status |
|-------|--------|------|--------|
| 11C-1 | CSS variable injection | LOW | ✅ COMPLETE |
| 11C-2 | Solid backgrounds | MEDIUM | Awaiting auth |
| 11C-3 | Gradients, pseudo-elements | HIGH | DEFERRED |

### Phase 11C-1 Implementation (2025-12-27)
```
┌──────────────────────────────────────────────────────────────┐
│                   Public App Startup                          │
├──────────────────────────────────────────────────────────────┤
│  main.tsx                                                     │
│    └── <BrandingProvider>                                     │
│          └── useBrandingColors()                              │
│                ├── Fetch from Supabase: settings table        │
│                │   └── primary_color, secondary_color,        │
│                │       accent_color                           │
│                ├── Inject on :root:                           │
│                │   └── --theme-color, --secondary-color,      │
│                │       --accent-color                         │
│                └── Fallback: Finibus defaults                 │
└──────────────────────────────────────────────────────────────┘
```

### Constraints
- Fonts remain LOCKED
- No SCSS file modifications in Phase 11C-1
- CSS variables available but not consumed by SCSS yet
- Gradients/pseudo-elements deferred to 11C-3

---

## Phase Discipline

- Each phase requires explicit GO / NO-GO approval
- No automatic continuation between phases
- All changes must be documented before execution
