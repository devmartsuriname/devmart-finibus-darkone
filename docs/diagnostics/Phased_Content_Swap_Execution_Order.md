# Phased Content Swap Execution Order

**Created:** 2025-12-29  
**Status:** PLANNING ONLY — No Execution Authorized  
**Purpose:** Control scaffolding for future Content Swap implementation

---

## Overview

This document defines the recommended execution order for swapping hardcoded content to CMS-driven content across the Finibus public frontend. Each phase is a discrete unit of work with clear acceptance criteria.

**Key Principle:** One page/module per phase for tight control and verification.

---

## Execution Phases

### Phase 1: Homepage

**Route:** `/`  
**Component:** `HomePage.tsx`  
**Complexity:** Medium  
**Dependencies:** None (foundation)

**Scope:**
- Verify all CMS-driven sections render correctly
- Wire remaining wrapper labels (Services, Portfolio, News sections) — IF authorized
- Confirm hero slider, about, partners, testimonials, CTA sections

**Known Gaps:**
- Services wrapper labels: Admin fields exist, public NOT WIRED
- Portfolio wrapper labels: Admin fields exist, public NOT WIRED
- News wrapper labels: Admin fields exist, public NOT WIRED
- Newsletter labels: HARDCODED (no Admin fields)

**Acceptance Criteria:**
- All CMS-driven fields display correctly
- Static fallbacks work when CMS data missing
- No layout breaks

---

### Phase 2: About

**Route:** `/about`  
**Component:** `AboutPage.tsx`  
**Complexity:** Low  
**Dependencies:** Homepage CTA shared component

**Scope:**
- Verify Inside Story section from page_settings
- Confirm shared components (WhyChooseUs, Testimonials, News, CTA)

**Known Gaps:**
- None critical — About page is well-wired

**Acceptance Criteria:**
- All sections render from CMS
- Shared components use same data as Homepage

---

### Phase 3: Contact

**Route:** `/contact`  
**Component:** `ContactPage.tsx`  
**Complexity:** Low  
**Dependencies:** None

**Scope:**
- Verify contact info cards from settings table
- Confirm form submission to leads table works
- Verify Google Maps embed from settings

**Known Gaps:**
- Form labels: HARDCODED (acceptable — no Admin fields)
- Card labels: HARDCODED (acceptable — no Admin fields)

**Acceptance Criteria:**
- Contact info displays from settings
- Form submits successfully
- Map renders

---

### Phase 4: Services (Listing)

**Route:** `/service`  
**Component:** `ServicePage.tsx`  
**Complexity:** Medium  
**Dependencies:** None

**Scope:**
- Verify all 7 services render from CMS
- Confirm icons load from Media Library
- Verify service links navigate correctly

**Known Gaps:**
- What We Do wrapper: HARDCODED (no Admin fields for this page)
- How We Work section: COMPLETELY HARDCODED — template parity

**Acceptance Criteria:**
- All published services display
- Icons render
- Navigation to details works

---

### Phase 5: Service Details

**Route:** `/service-details/:slug`  
**Component:** `ServiceDetailsPage.tsx`  
**Complexity:** Medium  
**Dependencies:** Phase 4 (services table)

**Scope:**
- Verify service content renders from CMS
- Confirm process steps render (3 per service)
- Confirm pricing plans render with monthly/yearly tabs

**Known Gaps:**
- None critical — fully CMS-driven

**Acceptance Criteria:**
- Service content displays
- Process steps in correct order
- Pricing displays with tab switching
- Not-found handling for invalid slugs

---

### Phase 6: Projects (Listing)

**Route:** `/projects`  
**Component:** `ProjectPage.tsx`  
**Complexity:** Medium  
**Dependencies:** None

**Scope:**
- Verify all projects render from CMS
- Confirm category filter works
- Verify project images load

**Known Gaps:**
- Wrapper labels: HARDCODED (no Admin fields)

**Acceptance Criteria:**
- All published projects display
- Category filtering works
- Images render
- Navigation to details works

---

### Phase 7: Project Details

