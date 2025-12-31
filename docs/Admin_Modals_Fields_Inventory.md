# Admin Modals Fields Inventory

**Status:** ✅ Phase 2.1a Complete  
**Last Updated:** 2025-12-31

---

## Overview

This document inventories all admin modal components and their field mappings for CMS modules.

---

## Blog Module — `BlogPostModal.tsx`

**Status:** ✅ Phase 2.1a Complete (5-Tab Layout)

### Tab Structure (Implemented)

| Tab | Fields | Status |
|-----|--------|--------|
| Content | Title, Slug, Excerpt (counter), ContentBlocksEditor or Legacy Textarea | ✅ Complete |
| Taxonomy | CategorySelector (dropdown + add-new), TagsInput (chips) | ✅ Complete |
| Media & Publishing | Featured Image, Status, Publish Date | ✅ Complete |
| SEO | Meta Title (counter), Meta Description (counter), OG Image, Canonical URL, Noindex | ✅ Complete |
| **Details Layout** | Quote Text, Quote Author, Secondary Image, Secondary Content, Author Display Name | ✅ **NEW (2.1a)** |

### Field Mapping

| Tab | Field | DB Column | Type | Validation | Status |
|-----|-------|-----------|------|------------|--------|
| Content | Title | title | TEXT | required, max 200 | ✅ Complete |
| Content | Slug | slug | TEXT | required, unique, URL-safe | ✅ Complete |
| Content | Excerpt | excerpt | TEXT | max 300, counter | ✅ Complete |
| Content | Content | content | TEXT | compiled HTML | ✅ Complete |
| Content | Content Blocks | content_blocks | JSONB | structured array | ✅ Complete |
| Taxonomy | Category | category | TEXT | dropdown + freetext | ✅ Complete |
| Taxonomy | Tags | tags | TEXT[] | chip array | ✅ Complete |
| Media | Featured Image | featured_image_media_id | UUID | MediaPicker | ✅ Complete |
| Media | Status | status | TEXT | draft/published | ✅ Complete |
| Media | Publish Date | published_at | TIMESTAMP | date picker | ✅ Complete |
| SEO | Meta Title | meta_title | TEXT | max 70, counter | ✅ Complete |
| SEO | Meta Description | meta_description | TEXT | max 160, counter | ✅ Complete |
| SEO | OG Image | og_image_media_id | UUID | MediaPicker | ✅ Complete |
| SEO | Canonical URL | canonical_url | TEXT | valid URL | ✅ Complete |
| SEO | Noindex | noindex | BOOLEAN | switch | ✅ Complete |
| **Details Layout** | Quote Text | quote_text | TEXT | max 300, counter | ✅ **NEW** |
| **Details Layout** | Quote Author | quote_author | TEXT | max 100 | ✅ **NEW** |
| **Details Layout** | Secondary Image | secondary_image_media_id | UUID | MediaPicker | ✅ **NEW** |
| **Details Layout** | Secondary Content | secondary_content | TEXT | max 500, counter | ✅ **NEW** |
| **Details Layout** | Author Display Name | author_display_name | TEXT | max 100, default "Devmart Team" | ✅ **NEW** |

### Supporting Components

| Component | File | Purpose |
|-----------|------|---------|
| ContentBlocksEditor | `components/ContentBlocksEditor.tsx` | Structured content editing (paragraph, heading, list, quote, image) |
| CategorySelector | `components/CategorySelector.tsx` | Category dropdown with predefined suggestions + add-new |
| TagsInput | `components/TagsInput.tsx` | Tags array input with chip-style display |
| compileBlocksToHtml | `utils/compileContent.ts` | Compiles ContentBlock[] → HTML string |

### Legacy Mode Support

- Posts with empty `content_blocks` display legacy HTML textarea
- "Convert to Blocks" button available for migration
- Backward compatible with all existing posts

---

## Services Module — `ServiceModal.tsx`

**Status:** ✅ Complete (Reference Pattern)

### Tab Structure

| Tab | Fields | Status |
|-----|--------|--------|
| Basic Info | Title, Slug, Short Description, Full Description, Icon, Display Order, Status | ✅ Complete |
| Process Steps | Dynamic step management (step_number, title, description, image) | ✅ Complete |
| Pricing | Show Pricing toggle, Monthly/Yearly toggles, Pricing plans management | ✅ Complete |

### Key Patterns (Reused in Blog)
- Tab navigation with react-bootstrap Tabs
- Modal size="xl"
- Footer: Cancel | Save Changes buttons
- Nested entity management (process steps, pricing plans)

---

## Projects Module — `ProjectModal.tsx`

**Status:** ✅ Complete

### Tab Structure

| Tab | Fields | Status |
|-----|--------|--------|
| Basic Info | Title, Slug, Heading, Description, Category, Client, Website, Dates, Status, Featured | ✅ Complete |
| Media | Image, Featured Image, Check Launch Image, Check Launch Content | ✅ Complete |
| Process Steps | Dynamic step management | ✅ Complete |

---

## Pages Module — `PageEditModal.tsx`

**Status:** ✅ Complete

### Tab Structure

| Tab | Fields | Status |
|-----|--------|--------|
| Content | Page-specific fields (varies by page type) | ✅ Complete |
| SEO | Meta Title, Meta Description | ✅ Complete |

### SEO Pattern (Reused in Blog)
- Character counters for meta fields
- Help text for fallback behavior

---

## Testimonials Module — `TestimonialModal.tsx`

**Status:** ✅ Complete

### Fields (Single Form)

| Field | DB Column | Type | Status |
|-------|-----------|------|--------|
| Author Name | author_name | TEXT | ✅ Complete |
| Author Title | author_title | TEXT | ✅ Complete |
| Company | company | TEXT | ✅ Complete |
| Quote | quote | TEXT | ✅ Complete |
| Rating | rating | INTEGER | ✅ Complete |
| Avatar | avatar_media_id | UUID | ✅ Complete |
| Featured | featured | BOOLEAN | ✅ Complete |
| Display Order | display_order | INTEGER | ✅ Complete |
| Status | status | TEXT | ✅ Complete |

---

## Comparison Matrix

| Module | Tabs | SEO Tab | Details Layout | Process Steps | Pricing | Category | Tags |
|--------|------|---------|----------------|---------------|---------|----------|------|
| Blog | ✅ 5 tabs | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| Services | ✅ 3 tabs | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Projects | ✅ 3 tabs | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Pages | ✅ 2 tabs | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Testimonials | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Admin Modal Standard (Locked Constraint)

All content module modals must conform to this pattern:

| Aspect | Requirement |
|--------|-------------|
| Size | `size="xl"` |
| Header | Title + close button |
| Footer | Cancel (secondary, left) + Save Changes (primary, right) |
| Tabs | react-bootstrap Tabs component |
| Form Groups | Consistent spacing with `mb-3` |
| Media Fields | MediaPicker component |
| Character Counters | For SEO and excerpt fields |
| Validation | Inline error display with `isInvalid` |

---

## Changelog

| Date | Change |
|------|--------|
| 2025-12-31 | Phase 2.1a complete — Blog modal expanded to 5-tab layout with Details Layout tab |
| 2025-12-31 | Phase 2 complete — Blog modal restructured to 4-tab layout |
| 2025-12-31 | Created document, Phase 1 schema complete |
