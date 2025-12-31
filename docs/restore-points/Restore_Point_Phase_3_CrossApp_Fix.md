# Restore Point: Phase 3 — Cross-App Import Bug Fix

**Created:** 2025-12-31  
**Type:** Stability Fix  
**Status:** Pre-Implementation

---

## Issue Description

`BlogDetailsSeo.tsx` in the public app imports `resolveSeoFallbacks` from the admin app using cross-app path:

```typescript
import { resolveSeoFallbacks, generateCanonicalUrl } from '../../../../../../src/lib/seo/resolveSeoFallbacks';
```

This violates the architectural boundary between public and admin apps and causes module resolution issues.

---

## Pre-Fix State

| Component | Status |
|-----------|--------|
| `apps/public/src/components/pages/blogDetails/BlogDetailsSeo.tsx` | ❌ Imports from admin app |
| `apps/public/src/lib/seo/resolveSeoFallbacks.ts` | ❌ Does not exist |
| Blog details pages | ❌ Blank screen (import failure) |

---

## Fix Applied

1. **Created:** `apps/public/src/lib/seo/resolveSeoFallbacks.ts`
   - Copied from `src/lib/seo/resolveSeoFallbacks.ts`
   - Independent copy for public app

2. **Modified:** `apps/public/src/components/pages/blogDetails/BlogDetailsSeo.tsx`
   - Updated import path to use local public app copy
   - From: `../../../../../../src/lib/seo/resolveSeoFallbacks`
   - To: `../../../lib/seo/resolveSeoFallbacks`

---

## Files Created

- `apps/public/src/lib/seo/resolveSeoFallbacks.ts`

## Files Modified

- `apps/public/src/components/pages/blogDetails/BlogDetailsSeo.tsx` (import path only)

---

## Post-Fix State

| Component | Status |
|-----------|--------|
| `BlogDetailsSeo.tsx` | ✅ Imports from public app |
| `resolveSeoFallbacks.ts` | ✅ Exists in public app |
| Blog details pages | ✅ Renders correctly |
| Meta tags | ✅ Present in page source |

---

## Rollback Instructions

If rollback is needed:

1. Delete `apps/public/src/lib/seo/resolveSeoFallbacks.ts`
2. Revert `BlogDetailsSeo.tsx` import to cross-app path (not recommended)

**Note:** Rollback will re-introduce the blank screen issue. Forward-fix is preferred.

---

## Guardian Rules Compliance

- ✅ No layout changes
- ✅ No styling changes
- ✅ No schema changes
- ✅ No route changes
- ✅ No URL normalization
- ✅ Minimal code change (import path only)
