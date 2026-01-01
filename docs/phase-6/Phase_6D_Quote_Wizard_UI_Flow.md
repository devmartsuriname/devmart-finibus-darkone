# Phase 6D: Quote Wizard UI + Flow Execution Plan

**Status:** PLANNING ONLY — EXECUTION NOT AUTHORIZED  
**Phase:** 6D (Quote Wizard UI + Flow Planning)  
**Prepared:** 2025-12-31  
**Prerequisite:** Phase 6C (Schema) must be executed first

---

## Objective

Translate the Phase 6C schema and Phase 6B planning documents into a detailed UI + data-flow execution plan that maps:
1. Wizard step order and navigation
2. Data captured per step
3. UI component → schema field mapping
4. Validation rules (required/optional)
5. State management approach

---

## 1. Wizard Step Structure

| Step | Name | Purpose | Components Reused |
|------|------|---------|-------------------|
| 0 | Page Shell | Route `/quote`, Breadcrumb header, LetsTalkArea footer | Breadcrumb, LetsTalkArea |
| 1 | Service Selection | Multi-select from 7 services | Service card pattern (modified) |
| 2 | Tier Configuration | Per-service tier + global billing toggle | PriceBox, ServicePrice toggle pattern |
| 3 | Quote Summary | Review selections + calculated total | Existing grid classes |
| 4 | Contact Information | Lead capture form | ContactForm pattern |
| 5 | Confirmation | Success message with quote reference | Inline success pattern |

---

## 2. Step-by-Step Field Mapping

### Step 1: Service Selection

| UI Element | Data Source | User Action | State Captured |
|------------|-------------|-------------|----------------|
| Service card grid | `services` table (published only) | Checkbox toggle | `selectedServiceIds: string[]` |
| Service icon | `services.icon_media_id` → `media.public_url` | Display only | — |
| Service title | `services.title` | Display only | — |
| Service description | `services.short_description` | Display only | — |
| Next button | Local state | Click (enabled if 1+ selected) | Navigation |

**Validation:**
- At least 1 service must be selected to proceed
- Button disabled until validation passes

---

### Step 2: Tier Configuration

| UI Element | Data Source | User Action | State Captured |
|------------|-------------|-------------|----------------|
| Billing toggle | Local state | Tab click (Monthly/Yearly) | `billingPeriod: 'monthly' | 'yearly'` |
| Service name (current) | `services.title` | Display only | — |
| PriceBox cards (3 tiers) | `service_pricing_plans` (filtered by service + billing) | Radio select | `selections[serviceId].planId: string` |
| Plan name | `plan_name` | Display only | — |
| Price | `price_amount` + `currency` | Display only | — |
| Features list | `features[]` | Display only | — |
| Progress indicator | Local state | Display only | Current service / total |
| Prev/Next buttons | Local state | Navigation | — |

**Validation:**
- One tier must be selected per service
- Cannot proceed to next service without selection

**Special Behavior:**
- Billing toggle is GLOBAL (affects all services)
- If user changes billing period, all tier selections are preserved (plan IDs remain valid because monthly/yearly plans have different IDs)

---

### Step 3: Quote Summary

| UI Element | Data Source | User Action | State Captured |
|------------|-------------|-------------|----------------|
| Line item list | Aggregated selections | Display only | — |
| Service title | Snapshot from `services.title` | Display only | `items[].serviceTitle` |
| Plan name | Snapshot from `plan_name` | Display only | `items[].planName` |
| Price per item | Snapshot from `price_amount` | Display only | `items[].priceAmount` |
| Currency | Snapshot from `currency` | Display only | `items[].currency` |
| Billing period | Local state | Display only | `billingPeriod` |
| Subtotal | Calculated client-side | Display only | `totalAmount` |
| Modify button | Navigation | Back to Step 1 | — |
| Continue button | Navigation | To Step 4 | — |

**Calculation:**
- `totalAmount = sum(items[].priceAmount)`
- Currency assumed uniform (all USD per current data)

---

### Step 4: Contact Information

