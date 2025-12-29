# Restore Point: URL Fix Option A — Broken Service Links

**Phase:** Pre-Production URL Consistency  
**Created:** 2024-12-29  
**Status:** Pre-Implementation Snapshot

---

## Purpose

Fix broken service links that point to `/service-details` without a slug in:
- Footer.tsx (6 "Our Services" links)
- ServiceList.tsx (6 blog sidebar links)

## Change Summary

| File | Before | After |
|------|--------|-------|
| `apps/public/src/components/common/Footer.tsx` | `/service-details` (no slug) | `/service` (listing page) |
| `apps/public/src/components/pages/blog/ServiceList.tsx` | `/service-details` (no slug) | `/service` (listing page) |

## Rationale

These are hardcoded demo labels without DB service mapping. Linking to the services listing page (`/service`) is the safest approach that:
- Eliminates broken/misleading deep links
- Maintains 1:1 Finibus template parity
- Requires no new data fetching or component logic

## Rollback Instructions

If rollback is needed, restore the original link targets:

### Footer.tsx (lines 93-121)
Change all `/service` back to `/service-details`

### ServiceList.tsx (lines 18-64)
Change all `/service` back to `/service-details`

## Canonical Routes (UNCHANGED)

| Content Type | Canonical Route |
|--------------|-----------------|
| Service Details | `/service-details/:slug` |
| Project Details | `/project-details/:slug` |
| Blog Details | `/blog/:slug` |
| Services Listing | `/service` |
| Projects Listing | `/project` |
| Blog Listing | `/blog` |

## Verification Checklist

- [ ] Footer service links point to `/service`
- [ ] Blog sidebar service links point to `/service`
- [ ] No console errors
- [ ] No 404s on navigation
- [ ] Canonical routes unchanged
