# Restore Point — Phase 6D Public UI Adjustments

**Created:** 2026-01-01  
**Phase:** 6D (Quote Wizard UI Adjustments)  
**Type:** Pre-UI-Adjustment Checkpoint

---

## Pre-Adjustment State

### Files State Before Changes

| File | State |
|------|-------|
| `apps/public/src/components/pages/quote/QuoteWizard.tsx` | Uses `quote-wizard sec-pad` class, step indicators wrap on desktop |

### Baseline from Phase 6D-5

All Phase 6D-5 (Contact & Submit) files are in place:
- `ContactSubmit.tsx` - Lead capture form
- `QuoteConfirmation.tsx` - Success message
- `QuoteWizard.tsx` - Full wizard with submission logic

---

## Changes Applied

### 1. Background Parity
- Changed section class from `quote-wizard sec-pad` to `service-area sec-pad`
- Reuses existing dark background from Services page
- No new CSS added

### 2. Step Indicator Layout
- Added `flexWrap: 'nowrap'` to prevent line wrapping
- Added `overflowX: 'auto'` for mobile horizontal scroll
- Reduced button min-width to `120px` to fit 5 tabs
- All 5 steps now display in single horizontal row

---

## Rollback Instructions

### If Rollback Required:

1. **Revert QuoteWizard.tsx:**
   - Change line 432 back to: `<section className="quote-wizard sec-pad">`
   - Remove inline styles from step indicator `ul` element
   - Remove inline styles from step indicator `button` elements

2. **Specific line changes:**
   ```tsx
   // Line 432 - revert section class
   <section className="quote-wizard sec-pad">
   
   // Lines 282-302 - revert step indicator to original
   <ul className="nav nav-pills mb-4 justify-content-center" role="tablist">
     {WIZARD_STEPS.map((step) => (
       <li key={step.number} className="nav-item" role="presentation">
         <button
           className={`nav-link ${currentStep === step.number ? 'active' : ''}`}
           ...
         >
   ```

---

## Guardian Rules Checklist

| Rule | Status |
|------|--------|
| Finibus 1:1 Parity | ✅ Preserved (using existing service-area class) |
| Darkone 1:1 Parity | ✅ Not touched |
| No new CSS/SCSS files | ✅ No files added |
| No new CSS classes | ✅ Using existing classes only |
| No schema changes | ✅ Not touched |
| No routing changes | ✅ Not touched |
| Monorepo separation | ✅ Public only |

---

## Verification Requirements

Before proceeding:
- [ ] Desktop screenshot shows dark background
- [ ] Desktop screenshot shows 5 steps in one row
- [ ] Mobile (375px) screenshot shows horizontal scroll for steps
- [ ] No console errors
- [ ] No horizontal page overflow
- [ ] Service cards readable on dark background

---

## Stop Condition

**HARD STOP after verification. Await explicit approval for Phase 6D Admin.**
