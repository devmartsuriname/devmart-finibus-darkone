# Restore Point — Phase 11C-2: Safe Surfaces

**Status:** Pre-Implementation Snapshot  
**Created:** 2025-01-XX  
**Phase:** 11C-2 (Safe Surfaces)  
**Authorization:** Approved per Phase 11C Color Map Contract

---

## Purpose

This document preserves the pre-implementation state of all SCSS files before Phase 11C-2 modifications. If regressions occur, revert to these original patterns.

---

## Scope — Files to Modify

| File | Selectors Affected |
|------|-------------------|
| `apps/public/src/assets/sass/_header.scss` | Lines 73, 77, 125, 129 |
| `apps/public/src/assets/sass/_footer.scss` | Lines 156, 210, 225, 266, 322 |
| `apps/public/src/assets/sass/_common.scss` | Lines 303, 313, 445 |
| `apps/public/src/assets/sass/_contact_page.scss` | Lines 97, 151, 164 |
| `apps/public/src/assets/sass/_blog.scss` | Lines 67, 201 |
| `apps/public/src/assets/sass/_blog_page.scss` | Lines 77, 103-104, 193-194, 199-200, 468-469 |

**Total Selectors:** 17

---

## Explicit "Do Not Touch" Zones

### Cursor Elements (`_common.scss`)
- Line 103: `.cursor { border: 1px solid $theme-color; }`
- Line 117: `.cursor2 { background-color: $theme-color; }`
- Line 126: `.hover { background-color: $theme-color; }`
- Line 154: `.sk-cube { background-color: $theme-color; }`

### Gradient Backgrounds
- `.cmn-btn a` — Uses `linear-gradient()` with hardcoded HEX values

### Text-Stroke Effects
- `.title.special h2 b` — Uses `-webkit-text-stroke: 2px #D90A2C;`
- `.breadcrumb-wrapper h1` — Uses `-webkit-text-stroke: 2px #D90A2C;`

### Progress Bars & Pseudo-Elements
- All `:before` and `:after` with hardcoded HEX (e.g., `#D90A2C`)
- Social media hover backgrounds
- Scroll-top border colors

### Hardcoded HEX Values
- Only `$theme-color` SCSS variable references are modified
- Hardcoded `#D90A2C` values remain unchanged

---

## Pre-Implementation State (Original SCSS Patterns)

### `_header.scss`
```scss
// Line 73
&.active {
    color: $theme-color;
}

// Line 77
&:hover {
    color: $theme-color;
}

// Line 125
&.active {
    color: $theme-color;
}

// Line 129
&:hover {
    color: $theme-color;
    margin-left: 10px;
}
```

### `_footer.scss`
```scss
// Line 156
&:hover {
    color: $theme-color;
    padding-left: 15px;
}

// Line 210
&:hover {
    color: $theme-color;
}

// Line 225
i {
    color: $theme-color;
    font-size: 20px;
}

// Line 266
&:hover {
    color: $theme-color;
}

// Line 322
&:hover {
    color: $theme-color;
}
```

### `_common.scss`
```scss
// Line 303
color: $theme-color;

// Line 313
background-color: $theme-color;

// Line 445
color: $theme-color;
```

### `_contact_page.scss`
```scss
// Line 97
&:hover {
    color: $theme-color;
}

// Line 151
background-color: $theme-color;

// Line 164
border: 2px solid $theme-color;
```

### `_blog.scss`
```scss
// Line 67
background-color: $theme-color;

// Line 201
&:hover {
    color: $theme-color;
}
```

### `_blog_page.scss`
```scss
// Line 77
color: $theme-color;

// Lines 103-104
border: 1px solid $theme-color;
background-color: $theme-color;

// Lines 193-194
border: 1px solid $theme-color;
color: $theme-color;

// Lines 199-200
border: 1px solid $theme-color;
color: $theme-color;

// Lines 468-469
border: 1px solid $theme-color;
background-color: $theme-color;
```

---

## Rollback Instructions

If regressions occur after Phase 11C-2 implementation:

1. **Identify affected file(s)** from the verification report
2. **Revert CSS variable syntax** back to original pattern:
   ```scss
   // REVERT FROM:
   color: var(--theme-color, $theme-color);
   
   // REVERT TO:
   color: $theme-color;
   ```
3. **Test affected routes** in Incognito mode
4. **Document rollback** in this file under "Rollback Log" section
5. **Report to stakeholder** with failure details

---

## Verification Checklist (Post-Implementation)

- [ ] 0 console errors on all routes
- [ ] 0 console warnings on all routes
- [ ] CSS variables appear in DevTools `:root`
- [ ] Hover colors match database values
- [ ] Fallback works when Supabase blocked
- [ ] No visual regressions outside intended selectors
- [ ] No layout shifts

---

## Rollback Log

_(Record any rollbacks here with date and reason)_

| Date | File | Selector | Reason | Reverted By |
|------|------|----------|--------|-------------|
| — | — | — | — | — |

---

## Constraints Enforced

- ✅ Fonts remain LOCKED (no typography changes)
- ✅ No Admin CSS/SCSS changes
- ✅ No new CSS/SCSS files created
- ✅ No gradient/pseudo-element edits
- ✅ No cursor element changes
- ✅ Only `$theme-color` references modified (not hardcoded HEX)
