# Frontend Specification — Devmart Platform

**Status:** Implemented (MVP)  
**Phase:** Phase 6.1 COMPLETE | Phase 9 CLOSED | Phase 10A COMPLETE | Phase 10B Hotfix COMPLETE  
**Last Updated:** 2025-12-26

---

## 1. Application Responsibilities

### 1.1 Finibus Public Website

**Purpose:** Client-facing marketing website for lead generation and authority positioning.

**Responsibilities:**

| Area | Scope |
|------|-------|
| Brand presentation | Company identity, messaging, visuals |
| Service showcase | Capability framework, service tiers |
| Portfolio display | Case studies, project outcomes |
| Content marketing | Blog, insights, thought leadership |
| Lead generation | Contact forms, CTAs, consultation booking |
| SEO optimization | Meta tags, structured data, performance |

**Pages Required:**

- Homepage (Variant A — Agency)
- Homepage (Variant B — Creative)
- About Us
- Services
- Projects / Portfolio
- Blog Listing
- Blog Detail
- Contact

### 1.2 Darkone Admin Portal

**Purpose:** Internal operations dashboard for future content and client management.

**Responsibilities:**

| Area | Scope |
|------|-------|
| Dashboard | Overview metrics, quick actions |
| Navigation | Sidebar menu, topbar controls |
| Authentication | Login, logout, session management |
| Content Management | Blog, Projects, Services, Pages, Media, Testimonials |
| CRM | Lead management |
| Settings | Site configuration |

**Structure to Preserve:**

- Dashboard layout
- Sidebar navigation (AppMenu)
- TopNavigationBar
- Footer
- Theme/layout context
- Admin layout wrapper

---

## 2. Template Parity Rules

### 2.1 Finibus Public Website

> **"No template customization allowed"**

#### 2.1.1 Permitted Changes

| Type | Allowed |
|------|---------|
| Text content | ✅ Replace with Devmart copy |
| Images | ✅ Replace with Devmart assets |
| Links | ✅ Update hrefs to Devmart routes |

> **Note:** Colors, styling, tokens, and SCSS changes are NOT allowed in Phase 2.

#### 2.1.2 Prohibited Changes

| Type | Prohibited |
|------|------------|
| Layout structure | ❌ No grid modifications |
| Component hierarchy | ❌ No nesting changes |
| Animation logic | ❌ No motion modifications |
| Responsive breakpoints | ❌ No media query changes |
| SCSS architecture | ❌ No file restructuring |
| JavaScript logic | ❌ No behavioral changes |

#### 2.1.3 Parity Verification

Each page must pass:

1. Visual diff against Finibus reference
2. Responsive behavior matching
3. Animation timing matching
4. Interactive element matching

### 2.2 Darkone Admin Portal

> **"No template customization allowed"**

#### 2.2.1 Permitted Changes

| Type | Allowed |
|------|---------|
| Demo data | ✅ Replace with placeholders |
| Menu items | ✅ Update labels/routes |
| Dashboard widgets | ✅ Replace content |

#### 2.2.2 Prohibited Changes

| Type | Prohibited |
|------|------------|
| Layout structure | ❌ No modifications |
| SCSS theme | ❌ No customizations |
| Component library | ❌ No additions |
| Navigation logic | ❌ No behavioral changes |

---

## 3. Homepage Sections — Static by Design (Phase-Locked)

> **Authorization Status:** NOT AUTHORIZED for DB wiring

All Homepage sections remain static per Phase 6 guardrails. Wiring to database requires explicit authorization.

| Section | Current State | Data Source | Wiring Status |
|---------|---------------|-------------|---------------|
| Hero Slider | Static | Hardcoded | ❌ Not Authorized |
| Services Section | Static | Hardcoded | ❌ Not Authorized |
| About Section | Static | Hardcoded | ❌ Not Authorized |
| Partners Carousel | Static | Hardcoded | ❌ Not Authorized |
| Portfolio Section | Static | Hardcoded | ❌ Not Authorized |
| Why Choose Us | Static | Hardcoded | ❌ Not Authorized |
| Testimonials Section | Static | Hardcoded | ❌ Not Authorized |
| Latest Blog Posts | Static | Hardcoded | ❌ Not Authorized |
| Let's Talk CTA | Static | Hardcoded | ❌ Not Authorized |

**Inner Pages (Wired to DB):**

| Page | Status | Data Source |
|------|--------|-------------|
| `/services` | ✅ Wired | `services` table |
| `/service/:slug` | ✅ Wired | `services` + `service_process_steps` + `service_pricing_plans` |
| `/projects` | ✅ Wired | `projects` table |
| `/project/:slug` | ✅ Wired | `projects` + `project_process_steps` |
| `/blog` | ✅ Wired | `blog_posts` (published) |
| `/blog/:slug` | ✅ Wired | `blog_posts` + `media` |
| `/contact` | ✅ Wired | `settings` (contact info) + `leads` (form INSERT) |

---

## 4. Phase 10A — Services Pricing (PENDING)

### 4.1 Services Landing Page

