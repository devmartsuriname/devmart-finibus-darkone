# Restore Point — Phase 11: Settings Module Start

**Created:** 2025-12-26  
**Phase:** 11 — Settings Module Expansion & Stabilization  
**Status:** Pre-Implementation Baseline

---

## Purpose

This restore point captures the state of the Settings Module before Phase 11 execution begins.

---

## Current State (Before Fix)

### Issue Identified

**File:** `src/app/(admin)/settings/hooks/useSettings.ts`

**Problem:** Infinite loading loop caused by `notifyError` being included in the `useCallback` dependency array of `fetchSettings`. Since `notifyError` is recreated on every render, it triggers `fetchSettings` to be recreated, which triggers the `useEffect` that calls it, creating an infinite loop.

**Root Cause (Lines 36–58):**
```tsx
const fetchSettings = useCallback(async () => {
  try {
    // ... fetch logic
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch settings'
    setError(message)
    notifyError(`Error loading settings: ${message}`)  // ← Uses notifyError
  } finally {
    setIsLoading(false)
  }
}, [notifyError])  // ← notifyError in deps causes infinite loop
```

### Missing Database Keys

The `settings` table is missing branding color keys:
- `primary_color` (branding)
- `secondary_color` (branding)
- `accent_color` (branding)

### Placeholder UI

**File:** `src/app/(admin)/settings/components/BrandingSettingsTab.tsx`

Contains "Coming Soon" placeholder instead of color picker inputs.

---

## Proposed Fix (Step 1)

Apply ref pattern to stabilize notification function references:

```tsx
import { useRef } from 'react'

// Store notify functions in refs
const notifySuccessRef = useRef(notifySuccess)
const notifyErrorRef = useRef(notifyError)

// Update refs on each render
useEffect(() => {
  notifySuccessRef.current = notifySuccess
  notifyErrorRef.current = notifyError
})

const fetchSettings = useCallback(async () => {
  // Use refs instead of direct function calls
  notifyErrorRef.current(`Error loading settings: ${message}`)
}, [])  // Empty deps - stable reference
```

---

## Files Affected (Phase 11)

| File | Action |
|------|--------|
| `src/app/(admin)/settings/hooks/useSettings.ts` | FIX: Ref pattern |
| `src/app/(admin)/settings/page.tsx` | UPDATE: Add color keys |
| `src/app/(admin)/settings/components/BrandingSettingsTab.tsx` | UPDATE: Color pickers |
| `apps/public/src/hooks/useBrandingColors.ts` | CREATE |
| `apps/public/src/App.tsx` | UPDATE: Integrate hook |
| `settings` table | INSERT: 3 rows |

---

## Rollback Instructions

If Phase 11 implementation fails:

1. Revert `useSettings.ts` to original state (re-add `notifyError` to deps)
2. Remove any new database rows from `settings` table
3. Restore placeholder in `BrandingSettingsTab.tsx`
4. Remove `useBrandingColors.ts` if created
5. Revert `App.tsx` changes if made

---

## Hard Constraints (ENFORCED)

- ✅ Fonts LOCKED (Finibus 1:1)
- ✅ Layout LOCKED
- ✅ No Bootstrap changes
- ✅ No SCSS restructuring
- ✅ Branding colors FRONTEND ONLY
- ✅ Do NOT touch `homepage_settings`
- ✅ Do NOT touch `global_blocks`

---

## Approval Status

- [x] Documentation reviewed
- [x] Restore point created
- [ ] Step 1 executed (pending)
- [ ] Step 2 executed (pending)
- [ ] Step 3 executed (pending)
- [ ] Step 4 executed (pending)
- [ ] Step 5 executed (pending)
