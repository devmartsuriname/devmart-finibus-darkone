# Restore Point: Phase 9B — Database Foundation

**Created:** 2025-12-26  
**Phase:** 9B — Database Foundation  
**Status:** Pre-Execution Snapshot  

---

## Purpose

This restore point captures the database state before Phase 9B execution, enabling rollback if needed.

---

## Pre-Execution State

### Tables to be Created
- `page_settings` — Does NOT exist
- `global_blocks` — Does NOT exist

### Tables NOT to be Modified
- `homepage_settings` — EXISTS, LOCKED, Phase 8 complete

### Current Database Tables (Relevant)
- `homepage_settings` — 1 row, id=1, contains Homepage UI blocks
- `pages` — Exists, contains page metadata
- `settings` — Exists, contains global settings

---

## Phase 9B Scope

### Will Create
1. `page_settings` table
   - Columns: id, page_slug, data (JSONB), updated_at, updated_by
   - RLS: Admin write, Public read

2. `global_blocks` table
   - Columns: id, block_key, data (JSONB), updated_at, updated_by
   - RLS: Admin write, Public read

### Will Seed
1. `page_settings`: 1 row (page_slug = 'about')
2. `global_blocks`: 2 rows (cta_strip, why_choose_us)

---

## Rollback Instructions

If rollback is needed, execute:

```sql
-- Drop seeded data
DELETE FROM public.page_settings WHERE page_slug = 'about';
DELETE FROM public.global_blocks WHERE block_key IN ('cta_strip', 'why_choose_us');

-- Drop RLS policies
DROP POLICY IF EXISTS "Admins can manage page settings" ON public.page_settings;
DROP POLICY IF EXISTS "Public can read page settings" ON public.page_settings;
DROP POLICY IF EXISTS "Admins can manage global blocks" ON public.global_blocks;
DROP POLICY IF EXISTS "Public can read global blocks" ON public.global_blocks;

-- Drop triggers
DROP TRIGGER IF EXISTS set_page_settings_updated_at ON public.page_settings;
DROP TRIGGER IF EXISTS set_global_blocks_updated_at ON public.global_blocks;

-- Drop tables
DROP TABLE IF EXISTS public.page_settings;
DROP TABLE IF EXISTS public.global_blocks;
```

---

## Guardian Rules Verified

| Rule | Status |
|------|--------|
| `homepage_settings` untouched | ✅ Not in scope |
| No frontend code changes | ✅ Database only |
| No Admin UI changes | ✅ Database only |
| No CSS/SCSS changes | ✅ Not touched |
| No content invention | ✅ Values extracted from existing code |

---

## Execution Authorization

- Phase 9A: ✅ COMPLETE
- Phase 9B: ⏳ AUTHORIZED — Awaiting execution
