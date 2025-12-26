# Phase 11 — Settings Module Expansion & Stabilization

**Status:** PLANNED — PENDING APPROVAL  
**Phase:** 11  
**Execution:** BLOCKED (do NOT implement without explicit authorization)  
**Last Updated:** 2025-12-26

---

## 1. Executive Summary

Phase 11 addresses two critical issues in the Settings Module:

1. **Infinite Loading Bug** — Settings page never loads due to a React hook dependency issue
2. **Branding Colors Implementation** — Add Primary, Secondary, and Accent color configuration

**Constraints (LOCKED):**
- Fonts are LOCKED (Finibus 1:1 typography, no changes)
- No layout changes
- No Bootstrap modifications
- No new styling systems
- Branding colors apply to FRONTEND ONLY

---

## 2. Root Cause Analysis — Infinite Loading Issue

### 2.1 Symptoms

- Settings page displays infinite loading spinner
- Page never transitions to content view
- No error messages displayed

### 2.2 Root Cause

**File:** `src/app/(admin)/settings/hooks/useSettings.ts`

**Issue:** The `useAdminNotify` hook returns new function references on every render. When `notifyError` is included in the `useCallback` dependency array of `fetchSettings`, it causes the callback to be recreated on every render, triggering the `useEffect` that calls `fetchSettings()`, which then calls `notifyError` on success/error, updating context, causing a re-render, and creating an **infinite loop**.

**Code Evidence (lines 36-58):**

```tsx
const fetchSettings = useCallback(async () => {
  try {
    setIsLoading(true)
    setError(null)
    // ... fetch logic
  } catch (err) {
    // ...
    notifyError(`Error loading settings: ${message}`)  // <-- triggers re-render
  } finally {
    setIsLoading(false)
  }
}, [notifyError])  // <-- notifyError in deps = new ref on every render

useEffect(() => {
  fetchSettings()  // <-- calls on every fetchSettings ref change
}, [fetchSettings])
```

### 2.3 Why This Happens

1. `useAdminNotify()` returns `{ notifySuccess, notifyError, ... }`
2. These functions are created fresh on each render (not memoized)
3. `fetchSettings` depends on `notifyError` → new reference on each render
4. `useEffect` depends on `fetchSettings` → runs on each render
5. Loop: render → new notifyError → new fetchSettings → useEffect runs → isLoading changes → render

---

## 3. Proposed Fix — Infinite Loading

### 3.1 Solution: Use Ref Pattern

Replace dependency on `notifyError`/`notifySuccess` with refs that don't trigger re-renders:

```tsx
// Store notify functions in refs to avoid dependency issues
const notifySuccessRef = useRef(notifySuccess)
const notifyErrorRef = useRef(notifyError)

// Update refs on each render (but don't cause re-execution)
useEffect(() => {
  notifySuccessRef.current = notifySuccess
  notifyErrorRef.current = notifyError
})

const fetchSettings = useCallback(async () => {
  try {
    setIsLoading(true)
    setError(null)
    // ... fetch logic
  } catch (err) {
    notifyErrorRef.current(`Error loading settings: ${message}`)
  } finally {
    setIsLoading(false)
  }
}, [])  // <-- empty deps, refs handle notification

useEffect(() => {
  fetchSettings()
}, [fetchSettings])
```

### 3.2 Files Affected

| File | Change |
|------|--------|
| `src/app/(admin)/settings/hooks/useSettings.ts` | Fix dependency loop using ref pattern |

### 3.3 Acceptance Criteria

- [ ] Settings page loads without infinite spinner
- [ ] Settings data displays correctly in all tabs
- [ ] Save functionality works
- [ ] Success/error notifications still appear
- [ ] No regressions in other Admin modules using `useAdminNotify`

---

## 4. Branding Colors Implementation Plan

### 4.1 Current State

**Database (`settings` table):**

| Key | Category | Value | Status |
|-----|----------|-------|--------|
| `logo_media_id` | branding | (empty) | ✅ EXISTS |
| `favicon_media_id` | branding | (empty) | ✅ EXISTS |
| `primary_color` | branding | — | ❌ MISSING |
| `secondary_color` | branding | — | ❌ MISSING |
| `accent_color` | branding | — | ❌ MISSING |

**Admin UI (`BrandingSettingsTab.tsx`):**
- Logo picker: ✅ EXISTS
- Favicon picker: ✅ EXISTS
- Color pickers: ❌ PLACEHOLDER ("Coming Soon" card)

**Frontend:**
- Uses hardcoded Finibus SCSS variables
- No dynamic color injection from database

### 4.2 Finibus Color Reference (Defaults)

From Finibus SCSS (`_variables.scss`):

| Token | Value | Purpose |
|-------|-------|---------|
| `$theme-color` | `#D90A2C` | Primary brand color (red) |
| `$black` | `#17161A` | Secondary / headings |
| `$heading-color` | `#17161A` | Heading text |

