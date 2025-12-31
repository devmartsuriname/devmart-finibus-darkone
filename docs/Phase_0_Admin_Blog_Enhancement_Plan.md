# Admin Blog Enhancement Plan — Phase 0 Planning Report

**Created:** 2025-12-31  
**Status:** PLANNING ONLY — No implementation performed  
**Scope:** Admin CMS Enhancements — Blog Module (Authoring, Taxonomy & SEO)

---

## Executive Summary

This document provides the complete planning report for enhancing the Admin Blog module with improved taxonomy management and SEO governance. All evidence has been gathered from the codebase and database.

**CRITICAL FINDING:** The `blog_posts.content` column stores **HTML strings**, NOT structured JSON. The public renderer uses `dangerouslySetInnerHTML` to render content directly. This is the current production behavior and will be preserved.

---

## A. Current State Diagnosis (Evidence-Based)

### A.1 Database Schema — `blog_posts` Table

**Source:** Supabase types + live query

| Column | Type | Nullable | Current State |
|--------|------|----------|---------------|
| id | uuid | NO | ✅ Exists |
| title | text | NO | ✅ Exists |
| slug | text | NO | ✅ Exists (unique) |
| excerpt | text | YES | ✅ Exists |
| content | text | NO | ✅ Exists — **HTML STRING** |
| category | text | YES | ✅ Exists — free-text |
| status | text | NO | ✅ Exists — 'draft'/'published' |
| published_at | timestamp | YES | ✅ Exists |
| author_id | uuid | NO | ✅ Exists |
| featured_image_media_id | uuid | YES | ✅ Exists — FK to media |
| created_at | timestamp | NO | ✅ Exists |
| updated_at | timestamp | NO | ✅ Exists |
| **meta_title** | — | — | ❌ MISSING |
| **meta_description** | — | — | ❌ MISSING |
| **og_image_media_id** | — | — | ❌ MISSING |
| **canonical_url** | — | — | ❌ MISSING |
| **noindex** | — | — | ❌ MISSING |
| **tags** | — | — | ❌ MISSING |

**Evidence:** Query returned sample posts with HTML content:
```
<h2>Beyond Aesthetics: Design as Strategy</h2>
<p>Design thinking has evolved from a creative discipline...</p>
```

### A.2 Admin Modal — BlogPostModal.tsx

**Source:** `src/app/(admin)/content/blog/components/BlogPostModal.tsx`

| Feature | Status |
|---------|--------|
| Modal size | xl ✅ |
| Tabs | ❌ None — single view |
| Title field | ✅ Exists |
| Slug field | ✅ Exists (auto-generated) |
| Excerpt field | ✅ Exists (300 char max) |
| Content field | ✅ Exists — plain textarea |
| Featured Image | ✅ MediaPicker component |
| Status dropdown | ✅ draft/published |
| Published Date | ✅ Conditional on published status |
| Category dropdown | ❌ MISSING |
| Tags input | ❌ MISSING |
| SEO Tab | ❌ MISSING |
| Footer pattern | ✅ Cancel (secondary) / Save (primary) |

### A.3 Public Renderer — BlogDetailsWrapper.tsx

**Source:** `apps/public/src/components/pages/blogDetails/BlogDetailsWrapper.tsx`

**Rendering Logic (line 66-70):**
```tsx
{content ? (
  <div 
    className="blog-content"
    dangerouslySetInnerHTML={{ __html: content }}
  />
) : ( /* fallback demo content */ )}
```

**Contract:**
- Expects `content` as HTML string
- No JSON parsing
- No structured block processing
- Quote block and tags are **hardcoded** (not from DB)
- Template 1:1 parity maintained

### A.4 Reference Modal Patterns

**ServiceModal.tsx — Tab Structure:**
```
Tab 1: Basic Info (Title, Slug, Descriptions, Icon, Status, Pricing toggles)
Tab 2: Process Steps (disabled until saved)
Tab 3: Pricing Plans (disabled until saved)
```

**PageEditModal.tsx — Tab Structure (Homepage/About):**
```
Tab 1: Page Info (Slug read-only, Title, Published toggle)
Tab 2: Sections (block management)
Tab 3: SEO (meta_title, meta_description with character counters)
```

---

## B. Gap Analysis — Blog Module

### B.1 Authoring UX Gaps

| Gap | Severity | Impact |
|-----|----------|--------|
| Content is plain textarea | Medium | Authors must write raw HTML |
| No preview capability | Low | Authors cannot see rendered output |
| No structured block controls | Medium | No guided block insertion |

**Note:** User decision confirms content stored as structured JSON with editor UI. However, **current state is HTML**. This requires clarification:

> **BLOCKING QUESTION:** The user specified "Store content as structured JSON" but current DB stores HTML. Options:
> 1. **Keep HTML** — Do not migrate, add editor that outputs HTML
> 2. **Migrate to JSON** — Requires public renderer changes (FORBIDDEN)
> 
> **Recommendation:** Keep HTML, provide rich-text editor that outputs HTML. Renderer unchanged.

