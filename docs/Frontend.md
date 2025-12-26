# Frontend Specification — Devmart Platform

**Status:** Implemented (MVP)  
**Phase:** Phase 6.1 COMPLETE | Phase 7 CLOSED | Phase 9 CLOSED | Phase 10A COMPLETE | Phase 10B FINALIZED | Phase 10C COMPLETE  
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

## 3. Homepage Sections — Dynamic Wiring (✅ COMPLETE)

> **Status:** Phase 7 CLOSED — All 9 sections wired to database with static fallbacks  
> **Phase 7.1:** Wiring verification + documentation (2025-12-26)  
> **Phase 7.2:** Visual verification + acceptance (2025-12-26)

### 3.0 Homepage Visual Acceptance

**Phase 7.2 Completed:** 2025-12-26

- ✅ Code wiring verified for all 9 homepage sections
- ✅ Database data verified for all data sources
- ✅ No code changes introduced
- ⚠️ Limitation: Visual verification via Lovable Preview not possible (Admin app only)

**Restore Point:** `docs/restore-points/Restore_Point_Phase_7_2_Homepage_Visual_Verification.md`

### 3.0.1 Homepage UI Blocks Editability (Phase 8)

**Phase 8 Completed:** 2025-12-26 (Verification Only)

Admin UI for homepage content control was found to be **already implemented**. The following pattern is in use:

**Admin Entry Point:**
- `PageEditModal.tsx` detects `slug === '/'` and renders Homepage-specific tabs

**Homepage Admin Tabs:**
| Tab | Component | Purpose |
|-----|-----------|---------|
| Sections | `HomepageSectionsTab.tsx` | List/toggle/edit all 9 sections |
| SEO | `HomepageSeoTab.tsx` | Meta title, description, OG image |

**Section Edit Modal:**
- `HomepageSectionEditModal.tsx` — Field editors per section type
- MediaPicker integrated for image fields
- Enable/Disable toggle per section

**Data Flow:**
```
Admin → PageEditModal → HomepageSectionsTab → HomepageSectionEditModal
                                    ↓
                           useHomepageBlocks (hook)
                                    ↓
                          homepage_settings.data (DB)
                                    ↓
                        Public Homepage Components (via useHomepageSettings)
```

**Restore Point:** `docs/restore-points/Restore_Point_Phase_8_Homepage_UI_Blocks_Verification.md`

### 3.1 Wiring Status

| Section | Component | Status | Data Source | Hook |
|---------|-----------|--------|-------------|------|
| Hero Slider | `HeroArea.tsx` | ✅ WIRED | `homepage_settings.data.hero` | `useHomepageSettings` |
| Services | `ServiceArea.tsx` | ✅ WIRED | `services` table | `useServices` |
| About + Stats | `AboutArea.tsx` | ✅ WIRED | `homepage_settings.data` | `useHomepageSettings` |
| Partners + Newsletter | `OurPartnerArea.tsx` | ✅ WIRED | `homepage_settings.data.partners` | `useHomepageSettings` + `useNewsletterSubscribe` |
| Portfolio | `PortfolioArea.tsx` | ✅ WIRED | `projects` table | `useProjects` |
| Why Choose Us | `WhyChooseUsArea.tsx` | ✅ WIRED | `homepage_settings.data.why_choose` | `useHomepageSettings` |
| Testimonials | `TestimonialArea.tsx` | ✅ WIRED | `testimonials` table | `useTestimonials` |
| Latest Blog | `NewsLatterArea.tsx` | ✅ WIRED | `blog_posts` table | `useBlogPosts` |
| CTA Strip | `LetsTalkArea.tsx` | ✅ WIRED | `homepage_settings.data.cta` | `useHomepageSettings` |

### 3.2 Hook + Fallback Pattern

All homepage components follow the "Hook + Static Fallback" pattern:

```tsx
// 1. Define static fallback data (matches original Finibus template)
const STATIC_DATA = { /* hardcoded template data */ };

// 2. Fetch from database via hook
const { data, loading, error } = useHomepageSettings(); // or useServices, etc.

// 3. Use DB data if available, otherwise fallback
const displayData = data?.property || STATIC_DATA;

// 4. Render with displayData
return <section>{/* render displayData */}</section>;
```

