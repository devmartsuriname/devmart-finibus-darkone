# Restore Point — Phase 11 Step 4: Public Branding Hook

**Created:** 2025-12-26  
**Phase:** 11 — Settings Module  
**Step:** 4 — Public `useBrandingColors` Hook  
**Status:** Pre-Implementation Snapshot

---

## Purpose

This restore point captures the state before creating the `useBrandingColors` hook in the public app (apps/public).

---

## State Before Implementation

### Database

Branding color keys exist in `settings` table (added in Step 2):
- `primary_color` = `#D90A2C` (category: branding)
- `secondary_color` = `#17161A` (category: branding)
- `accent_color` = `#F7941D` (category: branding)

### Admin (Step 3 Complete)

- `BrandingSettingsTab.tsx` — Color pickers implemented
- `page.tsx` — Color keys in FormValues + INITIAL_VALUES
- Settings save flow functional

### Public App (apps/public)

**Existing hooks (unchanged):**
- `usePublicSettings.ts` — Contact/footer settings
- `useHomepageSettings.ts` — Homepage blocks
- `useAboutPageSettings.ts` — About page blocks
- Other entity hooks (services, projects, blog, testimonials)

**New file to create:**
- `apps/public/src/hooks/useBrandingColors.ts`

---

## Scope of Step 4

| Action | Status |
|--------|--------|
| Create `useBrandingColors.ts` | ⏳ To implement |
| Hex validation with fallbacks | ⏳ To implement |
| Return stable object | ⏳ To implement |
| No CSS injection (Step 5) | ✅ Deferred |
| No UI changes | ✅ N/A |
| No Admin changes | ✅ N/A |

---

## Guardian Rules (Verified)

- ❌ No font changes (Finibus 1:1 locked)
- ❌ No layout changes
- ❌ No Bootstrap usage
- ❌ No custom CSS/SCSS
- ❌ No Admin code touched
- ❌ No new dependencies
- ✅ Public app only
- ✅ Additive hook only

---

## Rollback Instructions

If issues occur:
1. Delete `apps/public/src/hooks/useBrandingColors.ts`
2. No other files affected in Step 4
