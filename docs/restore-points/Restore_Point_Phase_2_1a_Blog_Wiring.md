# Restore Point: Phase 2.1a–2.3 Blog Details Field Wiring

**Created:** 2025-12-31  
**Phase:** Admin Blog Enhancement Phase 2.1a–2.3  
**Status:** Pre-Implementation Snapshot

---

## Purpose

This restore point documents the state of blog details field parity BEFORE wiring the public frontend to database fields. This is a data-binding-only change with NO layout/styling modifications.

---

## Pre-Change State

### 1. useBlogDetails.ts — Fields NOT Fetched

The hook currently fetches ONLY these fields:
- `id`, `title`, `slug`, `excerpt`, `content`, `category`, `status`
- `published_at`, `created_at`, `updated_at`
- `featured_image` (media join)

**NOT fetched (will be added):**
- `quote_text`
- `quote_author`
- `secondary_image_media_id` (+ media URL)
- `secondary_content`
- `author_display_name`
- `tags`
- SEO fields: `meta_title`, `meta_description`, `og_image_media_id`, `canonical_url`, `noindex`

### 2. BlogDetailsWrapper.tsx — Hardcoded Sections

| Element | Lines | Current Hardcoded Value |
|---------|-------|------------------------|
| Author display name | 54 | "Devmart Team" |
| Quote block text | 106-108 | "Donec bibendum enim ut elit porta ullamcorper..." |
| Quote author | 109 | "Ambrela Jwe" |
| Banner image | 133 | `/images/blog-banner.png` |
| Banner content | 139-146 | "Donec bibendum enim ut elit porta ullamcorper..." |
| Extra tags | 157-162 | "Software Design", "UI/UX Design" (hardcoded) |

### 3. Database Null-State Snapshot

All 6 published blog posts have NULL values for:

| Field | Current State |
|-------|---------------|
| `quote_text` | NULL |
| `quote_author` | NULL |
| `secondary_image_media_id` | NULL |
| `secondary_content` | NULL |
| `author_display_name` | NULL |
| `meta_title` | NULL |
| `meta_description` | NULL |
| `og_image_media_id` | NULL |
| `canonical_url` | NULL |
| `noindex` | false (default) |

---

## What Will Change

### Hook Updates (useBlogDetails.ts)
- Extended `BlogPostDetails` interface with all new fields
- Updated Supabase query to fetch new fields + media joins

### Component Updates (BlogDetailsWrapper.tsx)
- Added props for all new fields
- Replaced hardcoded values with dynamic content + fallbacks
- NO markup/classname changes

### Component Updates (BlogDetailsPage.tsx)
- Pass new props from post data to wrapper

### Data Seeding
- SEO fields seeded (except og_image_media_id)
- Details Layout fields seeded (except secondary_image_media_id)

---

## Explicit Constraints

- **No schema changes in this step** (columns added in Phase 2.1a migration)
- **No layout/styling changes** (data binding only)
- **No new npm packages**
- **Fallback values preserve 1:1 visual parity**
- **Comments remain permanently removed**

---

## Rollback Procedure

If rollback is required:
1. Restore `useBlogDetails.ts` to fetch only original fields
2. Restore `BlogDetailsWrapper.tsx` to use hardcoded values
3. Restore `BlogDetailsPage.tsx` to pass only original props
4. Data seeding cannot be easily rolled back (but is non-destructive)

---

## Files Affected

- `apps/public/src/hooks/useBlogDetails.ts` (modify)
- `apps/public/src/components/pages/blogDetails/BlogDetailsWrapper.tsx` (modify)
- `apps/public/src/components/pages/blogDetails/BlogDetailsPage.tsx` (modify)
- Database: `blog_posts` table (data UPDATE only, no schema)