### B.2 Taxonomy Gaps

| Feature | Current State | Required State |
|---------|---------------|----------------|
| Category field | DB column exists, no UI | Dropdown with controlled list + "Add new" |
| Tags field | No DB column, no UI | Array field with chip input |

### B.3 SEO Gaps

| Field | Pages Modal | Blog Modal | Gap |
|-------|-------------|------------|-----|
| meta_title | ✅ 70 char | ❌ Missing | Add |
| meta_description | ✅ 160 char | ❌ Missing | Add |
| og_image | ❌ Missing | ❌ Missing | Add to both |
| canonical_url | ❌ Missing | ❌ Missing | Add |
| noindex toggle | ❌ Missing | ❌ Missing | Add |

---

## C. Proposed Schema Deltas (Minimal, Forward-Safe)

### C.1 Migration SQL (Preview)

```sql
-- Phase 1: Blog SEO & Taxonomy Enhancement
-- Safe, additive-only migration

-- Add SEO columns
ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS og_image_media_id UUID REFERENCES public.media(id),
  ADD COLUMN IF NOT EXISTS canonical_url TEXT,
  ADD COLUMN IF NOT EXISTS noindex BOOLEAN DEFAULT FALSE;

-- Add tags column (array of strings)
ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Add check constraints for character limits
ALTER TABLE public.blog_posts 
  ADD CONSTRAINT blog_posts_meta_title_length CHECK (char_length(meta_title) <= 70),
  ADD CONSTRAINT blog_posts_meta_description_length CHECK (char_length(meta_description) <= 160);

-- Add index for tags (GIN for array containment queries)
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);
```

### C.2 Columns Added

| Column | Type | Default | Constraint |
|--------|------|---------|------------|
| meta_title | TEXT | NULL | max 70 chars |
| meta_description | TEXT | NULL | max 160 chars |
| og_image_media_id | UUID | NULL | FK to media |
| canonical_url | TEXT | NULL | — |
| noindex | BOOLEAN | FALSE | — |
| tags | TEXT[] | {} | GIN indexed |

### C.3 Rollback SQL

```sql
-- Rollback: Remove added columns
ALTER TABLE public.blog_posts 
  DROP COLUMN IF EXISTS meta_title,
  DROP COLUMN IF EXISTS meta_description,
  DROP COLUMN IF EXISTS og_image_media_id,
  DROP COLUMN IF EXISTS canonical_url,
  DROP COLUMN IF EXISTS noindex,
  DROP COLUMN IF EXISTS tags;

DROP INDEX IF EXISTS idx_blog_posts_tags;
```

---

## D. Proposed Admin Modal Tab Structure

