# Phase 3 — Admin Placeholder Cleanup (Devmart)

```
Status: AUTHORITATIVE
Phase: Phase 3 Alignment Complete
Execution: Documentation Only — Build Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Phase Objective

Phase 3 aims to deliver a clean, stable Admin foundation by:

- Creating placeholder pages for approved Devmart business modules
- Establishing navigation structure for approved modules only
- Defining empty states for content management modules
- Hiding Darkone demo modules from navigation
- Ensuring zero functional implementation (placeholders only)

**End-State (When Authorized):**

- Admin shows Devmart business modules (placeholders)
- No demo data visible
- No functional CRUD
- Structurally complete for future activation

---

## 2. Devmart Admin Modules (Explicit List)

### 2.1 Approved Modules for Phase 3

| Section | Module | Route | Placeholder Type |
|---------|--------|-------|------------------|
| MAIN | Dashboard | `/admin/dashboard` | Coming Soon |
| CONTENT | Blog / News | `/admin/content/blog` | Empty Table |
| CONTENT | Projects / Portfolio | `/admin/content/projects` | Empty Table |
| CONTENT | Pages (Static) | `/admin/content/pages` | Empty Table |
| CONTENT | Media Library | `/admin/content/media` | Empty Grid |
| CONTENT | Testimonials | `/admin/content/testimonials` | Empty Table |
| CRM | Leads | `/admin/crm/leads` | Empty Table |
| ANALYTICS | Analytics Dashboard | `/admin/analytics` | Coming Soon |
| SYSTEM | Settings | `/admin/settings` | Coming Soon |

**Total Modules:** 9

**Authority:** Module list derived from `Admin_Module_Map.md`

---

## 3. Explicit Exclusions

The following are **EXCLUDED** from Phase 3 and the Devmart project:

| Excluded Item | Type | Reason |
|---------------|------|--------|
| Team Management | Permanent | Not in project scope |
| Client Portal | Permanent | Not in project scope |
| Frontend Login/Register | Permanent | Public site has no auth |
| User/Profile Management | Phase 3 | Not visible until later phase |
| Darkone Demo Modules | Navigation | Hidden from sidebar |

### 3.1 Client Portal Clarification

**Explicitly NOT included:**
- No frontend login/register pages
- No admin client account management
- No client-facing dashboard
- This is a permanent exclusion

### 3.2 User/Profile Clarification

- User management is planned for later phases
- NOT visible in Phase 3 navigation
- Will be implemented with Supabase auth migration

---

## 4. Darkone Demo Modules Treatment

### 4.1 Status

| Status | Description |
|--------|-------------|
| **HIDDEN** | Not visible in Devmart Admin navigation |
| **READ-ONLY** | Template files remain unmodified |
| **REFERENCE** | Available for component reuse |

### 4.2 Hidden Modules

| Module Category | Routes | Devmart Status |
|-----------------|--------|----------------|
| Base UI | `/admin/base-ui/*` | Hidden |
| Forms | `/admin/forms/*` | Hidden |
| Tables | `/admin/tables/*` | Hidden |
| Charts | `/admin/charts/*` | Hidden |
| Maps | `/admin/maps/*` | Hidden |
| Icons | `/admin/icons/*` | Hidden |
| Layouts | `/admin/layouts/*` | Hidden |

### 4.3 Reuse Policy

- ✅ Import components for Devmart modules
- ❌ Modify original template files
- ❌ Show in Devmart navigation
- ❌ Modify SCSS

---

## 5. Hard Constraints (Non-Negotiable)

### 5.1 Template Integrity

- Darkone must remain 100% 1:1
- No SCSS refactors
- No component rewrites
- No UI abstraction
- No design changes

### 5.2 Auth Preservation

- Demo auth backend remains active
- Supabase Auth is later phase scope only
- No auth changes during Phase 3

### 5.3 Routing Preservation

- No base path modifications
- Existing Darkone routes remain functional
- New Devmart routes are additive only

---

## 6. Scope Boundaries

### 6.1 In Scope (Phase 3)

| Item | Description |
|------|-------------|
| Placeholder pages | 9 approved modules with Coming Soon / Empty states |
| Navigation structure | Sidebar updated for Devmart modules only |
| Empty table structures | Headers visible, no data rows |
| Route definitions | Routes without logic |
| Demo module hiding | Hide Darkone demo modules from navigation |

### 6.2 Out of Scope (Phase 3)

| Item | Reason |
|------|--------|
| CRUD operations | Not authorized |
| Database connections | Not authorized |
| Supabase integration | Later phase |
| API integrations | Not authorized |
| Authentication changes | Later phase |
| SCSS modifications | Template locked |
| Component rewrites | Template locked |
| Business logic | Not authorized |
| Pages + Sections expansion | Later phase |
| Settings implementation | Later phase |

---

## 7. Execution Sequence (Conceptual — Not Authorized)

When Phase 3 build is authorized:

### Step 1: Navigation Update
- Update sidebar to show Devmart modules only
- Hide Darkone demo module sections
- Preserve layout/styling

### Step 2: Dashboard Placeholder
- Replace demo dashboard with "Coming Soon" placeholder
- Remove demo cards, charts, widgets
- Maintain page structure

### Step 3: Content Module Placeholders
- Create Blog, Projects, Pages, Media, Testimonials pages
- Each shows empty table/grid structure
- No demo data

### Step 4: CRM Placeholder
- Create Leads page with empty table structure
- Define columns (Name, Email, Source, Date, Status)
- No demo data

### Step 5: Analytics Placeholder
- Create Analytics page with "Coming Soon" message
- No demo charts

### Step 6: Settings Placeholder
- Create Settings page with "Coming Soon" message
- No demo forms

### Step 7: Verification
- All routes functional
- No demo data visible
- No console errors
- Navigation works correctly

---

## 8. Dependency Requirements

Phase 3 execution depends on:

| Document | Purpose | Status |
|----------|---------|--------|
| `Admin_Module_Map.md` | Authoritative module list | ✅ Complete |
| `Admin_Placeholder_Map.md` | Placeholder specifications | ✅ Complete |
| `Admin_Module_Skeletons.md` | Skeleton definitions | ✅ Updated |

---

## 9. Verification Checklist

To be verified after execution (when authorized):

- [ ] All 9 Devmart modules have placeholder pages
- [ ] Dashboard shows "Coming Soon" (no demo data)
- [ ] Content modules show empty tables (no demo data)
- [ ] Leads shows empty table (no demo data)
- [ ] Analytics shows "Coming Soon" (no demo charts)
- [ ] Settings shows "Coming Soon" (no demo forms)
- [ ] Darkone demo modules hidden from navigation
- [ ] All routes resolve without 404
- [ ] No console errors
- [ ] Demo auth still functional
- [ ] Sidebar navigation works
- [ ] Theme toggle works

---

## 10. Frontend Style Guide Requirement

**Status:** Required in later phase — NOT Phase 3

A Finibus-based Frontend Style Guide is required to ensure consistency between public frontend and admin content creation.

**Phase 3 Action:** Document the requirement only. Do NOT create.

---

## 11. Related Documents

- `Admin_Module_Map.md` — Authoritative module definitions
- `Admin_Placeholder_Map.md` — Placeholder specifications
- `Admin_Module_Skeletons.md` — Skeleton patterns
- `Master_PRD.md` — Platform requirements
- `Architecture.md` — System architecture
- `Backend.md` — Backend specifications

---

## 12. Explicit Non-Execution Notice

**This document is for planning purposes only.**

No implementation actions are authorized based on this document.

All execution requires explicit GO authorization from project leadership.

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-21 | Planning Agent | Phase 3 alignment complete |

**Supersedes:** Previous version with Darkone demo module focus.
