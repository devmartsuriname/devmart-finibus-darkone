# Frontend Uniformity Library

**Status:** DOCUMENTATION ONLY  
**Phase:** Phase 6 (Quote Wizard Planning)  
**Execution:** NOT AUTHORIZED  
**Last Updated:** 2025-12-31

---

## Purpose

This document maps ALL reusable frontend elements in the Devmart public app (Finibus). It serves as the canonical reference for:

1. Identifying reusable components for future pages (Quote Wizard, etc.)
2. Preventing UI fragmentation and inconsistency
3. Ensuring template parity is maintained

**IMPORTANT:** No new components may be designed until this document exists and is approved.

---

## Directory Structure

```
apps/public/src/components/
├── common/           # Global reusable components
│   ├── Breadcrumb.tsx
│   ├── CartFilter.tsx
│   ├── DynamicHead.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LetsTalkArea.tsx
│   ├── Pagination.tsx
│   ├── TestimonialArea.tsx
│   └── WhyChooseUsArea.tsx
├── pages/            # Page-specific components
│   ├── Home/
│   ├── Home2/
│   ├── ServiceDetails/
│   ├── aboutUs/
│   ├── blog/
│   ├── blogDetails/
│   ├── blogStandard/
│   ├── commingSoon/
│   ├── contact/
│   ├── projectDetails/
│   ├── projects/
│   ├── service/
│   └── Error/
├── data/             # Static data files
└── providers/        # Context providers
```

---

## Global Components (common/)

### Header

| Property | Value |
|----------|-------|
| **Component Name** | `Header` |
| **File Path** | `apps/public/src/components/common/Header.tsx` |
| **Used On** | All pages (global) |
| **Props/Variations** | None (settings-driven) |
| **Reuse for Wizard** | **NO** — Global navigation, not wizard content |

**Description:** Sticky navigation header with logo, nav links, mobile hamburger menu, and "Get a quote" CTA button. Settings-driven via `usePublicSettings`.

---

### Footer

| Property | Value |
|----------|-------|
| **Component Name** | `Footer` |
| **File Path** | `apps/public/src/components/common/Footer.tsx` |
| **Used On** | All pages (global) |
| **Props/Variations** | None (settings-driven) |
| **Reuse for Wizard** | **NO** — Global footer, not wizard content |

**Description:** 4-column footer with logo, service links, company links, and contact info. Includes scroll-to-top button. Settings-driven via `usePublicSettings`.

---

### Breadcrumb

| Property | Value |
|----------|-------|
| **Component Name** | `Breadcrumb` |
| **File Path** | `apps/public/src/components/common/Breadcrumb.tsx` |
| **Used On** | All inner pages (About, Services, Projects, Blog, Contact, etc.) |
| **Props/Variations** | `pageName: string` |
| **Reuse for Wizard** | **YES** — Page header pattern for wizard page |

**Description:** Hero-style page header with page title and breadcrumb trail (Home → Page Name). Full-width background section.

**Usage Pattern:**
```tsx
<Breadcrumb pageName="Get a Quote" />
```

---

### LetsTalkArea

| Property | Value |
|----------|-------|
| **Component Name** | `LetsTalkArea` |
| **File Path** | `apps/public/src/components/common/LetsTalkArea.tsx` |
| **Used On** | Most inner pages (About, Services, Service Details, Projects, etc.) |
| **Props/Variations** | None (CMS-driven via `useHomepageSettings`) |
| **Reuse for Wizard** | **YES** — Footer CTA section for wizard page |

**Description:** Pre-footer CTA section with "Let's Talk" heading and "Get In Touch" button. Content driven by `homepage_settings.cta`.

---

### TestimonialArea

| Property | Value |
|----------|-------|
| **Component Name** | `TestimonialArea` |
| **File Path** | `apps/public/src/components/common/TestimonialArea.tsx` |
| **Used On** | Homepage, About page |
| **Props/Variations** | None (DB-driven via `useTestimonials`) |
| **Reuse for Wizard** | **NO** — Testimonial carousel, not wizard content |

