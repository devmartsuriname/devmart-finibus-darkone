# Restore Point — Phase 11F-B (Residual Red Cleanup Completion Wave)

**Created:** 2025-12-27  
**Purpose:** Complete elimination of all remaining red residuals in public app  
**Scope:** Completion wave for Phase 11F  
**Status:** Pre-execution snapshot

---

## Files to be Modified

### 1. apps/public/src/index.scss

| Line | Selector | Before | After |
|------|----------|--------|-------|
| 30 | `.CircularProgressbar-path` | `stroke: #d90a2c;` | `stroke: #1EB36B;` |
| 35 | `.CircularProgressbar-text` | `fill: #d90a2c;` | `fill: #1EB36B;` |
| 167 | `.scroll-top.opacity` | `color: #D90A2C;` | `color: #1EB36B;` |

### 2. apps/public/src/assets/sass/_hero.scss

| Line | Selector | Before | After |
|------|----------|--------|-------|
| 146 | `.hero-content` | `background: linear-gradient(233.77deg, rgba(217, 10, 44, 0.8) 0.94%, rgba(115, 0, 0, 0.8) 99.09%);` | `background: linear-gradient(233.77deg, rgba($theme-color, 0.8) 0.94%, rgba($theme-color-dark, 0.8) 99.09%);` |

### 3. apps/public/src/assets/sass/_project_page.scss

| Line | Selector | Before | After |
|------|----------|--------|-------|
| 87 | `.portfolio-inner .portfolio-hover a div.isotop :after` | `background: red;` | `background: $theme-color;` |

### 4. apps/public/src/assets/sass/_common.scss

| Line | Selector | Before | After |
|------|----------|--------|-------|
| 232 | `@keyframes hover 20%` | `-webkit-text-stroke: 3px red;` | `-webkit-text-stroke: 3px $theme-color;` |
| 233 | `@keyframes hover 20%` | `drop-shadow(0 0 3px red) drop-shadow(0 0 5px red)` | `drop-shadow(0 0 3px $theme-color) drop-shadow(0 0 5px $theme-color)` |

---

## Files to be Deleted (Stale Compiled CSS)

| File | Reason |
|------|--------|
| `apps/public/src/assets/sass/style.css` | Stale compiled CSS with legacy red values |
| `apps/public/src/assets/sass/style.css.map` | Associated source map |
| `apps/public/src/assets/css/style.css` | Stale compiled CSS with legacy red values |
| `apps/public/src/assets/css/style.css.map` | Associated source map |

---

## Admin Files Status

**Confirmed:** NO admin SCSS files are touched in this phase.

---

## Rollback Instructions

To revert Phase 11F-B:

1. **Restore `apps/public/src/index.scss`:**
   - Line 30: Change `stroke: #1EB36B;` back to `stroke: #d90a2c;`
   - Line 35: Change `fill: #1EB36B;` back to `fill: #d90a2c;`
   - Line 167: Change `color: #1EB36B;` back to `color: #D90A2C;`

2. **Restore `apps/public/src/assets/sass/_hero.scss`:**
   - Line 146: Change gradient back to `linear-gradient(233.77deg, rgba(217, 10, 44, 0.8) 0.94%, rgba(115, 0, 0, 0.8) 99.09%)`

3. **Restore `apps/public/src/assets/sass/_project_page.scss`:**
   - Line 87: Change `background: $theme-color;` back to `background: red;`

4. **Restore `apps/public/src/assets/sass/_common.scss`:**
   - Line 232: Change `$theme-color` back to `red`
   - Line 233: Change `$theme-color` back to `red`

5. **Recreate deleted CSS files if needed** (not recommended - Vite compiles SCSS directly)

---

## Verification Checklist

After implementation:

- [ ] SCSS compilation: 0 errors
- [ ] Console errors: 0
- [ ] Hero overlay shows green gradient
- [ ] CircularProgressbar components show green
- [ ] Scroll-to-top arrow shows green
- [ ] Preloader animation uses green
- [ ] No red visible on any public route

---
