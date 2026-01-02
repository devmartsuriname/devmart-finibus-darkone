# Phase 7D — Marketing Integrations (PLANNING ONLY)

**Status:** PLANNING COMPLETE — NOT EXECUTED  
**Created:** 2026-01-02  
**Last Updated:** 2026-01-02

---

## 1. Objective

Design and document how external marketing integrations (Google Ads, Meta Pixel) will work alongside existing first-party tracking. This phase is DOCUMENTATION ONLY — no scripts, pixels, or code changes.

---

## 2. Current State (Phase 7B/7C Baseline)

### 2.1 Existing First-Party Events

| Event Type | Trigger Location | Source | Metadata |
|------------|------------------|--------|----------|
| `quote_started` | QuoteWizard mount | `quote_wizard` | — |
| `quote_step_completed` | Step transition | `quote_wizard` | `from_step`, `to_step` |
| `quote_submitted` | Successful submission | `quote_wizard` | `total_amount`, `currency`, `billing_period`, `services_count` |
| `contact_form_submitted` | Contact form success | `contact_form` | — |
| `service_pricing_cta_clicked` | PriceBox CTA click | `service_pricing` | `plan_name` |

### 2.2 Current Data Flow

```
[Public Site] → trackEvent() → marketing_events table → [Admin UI]
```

### 2.3 UTM Attribution (Phase 7A)

UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) are captured and stored in `leads` and `quotes` tables.

---

## 3. Google Ads Integration Design

### 3.1 Conversion Actions (Proposed)

| Conversion Name | Trigger Event | Category | Value |
|-----------------|---------------|----------|-------|
| `Lead Submitted` | `contact_form_submitted` | Lead | Static ($0) |
| `Quote Started` | `quote_started` | Engagement | Static ($0) |
| `Quote Submitted` | `quote_submitted` | Lead | Dynamic (total_amount) |

### 3.2 Implementation Approach

**Option A: Google Ads Tag (gtag.js)**
- Add gtag.js script to public app head
- Fire `gtag('event', 'conversion', {...})` on existing events
- Requires Conversion ID and Label from Google Ads account

**Option B: Google Tag Manager (GTM)**
- Add GTM container to public app
- Configure conversion triggers in GTM UI
- More flexible but adds complexity

**Recommended:** Option A (Direct gtag.js) for simplicity

### 3.3 Event Mapping

| Internal Event | Google Ads Event | Parameters |
|----------------|------------------|------------|
| `quote_started` | `begin_checkout` | — |
| `quote_submitted` | `purchase` | `value`, `currency`, `transaction_id` |
| `contact_form_submitted` | `generate_lead` | — |
| `service_pricing_cta_clicked` | `view_item` | `item_name` |

### 3.4 Enhanced Conversions (Optional)

For improved attribution, may capture (with consent):
- Email (hashed)
- Phone (hashed)

**Status:** NOT PLANNED (requires consent infrastructure)

---

## 4. Meta / Facebook Pixel Design

### 4.1 Standard Events (Proposed)

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `PageView` | All pages | — |
| `Lead` | `contact_form_submitted` | — |
| `InitiateCheckout` | `quote_started` | — |
| `Purchase` | `quote_submitted` | `value`, `currency` |
| `ViewContent` | `service_pricing_cta_clicked` | `content_name` |

### 4.2 Implementation Approach

- Add Meta Pixel base code to public app head
- Fire `fbq('track', 'EventName', {...})` on existing events
- Requires Pixel ID from Meta Business Suite

### 4.3 Event Mapping

| Internal Event | Meta Pixel Event | Parameters |
|----------------|------------------|------------|
| `quote_started` | `InitiateCheckout` | — |
| `quote_submitted` | `Purchase` | `value`, `currency` |
| `contact_form_submitted` | `Lead` | — |
| `service_pricing_cta_clicked` | `ViewContent` | `content_name` |

### 4.4 Conversions API (CAPI) — DEFERRED

Server-side event sending for improved attribution. Requires:
- Edge function to send events to Meta
- Access token configuration
- Event deduplication

**Status:** DEFERRED to Phase 7E or later

---

