# Frontend Specification — Devmart Platform

**Status:** Implemented (MVP)  
**Phase:** Phase 6.1 COMPLETE | Phase 7 CLOSED | Phase 9 CLOSED | Phase 10A COMPLETE | Phase 10B FINALIZED | Phase 10C COMPLETE | Phase 11 COMPLETE  
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
| `useBrandingColors` | `apps/public/src/hooks/useBrandingColors.ts` | Fetches branding colors from settings (Phase 11) |

### 3.5 Branding Colors System (Phase 11)

**Status:** Root-Cause Fix Complete — Full Color Control

**Data Flow:**
```
Admin Settings (BrandingSettingsTab)
        ↓
  settings table (Supabase)
  [primary_color, secondary_color, accent_color,
   primary_gradient_start, primary_gradient_end]
        ↓
  useBrandingColors hook (apps/public)
        ↓
  BrandingProvider (App.tsx wrapper)
        ↓
  CSS Variables on :root
  [--color-primary, --color-secondary, --color-accent,
   --color-primary-grad-start, --color-primary-grad-end]
        ↓
  index.scss Consumption Layer (override selectors)
        ↓
  Finibus elements display DB-driven colors
```

**Implementation Files:**
| File | Purpose |
|------|---------|
| `apps/public/src/hooks/useBrandingColors.ts` | Fetch branding colors from settings table |
| `apps/public/src/components/providers/BrandingProvider.tsx` | Inject CSS variables on :root |
| `apps/public/src/App.tsx` | Wraps Routes with BrandingProvider |
| `apps/public/src/index.scss` | Consumption layer: maps Finibus selectors to CSS vars |

**CSS Variables (Finibus Defaults as Fallbacks):**
| Variable | Default Value | Purpose |
|----------|---------------|---------|
| `--color-primary` | `#D90A2C` | Main brand color (solid) |
| `--color-secondary` | `#17161A` | Secondary/dark color |
| `--color-accent` | `#F7941D` | Accent highlights |
| `--color-primary-grad-start` | `#D90A2C` | Gradient start (buttons) |
| `--color-primary-grad-end` | `#730000` | Gradient end (buttons) |

**Guardian Rules Enforced:**
- ✅ Finibus typography LOCKED (no font changes)
- ✅ No Bootstrap usage
- ✅ No new CSS/SCSS files (uses existing index.scss)
- ✅ Existing Finibus SCSS untouched (overrides only)
- ✅ CSS variables only (runtime injection)

### 3.5.1 Finibus Color Map Contract

**Purpose:** Documents all Finibus selectors that use hardcoded colors and their mapping to CSS variables.

#### Primary Color (`--color-primary`) — Solid Uses

| Selector | Property | Page/Section | Notes |
|----------|----------|--------------|-------|
| `.service-icon i` | `background-color` | Services section | Circular icon bg |
| `.service-content a` | `color` | Services section | "Read More" links |
| `.title span` | `color` | All sections | Section label text |
| `.title span::before` | `background-color` | All sections | Underline accent |
| `.main-nav ul li a.active` | `color` | Header | Active nav link |
| `.main-nav ul li a:hover` | `color` | Header | Nav hover |
| `.breadcrumb-wrapper span a` | `color` | Breadcrumb | Active crumb |
| `.scroll-top.opacity span` | `border-color`, `color` | Footer | Scroll button |
| `.swiper-pagination-bullet-active` | `background-color` | Sliders | Active bullet |
| `.play-btn .popup-video` | `background-color` | About section | Play button |
| `.footer-area .social-list li a:hover` | `background-color` | Footer | Social hover |
| `.CircularProgressbar-path` | `stroke` | About/Why Choose | Progress bars |
| `.CircularProgressbar-text` | `fill` | About/Why Choose | Progress text |

#### Primary Color (`--color-primary-grad-*`) — Gradient Uses

