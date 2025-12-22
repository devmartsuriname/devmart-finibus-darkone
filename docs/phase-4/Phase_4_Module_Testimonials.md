# Phase 4 — Module: Testimonials

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
| Module Name | Testimonials |
| Admin Route | `/content/testimonials` |
| Public Routes | Homepage (carousel section) |
| Current State | Empty table placeholder |
| Priority | 6 (after Blog) |

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

### 3.2 RLS Considerations (High-Level)

**Public Access (SELECT)**:
- Only testimonials with `is_active = true`

**Admin Access (ALL)**:
- Authenticated users can CRUD all testimonials

---

## 4. Seeding Plan

### 4.1 Seed Data Requirement

| Attribute | Value |
|-----------|-------|
| **Required** | Recommended |
| **Reason** | Sample testimonials matching current static data for visual parity testing |

### 4.2 Seed Dataset

| Item | Count | Source |
|------|-------|--------|
| Testimonials | 3-5 | Match current Finibus static data |
| Client Photos | 3-5 | From Media Library (`finibus/clients/`) |

### 4.3 Sample Testimonial Structure

| Field | Sample Value |
|-------|--------------|
| client_name | "Savannah Nguyen" |
| client_title | "Executive CEO" |
| client_company | "TechCorp" |
| client_image | Reference to `finibus/clients/client-1.jpg` |
| quote_text | "Working with Devmart has been an incredible experience..." |
| rating | 5 |
| display_order | 1 |
| is_active | true |

### 4.4 Seeding Method

**Recommended:** Manual entry via Admin UI after Testimonials module is built

**Rationale:**
- Validates CRUD operations
- Tests Media Library integration for client photos
- Confirms carousel display on homepage

### 4.5 Acceptance Criteria

- [ ] At least 3 testimonials created matching current static data
- [ ] Each testimonial has a client photo from Media Library
- [ ] All testimonials have 5-star rating (matching Finibus)
- [ ] Active testimonials visible in homepage carousel
- [ ] Carousel navigation works correctly
- [ ] Display order controls carousel sequence

---

## 5. Admin UI Requirements

### 5.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List | `/content/testimonials` | Table of all testimonials |
| Create | Modal | New testimonial form |
| Edit | Modal | Edit existing testimonial |

### 5.2 List View Columns

| Column | Sortable | Filterable |
|--------|----------|------------|
| Photo (thumbnail) | No | No |
| Client Name | No | No |
| Client Title | No | No |
| Rating | No | No |
| Order | Yes | No |
| Active | No | Yes |
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
| Step 1 | Create `testimonials` table, indexes, RLS | Separate authorization required |
| Step 2 | Admin CRUD: list, create, edit, delete | Separate authorization required |
| Step 3 | Public rendering: carousel integration | Separate authorization required |
| Step 4 | Seeding: Create sample testimonials | After Step 2 |

### 7.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| Media Library (Complete) | Client photo picker |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |
| 1.0 | 2025-12-22 | Planning Agent | Added Seeding Plan |

**Next Review:** After Blog module implementation