## 5. Event Naming Conventions

### 5.1 Internal Events (marketing_events table)

Format: `{action}_{object}_{context}`

| Pattern | Example |
|---------|---------|
| Action + Object | `quote_started`, `quote_submitted` |
| Object + Action | `contact_form_submitted` |
| Object + Context + Action | `service_pricing_cta_clicked` |

### 5.2 External Platform Mapping

| Internal Event | Google Ads | Meta Pixel | Notes |
|----------------|------------|------------|-------|
| `quote_started` | `begin_checkout` | `InitiateCheckout` | Standard e-commerce event |
| `quote_step_completed` | — (not sent) | — (not sent) | Internal only |
| `quote_submitted` | `purchase` | `Purchase` | Primary conversion |
| `contact_form_submitted` | `generate_lead` | `Lead` | Standard lead event |
| `service_pricing_cta_clicked` | `view_item` | `ViewContent` | Engagement signal |

### 5.3 Custom Events (If Needed)

Reserved for future custom events not mapped to standard platform events:
- `devmart_quote_started` (Google Ads custom)
- `DevmartQuoteStart` (Meta custom)

---

## 6. Data Flow Architecture

### 6.1 Current (Phase 7B)

```
┌─────────────────────┐
│   Public Site       │
│   (Finibus)         │
└─────────┬───────────┘
          │ trackEvent()
          ▼
┌─────────────────────┐
│  Supabase           │
│  marketing_events   │
└─────────┬───────────┘
          │ SELECT
          ▼
┌─────────────────────┐
│   Admin Dashboard   │
│   (Darkone)         │
└─────────────────────┘
```

### 6.2 Proposed (Phase 7D)

```
┌─────────────────────┐
│   Public Site       │
│   (Finibus)         │
└─────────┬───────────┘
          │
    ┌─────┼─────┬──────────┐
    │     │     │          │
    ▼     ▼     ▼          ▼
┌───────┐ ┌───────┐ ┌──────────────┐
│ gtag  │ │ fbq   │ │ trackEvent() │
│ .js   │ │ Pixel │ │ (Supabase)   │
└───┬───┘ └───┬───┘ └──────┬───────┘
    │         │            │
    ▼         ▼            ▼
┌───────┐ ┌───────┐ ┌──────────────┐
│Google │ │ Meta  │ │ marketing_   │
│ Ads   │ │ Ads   │ │ events table │
└───────┘ └───────┘ └──────┬───────┘
                           │
                           ▼
                   ┌──────────────┐
                   │ Admin        │
                   │ Dashboard    │
                   └──────────────┘
```

### 6.3 Key Principle: Parallel Firing

All three destinations receive events simultaneously:
- Internal tracking (first-party, always)
- Google Ads (if configured)
- Meta Pixel (if configured)

---

## 7. Admin Visibility Design

### 7.1 Current KPIs (Phase 7C — FINAL)

| KPI | Source | Status |
|-----|--------|--------|
| Total Leads | `leads` table | ✅ FINAL |
| Total Quotes | `quotes` table | ✅ FINAL |
| Quote Value | `quotes.total_amount` | ✅ FINAL |
| Content Items | `blog_posts` + `projects` + `services` | ✅ FINAL |

### 7.2 Proposed Additional KPIs (Phase 7D — IF IMPLEMENTED)

| KPI | Source | Dependency |
|-----|--------|------------|
| Funnel: Quote Started | `marketing_events` | First-party (ready) |
| Funnel: Quote Submitted | `marketing_events` | First-party (ready) |
| Funnel: Contact Submitted | `marketing_events` | First-party (ready) |
| CTR: Pricing CTA | `marketing_events` | First-party (ready) |

**Note:** External ad platform metrics (spend, CPC, ROAS) require API integration — NOT IN SCOPE for Phase 7D.

### 7.3 Dashboard Enhancement (If Authorized)

Potential additions using Darkone components:

| Component | Pattern Source | Data |
|-----------|----------------|------|
| Funnel Conversion Chart | `Chart.tsx` (bar) | marketing_events counts |
| Event Trend Line | `Chart.tsx` (area) | marketing_events by date |

---

