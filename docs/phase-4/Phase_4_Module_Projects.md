# Phase 4 — Module: Projects

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
| Module Name | Projects / Portfolio |
| Admin Route | `/content/projects` |
| Public Routes | `/project`, `/project-details` |
| Current State | Empty table placeholder |
| Priority | 3 (after Blog) |

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

### 2.5 Project Details (from ProjectDetailsPage)

| Element | Type | Required | Field Name |
|---------|------|----------|------------|
| Breadcrumb | Text | Yes | `title` |
| ProjectProcess | Section | Yes | See below |
| ReletedProject | Section | Yes | Same category projects |

### 2.6 ProjectProcess Elements (TBD)

| Element | Type | Required | Field Name |
|---------|------|----------|------------|
| Featured image | Image | Yes | `featured_image` |
| Project overview | Text | Yes | `description` |
| Process steps | Repeater | TBD | TBD |
| Client info | Text | TBD | TBD |
| Technologies | Tags | TBD | TBD |

**Note**: Detailed project content structure requires further analysis of `ProjectProcess.tsx`

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

### 3.2 Indexes

| Index | Columns | Purpose |
|-------|---------|---------|
| `projects_pkey` | `id` | Primary key |
| `projects_slug_key` | `slug` | Unique constraint |
| `projects_category_idx` | `category` | Filter by category |
| `projects_status_idx` | `status` | Filter by status |
| `projects_featured_idx` | `is_featured, display_order` | Homepage featured query |

### 3.3 RLS Considerations (High-Level)

**Public Access (SELECT)**:
- Only projects with `status = 'published'`

**Admin Access (ALL)**:
- Authenticated users can CRUD all projects

| Policy | Rule |
|--------|------|
| public_read | `status = 'published'` |
| admin_all | `auth.role() = 'authenticated'` |

### 3.4 Seed Data

**Required**: No

**Recommended**: Sample projects for testing filter functionality

---

## 4. Admin UI Requirements

### 4.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List | `/content/projects` | Table of all projects |
| Create | `/content/projects/new` or modal | New project form |
| Edit | `/content/projects/:id` or modal | Edit existing project |

### 4.2 List View Features

| Feature | MVP | Later |
|---------|-----|-------|
| Table with columns | ✅ | — |
| Status filter | ✅ | — |
| Category filter | ✅ | — |
| Search by title | ✅ | — |
| Sort by date | ✅ | — |
| Pagination | ✅ | — |
| Featured toggle | ✅ | — |
| Drag reorder for featured | — | ✅ |

### 4.3 List View Columns

| Column | Sortable | Filterable |
|--------|----------|------------|
| Thumbnail | No | No |
| Title | Yes | Yes (search) |
| Category | No | Yes |
| Status | No | Yes |
| Featured | No | Yes |
| Actions | N/A | N/A |

### 4.4 Create/Edit Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Title | Text input | Yes | Max 100 chars |
| Heading | Text input | Yes | Max 200 chars |
| Slug | Text input | Auto-generated | Unique, URL-safe |
| Category | Select/dropdown | Yes | From predefined list |
| Thumbnail | Media picker | No | Must be image |
| Featured Image | Media picker | No | Must be image |
| Description | Rich text / Textarea | No | — |
| Status | Radio/select | Yes | draft, published |
| Featured | Toggle | No | Boolean |
| Display Order | Number | If featured | Integer |

### 4.5 Empty State

**Current (Phase 3)**: Empty table with columns

**Phase 4 MVP**: Same table with "Add Project" button

### 4.6 Validation Rules

| Rule | Constraint |
|------|------------|
| Title | Required, max 100 characters |
| Heading | Required, max 200 characters |
| Slug | Required, unique, alphanumeric + hyphens |
| Category | Required, from predefined list |
| Display Order | Required if `is_featured = true` |

---

## 5. Phase Gate

### 5.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create `projects` table, indexes, RLS | Separate authorization required |
| Step 2 | Admin CRUD: list, create, edit, delete | Separate authorization required |
| Step 3 | Public rendering: portfolio grid, detail page | Separate authorization required |

### 5.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| Media Library (Step 3) | Image picker |

### 5.3 Stop Condition

Before proceeding to Step 2:
- [ ] `projects` table created with schema
- [ ] Indexes created
- [ ] RLS policies active
- [ ] Media Library available
- [ ] Explicit authorization received

### 5.4 Verification Checklist (Per Step)

**Step 1 (DB Foundation)**:
- [ ] Table exists with correct schema
- [ ] Slug uniqueness constraint works
- [ ] RLS restricts public to published only
- [ ] Category index enables fast filtering

**Step 2 (Admin CRUD)**:
- [ ] List view shows all projects
- [ ] Filters work (status, category, featured)
- [ ] Search works
- [ ] Create form saves correctly
- [ ] Edit form loads and saves
- [ ] Delete removes project
- [ ] Featured toggle works

**Step 3 (Public Rendering)**:
- [ ] `/project` lists published projects only
- [ ] Category filter tabs work
- [ ] `/project-details/:slug` shows full project
- [ ] Homepage PortfolioArea shows featured projects
- [ ] Related projects section works

---

## 6. MVP vs Later Summary

### 6.1 MVP Scope

- Single `projects` table
- Text-based categories (hardcoded list)
- Single thumbnail + featured image
- Basic CRUD with status
- Featured flag for homepage
- Slug-based URLs

### 6.2 Later Phase Scope

- Categories as separate table
- Gallery images (many-to-many with media)
- Client/company reference
- Technologies/tags
- Case study sections (structured content)
- Related projects (manual or auto)
- Project timeline/process steps

---

## 7. TBD Items

| Item | Decision Required |
|------|-------------------|
| Project detail structure | Hardcoded sections or dynamic? |
| Gallery support | Single image or multiple? |
| Client reference | Include in MVP or defer? |
| Technologies list | Include in MVP or defer? |
| Process steps | Include in MVP or defer? |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |

**Next Review:** After Blog module implementation