| UI Element | Data Source | User Action | State Captured |
|------------|-------------|-------------|----------------|
| Name input | User input | Type | `name: string` (required) |
| Email input | User input | Type | `email: string` (required) |
| Company input | User input | Type | `company: string` (optional) |
| Message textarea | User input | Type | `message: string` (optional) |
| Honeypot field | Hidden | — | `honeypot: string` (spam check) |
| Submit button | Form submit | Click | Trigger submission |

**Validation:**
- Name: required, max 100 chars
- Email: required, valid email format, max 255 chars
- Company: optional, max 100 chars
- Message: optional, max 1000 chars
- Honeypot: if filled, silent fake success (anti-spam)

---

### Step 5: Confirmation (Success State)

| UI Element | Data Source | User Action | State Captured |
|------------|-------------|-------------|----------------|
| Success message | Static text | Display only | — |
| Quote reference | Server response (`quotes.reference_number`) | Display only | `referenceNumber` |
| View Services link | Static route | Navigation to `/service` | — |
| Home link | Static route | Navigation to `/` | — |

---

## 3. UI Component Reuse Matrix

| Wizard Section | Existing Component | File Path | Adaptation Required |
|----------------|-------------------|-----------|---------------------|
| Page header | `Breadcrumb` | `common/Breadcrumb.tsx` | Props: `pageName="Get a Quote"` |
| Page footer CTA | `LetsTalkArea` | `common/LetsTalkArea.tsx` | None (use as-is) |
| Service cards | Service card pattern | `Home/ServiceArea.tsx` | Add checkbox selection state |
| Tier cards | `PriceBox` | `ServiceDetails/PriceBox.tsx` | Add radio selection state, remove Link |
| Billing toggle | Tab pattern | `ServiceDetails/ServicePrice.tsx` | Extract toggle, remove section wrapper |
| Contact form | `ContactForm` pattern | `contact/ContactForm.tsx` | Add company field, reuse validation |
| Navigation buttons | `.cmn-btn a` | CSS pattern | Standard usage |
| Section spacing | `.sec-pad`, `.sec-mar` | CSS pattern | Standard usage |
| Title blocks | `.title`, `.title.black` | CSS pattern | Standard usage |
| Grid layout | `col-md-6 col-lg-4 col-xl-4` | Bootstrap | Standard 3-column for tiers |

---

## 4. State Management Approach

```typescript
WizardState = {
  // Step tracking
  currentStep: number (1-5),
  
  // Step 1: Service Selection
  selectedServiceIds: string[],
  
  // Step 2: Tier Configuration
  billingPeriod: 'monthly' | 'yearly',
  selections: {
    [serviceId: string]: {
      planId: string,
      planName: string,
      priceAmount: number,
      currency: string
    }
  },
  currentServiceIndex: number,
  
  // Step 3: Summary (derived)
  totalAmount: number (calculated),
  
  // Step 4: Contact
  name: string,
  email: string,
  company: string,
  message: string,
  honeypot: string,
  
  // Step 5: Result
  isSubmitting: boolean,
  submitStatus: 'idle' | 'success' | 'error',
  referenceNumber: string | null,
  errorMessage: string | null
}
```

---

## 5. Data Submission Flow (Schema Mapping)

**On Submit (Step 4):**

1. **Check honeypot** — if filled, fake success, do not insert

2. **Generate reference number** — `QT-2025-XXXX` format (server-side or edge function)

3. **INSERT lead:**
   ```sql
   INSERT INTO leads (name, email, subject, message, source)
   VALUES ($name, $email, $company, $message, 'quote_wizard')
   RETURNING id
   ```

4. **INSERT quote:**
   ```sql
   INSERT INTO quotes (reference_number, lead_id, total_amount, currency, billing_period, status)
   VALUES ($refNum, $leadId, $total, 'USD', $billingPeriod, 'pending')
   RETURNING id
   ```

5. **UPDATE lead with quote_id:**
   ```sql
   UPDATE leads SET quote_id = $quoteId WHERE id = $leadId
   ```

6. **INSERT quote_items (per selected service):**
   ```sql
   INSERT INTO quote_items (quote_id, service_id, plan_id, service_title, plan_name, price_amount, currency)
   VALUES ($quoteId, $serviceId, $planId, $serviceTitle, $planName, $priceAmount, 'USD')
   ```

7. **Return reference number** to display in confirmation

---

