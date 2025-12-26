# Restore Point — Phase 10A Execution

```
Status: EXECUTION IN PROGRESS
Phase: 10A
Created: 2025-12-26
Scope: Services Landing + Service Detail Pricing Visual Fix
```

---

## Scope Declaration

Phase 10A addresses Services Pricing visual parity:

| Page | Action |
|------|--------|
| `/services` | Remove pricing section |
| `/service-details/:slug` | Fix pricing table to match Finibus demo |

---

## Files to be Modified

| File | Change |
|------|--------|
| `apps/public/src/components/pages/service/ServicesPage.tsx` | Remove `<ServicePrice />` |
| `apps/public/src/components/pages/ServiceDetails/ServicePrice.tsx` | Restructure to Finibus layout |
| `apps/public/src/components/pages/ServiceDetails/PriceBox.tsx` | Use Finibus `single-price-box` structure |

---

## Rollback Instructions

If rollback is needed, restore files to their previous state:

### ServicesPage.tsx
```tsx
// Restore the <ServicePrice /> import and usage
import ServicePrice from "./ServicePrice";
// In JSX:
<ServicePrice />
```

### ServiceDetails/ServicePrice.tsx
Revert to previous implementation with `service-price` wrapper and custom class structure.

### ServiceDetails/PriceBox.tsx
Revert to previous implementation with `price-card` structure.

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| No new CSS/SCSS files | ✅ |
| No modification of existing SCSS | ✅ |
| No database schema changes | ✅ |
| No new features | ✅ |
| Scope limited to Services pages | ✅ |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-26 | Implementation Agent | Execution restore point |