## 8. Implementation Files (Planned — NOT AUTHORIZED)

### 8.1 New Files (If Executed)

| File | Purpose |
|------|---------|
| `apps/public/src/lib/analytics.ts` | Unified analytics wrapper |
| `apps/public/src/hooks/useGoogleAds.ts` | Google Ads event helper |
| `apps/public/src/hooks/useMetaPixel.ts` | Meta Pixel event helper |

### 8.2 Modified Files (If Executed)

| File | Change |
|------|--------|
| `apps/public/index.html` | Add gtag.js and fbq scripts |
| `apps/public/src/hooks/useMarketingEvents.ts` | Call external trackers alongside internal |

### 8.3 Environment Configuration

**IMPORTANT:** This project does NOT use Lovable Cloud for secrets.

Credentials will be managed via:
- **Supabase environment variables** (for edge functions, if needed)
- **Project-level `.env` files** (for build-time variables, where applicable)

| Variable | Purpose | Storage |
|----------|---------|---------|
| `GOOGLE_ADS_CONVERSION_ID` | Google Ads account ID | Supabase env / .env |
| `GOOGLE_ADS_CONVERSION_LABEL` | Conversion action label | Supabase env / .env |
| `META_PIXEL_ID` | Facebook Pixel ID | Supabase env / .env |

---

## 9. Guardian Rules Verification

| Rule | Phase 7D Compliance |
|------|---------------------|
| Finibus 1:1 parity | ✅ Scripts are invisible, no UI changes |
| Darkone 1:1 parity | ✅ Dashboard uses existing patterns only |
| No schema changes | ✅ No database modifications planned |
| Mono-repo boundaries | ✅ Public and Admin remain separated |
| No new dependencies | ✅ gtag.js and fbq are script tags, not npm packages |

---

## 10. Explicitly OUT OF SCOPE

| Item | Reason | Status |
|------|--------|--------|
| Google Analytics 4 (GA4) | Not required for ad tracking | OUT OF SCOPE |
| Hotjar / Heatmaps | Privacy scope | OUT OF SCOPE |
| Session recording | Privacy scope | OUT OF SCOPE |
| A/B testing | Not in project scope | OUT OF SCOPE |
| Enhanced Conversions (hashed PII) | Requires consent infrastructure | DEFERRED |
| Conversions API (CAPI) | Requires edge function | DEFERRED |
| Ad spend / ROAS metrics | Requires platform API access | DEFERRED |
| Cookie consent banner | Requires privacy review | DEFERRED |

---

## 11. Deferred Items (From Phase 7C + New)

| Item | Target Phase | Notes |
|------|--------------|-------|
| Date range filters | 7E+ | Dashboard enhancement |
| Export to CSV/PDF | 7E+ | Nice-to-have |
| Real-time updates | 7E+ | Polling sufficient |
| Enhanced Conversions | 7E+ | Requires consent |
| Conversions API (CAPI) | 7E+ | Server-side tracking |
| Ad spend visualization | 7E+ | Requires API access |

---

## 12. Execution Requirements (When Authorized)

Before Phase 7D execution can begin:

1. [ ] Google Ads Conversion ID and Labels provided
2. [ ] Meta Pixel ID provided
3. [ ] Credentials configured in Supabase environment variables or project .env
4. [ ] Privacy/consent decision made
5. [ ] Explicit execution authorization

---

## 13. Documents to Create (Upon Execution)

| Document | Purpose |
|----------|---------|
| `docs/phase-7/Phase_7D_Execution_Plan.md` | Step-by-step implementation |
| `docs/phase-7/Phase_7D_Verification_Checklist.md` | Testing criteria |
| `docs/restore-points/Phase_7D_Restore.md` | Rollback instructions |

---

## 14. HARD STOP

Phase 7D planning is complete. The following requires explicit authorization:

1. **Platform Credentials**: Google Ads Conversion ID/Labels, Meta Pixel ID
2. **Execution Authorization**: Explicit GO to implement scripts
3. **Privacy Decision**: Whether consent banner is required

**NO IMPLEMENTATION WILL OCCUR WITHOUT AUTHORIZATION.**
