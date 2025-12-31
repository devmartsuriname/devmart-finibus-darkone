# Quote Wizard Planning Document

**Status:** PLANNING ONLY  
**Phase:** Phase 6 (Quote Wizard)  
**Execution:** NOT AUTHORIZED  
**Last Updated:** 2025-12-31

---

## Overview

This document defines the planning and requirements for the Quote Wizard feature. It serves as the authoritative reference for implementation when authorized.

**IMPORTANT:** This is a planning document only. No implementation is authorized until explicit approval is received.

---

## 1. Scope Definition

### In Scope

| Feature | Description |
|---------|-------------|
| Multi-service selection | Users can select multiple services from the 7 available |
| Per-service tier selection | 3 tiers per service (Small Business, Professional, Enterprise) |
| Billing period toggle | Monthly/Yearly pricing options |
| Feature display | Show feature list per selected plan |
| Quote summary | Display itemized quote with calculated total |
| Lead capture form | Name, email, company (optional), message (optional) |
| Quote persistence | Store quote and line items in database |
| Quote-to-lead conversion | Link quote to leads table |

### Explicit Non-Scope

| Feature | Reason |
|---------|--------|
| Dynamic pricing formulas | Static tier pricing only (no calculations) |
| Discount codes / promo pricing | Not in initial MVP |
| Add-ons / modifiers | Services have fixed tiers only |
| Payment processing | Quote request only, not checkout |
| PDF quote generation | Deferred to future phase |
| Email quote delivery | Deferred to future phase |
| Quote editing after submission | Single submission only |
| Quote expiration | No time-based logic |
| Admin dashboard integration | Deferred (soft dependency) |
| Analytics tracking | Deferred (soft dependency) |

---

## 2. Existing Data Structure Analysis

### Services Table (`services`)

| Field | Type | Wizard Use |
|-------|------|------------|
| `id` | UUID | Service reference |
| `title` | TEXT | Display in selection |
| `short_description` | TEXT | Display in selection |
| `icon_media_id` | UUID FK | Display icon in selection |
| `show_pricing` | BOOLEAN | Filter services with pricing |
| `pricing_monthly_enabled` | BOOLEAN | Toggle monthly tab |
| `pricing_yearly_enabled` | BOOLEAN | Toggle yearly tab |
| `status` | TEXT | Filter published only |
| `display_order` | INT | Sort order |

### Pricing Plans Table (`service_pricing_plans`)

| Field | Type | Wizard Use |
|-------|------|------------|
| `id` | UUID | Plan reference |
| `service_id` | UUID FK | Link to service |
| `plan_name` | TEXT | Tier label (Small Business, Professional, Enterprise) |
| `plan_subtitle` | TEXT | Optional subtitle |
| `price_amount` | DECIMAL | Price for calculation |
| `currency` | TEXT | Currency symbol |
| `billing_period` | TEXT | monthly / yearly |
| `features` | JSONB | Feature list array |
| `cta_label` | TEXT | Button text |
| `status` | TEXT | Filter active only |
| `display_order` | INT | Sort order |

### Current State (Verified)

- **7 services** with `show_pricing = true`
- **6 pricing plans per service** (3 monthly + 3 yearly = 42 total plans)
- **3 tiers:** Small Business, Professional, Enterprise
- **Features stored as JSONB array** (string[])

### Existing Leads Table (`leads`)

| Field | Type | Wizard Use |
|-------|------|------------|
| `id` | UUID | Lead reference |
| `name` | TEXT | Required |
| `email` | TEXT | Required |
| `subject` | TEXT | Optional (wizard-generated) |
| `message` | TEXT | Optional |
| `source` | TEXT | `'quote_wizard'` |
| `status` | TEXT | Default: 'new' |
| `notes` | TEXT | Internal admin notes |

---

## 3. Required Backend Data

### New Tables Required (NOT AUTHORIZED)

**⚠️ SCHEMA CHANGES ARE NOT AUTHORIZED IN THIS PHASE**

The following tables are required for implementation but will require explicit schema migration authorization:

#### `quotes` Table (Proposed)

```sql
-- NOT AUTHORIZED — FOR PLANNING ONLY
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id),
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  billing_period TEXT NOT NULL, -- 'monthly' or 'yearly'
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### `quote_items` Table (Proposed)

```sql
-- NOT AUTHORIZED — FOR PLANNING ONLY
CREATE TABLE public.quote_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id),
  plan_id UUID REFERENCES public.service_pricing_plans(id),
  plan_name TEXT NOT NULL,
  price_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### Leads Table Extension (Proposed)

```sql
-- NOT AUTHORIZED — FOR PLANNING ONLY
ALTER TABLE public.leads
ADD COLUMN quote_id UUID REFERENCES public.quotes(id);
```

