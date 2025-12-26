# Restore Point — Phase 10B Service Detail Pricing Visibility Controls

**Created:** 2025-12-26  
**Phase:** 10B — Service Detail Pricing Visibility Controls  
**Status:** PRE-EXECUTION

---

## Scope

Add per-service Admin controls for pricing section visibility on Service Detail pages:

1. **show_pricing** — Master toggle (on/off for entire pricing section)
2. **pricing_monthly_enabled** — Enable/disable Monthly tab
3. **pricing_yearly_enabled** — Enable/disable Yearly tab

---

## Intended Database Changes

### Add 3 columns to `public.services` table:

```sql
ALTER TABLE public.services
ADD COLUMN show_pricing BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN pricing_monthly_enabled BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN pricing_yearly_enabled BOOLEAN NOT NULL DEFAULT true;
```

**Notes:**
- Default `true` for backward compatibility
- No changes to `service_pricing_plans` table
- RLS unaffected — additional readable columns

---

## Intended Admin Changes

### Files Modified:

| File | Change |
|------|--------|
| `src/app/(admin)/content/services/hooks/useServices.ts` | Add 3 new fields to `Service` and `ServiceInput` interfaces, update queries |
| `src/app/(admin)/content/services/components/ServiceModal.tsx` | Add 3 Form.Check toggles in Basic Info tab |

### Admin UI Behavior:

- "Show Pricing Section" toggle (master)
- "Enable Monthly Plans" toggle (disabled when master is off)
- "Enable Yearly Plans" toggle (disabled when master is off)
- Helper text: "Enable pricing to manage billing-period visibility."

---

## Intended Public Changes

### Files Modified:

| File | Change |
|------|--------|
| `apps/public/src/types/database.ts` | Add 3 boolean fields to `Service` interface |
| `apps/public/src/hooks/useServiceDetails.ts` | Add 3 fields to SELECT queries and transformation |
| `apps/public/src/components/pages/ServiceDetails/ServiceDetailsWrapper.tsx` | Conditional render of `ServicePrice` based on `show_pricing` |
| `apps/public/src/components/pages/ServiceDetails/ServicePrice.tsx` | Accept `monthlyEnabled`/`yearlyEnabled` props, conditional tab rendering |

### Frontend Behavior:

- Pricing section ONLY renders if `show_pricing === true`
- Monthly tab ONLY shows if `pricing_monthly_enabled === true`
- Yearly tab ONLY shows if `pricing_yearly_enabled === true`
- Default active tab = first enabled tab (Monthly preferred)
- Edge case: Both tabs disabled → hide section + dev console warning

---

## Verification Checklist

| Category | Check | Expected |
|----------|-------|----------|
| **DB** | Columns exist | `show_pricing`, `pricing_monthly_enabled`, `pricing_yearly_enabled` |
| **DB** | Defaults | All `true` |
| **Admin** | Toggles load | Existing services show all ON |
| **Admin** | Toggles save | Changes persist after refresh |
| **Admin** | Toggle UX | Monthly/Yearly disabled when Show Pricing = OFF |
| **Public** | Pricing ON + Both tabs | Both tabs work |
| **Public** | Pricing ON + Monthly only | Only Monthly tab |
| **Public** | Pricing ON + Yearly only | Only Yearly tab |
| **Public** | Pricing OFF | Section hidden |
| **Public** | Both tabs OFF | Section hidden + dev warning |

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| No new database tables | ✅ Adding columns only |
| No changes to `page_settings` | ✅ |
| No changes to `global_blocks` | ✅ |
| No new CSS/SCSS files | ✅ |
| No modification of Finibus global styles | ✅ |
| Darkone admin patterns preserved | ✅ |
| Services pages only | ✅ |
| No Quote Request Wizard | ✅ |

---

## Rollback Instructions

### Database:

```sql
ALTER TABLE public.services
DROP COLUMN show_pricing,
DROP COLUMN pricing_monthly_enabled,
DROP COLUMN pricing_yearly_enabled;
```

### Admin Files:

Restore from git:
- `src/app/(admin)/content/services/hooks/useServices.ts`
- `src/app/(admin)/content/services/components/ServiceModal.tsx`

### Public Files:

Restore from git:
- `apps/public/src/types/database.ts`
- `apps/public/src/hooks/useServiceDetails.ts`
- `apps/public/src/components/pages/ServiceDetails/ServiceDetailsWrapper.tsx`
- `apps/public/src/components/pages/ServiceDetails/ServicePrice.tsx`

---

## Out of Scope (Explicit)

- Quote Request Wizard (future phase)
- Services landing page (Phase 10A complete)
- Stripe/payment integration
- New CSS/SCSS files
- Global style changes
