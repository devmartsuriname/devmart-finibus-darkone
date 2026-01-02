# Restore Point — Phase 8A Pre-Execution

**Created:** 2026-01-02  
**Phase:** Phase 8A — Dashboard Refinement  
**Status:** PRE-EXECUTION SNAPSHOT

---

## Purpose

Captures the exact state of the Admin Dashboard before Phase 8A refinements are applied.

---

## Pre-Execution State

### Dashboard Page (`src/app/(admin)/dashboard/page.tsx`)

**Current Components:**
- `DashboardKPICards` — 4 KPI cards (Leads, Quotes, Quote Value, Content Items)
- `DashboardFunnelChart` — Marketing funnel bar chart
- `DashboardSourceChart` — Leads by source donut chart
- `DashboardRecentLeads` — Recent leads table
- `DashboardRecentQuotes` — Recent quotes table

**Layout:**
```
Row 1: [4 KPI Cards]
Row 2: [Funnel Chart (Col-8)] [Source Chart (Col-4)]
Row 3: [Recent Leads (Col-6)] [Recent Quotes (Col-6)]
```

### useDashboardStats Hook

**Current KPI Interface:**
```typescript
interface DashboardKPI {
  totalLeads: number
  totalQuotes: number
  totalQuoteValue: number
  totalContentItems: number
}
```

**Current Data Sources:**
- `leads` table — full count
- `quotes` table — full count + sum of total_amount
- `blog_posts` — count only
- `projects` — count only
- `services` — count only
- `marketing_events` — event_type aggregation

---

## Files in Scope

| File | Status |
|------|--------|
| `src/app/(admin)/dashboard/page.tsx` | EXISTS |
| `src/app/(admin)/dashboard/hooks/useDashboardStats.ts` | EXISTS |
| `src/app/(admin)/dashboard/components/DashboardKPICards.tsx` | EXISTS |
| `src/app/(admin)/dashboard/components/DashboardSourceChart.tsx` | EXISTS |
| `src/app/(admin)/dashboard/components/DashboardFunnelChart.tsx` | EXISTS |
| `src/app/(admin)/dashboard/components/DashboardRecentLeads.tsx` | EXISTS |
| `src/app/(admin)/dashboard/components/DashboardRecentQuotes.tsx` | EXISTS |

---

## Phase 8A Planned Changes

1. Enhance `useDashboardStats` with granular content/quote counts
2. Create `DashboardContentBreakdown.tsx` — content module donut chart
3. Create `DashboardQuotesBreakdown.tsx` — quote status donut chart
4. Update dashboard page layout to include new components

---

## Rollback Instructions

If Phase 8A needs to be reverted:

1. Remove new components:
   - `src/app/(admin)/dashboard/components/DashboardContentBreakdown.tsx`
   - `src/app/(admin)/dashboard/components/DashboardQuotesBreakdown.tsx`

2. Revert `useDashboardStats.ts` to remove granular counts

3. Revert `page.tsx` to remove new component imports and layout changes

---

## Guardian Rules (Reconfirmed)

- Finibus Public remains FROZEN
- Darkone Admin remains 1:1
- No schema changes
- No new dependencies
- No external integrations
