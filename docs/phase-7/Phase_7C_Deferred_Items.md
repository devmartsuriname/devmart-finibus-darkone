# Phase 7C Deferred Items

**Document Purpose:** Track features intentionally NOT implemented in Phase 7C  
**Created:** 2026-01-02  
**Status:** REFERENCE DOCUMENT

---

## Purpose

This document explicitly lists all features, integrations, and capabilities that are **DEFERRED** from Phase 7C. These items are not bugs or omissions — they are intentionally excluded per project scope and guardian rules.

---

## Deferred Features Table

### NOT AUTHORIZED (Requires Explicit Approval)

| Feature | Reason for Deferral | Target Phase | Priority |
|---------|---------------------|--------------|----------|
| Google Ads integration | Requires external script authorization | Phase 7D | NOT AUTHORIZED |
| Meta / Facebook Pixel | Requires external script authorization | Phase 7D | NOT AUTHORIZED |
| GA4 (Google Analytics 4) | Requires external analytics provider | NOT PLANNED | NOT AUTHORIZED |
| External analytics SDKs | Against guardian rules | NOT PLANNED | NOT AUTHORIZED |
| Conversion attribution | Requires UTM + Ads data correlation | Phase 7E+ | NOT AUTHORIZED |

### DEFERRED (May Be Implemented Later)

| Feature | Reason for Deferral | Target Phase | Priority |
|---------|---------------------|--------------|----------|
| Date range filters | UI complexity, not MVP | 7D or later | LOW |
| Custom date picker | Requires additional UI components | 7D or later | LOW |
| Real-time updates | Polling sufficient for current needs | 7D or later | LOW |
| Export to CSV/PDF | Nice-to-have, not MVP | 7D or later | LOW |
| Dashboard alerts | Requires notification infrastructure | NOT PLANNED | LOW |
| Email notifications | Out of scope | NOT PLANNED | LOW |

### NOT PLANNED (Out of Scope)

| Feature | Reason | Status |
|---------|--------|--------|
| Client-visible dashboards | Internal only per constraints | NOT PLANNED |
| Sales pipeline / Deal stages | Quotes = intake only | NOT PLANNED |
| Forecasting / Projections | Out of scope | NOT PLANNED |
| Heatmaps | Requires Hotjar/similar | NOT PLANNED |
| User session tracking | Privacy scope | NOT PLANNED |
| A/B testing | Not in project scope | NOT PLANNED |

---

## Data Gaps (Cannot Be Filled Without External Integration)

The following metrics cannot be displayed because the underlying data does not exist without external integrations:

| Data Gap | Current State | Required Integration |
|----------|---------------|----------------------|
| Ad spend | No data | Google Ads API |
| Cost per lead (CPL) | No data | Google Ads API + Meta API |
| ROAS (Return on Ad Spend) | No data | Ads APIs |
| Organic vs Paid breakdown | UTM only | GA4 or similar |
| Blog post views | Not tracked | GA4 or Plausible |
| Project page views | Not tracked | GA4 or Plausible |
| Time on site | Not tracked | GA4 |
| Bounce rate | Not tracked | GA4 |
| Session duration | Not tracked | GA4 |

---

## Constraints That Prevent Implementation

| Constraint | Affected Features | Source |
|------------|-------------------|--------|
| No external scripts | Google Ads, Meta Pixel, GTM | Project Rules |
| Darkone 1:1 parity | Custom visualizations, new UI patterns | Template Lock |
| Finibus 1:1 parity | Any public-facing changes | Frontend Lock |
| No schema changes (in this phase) | New tracking tables | Phase Discipline |
| Internal only requirement | Client dashboards | Scope Definition |

---

## Explicit Prohibitions (From User Instructions)

The following were explicitly listed as **DO NOT DO** in Phase 7C:

1. ❌ Do NOT add Google Ads
2. ❌ Do NOT add Meta / Facebook Pixel
3. ❌ Do NOT add GA4
4. ❌ Do NOT add new KPIs or charts
5. ❌ Do NOT modify Admin UI components
6. ❌ Do NOT touch Public / Finibus
7. ❌ Do NOT touch CSS or routes

---

## Phase 7D Scope (If Authorized)

If Phase 7D (Marketing Integrations) is authorized, it MAY include:

- Google Ads conversion tracking script
- Meta Pixel implementation
- GTM container integration
- Conversion attribution logic
- Enhanced dashboard metrics

**Status:** NOT AUTHORIZED — Requires explicit approval.

---

## Notes

- All deferred items are intentional decisions, not missing features
- Phase 7D authorization is REQUIRED before any ads/pixel work
- Some items are permanently "NOT PLANNED" and will not be implemented
- Priorities may change based on business needs
- This document should be reviewed before any Phase 7D planning

---

## Related Documents

- `docs/phase-7/Phase_7C_Governance_Summary.md` — KPI and component status
- `docs/restore-points/Phase_7C_Restore.md` — Rollback instructions
- `docs/Tasks.md` — Phase status tracking
