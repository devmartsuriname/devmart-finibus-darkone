# Restore Point: Phase 13C — Legal & System Pages

**Date:** 2026-01-03  
**Phase:** 13C — Legal & System Pages  
**Status:** Pre-Execution Snapshot

---

## Purpose

This restore point captures the state of the public frontend before Phase 13C execution. It enables rollback if any issues arise during legal page implementation.

---

## Files to Be Modified

| File | Action |
|------|--------|
| `apps/public/src/App.tsx` | ADD routes for 4 legal pages |
| `apps/public/src/components/common/Footer.tsx` | UPDATE links from `/commingsoon` to actual routes |

## Files to Be Created

| File | Purpose |
|------|---------|
| `apps/public/src/components/pages/legal/LegalPageLayout.tsx` | Shared layout component |
| `apps/public/src/components/pages/legal/PrivacyPolicyPage.tsx` | Privacy Policy page |
| `apps/public/src/components/pages/legal/TermsOfUsePage.tsx` | Terms of Use page |
| `apps/public/src/components/pages/legal/SupportPolicyPage.tsx` | Support Policy page |
| `apps/public/src/components/pages/legal/TermsOfServicePage.tsx` | Terms of Service page |

---

## Rollback Instructions

To restore pre-Phase 13C state:

1. **Delete created files:**
   ```
   rm -rf apps/public/src/components/pages/legal/
   ```

2. **Revert App.tsx changes:**
   - Remove legal page imports (PrivacyPolicyPage, TermsOfUsePage, SupportPolicyPage, TermsOfServicePage)
   - Remove legal page routes (`/privacy-policy`, `/terms-of-use`, `/support-policy`, `/terms-of-service`)

3. **Revert Footer.tsx changes:**
   - Change `/privacy-policy` back to `/commingsoon`
   - Change `/terms-of-use` back to `/commingsoon`
   - Change `/support-policy` back to `/commingsoon`
   - Change `/terms-of-service` back to `/commingsoon`

---

## Pre-Execution State Summary

- Footer legal links point to `/commingsoon`
- No `/privacy-policy`, `/terms-of-use`, `/support-policy`, `/terms-of-service` routes exist
- No `apps/public/src/components/pages/legal/` directory exists

---

## Constraints

- No backend changes
- No CMS schema changes
- No CSS/SCSS modifications
- No component refactors beyond scope

---

*Restore point created before Phase 13C execution.*
