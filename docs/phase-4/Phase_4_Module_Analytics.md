# Phase 4 — Module: Analytics

```
Status: Draft
Phase: Documentation Only
Execution: Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Module Overview

| Attribute | Value |
|-----------|-------|
| Module Name | Analytics |
| Admin Route | `/analytics` |
| Public Routes | N/A |
| Current State | Coming Soon placeholder |
| Priority | 7 (placeholder requirements only) |

---

## 2. Phase 4 Scope: PLACEHOLDER ONLY

### 2.1 What Phase 4 Includes

- Requirements definition
- Metrics identification
- Dashboard wireframe description
- No implementation

### 2.2 What Phase 4 Does NOT Include

- Database tables
- Data collection logic
- Chart rendering
- Real-time updates

---

## 3. Analytics Requirements (Future Implementation)

### 3.1 Metrics to Track Per Module

| Module | Metrics |
|--------|---------|
| **Blog** | Total posts, Published posts, Views per post (TBD), Posts per month |
| **Projects** | Total projects, Published projects, Featured count, Projects per category |
| **Testimonials** | Total testimonials, Active count |
| **Pages** | Published pages count |
| **Leads** | Total leads, Leads by status, Leads by source, Leads per day/week/month |

### 3.2 Dashboard Cards (Conceptual)

| Card | Value | Trend | Module |
|------|-------|-------|--------|
| Total Leads | Count | +/- vs last period | CRM |
| New Leads | Count (status=new) | — | CRM |
| Published Posts | Count | +/- vs last period | Content |
| Published Projects | Count | — | Content |
| Active Testimonials | Count | — | Content |

### 3.3 Charts (Conceptual)

| Chart Type | Data | Purpose |
|------------|------|---------|
| Line chart | Leads over time | Trend analysis |
| Bar chart | Leads by source | Source comparison |
| Pie chart | Leads by status | Status distribution |
| Bar chart | Posts by category | Content distribution |
| Bar chart | Projects by category | Portfolio distribution |

---

## 4. Dashboard Wireframe (Descriptive)

```
┌─────────────────────────────────────────────────────────────┐
│  Analytics Dashboard                                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐│
│  │ Total     │  │ New       │  │ Published │  │ Published ││
│  │ Leads     │  │ Leads     │  │ Posts     │  │ Projects  ││
│  │   42      │  │   8       │  │   15      │  │   12      ││
│  │  +12%     │  │           │  │   +3      │  │           ││
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘│
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Leads Over Time (Line Chart)                            ││
│  │                                                          ││
│  │  [Chart placeholder]                                     ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌────────────────────────┐  ┌────────────────────────────┐ │
│  │  Leads by Source       │  │  Leads by Status           │ │
│  │  (Bar Chart)           │  │  (Pie Chart)               │ │
│  │                        │  │                            │ │
│  │  [Chart placeholder]   │  │  [Chart placeholder]       │ │
│  │                        │  │                            │ │
│  └────────────────────────┘  └────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Data Sources (Conceptual)

### 5.1 Database Queries

| Metric | Query Type | Source Table |
|--------|------------|--------------|
| Total Leads | COUNT(*) | `leads` |
| New Leads | COUNT(*) WHERE status='new' | `leads` |
| Leads by Source | GROUP BY source | `leads` |
| Leads by Status | GROUP BY status | `leads` |
| Leads Over Time | GROUP BY date | `leads` |
| Published Posts | COUNT(*) WHERE status='published' | `blog_posts` |
| Published Projects | COUNT(*) WHERE status='published' | `projects` |
| Active Testimonials | COUNT(*) WHERE is_active=true | `testimonials` |

### 5.2 Aggregation Options

| Option | Description |
|--------|-------------|
| Real-time | Query on page load |
| Cached | Periodic materialized view refresh |
| Scheduled | Daily/hourly aggregation job |

**Recommendation**: Real-time for MVP (low volume); cached for scale

---

## 6. Technology Considerations

### 6.1 Chart Library

Current in Darkone: **ApexCharts** (react-apexcharts)

| Feature | ApexCharts Support |
|---------|-------------------|
| Line charts | ✅ |
| Bar charts | ✅ |
| Pie charts | ✅ |
| Area charts | ✅ |
| Responsive | ✅ |
| Theming | ✅ |

### 6.2 Dashboard Widgets

Darkone template includes dashboard widgets that can be repurposed.

---

## 7. Phase Gate

### 7.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Define aggregation queries | Separate authorization required |
| Step 2 | Build dashboard UI with charts | Separate authorization required |
| Step 3 | Add date range filters | Separate authorization required |

### 7.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| Leads table | Lead metrics |
| Blog posts table | Post metrics |
| Projects table | Project metrics |
| Testimonials table | Testimonial metrics |

### 7.3 Stop Condition

Before proceeding to implementation:
- [ ] All source tables exist
- [ ] Aggregation queries defined
- [ ] Dashboard layout approved
- [ ] Explicit authorization received

---

## 8. MVP vs Later Summary

### 8.1 MVP Scope (Future Implementation)

- Summary cards with counts
- Basic charts (leads over time, by source, by status)
- No date range filters
- Real-time queries

### 8.2 Later Phase Scope

- Date range filters
- Export to PDF/image
- Scheduled email reports
- Custom dashboards
- Goal tracking
- Conversion funnels
- Page view analytics (requires tracking)

---

## 9. TBD Items

| Item | Decision Required |
|------|-------------------|
| Page view tracking | Include in analytics? (requires tracking pixel) |
| Goal/target setting | Include goals vs actuals? |
| Custom date ranges | Include in MVP or later? |
| Export functionality | Include in MVP or later? |
| Refresh frequency | Real-time or cached? |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft (placeholder requirements only) |

**Next Review:** After Leads module implementation