**Proposed Defaults:**

| Key | Default Value | Purpose |
|-----|---------------|---------|
| `primary_color` | `#D90A2C` | Primary brand color (Finibus $theme-color) |
| `secondary_color` | `#17161A` | Secondary color (Finibus $black) |
| `accent_color` | `#F7941D` | Accent color (orange accent) |

### 4.3 Database Changes Required

**Migration SQL:**

```sql
-- Add branding color keys to settings table
INSERT INTO public.settings (key, value, category, description)
VALUES
  ('primary_color', '#D90A2C', 'branding', 'Primary brand color (hex)'),
  ('secondary_color', '#17161A', 'branding', 'Secondary brand color (hex)'),
  ('accent_color', '#F7941D', 'branding', 'Accent color (hex)')
ON CONFLICT (key) DO NOTHING;
```

### 4.4 Admin UI Changes Required

**File:** `src/app/(admin)/settings/components/BrandingSettingsTab.tsx`

**Changes:**
1. Remove "Coming Soon" placeholder card
2. Add 3 color picker inputs using native HTML `<input type="color">`
3. Wire to existing `onChange` handler pattern

**Interface Update (`BrandingSettingsTabProps`):**

```tsx
interface BrandingSettingsTabProps {
  values: {
    logo_media_id: string
    favicon_media_id: string
    primary_color: string      // NEW
    secondary_color: string    // NEW
    accent_color: string       // NEW
  }
  onChange: (key: string, value: string) => void
}
```

**File:** `src/app/(admin)/settings/page.tsx`

**Changes:**
1. Add `primary_color`, `secondary_color`, `accent_color` to `FormValues` interface
2. Add to `INITIAL_VALUES`
3. Add to `useEffect` form population
4. Pass to `BrandingSettingsTab`

### 4.5 Frontend Color Consumption

**New File:** `apps/public/src/hooks/useBrandingColors.ts`

**Purpose:** Fetch branding colors from `settings` table and inject as CSS custom properties.

**Implementation Pattern:**

```tsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const FALLBACK_COLORS = {
  primary: '#D90A2C',
  secondary: '#17161A',
  accent: '#F7941D',
}

export const useBrandingColors = () => {
  const [colors, setColors] = useState(FALLBACK_COLORS)

  useEffect(() => {
    const fetchColors = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['primary_color', 'secondary_color', 'accent_color'])

      if (!error && data) {
        const colorMap = data.reduce((acc, { key, value }) => {
          if (key === 'primary_color' && value) acc.primary = value
          if (key === 'secondary_color' && value) acc.secondary = value
          if (key === 'accent_color' && value) acc.accent = value
          return acc
        }, { ...FALLBACK_COLORS })
        
        setColors(colorMap)
      }
    }

    fetchColors()
  }, [])

  // Inject CSS custom properties
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', colors.primary)
    document.documentElement.style.setProperty('--secondary-color', colors.secondary)
    document.documentElement.style.setProperty('--accent-color', colors.accent)
  }, [colors])

  return colors
}
```

**Integration Point:**

```tsx
// In apps/public/src/App.tsx or layout component
import { useBrandingColors } from './hooks/useBrandingColors'

function App() {
  useBrandingColors()  // Injects CSS vars on mount
  // ...
}
```

### 4.6 Data Flow Diagram

```
┌──────────────────────┐
│   Admin Settings UI  │
│  (BrandingSettingsTab) │
└──────────┬───────────┘
           │ onChange → updateSettings
           ▼
┌──────────────────────┐
│   settings table     │
│   (Supabase)         │
│  primary_color       │
│  secondary_color     │
│  accent_color        │
└──────────┬───────────┘
           │ SELECT
           ▼
┌──────────────────────┐
│ useBrandingColors()  │
│ (Public Frontend)    │
└──────────┬───────────┘
           │ setProperty
           ▼
┌──────────────────────┐
│  CSS Custom Props    │
│  :root {             │
│    --theme-color     │
│    --secondary-color │
│    --accent-color    │
│  }                   │
└──────────────────────┘
```

---

## 5. Risk Analysis

### 5.1 What Could Break If Implemented Incorrectly

| Risk | Impact | Mitigation |
|------|--------|------------|
| Infinite loop not fixed | Settings page unusable | Thorough testing of ref pattern |
| CSS vars override Finibus styles incorrectly | Visual breakage on public site | Use exact Finibus variable names |
| Color picker changes not persisting | Data loss | Test save/reload cycle |
| Empty color values causing CSS issues | Broken styling | Fallback values always applied |
| Font or typography accidentally changed | Template parity violation | LOCKED: No typography changes |

### 5.2 What Must NOT Be Touched

