# Phase 4 — Module: Pages

```
Status: Draft
Phase: Documentation Only
Execution: Not Authorized
Last Updated: 2025-12-22
```

---

## 1. Module Overview

| Attribute | Value |
|-----------|-------|
| Module Name | Pages (Static) |
| Admin Route | `/content/pages` |
| Public Routes | `/about`, `/service`, `/service-details`, `/contact` |
| Current State | Empty table placeholder |
| Priority | 3 (after Settings) |

---

## 2. IMPORTANT: Pages + Sections is NOT Phase 4

### 2.1 Scope Clarification

| Scope | Phase | Status |
|-------|-------|--------|
| Static Pages (MVP) | Phase 4 | Documented here |
| Pages + Sections Editor | **LATER PHASE** | NOT Phase 4 |
| Dynamic Page Builder | **LATER PHASE** | NOT Phase 4 |

### 2.2 MVP Scope (Phase 4)

Phase 4 Pages module is LIMITED to:
- Managing metadata for existing static pages
- Basic SEO fields (title, description)
- No dynamic section management
- No page creation (routes are fixed)

---

## 3. Frontend Reference

### 3.1 Static Pages in Finibus

| Route | Component | Sections |
|-------|-----------|----------|
| `/about` | AboutPage | InsideStoryArea, LatesNewsArea |
| `/service` | ServicesPage | WhatWeDoArea, HowWeWorkArea, ServicePrice |
| `/service-details` | ServiceDetails | Service detail content |
| `/contact` | ContactPage | ContactUsArea, ContactForm |

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

### 4.2 RLS Considerations (High-Level)

**Public Access (SELECT)**:
- Only pages with `is_published = true`

**Admin Access (UPDATE only)**:
- Authenticated users can update metadata
- Admin cannot CREATE/DELETE pages in MVP (routes are fixed)

---

## 5. Seeding Plan

### 5.1 Seed Data Requirement

| Attribute | Value |
|-----------|-------|
| **Required** | **YES** |
| **Reason** | Pre-populate with existing static pages so admin can edit SEO metadata |

### 5.2 Seed Dataset

| Slug | Title | Meta Title | Status |
|------|-------|------------|--------|
| `about` | About Us | About Us - Devmart | Published |
| `services` | Services | Our Services - Devmart | Published |
| `service-details` | Service Details | Service Details - Devmart | Published |
| `contact` | Contact Us | Contact Us - Devmart | Published |
| `blog` | Blog | Blog - Devmart | Published |
| `projects` | Projects | Our Projects - Devmart | Published |

**Count:** 6 pages (fixed set)

### 5.3 Seeding Method

**Recommended:** SQL seed migration

**Rationale:**
- Pages are pre-defined (no user input needed)
- Simple INSERT statements
- Consistent across environments
- One-time setup

### 5.4 Sample Seed SQL

```sql
INSERT INTO public.pages (slug, title, meta_title, meta_description, is_published)
VALUES
  ('about', 'About Us', 'About Us - Devmart', 'Learn about Devmart and our mission.', true),
  ('services', 'Services', 'Our Services - Devmart', 'Explore our range of professional services.', true),
  ('service-details', 'Service Details', 'Service Details - Devmart', NULL, true),
  ('contact', 'Contact Us', 'Contact Us - Devmart', 'Get in touch with our team.', true),
  ('blog', 'Blog', 'Blog - Devmart', 'Read our latest news and articles.', true),
  ('projects', 'Projects', 'Our Projects - Devmart', 'View our portfolio of completed projects.', true);
```

### 5.5 Acceptance Criteria

- [ ] All 6 pages exist in database
- [ ] Each page has correct slug matching public route
- [ ] Admin can view list of pages
- [ ] Admin can edit meta_title and meta_description
- [ ] Admin can toggle is_published
- [ ] Slug is read-only (cannot be edited)
- [ ] No Create or Delete buttons visible

---

## 6. Admin UI Requirements

### 6.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List | `/content/pages` | Table of all pages |
| Edit | Modal | Edit page metadata |

**Note**: No Create screen — pages are predefined

### 6.2 List View Columns

| Column | Sortable | Filterable |
|--------|----------|------------|
| Title | No | No |
| Slug | No | No |
| Published | No | Yes |
| Last Updated | Yes | No |
| Actions | N/A | N/A |

### 6.3 Edit Form Fields (MVP Only)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Title | Text input | Yes | Max 100 chars |
| Slug | Text (read-only) | N/A | Fixed |
| Meta Title | Text input | No | Max 70 chars |
| Meta Description | Textarea | No | Max 160 chars |
| Published | Toggle | Yes | Boolean |

---

## 7. Admin UI Standard Reference

See: `Phase_4_Admin_UI_Standard.md`

This module MUST follow all patterns defined in the Admin UI Standard, with exceptions:
- No "Add" button (pages are pre-defined)
- No Delete action

---

## 8. Phase Gate

### 8.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create `pages` table, seed data, RLS | Separate authorization required |
| Step 2 | Admin UI: list, edit metadata | Separate authorization required |
| Step 3 | Public rendering: meta tag integration | Separate authorization required |

### 8.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| None | — |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |
| 1.0 | 2025-12-22 | Planning Agent | Added Seeding Plan (REQUIRED), updated priority |

**Next Review:** After Settings module implementation
