# Restore Point — Phase 7A: Marketing Data Foundations

**Created:** 2026-01-02  
**Phase:** 7A — UTM Marketing Attribution  
**Status:** ✅ EXECUTION COMPLETE

---

## Execution Summary

Phase 7A implemented UTM marketing attribution tracking across public forms and admin views.

### Schema Changes

Added 5 UTM columns to both `leads` and `quotes` tables:
- `utm_source` (TEXT, nullable)
- `utm_medium` (TEXT, nullable)
- `utm_campaign` (TEXT, nullable)
- `utm_content` (TEXT, nullable)
- `utm_term` (TEXT, nullable)

### Files Created

| File | Purpose |
|------|---------|
| `apps/public/src/hooks/useUtmCapture.ts` | UTM parameter capture and sessionStorage persistence |

### Files Modified

| File | Change |
|------|--------|
| `apps/public/src/components/pages/contact/ContactForm.tsx` | Added UTM capture + INSERT with UTM data |
| `apps/public/src/components/pages/quote/QuoteWizard.tsx` | Added UTM capture + INSERT with UTM data |
| `src/app/(admin)/crm/leads/hooks/useLeads.ts` | Added UTM fields to Lead interface |
| `src/app/(admin)/crm/quotes/hooks/useQuotes.ts` | Added UTM fields to Quote interface + mapping |
| `src/app/(admin)/crm/leads/components/LeadDetailModal.tsx` | Added Marketing Attribution section (read-only) |
| `src/app/(admin)/crm/quotes/components/QuoteDetailModal.tsx` | Added Source Attribution section (read-only) |
| `docs/Tasks.md` | Marked Phase 7A as EXECUTED |
| `docs/Architecture.md` | Added UTM data flow documentation |
| `docs/Backend.md` | Documented UTM schema changes |

---

## Rollback Instructions

### 1. Remove Schema Changes

```sql
-- Remove UTM columns from leads
ALTER TABLE public.leads 
  DROP COLUMN IF EXISTS utm_source,
  DROP COLUMN IF EXISTS utm_medium,
  DROP COLUMN IF EXISTS utm_campaign,
  DROP COLUMN IF EXISTS utm_content,
  DROP COLUMN IF EXISTS utm_term;

-- Remove UTM columns from quotes
ALTER TABLE public.quotes 
  DROP COLUMN IF EXISTS utm_source,
  DROP COLUMN IF EXISTS utm_medium,
  DROP COLUMN IF EXISTS utm_campaign,
  DROP COLUMN IF EXISTS utm_content,
  DROP COLUMN IF EXISTS utm_term;
```

### 2. Revert File Changes

Delete:
- `apps/public/src/hooks/useUtmCapture.ts`

Revert to pre-7A state:
- `apps/public/src/components/pages/contact/ContactForm.tsx`
- `apps/public/src/components/pages/quote/QuoteWizard.tsx`
- `src/app/(admin)/crm/leads/hooks/useLeads.ts`
- `src/app/(admin)/crm/quotes/hooks/useQuotes.ts`
- `src/app/(admin)/crm/leads/components/LeadDetailModal.tsx`
- `src/app/(admin)/crm/quotes/components/QuoteDetailModal.tsx`

---

## Verification Checklist

- [x] Schema migration executed successfully
- [x] UTM capture hook created
- [x] ContactForm wired with UTM capture
- [x] QuoteWizard wired with UTM capture
- [x] Lead interface includes UTM fields
- [x] Quote interface includes UTM fields
- [x] LeadDetailModal displays UTM (read-only)
- [x] QuoteDetailModal displays UTM (read-only)
- [x] Documentation updated (Tasks.md, Architecture.md, Backend.md)
- [x] Restore point created

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| Finibus 1:1 parity | ✅ COMPLIANT — invisible tracking only |
| Darkone 1:1 parity | ✅ COMPLIANT — Bootstrap patterns only |
| No new routes | ✅ COMPLIANT |
| No new packages | ✅ COMPLIANT |
| No Phase 7B/7C work | ✅ COMPLIANT |
| Read-only UTM display | ✅ COMPLIANT |

---

## Next Phase

**Phase 7B:** Tracking & Events (Google Ads + Meta Pixel)  
**Status:** ⏳ AWAITING AUTHORIZATION