| Item | Reason |
|------|--------|
| Finibus typography/fonts | LOCKED — 1:1 parity required |
| Finibus layout structure | LOCKED — no modifications |
| Bootstrap configuration | LOCKED — no customizations |
| SCSS architecture | LOCKED — no file restructuring |
| Other Admin modules | Scope limited to Settings only |
| `homepage_settings` table | Phase 8 LOCKED |
| `global_blocks` table | Phase 9 scope, not Settings |

---

## 6. Verification Checklist

### 6.1 Post-Implementation Testing

**Infinite Loop Fix:**
- [ ] Settings page loads without infinite spinner
- [ ] All 4 tabs (General, SEO, Social, Branding) display correctly
- [ ] Existing settings values populate correctly
- [ ] Save button works
- [ ] Success notification appears on save
- [ ] Error notification appears on failure
- [ ] No console errors during normal operation

**Branding Colors:**
- [ ] 3 color keys exist in database with defaults
- [ ] Admin Branding tab shows 3 color pickers
- [ ] Color changes persist to database
- [ ] Frontend fetches colors without error
- [ ] CSS custom properties injected on `:root`
- [ ] Public site renders with DB colors (or fallbacks)
- [ ] No typography changes on public site
- [ ] No layout changes on public site

**Regression Testing:**
- [ ] All other Admin modules still work
- [ ] Auth flow unaffected
- [ ] Homepage dynamic wiring unaffected
- [ ] About page wiring unaffected
- [ ] Contact form still works

---

## 7. Step-by-Step Implementation Order

### Step 0 — Restore Point (MANDATORY)

Create: `docs/restore-points/Restore_Point_Phase_11_Settings_Start.md`

Contents:
- Document current state of `useSettings.ts`
- Document current Settings page behavior (infinite loop)
- Document missing branding color keys

### Step 1 — Fix Infinite Loop (Admin)

1. Update `src/app/(admin)/settings/hooks/useSettings.ts`
2. Apply ref pattern for `notifyError` and `notifySuccess`
3. Remove from `useCallback` dependency arrays
4. Verify Settings page loads

### Step 2 — Add Database Keys (Migration)

1. Create migration to INSERT 3 branding color keys
2. Execute migration
3. Verify keys exist with default values

### Step 3 — Update Admin UI (Branding Tab)

1. Update `BrandingSettingsTab.tsx` with color pickers
2. Update `page.tsx` with new FormValues
3. Test save/reload cycle

### Step 4 — Frontend Color Hook (Public)

1. Create `apps/public/src/hooks/useBrandingColors.ts`
2. Integrate in `App.tsx` or root layout
3. Test CSS variable injection

### Step 5 — Documentation Updates

1. Update `docs/Tasks.md` — Phase 11 status
2. Update `docs/Frontend.md` — Branding color flow
3. Update `docs/Backend.md` — New settings keys
4. Update `docs/Architecture.md` — Admin → DB → Frontend flow

### Step 6 — Verification

Run full verification checklist (Section 6.1)

---

## 8. Files Affected (Complete List)

### Admin App

| File | Change Type |
|------|-------------|
| `src/app/(admin)/settings/hooks/useSettings.ts` | FIX: Infinite loop |
| `src/app/(admin)/settings/page.tsx` | UPDATE: FormValues + initial values |
| `src/app/(admin)/settings/components/BrandingSettingsTab.tsx` | UPDATE: Add color pickers |

### Public App

| File | Change Type |
|------|-------------|
| `apps/public/src/hooks/useBrandingColors.ts` | NEW: Branding colors hook |
| `apps/public/src/App.tsx` | UPDATE: Integrate useBrandingColors |

### Database

| Object | Change Type |
|--------|-------------|
| `settings` table | INSERT: 3 new rows |

### Documentation

| File | Change Type |
|------|-------------|
| `docs/Tasks.md` | UPDATE: Phase 11 status |
| `docs/Frontend.md` | UPDATE: Branding color flow |
| `docs/Backend.md` | UPDATE: New settings keys |
| `docs/Architecture.md` | UPDATE: Color flow diagram |
| `docs/restore-points/Restore_Point_Phase_11_Settings_Start.md` | NEW |

---

## 9. Guardian Rules Compliance

| Rule | Status |
|------|--------|
| Fonts LOCKED | ✅ No typography changes |
| Layout LOCKED | ✅ No layout modifications |
| No Bootstrap changes | ✅ No Bootstrap customization |
| No new styling systems | ✅ Uses CSS custom properties only |
| Finibus color architecture preserved | ✅ Uses Finibus variable names |
| Admin-only color editing | ✅ Changes in Admin, consumed by Frontend |

---

## 10. Approval Required

**This document is an IMPLEMENTATION PLAN ONLY.**

Execution is BLOCKED until explicit user approval.

**To proceed, the user must:**
1. Review this plan
2. Provide explicit GO authorization
3. Confirm scope (infinite loop fix + branding colors)

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-26 | Implementation Agent | Initial plan (documentation only) |
