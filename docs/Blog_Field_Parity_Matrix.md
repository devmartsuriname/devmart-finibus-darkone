# Blog Field Parity Matrix

**Created:** 2025-12-31  
**Phase:** 2.1a–2.3 — Blog Field Parity Fix + Wiring + Seeding  
**Status:** ✅ COMPLETE — All Fields Wired + Data Seeded

---

## Overview

This document provides a complete field-by-field parity audit comparing:
- **A)** Frontend Blog UI requirements
- **B)** Admin Blog Modal fields
- **C)** blog_posts DB columns
- **D)** Public Hook wiring status

---

## Phase 2.1a–2.3 — Parity + Wiring Complete (2025-12-31)

### Phase 2.1a: Schema Enhancement
5 new columns added to resolve previously hardcoded frontend elements.

### Phase 2.1a–2.3: Public Wiring Complete
All new fields now wired from DB → Public Hook → Component props.

### Data Seeding Complete
All published posts seeded with SEO + Details Layout data.

| New Column | Type | Purpose | Admin Tab | Public Wired | Seeded |
|------------|------|---------|-----------|--------------|--------|
| `quote_text` | TEXT | Quote block text | Details Layout | ✅ YES | ✅ YES |
| `quote_author` | TEXT | Quote attribution | Details Layout | ✅ YES | ✅ YES |
| `secondary_image_media_id` | UUID FK | Banner section image | Details Layout | ✅ YES | ❌ NULL (manual) |
| `secondary_content` | TEXT | Banner section body text | Details Layout | ✅ YES | ✅ YES |
| `author_display_name` | TEXT | Author display name | Details Layout | ✅ YES | ✅ YES |

---

## Parity Table (Updated)

| Field | DB Column | DB Type | Admin Input | Frontend Wired | Seeded | Status |
|-------|-----------|---------|-------------|----------------|--------|--------|
| ID | `id` | uuid | No (auto) | No | — | OK |
| Title | `title` | text | Yes (Tab 1) | Yes | — | OK |
| Slug | `slug` | text | Yes (Tab 1) | Yes (URL) | — | OK |
| Excerpt | `excerpt` | text | Yes (Tab 1) | Yes | — | OK |
| Content | `content` | text | Yes (Tab 1) | Yes | — | OK |
| Content Blocks | `content_blocks` | jsonb | Yes (Tab 1) | No (internal) | — | OK |
| Category | `category` | text | Yes (Tab 2) | Yes | — | OK |
| Tags | `tags` | text[] | Yes (Tab 2) | ✅ WIRED | — | OK |
| Featured Image | `featured_image_media_id` | uuid FK | Yes (Tab 3) | Yes | — | OK |
| Status | `status` | text | Yes (Tab 3) | No (filter) | — | OK |
| Published At | `published_at` | timestamptz | Yes (Tab 3) | Yes | — | OK |
| Author ID | `author_id` | uuid | No (auto) | No | — | OK |
| Created At | `created_at` | timestamptz | No (auto) | No | — | OK |
| Updated At | `updated_at` | timestamptz | No (auto) | No | — | OK |
| Meta Title | `meta_title` | text | Yes (Tab 4) | ✅ WIRED | ✅ | OK |
| Meta Description | `meta_description` | text | Yes (Tab 4) | ✅ WIRED | ✅ | OK |
| OG Image | `og_image_media_id` | uuid FK | Yes (Tab 4) | ✅ WIRED | ❌ | OK |
| Canonical URL | `canonical_url` | text | Yes (Tab 4) | ✅ WIRED | ✅ | OK |
| Noindex | `noindex` | boolean | Yes (Tab 4) | ✅ WIRED | ✅ | OK |
| Quote Text | `quote_text` | text | Yes (Tab 5) | ✅ WIRED | ✅ | OK |
| Quote Author | `quote_author` | text | Yes (Tab 5) | ✅ WIRED | ✅ | OK |
| Secondary Image | `secondary_image_media_id` | uuid FK | Yes (Tab 5) | ✅ WIRED | ❌ | OK |
| Secondary Content | `secondary_content` | text | Yes (Tab 5) | ✅ WIRED | ✅ | OK |
| Author Display Name | `author_display_name` | text | Yes (Tab 5) | ✅ WIRED | ✅ | OK |

---

## Frontend Hardcoded Elements — Status

| Element | Location | DB Column | Public Wired | Status |
|---------|----------|-----------|--------------|--------|
| Quote Block Text | BlogDetailsWrapper.tsx | `quote_text` | ✅ YES | ✅ WIRED |
| Quote Author | BlogDetailsWrapper.tsx | `quote_author` | ✅ YES | ✅ WIRED |
| Banner Image | BlogDetailsWrapper.tsx | `secondary_image_media_id` | ✅ YES | ✅ WIRED |
| Banner Text | BlogDetailsWrapper.tsx | `secondary_content` | ✅ YES | ✅ WIRED |
| Author Name | BlogDetailsWrapper.tsx | `author_display_name` | ✅ YES | ✅ WIRED |
| Author Avatar | BlogDetailsWrapper.tsx | — | — | HARDCODED (template asset) |
| Tags List | BlogDetailsWrapper.tsx | `tags` | ✅ YES | ✅ WIRED |
| Comment Counter | BlogDetailsWrapper.tsx | — | — | ✅ REMOVED (permanent) |

**Note:** Author Avatar remains hardcoded as it uses template static assets. This is acceptable for 1:1 template parity.

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

### Tab 5: Details Layout
- Quote Text (optional, max 300 chars)
- Quote Author (optional, max 100 chars)
- Secondary Image (MediaPicker)
- Secondary Content (optional, max 500 chars)
- Author Display Name (optional, default "Devmart Team")

---

## Seeded Data Summary

| Field | Seeded Value | Constraint |
|-------|--------------|------------|
| meta_title | Post title (≤70 chars) | LEFT(title, 70) |
| meta_description | Post excerpt (≤160 chars) | LEFT(excerpt, 160) |
| canonical_url | `/blog/{slug}` | — |
| noindex | false | — |
| author_display_name | "Devmart Team" | — |
| quote_text | Devmart innovation quote | ≤300 chars |
| quote_author | "Devmart Team" | — |
| secondary_content | Devmart approach paragraph | ≤500 chars |
| og_image_media_id | NULL (manual later) | — |
| secondary_image_media_id | NULL (manual later) | — |

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
| quote_text | Max 300 characters |
| quote_author | Max 100 characters |
| secondary_content | Max 500 characters |
| author_display_name | Max 100 characters |

---

## Conclusion

**Parity Status: ✅ COMPLETE**

All 25 blog_posts columns are:
- Editable via Admin Modal (23 fields across 5 tabs)
- Auto-managed by system (id, author_id, created_at, updated_at)
- **Wired to public frontend** (Phase 2.1a–2.3)
- **Seeded with initial data** (except image media IDs)

Phase 2.1a–2.3 resolved all missing frontend layout fields and completed public wiring with data seeding.
