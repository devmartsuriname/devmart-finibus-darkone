# Restore Point — Phase 2: Blog Modal UX Upgrade

**Created:** 2025-12-31  
**Phase:** Phase 2 — Admin Blog Modal UX Upgrade  
**Status:** Pre-Implementation Backup

---

## Purpose

This restore point documents the state of the BlogPostModal and related files BEFORE Phase 2 implementation.

---

## Files Being Modified

| File | Action | Reason |
|------|--------|--------|
| `src/app/(admin)/content/blog/components/BlogPostModal.tsx` | MODIFIED | Restructure to 4-tab layout |
| `src/app/(admin)/content/blog/hooks/useBlogPosts.ts` | MODIFIED | Extend interfaces with Phase 1 fields |

## New Files Being Created

| File | Purpose |
|------|---------|
| `src/app/(admin)/content/blog/components/ContentBlocksEditor.tsx` | Structured content editing UI |
| `src/app/(admin)/content/blog/components/CategorySelector.tsx` | Category dropdown + add-new |
| `src/app/(admin)/content/blog/components/TagsInput.tsx` | Tags array input |
| `src/app/(admin)/content/blog/utils/compileContent.ts` | content_blocks → HTML compiler |

---

## Pre-Implementation State

### BlogPostModal.tsx

- Single-view layout (no tabs)
- Fields: Title, Slug, Excerpt, Content (plain textarea), Featured Image, Status, Published Date
- Missing: Category, Tags, SEO fields, structured content editing
- Size: xl (matches ServiceModal)
- Footer: Cancel | Save Changes (matches ServiceModal pattern)

### useBlogPosts.ts

**BlogPost Interface:**
```typescript
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image_media_id: string | null
  status: 'draft' | 'published'
  published_at: string | null
  author_id: string
  created_at: string
  updated_at: string
  featured_image_url?: string | null
}
```

**BlogPostInput Interface:**
```typescript
export interface BlogPostInput {
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image_media_id?: string | null
  status: 'draft' | 'published'
  published_at?: string | null
}
```

---

## Database Schema (Phase 1 Complete)

The following columns exist in `blog_posts`:
- `content_blocks` (JSONB, default `[]`)
- `tags` (TEXT[], default `{}`)
- `meta_title` (TEXT, max 70)
- `meta_description` (TEXT, max 160)
- `og_image_media_id` (UUID FK)
- `canonical_url` (TEXT)
- `noindex` (BOOLEAN)
- `category` (TEXT)

---

## Rollback Instructions

To rollback Phase 2:

1. Delete new files:
   - `src/app/(admin)/content/blog/components/ContentBlocksEditor.tsx`
   - `src/app/(admin)/content/blog/components/CategorySelector.tsx`
   - `src/app/(admin)/content/blog/components/TagsInput.tsx`
   - `src/app/(admin)/content/blog/utils/compileContent.ts`

2. Restore `BlogPostModal.tsx` from this backup state (single-view layout)

3. Restore `useBlogPosts.ts` interface definitions to pre-Phase 2 state

---

## Guardian Rules

- NO public frontend changes
- NO schema changes (Phase 1 already complete)
- NO new npm packages
- Reuse existing Darkone patterns only
- Backward compatibility with existing posts required
