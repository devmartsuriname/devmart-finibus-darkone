# Restore Point — Phase 11I: Home About Section Media Fields Fix

**Created:** 2025-12-29
**Phase:** 11I
**Status:** IN PROGRESS

---

## Objective

Add missing media selectors to the Home About section admin modal so all 4 images can be managed from the admin panel.

---

## Files Modified

| File | Action |
|------|--------|
| `src/app/(admin)/content/pages/hooks/useHomepageBlocks.ts` | UPDATE (extend interface) |
| `apps/public/src/hooks/useHomepageSettings.ts` | UPDATE (match interface) |
| `src/app/(admin)/content/pages/components/HomepageSectionEditModal.tsx` | UPDATE (add 4 MediaPickers) |
| `apps/public/src/components/pages/Home/AboutArea.tsx` | UPDATE (wire media URLs) |

---

## Changes Summary

### 1. Interface Updates
Added 4 new media ID fields to `home_about`:
- `image_1_media_id` — Main bottom image (about-bottom.jpg)
- `image_2_media_id` — Top overlay image (about-top.png)
- `mission_icon_media_id` — Mission section icon
- `cto_signature_media_id` — CTO/Founder signature image

### 2. Admin Modal Updates
Replaced single generic MediaPicker with 4 distinct MediaPickers, one for each image slot.

### 3. Frontend Updates
AboutArea.tsx now reads media IDs from database and falls back to static Finibus images when not set.

---

## Rollback Instructions

Revert all files to their state before this phase.
