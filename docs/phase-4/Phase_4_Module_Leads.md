# Phase 4 — Module: Leads

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
| Module Name | Leads |
| Admin Route | `/crm/leads` |
| Public Routes | `/contact` (form submission source) |
| Current State | Empty table placeholder |
| Priority | 6 (after Pages) |

---

## 2. Frontend Reference

### 2.1 Mapping Index Reference

See: `Phase_4_Frontend_Mapping_Index.md` Section 8

### 2.2 Lead Capture Sources

| Source | Location | Fields Captured |
|--------|----------|-----------------|
| Contact Form | `/contact` page | Name, Email, Subject, Message |
| Newsletter | Homepage (NewsLatterArea) | TBD |
| CTA Forms | Various pages | TBD |

### 2.3 Contact Form Fields (CONFIRMED from ContactForm.tsx)

| Field | Input Type | Required | Maps To |
|-------|------------|----------|---------|
| Name | text | Yes | `name` |
| Email | email | Yes | `email` |
| Subject | text | No | `subject` |
| Message | textarea | No | `message` |

### 2.4 Current Form Behavior

```tsx
// From ContactForm.tsx
<form onSubmit={(e) => e.preventDefault()} action="#" method="post">
```

**Note**: Form currently prevents submission (demo only). Phase 4 planning will define the submission flow.

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

### 3.2 Source Values

| Source | Description |
|--------|-------------|
| `contact_form` | Main contact page form |
| `newsletter` | Newsletter signup |
| `cta_homepage` | Homepage CTA |
| `cta_service` | Service page CTA |
| `other` | Unspecified source |

### 3.3 Status Values

| Status | Description | Color (UI) |
|--------|-------------|------------|
| `new` | Unread lead | Blue |
| `contacted` | Initial contact made | Yellow |
| `qualified` | Qualified prospect | Green |
| `closed` | Closed/archived | Gray |

### 3.4 Indexes

| Index | Columns | Purpose |
|-------|---------|---------|
| `leads_pkey` | `id` | Primary key |
| `leads_status_idx` | `status` | Filter by status |
| `leads_source_idx` | `source` | Filter by source |
| `leads_created_at_idx` | `created_at` | Sort by date |
| `leads_email_idx` | `email` | Search by email |

### 3.5 RLS Considerations (High-Level)

**Public Access (INSERT)**:
- Anonymous users can submit leads (contact form)

**Public Access (SELECT/UPDATE/DELETE)**:
- No public read/update/delete

**Admin Access (ALL)**:
- Authenticated users can read, update notes/status

| Policy | Rule |
|--------|------|
| public_insert | `true` (with rate limiting) |
| admin_select | `auth.role() = 'authenticated'` |
| admin_update | `auth.role() = 'authenticated'` |

### 3.6 Seed Data

**Required**: No (leads come from form submissions)

---

## 4. Admin UI Requirements

### 4.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List | `/crm/leads` | Table of all leads |
| Detail | `/crm/leads/:id` or modal | View lead details |

**Note**: No Create screen — leads come from public forms

### 4.2 List View Features

| Feature | MVP | Later |
|---------|-----|-------|
| Table with columns | ✅ | — |
| Status filter | ✅ | — |
| Source filter | ✅ | — |
| Search by name/email | ✅ | — |
| Sort by date | ✅ | — |
| Pagination | ✅ | — |
| Status quick-update | ✅ | — |
| Bulk status change | — | ✅ |
| Export to CSV | — | ✅ |

### 4.3 List View Columns (from Phase 3 Placeholder)

| Column | Sortable | Filterable |
|--------|----------|------------|
| Name | No | Yes (search) |
| Email | No | Yes (search) |
| Source | No | Yes |
| Date | Yes | No |
| Status | No | Yes |
| Actions | N/A | N/A |

### 4.4 Detail View Features

| Feature | MVP | Later |
|---------|-----|-------|
| View all fields | ✅ | — |
| Update status | ✅ | — |
| Add notes | ✅ | — |
| Delete lead | ✅ | — |
| Email link | ✅ | — |
| Activity log | — | ✅ |
| Assign to team member | — | ✅ |

### 4.5 Empty State

**Current (Phase 3)**: Empty table with "No leads captured yet"

**Phase 4 MVP**: Same message (leads come from public forms)

### 4.6 Validation Rules (Form Submission)

| Rule | Constraint |
|------|------------|
| Name | Required, max 100 characters |
| Email | Required, valid email format |
| Subject | Max 200 characters |
| Message | Max 2000 characters |
| Rate Limit | TBD (spam prevention) |

---

## 5. Phase Gate

### 5.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create `leads` table, indexes, RLS | Separate authorization required |
| Step 2 | Public form integration: submission handler | Separate authorization required |
| Step 3 | Admin UI: list, detail, status update | Separate authorization required |

### 5.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| None | — |

### 5.3 Stop Condition

Before proceeding to Step 2:
- [ ] `leads` table created with schema
- [ ] Indexes created
- [ ] RLS policies active (including public insert)
- [ ] Explicit authorization received

### 5.4 Verification Checklist (Per Step)

**Step 1 (DB Foundation)**:
- [ ] Table exists with correct schema
- [ ] Public insert policy works
- [ ] Admin select/update works
- [ ] Indexes enable fast queries

**Step 2 (Form Integration)**:
- [ ] Contact form submits to database
- [ ] Success feedback displays
- [ ] Error handling works
- [ ] Rate limiting prevents spam

**Step 3 (Admin UI)**:
- [ ] List view shows all leads
- [ ] Filters work (status, source)
- [ ] Search works (name, email)
- [ ] Sort by date works
- [ ] Detail view loads correctly
- [ ] Status update saves
- [ ] Notes update saves
- [ ] Delete removes lead

---

## 6. MVP vs Later Summary

### 6.1 MVP Scope

- Single `leads` table
- Contact form integration
- Basic status management (new, contacted, qualified, closed)
- Source tracking
- Admin notes field
- Read-only view with status update

### 6.2 Later Phase Scope

- Multiple form sources
- Email notifications on new lead
- Lead assignment to team members
- Activity log / timeline
- Export to CSV
- Integration with CRM tools
- Lead scoring
- Automated follow-up

---

## 7. Form Submission Flow (Conceptual)

```
┌─────────────────────────────────────────────────────────────┐
│                    PUBLIC WEBSITE                            │
│                                                              │
│   /contact page                                              │
│   ┌──────────────────────────────────────────────────────┐  │
│   │  Contact Form                                         │  │
│   │  - Name (required)                                    │  │
│   │  - Email (required)                                   │  │
│   │  - Subject                                            │  │
│   │  - Message                                            │  │
│   │  [Submit]                                             │  │
│   └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│              Form Validation (client-side)                   │
│                          │                                   │
│                          ▼                                   │
│              API Call to Supabase                            │
│              INSERT INTO leads (...)                         │
│                          │                                   │
│                          ▼                                   │
│              Success Message                                 │
│              "Thank you for your message!"                   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN PORTAL                              │
│                                                              │
│   /crm/leads                                                 │
│   ┌──────────────────────────────────────────────────────┐  │
│   │  Lead appears in list                                 │  │
│   │  Status: NEW                                          │  │
│   │  Admin can view, update status, add notes             │  │
│   └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. TBD Items

| Item | Decision Required |
|------|-------------------|
| Rate limiting | How many submissions per IP? |
| Spam prevention | CAPTCHA, honeypot, or other? |
| Email notifications | Notify admin on new lead? |
| Newsletter integration | Separate table or same? |
| GDPR compliance | Consent checkbox needed? |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |

**Next Review:** After Pages module implementation
