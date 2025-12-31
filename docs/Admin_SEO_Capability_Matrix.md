# Admin SEO Capability Matrix

**Status:** ✅ Phase 1 Complete  
**Last Updated:** 2025-12-31

---

## Overview

This document tracks SEO field availability across all content modules and defines the fallback hierarchy.

---

## SEO Field Availability by Module

| Module | Meta Title | Meta Description | OG Image | Canonical URL | Noindex | Status |
|--------|------------|------------------|----------|---------------|---------|--------|
| **Blog Posts** | 🆕 Schema | 🆕 Schema | 🆕 Schema | 🆕 Schema | 🆕 Schema | Phase 1 Complete |
| **Pages** | ✅ | ✅ | ❌ | ❌ | ❌ | Complete |
| **Services** | ❌ | ❌ | ❌ | ❌ | ❌ | Not planned |
| **Projects** | ❌ | ❌ | ❌ | ❌ | ❌ | Not planned |
| **Testimonials** | ❌ | ❌ | ❌ | ❌ | ❌ | N/A |
| **Global Settings** | ✅ | ✅ | ❌ | ❌ | ❌ | Complete |

### Legend
- ✅ = Implemented and functional
- 🆕 = Schema added in Phase 1, UI pending Phase 2
- ❌ = Not available

---

## Blog Post SEO Fields (Phase 1)

### Database Schema

```sql
-- Added in Phase 1 migration
ALTER TABLE blog_posts ADD COLUMN meta_title TEXT;
ALTER TABLE blog_posts ADD COLUMN meta_description TEXT;
ALTER TABLE blog_posts ADD COLUMN og_image_media_id UUID REFERENCES media(id);
ALTER TABLE blog_posts ADD COLUMN canonical_url TEXT;
ALTER TABLE blog_posts ADD COLUMN noindex BOOLEAN DEFAULT FALSE;

-- Constraints
ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_meta_title_length 
  CHECK (char_length(meta_title) <= 70);
ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_meta_description_length 
  CHECK (char_length(meta_description) <= 160);
```

### Field Specifications

| Field | Max Length | Required | Default | Admin UI (Phase 2) |
|-------|------------|----------|---------|-------------------|
| meta_title | 70 chars | No | NULL (use fallback) | Text input + counter |
| meta_description | 160 chars | No | NULL (use fallback) | Textarea + counter |
| og_image_media_id | — | No | NULL (use featured_image) | MediaPicker |
| canonical_url | — | No | NULL (use post URL) | Text input |
| noindex | — | No | FALSE | Toggle switch |

---

## SEO Fallback Hierarchy

### Blog Post SEO Resolution

```
┌─────────────────────────────────────────────────────────────┐
│                  Blog Post SEO Resolution                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: Check blog_posts table                              │
│    └── If meta_title is set → use it                         │
│    └── If meta_description is set → use it                   │
│    └── If og_image_media_id is set → use it                  │
│                                                              │
│  Step 2: Check page_settings (page_slug = 'blog')            │
│    └── If Step 1 fields are NULL, check page SEO             │
│    └── Note: This is the static /blog listing page SEO       │
│                                                              │
│  Step 3: Check settings table (category = 'seo')             │
│    └── If Step 1 & 2 fields are NULL, use global defaults    │
│    └── Keys: default_meta_title, default_meta_description    │
│                                                              │
│  Step 4: Hardcoded defaults (last resort)                    │
│    └── Title: Post title                                     │
│    └── Description: Post excerpt or first 160 chars          │
│    └── OG Image: Featured image                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Fallback Order (Priority)

| Priority | Source | Scope |
|----------|--------|-------|
| 1 | Blog post SEO fields | Per-post override |
| 2 | Blog page settings | Static page defaults |
| 3 | Global SEO settings | Site-wide defaults |
| 4 | Content-derived | Automatic (title, excerpt) |

---

## Pages Module SEO

### Current Implementation

| Field | Location | Status |
|-------|----------|--------|
| Meta Title | pages.meta_title | ✅ Complete |
| Meta Description | pages.meta_description | ✅ Complete |
| OG Image | — | ❌ Not available |
| Canonical URL | — | ❌ Not available |
| Noindex | — | ❌ Not available |

---

## Global SEO Settings

### Settings Table Keys

| Key | Category | Purpose | Status |
|-----|----------|---------|--------|
| default_meta_title | seo | Site-wide title fallback | ✅ Complete |
| default_meta_description | seo | Site-wide description fallback | ✅ Complete |
| site_name | general | Used in OG tags | ✅ Complete |

---

## Phase 2 Admin UI Requirements

### Blog SEO Tab Design

```
┌─────────────────────────────────────────────────────────────┐
│  SEO Tab                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Meta Title                                        [45/70]   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Custom SEO Title Here                                    ││
│  └─────────────────────────────────────────────────────────┘│
│  ℹ️ Leave empty to use post title                           │
│                                                              │
│  Meta Description                                 [120/160]  │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Custom description for search engines...                 ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
│  ℹ️ Leave empty to use post excerpt                         │
│                                                              │
│  OG Image                                                    │
│  ┌─────────────┐                                             │
│  │  [Select]   │  ℹ️ Falls back to featured image           │
│  └─────────────┘                                             │
│                                                              │
│  Canonical URL                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ https://example.com/blog/custom-url                      ││
│  └─────────────────────────────────────────────────────────┘│
│  ℹ️ Leave empty to use default post URL                     │
│                                                              │
│  ☐ Noindex (hide from search engines)                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Public Frontend SEO Wiring (Future Phase)

**Status:** ⚠️ NOT IMPLEMENTED (Frontend Frozen)

The following wiring is documented for future implementation when frontend changes are authorized:

```typescript
// Conceptual: BlogDetailsPage.tsx
const seoData = useBlogPostSEO(post);
// seoData resolves: post SEO → page SEO → global SEO

return (
  <Helmet>
    <title>{seoData.metaTitle}</title>
    <meta name="description" content={seoData.metaDescription} />
    <meta property="og:image" content={seoData.ogImage} />
    <link rel="canonical" href={seoData.canonicalUrl} />
    {seoData.noindex && <meta name="robots" content="noindex" />}
  </Helmet>
);
```

---

## Changelog

| Date | Change |
|------|--------|
| 2025-12-31 | Created document, Phase 1 schema documented |
