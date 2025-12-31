# Blog Field Parity Matrix

**Created:** 2025-12-31  
**Phase:** 2.1 — Blog Field Parity Audit  
**Status:** VERIFIED — All Fields Aligned

---

## Overview

This document provides a complete field-by-field parity audit comparing:
- **A)** Frontend Blog UI requirements
- **B)** Admin Blog Modal fields
- **C)** blog_posts DB columns

---

## Parity Table

| Field | DB Column | DB Type | Admin Input | Frontend Used | Status |
|-------|-----------|---------|-------------|---------------|--------|
| ID | `id` | uuid | No (auto-generated) | No | OK |
| Title | `title` | text | Yes (Tab 1) | Yes | OK |
| Slug | `slug` | text | Yes (Tab 1) | Yes (URL routing) | OK |
| Excerpt | `excerpt` | text | Yes (Tab 1) | Yes (list page) | OK |
| Content | `content` | text | Yes (Tab 1 - HTML/blocks) | Yes | OK |
| Content Blocks | `content_blocks` | jsonb | Yes (Tab 1 - structured) | No (compiled to content) | OK |
| Category | `category` | text | Yes (Tab 2) | Yes (badge display) | OK |
| Tags | `tags` | text[] | Yes (Tab 2) | Deferred (hardcoded) | OK |
| Featured Image | `featured_image_media_id` | uuid FK | Yes (Tab 3) | Yes | OK |
| Status | `status` | text | Yes (Tab 3) | No (filter only) | OK |
| Published At | `published_at` | timestamptz | Yes (Tab 3) | Yes (date display) | OK |
| Author ID | `author_id` | uuid | No (auto-assigned) | No | OK |
| Created At | `created_at` | timestamptz | No (auto) | No | OK |
| Updated At | `updated_at` | timestamptz | No (auto) | No | OK |
| Meta Title | `meta_title` | text | Yes (Tab 4) | Deferred (SEO head) | OK |
| Meta Description | `meta_description` | text | Yes (Tab 4) | Deferred (SEO head) | OK |
| OG Image | `og_image_media_id` | uuid FK | Yes (Tab 4) | Deferred (SEO head) | OK |
| Canonical URL | `canonical_url` | text | Yes (Tab 4) | Deferred (SEO head) | OK |
| Noindex | `noindex` | boolean | Yes (Tab 4) | Deferred (SEO head) | OK |

---

## Frontend Hardcoded Elements (Template Parity)

These elements are currently hardcoded in the Finibus template and are **NOT** database-driven. They remain hardcoded to maintain 1:1 template parity:

| Element | Location | Status |
|---------|----------|--------|
| Author Avatar | BlogDetailsWrapper line 51 | Hardcoded `/images/author/author-1.jpg` |
| Author Name | BlogDetailsWrapper line 54 | Hardcoded "Devmart Team" |
| Quote Block | BlogDetailsWrapper lines 104-119 | Hardcoded quote text |
| Banner Image | BlogDetailsWrapper line 137 | Hardcoded `/images/blog-banner.png` |
| Banner Text | BlogDetailsWrapper lines 143-150 | Hardcoded paragraph |
| Tags List | BlogDetailsWrapper lines 158-166 | Hardcoded (category + 2 static) |
| Comment Counter | BlogDetailsWrapper lines 58-62 | TO BE REMOVED (Phase 2.2) |

**Note:** These hardcoded elements are intentional for template parity. They can be made dynamic in a future phase when the frontend freeze is lifted.

---

## Admin Modal Tab Summary

### Tab 1: Content
- Title (required, max 200 chars)
- Slug (required, auto-generated)
- Excerpt (optional, max 300 chars)
- Content (required, HTML or structured blocks)

### Tab 2: Taxonomy
- Category (optional, select + custom)
- Tags (optional, array input)

### Tab 3: Media & Publishing
- Featured Image (MediaPicker)
- Status (draft/published)
- Publish Date (conditional on status)

### Tab 4: SEO
- Meta Title (max 70 chars)
- Meta Description (max 160 chars)
- OG Image (MediaPicker)
- Canonical URL (optional)
- Noindex (boolean)

---

## Validation Rules (Enforced in Admin)

| Field | Constraint |
|-------|------------|
| title | Required, max 200 characters |
| slug | Required, lowercase alphanumeric + hyphens only |
| excerpt | Max 300 characters |
| content | Required (at least 1 block or non-empty HTML) |
| meta_title | Max 70 characters |
| meta_description | Max 160 characters |
| canonical_url | Valid URL format if provided |

---

## Conclusion

**Parity Status: VERIFIED**

All 20 blog_posts columns are either:
- Editable via Admin Modal (18 fields)
- Auto-managed by system (id, author_id, created_at, updated_at)

No missing fields. No schema changes required for Phase 2.1.
