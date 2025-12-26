# Restore Point — Testimonials Module Stability Fix

**Created:** 2025-12-26  
**Phase:** Admin Stability Recovery  
**Module:** Testimonials  
**Status:** Pre-fix snapshot

---

## Summary

This restore point documents the state of the Testimonials module BEFORE applying the useRef stabilization pattern to fix unstable `useCallback` dependencies.

---

## Root Cause Confirmed

**Issue:** `notifySuccess` and `notifyError` from `useAdminNotify()` are unstable references that change on every render, causing `useCallback` functions to be recreated unnecessarily.

**Affected Functions (3 total):**
1. `createTestimonial` — line 113: `[fetchTestimonials, notifySuccess, notifyError]`
2. `updateTestimonial` — line 153: `[fetchTestimonials, notifySuccess, notifyError]`
3. `deleteTestimonial` — line 175: `[fetchTestimonials, notifySuccess, notifyError]`

---

## Files Modified

| File | Action |
|------|--------|
| `src/app/(admin)/content/testimonials/hooks/useTestimonials.ts` | Apply useRef pattern |

---

## Original Code Snapshot

### `useTestimonials.ts` — Key Sections

**Line 1 (imports):**
```tsx
import { useState, useEffect, useCallback } from 'react'
```

**Lines 36-41 (hook setup):**
```tsx
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { notifySuccess, notifyError } = useAdminNotify()
```

**Lines 104, 109 (createTestimonial notify calls):**
```tsx
notifySuccess('Testimonial created successfully')
// ...
notifyError(`Error creating testimonial: ${message}`)
```

**Line 113 (createTestimonial deps):**
```tsx
}, [fetchTestimonials, notifySuccess, notifyError])
```

**Lines 144, 149 (updateTestimonial notify calls):**
```tsx
notifySuccess('Testimonial updated successfully')
// ...
notifyError(`Error updating testimonial: ${message}`)
```

**Line 153 (updateTestimonial deps):**
```tsx
}, [fetchTestimonials, notifySuccess, notifyError])
```

**Lines 166, 171 (deleteTestimonial notify calls):**
```tsx
notifySuccess('Testimonial deleted successfully')
// ...
notifyError(`Error deleting testimonial: ${message}`)
```

**Line 175 (deleteTestimonial deps):**
```tsx
}, [fetchTestimonials, notifySuccess, notifyError])
```

---

## Fix Applied

1. Add `useRef` to imports
2. Create `notifySuccessRef` and `notifyErrorRef` with sync `useEffect`
3. Replace all `notifySuccess(...)` → `notifySuccessRef.current(...)`
4. Replace all `notifyError(...)` → `notifyErrorRef.current(...)`
5. Remove `notifySuccess, notifyError` from all dependency arrays

---

## Rollback Procedure

If fix fails:
1. Revert `useTestimonials.ts` to original code (restore the dependency arrays and direct notify calls)
2. Re-test module functionality
3. Report failure with specific error

---

## Verification Checklist

- [ ] Modal opens without error
- [ ] Data loads correctly
- [ ] Continuous typing works (no focus loss)
- [ ] Save triggers once and completes
- [ ] Data persists (close → reopen shows saved data)
- [ ] No duplicate network requests
- [ ] No console errors
