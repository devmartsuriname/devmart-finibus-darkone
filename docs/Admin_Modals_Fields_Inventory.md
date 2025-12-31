# Admin Modals Fields Inventory

**Status:** ✅ Phase 1 Complete  
**Last Updated:** 2025-12-31

---

## Overview

This document inventories all admin modal components and their field mappings for CMS modules.

---

## Blog Module — `BlogPostModal.tsx`

**Status:** Phase 1 Schema Complete | Phase 2 UI Pending

### Current Fields (Post-Phase 1 Schema)

| Tab | Field | DB Column | Type | Validation | Status |
|-----|-------|-----------|------|------------|--------|
| Content | Title | title | TEXT | required | ✅ Existing |
| Content | Slug | slug | TEXT | required, unique, URL-safe | ✅ Existing |
| Content | Excerpt | excerpt | TEXT | max 300 | ✅ Existing |
| Content | Content | content | TEXT | HTML string | ✅ Existing |
| Content | Content Blocks | content_blocks | JSONB | structured array | 🆕 Schema ready |
| Taxonomy | Category | category | TEXT | dropdown + freetext | ✅ Existing |
| Taxonomy | Tags | tags | TEXT[] | array | 🆕 Schema ready |
| Media | Featured Image | featured_image_media_id | UUID | MediaPicker | ✅ Existing |
| Media | Status | status | TEXT | draft/published | ✅ Existing |
| Media | Publish Date | published_at | TIMESTAMP | date picker | ✅ Existing |
| SEO | Meta Title | meta_title | TEXT | max 70, counter | 🆕 Schema ready |
| SEO | Meta Description | meta_description | TEXT | max 160, counter | 🆕 Schema ready |
| SEO | OG Image | og_image_media_id | UUID | MediaPicker | 🆕 Schema ready |
| SEO | Canonical URL | canonical_url | TEXT | valid URL | 🆕 Schema ready |
| SEO | Noindex | noindex | BOOLEAN | switch | 🆕 Schema ready |

### Modal Structure (Current vs Target)

| Aspect | Current | Target (Phase 2) |
|--------|---------|------------------|
| Layout | Single form | 4-tab layout |
| Content editing | Plain textarea | Structured blocks UI |
| Taxonomy | Category text field | Dropdown + Tags chips |
| SEO | None | Full SEO tab |

---

## Services Module — `ServiceModal.tsx`

**Status:** ✅ Complete (Reference Pattern)

### Tab Structure

| Tab | Fields | Status |
|-----|--------|--------|
| Basic Info | Title, Slug, Short Description, Full Description, Icon, Display Order, Status | ✅ Complete |
| Process Steps | Dynamic step management (step_number, title, description, image) | ✅ Complete |
| Pricing | Show Pricing toggle, Monthly/Yearly toggles, Pricing plans management | ✅ Complete |

### Key Patterns (To Reuse in Blog)
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

### SEO Pattern (To Reuse in Blog)
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

| Module | Tabs | SEO Tab | Process Steps | Pricing | Category | Tags |
|--------|------|---------|---------------|---------|----------|------|
| Blog | Pending | Pending | ❌ | ❌ | ✅ | Pending |
| Services | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Projects | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Pages | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Testimonials | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Phase 2 Implementation Notes

### Blog Modal Target Structure
```
BlogPostModal (size="xl")
├── Tab: Content
│   ├── Title (text, required)
│   ├── Slug (text, auto-generated)
│   ├── Excerpt (textarea, counter)
│   └── Content Blocks (structured UI)
├── Tab: Taxonomy
│   ├── Category (dropdown + add new)
│   └── Tags (chip input)
├── Tab: Media & Publishing
│   ├── Featured Image (MediaPicker)
│   ├── Status (dropdown)
│   └── Publish Date (date picker)
└── Tab: SEO
    ├── Meta Title (text, 70 char counter)
    ├── Meta Description (textarea, 160 char counter)
    ├── OG Image (MediaPicker)
    ├── Canonical URL (text, optional)
    └── Noindex (switch)
```

---

## Changelog

| Date | Change |
|------|--------|
| 2025-12-31 | Created document, Phase 1 schema complete |
