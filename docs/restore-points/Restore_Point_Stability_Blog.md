# Restore Point: Blog Module Stability Fix

**Status:** Draft  
**Phase:** Stability Recovery  
**Execution:** Authorized  
**Created:** 2025-12-26  

---

## Baseline State

**Module:** Blog (Content > Blog Posts)  
**File:** `src/app/(admin)/content/blog/hooks/useBlogPosts.ts`  

**Issue Identified:** Unstable `notifySuccess` and `notifyError` dependencies in `useCallback` arrays

### Affected Lines (Pre-Fix)

| Line | Function | Issue |
|------|----------|-------|
| 125 | `createPost` | `[user?.id, fetchPosts, notifySuccess, notifyError]` |
| 184 | `updatePost` | `[user?.id, fetchPosts, posts, notifySuccess, notifyError]` |
| 206 | `deletePost` | `[fetchPosts, notifySuccess, notifyError]` |

---

## Root Cause

`notifySuccess` and `notifyError` from `useAdminNotify()` are recreated on every render, causing:

- Continuous `useCallback` invalidation
- Modal re-render loops
- Potential fetch retries and focus loss

---

## Fix Applied

**Pattern:** useRef stabilization for notification functions

```typescript
import { useState, useEffect, useCallback, useRef } from 'react'

// Store notify functions in refs
const notifySuccessRef = useRef(notifySuccess)
const notifyErrorRef = useRef(notifyError)

// Sync refs on each render
useEffect(() => {
  notifySuccessRef.current = notifySuccess
  notifyErrorRef.current = notifyError
})

// Use refs in callbacks: notifySuccessRef.current()
// Remove notifySuccess/notifyError from useCallback deps
```

---

## Files Modified

| File | Change |
|------|--------|
| `src/app/(admin)/content/blog/hooks/useBlogPosts.ts` | Applied useRef pattern |

---

## Rollback Instructions

If issues occur, restore `useBlogPosts.ts` to its previous state:
1. Remove `useRef` import addition
2. Remove ref declarations and sync effect
3. Replace `notifySuccessRef.current()` → `notifySuccess()`
4. Replace `notifyErrorRef.current()` → `notifyError()`
5. Restore original dependency arrays

---

## Verification Checklist

- [ ] Modal opens without error
- [ ] Data loads correctly
- [ ] Continuous typing works (no focus loss)
- [ ] Save triggers once and completes
- [ ] Data persists (close → reopen shows saved data)
- [ ] No duplicate network requests
- [ ] No console errors

---

## Guardian Rules Verified

- [x] No branding work
- [x] No Phase 11 color wiring
- [x] No layout refactors
- [x] No font changes
- [x] No new CSS/SCSS files
- [x] Root-cause fix only
