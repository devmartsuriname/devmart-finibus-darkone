# Admin Diagnostic: Dashboard & Analytics

**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Reusability Rule)  
**Status:** Placeholder State

---

## Current Dashboard Routes

| Route | Component | State | Data Connection |
|-------|-----------|-------|-----------------|
| `/dashboard` | ComingSoonPlaceholder | Placeholder | None |
| `/analytics` | ComingSoonPlaceholder | Placeholder | None |
| `/dashboards` | Darkone Demo | Static Demo | Hardcoded data |

---

## Darkone Demo Components (Reusable)

Located in: `src/app/(admin)/dashboards/components/`

### 1. Cards.tsx
- **Purpose:** 4 stat cards with sparkline charts
- **Current Data:** Hardcoded (Total Income, New Users, Orders, Conversion Rate)
- **Chart Type:** ApexCharts area sparkline
- **Reusable For:** Leads count, Blog posts, Services, Projects, etc.
- **Public Wiring Status:** NOT WIRED (demo only)

### 2. Chart.tsx
- **Purpose:** Multi-series chart (bar + area)
- **Current Data:** Hardcoded (Page Views, Clicks, Revenue by month)
- **Chart Type:** ApexCharts line/bar combo
- **Reusable For:** Time-series analytics
- **Public Wiring Status:** NOT WIRED (demo only)

### 3. SaleChart.tsx
- **Purpose:** Circular/donut progress charts
- **Chart Type:** ApexCharts radial
- **Reusable For:** Goal completion, percentages
- **Public Wiring Status:** NOT WIRED (demo only)

### 4. CountryMap.tsx
- **Purpose:** Geographic distribution map
- **Library:** jsvectormap
- **Reusable For:** Regional analytics (if needed)
- **Public Wiring Status:** NOT WIRED (demo only)

### 5. User.tsx
- **Purpose:** Data tables (accounts, transactions)
- **Current Data:** Hardcoded sample rows
- **Reusable For:** Leads table, recent activity
- **Public Wiring Status:** NOT WIRED (demo only)

---

## Available KPI Data Sources

| Data Point | Table | Query Fields | Current Count |
|------------|-------|--------------|---------------|
| Leads (New) | leads | `status = 'new'` | 0 |
| Leads (Total) | leads | `count(*)` | 0 |
| Blog Posts (Published) | blog_posts | `status = 'published'` | 6 |
| Blog Posts (Draft) | blog_posts | `status = 'draft'` | 0 |
| Services (Published) | services | `status = 'published'` | 7 |
| Projects (Published) | projects | `status = 'published'` | 8 |
| Testimonials (Published) | testimonials | `status = 'published'` | 6 |
| Media Assets | media | `count(*)` | 38 |
| Newsletter Subscribers | newsletter_subscribers | `count(*)` | 0 |

---

## Time-Series Capability

| Table | Timestamp Column | Granularity |
|-------|------------------|-------------|
| leads | created_at | Daily/Weekly/Monthly |
| blog_posts | created_at, published_at | Daily/Weekly |
| newsletter_subscribers | created_at | Daily/Weekly |
| media | created_at | Daily |

---

## What's Reusable vs Placeholder

| Component | Reusable | Notes |
|-----------|----------|-------|
| Cards.tsx | ✅ Yes | Replace data array with DB query |
| Chart.tsx | ✅ Yes | Replace series with time-series query |
| SaleChart.tsx | ✅ Yes | Good for percentages/goals |
| CountryMap.tsx | ⚠️ Maybe | Requires geographic data |
| User.tsx | ✅ Yes | Table component for leads/activity |
| data.ts | ❌ Replace | Static demo data file |

---

## Reusability Rule (PLANNING NOTE)

**CONSTRAINT:** When implementing dashboard/analytics features, the following rules apply:

1. **MUST reuse existing Darkone demo components** — no new chart types or KPI card designs allowed
2. **MUST use ApexCharts** — the charting library already in use
3. **MUST NOT introduce new visualization libraries** (no Chart.js, D3, Recharts for dashboard)
4. **MUST follow Darkone layout patterns** — 4-card top row, charts below, tables at bottom

**Allowed modifications:**
- Replace hardcoded data with Supabase queries
- Adjust chart colors to match brand
- Change labels/titles for KPI cards

**Not allowed:**
- Custom chart components
- New dashboard layout structures
- Alternative charting libraries
- Custom KPI card designs

This rule ensures 1:1 Darkone admin parity is maintained.

---

**Status:** DONE  
**Execution:** Not Authorized
