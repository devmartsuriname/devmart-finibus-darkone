# Restore Point: Phase 11H — Stats Section Admin Wiring Fix

**Created:** 2025-12-29
**Phase:** 11H
**Status:** IN PROGRESS

---

## Objective

Wire the `onSaveStats` prop properly so the Counter/Stats section can be edited and saved from the admin.

---

## Problem Diagnosed

The Stats editor UI exists in `HomepageSectionEditModal` and the `updateStats` function exists in `useHomepageBlocks`, but the prop was never wired through the component chain:

1. `PageEditModal` → `HomepageSectionsTab` (missing `onSaveStats`)
2. `HomepageSectionsTab` → `HomepageSectionEditModal` (missing `onSaveStats`)

---

## Files Modified

| File | Change |
|------|--------|
| `src/app/(admin)/content/pages/components/HomepageSectionsTab.tsx` | Added `onSaveStats` prop + import `StatItem` + pass to modal |
| `src/app/(admin)/content/pages/components/PageEditModal.tsx` | Destructure `updateStats` from hook + pass as `onSaveStats` |
| `docs/Backend.md` | Phase 11H completion entry |

---

## Rollback Instructions

If rollback is needed, revert:
1. Remove `onSaveStats` prop from `HomepageSectionsTab.tsx`
2. Remove `updateStats` destructuring and prop passing from `PageEditModal.tsx`

---

## Verification Checklist

| Check | Expected |
|-------|----------|
| Admin → Pages → Homepage → Edit | Modal opens |
| Sections tab → "3. About + Stats" → Edit | Stats editor visible |
| Change stat value | Field updates |
| Click Save | Toast: "Homepage settings saved" |
| Refresh admin | Stats persist |
| Public homepage | Counter shows updated values |
