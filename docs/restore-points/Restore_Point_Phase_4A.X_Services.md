# Restore Point — Phase 4A.X: Services Module

**Timestamp:** 2025-12-23  
**Created By:** AI Agent  
**Status:** Pre-Implementation Checkpoint

---

## Goal

Implement the Services content module for Admin backend, including:
- Database tables: `services`, `service_process_steps`, `service_pricing_plans`
- RLS policies for admin CRUD and public SELECT (published only)
- Admin UI under `/content/services` following Darkone patterns
- Seed data matching the public Finibus template structure

---

## Scope Boundaries

### In Scope
- `src/app/(admin)/content/services/**` (new directory)
- Database migrations for 3 new tables
- RLS policies
- Seed data (7 services, process steps, pricing plans)
- Documentation updates

### Out of Scope (LOCKED)
- ❌ Public/Finibus frontend pages
- ❌ Any changes under `apps/public/` or `finibus/`
- ❌ Stripe/payment integrations
- ❌ New public routes

---

## Files to Be Created

```
src/app/(admin)/content/services/
├── page.tsx                          # Service list page
├── hooks/
│   └── useServices.ts                # Data hook for services CRUD
├── components/
│   ├── ServiceModal.tsx              # Create/Edit modal
│   ├── DeleteServiceModal.tsx        # Delete confirmation
│   ├── ProcessStepsEditor.tsx        # Inline process steps editor
│   └── PricingPlansEditor.tsx        # Pricing plans editor

docs/phase-4/
└── Phase_4_Module_Services.md        # Module specification
```

---

## Files to Be Modified

```
docs/Backend.md                       # Add services tables + RLS documentation
docs/Architecture.md                  # Add services module status
```

---

## Database Changes

### New Tables

1. **services**
   - id, title, slug, short_description, full_description
   - icon_media_id, display_order, status
   - created_at, updated_at

2. **service_process_steps**
   - id, service_id, step_number, title, description
   - image_media_id, created_at, updated_at

3. **service_pricing_plans**
   - id, service_id, billing_period, plan_name, plan_subtitle
   - price_amount, currency, features (jsonb)
   - cta_label, display_order, status
   - created_at, updated_at

### RLS Policies
- Public: SELECT where status='published'
- Admin: Full CRUD using has_role() function

---

## Rollback Instructions

If rollback is required:

1. **Database** — Run reverse migration or drop tables:
   ```sql
   DROP TABLE IF EXISTS public.service_pricing_plans CASCADE;
   DROP TABLE IF EXISTS public.service_process_steps CASCADE;
   DROP TABLE IF EXISTS public.services CASCADE;
   ```

2. **Files** — Delete the following:
   ```
   rm -rf src/app/(admin)/content/services/
   rm docs/phase-4/Phase_4_Module_Services.md
   ```

3. **Documentation** — Revert changes to:
   - `docs/Backend.md`
   - `docs/Architecture.md`

---

## Verification Checklist (Post-Implementation)

- [ ] Restore point created
- [ ] Module documentation created
- [ ] Database tables created with RLS
- [ ] Admin Services page loads without errors
- [ ] CRUD operations work
- [ ] Seed data visible
- [ ] NO public/frontend code changed
- [ ] Documentation updated

---

## Notes

- Frontend is **LOCKED** — no Finibus/public code changes allowed
- Pricing section is display-only (no Stripe, no payments)
- CTA buttons will later link to Quote/Offer Wizard
