# Phase 6C: Verification Checklist

**Status:** DRAFT ONLY — EXECUTION NOT AUTHORIZED  
**Prepared:** 2025-12-31  
**Purpose:** Post-migration verification steps

---

## 1. Pre-Execution Checks

| Check | Status |
|-------|--------|
| [ ] All SQL files reviewed and approved | |
| [ ] RLS policies reviewed for security | |
| [ ] Backup taken (if production) | |
| [ ] Migration authorization confirmed | |
| [ ] `update_updated_at_column()` function exists | |

---

## 2. Migration Success Checks

### 2.1 Table Structure

| Check | Expected | Status |
|-------|----------|--------|
| [ ] `quotes` table exists | Yes | |
| [ ] `quote_items` table exists | Yes | |
| [ ] `leads.quote_id` column exists | Yes | |

### 2.2 Column Verification

**quotes table:**
```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'quotes' AND table_schema = 'public';
```

Expected columns: `id`, `reference_number`, `lead_id`, `total_amount`, `currency`, `billing_period`, `status`, `created_at`, `updated_at`

**quote_items table:**
```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'quote_items' AND table_schema = 'public';
```

Expected columns: `id`, `quote_id`, `service_id`, `plan_id`, `service_title`, `plan_name`, `price_amount`, `currency`, `created_at`

### 2.3 Constraints

| Check | Expected | Status |
|-------|----------|--------|
| [ ] `quotes_reference_number_unique` constraint exists | Yes | |
| [ ] `billing_period` CHECK constraint active | Yes | |
| [ ] `status` CHECK constraint active | Yes | |
| [ ] `quote_items.quote_id` FK with CASCADE exists | Yes | |

### 2.4 Indexes

```sql
SELECT indexname FROM pg_indexes WHERE tablename IN ('quotes', 'quote_items', 'leads');
```

Expected:
- [ ] `idx_quotes_lead_id`
- [ ] `idx_quotes_status_created`
- [ ] `idx_quote_items_quote_id`
- [ ] `idx_leads_quote_id`

### 2.5 Trigger

| Check | Expected | Status |
|-------|----------|--------|
| [ ] `update_quotes_updated_at` trigger exists | Yes | |

---

## 3. RLS Enforcement Tests

### 3.1 Public Role Tests

Run as **anonymous/public** user (no auth token):

| Test | Expected Result | Status |
|------|-----------------|--------|
| [ ] INSERT into `quotes` | ✅ SUCCESS | |
| [ ] INSERT into `quote_items` | ✅ SUCCESS | |
| [ ] SELECT from `quotes` | ❌ DENIED (0 rows) | |
| [ ] UPDATE `quotes` | ❌ DENIED | |
| [ ] DELETE from `quotes` | ❌ DENIED | |

### 3.2 Admin Role Tests

Run as **authenticated admin** (user with admin role):

| Test | Expected Result | Status |
|------|-----------------|--------|
| [ ] SELECT from `quotes` | ✅ SUCCESS (all rows) | |
| [ ] SELECT from `quote_items` | ✅ SUCCESS (all rows) | |
| [ ] UPDATE `quotes.status` | ✅ SUCCESS | |
| [ ] DELETE from `quotes` | ❌ DENIED (no policy) | |

### 3.3 Regular User Tests

Run as **authenticated non-admin** user:

| Test | Expected Result | Status |
|------|-----------------|--------|
| [ ] SELECT from `quotes` | ❌ DENIED (0 rows) | |
| [ ] UPDATE `quotes` | ❌ DENIED | |

---

## 4. Sample Insert Tests

### 4.1 Public Quote Submission (Success Case)

```sql
-- Step 1: Insert lead
INSERT INTO public.leads (name, email, source)
VALUES ('Test User', 'test@example.com', 'quote_wizard')
RETURNING id;

-- Step 2: Insert quote (use lead_id from step 1)
INSERT INTO public.quotes (
  reference_number, 
  lead_id, 
  total_amount, 
  currency, 
  billing_period
)
VALUES (
  'QT-2025-0001', 
  '<lead_id>', 
  299.00, 
  'USD', 
  'monthly'
)
RETURNING id;

-- Step 3: Update lead with quote_id
UPDATE public.leads 
SET quote_id = '<quote_id>' 
WHERE id = '<lead_id>';

-- Step 4: Insert quote items (use quote_id from step 2)
INSERT INTO public.quote_items (
  quote_id, 
  service_title, 
  plan_name, 
  price_amount
)
VALUES (
  '<quote_id>', 
  'Web Design', 
  'Professional', 
  199.00
);
```

### 4.2 Constraint Tests

```sql
-- Should FAIL: invalid billing_period
INSERT INTO public.quotes (reference_number, total_amount, billing_period)
VALUES ('QT-2025-FAIL', 100.00, 'weekly');
-- Expected: CHECK constraint violation

-- Should FAIL: invalid status
INSERT INTO public.quotes (reference_number, total_amount, billing_period, status)
VALUES ('QT-2025-FAIL', 100.00, 'monthly', 'invalid');
-- Expected: CHECK constraint violation

-- Should FAIL: duplicate reference_number
INSERT INTO public.quotes (reference_number, total_amount, billing_period)
VALUES ('QT-2025-0001', 100.00, 'monthly');
-- Expected: UNIQUE constraint violation
```

---

## 5. Rollback Instructions

If issues occur during migration, execute in this order:

```sql
-- ================================================================
-- ROLLBACK SEQUENCE
-- ================================================================

-- 1. Drop RLS policies first
DROP POLICY IF EXISTS "Public can submit quotes" ON public.quotes;
DROP POLICY IF EXISTS "Admins can view all quotes" ON public.quotes;
DROP POLICY IF EXISTS "Admins can update quotes" ON public.quotes;
DROP POLICY IF EXISTS "Public can submit quote items" ON public.quote_items;
DROP POLICY IF EXISTS "Admins can view all quote items" ON public.quote_items;

-- 2. Drop trigger
DROP TRIGGER IF EXISTS update_quotes_updated_at ON public.quotes;

-- 3. Remove leads extension column
ALTER TABLE public.leads DROP COLUMN IF EXISTS quote_id;

-- 4. Drop indexes
DROP INDEX IF EXISTS idx_quotes_lead_id;
DROP INDEX IF EXISTS idx_quotes_status_created;
DROP INDEX IF EXISTS idx_quote_items_quote_id;
DROP INDEX IF EXISTS idx_leads_quote_id;

-- 5. Drop tables (CASCADE will remove quote_items first due to FK)
DROP TABLE IF EXISTS public.quote_items;
DROP TABLE IF EXISTS public.quotes;
```

---

## 6. Post-Verification Sign-Off

| Item | Verified By | Date |
|------|-------------|------|
| Tables created correctly | | |
| RLS policies active | | |
| Public INSERT working | | |
| Admin SELECT working | | |
| Constraints enforced | | |
| Indexes created | | |

---

**EXECUTION NOT AUTHORIZED — This checklist is for planning purposes only.**
