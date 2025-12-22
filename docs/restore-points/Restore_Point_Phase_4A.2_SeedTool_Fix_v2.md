# Restore Point: Phase 4A.2 — Media Seed Tool Fix v2

**Created:** 2025-12-22  
**Updated:** 2025-12-22 (Final Fix Applied)  
**Status:** Fix Applied  
**Phase:** 4A.2 — Media Seed Tool Diagnosis + Fix

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

---

## Root Causes Identified

| Issue | Root Cause |
|-------|------------|
| Storage UPDATE blocked | Policy: `(auth.uid())::text = (storage.foldername(name))[1]` but files use `finibus/...` paths |
| 0 DB rows | Exception from storage update prevents DB insert |
| Seed tool incompatible with RLS | `uploaded_by: null` doesn't satisfy policy |

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

4. **Storage stats logged**
   - Console shows: uploaded count, skipped count

---

## Files Modified

- `src/app/(admin)/content/media/components/MediaSeedTool.tsx`
- `storage.objects` RLS policy (new: "Admins can update media files")
- `docs/Backend.md`
- `docs/Architecture.md`

---

## Rollback Instructions

If fixes fail:
1. Drop storage UPDATE policy: `DROP POLICY "Admins can update media files" ON storage.objects;`
2. Drop media INSERT policy: `DROP POLICY "Admins can insert media" ON public.media;`
3. Revert MediaSeedTool.tsx to previous version