| Change | Status |
|--------|--------|
| Remove pricing section from `/services` | ⏳ PENDING |

**Rationale:** Pricing should only display on individual Service Detail pages, not the Services overview.

### 4.2 Service Detail Pages

| Change | Status |
|--------|--------|
| Fix pricing table visual parity | ⏳ PENDING |

**Root Cause:** Current implementation uses custom CSS classes (`price-card`, `price-feature`) that do not exist in Finibus. The fix requires using Finibus-native classes (`single-price-box`, `feature-list`).

### 4.3 Finibus CSS Classes (Authoritative)

The following classes are the source of truth for pricing tables:

| Class | Purpose | File |
|-------|---------|------|
| `section.pricing-plan.sec-mar` | Wrapper | `_service_page.scss` |
| `div.single-price-box` | Card container | `_service_page.scss` |
| `ul.feature-list` | Feature list | `_service_page.scss` |
| `div.pay-btn` | CTA button | `_service_page.scss` |

### 4.4 Execution Status

| Item | Status |
|------|--------|
| Documentation complete | ✅ |
| Execution authorized | ❌ NOT YET |
| Restore point for execution | ⏳ Required before execution |
| `/services` | ✅ Wired | `services` table |
| `/service/:slug` | ✅ Wired | `services` + `service_process_steps` + `service_pricing_plans` |
| `/projects` | ✅ Wired | `projects` table |
| `/project/:slug` | ✅ Wired | `projects` + `project_process_steps` |
| `/blog` | ✅ Wired | `blog_posts` (published) |
| `/blog/:slug` | ✅ Wired | `blog_posts` + `media` |
| `/contact` | ✅ Wired | `settings` (contact info) + `leads` (form INSERT) |

---

## 4. UI Module Inventory

### 4.1 Finibus Modules Required

| Category | Modules |
|----------|---------|
| Headers | Header variants (multiple styles) |
| Footers | Footer with links, social, newsletter |
| Heroes | Hero sections with CTAs |
| Sliders | Testimonial carousels, project sliders |
| Cards | Service cards, team cards, blog cards |
| Counters | Animated statistics |
| Accordions | FAQ sections |
| Modals | Lightboxes, popups |
| Forms | Contact forms, newsletter signup |
| Navigation | Breadcrumbs, pagination |

### 4.2 Darkone Modules Available

| Category | Modules |
|----------|---------|
| Charts | ApexCharts integration |
| Tables | Basic tables, Grid.js |
| Forms | Inputs, validation, file upload |
| UI Components | 21 base UI modules |
| Maps | Vector maps, Google Maps |
| Icons | Iconify, Solar, Box icons |

---

## 5. Technology Stack

### 5.1 Shared Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| React Router | 6.x | Routing |

### 5.2 Public App (Finibus)

| Technology | Purpose |
|------------|---------|
| Bootstrap 5 | CSS framework (Finibus config) |
| SCSS | Styling |
| Swiper | Carousels |
| AOS | Scroll animations |

### 5.3 Admin App (Darkone)

| Technology | Purpose |
|------------|---------|
| Bootstrap 5 | CSS framework (Darkone config) |
| SCSS | Styling |
| React Bootstrap | Component library |
| ApexCharts | Data visualization |
| Iconify | Icon system |

---

## 6. Responsive Requirements

### 6.1 Breakpoints

Both apps follow Bootstrap 5 breakpoints:

| Breakpoint | Width |
|------------|-------|
| xs | < 576px |
| sm | ≥ 576px |
| md | ≥ 768px |
| lg | ≥ 992px |
| xl | ≥ 1200px |
| xxl | ≥ 1400px |

### 6.2 Mobile-First

- All layouts must be mobile-first
- Navigation collapses on mobile
- Touch-friendly interactions
- Performance optimized for mobile

---

## 7. Performance Requirements

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.0s |

> **Phase 2 Note:** Performance targets are measured only; do not enforce via template changes during parity.

---

## 8. Accessibility Requirements

| Requirement | Standard |
|-------------|----------|
| Keyboard navigation | Full support |
| Screen reader | ARIA labels |
| Color contrast | WCAG AA |
| Focus indicators | Visible |
| Alt text | All images |

> **Phase 2 Note:** Accessibility targets are measured only; do not enforce via template changes during parity.

---

## 9. Explicit Non-Goals (All Phases)

The following are explicitly out of scope for ALL phases unless separately authorized:

| Non-Goal | Rationale |
|----------|-----------|
| No shared component library | Public and Admin apps remain isolated; no cross-app component sharing |
| No Tailwind or alternative styling systems | Both apps use Bootstrap 5 + SCSS as provided by templates |
| No SCSS refactors | Template SCSS structure must remain untouched |
| No design abstraction | No design tokens, theme systems, or style abstractions beyond template defaults |
| No CMS logic | Content management is a future-phase consideration only |
| No SEO tooling beyond template defaults | SEO relies on template-provided meta tags and structure only |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-25 | Implementation Agent | Updated to Implemented (MVP), added Homepage section status |

**Next Review:** After Phase 6.2 authorization
