# Restore Point — Phase 5.4+ Project Details Parity Hotfix

```
Status: PRE-IMPLEMENTATION
Phase: 5.4+ — Project Details Visual Parity Fix
Created: 2025-12-23
```

---

## Problem Statement

The Project Details page displays **stretched/distorted images** because:
1. Square portfolio thumbnails (`portfolio-X.jpg`) were assigned to detail-page slots that require landscape images
2. The Finibus template landscape images (`process-banner.jpg`, `overview-1.jpg`, `overview-2.jpg`) were never added to the Media Library

**Root Cause:** Data assignment error during Phase 5.4+ backfill, NOT a CSS/layout issue.

---

## Scope Boundaries

- **DATA-ONLY FIX**: No CSS, layout, or DOM structure changes
- **apps/public ONLY**: No admin UI changes
- **Finibus 1:1 parity**: Template structure must remain unchanged

---

## Affected Tables

| Table | Issue |
|-------|-------|
| `media` | Missing landscape template images |
| `projects` | Wrong media_id assignments for detail slots |

---

## What Was Wrong

| Field | Wrong Assignment | Correct Requirement |
|-------|-----------------|---------------------|
| `featured_image_media_id` | portfolio-X.jpg (square) | Landscape (~3:1) for hero banner |
| `image_media_id` | portfolio-X.jpg (square) | Landscape for overview section |
| `check_launch_image_media_id` | portfolio-X.jpg (square) | Landscape for check & launch section |

---

## Fix Strategy

1. **Add template landscape images to Media Library**:
   - `process-banner.jpg` → hero/banner
   - `overview-1.jpg` → overview section
   - `overview-2.jpg` → check & launch section

2. **Update project records** to use correct landscape media IDs for detail-page slots

3. **Keep portfolio images for card thumbnails** (listing pages use these correctly)

---

## Verification Checklist

- [ ] Landscape images exist in media table
- [ ] Projects use landscape images for featured_image_media_id, image_media_id, check_launch_image_media_id
- [ ] Project Details page renders without image stretching
- [ ] No layout/DOM changes from template
- [ ] No console errors

---

## Rollback Instructions

If rollback is needed:

```sql
-- Remove added media records (if needed)
DELETE FROM public.media WHERE filename IN ('process-banner.jpg', 'overview-1.jpg', 'overview-2.jpg');

-- Restore original image assignments (portfolio images)
-- Note: This would restore the stretched-image issue
```

---

## Files Changed

| File | Action |
|------|--------|
| `docs/restore-points/Restore_Point_Phase_5_4_Project_Details_Parity_Hotfix.md` | CREATE |
| Supabase migration (media + project updates) | CREATE |
| `docs/Backend.md` | UPDATE (add parity notes) |
| `docs/Architecture.md` | UPDATE (add parity notes) |

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| Finibus UI parity | ✅ Enforced (data-only fix) |
| No CSS/layout changes | ✅ Enforced |
| No custom Bootstrap | ✅ Not applicable |
| Data-only scope | ✅ Enforced |