**Benefits:**
- **Zero-downtime:** Static fallback ensures page renders even if DB fails
- **Template parity:** Fallback data matches original Finibus template exactly
- **Gradual migration:** Content can be updated in Admin without code changes

### 3.3 Hooks Reference

| Hook | File | Purpose |
|------|------|---------|
| `useHomepageSettings` | `apps/public/src/hooks/useHomepageSettings.ts` | Fetches `homepage_settings.data` JSON |
| `useServices` | `apps/public/src/hooks/useServices.ts` | Fetches published services |
| `useProjects` | `apps/public/src/hooks/useProjects.ts` | Fetches published projects |
| `useTestimonials` | `apps/public/src/hooks/useTestimonials.ts` | Fetches published testimonials |
| `useBlogPosts` | `apps/public/src/hooks/useBlogPosts.ts` | Fetches published blog posts |
| `useNewsletterSubscribe` | `apps/public/src/hooks/useNewsletterSubscribe.ts` | INSERT to `newsletter_subscribers` |
| `useAboutPageSettings` | `apps/public/src/hooks/useAboutPageSettings.ts` | Fetches About page UI block settings |

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
| `/about` | ✅ Wired | `page_settings` (UI blocks) + `blog_posts` (Latest News) |

---

## 3.4 About Page Wiring (Phase 10C)

### 3.4.1 Data Source

| Table | Key | Purpose |
|-------|-----|---------|
| `page_settings` | `page_slug = 'about'` | UI block configuration for About page sections |

### 3.4.2 Sections Wired

| Section | Component | Status | Data Source |
|---------|-----------|--------|-------------|
| Inside Story | `InsideStoryArea.tsx` | ✅ WIRED | `page_settings.data.inside_story` |
| Latest News | `LatesNewsArea.tsx` | ✅ WIRED | `page_settings.data.latest_news` + `useBlogPosts` |
| Why Choose Us | `WhyChooseUsArea.tsx` | ✅ STATIC | Uses global homepage settings (shared) |

### 3.4.3 Hook Pattern

```tsx
// useAboutPageSettings.ts
const { insideStory, latestNews, isLoading } = useAboutPageSettings();

// Each section respects:
// - enabled flag: if false, section does not render
// - DB values with static fallbacks
```

### 3.4.4 Heading Color Parity Fix

**Issue:** WhyChooseUsArea heading was white on About page (incorrect)
**Root Cause:** `black=""` prop instead of `black="black"` in AboutPage.tsx
**Fix:** Changed to `black="black"` to apply `.title.black h2` styling (dark heading)

### 3.4.5 Date Formatting Standard

**Rule:** Public app must NOT use external date libraries (e.g., date-fns, moment).

**Implementation:** Native `Intl.DateTimeFormat` with defensive handling:

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

**Output format:** `DD Month, YYYY` (e.g., "05 January, 2021")

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

### 5.0 Admin Notification Standard (Phase 10B)

#### 5.0.1 Canonical Hook

**File:** `src/lib/notify.ts`

All Admin save-action feedback MUST use the `useAdminNotify()` hook:

```tsx
import { useAdminNotify } from '@/lib/notify'

// Inside your hook:
const { notifySuccess, notifyError, notifyInfo, notifyWarning } = useAdminNotify()
```

| Function | Usage |
|----------|-------|
| `notifySuccess(message)` | Success feedback (green) |
| `notifyError(message)` | Error feedback (red) |
| `notifyInfo(message)` | Info messages (blue) |
| `notifyWarning(message)` | Warning messages (yellow) |

#### 5.0.2 Implementation Details

**Uses Bootstrap Toast** via `useNotificationContext` for:
- ✅ UX parity with login success banner
- ✅ Top-right positioning (`position="top-end"`)
- ✅ Text-only (no icons)
- ✅ Admin-only scope (no leakage to Auth routes)
- ✅ Auto-dismiss (~2-3 seconds)

#### 5.0.3 Usage Rules

1. ❌ Do NOT use `toast.*` from react-toastify in Admin hooks/components
2. ✅ Use `useAdminNotify()` hook from `@/lib/notify`
3. Every successful save action MUST emit `notifySuccess`
4. Every failed save action MUST emit `notifyError`

#### 5.0.4 Notification Host

**File:** `src/context/useNotificationContext.tsx`

The `NotificationProvider` renders the Bootstrap Toast at `position="top-end"`. No `ToastContainer` from react-toastify is mounted globally.

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