**Description:** Swiper carousel displaying client testimonials with ratings, avatars, quotes.

---

### WhyChooseUsArea

| Property | Value |
|----------|-------|
| **Component Name** | `WhyChooseUsArea` |
| **File Path** | `apps/public/src/components/common/WhyChooseUsArea.tsx` |
| **Used On** | Homepage |
| **Props/Variations** | None (CMS-driven) |
| **Reuse for Wizard** | **NO** — Homepage section, not wizard content |

**Description:** Feature comparison section with video modal capability.

---

### DynamicHead

| Property | Value |
|----------|-------|
| **Component Name** | `DynamicHead` |
| **File Path** | `apps/public/src/components/common/DynamicHead.tsx` |
| **Used On** | App.tsx (global) |
| **Props/Variations** | None (settings-driven) |
| **Reuse for Wizard** | **NO** — SEO utility, not UI component |

**Description:** Helmet-based dynamic meta tag injection for site-wide SEO defaults.

---

### Pagination

| Property | Value |
|----------|-------|
| **Component Name** | `Pagination` |
| **File Path** | `apps/public/src/components/common/Pagination.tsx` |
| **Used On** | Blog, Projects (listing pages) |
| **Props/Variations** | TBD (currently limited functionality) |
| **Reuse for Wizard** | **NO** — List pagination, not wizard flow |

**Description:** Page navigation for listing pages. Currently limited/hardcoded per GAP Registry.

---

### CartFilter

| Property | Value |
|----------|-------|
| **Component Name** | `CartFilter` |
| **File Path** | `apps/public/src/components/common/CartFilter.tsx` |
| **Used On** | Limited usage |
| **Props/Variations** | TBD |
| **Reuse for Wizard** | **NO** — Filter utility, not wizard content |

**Description:** Filtering component for project/service categories.

---

## Page-Specific Components

### ServiceDetails Module

#### PriceBox

| Property | Value |
|----------|-------|
| **Component Name** | `PriceBox` |
| **File Path** | `apps/public/src/components/pages/ServiceDetails/PriceBox.tsx` |
| **Used On** | Service Details page (pricing section) |
| **Props** | `planName`, `planSubtitle`, `priceAmount`, `currency`, `billingPeriod`, `features`, `ctaLabel` |
| **Reuse for Wizard** | **YES** — Tier selection cards with price display |

**Description:** Individual pricing plan card with plan name, price, feature list, and CTA button. Used in 3-column grid layout.

**Usage Pattern:**
```tsx
<PriceBox
  planName="Professional"
  priceAmount={199}
  currency="USD"
  billingPeriod="monthly"
  features={["Feature 1", "Feature 2"]}
  ctaLabel="Get Started"
/>
```

---

#### ServicePrice

| Property | Value |
|----------|-------|
| **Component Name** | `ServicePrice` |
| **File Path** | `apps/public/src/components/pages/ServiceDetails/ServicePrice.tsx` |
| **Used On** | Service Details page |
| **Props** | `pricingPlans[]`, `monthlyEnabled`, `yearlyEnabled` |
| **Reuse for Wizard** | **YES** — Billing period toggle pattern |

**Description:** Pricing section container with monthly/yearly toggle tabs and PriceBox grid.

---

### Contact Module

#### ContactForm

| Property | Value |
|----------|-------|
| **Component Name** | `ContactForm` |
| **File Path** | `apps/public/src/components/pages/contact/ContactForm.tsx` |
| **Used On** | Contact page |
| **Props/Variations** | None (self-contained with validation) |
| **Reuse for Wizard** | **YES** — Form pattern with validation and honeypot |

**Description:** Contact form with name, email, subject, message fields. Includes honeypot spam prevention, client-side validation, and Supabase leads insertion.

**Key Patterns:**
- Input validation with error messages
- Honeypot anti-spam field
- Success/error toast notifications
- Form state management

---

#### ContactUsArea

