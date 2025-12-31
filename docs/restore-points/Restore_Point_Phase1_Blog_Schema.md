# Restore Point: Phase 1 — Blog Schema Enhancement

**Created:** 2025-12-31  
**Phase:** Phase 1 (Schema Enhancements)  
**Status:** PRE-IMPLEMENTATION SNAPSHOT

---

## Purpose

This restore point captures the state of the `blog_posts` table BEFORE Phase 1 schema migration is applied. Use this document to roll back if Phase 1 causes issues.

---

## Pre-Phase 1 Schema: `blog_posts`

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| title | TEXT | NO | — | Post title |
| slug | TEXT | NO | — | URL slug (unique) |
| excerpt | TEXT | YES | — | Short summary |
| content | TEXT | NO | — | HTML content (public renderer) |
| category | TEXT | YES | — | Category string |
| status | TEXT | NO | 'draft' | draft/published |
| published_at | TIMESTAMP | YES | — | Publication date |
| featured_image_media_id | UUID | YES | — | FK to media |
| author_id | UUID | NO | — | Author reference |
| created_at | TIMESTAMP | NO | now() | Creation timestamp |
| updated_at | TIMESTAMP | NO | now() | Last update timestamp |

---

## Phase 1 Additions (To Be Applied)

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| content_blocks | JSONB | '[]' | Structured authoring data |
| tags | TEXT[] | '{}' | Taxonomy tags array |
| meta_title | TEXT | NULL | SEO title (max 70) |
| meta_description | TEXT | NULL | SEO description (max 160) |
| og_image_media_id | UUID | NULL | OG image FK to media |
| canonical_url | TEXT | NULL | Canonical URL |
| noindex | BOOLEAN | FALSE | Search engine indexing |

---

## Rollback SQL

If Phase 1 migration causes issues, run the following:

```sql
-- Drop indexes first
DROP INDEX IF EXISTS public.idx_blog_posts_tags;
DROP INDEX IF EXISTS public.idx_blog_posts_category;

-- Drop constraints
ALTER TABLE public.blog_posts 
  DROP CONSTRAINT IF EXISTS blog_posts_meta_title_length;
ALTER TABLE public.blog_posts 
  DROP CONSTRAINT IF EXISTS blog_posts_meta_description_length;

-- Drop columns (reverse order of addition)
ALTER TABLE public.blog_posts DROP COLUMN IF EXISTS noindex;
ALTER TABLE public.blog_posts DROP COLUMN IF EXISTS canonical_url;
ALTER TABLE public.blog_posts DROP COLUMN IF EXISTS og_image_media_id;
ALTER TABLE public.blog_posts DROP COLUMN IF EXISTS meta_description;
ALTER TABLE public.blog_posts DROP COLUMN IF EXISTS meta_title;
ALTER TABLE public.blog_posts DROP COLUMN IF EXISTS tags;
ALTER TABLE public.blog_posts DROP COLUMN IF EXISTS content_blocks;
```

---

## Verification Before Rollback

1. Check if posts are inaccessible in admin
2. Check for TypeScript build errors
3. Check Supabase dashboard for column issues

---

## Related Documents

- `docs/Phase_0_Admin_Blog_Enhancement_Plan.md`
- `docs/Backend.md`
- `docs/Architecture.md`

---

## Approval Chain

- Phase 0: APPROVED 2025-12-31
- Phase 1: AUTHORIZED 2025-12-31
- Migration: PENDING USER CONFIRMATION
