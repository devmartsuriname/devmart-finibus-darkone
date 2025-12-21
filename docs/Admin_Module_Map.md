# Admin Module Map — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 3 Alignment Complete
Execution: Documentation Only — Build Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Purpose

This document is the **authoritative source** for Admin module definitions. All Phase 3 and later phase work must align with this document.

**Governance:**
- No modules may be added without explicit approval
- No assumptions or inferences from Darkone demo
- Documentation first, build later

---

## 2. Navigation Philosophy

| Principle | Description |
|-----------|-------------|
| Minimalistic Admin | Only business-required modules appear in navigation |
| Route-on-Demand | Modules get routes only if functionally required |
| Label/Placeholder Otherwise | Non-functional modules show placeholder labels |
| No Demo Clutter | Darkone demo modules hidden from navigation |

---

## 3. Devmart Admin — Approved Module Structure

### 3.1 MAIN

| Module | Route | Phase 3 State | Later Phase State |
|--------|-------|---------------|-------------------|
| Dashboard | `/admin/dashboard` | "Admin Dashboard – Coming Soon" | Operational + Management Dashboard |

**Phase 3 Placeholder:**
```
Title: Admin Dashboard
Content: "Coming Soon"
Visual: Empty card layout, no demo data
```

---

### 3.2 CONTENT

| Module | Route | Phase 3 State | Later Phase State |
|--------|-------|---------------|-------------------|
| Blog / News | `/admin/content/blog` | Empty table placeholder | CRUD for blog posts |
| Projects / Portfolio | `/admin/content/projects` | Empty table placeholder | CRUD for portfolio items |
| Pages (Static) | `/admin/content/pages` | Empty table placeholder | CRUD for static pages |
| Media Library | `/admin/content/media` | Empty grid placeholder | File upload/management |
| Testimonials | `/admin/content/testimonials` | Empty table placeholder | CRUD for testimonials |

**Phase 3 Placeholder Pattern (All Content Modules):**
```
Title: [Module Name]
Content: Empty table with headers, "No items yet" message
Visual: Consistent card layout, no demo data
Actions: Add/Edit/Delete buttons visible but inactive
```

**Important Note — Pages Module:**
- Later phases will expand Pages into Pages + Sections based on Finibus frontend structure
- This expansion is **EXPLICITLY NOT Phase 3**
- Phase 3: Simple placeholder only

---

### 3.3 CRM / LEADS

| Module | Route | Phase 3 State | Later Phase State |
|--------|-------|---------------|-------------------|
| Leads | `/admin/crm/leads` | Empty table structure | Lead management with sources |

**Phase 3 Placeholder:**
```
Title: Leads
Content: Empty table with columns: Name, Email, Source, Date, Status
Message: "No leads captured yet"
Visual: Table structure visible, no demo data
```

**Later Phase — Lead Sources (Documented Only):**
- Contact Form submissions
- Quote Requests (wizard implementation later)
- Newsletter signups

---

### 3.4 ANALYTICS

| Module | Route | Phase 3 State | Later Phase State |
|--------|-------|---------------|-------------------|
| Analytics Dashboard | `/admin/analytics` | "Coming Soon" placeholder | Per-module analytics |

**Phase 3 Placeholder:**
```
Title: Analytics
Content: "Analytics – Coming Soon"
Visual: Empty chart containers, no demo data
```

---

### 3.5 SYSTEM

| Module | Route | Phase 3 State | Later Phase State |
|--------|-------|---------------|-------------------|
| Settings | `/admin/settings` | Placeholder only | Branding, SEO, Integrations |

**Phase 3 Placeholder:**
```
Title: Settings
Content: "Settings – Coming Soon"
Visual: Empty form structure
```

**Later Phase — Settings Scope (Documented Only):**
- Branding: Primary/Secondary colors
- SEO: Foundations and meta configuration
- Integrations: Analytics, Ads, Social, Sitemap

---

## 4. Explicit Exclusions

The following are **EXPLICITLY EXCLUDED** from Devmart Admin:

