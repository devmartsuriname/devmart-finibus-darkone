# Restore Point — Phase 11G-B: Navigation Hygiene

**Status:** Draft  
**Phase:** Planning Only → Implementation  
**Created:** 2025-01-28

---

## Objective

Clean up navigation menu to remove demo/ThemeForest default links and align with actual implemented routes.

---

## Files to be Modified

| File | Action |
|------|--------|
| `apps/public/src/components/common/Header.tsx` | UPDATE - Menu structure cleanup |

---

## Current Menu Structure (BEFORE)

```
- Home (dropdown)
  - Home 01 → /
  - Home 02 → /home2 (DEMO)
- About us → /about
- Services (dropdown)
  - Service → /service
  - Service Details → /service-details (DEMO - no slug)
- Projects (dropdown)
  - Project → /project
  - Project Details → /project-details (DEMO - no slug)
- Blogs (dropdown)
  - Blog → /blog
  - Blog standard → /blog-standard (DEMO)
  - Blog Details → /blog (DUPLICATE)
- Pages (dropdown)
  - Coming soon → /commingsoon
  - Error 404 → /error (DEMO)
- Contact us → /contact
```

---

## Target Menu Structure (AFTER)

```
- Home → / (FLAT, no dropdown)
- About us → /about
- Services → /service (FLAT, no dropdown - details via slug)
- Projects → /project (FLAT, no dropdown - details via slug)
- Blog → /blog (FLAT, no dropdown - details via slug)
- Contact us → /contact
```

**Notes:**
- "Coming Soon" and "Error 404" removed from navigation (system pages)
- All dropdowns flattened (details accessed via individual item pages)
- "Pages" dropdown removed entirely

---

## Rollback Procedure

1. Restore `apps/public/src/components/common/Header.tsx` from this snapshot
2. Verify navigation renders correctly on desktop and mobile

---

## Original Header.tsx Snapshot

See: Restore_Point_Phase_11G_A_Mobile_Menu.md (Header.tsx already captured)
