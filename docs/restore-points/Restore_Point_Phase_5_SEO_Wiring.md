# Restore Point: Phase 5 Public SEO Wiring

```
Status: PRE-EXECUTION CHECKPOINT
Created: 2025-12-31
Phase: 5.1 + 5.2 (Services & Projects SEO Wiring)
```

---

## Pre-Execution State

### Files to Modify

| File | Pre-State |
|------|-----------|
| `apps/public/src/hooks/useServiceDetails.ts` | No SEO fields in SELECT query |
| `apps/public/src/hooks/useProjectDetails.ts` | No SEO fields in SELECT query |
| `apps/public/src/components/pages/ServiceDetails/ServiceDetailsPage.tsx` | No SEO component |
| `apps/public/src/components/pages/projectDetails/ProjectDetailsPage.tsx` | No SEO component |

### Files to Create

| File | Purpose |
|------|---------|
| `apps/public/src/components/pages/ServiceDetails/ServiceDetailsSeo.tsx` | SEO meta tags for service details |
| `apps/public/src/components/pages/projectDetails/ProjectDetailsSeo.tsx` | SEO meta tags for project details |

---

## Rollback Instructions

### To Rollback Phase 5

1. Delete created SEO components:
   - `apps/public/src/components/pages/ServiceDetails/ServiceDetailsSeo.tsx`
   - `apps/public/src/components/pages/projectDetails/ProjectDetailsSeo.tsx`

2. Restore `useServiceDetails.ts` by removing SEO fields from SELECT query

3. Restore `useProjectDetails.ts` by removing SEO fields from SELECT query

4. Remove `<ServiceDetailsSeo>` from `ServiceDetailsPage.tsx`

5. Remove `<ProjectDetailsSeo>` from `ProjectDetailsPage.tsx`

---

## Execution Scope

- SEO meta tag rendering only (invisible changes)
- No layout or styling changes
- No routing changes
- No schema changes
- No new packages

---

## Document Control

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2025-12-31 | Pre-execution checkpoint |
