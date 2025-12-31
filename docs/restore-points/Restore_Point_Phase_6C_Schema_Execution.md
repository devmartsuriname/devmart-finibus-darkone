# Restore Point — Phase 6C Schema & RLS Execution

**Created:** 2025-12-31  
**Phase:** Phase 6C — Quote Wizard Schema & RLS  
**Status:** EXECUTED AND VERIFIED

---

## Execution Summary

| Item | Status |
|------|--------|
| `quotes` table created | ✅ VERIFIED |
| `quote_items` table created | ✅ VERIFIED |
| `leads.quote_id` column added | ✅ VERIFIED |
| 4 indexes created | ✅ VERIFIED |
| `update_quotes_updated_at` trigger | ✅ VERIFIED |
| RLS enabled on both tables | ✅ VERIFIED |
| 5 RLS policies applied | ✅ VERIFIED |

---

## Tables Created

### public.quotes

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| reference_number | text | NO | — |
| lead_id | uuid | YES | — |
| total_amount | numeric | NO | — |
| currency | text | NO | 'USD' |
| billing_period | text | NO | — |
| status | text | NO | 'pending' |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

**Constraints:**
- `quotes_pkey` — PRIMARY KEY (id)
- `quotes_reference_number_unique` — UNIQUE (reference_number)
- CHECK (billing_period IN ('monthly', 'yearly'))
- CHECK (status IN ('pending', 'reviewed', 'converted', 'expired'))
- FK to leads(id) ON DELETE SET NULL

### public.quote_items

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| quote_id | uuid | NO | — |
| service_id | uuid | YES | — |
| plan_id | uuid | YES | — |
| service_title | text | NO | — |
| plan_name | text | NO | — |
| price_amount | numeric | NO | — |
| currency | text | NO | 'USD' |
| created_at | timestamptz | NO | now() |

**Constraints:**
- `quote_items_pkey` — PRIMARY KEY (id)
- FK to quotes(id) ON DELETE CASCADE
- FK to services(id) ON DELETE SET NULL
- FK to service_pricing_plans(id) ON DELETE SET NULL

### public.leads (Extended)

| Column Added | Type | Nullable |
|--------------|------|----------|
| quote_id | uuid | YES |

---

## Indexes Created

| Index | Table | Definition |
|-------|-------|------------|
| idx_quotes_lead_id | quotes | btree (lead_id) |
| idx_quotes_status_created | quotes | btree (status, created_at DESC) |
| idx_quote_items_quote_id | quote_items | btree (quote_id) |
| idx_leads_quote_id | leads | btree (quote_id) |

---

## Trigger Created

| Trigger | Table | Function |
|---------|-------|----------|
| update_quotes_updated_at | quotes | update_updated_at_column() |

---

## RLS Policies Applied

### quotes table

| Policy | Command | Expression |
|--------|---------|------------|
| Public can submit quotes | INSERT | WITH CHECK (true) |
| Admins can view all quotes | SELECT | USING (has_role(auth.uid(), 'admin')) |
| Admins can update quotes | UPDATE | USING (has_role(auth.uid(), 'admin')) |

### quote_items table

| Policy | Command | Expression |
|--------|---------|------------|
| Public can submit quote items | INSERT | WITH CHECK (true) |
| Admins can view all quote items | SELECT | USING (has_role(auth.uid(), 'admin')) |

---

## Rollback SQL

If rollback is needed, execute in this order:

```sql
-- 1. Drop RLS policies
DROP POLICY IF EXISTS "Public can submit quotes" ON public.quotes;
DROP POLICY IF EXISTS "Admins can view all quotes" ON public.quotes;
DROP POLICY IF EXISTS "Admins can update quotes" ON public.quotes;
DROP POLICY IF EXISTS "Public can submit quote items" ON public.quote_items;
DROP POLICY IF EXISTS "Admins can view all quote items" ON public.quote_items;

-- 2. Disable RLS
ALTER TABLE public.quotes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items DISABLE ROW LEVEL SECURITY;

-- 3. Drop trigger
DROP TRIGGER IF EXISTS update_quotes_updated_at ON public.quotes;

-- 4. Drop indexes
DROP INDEX IF EXISTS idx_quotes_lead_id;
DROP INDEX IF EXISTS idx_quotes_status_created;
DROP INDEX IF EXISTS idx_quote_items_quote_id;
DROP INDEX IF EXISTS idx_leads_quote_id;

-- 5. Remove leads.quote_id column
ALTER TABLE public.leads DROP COLUMN IF EXISTS quote_id;

-- 6. Drop tables (CASCADE removes foreign key references)
DROP TABLE IF EXISTS public.quote_items CASCADE;
DROP TABLE IF EXISTS public.quotes CASCADE;
```

---

## Verification Results

### Table Structure
- ✅ `quotes` table exists with 9 columns
- ✅ `quote_items` table exists with 9 columns
- ✅ `leads.quote_id` column exists

### Constraints
- ✅ `quotes_reference_number_unique` constraint active
- ✅ `billing_period` CHECK constraint active
- ✅ `status` CHECK constraint active
- ✅ Foreign key constraints active

### Indexes
- ✅ `idx_quotes_lead_id` created
- ✅ `idx_quotes_status_created` created
- ✅ `idx_quote_items_quote_id` created
- ✅ `idx_leads_quote_id` created

### RLS Policies
- ✅ 5 policies created (3 for quotes, 2 for quote_items)
- ✅ Public INSERT policies active
- ✅ Admin SELECT/UPDATE policies active

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| Public Finibus UI unchanged | ✅ NO CHANGES |
| Admin Darkone UI unchanged | ✅ NO CHANGES |
| No routing changes | ✅ NO CHANGES |
| No CSS/SCSS changes | ✅ NO CHANGES |
| No new components | ✅ NONE CREATED |
| Monorepo separation | ✅ PRESERVED |

---

## Sign-Off

- **Executed By:** AI Assistant
- **Execution Date:** 2025-12-31
- **Verification:** COMPLETE
- **Status:** READY FOR PHASE 6D (When Authorized)
