# Restore Point: Phase 11E — Wave 1

**Created:** 2025-12-27  
**Phase:** 11E — CTA Gradients (Pattern A)  
**Wave:** 1 of N  
**Status:** PRE-EXECUTION

---

## Purpose

Introduce Devmart-branded CTA gradients using Pattern A (primary → darker primary) for 4 CTA tab/nav-pill selectors.

---

## Governance Clarification

The variable `$theme-color-dark` introduced in `_variables.scss` is:

- A **Phase 11E–SCOPED** derived token
- Intended **ONLY** for Pattern A gradients
- **NOT** a general-purpose color token
- **NOT** reusable outside Phase 11E without explicit authorization

---

## Planned Selectors (4 total)

| # | File | Line | Selector | Current Value |
|---|------|------|----------|---------------|
| 1 | `_project_page.scss` | 46 | `.project-filter-tab li.active` | `linear-gradient(90deg, #D90A2C 1.05%, #730000 100%)` |
| 2 | `_project_page.scss` | 50 | `.project-filter-tab li:hover` | `linear-gradient(90deg, #D90A2C 1.05%, #730000 100%)` |
| 3 | `_service_page.scss` | 183 | `.nav-pills .nav-link:hover` | `linear-gradient(90deg, #D90A2C 1.05%, #730000 100%) !important` |
| 4 | `_service_page.scss` | 190 | `.nav-pills .nav-link.active` | `linear-gradient(90deg, #D90A2C 1.05%, #730000 100%) !important` |

---

## Proposed Change (Pattern A)

**Before:**
```scss
background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%);
```

**After:**
```scss
background: linear-gradient(90deg, var(--theme-color, $theme-color) 1.05%, var(--theme-color-dark, $theme-color-dark) 100%);
```

---

## Variable Addition

**File:** `apps/public/src/assets/sass/_variables.scss`

**Addition (after line 8):**
```scss
$theme-color-dark: darken($theme-color, 25%);
```

**Scope:** Phase 11E ONLY — not a general-purpose token.

---

## Rollback Instructions

### Per Selector Rollback

**Selector 1 (`_project_page.scss:46`):**
```scss
// Restore to:
background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%);
```

**Selector 2 (`_project_page.scss:50`):**
```scss
// Restore to:
background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%);
```

**Selector 3 (`_service_page.scss:183`):**
```scss
// Restore to:
background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%) !important;
```

**Selector 4 (`_service_page.scss:190`):**
```scss
// Restore to:
background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%) !important;
```

### Variable Rollback

**File:** `apps/public/src/assets/sass/_variables.scss`

Remove line:
```scss
$theme-color-dark: darken($theme-color, 25%);
```

---

## Files Affected

| File | Action |
|------|--------|
| `apps/public/src/assets/sass/_variables.scss` | ADD `$theme-color-dark` |
| `apps/public/src/assets/sass/_project_page.scss` | MODIFY (lines 46, 50) |
| `apps/public/src/assets/sass/_service_page.scss` | MODIFY (lines 183, 190) |

---

## Verification Routes

- `/project` — Filter tabs
- `/service` — Nav pills

---

## Guardian Rules (Enforced)

- ✅ Fonts LOCKED
- ✅ No admin SCSS
- ✅ No hero/overlay gradients
- ✅ No pseudo-elements
- ✅ No alpha-hex colors
- ✅ No radial gradients
- ✅ No refactors
- ✅ No scope creep
