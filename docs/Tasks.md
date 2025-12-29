# Tasks — Devmart Implementation Tracker

**Status:** Verified  
**Current Phase:** Phase 11J COMPLETE  
**Last Updated:** 2025-12-29

---

## Phase Status Summary

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ✅ Complete | Foundation & Monorepo |
| Phase 2 | ✅ Complete | Finibus Template Parity |
| Phase 3 | ✅ Complete | Supabase Auth Implementation |
| Phase 4 | ✅ Complete | Admin Modules (All 8 modules) |
| Phase 5 | ✅ Complete | Public → DB Integration (Inner Pages) |
| Phase 6.1 | ✅ Complete | Contact/Leads Pipeline + Settings Wiring |
| Phase 7 | ✅ CLOSED | Homepage Dynamic Wiring + Newsletter + Visual Verification |
| Phase 7.1 | ✅ COMPLETE | Homepage Wiring Verification + Documentation |
| Phase 7.2 | ✅ COMPLETE | Homepage Visual Verification & Acceptance |
| Phase 8 | ✅ CLOSED | Homepage UI Blocks (Content Control) — Verification Only |
| Phase 9 | ✅ CLOSED | About Page + Global Blocks (Admin UI + DB) |
| Phase 10A | ✅ COMPLETE | Services Pricing Visual Fix + Spacing Adjustment |
| Phase 10B | ✅ CLOSED | Service Detail Pricing Visibility Controls |
| Phase 10B Hotfix | ✅ COMPLETE | Text-Only Toast Feedback (No Icons) |
| Phase 10B Global | ✅ FINALIZED | Admin Global Text-Only Save Messages Standardized (All Modules) |
| Phase 10B Parity | ✅ COMPLETE | Top-Right Text Banner Parity (Bootstrap Toast) |
| Phase 10C | ✅ COMPLETE | About Page DB Wiring + Heading Color Parity |
| Phase 11 | ✅ COMPLETE | Settings Module Expansion & Branding Rollout (through 11J) |
| Phase 12.1 | ✅ COMPLETE | Homepage Content Wiring (Devmart Strategic Positioning) |
| Phase 12.2 | ✅ COMPLETE | About Page Content Wiring (Devmart Strategic Positioning) |

---

## Phase 12.2 — About Page Content Wiring (✅ COMPLETE)

**Status:** COMPLETE  
**Completed:** 2025-12-29

### Objective

Apply Devmart strategic positioning content to About page CMS-wired sections via database UPDATE.

### Content Updated

| Section | Field | New Content | Chars |
|---------|-------|-------------|-------|
| Inside Story | section_label | "Our Story" | 9 |
| Inside Story | title | "Building Mission-Critical Digital Systems" | 42 |
| Inside Story | description | (298 chars) | 298 |
| Inside Story | cto_message | (231 chars) | 231 |
| Inside Story | cto_name | "Devmart Leadership" | 18 |
| Inside Story | cto_title | "Systems Integration Team" | 24 |
| Progress Stat 1 | label | "Mission-Critical Systems" | 24 |
| Progress Stat 2 | label | "Government & Enterprise" | 23 |
| Progress Stat 3 | label | "Long-Term Operations" | 20 |
| Latest News | section_label | "Insights" | 8 |
| Latest News | section_title | "Latest Updates from Devmart" | 28 |
| Latest News | view_all_label | "View All Insights" | 17 |

### Gaps Identified (NOT Implemented)

| Gap ID | Section | Issue | Reason |
|--------|---------|-------|--------|
| GAP-06 | Inside Story | Signature image hardcoded | No MediaPicker wired (cto_signature_media_id is NULL) |
| GAP-07 | Inside Story | Main image hardcoded | No MediaPicker wired (main_image_media_id is NULL) |
| GAP-08 | Latest News | Author info hardcoded | Blog posts render "Posted by, Admin" statically |

### Guardian Rules Verified

- ✅ No schema changes
- ✅ No type/interface changes
- ✅ No component modifications
- ✅ No CSS/SCSS changes
- ✅ Darkone Admin 1:1 preserved
- ✅ Finibus Frontend 1:1 preserved

### Restore Point

`docs/restore-points/Restore_Point_Phase_12_2_About_Content_Wiring.md`

---

## Phase 12.1 — Homepage Content Wiring (✅ COMPLETE)

**Status:** COMPLETE  
**Completed:** 2025-12-29

### Objective

Apply Devmart strategic positioning content to homepage CMS-wired sections via database UPDATE.

### Content Updated

| Section | Field | New Content | Chars |
|---------|-------|-------------|-------|
| Hero Slide 1 | title_prefix | "We Design, Build, and Operate" | 30 |
| Hero Slide 1 | title_highlight | "Critical Digital Systems" | 24 |
| Hero Slide 2 | title_prefix | "Digital Infrastructure for" | 27 |
| Hero Slide 2 | title_highlight | "Public Services" | 15 |
| Hero Slide 3 | title_prefix | "Enterprise Systems That" | 23 |
| Hero Slide 3 | title_highlight | "Scale with Governance" | 21 |
| About | title | "Your Digital Infrastructure Partner" | 36 |
| Why Choose | title | "Why Institutions Choose Devmart" | 32 |
| CTA | title_line1 | "Ready to Build" | 14 |
| CTA | title_line2 | "Critical Systems?" | 17 |
| CTA | title_line3 | "Let's Talk" | 10 |

