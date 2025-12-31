# SEO Governance Documentation

**Created:** 2025-12-31  
**Phase:** Admin Blog Enhancement — Phase 3  
**Status:** COMPLETE (Admin + Documentation)

---

## Overview

This document defines the authoritative SEO fallback hierarchy for the Devmart platform. All content modules should follow this pattern for consistent SEO behavior.

---

## Fallback Hierarchy (3-Tier Priority)

```
┌─────────────────────────────────────────────────────────────┐
│                    SEO Resolution Order                      │
├─────────────────────────────────────────────────────────────┤
│  Priority 1: Content-Specific SEO Fields                     │
│    └── meta_title, meta_description, og_image_media_id,      │
│        canonical_url, noindex                                │
│    └── Set via Admin → Content Module → SEO tab              │
│                                                              │
│  Priority 2: Content-Derived Values                          │
│    └── title → Meta Title fallback                           │
│    └── excerpt → Meta Description fallback                   │
│    └── featured_image → OG Image fallback                    │
│    └── URL path → Canonical URL fallback                     │
│                                                              │
│  Priority 3: Global SEO Settings                             │
│    └── Admin → Settings → SEO tab                            │
│    └── default_meta_title, default_meta_description,         │
│        default_og_image_media_id                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Field Specifications

### Meta Title
| Attribute | Value |
|-----------|-------|
| Max Length | 70 characters |
| Recommended | 50-60 characters |
| DB Column | `meta_title` (blog_posts) |
| Fallback Chain | meta_title → title → default_meta_title |

### Meta Description
| Attribute | Value |
|-----------|-------|
| Max Length | 160 characters |
| Recommended | 120-155 characters |
| DB Column | `meta_description` (blog_posts) |
| Fallback Chain | meta_description → excerpt → default_meta_description |

### OG Image
| Attribute | Value |
|-----------|-------|
| Recommended Size | 1200x630 pixels |
| Format | JPEG, PNG, WebP |
| DB Column | `og_image_media_id` (blog_posts) |
| Fallback Chain | og_image → featured_image → default_og_image |

### Canonical URL
| Attribute | Value |
|-----------|-------|
| Format | Full absolute URL |
| DB Column | `canonical_url` (blog_posts) |
| Fallback | Auto-generated from content URL path |
| Use Case | Cross-posting, syndication |

### Noindex
| Attribute | Value |
|-----------|-------|
| Type | Boolean |
| Default | `false` |
| DB Column | `noindex` (blog_posts) |
| Effect | Prevents search engine indexing when `true` |

---

## Admin UI Locations

| SEO Fields | Admin Path |
|------------|------------|
| Global SEO Settings | Settings → SEO tab |
| Blog Post SEO | Content → Blog → Edit Post → SEO tab |
| Page SEO | Pages → Edit Page → SEO (if applicable) |

---

## Database Keys

### Settings Table (category: 'seo')
| Key | Purpose |
|-----|---------|
| `default_meta_title` | Global fallback title |
| `default_meta_description` | Global fallback description |
| `default_og_image_media_id` | Global fallback OG image (FK to media) |

### blog_posts Table
| Column | Type | Constraint |
|--------|------|------------|
| `meta_title` | TEXT | max 70 chars |
| `meta_description` | TEXT | max 160 chars |
| `og_image_media_id` | UUID | FK to media |
| `canonical_url` | TEXT | — |
| `noindex` | BOOLEAN | default false |

---

## Implementation Files

### Utility
- `src/lib/seo/resolveSeoFallbacks.ts` — Fallback resolution logic

### Admin Components
- `BlogPostModal.tsx` — SEO tab with fallback indicators
- `SeoSettingsTab.tsx` — Global SEO settings with documentation

---

## Public Frontend Wiring (DEFERRED)

**Status:** NOT IMPLEMENTED (Frontend Freeze in effect)

When the frontend freeze is lifted, implement:

1. Create `useSeoMeta.ts` hook in public app
2. Consume `resolveSeoFallbacks()` utility
3. Inject `<meta>` tags via react-helmet-async
4. Wire to blog details page

**Current State:** Public frontend uses hardcoded or no SEO meta tags. This is acceptable during frontend freeze.

---

## Validation Rules

### Admin-Side (Enforced)
- Meta title: Required if set, max 70 chars
- Meta description: Max 160 chars
- Canonical URL: Must be valid URL format if provided

### Character Counters
- Warning at 60+ chars for title
- Warning at 140+ chars for description
- Visual indicators in admin UI

---

## Best Practices

1. **Always set meta_title** for important posts — don't rely on fallbacks
2. **Keep descriptions unique** — avoid duplicate descriptions across posts
3. **Use OG images** — social sharing performs better with custom images
4. **Set noindex sparingly** — only for drafts, test pages, or duplicates
5. **Canonical URLs** — only set for republished/syndicated content

---

## References

- [docs/Blog_Field_Parity_Matrix.md](./Blog_Field_Parity_Matrix.md) — Field mapping
- [docs/Architecture.md](./Architecture.md) — SEO Governance Architecture section
- [docs/Backend.md](./Backend.md) — SEO Data Model section