## 6. Validation Rules Summary

| Field | Required | Format | Max Length | Error Message |
|-------|----------|--------|------------|---------------|
| Service selection | Yes (1+) | Array | — | "Please select at least one service" |
| Tier selection | Yes (per service) | UUID | — | "Please select a tier for {service}" |
| Billing period | Yes | 'monthly'/'yearly' | — | — |
| Name | Yes | Text | 100 | "Name is required" |
| Email | Yes | Email format | 255 | "Valid email required" |
| Company | No | Text | 100 | — |
| Message | No | Text | 1000 | — |

---

## 7. CSS Classes Used (No New Styles)

| Section | Classes | Source |
|---------|---------|--------|
| Page wrapper | `.sec-pad` | Existing |
| Step title | `.title`, `.title.black` | Existing |
| Service cards | `.single-service` (modified for selection) | ServiceArea pattern |
| Tier cards | `.single-price-box` | PriceBox |
| Billing tabs | `.nav-pills`, `.nav-link` | ServicePrice |
| Form inputs | Form element selectors (contact form) | ContactForm |
| Buttons | `.cmn-btn a`, `.pay-btn a` | Existing |
| Grid | Bootstrap row/col classes | Existing |

---

## 8. NON-NEGOTIABLE CONSTRAINTS

| Constraint | Enforcement |
|------------|-------------|
| Finibus 1:1 Parity | All UI must use documented patterns only |
| Darkone 1:1 Parity | Admin app unchanged |
| CSS Isolation | No shared styles between apps |
| Monorepo Separation | No cross-app imports |
| Template Lock | No new UI patterns |
| Component Reuse Only | Only Uniformity Library components |

---

## 9. BLOCKERS CHECKLIST

| Blocker | Required For | Status |
|---------|--------------|--------|
| Phase 6C schema execution | Any data persistence | **NOT AUTHORIZED** |
| `/quote` route creation | Wizard page access | **NOT AUTHORIZED** |
| Wizard component creation | UI implementation | **NOT AUTHORIZED** |

---

## 10. Assumptions (Requiring Confirmation)

| Assumption | Default | Confirmation Needed From |
|------------|---------|--------------------------|
| All prices in USD | Yes | Product |
| Company field replaces Subject field | Yes | Product |
| Quote reference generated server-side | Yes | Architecture |
| No step skip allowed | Correct | UX |
| Billing toggle resets tier selections | No (preserve) | UX |

---

## 11. Risk & Dependency Notes

### Hard Blockers
- Phase 6C schema execution must complete before any UI work
- Route creation requires approved schema
- No wizard component implementation until both complete

### Dependencies on Future Phases
- **Phase 6E:** Admin quote management (not planned yet)
- **Future:** PDF generation, email notifications, quote analytics

### Explicit Non-Goals (Phase 6D will NOT do)
- Create any routes or pages
- Implement any React components
- Execute any SQL or RLS policies
- Modify any CSS or SCSS files
- Touch the Admin (Darkone) app
- Add any npm packages

---

## 12. Guardian Rules Compliance

| Rule | Status |
|------|--------|
| No code changes | ✅ Documentation only |
| No schema changes | ✅ Not authorized |
| No UI modifications | ✅ Not authorized |
| No routing changes | ✅ Not authorized |
| No new components | ✅ Not authorized |
| No CSS/SCSS changes | ✅ Not authorized |
| Monorepo separation | ✅ Respected |
| Finibus 1:1 parity | ✅ Preserved |
| Darkone 1:1 parity | ✅ Preserved |

---

## Status Report

**What is Ready:**
- Phase 6D UI + Flow documentation fully planned
- Step-by-step field mapping complete
- Component reuse matrix defined
- State management approach documented
- Submission flow mapped to schema

**What is Blocked:**
- Phase 6C schema execution required first
- Route creation requires schema
- UI implementation requires both

**What is Deferred:**
- Admin quote management (future phase)
- PDF generation
- Email notifications
- Quote analytics

---

## Stop Condition

**PLANNING COMPLETE — EXECUTION NOT AUTHORIZED**

Await explicit authorization before:
1. Phase 6C schema execution
2. Phase 6D UI implementation
3. Route creation

**HARD STOP**
