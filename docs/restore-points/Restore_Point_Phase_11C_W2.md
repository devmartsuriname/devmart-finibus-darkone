# Restore Point — Phase 11C-W2 Branding Expansion

**Status:** IMPLEMENTATION STARTED  
**Phase:** 11C-W2  
**Date:** 2025-12-27  
**Scope:** Controlled branding expansion on public frontend SCSS

---

## Pre-Implementation State

### File 1: `apps/public/src/assets/sass/_footer.scss`

| Line | Selector | Current Value |
|------|----------|---------------|
| 110 | `.social-media-icons li a:hover` | `background-color: #D90A2C;` |

### File 2: `apps/public/src/assets/sass/_commingsoon.scss`

| Line | Selector | Current Value |
|------|----------|---------------|
| 202 | `.social-icons li a:hover` | `background: #D90A2C;` |

### File 3: `apps/public/src/assets/sass/_partner.scss`

| Line | Selector | Current Value |
|------|----------|---------------|
| 47 | `.subscribes span` | `color: #D90A2C;` |
| 148 | `.subscribe-form form input[type="submit"]:hover border` | `border: 2px solid #D90A2C;` |

---

## Changes Applied

| File | Line | Before | After |
|------|------|--------|-------|
| `_footer.scss` | 110 | `background-color: #D90A2C;` | `background-color: var(--theme-color, $theme-color);` |
| `_commingsoon.scss` | 202 | `background: #D90A2C;` | `background: var(--theme-color, $theme-color);` |
| `_partner.scss` | 47 | `color: #D90A2C;` | `color: var(--theme-color, $theme-color);` |
| `_partner.scss` | 148 | `border: 2px solid #D90A2C;` | `border: 2px solid var(--theme-color, $theme-color);` |

---

## Rollback Procedure

To restore pre-W2 state, revert each file to original values:

### _footer.scss (line 110)
```scss
// BEFORE (restore this)
background-color: #D90A2C;

// AFTER (current)
background-color: var(--theme-color, $theme-color);
```

### _commingsoon.scss (line 202)
```scss
// BEFORE (restore this)
background: #D90A2C;

// AFTER (current)
background: var(--theme-color, $theme-color);
```

### _partner.scss (line 47)
```scss
// BEFORE (restore this)
color: #D90A2C;

// AFTER (current)
color: var(--theme-color, $theme-color);
```

### _partner.scss (line 148)
```scss
// BEFORE (restore this)
border: 2px solid #D90A2C;

// AFTER (current)
border: 2px solid var(--theme-color, $theme-color);
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

| Route | Status |
|-------|--------|
| `/` | PENDING |
| `/about` | PENDING |
| `/contact` | PENDING |
| `/coming-soon` | PENDING (if route active) |

---

## Constraints Enforced

- ❌ NO font changes (LOCKED)
- ❌ NO gradient changes
- ❌ NO pseudo-element changes
- ❌ NO admin SCSS changes
- ❌ NO selector refactors
- ✅ ONLY 4 approved selectors modified
- ✅ Uses fallback pattern: `var(--theme-color, $theme-color)`

---

## Phase Governance

- Do NOT proceed beyond W2 without explicit authorization
- Rollback does NOT require authorization — execute immediately if needed
