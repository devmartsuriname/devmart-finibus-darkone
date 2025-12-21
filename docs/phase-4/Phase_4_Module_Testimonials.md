# Phase 4 — Module: Testimonials

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
| Module Name | Testimonials |
| Admin Route | `/content/testimonials` |
| Public Routes | Homepage (carousel section) |
| Current State | Empty table placeholder |
| Priority | 4 (after Projects) |

---

## 2. Frontend Reference

### 2.1 Mapping Index Reference

See: `Phase_4_Frontend_Mapping_Index.md` Section 3.7

### 2.2 Public Display Components

| Location | Component | Display Type |
|----------|-----------|--------------|
| Homepage | TestimonialArea | Swiper carousel |

**Source File**: `apps/public/src/components/common/TestimonialArea.tsx`

### 2.3 Testimonial Card (CONFIRMED from TestimonialArea.tsx)

| Element | Type | Required | Field Name |
|---------|------|----------|------------|
| Client photo | Image | Yes | `client_image` |
| Client name | Text | Yes | `client_name` |
| Client title | Text | Yes | `client_title` |
| Quote text | Rich Text | Yes | `quote_text` |
| Rating | Number (1-5) | Yes | `rating` |

### 2.4 Current Static Data (from component)

| Client | Title | Rating |
|--------|-------|--------|
| Savannah Nguyen | Executive CEO | 5 stars |
| Nailong Jeso | CTO Founder | 5 stars |
| Gautam Yamni | Designer Head | 5 stars |

### 2.5 Display Configuration

| Setting | Value |
|---------|-------|
| Carousel type | Swiper |
| Slides per view | 1 |
| Loop | Yes |
| Autoplay | 5000ms delay |
| Navigation | Prev/Next arrows |
| Pagination | Fraction type |

---

## 3. Data Model Proposal (MVP)

### 3.1 Table: `testimonials`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | No | gen_random_uuid() | Primary key |
| `client_name` | text | No | — | Client full name |
| `client_title` | text | No | — | Job title/role |
| `client_company` | text | Yes | NULL | Company name |
| `client_image` | uuid | Yes | NULL | FK to media.id |
| `quote_text` | text | No | — | Testimonial quote |
| `rating` | integer | No | 5 | 1-5 star rating |
| `display_order` | integer | No | 0 | Sort order in carousel |
| `is_active` | boolean | No | true | Show on frontend |
| `created_at` | timestamptz | No | now() | Creation timestamp |
| `updated_at` | timestamptz | No | now() | Last modified |

### 3.2 Indexes

| Index | Columns | Purpose |
|-------|---------|---------|
| `testimonials_pkey` | `id` | Primary key |
| `testimonials_active_order_idx` | `is_active, display_order` | Carousel query |

### 3.3 RLS Considerations (High-Level)

**Public Access (SELECT)**:
- Only testimonials with `is_active = true`

**Admin Access (ALL)**:
- Authenticated users can CRUD all testimonials

| Policy | Rule |
|--------|------|
| public_read | `is_active = true` |
| admin_all | `auth.role() = 'authenticated'` |

### 3.4 Seed Data

**Required**: No

**Recommended**: 3 sample testimonials matching current static data for visual parity testing

---

## 4. Admin UI Requirements

### 4.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List | `/content/testimonials` | Table of all testimonials |
| Create | `/content/testimonials/new` or modal | New testimonial form |
| Edit | `/content/testimonials/:id` or modal | Edit existing testimonial |

### 4.2 List View Features

| Feature | MVP | Later |
|---------|-----|-------|
| Table with columns | ✅ | — |
| Active filter | ✅ | — |
| Sort by order | ✅ | — |
| Drag reorder | — | ✅ |
| Bulk activate/deactivate | — | ✅ |

### 4.3 List View Columns

| Column | Sortable | Filterable |
|--------|----------|------------|
| Photo (thumbnail) | No | No |
| Client Name | No | No |
| Client Title | No | No |
| Rating | No | No |
| Order | Yes | No |
| Active | No | Yes |
| Actions | N/A | N/A |

### 4.4 Create/Edit Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Client Name | Text input | Yes | Max 100 chars |
| Client Title | Text input | Yes | Max 100 chars |
| Client Company | Text input | No | Max 100 chars |
| Client Photo | Media picker | No | Must be image |
| Quote Text | Textarea | Yes | Max 500 chars |
| Rating | Star selector / Number | Yes | 1-5 |
| Display Order | Number input | Yes | Integer |
| Active | Toggle | Yes | Boolean |

### 4.5 Empty State

**Current (Phase 3)**: Empty table with columns

**Phase 4 MVP**: Same table with "Add Testimonial" button

### 4.6 Validation Rules

| Rule | Constraint |
|------|------------|
| Client Name | Required, max 100 characters |
| Client Title | Required, max 100 characters |
| Quote Text | Required, max 500 characters |
| Rating | Required, integer 1-5 |
| Display Order | Required, integer |

---

## 5. Phase Gate

### 5.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create `testimonials` table, indexes, RLS | Separate authorization required |
| Step 2 | Admin CRUD: list, create, edit, delete | Separate authorization required |
| Step 3 | Public rendering: carousel integration | Separate authorization required |

### 5.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| Media Library (Step 3) | Client photo picker |

### 5.3 Stop Condition

Before proceeding to Step 2:
- [ ] `testimonials` table created with schema
- [ ] Indexes created
- [ ] RLS policies active
- [ ] Media Library available
- [ ] Explicit authorization received

### 5.4 Verification Checklist (Per Step)

**Step 1 (DB Foundation)**:
- [ ] Table exists with correct schema
- [ ] Rating constraint enforces 1-5 range
- [ ] RLS restricts public to active only
- [ ] Order index enables sorted queries

**Step 2 (Admin CRUD)**:
- [ ] List view shows all testimonials
- [ ] Active filter works
- [ ] Order column sorts correctly
- [ ] Create form saves correctly
- [ ] Edit form loads and saves
- [ ] Delete removes testimonial
- [ ] Rating input validates range

**Step 3 (Public Rendering)**:
- [ ] Homepage carousel shows active testimonials only
- [ ] Testimonials ordered by display_order
- [ ] Client photo displays (or placeholder)
- [ ] Rating stars render correctly
- [ ] Swiper navigation works

---

## 6. MVP vs Later Summary

### 6.1 MVP Scope

- Single `testimonials` table
- Basic CRUD with text fields
- Star rating (1-5)
- Client photo via Media Library
- Active/inactive toggle
- Display order for carousel

### 6.2 Later Phase Scope

- Video testimonials
- Logo/company image
- Link to case study/project
- Date of testimonial
- Verification badge
- Multiple carousel locations
- Testimonial categories/tags

---

## 7. TBD Items

| Item | Decision Required |
|------|-------------------|
| Company logo | Include company logo separate from photo? |
| Project link | Link testimonial to specific project? |
| Video support | Include video testimonials in MVP? |
| Multiple locations | Same carousel on other pages? |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |

**Next Review:** After Projects module implementation
