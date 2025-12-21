# Phase 4 — Module: Pages

```
Status: Draft
Phase: Documentation Only
Execution: Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Module Overview

| Attribute | Value |
|-----------|-------|
| Module Name | Pages (Static) |
| Admin Route | `/content/pages` |
| Public Routes | `/about`, `/service`, `/service-details`, `/contact` |
| Current State | Empty table placeholder |
| Priority | 5 (after Testimonials) |

---

## 2. IMPORTANT: Pages + Sections is NOT Phase 4

### 2.1 Scope Clarification

| Scope | Phase | Status |
|-------|-------|--------|
| Static Pages (MVP) | Phase 4 | Documented here |
| Pages + Sections Editor | **LATER PHASE** | NOT Phase 4 |
| Dynamic Page Builder | **LATER PHASE** | NOT Phase 4 |

### 2.2 What "Pages + Sections" Means (Future)

A Pages + Sections editor would allow:
- Creating new pages dynamically
- Adding/removing sections to pages
- Reordering sections
- Configuring section content per page

**This is explicitly NOT included in Phase 4.**

### 2.3 MVP Scope (Phase 4)

Phase 4 Pages module is LIMITED to:
- Managing metadata for existing static pages
- Basic SEO fields (title, description)
- No dynamic section management
- No page creation (routes are fixed)

---

## 3. Frontend Reference

### 3.1 Mapping Index Reference

See: `Phase_4_Frontend_Mapping_Index.md` (various sections)

### 3.2 Static Pages in Finibus

| Route | Component | Sections |
|-------|-----------|----------|
| `/about` | AboutPage | InsideStoryArea, LatesNewsArea |
| `/service` | ServicesPage | WhatWeDoArea, HowWeWorkArea, ServicePrice |
| `/service-details` | ServiceDetails | Service detail content |
| `/contact` | ContactPage | ContactUsArea, ContactForm |

### 3.3 Page Content Analysis

| Page | Content Type | CMS Required |
|------|--------------|--------------|
| About | Static text, images | TBD |
| Services | Service list, pricing | TBD |
| Service Details | Service description | TBD |
| Contact | Contact info, form | Leads capture only |

**Note**: Most page content in Finibus is hardcoded. Making it dynamic is complex and deferred.

---

## 4. Data Model Proposal (MVP)

### 4.1 Table: `pages`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | No | gen_random_uuid() | Primary key |
| `slug` | text | No | — | URL path (e.g., "about") |
| `title` | text | No | — | Page title (H1) |
| `meta_title` | text | Yes | NULL | SEO title tag |
| `meta_description` | text | Yes | NULL | SEO meta description |
| `is_published` | boolean | No | true | Page active |
| `created_at` | timestamptz | No | now() | Creation timestamp |
| `updated_at` | timestamptz | No | now() | Last modified |

### 4.2 Indexes

| Index | Columns | Purpose |
|-------|---------|---------|
| `pages_pkey` | `id` | Primary key |
| `pages_slug_key` | `slug` | Unique constraint |

### 4.3 Pre-defined Pages (Seed Data)

| Slug | Title | Notes |
|------|-------|-------|
| `about` | About Us | Static page |
| `services` | Services | Static page |
| `contact` | Contact Us | Static page |
| `blog` | Blog | Listing page |
| `projects` | Projects | Listing page |

### 4.4 RLS Considerations (High-Level)

**Public Access (SELECT)**:
- Only pages with `is_published = true`

**Admin Access (ALL)**:
- Authenticated users can update metadata

| Policy | Rule |
|--------|------|
| public_read | `is_published = true` |
| admin_update | `auth.role() = 'authenticated'` |

**Note**: Admin cannot CREATE/DELETE pages in MVP (routes are fixed)

### 4.5 Seed Data

**Required**: Yes — pre-populate with existing static pages

---

## 5. Admin UI Requirements

### 5.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List | `/content/pages` | Table of all pages |
| Edit | `/content/pages/:id` or modal | Edit page metadata |

**Note**: No Create screen — pages are predefined

### 5.2 List View Features

| Feature | MVP | Later |
|---------|-----|-------|
| Table with columns | ✅ | — |
| Published filter | ✅ | — |
| View on site link | ✅ | — |
| Bulk publish/unpublish | — | ✅ |

### 5.3 List View Columns

| Column | Sortable | Filterable |
|--------|----------|------------|
| Title | No | No |
| Slug | No | No |
| Published | No | Yes |
| Last Updated | Yes | No |
| Actions | N/A | N/A |

### 5.4 Edit Form Fields (MVP Only)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Title | Text input | Yes | Max 100 chars |
| Slug | Text (read-only) | N/A | Fixed |
| Meta Title | Text input | No | Max 70 chars |
| Meta Description | Textarea | No | Max 160 chars |
| Published | Toggle | Yes | Boolean |

**Note**: Slug is NOT editable in MVP (fixed routes)

### 5.5 Empty State

**Current (Phase 3)**: Empty table with columns

**Phase 4 MVP**: Pre-populated with static pages

### 5.6 Validation Rules

| Rule | Constraint |
|------|------------|
| Title | Required, max 100 characters |
| Meta Title | Max 70 characters (SEO best practice) |
| Meta Description | Max 160 characters (SEO best practice) |

---

## 6. Phase Gate

### 6.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create `pages` table, seed data, RLS | Separate authorization required |
| Step 2 | Admin UI: list, edit metadata | Separate authorization required |
| Step 3 | Public rendering: meta tag integration | Separate authorization required |

### 6.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| None | — |

### 6.3 Stop Condition

Before proceeding to Step 2:
- [ ] `pages` table created with schema
- [ ] Seed data inserted
- [ ] RLS policies active
- [ ] Explicit authorization received

### 6.4 Verification Checklist (Per Step)

**Step 1 (DB Foundation)**:
- [ ] Table exists with correct schema
- [ ] Seed data includes all static pages
- [ ] Slug uniqueness enforced
- [ ] RLS policies active

**Step 2 (Admin UI)**:
- [ ] List view shows all pages
- [ ] Edit form loads and saves
- [ ] Meta fields update correctly
- [ ] Published toggle works
- [ ] Create/Delete are disabled

**Step 3 (Public Rendering)**:
- [ ] Meta title renders in `<title>` tag
- [ ] Meta description renders in `<meta>` tag
- [ ] Unpublished pages return 404

---

## 7. Future Milestone: Pages + Sections Editor

### 7.1 Scope (NOT Phase 4)

| Feature | Description |
|---------|-------------|
| Section types | Hero, Content, Gallery, CTA, etc. |
| Section ordering | Drag-and-drop reorder |
| Section configuration | Per-section content fields |
| Page creation | Create new pages with custom slugs |
| Page deletion | Remove custom pages |

### 7.2 Data Model (Conceptual Only)

```
pages
├── id
├── slug
├── title
└── sections (one-to-many)
    ├── id
    ├── page_id (FK)
    ├── section_type
    ├── content (JSONB)
    └── display_order
```

### 7.3 Timeline

**Status**: DEFERRED — Not included in Phase 4 planning

---

## 8. MVP vs Later Summary

### 8.1 MVP Scope

- Single `pages` table for metadata
- Pre-defined pages only (no creation)
- SEO fields (meta title, description)
- Published toggle
- Read-only slugs

### 8.2 Later Phase Scope

- Pages + Sections editor
- Dynamic page creation
- Custom slugs
- Section types library
- Drag-and-drop section ordering
- Per-section content management

---

## 9. TBD Items

| Item | Decision Required |
|------|-------------------|
| Services as separate module | Separate from Pages? |
| Contact info management | Include in Settings instead? |
| Additional meta fields | OG tags, Twitter cards? |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |

**Next Review:** After Testimonials module implementation
