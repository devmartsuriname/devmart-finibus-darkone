# Phase 4 — Module: Blog

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
| Module Name | Blog / News |
| Admin Route | `/content/blog` |
| Public Routes | `/blog`, `/blog-standard`, `/blog-details` |
| Current State | Empty table placeholder |
| Priority | 2 (after Media Library) |

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

### 2.5 Sidebar Components

| Component | CMS Required | Notes |
|-----------|--------------|-------|
| SidebarSearch | No | Static form |
| ServiceList | TBD | May be static links |
| NewsPost | Yes | Recent posts query |
| PopularTag | Yes | Tags aggregation |
| BannerWiget | No | Static promo |

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

### 3.2 Indexes

| Index | Columns | Purpose |
|-------|---------|---------|
| `blog_posts_pkey` | `id` | Primary key |
| `blog_posts_slug_key` | `slug` | Unique constraint |
| `blog_posts_status_idx` | `status` | Filter by status |
| `blog_posts_published_at_idx` | `published_at` | Sort by date |
| `blog_posts_category_idx` | `category` | Filter by category |

### 3.3 Slug Generation Rules

| Rule | Description |
|------|-------------|
| Source | Generated from `title` |
| Format | Lowercase, hyphens for spaces |
| Characters | Alphanumeric and hyphens only |
| Uniqueness | Must be unique; append number if collision |
| Example | "My First Post" → "my-first-post" |

### 3.4 RLS Considerations (High-Level)

**Public Access (SELECT)**:
- Only posts with `status = 'published'` AND `published_at <= now()`

**Admin Access (ALL)**:
- Authenticated users can CRUD all posts

| Policy | Rule |
|--------|------|
| public_read | `status = 'published' AND published_at <= now()` |
| admin_all | `auth.role() = 'authenticated'` |

### 3.5 Seed Data

**Required**: No (empty state is acceptable for MVP)

**Optional**: Sample posts for testing public display

---

## 4. Admin UI Requirements

### 4.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List | `/content/blog` | Table of all posts |
| Create | `/content/blog/new` or modal | New post form |
| Edit | `/content/blog/:id` or modal | Edit existing post |
| Detail | (optional) | Preview post |

### 4.2 List View Features

| Feature | MVP | Later |
|---------|-----|-------|
| Table with columns | ✅ | — |
| Status filter (all/draft/published) | ✅ | — |
| Category filter | ✅ | — |
| Search by title | ✅ | — |
| Sort by date | ✅ | — |
| Pagination | ✅ | — |
| Bulk status change | — | ✅ |
| Bulk delete | — | ✅ |

### 4.3 List View Columns

| Column | Sortable | Filterable |
|--------|----------|------------|
| Title | Yes | Yes (search) |
| Category | No | Yes |
| Status | No | Yes |
| Published Date | Yes | No |
| Author | No | No |
| Actions | N/A | N/A |

### 4.4 Create/Edit Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Title | Text input | Yes | Max 200 chars |
| Slug | Text input | Auto-generated | Unique, URL-safe |
| Category | Select/dropdown | No | From predefined list |
| Featured Image | Media picker | No | Must be image type |
| Excerpt | Textarea | No | Max 200 chars |
| Content | Rich text editor | Yes | — |
| Tags | Multi-select/chips | No | — |
| Status | Radio/select | Yes | draft, published |
| Published Date | Date picker | If published | — |

### 4.5 Empty State

**Current (Phase 3)**: Empty table with columns

**Phase 4 MVP**: Same table with "Create Post" button

### 4.6 Validation Rules

| Rule | Constraint |
|------|------------|
| Title | Required, max 200 characters |
| Slug | Required, unique, alphanumeric + hyphens |
| Content | Required |
| Published Date | Required if status = published |
| Featured Image | Must reference valid media.id |

---

## 5. Phase Gate

### 5.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create `blog_posts` table, indexes, RLS | Separate authorization required |
| Step 2 | Admin CRUD: list, create, edit, delete | Separate authorization required |
| Step 3 | Public rendering: blog listing, post detail | Separate authorization required |

### 5.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| Media Library (Step 3) | Featured image picker |
| Profiles table | Author reference |

### 5.3 Stop Condition

Before proceeding to Step 2:
- [ ] `blog_posts` table created with schema
- [ ] Indexes created
- [ ] RLS policies active
- [ ] Media Library available (for image picker)
- [ ] Explicit authorization received

### 5.4 Verification Checklist (Per Step)

**Step 1 (DB Foundation)**:
- [ ] Table exists with correct schema
- [ ] Slug uniqueness constraint works
- [ ] RLS restricts public to published only
- [ ] Admin can access all posts

**Step 2 (Admin CRUD)**:
- [ ] List view shows all posts
- [ ] Filters work (status, category)
- [ ] Search works
- [ ] Create form saves correctly
- [ ] Edit form loads and saves
- [ ] Delete removes post
- [ ] Slug auto-generates from title

**Step 3 (Public Rendering)**:
- [ ] `/blog` lists published posts only
- [ ] BlogCart renders with correct fields
- [ ] `/blog-details/:slug` shows full post
- [ ] Author info displays correctly
- [ ] Sidebar NewsPost shows recent posts

---

## 6. MVP vs Later Summary

### 6.1 MVP Scope

- Single `blog_posts` table
- Basic CRUD with text-based categories
- Rich text content (react-quill)
- Featured image via Media Library
- Status management (draft/published)
- Slug-based URLs

### 6.2 Later Phase Scope

- Categories as separate table
- Tags as separate table with many-to-many
- Comments system
- SEO meta fields (title, description)
- Social sharing preview
- Scheduled publishing
- Revision history

---

## 7. TBD Items

| Item | Decision Required |
|------|-------------------|
| Comments system | Include in MVP or defer? |
| Categories table | Hardcoded list or dynamic? |
| Rich text editor | react-quill or alternative? |
| Author profiles | Use existing profiles or author-specific table? |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |

**Next Review:** After Media Library implementation
