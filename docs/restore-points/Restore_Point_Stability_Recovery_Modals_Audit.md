# Restore Point — Stability Recovery: Modal Reliability Audit

**Created:** 2025-12-26  
**Phase:** Stability Recovery + Modal Reliability Audit  
**Status:** Pre-Execution Baseline

---

## Trigger

User reported "Failed to fetch About page data" errors in Pages module modals. Multiple modals across modules appeared unreliable.

---

## Baseline State (Before Fix)

### Failing Modals

| Module | Modal | Error | Root Cause |
|--------|-------|-------|------------|
| Pages | Homepage Edit Modal | "Failed to fetch homepage data" | Unstable `notifyError` in useCallback deps |
| Pages | About Edit Modal | "Failed to fetch About page data" | Unstable `notifyError` in useCallback deps |

### Root Cause Analysis

The issue is identical to the one fixed in `useSettings.ts` and `usePages.ts`:

- `notifyError` and `notifySuccess` from `useAdminNotify()` are recreated on every render
- Including them in `useCallback` dependency arrays causes callbacks to be recreated
- This triggers re-renders and cascading fetch loops
- Result: Infinite loops, stuck modals, failed saves

### Files Requiring Fix

| File | Issue | Fix |
|------|-------|-----|
| `src/app/(admin)/content/pages/hooks/useHomepageBlocks.ts` | Lines 174, 198: `notifyError`/`notifySuccess` in deps | Apply ref pattern |
| `src/app/(admin)/content/pages/hooks/useAboutPageBlocks.ts` | Lines 96, 119: `notifyError`/`notifySuccess` in deps | Apply ref pattern |

---

## Fix Pattern (Approved)

Use the same ref pattern already applied to `useSettings.ts` and `usePages.ts`:

```tsx
import { useState, useCallback, useRef, useEffect } from 'react'

// Store notify functions in refs to avoid dependency issues
const notifySuccessRef = useRef(notifySuccess)
const notifyErrorRef = useRef(notifyError)

// Update refs on each render
useEffect(() => {
  notifySuccessRef.current = notifySuccess
  notifyErrorRef.current = notifyError
})

// In useCallback: use notifyErrorRef.current() instead of notifyError()
// And remove notifyError/notifySuccess from deps
```

---

## Files Modified in This Phase

| File | Action |
|------|--------|
| `src/app/(admin)/content/pages/hooks/useHomepageBlocks.ts` | Apply ref pattern |
| `src/app/(admin)/content/pages/hooks/useAboutPageBlocks.ts` | Apply ref pattern |
| `docs/Frontend.md` | Add Admin Stability Checklist |
| `docs/Architecture.md` | Document modal data flow pattern |
| `docs/Tasks.md` | Add Stability Recovery section |
| `docs/Backend.md` | Confirm no schema issues |

---

## Rollback Instructions

If issues occur after these fixes:

1. Revert `useHomepageBlocks.ts` to previous version (remove refs, restore deps)
2. Revert `useAboutPageBlocks.ts` to previous version (remove refs, restore deps)
3. Verify Pages modals return to pre-fix behavior

---

## Guardian Rules Verified

| Rule | Status |
|------|--------|
| No branding work | ✅ Not touching |
| No Phase 11 color wiring | ✅ Not touching |
| No layout refactors | ✅ Not touching |
| No font changes | ✅ Not touching |
| No new CSS/SCSS | ✅ Not touching |
| Root-cause fix only | ✅ Yes — unstable deps |

---

## Verification Checklist (Post-Fix)

| Check | Status |
|-------|--------|
| Pages → Homepage modal opens without error | ⏳ |
| Pages → Homepage → Page Info tab loads | ⏳ |
| Pages → Homepage → Sections tab loads | ⏳ |
| Pages → Homepage → Save works, toast fires | ⏳ |
| Pages → About modal opens without error | ⏳ |
| Pages → About → Page Info tab loads | ⏳ |
| Pages → About → Sections tab loads | ⏳ |
| Pages → About → Save works, toast fires | ⏳ |
| No console errors | ⏳ |
| No infinite loops | ⏳ |