| Selector | Property | Page/Section | Notes |
|----------|----------|--------------|-------|
| `.cmn-btn a` | `background: linear-gradient(...)` | All CTAs | Main CTA buttons |
| `.nav-pills .nav-link.active` | `background: linear-gradient(...)` | Service pricing | Active tab |
| `.nav-pills .nav-link:hover` | `background: linear-gradient(...)` | Service pricing | Tab hover |
| `.project-filter-tab li.active` | `background: linear-gradient(...)` | Portfolio | Active filter |
| `.project-filter-tab li:hover` | `background: linear-gradient(...)` | Portfolio | Filter hover |
| `.subscribe-form input[type="submit"]` | `background: linear-gradient(...)` | Newsletter | Subscribe btn |
| `.pay-btn a` | `background: linear-gradient(...)` | Pricing | Pricing CTA |

#### Secondary Color (`--color-secondary`)

| Selector | Property | Page/Section | Notes |
|----------|----------|--------------|-------|
| `.cmn-btn a:hover::before` | `background-color` | CTAs | Hover overlay |
| Various dark sections | `background-color` | Multiple | Dark backgrounds |

#### Accent Color (`--color-accent`)

Reserved for future use. Finibus does not actively use `#F7941D` in core elements.

### 3.5.2 Consumption Layer Architecture

The consumption layer lives in `apps/public/src/index.scss` as a clearly delimited section at the end of the file.

**Key Principles:**
1. **Target the correct element:** If Finibus applies a gradient to `.cmn-btn a`, override `.cmn-btn a`, not `.cmn-btn`
2. **Override gradients properly:** Use `background: var(...) !important` with `background-image: none !important`
3. **Use fallbacks:** Always include Finibus default as fallback: `var(--color-primary, #D90A2C)`
4. **Minimal overrides:** Only override color properties, never layout/spacing
5. **No dead selectors:** Only include selectors that exist in Finibus DOM

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

## 10. Phase 11 — Settings Module Branding (Step 4 COMPLETE)

### 10.1 Branding Color Pickers (Admin — Step 3)

**Status:** ✅ Implemented

Admin Settings → Branding tab now includes editable color pickers for:

| Setting Key | Default Value | Purpose |
|-------------|---------------|---------|
| `primary_color` | `#D90A2C` | Main brand color (buttons, links) |
| `secondary_color` | `#17161A` | Secondary brand color (headers, dark sections) |
| `accent_color` | `#F7941D` | Accent color (highlights, CTAs) |

### 10.2 Admin UI Pattern

Each color picker uses a dual-input pattern:
- `type="color"` — Native color picker swatch
- `type="text"` — Hex value input (e.g., `#D90A2C`)

Both inputs are bound to the same form value and sync on change.

### 10.3 Public Branding Hook (Step 4)

**Status:** ✅ Implemented

**File:** `apps/public/src/hooks/useBrandingColors.ts`

**Usage:**
```tsx
import { useBrandingColors } from '../hooks/useBrandingColors';

const { colors, isLoading, error } = useBrandingColors();
// colors.primaryColor   → '#D90A2C' (or DB value)
// colors.secondaryColor → '#17161A' (or DB value)
// colors.accentColor    → '#F7941D' (or DB value)
```

**Behavior:**
- Fetches branding keys from `settings` table
- Validates hex format (`#RRGGBB`)
- Returns Finibus defaults if DB values missing/invalid
- No UI breakage on network error

### 10.4 Data Flow

```
Admin → BrandingSettingsTab → handleChange → formValues → updateSettings
                                                              ↓
                                                      settings table (DB)
                                                              ↓
                                               useBrandingColors (Public Hook)
                                                              ↓
                                                     (Step 5 pending)
                                                              ↓
                                                  Public Frontend CSS Variables
```

### 10.5 Guardian Rules Verified

- ✅ Fonts remain locked (Finibus 1:1)
- ✅ No layout changes
- ✅ No Bootstrap customization
- ✅ No custom CSS/SCSS
- ✅ Admin-only scope (Step 3)
- ✅ Public app only (Step 4)
- ✅ Uses existing React-Bootstrap Form components (Admin)
- ✅ No new dependencies

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-25 | Implementation Agent | Updated to Implemented (MVP), added Homepage section status |
| 1.1 | 2025-12-26 | Implementation Agent | Phase 11 Step 3 — Branding color pickers |

**Next Review:** After Phase 11 Step 4 (Frontend Hook)
