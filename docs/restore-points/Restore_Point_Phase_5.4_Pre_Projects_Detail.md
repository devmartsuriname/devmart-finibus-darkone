# Restore Point — Phase 5.4 Pre Projects Detail

```
Status: PRE-IMPLEMENTATION
Phase: 5.4 — Projects Detail Public → DB Integration
Created: 2025-12-23
```

---

## Objective

Wire the Projects Detail public page (`/project-details/:slug`) and Projects List page (`/project`) to Supabase database data.

---

## Scope

- **Authorized:** apps/public only
- **NOT authorized:** admin changes, DB schema changes, styling refactors

---

## Files To Be Modified

| File | Action |
|------|--------|
| `apps/public/src/App.tsx` | Add dynamic route `/project-details/:slug` |
| `apps/public/src/hooks/useProjects.ts` | CREATE - Projects list hook |
| `apps/public/src/hooks/useProjectDetails.ts` | CREATE - Project details hook |
| `apps/public/src/components/pages/projects/ProjectWrapper.tsx` | Accept projects as prop |
| `apps/public/src/components/common/CartFilter.tsx` | Accept projects as prop, link to dynamic slug |
| `apps/public/src/components/pages/projectDetails/ProjectDetailsPage.tsx` | Use params + hook |
| `apps/public/src/components/pages/projectDetails/ProjectProcess.tsx` | Accept project as prop |
| `apps/public/src/components/pages/projectDetails/ReletedProject.tsx` | Accept projects as prop |

---

## Database Tables Used (Read-Only)

| Table | Purpose |
|-------|---------|
| `projects` | Project data (published only) |
| `media` | Image references |

---

## Verification Checklist (Post-Implementation)

- [ ] `/project-details/:slug` loads DB data
- [ ] `/project-details` (no slug) → ErrorPage
- [ ] `/project-details/fake-slug` → ErrorPage
- [ ] Related projects slider works
- [ ] Projects list page links to dynamic slugs
- [ ] Images render only when `public_url` exists
- [ ] No console errors
- [ ] Finibus UI structure unchanged 1:1

---

## Rollback Instructions

If rollback is needed, revert the following files to their pre-Phase 5.4 state:

1. `apps/public/src/App.tsx` - Remove dynamic project-details route
2. Delete `apps/public/src/hooks/useProjects.ts`
3. Delete `apps/public/src/hooks/useProjectDetails.ts`
4. Restore `apps/public/src/components/pages/projects/ProjectWrapper.tsx`
5. Restore `apps/public/src/components/common/CartFilter.tsx`
6. Restore `apps/public/src/components/pages/projectDetails/ProjectDetailsPage.tsx`
7. Restore `apps/public/src/components/pages/projectDetails/ProjectProcess.tsx`
8. Restore `apps/public/src/components/pages/projectDetails/ReletedProject.tsx`

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| Finibus UI parity | ✅ Enforced |
| No fallback images | ✅ Enforced |
| Read-only data | ✅ Enforced |
| No admin changes | ✅ Enforced |
| Restore points | ✅ Created |
