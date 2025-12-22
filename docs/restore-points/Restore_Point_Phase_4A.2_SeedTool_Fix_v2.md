# Restore Point: Phase 4A.2 — Media Seed Tool Fix v2

**Created:** 2025-12-22  
**Status:** Pre-Fix Snapshot  
**Phase:** 4A.2 — Media Seed Tool Diagnosis + Fix

---

## Current Bug Symptoms

1. **RLS Policy Violation on INSERT**
   - Error: "new row violates row-level security policy"
   - Root cause: INSERT policy requires `auth.uid() = uploaded_by`, but seed tool sets `uploaded_by: null`

2. **Potential Asset Fetch Failure**
   - Assets at `/seed/finibus/...` may return 400/404
   - Need preflight verification before seeding

3. **No DB Verification**
   - After seeding, no count verification displayed to user

---

## Root Causes Identified

| Issue | Root Cause |
|-------|------------|
| RLS violation on INSERT | `uploaded_by: null` doesn't match `auth.uid()` |
| Missing admin INSERT policy | Only user-owned inserts allowed |
| No preflight check | Asset paths not verified before attempting uploads |

---

## Planned Fixes

1. **Create admin INSERT policy** for `public.media` table
2. **Update MediaSeedTool** to set `uploaded_by` to current user ID
3. **Add preflight asset check** before seeding
4. **Add DB count verification** after seeding completes
5. **Ensure query invalidation** triggers media list refresh

---

## Files to Modify

- `src/app/(admin)/content/media/components/MediaSeedTool.tsx`
- RLS policy on `public.media` table
- `docs/Backend.md`
- `docs/Architecture.md`

---

## Rollback Instructions

If fixes fail:
1. Drop the new admin INSERT policy: `DROP POLICY "Admins can insert media" ON public.media;`
2. Revert MediaSeedTool to previous version (set `uploaded_by: null`)
3. No structural changes to media table required
