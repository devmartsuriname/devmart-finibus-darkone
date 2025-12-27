# Frontend Documentation

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized

---

## Overview

This document covers the public frontend (Finibus template) implementation status and runtime validation results.

---

## Frontend Runtime Gate — Validated

### Runtime Test Matrix

| Environment | Errors | Warnings | Status |
|-------------|--------|----------|--------|
| Lovable Preview | 0 | 0 | **PASS** |
| Local Incognito (extensions disabled) | 0 | 0 | **PASS** |
| Local normal browser (extensions active) | 1 (extension-injected) | 0 | Out of scope |

### Error Classification

The only error observed in non-clean environments:

```
TypeError: Cannot read properties of null (reading 'indexOf')
    at contentScript.js
```

**Classification:** External browser extension (not application code)

**Evidence:**
- Stack trace contains only `contentScript.js` — no application files
- Error disappears in Incognito mode (extensions disabled)
- Local build succeeds with zero errors

---

## Environment Hygiene Note

When debugging frontend issues:

1. **Always reproduce in Incognito mode first** (or a clean browser profile with extensions disabled)
2. If errors reference `contentScript.js`, `inject.js`, or similar extension scripts, classify as **external/out of scope**
3. Only errors originating from `src/` or `apps/` paths should be treated as application bugs
4. Document the isolation test results before classifying any error

---

## Template Compliance

- Finibus template: **100% 1:1 parity required**
- No custom Bootstrap modifications
- No SCSS refactors
- No token changes
- No design abstraction
- Reuse only existing template assets

---

## Optional Completeness Scan (User-Provided Evidence)

The following 9 routes should be verified in Incognito for full coverage:

- [ ] `/` — Homepage
- [ ] `/about` — About page
- [ ] `/service` — Services listing
- [ ] `/service-details/:slug` — Service detail page
- [ ] `/project` — Projects listing
- [ ] `/project-details/:slug` — Project detail page
- [ ] `/blog` — Blog listing
- [ ] `/blog/:slug` — Blog post detail
- [ ] `/contact` — Contact page

**Note:** This is a documentation TODO. User will provide screenshots when ready.
