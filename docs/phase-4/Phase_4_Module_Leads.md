# Phase 4 — Module: Leads

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
| Module Name | Leads |
| Admin Route | `/crm/leads` |
| Public Routes | `/contact` (form submission source) |
| Current State | Empty table placeholder |
| Priority | 7 (after Testimonials) |

---

## 2. Frontend Reference

### 2.1 Lead Capture Sources

| Source | Location | Fields Captured |
|--------|----------|-----------------|
| Contact Form | `/contact` page | Name, Email, Subject, Message |
| Newsletter | Homepage (NewsLatterArea) | TBD |
| CTA Forms | Various pages | TBD |

### 2.2 Contact Form Fields (CONFIRMED from ContactForm.tsx)

| Field | Input Type | Required | Maps To |
|-------|------------|----------|---------|
| Name | text | Yes | `name` |
| Email | email | Yes | `email` |
| Subject | text | No | `subject` |
| Message | textarea | No | `message` |

---

## 3. Data Model Proposal (MVP)

### 3.1 Table: `leads`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | No | gen_random_uuid() | Primary key |
| `name` | text | No | — | Contact name |
| `email` | text | No | — | Contact email |
| `subject` | text | Yes | NULL | Message subject |
| `message` | text | Yes | NULL | Full message |
| `source` | text | No | 'contact_form' | Lead source identifier |
| `status` | text | No | 'new' | new, contacted, qualified, closed |
| `notes` | text | Yes | NULL | Admin notes |
| `created_at` | timestamptz | No | now() | Submission timestamp |
| `updated_at` | timestamptz | No | now() | Last modified |

### 3.2 RLS Considerations (High-Level)

**Public Access (INSERT)**:
- Anonymous users can submit leads (contact form)

**Public Access (SELECT/UPDATE/DELETE)**:
- No public read/update/delete

**Admin Access (ALL)**:
- Authenticated users can read, update notes/status

---

## 4. Seeding Plan

### 4.1 Seed Data Requirement

| Attribute | Value |
|-----------|-------|
| **Required** | **NO** |
| **Reason** | Leads come from public form submissions. No seeding needed. |

### 4.2 Data Source

Leads are captured via:
- Contact form on `/contact` page
- Future: Newsletter signup, CTA forms

### 4.3 Acceptance Criteria (Post-Implementation)

- [ ] Contact form submits successfully to `leads` table
- [ ] New lead appears in admin `/crm/leads` list
- [ ] Lead status can be updated by admin
- [ ] Admin notes can be added
- [ ] Lead can be deleted by admin

---

## 5. Admin UI Requirements

### 5.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List | `/crm/leads` | Table of all leads |
| Detail | Modal | View lead details |

**Note**: No Create screen — leads come from public forms

### 5.2 List View Columns

| Column | Sortable | Filterable |
|--------|----------|------------|
| Name | No | Yes (search) |
| Email | No | Yes (search) |
| Source | No | Yes |
| Date | Yes | No |
| Status | No | Yes |
| Actions | N/A | N/A |

---

## 6. Admin UI Standard Reference

See: `Phase_4_Admin_UI_Standard.md`

This module MUST follow all patterns defined in the Admin UI Standard, with exceptions:
- No "Add" button (leads come from public forms)

---

## 7. Phase Gate

### 7.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create `leads` table, indexes, RLS | Separate authorization required |
| Step 2 | Public form integration: submission handler | Separate authorization required |
| Step 3 | Admin UI: list, detail, status update | Separate authorization required |

### 7.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| None | — |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |
| 1.0 | 2025-12-22 | Planning Agent | Added Seeding Plan (NO seeding required) |

**Next Review:** After Testimonials module implementation
