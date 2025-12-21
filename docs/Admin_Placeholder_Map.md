# Admin Placeholder Map — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 3 Alignment Complete
Execution: Documentation Only — Build Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Purpose

This document defines the placeholder strategy for **Devmart business modules only**. 

**Key Change:** This document has been rewritten to focus on Devmart business modules, not Darkone demo modules.

**Governance:**
- All placeholders described herein are conceptual
- Implementation requires explicit authorization
- Aligned with `Admin_Module_Map.md`

---

## 2. Placeholder Types

| Type | Visual Intent | Use Case |
|------|---------------|----------|
| `Coming Soon` | Informative placeholder | Dashboard, Analytics, Settings |
| `Empty Table` | Table structure with no data | Content modules, Leads |
| `Empty Grid` | Grid structure with no items | Media Library |

---

## 3. Dashboard Placeholder

| Component | Phase 3 State | Placeholder Content |
|-----------|---------------|---------------------|
| Main Dashboard | Coming Soon | "Admin Dashboard – Coming Soon" |

**Placeholder Specification:**
```
Route: /admin/dashboard
Title: Admin Dashboard
Content: 
  - Centered "Coming Soon" message
  - Optional: Card container for visual structure
  - No demo data, no mock metrics
  - No charts, no user widgets
Visual: Clean, intentional empty state
```

**Later Phase Intent:** Operational + Management dashboard with real metrics.

---

## 4. Content Module Placeholders

### 4.1 Blog / News

| Component | Phase 3 State | Placeholder Content |
|-----------|---------------|---------------------|
| Blog List | Empty Table | "No blog posts yet" |

**Placeholder Specification:**
```
Route: /admin/content/blog
Title: Blog Posts
Table Headers: Title, Author, Date, Status, Actions
Table Body: Empty with "No blog posts yet" message
Actions: Add New button (visible, inactive)
```

---

### 4.2 Projects / Portfolio

| Component | Phase 3 State | Placeholder Content |
|-----------|---------------|---------------------|
| Projects List | Empty Table | "No projects yet" |

**Placeholder Specification:**
```
Route: /admin/content/projects
Title: Projects
Table Headers: Title, Category, Date, Status, Actions
Table Body: Empty with "No projects yet" message
Actions: Add New button (visible, inactive)
```

---

### 4.3 Pages (Static)

| Component | Phase 3 State | Placeholder Content |
|-----------|---------------|---------------------|
| Pages List | Empty Table | "No pages yet" |

**Placeholder Specification:**
```
Route: /admin/content/pages
Title: Pages
Table Headers: Title, Slug, Last Updated, Status, Actions
Table Body: Empty with "No pages yet" message
Actions: Add New button (visible, inactive)
```

**Note:** Pages + Sections expansion is NOT Phase 3.

---

### 4.4 Media Library

| Component | Phase 3 State | Placeholder Content |
|-----------|---------------|---------------------|
| Media Grid | Empty Grid | "No media uploaded yet" |

**Placeholder Specification:**
```
Route: /admin/content/media
Title: Media Library
Content: Empty grid container
Message: "No media uploaded yet"
Actions: Upload button (visible, inactive)
```

---

### 4.5 Testimonials

| Component | Phase 3 State | Placeholder Content |
|-----------|---------------|---------------------|
| Testimonials List | Empty Table | "No testimonials yet" |

**Placeholder Specification:**
```
Route: /admin/content/testimonials
Title: Testimonials
Table Headers: Name, Company, Date, Status, Actions
Table Body: Empty with "No testimonials yet" message
Actions: Add New button (visible, inactive)
```

---

## 5. CRM / Leads Placeholder

| Component | Phase 3 State | Placeholder Content |
|-----------|---------------|---------------------|
| Leads List | Empty Table | "No leads captured yet" |

**Placeholder Specification:**
```
Route: /admin/crm/leads
Title: Leads
Table Headers: Name, Email, Source, Date, Status, Actions
Table Body: Empty with "No leads captured yet" message
Actions: View/Export buttons (visible, inactive)
```

**Source Column Values (Later Phase):**
- Contact Form
- Quote Request
- Newsletter

---

## 6. Analytics Placeholder

| Component | Phase 3 State | Placeholder Content |
|-----------|---------------|---------------------|
| Analytics Dashboard | Coming Soon | "Analytics – Coming Soon" |

**Placeholder Specification:**
```
Route: /admin/analytics
Title: Analytics
Content: 
  - Centered "Coming Soon" message
  - Empty chart container outlines (optional)
  - No demo data, no mock charts
Visual: Clean, intentional empty state
```

---

## 7. Settings Placeholder

| Component | Phase 3 State | Placeholder Content |
|-----------|---------------|---------------------|
| Settings Page | Coming Soon | "Settings – Coming Soon" |

**Placeholder Specification:**
```
Route: /admin/settings
Title: Settings
Content:
  - Centered "Coming Soon" message
  - Empty form container (optional)
  - No demo data, no mock settings
Visual: Clean, intentional empty state
```

**Later Phase Sections (Documented Only):**
- Branding (Primary/Secondary colors)
- SEO Foundations
- Integrations (Analytics, Ads, Social, Sitemap)

---

## 8. Auth Pages (Preserved — No Placeholder)

| Page | Route | Status |
|------|-------|--------|
| Sign In | `/admin/auth/sign-in` | Demo preserved |
| Sign Up | `/admin/auth/sign-up` | Demo preserved |
| Reset Password | `/admin/auth/reset-password` | Demo preserved |
| Lock Screen | `/admin/auth/lock-screen` | Demo preserved |

**Note:** Auth pages remain functional with demo backend until Supabase migration.

---

## 9. Darkone Demo Modules (NOT in Scope)

The following Darkone demo modules are **NOT Devmart business modules**:

| Module | Status | Reason |
|--------|--------|--------|
| Base UI | Hidden | Template reference only |
| Forms | Hidden | Template reference only |
| Tables | Hidden | Template reference only |
| Charts | Hidden | Template reference only |
| Maps | Hidden | Template reference only |
| Icons | Hidden | Template reference only |
| Layouts | Hidden | Template reference only |

**Treatment:**
- Hidden from Devmart Admin navigation
- Files remain read-only in template
- Components may be reused in Devmart modules
- No placeholders needed (not visible)

---

## 10. Visual Consistency Requirements

All Devmart placeholders must maintain:

| Requirement | Specification |
|-------------|---------------|
| Darkone Styling | Colors, typography, spacing from template |
| Bootstrap Grid | Standard Bootstrap layout structure |
| Card Containers | Consistent card/panel wrapping |
| Placeholder Messaging | Consistent "Coming Soon" / "No items yet" patterns |
| No Demo Data | Zero mock metrics, fake users, sample content |

---

## 11. Data State Requirements

| Requirement | Enforcement |
|-------------|-------------|
| No mock data | Demo arrays must not be used |
| No fake metrics | Numbers show "—" or empty |
| No demo users | User lists show empty state |
| No sample content | Text is placeholder only |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-21 | Planning Agent | Rewritten for Devmart business modules |

**Supersedes:** Previous version focused on Darkone demo modules.

**Alignment:** Must align with `Admin_Module_Map.md` (authoritative).
