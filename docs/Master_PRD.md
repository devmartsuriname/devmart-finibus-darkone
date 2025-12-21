# Master PRD — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 3 Alignment Complete
Execution: Documentation Only — Build Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Document References

This PRD is derived from and must remain aligned with:

- **Devmart Strategic Positioning** — Authority statement, market position, competitive differentiation
- **Devmart Capability Framework** — Service tiers, engagement models, deliverables
- **Website & Brand PRD** — Conversion goals, content hierarchy, messaging

---

## 2. Platform Overview

The Devmart platform consists of two isolated applications:

| Application | Template Source | Purpose |
|-------------|-----------------|---------|
| **Public Website** | Finibus React | Client-facing marketing, lead generation, authority positioning |
| **Admin Portal** | Darkone React | Internal operations, content management, lead management |

---

## 3. Strategic Alignment

### 3.1 Authority Statement (from Strategic Positioning)

> "We design, build and operate critical digital systems."

All public-facing content must reinforce this positioning.

### 3.2 Capability Framework Integration

The public website must present:

- **Three Service Tiers:** Foundation, Growth, Enterprise
- **Engagement Models:** Project-based, Retainer, Embedded
- **Proof Points:** Case studies, metrics, client outcomes

### 3.3 Conversion Goals (from Website & Brand PRD)

| Goal | Priority |
|------|----------|
| Request a Proposal / Offerte + Strategic Conversation | Primary |
| Lead capture | Secondary |

### 3.4 Priority Sectors

| Sector | Priority | Timeline |
|--------|----------|----------|
| Government | 2026 Priority | Immediate focus |

### 3.5 Geographic Positioning

| Region | Status |
|--------|--------|
| Caribbean | Immediate positioning (not phase-2 narrative) |

---

## 4. Public Website Scope (Finibus)

### 4.1 Core Pages

- Homepage (Variant A — Agency style)
- Homepage (Variant B — Creative style)
- About Us
- Services (with capability framework mapping)
- Projects / Portfolio
- Blog
- Contact

### 4.2 UI Modules Required

- Hero sections with CTAs
- Service cards
- Project showcases
- Testimonial sliders
- Counter/stats sections
- Team member displays
- Contact forms
- Blog listing and detail views

### 4.3 Parity Rules

- **1:1 layout parity** with Finibus reference
- Content replacement only
- No structural modifications
- No custom components beyond template

---

## 5. Admin Portal Scope (Darkone)

### 5.1 Current State (Demo)

- Dashboard module (preserved)
- Sidebar navigation (preserved)
- Demo authentication (fake-backend)
- Demo UI modules (hidden from navigation)

### 5.2 Phase 3 State (Placeholder Cleanup)

| Module | Route | State |
|--------|-------|-------|
| Dashboard | `/admin/dashboard` | Coming Soon placeholder |
| Blog | `/admin/content/blog` | Empty table placeholder |
| Projects | `/admin/content/projects` | Empty table placeholder |
| Pages | `/admin/content/pages` | Empty table placeholder |
| Media Library | `/admin/content/media` | Empty grid placeholder |
| Testimonials | `/admin/content/testimonials` | Empty table placeholder |
| Leads | `/admin/crm/leads` | Empty table placeholder |
| Analytics | `/admin/analytics` | Coming Soon placeholder |
| Settings | `/admin/settings` | Coming Soon placeholder |

### 5.3 Future State (Planned — Not Implemented)

- Real authentication (Supabase)
- Full CRUD for content modules
- Lead management with source tracking
- Analytics dashboards per module
- Settings (Branding, SEO, Integrations)

**STATUS: Future state is NOT IMPLEMENTED**

---

## 6. Content Hierarchy

From Website & Brand PRD:

1. **Authority Reinforcement** — Every page must establish expertise
2. **Outcome Focus** — Benefits over features
3. **Clear CTAs** — Consultation booking prioritized
4. **Social Proof** — Case studies, testimonials, metrics

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Responsive | Mobile-first, all breakpoints |
| Performance | Core Web Vitals compliance |
| Accessibility | WCAG 2.1 AA target |
| SEO | Meta tags, structured data, semantic HTML |

---

## 8. Explicit Exclusions

### 8.1 Permanent Exclusions (This Project)

| Item | Reason | Status |
|------|--------|--------|
| Team Management | Not in project scope | ❌ Permanently Excluded |
| Client Portal | Not in project scope | ❌ Permanently Excluded |
| Frontend Login/Register | Public site has no auth | ❌ Permanently Excluded |

### 8.2 Client Portal Clarification

The following are **explicitly NOT included** in the Devmart platform:

- No frontend login/register pages for public users
- No admin client account management
- No client-facing dashboard
- No client self-service features

This is a **permanent exclusion** for this project.

### 8.3 Phase 3 Exclusions

| Item | Reason | Future Phase |
|------|--------|--------------|
| User/Profile Management | Not visible in Phase 3 | Later phase |
| CRUD Operations | Placeholder only | Later phase |
| Database Integration | Not authorized | Later phase |
| Supabase Auth | Not authorized | Later phase |
| Pages + Sections Expansion | Not authorized | Later phase |
| Settings Implementation | Not authorized | Later phase |

### 8.4 Template Exclusions

| Item | Reason |
|------|--------|
| Darkone Demo Modules | Hidden from navigation (reference only) |
| SCSS Modifications | Template locked |
| Component Rewrites | Template locked |
| Custom UI Abstraction | Template locked |

---

## 9. Success Criteria

### 9.1 Phase 2 (Complete)

Phase 2 is complete when:

1. ✅ Public website achieves 1:1 Finibus layout parity
2. ✅ Content reflects Devmart positioning and capabilities
3. ✅ All core pages are functional
4. ✅ No template customizations beyond content

### 9.2 Phase 3 (Current)

Phase 3 is complete when:

1. All 9 Devmart admin modules have placeholder pages
2. Dashboard shows "Coming Soon" (no demo data)
3. Content modules show empty tables (no demo data)
4. Darkone demo modules hidden from navigation
5. Demo auth remains functional
6. All routes resolve without errors

---

## 10. Frontend Style Guide Requirement

**Status:** Required in later phase — NOT Phase 3

A Finibus-based Frontend Style Guide is required to ensure:

- Consistent styling between public frontend and admin
- Reusable patterns for content creation
- Typography, spacing, and color standards

**Phase 3 Action:** Document the requirement only. Do NOT create.

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-21 | Planning Agent | Phase 3 alignment complete |

**Next Review:** After Phase 3 build authorization
