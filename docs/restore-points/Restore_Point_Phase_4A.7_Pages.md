# Restore Point — Phase 4A.7: Pages Module (Docs-Strict)

**Status:** Draft  
**Phase:** Planning Only → Implementation  
**Execution:** Authorized (Option 1 — Docs-Strict)  
**Timestamp:** 2025-12-23  

---

## Goal

Implement the Pages module per Phase_4_Module_Pages.md specifications:
- Edit-only behavior (no CRUD)
- Pre-defined pages with fixed slugs
- Meta-only fields (title, meta_title, meta_description, is_published)
- Slug immutability enforced at DB level

---

## Scope Lock

**ADMIN + DB + DOCS ONLY**

### Files to Touch

| File | Action |
|------|--------|
| `supabase/migrations/XXXXXX_pages.sql` | CREATE (new) |
| `src/app/(admin)/content/pages/hooks/usePages.ts` | CREATE (new) |
| `src/app/(admin)/content/pages/components/PageEditModal.tsx` | CREATE (new) |
| `src/app/(admin)/content/pages/page.tsx` | UPDATE (replace placeholder) |
| `docs/Backend.md` | UPDATE (add schema + RLS) |
| `docs/Architecture.md` | UPDATE (module status) |

### Files NOT Touched

- ❌ Any `src/app/(other)/**` routes
- ❌ Any public/frontend components
- ❌ Any Finibus template files

**Frontend Status:** LOCKED — NOT TOUCHED

---

## Database Schema

```sql
CREATE TABLE public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Constraints
- title: max 100 characters (enforced at UI + DB)
- meta_title: max 70 characters
- meta_description: max 160 characters
- slug: IMMUTABLE after insert (DB trigger prevents changes)

### RLS Policies
- Admin: SELECT + UPDATE only (NO INSERT/DELETE)
- Public: SELECT only where is_published = true

---

## Seed Data (6 Pages)

| slug | title | is_published |
|------|-------|--------------|
| about | About Us | true |
| services | Services | true |
| service-details | Service Details | true |
| contact | Contact Us | true |
| blog | Blog | true |
| projects | Projects | true |

---

## Rollback Steps

1. Drop migration: `DROP TABLE IF EXISTS public.pages CASCADE;`
2. Delete new files:
   - `src/app/(admin)/content/pages/hooks/usePages.ts`
   - `src/app/(admin)/content/pages/components/PageEditModal.tsx`
3. Restore `page.tsx` to placeholder version (EmptyTablePlaceholder)
4. Revert docs changes in Backend.md and Architecture.md

---

## Guardian Compliance

| Rule | Status |
|------|--------|
| Scope: Admin + DB + docs only | ✅ |
| Frontend LOCKED | ✅ NOT TOUCHED |
| No CRUD (edit-only) | ✅ |
| Slug immutable | ✅ DB trigger |
| No Add button | ✅ |
| No Delete action | ✅ |
| Text-only toasts | ✅ |
