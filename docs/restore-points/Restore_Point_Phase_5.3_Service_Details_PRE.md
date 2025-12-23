# Restore Point: Phase 5.3 — Service Details (PRE-Implementation)

```
Status: PRE-CHECKPOINT
Created: 2025-12-23
Phase: 5.3 — Service Details Public → DB Integration
Type: Pre-Implementation Snapshot
```

---

## Objective

Wire the public Service Details page (`/service-details/:slug`) to Supabase data using the existing public client.

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `apps/public/src/App.tsx` | MODIFY | Add dynamic route, keep static fallback |
| `apps/public/src/hooks/useServiceDetails.ts` | CREATE | Fetch service + steps + pricing |
| `apps/public/src/components/pages/ServiceDetails/ServiceDetailsPage.tsx` | MODIFY | Pass slug to wrapper |
| `apps/public/src/components/pages/ServiceDetails/ServiceDetailsWrapper.tsx` | REWRITE | Data-driven content |
| `apps/public/src/components/pages/ServiceDetails/PriceBox.tsx` | CREATE | Pricing card component |
| `apps/public/src/components/pages/ServiceDetails/ServicePrice.tsx` | CREATE | Pricing section with tabs |
| `docs/Backend.md` | MODIFY | Add Phase 5.3 wiring status |
| `docs/Architecture.md` | MODIFY | Add Phase 5.3 completion |

---

## Data Contract

### Service (by slug)
- `id`, `title`, `slug`, `short_description`, `full_description`
- `icon_media_id` → resolved via `media` join

### Process Steps (ordered by step_number)
- `step_number`, `title`, `description`
- `image_media_id` → resolved via `media` join

### Pricing Plans (ordered by display_order)
- `billing_period` (monthly/yearly)
- `plan_name`, `plan_subtitle`, `price_amount`, `currency`
- `features[]`, `cta_label`

---

## Routing Changes

| Route | Action |
|-------|--------|
| `/service-details` (static) | Redirect to `/service` (services list) |
| `/service-details/:slug` (dynamic) | New DB-driven route |

---

## Rollback Notes

If rollback needed:
1. Revert `apps/public/src/App.tsx` to remove `:slug` route
2. Restore hardcoded `ServiceDetailsWrapper.tsx`
3. Delete new files: `useServiceDetails.ts`, `PriceBox.tsx`, `ServicePrice.tsx`
4. Revert docs changes

---

## Verification Checklist

- [ ] `/service-details/web-design` loads title, description, steps, pricing from DB
- [ ] Sidebar lists published services dynamically
- [ ] `/service-details/fake-slug` shows ErrorPage (no console errors)
- [ ] `/service-details` (no slug) redirects to `/service`
- [ ] No failed network requests in DevTools
- [ ] Visual parity with Finibus template maintained

---

## Guardian Rules

| Rule | Status |
|------|--------|
| Finibus 1:1 UI parity | ⏳ Pending |
| No hardcoded icon fallbacks | ⏳ Pending |
| Read-only data access | ⏳ Pending |
| No Stripe/payments | ⏳ Pending |
| No admin changes | ⏳ Pending |
