# Phase 10A — Services Pricing Architecture & Visual Parity Fix

```
Status: DOCUMENTED — NOT EXECUTED
Phase: 10A
Scope: Services Landing + Service Detail Pricing Only
Execution: BLOCKED — Awaiting Explicit Authorization
Last Updated: 2025-12-26
```

---

## 1. Problem Statement

The Service Detail pages (`/service-details/:slug`) display pricing tables that are **visually broken** compared to the Finibus demo reference. The pricing section fails to achieve pixel-perfect parity with the original template.

### Symptoms

| Issue | Description |
|-------|-------------|
| Layout mismatch | Pricing cards do not align with Finibus 3-column layout |
| Typography inconsistent | Font sizes, weights, and colors differ from reference |
| Card structure wrong | Uses custom `price-card` class instead of Finibus `single-price-box` |
| Toggle styling broken | Monthly/Yearly toggle lacks proper Finibus styling |
| Responsive issues | Mobile stacking behavior differs from demo |

---

## 2. Root Cause Analysis

### 2.1 The Problem: DB-Loaded Content vs Finibus Markup

When the pricing table was wired to the database (`service_pricing_plans` table), the implementation:

1. **Created custom components** (`PriceBox.tsx`, `ServicePrice.tsx`) with invented CSS classes
2. **Did NOT replicate** the exact Finibus HTML structure and class names
3. **Assumes CSS exists** for classes like `price-card`, `price-count`, `price-feature` — which do not exist in Finibus

### 2.2 Correct Reference: Finibus Pricing Structure

The Finibus template uses a specific pricing structure with these exact classes:

**Wrapper:** `section.pricing-plan.sec-mar`

**Card:** `div.single-price-box`

**Internal Structure:**
```html
<div class="single-price-box">
  <span class="package-name">Plan Name</span>
  <div class="price-count">
    $99/<sub>Per month</sub>
  </div>
  <ul class="feature-list">
    <li><i class="fas fa-check"></i> Feature text</li>
  </ul>
  <div class="pay-btn">
    <a href="#">Get Started</a>
  </div>
</div>
```

### 2.3 Current (Broken) Implementation

**File:** `apps/public/src/components/pages/ServiceDetails/PriceBox.tsx`

**Uses (WRONG):**
- `div.price-card` (class does not exist in Finibus CSS)
- `span.pack-currency` (class does not exist)
- `span.pack-duration` (class does not exist)
- `ul.price-feature` (class does not exist)
- `div.price-btn` (class does not exist)

---

## 3. Comparison: Correct vs Broken

### 3.1 Services Landing Page Pricing (Reference — Visual Correct)

**File:** `apps/public/src/components/pages/service/ServicePrice.tsx`

This component uses hardcoded markup that **matches Finibus exactly**.

| Attribute | Value |
|-----------|-------|
| Wrapper | `section.pricing-plan.sec-mar` |
| Cards | `div.single-price-box` |
| Styling | ✅ Pixel-perfect |

### 3.2 Service Detail Page Pricing (Broken)

**File:** `apps/public/src/components/pages/ServiceDetails/ServicePrice.tsx`

This component uses custom classes that **do not exist in Finibus CSS**.

| Attribute | Value |
|-----------|-------|
| Wrapper | `div.service-price` (WRONG) |
| Cards | `div.price-card` (WRONG) |
| Styling | ❌ Broken |

---

## 4. Visual Source of Truth

**Finibus Demo** is the single authoritative visual reference.

### 4.1 Desktop Requirements

- 3-column card layout
- Cards equal height
- Typography exact match
- Button gradient exact match
- Spacing exact match

### 4.2 Mobile Requirements

- Cards stack vertically (full width)
- Proper spacing between stacked cards
- Toggle remains above cards
- Typography scales correctly

---

## 5. Fix Strategy (NO CODE — PLANNING ONLY)

### 5.1 Services Landing Page

**Action:** Remove pricing section from `/services`

**Method:** Comment out or remove `<ServicePrice />` component usage in the Services landing page component.

**Rationale:** Per Phase 10 requirements, pricing should NOT display on the Services overview page.

### 5.2 Service Detail Pages

**Action:** Fix pricing table to match Finibus structure exactly

**Method:**

1. Update `PriceBox.tsx` to use Finibus class structure:
   - `single-price-box` instead of `price-card`
   - `feature-list` instead of `price-feature`
   - `pay-btn` instead of `price-btn`
   - Correct price format: `$99/<sub>Per month</sub>`

2. Update `ServicePrice.tsx` wrapper to use:
   - `section.pricing-plan.sec-mar` instead of `div.service-price`

3. Ensure Monthly/Yearly toggle uses Finibus tab structure

### 5.3 NO New CSS

All required CSS already exists in Finibus:
- `apps/public/src/assets/scss/pages/_service_page.scss`
- Bootstrap 5 grid classes

---

## 6. Allowed vs Forbidden

### 6.1 ALLOWED During Execution

| Action | Scope |
|--------|-------|
| Modify `PriceBox.tsx` | Change class names to Finibus equivalents |
| Modify `ServicePrice.tsx` (ServiceDetails) | Change wrapper structure |
| Modify `ServicesPage.tsx` | Remove pricing section usage |
| Update documentation | Record changes made |

### 6.2 FORBIDDEN During Execution

| Action | Reason |
|--------|--------|
| Create new CSS/SCSS files | Finibus CSS must be reused |
| Modify existing SCSS | No template changes allowed |
| Change database schema | No new tables, no column changes |
| Add new features | Quote wizard, checkout flow are OUT OF SCOPE |
| Touch other pages | Only Services landing + Service Detail |
| Modify `page_settings` | Not related to pricing |
| Modify `global_blocks` | Not related to pricing |

---

## 7. Acceptance Criteria Checklist

### 7.1 Services Landing Page

| Criteria | Requirement |
|----------|-------------|
| ✅ | No pricing section visible on `/services` |
| ✅ | Service cards still display correctly |
| ✅ | No console errors |

### 7.2 Service Detail Pages

| Criteria | Requirement |
|----------|-------------|
| ✅ | Pricing section matches Finibus demo pixel-perfect |
| ✅ | Monthly/Yearly toggle works |
| ✅ | Correct pricing shown per toggle state |
| ✅ | Desktop: 3-column card layout |
| ✅ | Mobile: Cards stack vertically |
| ✅ | Typography matches (fonts, sizes, colors) |
| ✅ | Buttons match (gradient, hover states) |
| ✅ | No console errors |
| ✅ | All services display pricing correctly |

### 7.3 Guardian Rules Compliance

| Rule | Requirement |
|------|-------------|
| ✅ | No new CSS files created |
| ✅ | No existing SCSS modified |
| ✅ | No database schema changes |
| ✅ | No scope creep beyond Services pages |
| ✅ | Restore point created before execution |

---

## 8. Dependencies

| Dependency | Status |
|------------|--------|
| Phase 9 CLOSED | ✅ Complete |
| `service_pricing_plans` table | ✅ Exists with data |
| Finibus CSS available | ✅ `_service_page.scss` |

---

## 9. Out of Scope (Explicit)

| Feature | Status |
|---------|--------|
| Quote request wizard | ❌ NOT in Phase 10A |
| Pricing → checkout flow | ❌ NOT in Phase 10A |
| Subscription logic | ❌ NOT in Phase 10A |
| Stripe integration | ❌ NOT in Phase 10A |
| New pricing plan types | ❌ NOT in Phase 10A |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-26 | Planning Agent | Initial documentation — NO EXECUTION |
