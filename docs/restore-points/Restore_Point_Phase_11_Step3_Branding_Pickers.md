# Restore Point — Phase 11 Step 3: Branding Color Pickers

**Created:** 2025-12-26  
**Phase:** 11 — Settings Module  
**Step:** 3 — Admin Branding Color Pickers  
**Status:** Pre-Implementation Snapshot

---

## Purpose

This restore point captures the state before implementing editable color pickers in the Admin Settings → Branding tab.

---

## State Before Implementation

### Database

Color keys exist in `settings` table (added in Step 2):
- `primary_color` = `#D90A2C` (category: branding)
- `secondary_color` = `#17161A` (category: branding)
- `accent_color` = `#F7941D` (category: branding)

### Files to be Modified

1. **`src/app/(admin)/settings/page.tsx`**
   - `FormValues` interface: does NOT include color keys
   - `INITIAL_VALUES`: does NOT include color keys
   - `useEffect`: does NOT populate color keys
   - `BrandingSettingsTab` props: does NOT pass color values

2. **`src/app/(admin)/settings/components/BrandingSettingsTab.tsx`**
   - Props interface: only `logo_media_id` and `favicon_media_id`
   - UI: Shows "Coming Soon" placeholder for theme customization
   - No color picker inputs exist

---

## Changes to Implement

1. Add `primary_color`, `secondary_color`, `accent_color` to `FormValues` interface
2. Add Finibus defaults to `INITIAL_VALUES`
3. Update `useEffect` to populate color values from settings
4. Pass color values to `BrandingSettingsTab`
5. Replace "Coming Soon" placeholder with 3 color picker inputs
6. Use React-Bootstrap Form components (consistent with other tabs)

---

## Guardian Rules (Must Enforce)

- ❌ No font changes (Finibus fonts locked)
- ❌ No layout changes
- ❌ No Bootstrap customization
- ❌ No custom CSS/SCSS
- ✅ Admin-only scope
- ✅ Reuse existing UI patterns

---

## Rollback Instructions

If issues occur, revert to:
- `page.tsx` without color keys in FormValues/INITIAL_VALUES
- `BrandingSettingsTab.tsx` with "Coming Soon" placeholder

Color keys in database can remain (no harm).