### D.1 BlogPostModal — 4-Tab Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  [Content]  [Taxonomy]  [Media & Publishing]  [SEO]              │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  TAB CONTENT AREA                                                │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                              [Cancel]  [Save Changes]            │
└──────────────────────────────────────────────────────────────────┘
```

### D.2 Tab Breakdown

**Tab 1: Content**
- Title (text, required, max 200)
- Slug (text, required, auto-generated, URL pattern)
- Excerpt (textarea, optional, max 300, character counter)
- Content (textarea/rich-text editor, required, outputs HTML)

**Tab 2: Taxonomy**
- Category (dropdown with controlled list + "Add new..." option)
  - Controlled values: Technology, Business, Design, Government, Enterprise
  - Storage: string in `blog_posts.category`
- Tags (chip input, comma-separated)
  - Storage: TEXT[] in `blog_posts.tags`

**Tab 3: Media & Publishing**
- Featured Image (MediaPicker component)
- Status (dropdown: Draft / Published)
- Published Date (date picker, conditional on Published status)

**Tab 4: SEO**
- Meta Title (text, max 70, character counter)
  - Help text: "If empty, post title will be used"
- Meta Description (textarea, max 160, character counter)
  - Help text: "If empty, excerpt or Global SEO will be used"
- OG Image (MediaPicker component)
  - Help text: "If empty, featured image will be used"
- Canonical URL (text, optional)
  - Help text: "Leave empty unless this is duplicate content"
- Noindex Toggle (switch, default OFF)
  - Help text: "Enable to prevent search engines from indexing this post"
- Fallback Notice: "Empty SEO fields will fall back to Global SEO Settings"

---

## E. Validation Rules & Character Limits

| Field | Required | Max Length | Format | Validation |
|-------|----------|------------|--------|------------|
| title | Yes | 200 | text | Not empty |
| slug | Yes | — | URL-safe | lowercase, alphanumeric, hyphens only |
| excerpt | No | 300 | text | — |
| content | Yes | — | HTML | Not empty |
| category | No | 100 | text | From controlled list or new |
| tags | No | — | array | Valid string array |
| meta_title | No | 70 | text | Soft warning at 60 |
| meta_description | No | 160 | text | Soft warning at 150 |
| og_image_media_id | No | — | UUID | Valid media reference |
| canonical_url | No | — | URL | Valid URL format if provided |
| noindex | No | — | boolean | — |

---

## F. SEO Governance Model

### F.1 Fallback Priority

```
Blog Post SEO → Global SEO Settings
```

| Field | Primary Source | Fallback |
|-------|----------------|----------|
| meta_title | blog_posts.meta_title | Global SEO default_title |
| meta_description | blog_posts.meta_description | Global SEO default_description |
| og_image | blog_posts.og_image_media_id | blog_posts.featured_image_media_id → Global OG image |
| canonical_url | blog_posts.canonical_url | Auto-generated from slug |
| noindex | blog_posts.noindex | FALSE (indexable) |

### F.2 Implementation Notes

- SEO fallback logic is **data-layer only** in this phase
- Public meta tag wiring requires frontend modification (FORBIDDEN in this phase)
- Admin UI will display fallback behavior in help text

---

## G. Phased Implementation Roadmap

### Phase 0: Diagnostic + Plan ← **CURRENT PHASE**
- [x] Create restore point
- [x] Document current schema
- [x] Document current modal structure
- [x] Confirm renderer contract (HTML, not JSON)
- [x] Produce planning report
- [ ] Await approval for Phase 1

### Phase 1: Schema Enhancements
- [ ] Run migration to add SEO columns
- [ ] Run migration to add tags column
- [ ] Update Supabase types
- [ ] Verify existing posts still load
- [ ] Update documentation
- [ ] Await approval for Phase 2

### Phase 2: Blog Modal UX Upgrade
- [ ] Restructure modal to 4-tab layout
- [ ] Add Category dropdown with controlled list
- [ ] Add Tags chip input
- [ ] Add SEO tab with all fields
- [ ] Implement character counters
- [ ] Implement validation
- [ ] Verify create/edit functionality
- [ ] Await approval for Phase 3

### Phase 3: Global SEO Fallback Wiring (ADMIN ONLY)
- [ ] Ensure SEO data is present in DB
- [ ] Document fallback behavior
- [ ] NO public frontend changes
- [ ] Await authorization for any public wiring

---

## H. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Migration breaks existing posts | Low | High | Additive-only columns, no data modification |
| Modal changes break create/edit | Medium | High | Follow exact ServiceModal pattern |
| Category free-text causes inconsistency | Medium | Low | Provide controlled dropdown + validation |
| SEO fields unused without public wiring | Low | Medium | Document as Phase 3 dependency |
| Content migration requested | Low | Critical | STOP and request approval — renderer frozen |

---

## I. Acceptance Criteria Per Phase

### Phase 1 Acceptance
- [ ] Migration runs without errors
- [ ] New columns visible in Supabase dashboard
- [ ] Existing blog posts load in admin without errors
- [ ] No public frontend changes
- [ ] Documentation updated

### Phase 2 Acceptance
- [ ] Modal displays 4 tabs
- [ ] Category dropdown shows controlled list + "Add new"
- [ ] Tags input accepts comma-separated values
- [ ] SEO tab shows all 5 fields with character counters
- [ ] Create new post saves all fields correctly
- [ ] Edit existing post loads and saves all fields correctly
- [ ] No console errors
- [ ] Public blog unchanged (frontend frozen)

### Phase 3 Acceptance
- [ ] SEO data persisted correctly
- [ ] Fallback behavior documented
- [ ] No public frontend changes

---

## J. Non-Goals (Explicitly Out of Scope)

1. ❌ Public frontend changes (renderer, layout, CSS)
2. ❌ New UI libraries or rich-text editors
3. ❌ Many-to-many tags table (junction table)
4. ❌ Content migration from HTML to JSON
5. ❌ Public meta tag wiring (requires frontend thaw)
6. ❌ Blog categories table (use string field)
7. ❌ Author management UI
8. ❌ Comment moderation UI

---

## K. Blocking Question Requiring Decision

**CONTENT FORMAT CLARIFICATION NEEDED:**

The user decision states: *"Store content as structured JSON, but edited via a user-friendly editor UI"*

However, the current production state is:
- `blog_posts.content` stores **HTML strings**
- Public renderer uses `dangerouslySetInnerHTML={{ __html: content }}`
- No JSON parsing occurs

**Options:**
1. **Proceed with HTML** — Keep current format, add rich-text editor that outputs HTML
2. **Migrate to JSON** — Requires public renderer changes (FORBIDDEN)

**Recommendation:** Option 1 — Keep HTML format. The public renderer cannot be changed (frontend frozen), so structured JSON would require a parallel renderer which contradicts the 1:1 parity requirement.

**Awaiting explicit decision before Phase 1 implementation.**

---

## Sign-Off

**Phase 0 Status:** COMPLETE

**No implementation was performed during this step.**

**Ready to proceed with Phase 1 upon approval.**

---

*Document created: 2025-12-31*  
*Author: Lovable AI*  
*Guardian Rules Compliance: Verified*
