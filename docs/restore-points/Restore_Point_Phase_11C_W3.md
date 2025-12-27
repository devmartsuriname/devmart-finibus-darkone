# Restore Point — Phase 11C-W3 Extended Branding Surfaces

**Status:** IMPLEMENTATION STARTED  
**Phase:** 11C-W3  
**Date:** 2025-12-27  
**Scope:** Extended branding expansion on public frontend SCSS (7 selectors)

---

## Pre-Implementation State

### File 1: `apps/public/src/assets/sass/_contact_page.scss`

| Line | Selector | Current Value |
|------|----------|---------------|
| 29 | `.office-info:hover .icon` | `background-color: #D90A2C;` |
| 48 | `.office-info .icon i` | `color: #D90A2C;` |

### File 2: `apps/public/src/assets/sass/_blog_page.scss`

| Line | Selector | Current Value |
|------|----------|---------------|
| 415 | `.blog-quate b` | `color: #D90A2C;` |

### File 3: `apps/public/src/assets/sass/_service_page.scss`

| Line | Selector | Current Value |
|------|----------|---------------|
| 281 | `.single-price-box h2 sub` | `color: #D90A2C;` |

### File 4: `apps/public/src/assets/sass/_hero.scss`

| Line | Selector | Current Value |
|------|----------|---------------|
| 487 | `.social-link a` | `border-right: 1px solid #D90A2C;` |

### File 5: `apps/public/src/assets/sass/_common.scss`

| Line | Selector | Current Value |
|------|----------|---------------|
| 467 | `.scroll-down span` | `border: 1px solid #D90A2C;` |
| 469 | `.scroll-down span` | `color: #D90A2C;` |

---

## Changes Applied

| File | Line | Before | After |
|------|------|--------|-------|
| `_contact_page.scss` | 29 | `background-color: #D90A2C;` | `background-color: var(--theme-color, $theme-color);` |
| `_contact_page.scss` | 48 | `color: #D90A2C;` | `color: var(--theme-color, $theme-color);` |
| `_blog_page.scss` | 415 | `color: #D90A2C;` | `color: var(--theme-color, $theme-color);` |
| `_service_page.scss` | 281 | `color: #D90A2C;` | `color: var(--theme-color, $theme-color);` |
| `_hero.scss` | 487 | `border-right: 1px solid #D90A2C;` | `border-right: 1px solid var(--theme-color, $theme-color);` |
| `_common.scss` | 467 | `border: 1px solid #D90A2C;` | `border: 1px solid var(--theme-color, $theme-color);` |
| `_common.scss` | 469 | `color: #D90A2C;` | `color: var(--theme-color, $theme-color);` |

---

## Rollback Procedure

To restore pre-W3 state, revert each file to original values:

### _contact_page.scss (line 29)
```scss
// BEFORE (restore this)
background-color: #D90A2C;

// AFTER (current)
background-color: var(--theme-color, $theme-color);
```

### _contact_page.scss (line 48)
```scss
// BEFORE (restore this)
color: #D90A2C;

// AFTER (current)
color: var(--theme-color, $theme-color);
```

### _blog_page.scss (line 415)
```scss
// BEFORE (restore this)
color: #D90A2C;

// AFTER (current)
color: var(--theme-color, $theme-color);
```

### _service_page.scss (line 281)
```scss
// BEFORE (restore this)
color: #D90A2C;

// AFTER (current)
color: var(--theme-color, $theme-color);
```

### _hero.scss (line 487)
```scss
// BEFORE (restore this)
border-right: 1px solid #D90A2C;

// AFTER (current)
border-right: 1px solid var(--theme-color, $theme-color);
```

### _common.scss (line 467)
```scss
// BEFORE (restore this)
border: 1px solid #D90A2C;

// AFTER (current)
border: 1px solid var(--theme-color, $theme-color);
```

### _common.scss (line 469)
```scss
// BEFORE (restore this)
color: #D90A2C;

// AFTER (current)
color: var(--theme-color, $theme-color);
```

---

## Rollback Triggers

Execute rollback immediately if ANY of the following occur:

- SCSS compile errors
- Font loading regressions
- Layout shifts on any public route
- Console errors related to styling
- Unexpected color behavior

---

## Verification Routes

| Route | Selectors Present | Status |
|-------|-------------------|--------|
| `/` | Hero social separator, scroll indicator | PENDING |
| `/about` | Scroll indicator | PENDING |
| `/service` | Pricing sub label | PENDING |
| `/contact` | Contact icon, icon hover | PENDING |
| `/blog` | Quote author label | PENDING |
| `/blog/:slug` | Quote author label | PENDING |

---

## Constraints Enforced

- ❌ NO font changes (LOCKED)
- ❌ NO gradient changes
- ❌ NO pseudo-element changes
- ❌ NO alpha-suffixed colors (e.g., `#D90A2C30`)
- ❌ NO admin SCSS changes
- ❌ NO selector refactors
- ✅ ONLY 7 approved selectors modified
- ✅ Uses fallback pattern: `var(--theme-color, $theme-color)`

---

## Phase Governance

- Do NOT proceed beyond W3 without explicit authorization
- Rollback does NOT require authorization — execute immediately if needed
