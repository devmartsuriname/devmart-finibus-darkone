# Restore Point: Phase 6D-3 (Tier Configuration UI)

**Created:** 2026-01-01
**Phase:** 6D-3
**Status:** Pre-Implementation Checkpoint

---

## Pre-Implementation State

### Files Created in 6D-1 and 6D-2 (Before This Step)

| File | Purpose |
|------|---------|
| `apps/public/src/pages/QuotePage.tsx` | Quote page shell with Breadcrumb + LetsTalkArea |
| `apps/public/src/components/pages/quote/QuoteWizard.tsx` | 5-step wizard container with state management |
| `apps/public/src/components/pages/quote/steps/ServiceSelection.tsx` | Step 1: Multi-select service cards |

### Modifications in 6D-1 and 6D-2

| File | Change |
|------|--------|
| `apps/public/src/App.tsx` | Added `/quote` route |
| `docs/Tasks.md` | Updated status for 6D-0, 6D-1, 6D-2 |
| `docs/Architecture.md` | Added wizard state flow documentation |

---

## Files to be Created in 6D-3

| File | Purpose |
|------|---------|
| `apps/public/src/hooks/useServicePricingPlans.ts` | Fetch pricing plans by service and billing period |
| `apps/public/src/components/pages/quote/steps/TierConfiguration.tsx` | Step 2: Tier selection with billing toggle |

## Files to be Modified in 6D-3

| File | Change |
|------|--------|
| `apps/public/src/components/pages/quote/QuoteWizard.tsx` | Import TierConfiguration, wire Step 2 |
| `docs/Tasks.md` | Mark 6D-3 complete |
| `docs/Architecture.md` | Document tier selection state |

---

## Rollback Instructions

If 6D-3 must be reverted:

1. **Delete new files:**
   ```bash
   rm apps/public/src/hooks/useServicePricingPlans.ts
   rm apps/public/src/components/pages/quote/steps/TierConfiguration.tsx
   ```

2. **Restore QuoteWizard.tsx:**
   - Remove TierConfiguration import
   - Restore placeholder for case 2

3. **Verify:**
   - `/quote` route still works
   - Step 1 (Service Selection) still functional
   - No console errors

---

## Guardian Rules Checklist

| Rule | Status |
|------|--------|
| Finibus 1:1 parity | ✅ Only reusing existing patterns |
| Darkone Admin untouched | ✅ No admin changes |
| No schema changes | ✅ Using existing service_pricing_plans |
| No new CSS/SCSS | ✅ Using .single-price-box, .nav-pills |
| Monorepo separation | ✅ Only apps/public affected |
| No new packages | ✅ Using existing dependencies |

---

## Approved UI Patterns for Tier Configuration

### From ServicePrice.tsx
- `.nav-pills` + `.nav-link` for billing toggle
- Tab content switching behavior

### From PriceBox.jsx
- `.single-price-box` card structure
- `.feature-list` for plan features
- Price display: `$X/<sub>Per Month</sub>`

### Selection Indicator (from ServiceSelection.tsx)
- Border highlight: `border: 2px solid #1eb36b`
- Box shadow: `0 0 20px rgba(30, 179, 107, 0.3)`
- Checkmark badge: Circular green badge with ✓

---

## Post-Implementation Verification

- [ ] Select 1 service → Step 2 shows "Service 1 of 1"
- [ ] Toggle Monthly/Yearly → Plans reload
- [ ] Select tier → Selection persists on navigation
- [ ] Select 3 services, only 2 tiers → Next disabled with message
- [ ] Keyboard navigation works (Tab, Enter/Space)
- [ ] No console errors
