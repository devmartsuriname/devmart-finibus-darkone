# Restore Point — Phase 11C-W1 Wiring Switch

**Status:** IMPLEMENTATION STARTED  
**Phase:** 11C-W1 (Pilot)  
**Date:** 2025-12-27  
**Scope:** Wiring switch from static CSS to compiled SCSS

---

## Change Summary

| File | Line | Before | After |
|------|------|--------|-------|
| `apps/public/src/index.scss` | 21 | `@import url('./assets/sass/style.css');` | `@import './assets/sass/style.scss';` |

---

## Rollback Procedure

To immediately restore pre-W1 state:

1. Open `apps/public/src/index.scss`
2. Locate line 21
3. Replace:
   ```scss
   @import './assets/sass/style.scss';
   ```
   With:
   ```scss
   @import url('./assets/sass/style.css');
   ```
4. Save file
5. Confirm Vite recompiles without errors

---

## Rollback Triggers

Execute rollback immediately if ANY of the following occur:

- SCSS compile errors
- Font loading regressions
- Layout shifts on any public route
- Console errors related to styling
- Missing CSS rules at runtime

---

## Verification Routes

| Route | Status |
|-------|--------|
| `/` | PENDING |
| `/about` | PENDING |
| `/service` | PENDING |
| `/service-details/:slug` | PENDING |
| `/project` | PENDING |
| `/project-details/:slug` | PENDING |
| `/blog` | PENDING |
| `/blog/:slug` | PENDING |
| `/contact` | PENDING |

---

## Constraints Enforced

- ❌ NO font changes (LOCKED)
- ❌ NO SCSS refactors
- ❌ NO selector changes
- ❌ NO admin CSS/SCSS changes
- ❌ NO additional imports
- ❌ NO build config changes
- ✅ ONLY wiring switch (line 21)

---

## Phase Governance

- This restore point MUST be updated after verification
- Do NOT proceed to W2 without explicit authorization
- Rollback does NOT require authorization — execute immediately if needed