**Route:** `/project-details/:slug`  
**Component:** `ProjectDetailsPage.tsx`  
**Complexity:** Medium  
**Dependencies:** Phase 6 (projects table)

**Scope:**
- Verify project content renders from CMS
- Confirm process steps render
- Verify featured image, client info, dates

**Known Gaps:**
- Info card labels: HARDCODED (acceptable)

**Acceptance Criteria:**
- Project content displays
- Process steps in correct order
- Check Launch section renders if data exists
- Not-found handling for invalid slugs

---

### Phase 8: Blog (Listing)

**Route:** `/blog`  
**Component:** `BlogPage.tsx`  
**Complexity:** High  
**Dependencies:** None

**Scope:**
- Verify blog posts render from CMS
- Document non-functional sidebar widgets (no fix in this phase)

**Known Gaps — CRITICAL:**
- Sidebar Search: UI-ONLY (not functional)
- Sidebar Categories: HARDCODED list
- Sidebar Tags: HARDCODED list (blog_tags exists but not wired)
- Sidebar Recent Posts: HARDCODED list
- Sidebar Comments: HARDCODED list
- Pagination: UI-ONLY (not functional)

**Acceptance Criteria:**
- Published blog posts display
- Post images render
- Navigation to details works
- Document gaps (no fix required)

---

### Phase 9: Blog Details

**Route:** `/blog/:slug`  
**Component:** `BlogDetailsPage.tsx`  
**Complexity:** High  
**Dependencies:** Phase 8 (blog_posts table)

**Scope:**
- Verify post content renders from CMS
- Document hardcoded template blocks
- Document non-functional comments

**Known Gaps — CRITICAL:**
- Quote Block: HARDCODED (static template)
- Banner Section: HARDCODED (static template)
- Tags Row: 1 CMS (category) + 2 HARDCODED
- Comments Display: HARDCODED (blog_comments not wired)
- Comment Form: UI-ONLY (not functional)
- Author Name: HARDCODED "Devmart Team"

**Acceptance Criteria:**
- Post content displays from CMS
- Featured image renders
- Category tag displays
- Document gaps (no fix required)

---

## Summary Table

| Phase | Page | Complexity | Critical Gaps | Est. Effort |
|-------|------|------------|---------------|-------------|
| 1 | Homepage | Medium | 3 wrapper sections not wired | 2-3 hrs |
| 2 | About | Low | None | 1 hr |
| 3 | Contact | Low | None | 1 hr |
| 4 | Services | Medium | How We Work hardcoded | 1-2 hrs |
| 5 | Service Details | Medium | None | 1-2 hrs |
| 6 | Projects | Medium | None | 1-2 hrs |
| 7 | Project Details | Medium | None | 1-2 hrs |
| 8 | Blog | High | 6 sidebar widgets not wired | 2-3 hrs |
| 9 | Blog Details | High | Comments, quote, banner hardcoded | 2-3 hrs |

**Total Estimated Effort:** 13-19 hours

---

## Phase Gate Requirements

Before each phase can begin:
1. Previous phase must be marked COMPLETE
2. Explicit authorization required
3. Restore point created

After each phase:
1. Visual verification against reference
2. Data verification against database
3. Status report submitted
4. Restore point updated

---

## Hardcoded Content Policy

**WILL NOT BE WIRED (Template Parity):**
- How We Work section (Services page)
- Quote Block (Blog Details)
- Banner Section (Blog Details)
- Comment examples (Blog Details)
- Sidebar widgets (Blog pages)
- Newsletter labels (Homepage)

These remain hardcoded to maintain 1:1 Finibus template parity.

---

## Risk Factors

| Risk | Mitigation |
|------|------------|
| Blog sidebar widgets not functional | Document as known limitation |
| Comments not wired | Document as known limitation |
| Pagination not functional | Document as known limitation |
| Homepage wrapper fields not consumed | Low priority — cards are wired |

---

**Status:** PLANNING ONLY  
**Execution:** Not Authorized  
**Next Step:** Await explicit authorization for Phase 1
