# Tasks — Devmart Implementation Tracker

**Status:** Verified  
**Current Phase:** Phase 10B CLOSED | Phase 7 Remaining IN PROGRESS  
**Last Updated:** 2025-12-26

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
| Phase 7 | 🔄 In Progress | Homepage Dynamic Wiring + Newsletter |
| Phase 8 | ⏸️ Deferred | Analytics (not authorized) |
| Phase 9 | ✅ CLOSED | About Page + Global Blocks (Admin UI + DB) |
| Phase 10A | ✅ COMPLETE | Services Pricing Visual Fix + Spacing Adjustment |
| Phase 10B | ✅ CLOSED | Service Detail Pricing Visibility Controls |

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

## Phase 7 — Homepage Dynamic Wiring (🔄 IN PROGRESS)

### New Database Objects

| Object | Type | Status | Notes |
|--------|------|--------|-------|
| `homepage_settings` | Table | 🔄 Creating | Single-row JSON config |
| `newsletter_subscribers` | Table | 🔄 Creating | Newsletter collection |

### Homepage Sections Wiring Status

| Section | Component | Status | Data Source |
|---------|-----------|--------|-------------|
| Hero | `HeroArea.tsx` | 🔄 Wiring | `homepage_settings.data.hero` |
| Services | `ServiceArea.tsx` | 🔄 Wiring | `services` table |
| About + Stats | `AboutArea.tsx` | 🔄 Wiring | `homepage_settings.data` |
| Newsletter + Partners | `OurPartnerArea.tsx` | 🔄 Wiring | `newsletter_subscribers` + settings |
| Portfolio | `PortfolioArea.tsx` | ✅ Wired | `projects` table (routing fixed) |
| Why Choose Us | `WhyChooseUsArea.tsx` | 🔄 Wiring | `homepage_settings.data.why_choose` |
| Testimonials | `TestimonialArea.tsx` | 🔄 Wiring | `testimonials` table |
| Latest Blog | `NewsLatterArea.tsx` | 🔄 Wiring | `blog_posts` table |
| CTA Strip | `LetsTalkArea.tsx` | 🔄 Wiring | `homepage_settings.data.cta` |

---

## Deferred Items

### Phase 8 — Analytics (⏸️ DEFERRED)

| Item | Reason |
|------|--------|
| Dashboard widgets | Not authorized |
| Usage metrics | Not authorized |
| Traffic analytics | Not authorized |

---

## Partial Items

| Item | Status | Notes |
|------|--------|-------|
| Testimonials public display | 🔶 Partial | Admin CRUD complete, Homepage section static |
| Google Maps embed | 🔶 Partial | Contact page has placeholder, Settings key not implemented |

---

## MVP Status Summary

### MVP COMPLETE ✅

- Authentication (Supabase JWT + Roles + RLS)
- All 8 Admin Modules (Media, Settings, Pages, Blog, Projects, Services, Testimonials, Leads)
- Inner page wiring (Services, Projects, Blog)
- Contact form → Leads pipeline
- Settings → Footer/Contact wiring

### MVP PARTIAL 🔶

- Testimonials public carousel (admin done, homepage static)
- Maps in Settings (not implemented)

### MVP DEFERRED ⏸️

- Homepage DB wiring (all 9 sections)
- Analytics dashboard
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

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-25 | Implementation Agent | Phase 5 + 6.1 complete, MVP baseline |
| 1.1 | 2025-12-25 | Implementation Agent | Phase 7.2 complete — Routing/404/Image parity |
| 1.2 | 2025-12-26 | Implementation Agent | Phase 9 CLOSED — About Page + Global Blocks |
| 1.3 | 2025-12-26 | Implementation Agent | Phase 10A COMPLETE, Phase 10B CLOSED — Pricing controls |

**Next Review:** Before Phase 10C or Phase 11 authorization