---

## 4. Conceptual UX Flow

### Step 1: Service Selection

```
┌─────────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Get a Quote                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Section Title: "Select Your Services"                       │
│  Subtitle: "Choose one or more services for your quote"      │
│                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ ☐ Service 1 │ │ ☐ Service 2 │ │ ☐ Service 3 │            │
│  │   [icon]    │ │   [icon]    │ │   [icon]    │            │
│  │   Title     │ │   Title     │ │   Title     │            │
│  │   Desc...   │ │   Desc...   │ │   Desc...   │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                              │
│  [... more services ...]                                     │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    [ Next Step → ]                       ││
│  │                (disabled until 1+ selected)              ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Interaction:**
- Cards are selectable (checkbox toggle)
- Multiple services can be selected
- "Next Step" button enables when at least 1 service selected
- Visual indicator (checkmark, border highlight) for selected services

---

### Step 2: Configure Each Service

```
┌─────────────────────────────────────────────────────────────┐
│  Progress: Step 2 of 4 — Configure Services                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Service: "Web Design" (1 of 3 selected)                     │
│                                                              │
│  [ Pay Monthly ] [ Pay Yearly ]  ← Toggle                    │
│                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ ○ Small Biz │ │ ● Prof.     │ │ ○ Enterprise│            │
│  │   $99/mo    │ │   $199/mo   │ │   $399/mo   │            │
│  │   ─────     │ │   ─────     │ │   ─────     │            │
│  │  ✓ Feature  │ │  ✓ Feature  │ │  ✓ Feature  │            │
│  │  ✓ Feature  │ │  ✓ Feature  │ │  ✓ Feature  │            │
│  │  ✓ Feature  │ │  ✓ Feature  │ │  ✓ Feature  │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                              │
│  [← Previous Service]           [Next Service →]             │
│                 (or [Review Quote] if last service)          │
└─────────────────────────────────────────────────────────────┘
```

**Interaction:**
- One service at a time (carousel/stepper pattern)
- Billing toggle affects all services (global setting)
- One tier must be selected per service (radio behavior)
- Progress indicator shows current/total services

---

### Step 3: Quote Summary

```
┌─────────────────────────────────────────────────────────────┐
│  Progress: Step 3 of 4 — Review Your Quote                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Your Selected Services:                                     │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Web Design — Professional          $199/mo              ││
│  │ App Development — Enterprise       $599/mo              ││
│  │ Digital Marketing — Small Business  $99/mo              ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Billing: Monthly                                            │
│                                     ─────────────────────────│
│                                     Subtotal:    $897/mo     │
│                                                              │
│  [← Modify Selection]               [Request Quote →]        │
└─────────────────────────────────────────────────────────────┘
```

**Interaction:**
- Read-only summary of selections
- Clear itemized list with prices
- Total calculation (client-side sum)
- Option to go back and modify

---

### Step 4: Contact Information

```
┌─────────────────────────────────────────────────────────────┐
│  Progress: Step 4 of 4 — Your Information                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [ Name _____________________________ ] *                    │
│                                                              │
│  [ Email ____________________________ ] *                    │
│                                                              │
│  [ Company __________________________ ]                      │
│                                                              │
│  [ Message / Notes                    ]                      │
│  [                                    ]                      │
│  [____________________________________]                      │
│                                                              │
│  [hidden honeypot field]                                     │
│                                                              │
│  [← Back]                          [Submit Quote Request →]  │
│                                                              │
│  By submitting, you agree to our Privacy Policy              │
└─────────────────────────────────────────────────────────────┘
```

**Interaction:**
- Required fields: Name, Email
- Optional fields: Company, Message
- Honeypot anti-spam (hidden field)
- Client-side validation before submit
- On submit: Create lead + quote + quote_items

---

### Confirmation State

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                      ✓ Quote Submitted                       │
│                                                              │
│  Thank you for your interest! We've received your quote      │
│  request and will be in touch within 24-48 hours.            │
│                                                              │
│  Quote Reference: QT-2024-XXXX                               │
│                                                              │
│  [View Our Services]       [Return to Homepage]              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Reused UI Components

Based on Frontend Uniformity Library:

| Wizard Section | Reused Component | Source File | Adaptation |
|----------------|------------------|-------------|------------|
| Page header | `Breadcrumb` | `common/Breadcrumb.tsx` | `pageName="Get a Quote"` |
| Section titles | `.title` pattern | CSS class | Standard usage |
| Service cards | Service card pattern | `Home/ServiceArea.tsx` | Add selection state |
| Tier cards | `PriceBox` | `ServiceDetails/PriceBox.tsx` | Add radio selection |
| Billing toggle | Tab pattern | `ServiceDetails/ServicePrice.tsx` | Extract toggle |
| Form fields | Form pattern | `contact/ContactForm.tsx` | Extend with company |
| Honeypot | Honeypot pattern | `contact/ContactForm.tsx` | Copy implementation |
| Submit button | `.cmn-btn` | CSS class | Standard usage |
| Footer CTA | `LetsTalkArea` | `common/LetsTalkArea.tsx` | Use as-is |
| Grid layout | Bootstrap grid | CSS classes | 3-column for cards |
| Section spacing | `.sec-pad`, `.sec-mar` | CSS classes | Standard usage |

---

## 6. Open Questions & Decision Points

| # | Question | Options | Awaiting Decision From |
|---|----------|---------|------------------------|
| 1 | Where should the wizard live? | A) Dedicated page `/quote`<br>B) Modal overlay<br>C) Embedded in existing page | Product |
| 2 | Quote reference format? | A) Auto-increment (QT-0001)<br>B) UUID short (QT-a1b2c3)<br>C) Date-based (QT-2024-0001) | Product |
| 3 | Billing period scope? | A) Global (all services same)<br>B) Per-service (mix monthly/yearly) | Product |
| 4 | Price calculation? | A) Client-side only<br>B) Server-side validation<br>C) Edge function | Architecture |
| 5 | Confirmation behavior? | A) Inline success message<br>B) Redirect to thank-you page<br>C) Both options | UX |
| 6 | Admin notification? | A) None initially<br>B) Email alert<br>C) Dashboard badge | Product |

---

## 7. Dependencies

### Hard Blockers (Cannot Implement Without)

| Dependency | Description | Status |
|------------|-------------|--------|
| Schema migration | `quotes` and `quote_items` tables | **NOT AUTHORIZED** |
| RLS policies | Public INSERT, Admin READ | Pending schema |

### Soft Dependencies (Can Implement Without)

| Dependency | Description | Status |
|------------|-------------|--------|
| Admin quote management | View/manage quotes in CRM | Deferred to Dashboard phase |
| Quote analytics | Conversion tracking, metrics | Deferred to Analytics phase |
| Email notifications | Quote submission alerts | Deferred |
| PDF generation | Downloadable quote document | Deferred |

---

## 8. Proposed Implementation Phases

**Note:** These phases are NOT authorized. They represent a suggested implementation sequence.

### Phase 6A: Schema + Data Model (Requires Migration Authorization)

- Create `quotes` table with RLS
- Create `quote_items` table with RLS
- Extend `leads` table with `quote_id` FK
- Test policies

### Phase 6B: Frontend Wizard (Steps 1-3)

- Create wizard page/route
- Implement service selection UI
- Implement tier selection UI
- Implement billing toggle
- Implement summary calculation

### Phase 6C: Quote Submission (Step 4)

- Implement contact form
- Wire quote + lead creation
- Implement confirmation UI
- Add honeypot protection

### Phase 6D: Admin Quote View (Soft Dependency)

- Add quotes list to CRM module
- Implement quote detail view
- Add status management
- Link to leads

---

## 9. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Schema changes delay | High — blocks implementation | Document clearly, request approval early |
| UI fragmentation | Medium — inconsistent look | Use Uniformity Library strictly |
| Price calculation errors | High — incorrect quotes | Client-side + server validation |
| Spam submissions | Medium — fake leads | Honeypot + rate limiting |
| Mobile UX complexity | Medium — poor experience | Design mobile-first |

---

## 10. Acceptance Criteria (For Future Implementation)

When implementation is authorized, the following criteria must be met:

1. **Service Selection:** All 7 services display with icons and descriptions
2. **Tier Selection:** 3 tiers per service with features and prices
3. **Billing Toggle:** Monthly/yearly toggle works globally
4. **Summary Calculation:** Total correctly sums selected plans
5. **Form Submission:** Creates lead + quote + quote_items in database
6. **Spam Prevention:** Honeypot field prevents automated submissions
7. **Confirmation:** User sees success message with quote reference
8. **Template Parity:** Uses only existing Finibus UI patterns
9. **Admin Visibility:** Quotes visible in admin (Phase 6D)

---

## 11. Guardian Rules Compliance

| Rule | Status |
|------|--------|
| No schema changes | ✅ Compliant (planning only) |
| No new components | ✅ Compliant (reuse documented) |
| No UI modifications | ✅ Compliant (no code changes) |
| No routing changes | ✅ Compliant (planning only) |
| No package additions | ✅ Compliant (no dependencies) |
| Template parity | ✅ Compliant (Finibus patterns only) |
| Documentation accuracy | ✅ Verified against codebase |

---

## Document Status

- **Status:** Draft
- **Phase:** Planning Only
- **Execution:** Not Authorized
- **Hard Blocker:** Schema migration required
- **Next Step:** Await implementation authorization
