# Phase 6C: Schema & RLS Execution Plan

**Status:** DRAFT ONLY — EXECUTION NOT AUTHORIZED  
**Prepared:** 2025-12-31  
**Phase:** 6C (Quote Wizard Schema Preparation)

---

## 1. Objective

Prepare the database schema and RLS policies required to support the Quote Wizard feature. This document provides execution-ready SQL drafts that can be run when authorization is granted.

### Scope

- Two new tables: `public.quotes`, `public.quote_items`
- One extension: `public.leads.quote_id` FK column
- RLS policies for public submission and admin management
- Indexes for query performance

---

## 2. Decision Table (CLOSED)

| Decision | Recommendation | Justification |
|----------|----------------|---------------|
| **Wizard Route** | `/quote` dedicated page | Finibus parity (uses Breadcrumb + LetsTalkArea patterns); cleaner UX than modal |
| **Quote Reference** | Date-based `QT-2025-XXXX` | Human-readable, prevents sequence guessing, sortable by date |
| **Billing Period** | Global (single toggle) | Matches existing ServicePrice pattern; simpler UX |
| **Confirmation** | Inline success message | Matches Contact form pattern; no extra route needed |
| **Admin Notification** | DEFERRED | Not required for MVP; can add badge/email in future phase |

---

## 3. Schema Design

### 3.1 Table: `public.quotes`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `reference_number` | TEXT | No | — | Unique human-readable reference (QT-2025-XXXX) |
| `lead_id` | UUID | Yes | — | FK to `leads.id` (SET NULL on delete) |
| `total_amount` | DECIMAL(10,2) | No | — | Calculated total |
| `currency` | TEXT | No | `'USD'` | Currency code |
| `billing_period` | TEXT | No | — | `'monthly'` or `'yearly'` |
| `status` | TEXT | No | `'pending'` | Quote status |
| `created_at` | TIMESTAMPTZ | No | `now()` | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | `now()` | Last update timestamp |

**Constraints:**
- `billing_period` CHECK: `IN ('monthly', 'yearly')`
- `status` CHECK: `IN ('pending', 'reviewed', 'converted', 'expired')`
- `reference_number` UNIQUE

### 3.2 Table: `public.quote_items`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `quote_id` | UUID | No | — | FK to `quotes.id` (CASCADE on delete) |
| `service_id` | UUID | Yes | — | FK to `services.id` (optional) |
| `plan_id` | UUID | Yes | — | FK to `service_pricing_plans.id` (optional) |
| `service_title` | TEXT | No | — | Snapshot of service title |
| `plan_name` | TEXT | No | — | Snapshot of plan name |
| `price_amount` | DECIMAL(10,2) | No | — | Snapshot of price |
| `currency` | TEXT | No | `'USD'` | Currency code |
| `created_at` | TIMESTAMPTZ | No | `now()` | Creation timestamp |

**Note:** `service_title`, `plan_name`, and `price_amount` are snapshots to preserve quote accuracy even if service/plan changes later.

### 3.3 Extension: `public.leads.quote_id`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `quote_id` | UUID | Yes | — | FK to `quotes.id` (SET NULL on delete) |

This allows linking a lead to an optional quote request.

---

## 4. RLS Policy Summary

### 4.1 Quotes Table

| Policy | Command | Role | Expression |
|--------|---------|------|------------|
| Public can submit quotes | INSERT | Public | `WITH CHECK (true)` |
| Admins can view all quotes | SELECT | Admin | `USING (has_role(auth.uid(), 'admin'))` |
| Admins can update quotes | UPDATE | Admin | `USING (has_role(auth.uid(), 'admin'))` |

**No DELETE policy:** Quotes are immutable (audit trail).

### 4.2 Quote Items Table

| Policy | Command | Role | Expression |
|--------|---------|------|------------|
| Public can submit quote items | INSERT | Public | `WITH CHECK (true)` |
| Admins can view all quote items | SELECT | Admin | `USING (has_role(auth.uid(), 'admin'))` |

**No UPDATE or DELETE policies:** Quote items are immutable.

---

## 5. Index Strategy

| Index | Table | Columns | Purpose |
|-------|-------|---------|---------|
| `idx_quotes_lead_id` | quotes | `lead_id` | Fast lead → quote lookup |
| `idx_quotes_status_created` | quotes | `status, created_at DESC` | Admin listing sorted by date |
| `idx_quote_items_quote_id` | quote_items | `quote_id` | Fast quote → items join |
| `idx_leads_quote_id` | leads | `quote_id` | Fast quote → lead lookup |

---

## 6. Execution Phases (When Authorized)

### Step 1: Run Migration SQL
Execute `Phase_6C_SQL_Drafts.sql` via Supabase migration tool.

### Step 2: Verify Table Creation
Confirm tables exist with correct columns via `\d public.quotes` and `\d public.quote_items`.

### Step 3: Apply RLS Policies
Execute `Phase_6C_RLS_Policies_Drafts.sql`.

### Step 4: Run Verification Checklist
Complete all checks in `Phase_6C_Verification_Checklist.md`.

### Step 5: Seed Test Data (Optional)
Insert sample quotes to verify flow.

---

## 7. Hard Blockers

| Blocker | Status |
|---------|--------|
| Schema migration execution | **NOT AUTHORIZED** |
| RLS policy execution | **NOT AUTHORIZED** |
| Route creation (Phase 6D) | **NOT AUTHORIZED** |

---

## 8. Guardian Rules Compliance

| Rule | Status |
|------|--------|
| Finibus 1:1 parity | ✅ (docs only) |
| Darkone 1:1 parity | ✅ (docs only) |
| No Bootstrap additions | ✅ |
| No new fonts/icons | ✅ |
| No new CSS/SCSS files | ✅ |
| Monorepo separation | ✅ |
| CSS isolation | ✅ |

---

**HARD STOP — Execution NOT authorized. Await explicit approval.**