### Skills Labels Updated (Why Choose Us)

| Skill | Label | Percent |
|-------|-------|---------|
| 1 | Mission-Critical Delivery | 95 |
| 2 | Secure Integrations | 90 |
| 3 | Scalable Architecture | 88 |
| 4 | Operational Stewardship | 92 |

### Gaps Identified (NOT Implemented)

| Gap ID | Section | Issue | Reason |
|--------|---------|-------|--------|
| GAP-01 | Services wrapper | Labels hardcoded | Component does not consume homepage_settings.services |
| GAP-02 | Portfolio wrapper | Labels hardcoded | Component does not consume homepage_settings.portfolio |
| GAP-03 | News wrapper | Labels hardcoded | Component does not consume homepage_settings.blog |
| GAP-04 | Newsletter | All labels hardcoded | No Admin fields exist |
| GAP-05 | Testimonials wrapper | Title hardcoded | Component uses static label |

### Future Admin Modal Extensions (Documented)

- SEO tabs for Blog, Services, Projects modals
- Category dropdown verification for BlogPostModal
- Newsletter section admin controls

### Guardian Rules Verified

- ✅ No schema changes
- ✅ No type/interface changes
- ✅ No component modifications
- ✅ No CSS/SCSS changes
- ✅ Darkone Admin 1:1 preserved
- ✅ Finibus Frontend 1:1 preserved

### Restore Point

`docs/restore-points/Restore_Point_Phase_12_1_Homepage_Content_Wiring.md`

---

## Phase 11 — Settings Module & Branding Rollout (✅ COMPLETE)

**Status:** All Sub-phases Complete (11A through 11J)  
**Completed:** 2025-12-29

### Sub-phase Summary

| Sub-phase | Description | Status |
|-----------|-------------|--------|
| 11A | Settings Infinite Spinner Fix | ✅ COMPLETE |
| 11B | Branding Settings (Admin UI) | ✅ COMPLETE |
| 11C | Color Map Contract + SCSS Conversion (15 selectors) | ✅ COMPLETE |
| 11D | Gradient & Overlay Design Contract | ✅ COMPLETE |
| 11E | CTA Gradients (Wave 1 + 2) | ✅ COMPLETE |
| 11F | Final Red Residual Cleanup (A-D) | ✅ COMPLETE |
| 11G-A | Mobile Menu Gradient Fix | ✅ COMPLETE |
| 11G-B | Mobile Menu Toggle Visibility | ✅ COMPLETE |
| 11H | Stats Public Wiring | ✅ COMPLETE |
| 11I | Home About Section Media Fields | ✅ COMPLETE |
| 11J | Google Maps Settings Wiring | ✅ COMPLETE |

### Key Outcomes