| Excluded Item | Reason | Status |
|---------------|--------|--------|
| Team Management | Not in project scope | ❌ Excluded |
| Client Portal | Not in project scope | ❌ Excluded |
| Frontend Login/Register | Public site has no auth | ❌ Excluded |
| User/Profile Management | Not visible in Phase 3 | ❌ Phase 3 Excluded |

**Client Portal Clarification:**
- No frontend login/register pages
- No admin client account management
- No client-facing dashboard
- This is a permanent exclusion for this project

---

## 5. Darkone Template Modules

### 5.1 Status

| Status | Description |
|--------|-------------|
| **HIDDEN** | Not visible in Devmart Admin navigation |
| **READ-ONLY** | Template files remain unmodified |
| **REFERENCE** | Available for component reuse |

### 5.2 Darkone Demo Modules (Hidden)

| Module | Original Route | Devmart Status |
|--------|----------------|----------------|
| Base UI | `/admin/base-ui/*` | Hidden |
| Forms | `/admin/forms/*` | Hidden |
| Tables | `/admin/tables/*` | Hidden |
| Charts | `/admin/charts/*` | Hidden |
| Maps | `/admin/maps/*` | Hidden |
| Icons | `/admin/icons/*` | Hidden |
| Layouts | `/admin/layouts/*` | Hidden |

### 5.3 Reuse Policy

- ✅ Components may be imported and reused in Devmart modules
- ❌ Original template files must NOT be modified
- ❌ Demo routes must NOT appear in Devmart navigation
- ❌ No SCSS modifications

---

## 6. Phase Separation

### 6.1 Phase 3 — Placeholder Cleanup (Current)

**Authorized Work:**
- Placeholder pages with "Coming Soon" or empty states
- Empty table structures (headers, no data)
- Navigation items for approved modules only
- Routes without logic (display only)

**NOT Authorized:**
- CRUD operations
- Database connections
- Authentication changes
- API integrations
- Business logic

### 6.2 Later Phases — Feature Implementation

**Documented for Future (NOT Phase 3):**
- Dashboard: Operational metrics, management views
- Content: Full CRUD for all content modules
- Leads: Lead capture, source tracking, status management
- Analytics: Per-module analytics dashboards
- Settings: Branding, SEO, Integrations configuration
- User/Profile: User management (post-Phase 3)
- Authentication: Supabase migration

---

## 7. Frontend Style Guide Requirement

**Status:** Required in a later phase

**Phase 3 Action:** Document the requirement only

A Finibus-based Frontend Style Guide will be required to ensure:
- Consistent styling between public frontend and admin
- Reusable patterns for content creation
- Typography, spacing, and color standards

**This is NOT a Phase 3 deliverable.**

---

## 8. Route Summary

### 8.1 Devmart Admin Routes (Phase 3)

| Route | Module | Phase 3 State |
|-------|--------|---------------|
| `/admin/dashboard` | Dashboard | Coming Soon |
| `/admin/content/blog` | Blog | Empty table |
| `/admin/content/projects` | Projects | Empty table |
| `/admin/content/pages` | Pages | Empty table |
| `/admin/content/media` | Media Library | Empty grid |
| `/admin/content/testimonials` | Testimonials | Empty table |
| `/admin/crm/leads` | Leads | Empty table |
| `/admin/analytics` | Analytics | Coming Soon |
| `/admin/settings` | Settings | Coming Soon |

### 8.2 Auth Routes (Preserved)

| Route | Purpose | Status |
|-------|---------|--------|
| `/admin/auth/sign-in` | Login | Demo preserved |
| `/admin/auth/sign-up` | Registration | Demo preserved |
| `/admin/auth/reset-password` | Password reset | Demo preserved |
| `/admin/auth/lock-screen` | Lock screen | Demo preserved |

**Note:** Auth routes use demo backend until Phase 4 Supabase migration.

---

## 9. Verification Checklist

Before Phase 3 build authorization:

- [ ] All modules in this document are explicitly approved
- [ ] No additional modules have been assumed or added
- [ ] Exclusions are clearly documented
- [ ] Darkone demo modules are marked as hidden
- [ ] Route structure is defined
- [ ] Placeholder states are specified

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-21 | Planning Agent | Initial authoritative version |

**Authority:** This document supersedes any conflicting information in other planning documents.
