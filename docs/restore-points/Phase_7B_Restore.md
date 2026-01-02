# Restore Point: Phase 7B — Tracking & Events

**Created:** 2026-01-02  
**Phase:** 7B — Marketing Tracking & Events (First-Party)  
**Status:** ACTIVE

---

## Execution Summary

Phase 7B implemented first-party event tracking for internal marketing analytics.

### Schema Created

**Table:** `public.marketing_events`

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | UUID | NO | gen_random_uuid() |
| event_type | TEXT | NO | — |
| source | TEXT | YES | — |
| reference_id | UUID | YES | — |
| metadata | JSONB | YES | '{}' |
| created_at | TIMESTAMPTZ | NO | now() |

**Indexes:**
- `idx_marketing_events_created_at` — created_at DESC
- `idx_marketing_events_event_type` — event_type

**RLS Policies:**
- `Public can insert events` — INSERT WITH CHECK (true)
- `Admins can view all events` — SELECT USING (has_role(auth.uid(), 'admin'))

---

## Files Created

| File | Purpose |
|------|---------|
| `apps/public/src/hooks/useMarketingEvents.ts` | Event tracking function (fire-and-forget) |
| `src/app/(admin)/analytics/hooks/useMarketingEvents.ts` | Admin events data hook |
| `src/app/(admin)/analytics/events/page.tsx` | Admin events list page |

---

## Files Modified

| File | Change |
|------|--------|
| `apps/public/src/components/pages/quote/QuoteWizard.tsx` | Added quote_started, quote_step_completed, quote_submitted events |
| `apps/public/src/components/pages/contact/ContactForm.tsx` | Added contact_form_submitted event |
| `apps/public/src/components/pages/service/PriceBox.tsx` | Added service_pricing_cta_clicked event |
| `apps/public/src/components/pages/ServiceDetails/PriceBox.tsx` | Added service_pricing_cta_clicked event |
| `src/assets/data/menu-items.ts` | Added Events menu item under Analytics |
| `src/routes/index.tsx` | Added /analytics/events route |
| `docs/Tasks.md` | Marked Phase 7B as EXECUTED |
| `docs/Architecture.md` | Added Marketing Events section |
| `docs/Backend.md` | Added marketing_events schema documentation |

---

## Event Types Tracked

| Event Type | Trigger Point | Source |
|------------|---------------|--------|
| quote_started | Quote Wizard mount (Step 1) | quote_wizard |
| quote_step_completed | Step transition (1→2, 2→3, 3→4) | quote_wizard |
| quote_submitted | Successful quote submission | quote_wizard |
| contact_form_submitted | Successful contact form submission | contact_form |
| service_pricing_cta_clicked | PriceBox CTA click | service_pricing |

---

## Rollback Instructions

### 1. Remove Schema

```sql
-- Drop indexes
DROP INDEX IF EXISTS idx_marketing_events_created_at;
DROP INDEX IF EXISTS idx_marketing_events_event_type;

-- Drop policies
DROP POLICY IF EXISTS "Public can insert events" ON public.marketing_events;
DROP POLICY IF EXISTS "Admins can view all events" ON public.marketing_events;

-- Drop table
DROP TABLE IF EXISTS public.marketing_events;
```

### 2. Remove Files

```bash
rm apps/public/src/hooks/useMarketingEvents.ts
rm src/app/(admin)/analytics/hooks/useMarketingEvents.ts
rm src/app/(admin)/analytics/events/page.tsx
```

### 3. Revert Modified Files

Restore from git history:
- `apps/public/src/components/pages/quote/QuoteWizard.tsx`
- `apps/public/src/components/pages/contact/ContactForm.tsx`
- `apps/public/src/components/pages/service/PriceBox.tsx`
- `apps/public/src/components/pages/ServiceDetails/PriceBox.tsx`
- `src/assets/data/menu-items.ts`
- `src/routes/index.tsx`

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| Finibus 1:1 parity | COMPLIANT — invisible tracking only |
| Darkone 1:1 parity | COMPLIANT — Bootstrap patterns from LeadsPage |
| No Google Ads scripts | COMPLIANT |
| No Meta/Facebook Pixel | COMPLIANT |
| No GTM | COMPLIANT |
| No frontend layout changes | COMPLIANT |
| No new packages | COMPLIANT |
| Events are internal only | COMPLIANT |

---

## Notes

- Event tracking is fire-and-forget (non-blocking)
- Silent failure ensures UX is never impacted by tracking
- Admin Events page displays last 500 events
- No third-party scripts added