| Property | Value |
|----------|-------|
| **Component Name** | `ContactUsArea` |
| **File Path** | `apps/public/src/components/pages/contact/ContactUsArea.tsx` |
| **Used On** | Contact page |
| **Props/Variations** | None |
| **Reuse for Wizard** | **NO** — Contact page specific layout |

**Description:** Contact page section with contact info cards.

---

### Blog Module

#### BlogCart

| Property | Value |
|----------|-------|
| **Component Name** | `BlogCart` |
| **File Path** | `apps/public/src/components/pages/blog/BlogCart.tsx` |
| **Used On** | Blog listing, Homepage, Blog sidebar |
| **Props** | `tag`, `postImg`, `title`, `excerpt`, `postDate`, `slug` |
| **Reuse for Wizard** | **NO** — Blog-specific card |

**Description:** Blog post card with featured image, category tag, title, excerpt, and date.

---

#### SidebarSearch

| Property | Value |
|----------|-------|
| **Component Name** | `SidebarSearch` |
| **File Path** | `apps/public/src/components/pages/blog/SidebarSearch.tsx` |
| **Used On** | Blog sidebar |
| **Props/Variations** | None |
| **Reuse for Wizard** | **NO** — Non-functional per GAP Registry |

**Description:** Search input in blog sidebar. Currently non-functional (visual only).

---

#### ServiceList

| Property | Value |
|----------|-------|
| **Component Name** | `ServiceList` |
| **File Path** | `apps/public/src/components/pages/blog/ServiceList.tsx` |
| **Used On** | Blog sidebar |
| **Props/Variations** | None (hardcoded service list) |
| **Reuse for Wizard** | **NO** — Sidebar widget, hardcoded content |

**Description:** Service category list in blog sidebar.

---

#### PopularTag

| Property | Value |
|----------|-------|
| **Component Name** | `PopularTag` |
| **File Path** | `apps/public/src/components/pages/blog/PopularTag.tsx` |
| **Used On** | Blog sidebar |
| **Props/Variations** | None (hardcoded tags) |
| **Reuse for Wizard** | **NO** — Blog-specific widget |

**Description:** Tag cloud widget in blog sidebar.

---

### Home Module

#### HeroArea

| Property | Value |
|----------|-------|
| **Component Name** | `HeroArea` |
| **File Path** | `apps/public/src/components/pages/Home/HeroArea.tsx` |
| **Used On** | Homepage |
| **Props/Variations** | None (CMS-driven via `useHomepageSettings`) |
| **Reuse for Wizard** | **NO** — Homepage-specific hero slider |

**Description:** Swiper-based hero carousel with slides, CTAs, and background images.

---

#### ServiceArea

| Property | Value |
|----------|-------|
| **Component Name** | `ServiceArea` |
| **File Path** | `apps/public/src/components/pages/Home/ServiceArea.tsx` |
| **Used On** | Homepage |
| **Props/Variations** | None (DB-driven via `useServices`) |
| **Reuse for Wizard** | **PARTIAL** — Service card pattern reusable |

**Description:** Service cards grid with icon, title, description, and "Learn More" link.

**Reusable Pattern:** Service card structure (icon + title + description + link)

---

#### PortfolioArea

| Property | Value |
|----------|-------|
| **Component Name** | `PortfolioArea` |
| **File Path** | `apps/public/src/components/pages/Home/PortfolioArea.tsx` |
| **Used On** | Homepage |
| **Props/Variations** | None (DB-driven via `useProjects`) |
| **Reuse for Wizard** | **NO** — Portfolio carousel, not wizard content |

**Description:** Swiper carousel of featured projects.

---

#### NewsLatterArea

| Property | Value |
|----------|-------|
| **Component Name** | `NewsLatterArea` |
| **File Path** | `apps/public/src/components/pages/Home/NewsLatterArea.tsx` |
| **Used On** | Homepage |
| **Props/Variations** | None |
| **Reuse for Wizard** | **NO** — Newsletter subscription section |

**Description:** Newsletter signup section with email input and blog post previews.

---

## CSS/SCSS Patterns

### Button Classes

