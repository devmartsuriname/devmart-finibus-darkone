# Phase 4 — Module: Blog

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
| Module Name | Blog / News |
| Admin Route | `/content/blog` |
| Public Routes | `/blog`, `/blog-standard`, `/blog-details` |
| Current State | Empty table placeholder |
| Priority | 5 (after Projects) |

---

## 2. Frontend Reference

### 2.1 Mapping Index Reference

See: `Phase_4_Frontend_Mapping_Index.md` Sections 6, 7

### 2.2 Public Display Components

| Route | Component | Content Source |
|-------|-----------|----------------|
| `/blog` | BlogPage | Blog listing with sidebar |
| `/blog-standard` | BlogStandardPage | Alternate blog layout |
| `/blog-details` | BlogDetailsPage | Single post with comments |

### 2.3 Blog Card (CONFIRMED from BlogCart.tsx)

| Element | Type | Required | Field Name |
|---------|------|----------|------------|
| Post image | Image | Yes | `featured_image` |
| Category tag | Text | Yes | `category` |
| Author avatar | Image | Yes | `author_image` |
| Author name | Text | Yes | `author_name` |
| Post date | Date | Yes | `published_at` |
| Post title | Text | Yes | `title` |
| Post excerpt | Text | Yes | `excerpt` |

### 2.4 Blog Details (from BlogDetailsWrapper)

| Element | Type | Required | Field Name |
|---------|------|----------|------------|
| Full title | Text | Yes | `title` |
| Full content | Rich Text | Yes | `content` |
| Featured image | Image | Yes | `featured_image` |
| Author info | Relation | Yes | FK to profiles |
| Published date | Date | Yes | `published_at` |
| Tags | Array | TBD | `tags` |

---

## 3. Data Model Proposal (MVP)

### 3.1 Table: `blog_posts`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | No | gen_random_uuid() | Primary key |
| `title` | text | No | — | Post title |
| `slug` | text | No | — | URL-friendly identifier |
| `excerpt` | text | Yes | NULL | Short summary (max 200 chars) |
| `content` | text | No | — | Full post content (HTML/Markdown) |
| `featured_image` | uuid | Yes | NULL | FK to media.id |
| `category` | text | Yes | NULL | Post category |
| `tags` | text[] | Yes | NULL | Array of tags |
| `author_id` | uuid | No | auth.uid() | FK to profiles.id |
| `status` | text | No | 'draft' | draft, published, archived |
| `published_at` | timestamptz | Yes | NULL | Publication date |
| `created_at` | timestamptz | No | now() | Creation timestamp |
| `updated_at` | timestamptz | No | now() | Last modified |

### 3.2 RLS Considerations (High-Level)

**Public Access (SELECT)**:
- Only posts with `status = 'published'` AND `published_at <= now()`

**Admin Access (ALL)**:
- Authenticated users can CRUD all posts

---

## 4. Seeding Plan

### 4.1 Seed Data Requirement

| Attribute | Value |
|-----------|-------|
| **Required** | Recommended |
| **Reason** | Sample posts for testing public display and validating Blog module patterns |

### 4.2 Seed Dataset

| Item | Count | Source |
|------|-------|--------|
| Blog Posts | 5-8 | Sample content matching Finibus blog layout |
| Featured Images | 5-8 | From Media Library (seeded first) |
| Categories | 3-4 | Technology, Business, Design, News |

### 4.3 Sample Post Structure

| Field | Sample Value |
|-------|--------------|
| title | "Building Modern Web Applications" |
| slug | "building-modern-web-applications" |
| excerpt | "A comprehensive guide to..." |
| content | Rich text (2-3 paragraphs) |
| featured_image | Reference to `finibus/blog/post-1.jpg` |
| category | "Technology" |
| status | "published" |
| published_at | Past date |

### 4.4 Seeding Method

**Recommended:** Manual entry via Admin UI after Blog module is built

**Rationale:**
- Validates CRUD operations
- Tests rich text editor
- Confirms Media Library integration

### 4.5 Acceptance Criteria

- [ ] At least 5 posts created with all required fields
- [ ] Each post has a featured image from Media Library
- [ ] At least 3 categories represented
- [ ] Published posts visible on public `/blog` route
- [ ] Blog cards render correctly with all elements

---

## 5. Admin UI Requirements

### 5.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List | `/content/blog` | Table of all posts |
| Create | Modal | New post form |
| Edit | Modal | Edit existing post |

### 5.2 List View Columns

| Column | Sortable | Filterable |
|--------|----------|------------|
| Title | Yes | Yes (search) |
| Category | No | Yes |
| Status | No | Yes |
| Published Date | Yes | No |
| Actions | N/A | N/A |

---

## 6. Admin UI Standard Reference

See: `Phase_4_Admin_UI_Standard.md`

This module MUST follow all patterns defined in the Admin UI Standard.

---

## 7. Phase Gate

### 7.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create `blog_posts` table, indexes, RLS | Separate authorization required |
| Step 2 | Admin CRUD: list, create, edit, delete | Separate authorization required |
| Step 3 | Public rendering: blog listing, post detail | Separate authorization required |
| Step 4 | Seeding: Create sample posts | After Step 2 |

### 7.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| Media Library (Complete) | Featured image picker |
| Profiles table | Author reference |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |
| 1.0 | 2025-12-22 | Planning Agent | Added Seeding Plan |

**Next Review:** After Projects module implementation
