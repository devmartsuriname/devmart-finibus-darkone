# Restore Point: Phase 11 Step 6 — Branding Consumption Layer

**Created:** 2025-01-XX
**Phase:** 11 — Branding Colors
**Step:** 6 — Make Finibus Consume CSS Variables

---

## Purpose

This restore point documents the state before implementing the "consumption layer" that maps Finibus selectors to CSS variables.

---

## Why This Step is Needed

Phase 11 Step 5 successfully:
- Stored branding colors in `settings` table
- Created `useBrandingColors` hook
- Injected CSS variables on `:root`

However, **Finibus does not consume CSS variables**. It uses:
- Hardcoded hex values (`#D90A2C`, `#F7941D`)
- SCSS compile-time variables (`$theme-color`)

Result: CSS variables are injected but UI does not change.

---

## Files to be Modified

### 1. apps/public/src/index.scss
**Before:** Contains custom overrides with hardcoded colors
**After:** Add "BRANDING OVERRIDES" section mapping selectors to CSS variables

### 2. apps/public/src/components/common/WhyChooseUsArea.tsx
**Before:** Inline styles use `#D90A2C` and `#d90a2c80`
**After:** Use `var(--color-primary)` for inline styles

---

## Rollback Instructions

To revert Step 6:

1. **index.scss**: Remove the "BRANDING OVERRIDES" section (lines after original content)
2. **WhyChooseUsArea.tsx**: Restore hardcoded colors:
   - Line 43: `backgroundColor: '#d90a2c80'`
   - Line 52: `backgroundColor: '#D90A2C'`
3. Remove documentation updates from Tasks.md, Frontend.md, Architecture.md

---

## Key Selectors to Override (Minimum Acceptance Set)

1. **Primary buttons**: `.eg-btn`, `.primary-btn1`, `.quote-btn`
2. **Scroll-top**: `.scroll-top.opacity`
3. **Progress bars**: `.CircularProgressbar-path`, `.CircularProgressbar-text`
4. **Inline component styles**: WhyChooseUsArea progress bars

---

## Constraints

- NO new CSS/SCSS files
- NO font changes
- NO Bootstrap custom usage
- NO mass SCSS rewrites
- Minimal, additive changes only

---

## Verification Criteria

- Set Primary Color to `#4be89b` in Admin → Settings → Branding
- At least one primary CTA button visibly changes to green
- Progress bars in "Why Choose Us" section change to green
- No layout regressions
