# Phase 4 — Module: Projects

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
| Module Name | Projects / Portfolio |
| Admin Route | `/content/projects` |
| Public Routes | `/project`, `/project-details` |
| Current State | Empty table placeholder |
| Priority | 4 (after Pages) |

---

## 2. Frontend Reference

### 2.1 Mapping Index Reference

See: `Phase_4_Frontend_Mapping_Index.md` Sections 4, 5

### 2.2 Public Display Components

| Route | Component | Content Source |
|-------|-----------|----------------|
| `/project` | ProjectsPage | Portfolio grid with filters |
| `/project-details` | ProjectDetailsPage | Case study detail |
| Homepage | PortfolioArea | Featured projects carousel |

### 2.3 Project Card (CONFIRMED from Data.ts)

| Element | Type | Required | Field Name |
|---------|------|----------|------------|
| `id` | Number | Yes | `id` |
| `title` | Text | Yes | `title` |
| `heading` | Text | Yes | `heading` |
| `image` | Image URL | Yes | `image` |
| `category` | Text | Yes | `category` |

### 2.4 Current Categories (from Data.ts)

| Category | Display Name |
|----------|--------------|
| UI/UX | UI/UX |
| Web Design | Web Design |
| Developing | Developing |
| Graphic Design | Graphic Design |

---

## 3. Data Model Proposal (MVP)

### 3.1 Table: `projects`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | No | gen_random_uuid() | Primary key |
| `title` | text | No | — | Short title (card display) |
| `heading` | text | No | — | Full heading/name |
| `slug` | text | No | — | URL-friendly identifier |
| `description` | text | Yes | NULL | Full project description |
| `image` | uuid | Yes | NULL | FK to media.id (thumbnail) |
| `featured_image` | uuid | Yes | NULL | FK to media.id (detail page) |
| `category` | text | No | — | Category for filtering |
| `is_featured` | boolean | No | false | Show on homepage |
| `display_order` | integer | Yes | NULL | Sort order for featured |
| `status` | text | No | 'draft' | draft, published, archived |
| `created_at` | timestamptz | No | now() | Creation timestamp |
| `updated_at` | timestamptz | No | now() | Last modified |

### 3.2 RLS Considerations (High-Level)

**Public Access (SELECT)**:
- Only projects with `status = 'published'`

**Admin Access (ALL)**:
- Authenticated users can CRUD all projects

---

## 4. Seeding Plan

### 4.1 Seed Data Requirement

| Attribute | Value |
|-----------|-------|
| **Required** | Recommended |
| **Reason** | Sample projects for testing filter functionality and validating Projects module patterns |

### 4.2 Seed Dataset

| Item | Count | Source |
|------|-------|--------|
| Projects | 6-9 | Sample content matching Finibus portfolio layout |
| Project Images | 6-9 | From Media Library (`finibus/portfolio/`) |
| Categories | 4 | UI/UX, Web Design, Developing, Graphic Design |

### 4.3 Sample Project Structure

| Field | Sample Value |
|-------|--------------|
| title | "Mobile App" |
| heading | "Mobile Banking Application" |
| slug | "mobile-banking-application" |
| description | "A comprehensive mobile banking solution..." |
| image | Reference to `finibus/portfolio/portfolio-1.jpg` |
| category | "UI/UX" |
| is_featured | true |
| display_order | 1 |
| status | "published" |

### 4.4 Seeding Method

**Recommended:** Manual entry via Admin UI after Projects module is built

**Rationale:**
- Validates CRUD operations
- Tests category filter
- Confirms Media Library integration
- Tests featured toggle

### 4.5 Acceptance Criteria

- [ ] At least 6 projects created with all required fields
- [ ] Each project has a thumbnail from Media Library
- [ ] All 4 categories represented
- [ ] At least 3 projects marked as featured
- [ ] Published projects visible on public `/project` route
- [ ] Category filter tabs work correctly
- [ ] Featured projects display on homepage

---

## 5. Admin UI Requirements

### 5.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List | `/content/projects` | Table of all projects |
| Create | Modal | New project form |
| Edit | Modal | Edit existing project |

### 5.2 List View Columns

| Column | Sortable | Filterable |
|--------|----------|------------|
| Thumbnail | No | No |
| Title | Yes | Yes (search) |
| Category | No | Yes |
| Status | No | Yes |
| Featured | No | Yes |
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
| Step 1 | Create `projects` table, indexes, RLS | Separate authorization required |
| Step 2 | Admin CRUD: list, create, edit, delete | Separate authorization required |
| Step 3 | Public rendering: portfolio grid, detail page | Separate authorization required |
| Step 4 | Seeding: Create sample projects | After Step 2 |

### 7.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| Media Library (Complete) | Image picker |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |
| 1.0 | 2025-12-22 | Planning Agent | Added Seeding Plan, updated priority |

**Next Review:** After Pages module implementation
