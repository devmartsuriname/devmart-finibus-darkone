# Restore Point — Phase 10B Closeout

```
Status: COMPLETE
Phase: 10B — Service Detail Pricing Visibility Controls
Created: 2025-12-26
```

---

## 1. Phase Summary

Phase 10B implemented per-service pricing visibility controls in the Admin UI, enabling granular management of pricing sections on Service Detail pages.

---

## 2. Database Changes Applied

### 2.1 New Columns Added to `services` Table

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| `show_pricing` | BOOLEAN NOT NULL | `true` | Master toggle: show/hide pricing section |
| `pricing_monthly_enabled` | BOOLEAN NOT NULL | `true` | Enable/disable Monthly tab |
| `pricing_yearly_enabled` | BOOLEAN NOT NULL | `true` | Enable/disable Yearly tab |

### 2.2 RLS Impact

**None.** Existing public SELECT policy for published services automatically includes new columns.

---

## 3. Admin UI Changes

### 3.1 ServiceModal.tsx

Added three toggles in Basic Info tab under "Pricing Visibility" section:
- **Show Pricing Section** — Master toggle
- **Enable Monthly Plans** — Disabled when Show Pricing is OFF
- **Enable Yearly Plans** — Disabled when Show Pricing is OFF

### 3.2 useServices.ts

Updated types and queries to include new pricing visibility fields.

---

## 4. Public Frontend Changes

### 4.1 ServiceDetailsWrapper.tsx

Conditional rendering of `<ServicePrice />` based on `service?.show_pricing`.

### 4.2 ServicePrice.tsx

- Accepts `monthlyEnabled` and `yearlyEnabled` props
- Conditionally renders Monthly/Yearly tabs based on props
- Dev console warning if pricing enabled but both tabs disabled
- Default active tab = first enabled tab (Monthly preferred)

### 4.3 Type Updates

Updated `Service` interface in:
- `apps/public/src/types/database.ts`
- `apps/public/src/hooks/useServiceDetails.ts`

---

## 5. Files Changed

| File | Action |
|------|--------|
| `supabase/migrations/20251226055119_*.sql` | ADD 3 columns to `services` |
| `src/app/(admin)/content/services/hooks/useServices.ts` | UPDATE types + queries |
| `src/app/(admin)/content/services/components/ServiceModal.tsx` | ADD 3 toggles |
| `apps/public/src/types/database.ts` | UPDATE Service interface |
| `apps/public/src/hooks/useServiceDetails.ts` | UPDATE SELECT queries |
| `apps/public/src/components/pages/ServiceDetails/ServiceDetailsWrapper.tsx` | ADD conditional render |
| `apps/public/src/components/pages/ServiceDetails/ServicePrice.tsx` | ADD per-tab conditional |

---

## 6. Verification Completed

| Category | Check | Result |
|----------|-------|--------|
| **DB** | Columns exist with correct defaults | ✅ Verified |
| **DB** | RLS unchanged | ✅ Verified |
| **Admin** | Toggles load correctly | ✅ Verified |
| **Admin** | Toggles save correctly | ✅ Verified |
| **Admin** | Pricing Plans tab functional | ✅ Verified |
| **Public** | Pricing ON + Both tabs | ✅ Working |
| **Public** | Pricing ON + Monthly only | ✅ Working |
| **Public** | Pricing ON + Yearly only | ✅ Working |
| **Public** | Pricing OFF | ✅ Section hidden |
| **Visual** | Finibus parity | ✅ Maintained |

---

## 7. Guardian Rules Compliance

| Rule | Status |
|------|--------|
| No new database tables | ✅ Adding columns only |
| No changes to `page_settings` | ✅ |
| No changes to `global_blocks` | ✅ |
| No changes to `homepage_settings` | ✅ |
| No new CSS/SCSS files | ✅ |
| No global styling changes | ✅ |
| Darkone admin patterns preserved | ✅ |
| Services pages only | ✅ |
| No Quote Request Wizard | ✅ |

---

## 8. Rollback Instructions

To rollback Phase 10B:

```sql
-- Remove pricing visibility columns
ALTER TABLE public.services
DROP COLUMN show_pricing,
DROP COLUMN pricing_monthly_enabled,
DROP COLUMN pricing_yearly_enabled;
```

Then revert files to pre-Phase 10B state using Git.

---

## 9. Phase Status

**Phase 10B: CLOSED**

No further execution authorized until next phase is explicitly approved.