- Admin Branding tab with 3 color pickers (primary, secondary, accent)
- Public CSS variable injection via BrandingProvider
- All red residuals eliminated from public UI
- Base `$theme-color` updated to Devmart Green (#1EB36B)
- Mobile menu fully functional
- Google Maps embed URL configurable from Admin → Settings → General
- Stats counters wired to homepage_settings
- About section media fields wired to database

---

## Phase 10C — About Page DB Wiring (✅ COMPLETE)

**Completed:** 2025-12-26

### Summary

Wired About page sections to database via `page_settings` table (page_slug='about') and fixed heading color parity issue.

### Key Changes

| Task | Status | Notes |
|------|--------|-------|
| Fix WhyChooseUsArea heading color | ✅ Complete | Changed `black=""` to `black="black"` in AboutPage.tsx |
| Create useAboutPageSettings hook | ✅ Complete | Fetches from `page_settings` where `page_slug='about'` |
| Wire InsideStoryArea to DB | ✅ Complete | Uses hook with static fallbacks |
| Wire LatesNewsArea to DB | ✅ Complete | Section header from DB, posts from useBlogPosts |
| Remove date-fns dependency | ✅ Complete | Replaced with native Intl.DateTimeFormat |

### Date Formatting Standard (Phase 10C)

**Public app must NOT use external date libraries.**

Date formatting in `apps/public` uses native JavaScript:
```tsx
const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  } catch {
    return '';
  }
};
```

### Restore Points

- `docs/restore-points/Restore_Point_Phase_10C_About_Wiring_Start.md`
- `docs/restore-points/Restore_Point_Phase_10C_About_Wiring_DateFix.md`

### Guardian Rules Verified

- ✅ apps/public only — no admin changes
- ✅ No new dependencies — removed date-fns, used native APIs
- ✅ No Bootstrap introduced
- ✅ No CSS/SCSS changes — used existing `.title.black` class
- ✅ Finibus parity maintained

---

## Phase 4 — Admin Modules (✅ COMPLETE)

All modules implemented with Supabase + RLS:
- ✅ Media Library (38+ assets)
- ✅ Settings (14 keys)
- ✅ Pages (6 pages, edit-only)
- ✅ Blog (6 posts, 10 tags, 8 comments)
- ✅ Projects (8 projects)
- ✅ Testimonials (6 testimonials)
- ✅ Leads (admin list + status/notes)
- ✅ Services (7 services, 21 steps, 6 pricing plans + media parity)

---

## Phase 5 — Public → DB Integration (✅ COMPLETE)

### Inner Pages Wiring Status

| Page | Status | Data Source |
|------|--------|-------------|
| Services List | ✅ Wired | `services` table |
| Service Details | ✅ Wired | `services` + `service_process_steps` + `service_pricing_plans` |
| Projects List | ✅ Wired | `projects` table |
| Project Details | ✅ Wired | `projects` + `project_process_steps` |
| Blog List | ✅ Wired | `blog_posts` table (published only) |
| Blog Details | ✅ Wired | `blog_posts` + `media` join |

### Homepage Wiring Status — STATIC BY DESIGN (Phase-Locked)

See: Section "Homepage Sections — Deferred" below.

---

## Phase 6.1 — Contact/Leads + Settings (✅ COMPLETE)

| Task | Status | Notes |
|------|--------|-------|
| Contact form → leads INSERT | ✅ Complete | Honeypot anti-spam, client validation |
| RLS for leads INSERT | ✅ Complete | Anonymous INSERT allowed |
| Settings fetch hook | ✅ Complete | `usePublicSettings.ts` with fallbacks |
| Footer settings wiring | ✅ Complete | Email, phone, address, social URLs |
| ContactUsArea settings | ✅ Complete | Email, phone, address display |
| Admin Leads view | ✅ Complete | List + status/notes edit |

### Known Limitation — Lovable Preview

**Issue:** Contact form does not work in Lovable Preview.

**Reason:** The Lovable Preview runs the Admin app from `/src`, NOT the Public app from `apps/public`. The Public app is a separate Vite application.

**Works In:** Local development, production deployment.

**Decision:** Deferred. No architecture change authorized. Documented in `docs/restore-points/Restore_Point_Phase_6_Contact_Leads_Settings_Wiring.md`.

---

## Phase 7.2 — Routing + 404 Parity + Image Fix (✅ COMPLETE)

**Completed:** 2025-12-25

### Root Cause & Fixes Applied

| Issue | Root Cause | Fix Applied |
|-------|------------|-------------|
| Home portfolio cards → 404 | Route pattern `/project/:slug` instead of `/project-details/:slug` | Fixed in `PortfolioArea.tsx` line 117 |
| 404 page missing Header/Footer | Catch-all route outside `MainLayout` | Moved inside `MainLayout` in `App.tsx` |
| Project Details image instability | Missing `object-fit: cover` | Added to `_project_details.scss` |

### Files Changed

| File | Change |
|------|--------|
| `apps/public/src/components/pages/Home/PortfolioArea.tsx` | Route pattern fix |
| `apps/public/src/App.tsx` | Catch-all moved inside MainLayout |
| `apps/public/src/assets/sass/_project_details.scss` | Added object-fit: cover |

### Stability Guarantee

All project images (any dimensions) will render consistently with `object-fit: cover`.

### Restore Point

`docs/restore-points/Restore_Point_Phase_7_2_Routing_404_Image_Fix.md`

---

## Phase 7 — Homepage Dynamic Wiring (✅ COMPLETE)

**Completed:** 2025-12-26

### Database Objects

| Object | Type | Status | Notes |
|--------|------|--------|-------|
| `homepage_settings` | Table | ✅ Complete | Single-row JSON config (id=1) |
| `newsletter_subscribers` | Table | ✅ Complete | Newsletter collection (empty, ready) |

### Homepage Sections Wiring Status

| Section | Component | Status | Data Source | Hook |
|---------|-----------|--------|-------------|------|
| Hero | `HeroArea.tsx` | ✅ WIRED | `homepage_settings.data.hero` | `useHomepageSettings` |
| Services | `ServiceArea.tsx` | ✅ WIRED | `services` table | `useServices` |
| About + Stats | `AboutArea.tsx` | ✅ WIRED | `homepage_settings.data` | `useHomepageSettings` |
| Newsletter + Partners | `OurPartnerArea.tsx` | ✅ WIRED | `homepage_settings.data.partners` + INSERT | `useHomepageSettings` + `useNewsletterSubscribe` |
| Portfolio | `PortfolioArea.tsx` | ✅ WIRED | `projects` table | `useProjects` |
| Why Choose Us | `WhyChooseUsArea.tsx` | ✅ WIRED | `homepage_settings.data.why_choose` | `useHomepageSettings` |
| Testimonials | `TestimonialArea.tsx` | ✅ WIRED | `testimonials` table | `useTestimonials` |
| Latest Blog | `NewsLatterArea.tsx` | ✅ WIRED | `blog_posts` table | `useBlogPosts` |
| CTA Strip | `LetsTalkArea.tsx` | ✅ WIRED | `homepage_settings.data.cta` | `useHomepageSettings` |

### Restore Point

`docs/restore-points/Restore_Point_Phase_7_1_Homepage_Wiring_Verification.md`

### Verification Results (2025-12-26)

| Category | Count | Status |
|----------|-------|--------|
| Hero slides | 3 | ✅ DB verified |
| Published services | 5 | ✅ DB verified |
| Published projects | 5 | ✅ DB verified |
| Published testimonials | 5 | ✅ DB verified |
| Published blog posts | 3 | ✅ DB verified |
| Partner logos | 10 | ✅ DB verified |
| Stats items | 4 | ✅ DB verified |

---

## Phase 8 — Homepage UI Blocks (Content Control) — ✅ CLOSED

**Completed:** 2025-12-26

### Summary

Phase 8 was authorized to implement Admin content controls for homepage sections. Upon analysis, the implementation was discovered to be **ALREADY COMPLETE**. Phase 8 execution was reduced to verification + documentation only.

### Verification Results

| Check | Status |
|-------|--------|
| Homepage in `pages` table (slug='/') | ✅ EXISTS |
| `homepage_settings` record (id=1) | ✅ EXISTS |
| All 9 sections have data | ✅ VERIFIED |
| Admin edit modal functional | ✅ CODE VERIFIED |
| Enable/Disable toggles persist | ✅ HOOK VERIFIED |
| SEO tab functional | ✅ CODE VERIFIED |

### Sections Covered

| Section | Type | Admin Editability |
|---------|------|-------------------|
| Hero Slider | UI Block | ✅ Full (slides, CTAs) |
| Services | Dynamic | ✅ Header only |
| About Us | UI Block | ✅ Full (title, description, skills) |
| Statistics | UI Block | ✅ Full (4 counters) |
| Partners | UI Block | ✅ Full (logo array) |
| Portfolio | Dynamic | ✅ Header only |
| Why Choose Us | UI Block | ✅ Full (title, skills, video) |
| Testimonials | Dynamic | ✅ Header only |
| Latest News | Dynamic | ✅ Header only |
| CTA Strip | UI Block | ✅ Full (title, button) |

### Guardian Rules Verified

- ✅ No homepage layout changes
- ✅ No new sections added
- ✅ No styling/CSS changes
- ✅ Existing Darkone modal patterns
- ✅ Persists to `homepage_settings`

### Restore Point

`docs/restore-points/Restore_Point_Phase_8_Homepage_UI_Blocks_Verification.md`

---

## Deferred Items

### Analytics (⏸️ DEFERRED)

| Item | Reason |
|------|--------|
| Dashboard widgets | Not authorized |
| Usage metrics | Not authorized |
| Traffic analytics | Not authorized |

---

## Partial Items

| Item | Status | Notes |
|------|--------|-------|
| Google Maps embed | 🔶 Partial | Contact page has placeholder, Settings key not wired to frontend |

---

## MVP Status Summary

### MVP COMPLETE ✅

- Authentication (Supabase JWT + Roles + RLS)
- All 8 Admin Modules (Media, Settings, Pages, Blog, Projects, Services, Testimonials, Leads)
- Inner page wiring (Services, Projects, Blog)
- Contact form → Leads pipeline
- Settings → Footer/Contact wiring
- **Homepage Dynamic Wiring (all 9 sections)** — Phase 7 COMPLETE 2025-12-26
- **Testimonials public carousel** — wired to `testimonials` table
- **Newsletter form** — wired to `newsletter_subscribers` table

### MVP PARTIAL 🔶

- Google Maps embed (Settings key exists, frontend not wired)

### MVP DEFERRED ⏸️

- Analytics dashboard (not authorized)
- Public app in Lovable Preview (architecture limitation)
- User self-registration (SMTP-dependent)

---

## Phase 9 — About Page + Global Blocks (✅ CLOSED)

**Completed:** 2025-12-26

### Phase 9A — Definition & Planning (✅ COMPLETE)
- Defined `page_settings` as per-page UI block storage
- Defined `global_blocks` as shared block storage
- Homepage established as master reference pattern

### Phase 9B — Database Foundation (✅ VERIFIED)
- Created `page_settings` table with RLS
- Created `global_blocks` table with RLS
- Seeded About page row in `page_settings`
- Seeded CTA Strip + Why Choose Us in `global_blocks`

### Phase 9C — Admin UI (✅ COMPLETE)
- Extended PageEditModal for About page (Sections + SEO tabs)
- Created Global Blocks admin page at `/admin/content/global-blocks`
- Created edit modals for Inside Story, Latest News, CTA Strip, Why Choose Us

### Guardian Rules Verified
- ✅ `homepage_settings` untouched
- ✅ No frontend code changes
- ✅ No CSS/SCSS changes
- ✅ 1:1 Darkone patterns preserved

---

## Phase 10A — Services Pricing Visual Fix (✅ COMPLETE)

**Completed:** 2025-12-26

### Scope

| Page | Action | Status |
|------|--------|--------|
| `/services` | Remove pricing section | ✅ Complete |
| `/service-details/:slug` | Fix pricing table visual parity | ✅ Complete |

### Fix Applied

Updated `PriceBox.tsx` and `ServicePrice.tsx` to use Finibus-parity CSS classes:
- `single-price-box` instead of custom `price-card`
- `feature-list` instead of custom `price-feature`
- `pay-btn` instead of custom `price-btn`
- `section.pricing-plan.sec-mar` wrapper

---

## Phase 10B — Service Detail Pricing Visibility Controls (✅ CLOSED)

**Completed:** 2025-12-26

### Summary

Implemented per-service pricing visibility controls enabling Admin to manage:
- **Show Pricing Section** — Master toggle to show/hide pricing on Service Detail page
- **Enable Monthly Plans** — Toggle to show/hide Monthly tab
- **Enable Yearly Plans** — Toggle to show/hide Yearly tab

### Database Changes

Added 3 columns to `services` table:
| Column | Type | Default |
|--------|------|---------|
| `show_pricing` | BOOLEAN NOT NULL | `true` |
| `pricing_monthly_enabled` | BOOLEAN NOT NULL | `true` |
| `pricing_yearly_enabled` | BOOLEAN NOT NULL | `true` |

### Admin UI

ServiceModal.tsx updated with 3 toggles in Basic Info tab under "Pricing Visibility" section.

### Public Frontend

- `ServiceDetailsWrapper.tsx`: Conditional render based on `show_pricing`
- `ServicePrice.tsx`: Conditional tabs based on `pricing_monthly_enabled` / `pricing_yearly_enabled`

### Guardian Rules Verified

- ✅ No new database tables
- ✅ No global CSS/SCSS changes introduced
- ✅ No unintended scope expansion
- ✅ Finibus 1:1 visual parity maintained

### Restore Point

`docs/restore-points/Restore_Point_Phase_10B_Closeout.md`

### Hotfix — Toast CSS (2025-12-26)

| Attribute | Value |
|-----------|-------|
| **Issue** | Full-screen success icon after saving service |
| **Root Cause** | Missing `react-toastify/dist/ReactToastify.css` import |
| **Fix** | Added CSS import to `Darkone-React_v1.0/src/main.tsx` |
| **Scope** | Admin app only — no DB changes, no public app changes |
| **Restore Point** | `docs/restore-points/Restore_Point_Phase_10B_Hotfix_Toast_CSS.md` |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-25 | Implementation Agent | Phase 5 + 6.1 complete, MVP baseline |
| 1.1 | 2025-12-25 | Implementation Agent | Phase 7.2 complete — Routing/404/Image parity |
| 1.2 | 2025-12-26 | Implementation Agent | Phase 9 CLOSED — About Page + Global Blocks |
| 1.3 | 2025-12-26 | Implementation Agent | Phase 10A COMPLETE, Phase 10B CLOSED — Pricing controls |
| 1.4 | 2025-12-26 | Implementation Agent | Phase 10B Hotfix — Toast CSS import |
| 1.5 | 2025-12-26 | Implementation Agent | Phase 7.2 COMPLETE — Homepage Visual Verification, Phase 7 CLOSED |

**Next Review:** Before Content Swap Phase Execution

---

## PHASE 12: CONTENT SWAP EXECUTION PLAN

**Status:** PLANNING ONLY — Awaiting Authorization  
**Created:** 2025-12-29  
**Source Documentation:**
- `docs/diagnostics/Phased_Content_Swap_Execution_Order.md`
- `docs/diagnostics/pages/Frontend_*.md` (9 files)
- `docs/diagnostics/admin/Admin_*.md` (3 files)

---

### Priority Order (Mandatory)

1. Content structure & SEO logic (titles, descriptions, headings)
2. CMS swapability using existing fields only
3. Identification of missing admin/SEO capabilities (DOCUMENT ONLY)
4. Dashboard & Analytics (LATER PHASE — NOT in Phase 12)
5. Quote Wizard (FINAL PHASE — NOT in Phase 12)

---

### Phase 12.1: Homepage Content Verification & Wrapper Wiring

**Scope:**
- **Route:** `/`
- **Component:** `HomePage.tsx` + 9 sub-components

**IN Scope:**
| Item | Current State | Action |
|------|---------------|--------|
| Hero Slider | ✅ WIRED | Verify only |
| About Section | ✅ WIRED | Verify only |
| Partners | ✅ WIRED | Verify only |
| Why Choose Us | ✅ WIRED | Verify only |
| Testimonials | ✅ WIRED | Verify only |
| Let's Talk CTA | ✅ WIRED | Verify only |
| Services wrapper labels | ❌ NOT WIRED | Wire to `homepage_settings.services` |
| Portfolio wrapper labels | ❌ NOT WIRED | Wire to `homepage_settings.portfolio` |
| Blog/News wrapper labels | ❌ NOT WIRED | Wire to `homepage_settings.blog` |

**OUT of Scope:**
- Newsletter labels (no Admin fields exist)
- Service/Project/Blog card content (already wired to tables)
- Any new Admin modal fields

**Referenced Documentation:**
- `docs/diagnostics/pages/Frontend_Home.md` — Full swapability analysis
- `docs/diagnostics/admin/Admin_Modals_Fields_Inventory.md` — homepage_settings fields

**Dependencies:** None (foundation phase)

**Stop Conditions:**
- If wrapper wiring requires layout changes → STOP, document blocker
- If homepage_settings JSON structure differs from documentation → STOP, verify

**Expected Outcome:**
- All 9 homepage sections verified as rendering correctly
- Wrapper labels for Services/Portfolio/News sections consume CMS values
- Fallback to hardcoded values if DB fields are NULL

**Status:** PENDING

---

### Phase 12.2: About Page Verification

**Scope:**
- **Route:** `/about`
- **Component:** `AboutPage.tsx`

**IN Scope:**
| Item | Current State | Action |
|------|---------------|--------|
| Breadcrumb | ✅ Route-driven | Verify only |
| Inside Story | ✅ WIRED | Verify from `page_settings` |
| Why Choose Us | ✅ WIRED (shared) | Verify from `homepage_settings.why_choose` |
| Testimonials | ✅ WIRED (shared) | Verify from `testimonials` table |
| Latest News | ✅ WIRED | Verify from `blog_posts` + wrapper |
| Let's Talk CTA | ✅ WIRED (shared) | Already verified in 12.1 |

**OUT of Scope:**
- Any new Admin fields
- Modifications to shared components
- SEO fields (Pages module has meta_title/meta_description)

**Referenced Documentation:**
- `docs/diagnostics/pages/Frontend_About.md` — Full section analysis

**Dependencies:** Phase 12.1 complete (shared CTA verified)

**Stop Conditions:**
- None anticipated — About page is well-wired

**Expected Outcome:**
- All About page sections verified as CMS-driven
- No gaps requiring immediate action

**Status:** PENDING

---

### Phase 12.3: Contact Page Verification

**Scope:**
- **Route:** `/contact`
- **Component:** `ContactPage.tsx`

**IN Scope:**
| Item | Current State | Action |
|------|---------------|--------|
| Breadcrumb | ✅ Route-driven | Verify only |
| Contact Info Cards (values) | ✅ WIRED | Verify from `settings` |
| Contact Form → Leads | ✅ WIRED | Verify submission creates `leads` record |
| Google Map | ✅ WIRED | Verify embed URL from `settings` |
| Let's Talk CTA | ✅ WIRED (shared) | Already verified in 12.1 |

**OUT of Scope:**
- Contact card labels ("Location", "Phone", "Email" — acceptable hardcoded)
- Form field labels (acceptable hardcoded)
- Form validation messages (acceptable hardcoded)

**Referenced Documentation:**
- `docs/diagnostics/pages/Frontend_Contact.md` — Full section analysis

**Dependencies:** Phase 12.1 complete (shared CTA verified)

**Stop Conditions:**
- If form submission fails → STOP, verify RLS policy

**Expected Outcome:**
- Contact values display from CMS settings
- Form submits successfully to `leads` table
- Map renders correctly

**Status:** PENDING

---

### Phase 12.4: Services Listing Verification

**Scope:**
- **Route:** `/service`
- **Component:** `ServicePage.tsx`

**IN Scope:**
| Item | Current State | Action |
|------|---------------|--------|
| Breadcrumb | ✅ Route-driven | Verify only |
| Services Grid | ✅ WIRED | Verify all 7 services from `services` table |
| Service Icons | ✅ WIRED | Verify from Media Library |
| Let's Talk CTA | ✅ WIRED (shared) | Already verified |

**OUT of Scope:**
- "What We Do" wrapper labels (no Admin fields on this page)
- "How We Work" section (COMPLETELY HARDCODED — template parity)
- SEO fields for services (missing — document only)
- New Admin modal fields

**Referenced Documentation:**
- `docs/diagnostics/pages/Frontend_Services.md` — Full section analysis

**Dependencies:** Phase 12.1 complete

**Stop Conditions:**
- None anticipated — Services listing is well-wired

**Expected Outcome:**
- All published services display correctly
- Icons render from Media Library
- Gaps documented: "How We Work" hardcoded, no SEO fields

**Status:** PENDING

---

### Phase 12.5: Service Details Verification

**Scope:**
- **Route:** `/service-details/:slug`
- **Component:** `ServiceDetailsPage.tsx`

**IN Scope:**
| Item | Current State | Action |
|------|---------------|--------|
| Breadcrumb | ✅ Route-driven | Verify only |
| Service Content | ✅ WIRED | Verify title, description from `services` |
| Process Steps | ✅ WIRED | Verify 3 steps from `service_process_steps` |
| Pricing Plans | ✅ WIRED | Verify monthly/yearly tabs |
| Sidebar | ✅ WIRED | Verify other services list |

**OUT of Scope:**
- Sidebar labels (HARDCODED — acceptable)
- SEO fields (missing — document only)

**Referenced Documentation:**
- `docs/diagnostics/pages/Frontend_ServiceDetails.md` — Full section analysis

**Dependencies:** Phase 12.4 (services table verified)

**Stop Conditions:**
- If pricing tab switching broken → STOP, debug
- If missing service images → Verify Media Library references

**Expected Outcome:**
- Service content displays correctly
- Process steps render in order
- Pricing displays with tab switching
- Not-found handling for invalid slugs

**Status:** PENDING

---

### Phase 12.6: Projects Listing Verification

**Scope:**
- **Route:** `/projects`
- **Component:** `ProjectPage.tsx`

**IN Scope:**
| Item | Current State | Action |
|------|---------------|--------|
| Breadcrumb | ✅ Route-driven | Verify only |
| Projects Grid | ✅ WIRED | Verify all 8 projects from `projects` table |
| Category Filter | ✅ WIRED | Test filter functionality |
| Project Images | ✅ WIRED | Verify thumbnails render |
| Let's Talk CTA | ✅ WIRED (shared) | Already verified |

**OUT of Scope:**
- Wrapper labels (HARDCODED — no Admin fields)
- SEO fields (missing — document only)
- Related projects enhancement

**Referenced Documentation:**
- `docs/diagnostics/pages/Frontend_Projects.md` — Full section analysis

**Dependencies:** Phase 12.1 complete

**Stop Conditions:**
- If category filter fails → STOP, debug

**Expected Outcome:**
- All published projects display correctly
- Category filter works
- Images render
- Navigation to details works

**Status:** PENDING

---

### Phase 12.7: Project Details Verification

**Scope:**
- **Route:** `/project-details/:slug`
- **Component:** `ProjectDetailsPage.tsx`

**IN Scope:**
| Item | Current State | Action |
|------|---------------|--------|
| Breadcrumb | ✅ Route-driven | Verify only |
| Project Content | ✅ WIRED | Verify title, heading, description |
| Process Steps | ✅ WIRED | Verify from `project_process_steps` |
| Client Info | ✅ WIRED | Verify client, website, dates |
| Check & Launch | ✅ WIRED | Verify content and image |

**OUT of Scope:**
- Info card labels (HARDCODED — acceptable)
- SEO fields (missing — document only)

**Referenced Documentation:**
- `docs/diagnostics/pages/Frontend_ProjectDetails.md` — Full section analysis

**Dependencies:** Phase 12.6 (projects table verified)

**Stop Conditions:**
- If missing project images → Verify Media Library references

**Expected Outcome:**
- Project content displays correctly
- Process steps render in order
- Check Launch section renders if data exists
- Not-found handling for invalid slugs

**Status:** PENDING

---

### Phase 12.8: Blog Listing Verification & Gap Documentation

**Scope:**
- **Route:** `/blog`
- **Component:** `BlogPage.tsx`

**IN Scope:**
| Item | Current State | Action |
|------|---------------|--------|
| Breadcrumb | ✅ Route-driven | Verify only |
| Blog Post Grid | ✅ WIRED | Verify all posts from `blog_posts` |
| Post Images | ✅ WIRED | Verify featured images render |
| Let's Talk CTA | ✅ WIRED (shared) | Already verified |
| **Sidebar Search** | ❌ UI-ONLY | **Document as non-functional** |
| **Service List Widget** | ❌ HARDCODED | **Document as static** |
| **Newest Posts Widget** | ❌ HARDCODED | **Document as static** |
| **Popular Tags Widget** | ❌ HARDCODED | **Document as static** |
| **Banner Widget** | ❌ HARDCODED | **Document as static** |
| **Pagination** | ❌ UI-ONLY | **Document as non-functional** |

**OUT of Scope:**
- Implementing search functionality
- Wiring sidebar widgets to tables
- Implementing pagination logic
- SEO fields (missing — document only)
- Any structural template changes

**Referenced Documentation:**
- `docs/diagnostics/pages/Frontend_Blog.md` — Full section analysis with gaps

**Dependencies:** Phases 12.1-12.7 complete

**Stop Conditions:**
- None anticipated — verification and documentation only

**Expected Outcome:**
- Published blog posts display correctly
- Featured images render
- **Comprehensive gap documentation** produced

**Status:** PENDING

---

### Phase 12.9: Blog Details Verification & Gap Documentation

**Scope:**
- **Route:** `/blog/:slug`
- **Component:** `BlogDetailsPage.tsx`

**IN Scope:**
| Item | Current State | Action |
|------|---------------|--------|
| Breadcrumb | ✅ Route-driven | Verify only |
| Post Content | ✅ WIRED | Verify title, content, excerpt |
| Featured Image | ✅ WIRED | Verify image renders |
| Category Tag | ✅ WIRED (partial) | Verify 1 CMS category |
| Published Date | ✅ WIRED | Verify date formatting |
| **Quote Block** | ❌ HARDCODED | **Document as static** |
| **Banner Section** | ❌ HARDCODED | **Document as static** |
| **Author Name** | ❌ HARDCODED | **Document "Devmart Team" fallback** |
| **Tags Row (2 extra)** | ❌ HARDCODED | **Document 2 hardcoded + 1 CMS** |
| **Comments Display** | ❌ HARDCODED | **Document as static** |
| **Comment Form** | ❌ UI-ONLY | **Document as non-functional** |

**OUT of Scope:**
- Wiring comments to `blog_comments` table
- SEO fields (missing — document only)
- Any structural template changes

**Referenced Documentation:**
- `docs/diagnostics/pages/Frontend_BlogDetails.md` — Full section analysis with gaps

**Dependencies:** Phase 12.8 (blog_posts verified)

**Stop Conditions:**
- If slug routing fails → STOP, verify route pattern

**Expected Outcome:**
- Post content displays correctly
- Featured image renders
- **Comprehensive gap documentation** produced for template blocks

**Status:** PENDING

---

## Phase 12 Summary

| Sub-phase | Page | Complexity | Primary Action | Status |
|-----------|------|------------|----------------|--------|
| 12.1 | Homepage | Medium | Wrapper wiring | PENDING |
| 12.2 | About | Low | Verify only | PENDING |
| 12.3 | Contact | Low | Verify + form test | PENDING |
| 12.4 | Services | Medium | Verify only | PENDING |
| 12.5 | Service Details | Medium | Verify only | PENDING |
| 12.6 | Projects | Medium | Verify only | PENDING |
| 12.7 | Project Details | Medium | Verify only | PENDING |
| 12.8 | Blog | High | Verify + gap docs | PENDING |
| 12.9 | Blog Details | High | Verify + gap docs | PENDING |

---

## Documented Gaps (No Implementation Required)

| Gap ID | Location | Type | Documented In |
|--------|----------|------|---------------|
| GAP-001 | Homepage Services wrapper | NOT WIRED | Frontend_Home.md |
| GAP-002 | Homepage Portfolio wrapper | NOT WIRED | Frontend_Home.md |
| GAP-003 | Homepage News wrapper | NOT WIRED | Frontend_Home.md |
| GAP-004 | Services "How We Work" | HARDCODED | Frontend_Services.md |
| GAP-005 | Blog sidebar search | UI-ONLY | Frontend_Blog.md |
| GAP-006 | Blog sidebar categories | HARDCODED | Frontend_Blog.md |
| GAP-007 | Blog sidebar tags | HARDCODED | Frontend_Blog.md |
| GAP-008 | Blog sidebar posts | HARDCODED | Frontend_Blog.md |
| GAP-009 | Blog pagination | UI-ONLY | Frontend_Blog.md |
| GAP-010 | Blog Details quote | HARDCODED | Frontend_BlogDetails.md |
| GAP-011 | Blog Details banner | HARDCODED | Frontend_BlogDetails.md |
| GAP-012 | Blog Details comments | HARDCODED | Frontend_BlogDetails.md |
| GAP-013 | Blog SEO fields | MISSING | Admin_SEO_Capability_Matrix.md |
| GAP-014 | Services SEO fields | MISSING | Admin_SEO_Capability_Matrix.md |
| GAP-015 | Projects SEO fields | MISSING | Admin_SEO_Capability_Matrix.md |

---

## Guardian Rules Compliance

| Rule | Compliance |
|------|------------|
| Darkone Admin 1:1 parity | ✅ No Admin template changes proposed |
| Finibus Frontend 1:1 parity | ✅ No layout refactors proposed |
| Reuse existing files only | ✅ All phases work within existing structure |
| No Bootstrap | ✅ Not applicable |
| No custom icons | ✅ Not applicable |
| No custom animations | ✅ Not applicable |
| No font changes | ✅ Not applicable |
| No new CSS/SCSS | ✅ Not applicable |
| No undocumented assumptions | ✅ All gaps explicitly documented |

---

## Phase Gate Protocol

**Before each sub-phase can begin:**
1. Previous sub-phase marked COMPLETE
2. Explicit authorization received
3. Restore point created

**After each sub-phase:**
1. Visual verification against Finibus reference
2. Data verification against Supabase
3. Status report submitted (DONE / PARTIAL / BLOCKED)
4. Restore point updated

---

## Risks

| Phase | Risk | Mitigation |
|-------|------|------------|
| 12.1 | homepage_settings wrapper fields are NULL | Seed default values or implement fallback |
| 12.3 | Contact form fails in Lovable Preview | Known limitation — test in local/prod only |
| 12.8 | Sidebar gaps may concern stakeholders | Document clearly as template parity |
| 12.9 | Comments not functional | Document as known limitation |

---

## Confirmation

- ✅ **This deliverable is documentation-only**
- ✅ **No implementation was performed**
- ✅ **No code changes were made**
- ✅ **No database modifications**
- ✅ **All phases reference existing documentation**

---

**HARD STOP**

Implementation remains BLOCKED until this phased plan is reviewed and explicitly approved.

Awaiting further instructions.
