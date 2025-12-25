# Restore Point — Phase 7.2 Routing + 404 Parity + Image Fix

```
Status: PRE-IMPLEMENTATION
Phase: 7.2 — Routing + 404 + Image Parity
Created: 2025-12-25
```

---

## Scope

1. **Homepage → Project Details 404 fix**: `/project/:slug` → `/project-details/:slug`
2. **404 page parity**: Move catch-all inside `MainLayout` for Header/Footer
3. **Project Details image standardization**: Add `object-fit: cover` for stability

---

## Files Changed

| File | Change |
|------|--------|
| `apps/public/src/components/pages/Home/PortfolioArea.tsx` | Fix route pattern line 117 |
| `apps/public/src/App.tsx` | Move catch-all inside MainLayout |
| `apps/public/src/assets/sass/_project_details.scss` | Add object-fit: cover |

---

## Rollback Instructions

Revert the three files to their previous state.

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| `apps/public` only | ✅ |
| No CSS global changes | ✅ (scoped to _project_details.scss) |
| Finibus 1:1 parity | ✅ |
| Minimal blast radius | ✅ |
