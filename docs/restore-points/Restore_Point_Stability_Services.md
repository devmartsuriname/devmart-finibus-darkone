# Restore Point: Services Module Stability Fix

**Created:** 2025-12-26  
**Phase:** Admin Stability Recovery  
**Status:** Pre-Fix Baseline  

---

## Purpose

Restore point before applying useRef stabilization pattern to Services module hooks.

## Root Cause

Unstable `notifySuccess` and `notifyError` function references in `useCallback` dependency arrays causing:
- Infinite re-render loops
- Modal fetch failures
- Duplicate network requests
- Input focus loss during typing

## Files Modified

| File | Change |
|------|--------|
| `src/app/(admin)/content/services/hooks/useServices.ts` | Apply useRef pattern to stabilize notify functions |

## Affected Functions (5 total)

1. `createService` (line 167)
2. `updateService` (line 213)
3. `deleteService` (line 233)
4. `saveProcessSteps` (line 291)
5. `savePricingPlans` (line 351)

## Fix Pattern Applied

```tsx
// Before (unstable)
const { notifySuccess, notifyError } = useAdminNotify()

const someCallback = useCallback(async () => {
  notifySuccess('Done')
}, [notifySuccess, notifyError]) // ❌ Recreates on every render

// After (stable)
const { notifySuccess, notifyError } = useAdminNotify()
const notifySuccessRef = useRef(notifySuccess)
const notifyErrorRef = useRef(notifyError)

useEffect(() => {
  notifySuccessRef.current = notifySuccess
  notifyErrorRef.current = notifyError
})

const someCallback = useCallback(async () => {
  notifySuccessRef.current('Done')
}, []) // ✅ Stable reference
```

## Rollback Procedure

If fix causes issues:

1. Revert `useServices.ts`:
   - Remove `useRef` from imports
   - Remove ref declarations and sync useEffect
   - Replace `notifySuccessRef.current(...)` → `notifySuccess(...)`
   - Replace `notifyErrorRef.current(...)` → `notifyError(...)`
   - Restore original dependency arrays with `notifySuccess, notifyError`

2. Re-test module functionality

3. Report failure with specific error

## Verification Checklist

- [ ] Modal opens without error
- [ ] Data loads correctly
- [ ] Continuous typing works (no focus loss)
- [ ] Save triggers once and completes
- [ ] Data persists (close → reopen shows saved data)
- [ ] No duplicate network requests
- [ ] No console errors
- [ ] Process steps tab works correctly
- [ ] Pricing plans tab works correctly

## Guardian Rules Verified

- ✅ No branding work
- ✅ No layout refactors
- ✅ No font changes
- ✅ No new CSS/SCSS files
- ✅ Root-cause fix only