| Class | Usage | Reuse for Wizard |
|-------|-------|------------------|
| `.cmn-btn a` | Primary CTA buttons | **YES** |
| `.about-btn` | Secondary/outline buttons | **YES** |
| `.work-btn` | Work/action links | **YES** |
| `.pay-btn a` | Pricing CTA buttons | **YES** |
| `.nav-link` | Tab/pill buttons | **YES** |

---

### Section Classes

| Class | Purpose | Reuse for Wizard |
|-------|---------|------------------|
| `.sec-pad` | Standard section padding | **YES** |
| `.sec-mar` | Standard section margin | **YES** |
| `.title` | Section title block | **YES** |
| `.title.black` | Dark section title variant | **YES** |
| `.title.special` | Special title styling | **YES** |

---

### Grid Patterns

| Pattern | Classes | Usage | Reuse for Wizard |
|---------|---------|-------|------------------|
| 3-column | `col-md-6 col-lg-4 col-xl-4` | PriceBox, Service cards | **YES** |
| 2-column | `col-lg-6 col-xl-6` | Contact form layout | **YES** |
| Sidebar | `col-lg-8` + `col-lg-4` | Blog/Service details | **NO** |
| Full-width | `col-12` | Single column sections | **YES** |

---

### Form Classes

| Class | Purpose | Reuse for Wizard |
|-------|---------|------------------|
| `form-control` | Input fields (Bootstrap) | **YES** |
| `form-group` | Input wrapper | **YES** |
| `.contact-form` | Contact form wrapper | **YES** |
| `.input-group` | Input with button | **YES** |

---

## Component Reuse Matrix for Quote Wizard

| Wizard Section | Reusable Component | Source File | Adaptation Needed |
|----------------|-------------------|-------------|-------------------|
| Page Header | `Breadcrumb` | `common/Breadcrumb.tsx` | Pass `pageName` prop |
| Service Selection | Service card pattern | `Home/ServiceArea.tsx` | Add checkbox/selection state |
| Tier Selection | `PriceBox` | `ServiceDetails/PriceBox.tsx` | Add radio selection state |
| Billing Toggle | Tab pattern | `ServiceDetails/ServicePrice.tsx` | Extract toggle logic |
| Contact Form | `ContactForm` pattern | `contact/ContactForm.tsx` | Add quote-specific fields |
| Footer CTA | `LetsTalkArea` | `common/LetsTalkArea.tsx` | None (use as-is) |
| Primary Buttons | `.cmn-btn` class | CSS patterns | None (use as-is) |

---

## Non-Reusable Components (Page-Specific)

These components are tightly coupled to specific pages and should NOT be reused:

| Component | Reason |
|-----------|--------|
| `HeroArea` | Homepage-specific slider with complex Swiper config |
| `PortfolioArea` | Portfolio-specific carousel |
| `TestimonialArea` | Testimonial-specific carousel |
| `WhyChooseUsArea` | Homepage-specific section with video modal |
| `BlogCart` | Blog-specific card with post metadata |
| `SidebarSearch` | Non-functional (GAP Registry) |
| `ServiceList` | Hardcoded content |
| `PopularTag` | Blog-specific widget |

---

## Summary

### Reusable for Quote Wizard

| Category | Components/Patterns |
|----------|---------------------|
| **Page Structure** | Breadcrumb, LetsTalkArea |
| **Pricing** | PriceBox, ServicePrice (toggle pattern) |
| **Forms** | ContactForm pattern, validation patterns, honeypot |
| **Buttons** | .cmn-btn, .pay-btn, .nav-link |
| **Layout** | .sec-pad, .sec-mar, 3-column grid |

### Not Reusable

| Category | Reason |
|----------|--------|
| **Carousels** | Page-specific Swiper configurations |
| **Blog widgets** | Blog-specific, some non-functional |
| **Homepage sections** | Tightly coupled to homepage layout |

---

## Document Status

- **Status:** Draft
- **Phase:** Planning Only
- **Execution:** Not Authorized
- **Next Step:** Quote Wizard Planning Document
