# Restore Point: Phase 4A.2 — Media Seed Tool Fix v2

**Created:** 2025-12-22  
**Updated:** 2025-12-22  
**Status:** ✅ VERIFIED COMPLETE  
**Phase:** 4A.2 — Media Library Complete

---

## Final Verification Results

| Check | Result |
|-------|--------|
| Preflight fetch `/seed/finibus/logos/logo.png` | ✅ 200 OK |
| Storage objects in bucket `media` | ✅ 38 files |
| DB rows in `public.media` | ✅ 38 rows |
| Media Library displays files | ✅ Confirmed |
| Route navigation (no blank screens) | ✅ Fixed |
| apps/public untouched | ✅ Confirmed |

---

## Bug Symptoms (Before Fix)

1. **Storage UPDATE RLS Policy Blocking Upserts**
   - Error: "new row violates row-level security policy" on storage.objects UPDATE
   - Root cause: 38 files already exist in storage from previous attempt, but UPDATE policy requires folder path = user UUID

2. **0 Media Rows in Database**
   - Storage upsert fails → exception thrown → DB insert never reached

3. **RLS Policy on public.media**
   - INSERT policy requires `auth.uid() = uploaded_by`
   - Seed tool previously set `uploaded_by: null`

4. **Blank Screens on Navigation**
   - Missing error boundaries
   - Lazy components without Suspense fallbacks

---

## Root Causes Identified

| Issue | Root Cause |
|-------|------------|
| Storage UPDATE blocked | Policy: `(auth.uid())::text = (storage.foldername(name))[1]` but files use `finibus/...` paths |
| 0 DB rows | Exception from storage update prevents DB insert |
| Seed tool incompatible with RLS | `uploaded_by: null` doesn't satisfy policy |
| Blank screens | No error boundaries, missing Suspense fallbacks |

---

## Fixes Applied

1. **Created storage UPDATE policy for admins**
   - Policy: "Admins can update media files" on `storage.objects`
   - Allows admins to update any file in 'media' bucket

2. **Updated MediaSeedTool to check for existing files**
   - Checks if file exists in storage before uploading
   - Skips upload if file exists, only upserts DB row
   - Uses current user.id for `uploaded_by`

3. **DB verification displayed after seeding**
   - Shows "DB rows in media: X" after completion

4. **Error Boundaries + Suspense Fallbacks**
   - Created `ErrorBoundary.tsx` component
   - Created `LoadingFallback.tsx` component
   - Updated `AdminLayout.tsx` with proper error handling
   - Updated `router.tsx` with top-level error boundary

---

## Files Modified

- `src/app/(admin)/content/media/components/MediaSeedTool.tsx`
- `src/components/ErrorBoundary.tsx` (new)
- `src/components/LoadingFallback.tsx` (new)
- `src/layouts/AdminLayout.tsx`
- `src/routes/router.tsx`
- `storage.objects` RLS policy (new: "Admins can update media files")
- `public.media` RLS policy (new: "Admins can insert media")
- `docs/Backend.md`
- `docs/Architecture.md`

---

## Rollback Instructions

If issues arise:
1. Drop storage UPDATE policy: `DROP POLICY "Admins can update media files" ON storage.objects;`
2. Drop media INSERT policy: `DROP POLICY "Admins can insert media" ON public.media;`
3. Revert files to previous versions via git history
