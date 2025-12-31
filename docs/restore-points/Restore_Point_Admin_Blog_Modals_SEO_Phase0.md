# Restore Point: Admin Blog Modals & SEO — Phase 0

**Created:** 2025-12-31  
**Phase:** Admin CMS Enhancements — Blog Module (Authoring, Taxonomy & SEO)  
**Sub-Phase:** Phase 0 — Diagnostic + Plan (NO CODE CHANGES)  
**Status:** DIAGNOSTIC ONLY — No implementation performed

---

## Purpose

This restore point documents the exact state of the Admin Blog module and related components BEFORE any Phase 1+ implementation begins. It serves as a rollback reference if any issues arise during implementation.

---

## Current State Snapshot

### 1. Database Schema (`blog_posts` table)

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | uuid | NO | gen_random_uuid() | Primary key |
| title | text | NO | — | Max recommended: 200 chars |
| slug | text | NO | — | Unique, URL-friendly |
| excerpt | text | YES | — | Max recommended: 300 chars |
| content | text | NO | — | **HTML string (not JSON)** |
| category | text | YES | — | Free-text, not constrained |
| status | text | NO | 'draft' | 'draft' or 'published' |
| published_at | timestamp | YES | — | Set on publish |
| author_id | uuid | NO | — | Required |
| featured_image_media_id | uuid | YES | — | FK to media table |
| created_at | timestamp | NO | now() | — |
| updated_at | timestamp | NO | now() | — |

**Missing SEO Columns (to be added in Phase 1):**
- `meta_title` (text, max 70)
- `meta_description` (text, max 160)
- `og_image_media_id` (uuid, FK to media)
- `canonical_url` (text)
- `noindex` (boolean, default false)

**Missing Taxonomy Columns:**
- `tags` (text[] or jsonb array) — Phase 1

### 2. Admin Modal Component

**File:** `src/app/(admin)/content/blog/components/BlogPostModal.tsx`

**Current Structure:**
- Single-column layout (no tabs)
- Fields: Title, Slug, Excerpt, Content (textarea), Featured Image (MediaPicker), Status, Published Date
- No Category dropdown
- No Tags input
- No SEO tab

**UI Pattern:** size="xl", Bootstrap Modal, Footer with Cancel/Primary buttons

### 3. Public Renderer

**Files:**
- `apps/public/src/components/pages/blogDetails/BlogDetailsWrapper.tsx`
- `apps/public/src/hooks/useBlogDetails.ts`

**Rendering Behavior:**
- Content is rendered via `dangerouslySetInnerHTML={{ __html: content }}`
- Expects HTML string in `blog_posts.content`
- No JSON parsing occurs
- Quote block and other template elements are hardcoded (not from DB)

### 4. Reference Modal Patterns

**ServiceModal.tsx:**
- Uses react-bootstrap `Tabs` component
- Tabs: Basic Info, Process Steps, Pricing Plans
- size="xl", Footer: Cancel (secondary) | Save (primary)

**PageEditModal.tsx:**
- Uses react-bootstrap `Tabs` component
- Tabs: Page Info, Sections, SEO
- SEO tab includes: meta_title (70 char), meta_description (160 char)
- size="xl", Footer: Cancel/Close (secondary)

---

## Files to Modify in Phase 1+

| File | Action |
|------|--------|
| `supabase/migrations/` | New migration for SEO + tags columns |
| `src/app/(admin)/content/blog/components/BlogPostModal.tsx` | Add tabs, Category dropdown, Tags input, SEO tab |
| `src/app/(admin)/content/blog/hooks/useBlogPosts.ts` | Add new fields to interfaces |
| `src/integrations/supabase/types.ts` | Auto-regenerated after migration |
| `docs/Backend.md` | Document schema changes |
| `docs/Architecture.md` | Document SEO governance model |
| `docs/Admin_Modals_Fields_Inventory.md` | Update field inventory |
| `docs/Admin_SEO_Capability_Matrix.md` | Update SEO matrix |

---

## Rollback Instructions

If Phase 1 implementation causes issues:

1. **Schema Rollback:** Run reverse migration to drop added columns
2. **Code Rollback:** Restore BlogPostModal.tsx from this snapshot
3. **Types Rollback:** Regenerate Supabase types after schema rollback

---

## Verification Checklist (Pre-Implementation)

- [x] Current schema documented
- [x] Current modal structure documented
- [x] Public renderer behavior confirmed (HTML, not JSON)
- [x] Reference modal patterns documented
- [x] No code changes made in Phase 0
- [x] Phase 0 Planning Report created

---

## Sign-Off

**Phase 0 Status:** COMPLETE — Awaiting approval for Phase 1 implementation

**No implementation was performed during this step.**
