# Frontend Specification — Devmart Platform

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized  

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
| Future modules | Content management, lead management |

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

## 3. UI Module Inventory

### 3.1 Finibus Modules Required

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

### 3.2 Darkone Modules Available

| Category | Modules |
|----------|---------|
| Charts | ApexCharts integration |
| Tables | Basic tables, Grid.js |
| Forms | Inputs, validation, file upload |
| UI Components | 21 base UI modules |
| Maps | Vector maps, Google Maps |
| Icons | Iconify, Solar, Box icons |

---

## 4. Technology Stack

### 4.1 Shared Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| React Router | 6.x | Routing |

### 4.2 Public App (Finibus)

| Technology | Purpose |
|------------|---------|
| Bootstrap 5 | CSS framework (Finibus config) |
| SCSS | Styling |
| Swiper | Carousels |
| AOS | Scroll animations |

### 4.3 Admin App (Darkone)

| Technology | Purpose |
|------------|---------|
| Bootstrap 5 | CSS framework (Darkone config) |
| SCSS | Styling |
| React Bootstrap | Component library |
| ApexCharts | Data visualization |
| Iconify | Icon system |

---

## 5. Responsive Requirements

### 5.1 Breakpoints

Both apps follow Bootstrap 5 breakpoints:

| Breakpoint | Width |
|------------|-------|
| xs | < 576px |
| sm | ≥ 576px |
| md | ≥ 768px |
| lg | ≥ 992px |
| xl | ≥ 1200px |
| xxl | ≥ 1400px |

### 5.2 Mobile-First

- All layouts must be mobile-first
- Navigation collapses on mobile
- Touch-friendly interactions
- Performance optimized for mobile

---

## 6. Performance Requirements

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.0s |

> **Phase 2 Note:** Performance targets are measured only; do not enforce via template changes during parity.

---

## 7. Accessibility Requirements

| Requirement | Standard |
|-------------|----------|
| Keyboard navigation | Full support |
| Screen reader | ARIA labels |
| Color contrast | WCAG AA |
| Focus indicators | Visible |
| Alt text | All images |

> **Phase 2 Note:** Accessibility targets are measured only; do not enforce via template changes during parity.

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |

**Next Review:** After Phase 2 execution approval
