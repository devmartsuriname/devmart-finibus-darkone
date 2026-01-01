# Restore Point — Phase 6D UI Implementation Start

**Created:** 2026-01-01  
**Phase:** 6D (Quote Wizard UI)  
**Type:** Pre-Implementation Checkpoint

---

## Pre-Implementation State

### Schema Status (Phase 6C)

| Table | Status |
|-------|--------|
| `quotes` | ✅ Active (9 columns) |
| `quote_items` | ✅ Active (9 columns) |
| `leads.quote_id` | ✅ Added |

### RLS Status

| Table | anon INSERT | anon SELECT | admin FULL |
|-------|-------------|-------------|------------|
| `quotes` | ✅ | ❌ | ✅ |
| `quote_items` | ✅ | ❌ | ✅ |

---

## Files State Before Implementation

### Files That Will Be Created

| File | Purpose |
|------|---------|
| `apps/public/src/components/pages/quote/QuotePage.tsx` | Quote wizard page component |
| `apps/public/src/components/pages/quote/QuoteWizard.tsx` | Wizard container with step state |
| `apps/public/src/components/pages/quote/steps/ServiceSelection.tsx` | Step 1: Service multi-select |
| `apps/public/src/components/pages/quote/steps/TierConfiguration.tsx` | Step 2: Per-service tier selection |
| `apps/public/src/components/pages/quote/steps/QuoteSummary.tsx` | Step 3: Review summary |
| `apps/public/src/components/pages/quote/steps/ContactInformation.tsx` | Step 4: Lead capture |
| `apps/public/src/components/pages/quote/steps/Confirmation.tsx` | Step 5: Success message |
| `apps/public/src/hooks/useServicePricingPlans.ts` | Hook for pricing plan fetching |
| `apps/public/src/components/pages/quote/utils/submitQuote.ts` | Quote submission utility |

### Files That Will Be Modified

| File | Change |
|------|--------|
| `apps/public/src/App.tsx` | Add `/quote` route inside MainLayout |

---

## Rollback Instructions

### If Rollback Required:

1. **Delete created files:**
   ```bash
   rm -rf apps/public/src/components/pages/quote/
   rm apps/public/src/hooks/useServicePricingPlans.ts
   ```

2. **Revert App.tsx:**
   - Remove the `/quote` route from MainLayout routes
   - Remove `QuotePage` import

3. **Verify no other changes:**
   - No CSS/SCSS files should be modified
   - No schema changes should be present
   - No package.json changes should be present

---

## Guardian Rules Checklist

| Rule | Pre-Implementation Status |
|------|---------------------------|
| Finibus 1:1 Parity | ✅ Preserved |
| Darkone 1:1 Parity | ✅ Preserved |
| No CSS/SCSS changes | ✅ Not modified |
| No schema changes | ✅ Frozen (Phase 6C) |
| No package additions | ✅ No changes |
| Monorepo separation | ✅ Respected |

---

## Approved Components for Wizard

Per `Frontend_Uniformity_Library.md`:

| Component | File Path | Wizard Use |
|-----------|-----------|------------|
| `Breadcrumb` | `common/Breadcrumb.tsx` | Page header |
| `LetsTalkArea` | `common/LetsTalkArea.tsx` | Footer CTA |
| `PriceBox` pattern | `ServiceDetails/PriceBox.tsx` | Tier cards |
| `ServicePrice` pattern | `ServiceDetails/ServicePrice.tsx` | Billing toggle |
| Service card pattern | `Home/ServiceArea.tsx` | Service selection |
| `ContactForm` pattern | `contact/ContactForm.tsx` | Lead capture |

---

## Approved CSS Classes

| Class | Purpose |
|-------|---------|
| `.sec-pad`, `.sec-mar` | Section spacing |
| `.title`, `.title.black` | Section headers |
| `.cmn-btn a` | Primary CTA |
| `.pay-btn a` | Pricing CTA |
| `.nav-pills`, `.nav-link` | Tab buttons |
| `.single-service` | Service cards |
| `.single-price-box` | Price cards |
| `.form-control`, `.form-group` | Form inputs |
| `col-md-6 col-lg-4 col-xl-4` | 3-column grid |
| `col-lg-6 col-xl-6` | 2-column grid |

---

## Checkpoint

**Pre-implementation state captured.**  
**Ready to proceed with Step 6D-1 (Wizard Skeleton).**

---

## Stop Condition

**HARD STOP after each step. Await explicit approval.**
