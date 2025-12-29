# Frontend Diagnostic: Service Details Page (Template)

**Route:** `/service-details/:slug`  
**Component:** `apps/public/src/components/pages/ServiceDetails/ServiceDetailsPage.tsx`  
**Purpose:** Detailed Service Info + Conversion  
**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Swapability Labels, Wiring Status)

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/service-details/:slug` |
| Page Name | Dynamic (service title) |
| Primary Purpose | Detailed service info, pricing display, conversion |
| SEO Type | Entity detail page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

**Swapable via CMS:** YES  
**Reason:** Service title from CMS drives breadcrumb  
**Admin Fields Available:** `services.title`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Page Title (H1) | Dynamic service title | 10–25 chars | 10–40 | B (services.title) | High |
| Breadcrumb Trail | "Home > {Service Title}" | varies | - | HARDCODED + CMS | Medium |

**Heading Structure:** H1 (service title)

---

### 2. Service Content (`ServiceDetailsWrapper.tsx`)

**Swapable via CMS:** YES  
**Reason:** Fully CMS-driven from `services` table  
**Admin Fields Available:** `title`, `full_description`, `icon_media_id`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Service Title (H3) | e.g., "Web Design" | 10–25 chars | 10–40 | B (services.title) | High |
| Full Description | Rich HTML content | 500–2000 chars | 400–3000 | B (services.full_description) | High |
| Service Icon | Icon image | - | - | B (services.icon_media_id) | Low (alt) |
| Search Placeholder | "Search Here" | 11 chars | 10–20 | HARDCODED | None |

**Heading Structure:** H3 (service title)

**Layout Sensitivity:** 8-column main content, 4-column sidebar. Description supports multi-paragraph HTML.

---

### 3. Sidebar (`ServiceDetailsWrapper.tsx`)

**Swapable via CMS:** YES  
**Reason:** Published services list from CMS  
**Admin Fields Available:** `services` table (all published)  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Sidebar Title (H4) | "Services" | 8 chars | 6–15 | HARDCODED | Low |
| Service Links | e.g., "Web Design", "SEO" | 10–25 chars | 10–30 | B (services.title) | Medium |
| Active Indicator | Arrow icon on current | - | - | Logic-driven | None |

**Layout Sensitivity:** Sidebar is fixed-width (4 columns). Service names should stay under 30 chars.

---

### 4. Process Steps Section (`ServiceDetailsWrapper.tsx`)

**Swapable via CMS:** YES  
**Reason:** Fully CMS-driven from `service_process_steps` table  
**Admin Fields Available:** `step_number`, `title`, `description`, `image_media_id`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Title (H3) | "How We Work in our services" | 27 chars | 20–40 | HARDCODED | Medium |
| Step Number | "01", "02", "03" | 2 chars | 2 | B (step_number) | None |
| Step Title (H4) | e.g., "Brainstorm & Wireframe" | 20–30 chars | 15–40 | B (title) | Low |
| Step Description | Process step details | 100–300 chars | 80–400 | B (description) | Low |
| Step Image | Process illustration | - | - | B (image_media_id) | Low (alt) |

**Heading Structure:** H3 (section title) → H4 (step titles)

**Layout Sensitivity:** Alternating left/right layout. Steps 1,3 = content left, Steps 2 = content right. 3 steps seeded per service.

**Conditional Rendering:** Only renders if `service_process_steps` exist for the service.

---

### 5. Pricing Section (`ServicePrice.tsx`)

**Swapable via CMS:** YES  
**Reason:** Fully CMS-driven from `service_pricing_plans` table  
**Admin Fields Available:** `plan_name`, `plan_subtitle`, `price_amount`, `billing_period`, `features[]`, `cta_label`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Title (H2) | "Choose Your Pricing Plan" | 24 chars | 20–35 | HARDCODED | Low |
| Tab: Monthly | "Monthly" | 7 chars | 6–10 | HARDCODED | None |
| Tab: Yearly | "Yearly" | 6 chars | 5–10 | HARDCODED | None |
| Plan Name (H5) | e.g., "Small Business" | 14 chars | 10–25 | B (plan_name) | Medium |
| Plan Subtitle | e.g., "Best for startups" | 18 chars | 15–30 | B (plan_subtitle) | Low |
| Price Amount | e.g., "$299" | 4–6 chars | 3–10 | B (price_amount) | None |
| Price Period | "monthly" / "yearly" | 6–7 chars | 6–10 | B (billing_period) | None |
| Feature Items | e.g., "5 Pages Included" | 15–25 chars | 10–40 | B (features[]) | Low |
| CTA Label | e.g., "Get Started" | 11 chars | 8–20 | B (cta_label) | Low |

**Heading Structure:** H2 (section) → H5 (plan names)

**Layout Sensitivity:** 3-column grid for plans. Monthly/Yearly tabs switch pricing. Feature lists support 5+ items.

**Conditional Rendering:** Only renders if `service.show_pricing = true` AND plans exist.

**Note:** Pricing is DISPLAY ONLY — no payment integration (links to Contact/Quote Wizard in future).

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| Sidebar Service Links | Sidebar | `/service-details/{slug}` | Navigation | CMS |
| "Get Started" (×3) | Pricing Cards | `/contact` (placeholder) | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | Service title (breadcrumb) | Primary keyword |
| H3 | Heading | Service title (content) | Reinforcement |
| H3 | Heading | "How We Work..." section | Secondary keyword |
| H4s | Headings | Step titles | Long-tail keywords |
| H5s | Headings | Pricing plan names | Entity names |
| Full Description | Rich text | Service details | High SEO value |

---

## Swapability Summary

| Section | Swapable | Admin Fields Exist | Public Wired | Gap |
|---------|----------|-------------------|--------------|-----|
| Breadcrumb | ✅ YES | ✅ | ✅ | None |
| Service Content | ✅ YES | ✅ | ✅ | None |
| Sidebar | ✅ YES | ✅ | ✅ | None |
| Process Steps | ✅ YES | ✅ | ✅ | None |
| Pricing Section | ✅ YES | ✅ | ✅ | None |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 5 |
| Fully CMS-Driven | ✅ All sections |
| CMS-Driven Fields | ~30+ per service (with steps + plans) |
| Hardcoded Labels | ~10 (section titles, tabs) |
| CTAs | 5+ |
| Conditional Sections | 2 (Process Steps, Pricing) |

---

## Service-Specific Data Fields

| Field | Table | Column | Admin Modal Tab |
|-------|-------|--------|----------------|
| Title | services | title | Basic Info |
| Slug | services | slug | Basic Info |
| Short Description | services | short_description | Basic Info |
| Full Description | services | full_description | Basic Info |
| Icon | services | icon_media_id | Basic Info |
| Display Order | services | display_order | Basic Info |
| Status | services | status | Basic Info |
| Show Pricing | services | show_pricing | Basic Info |
| Monthly Enabled | services | pricing_monthly_enabled | Basic Info |
| Yearly Enabled | services | pricing_yearly_enabled | Basic Info |
| Step Title | service_process_steps | title | Process Steps |
| Step Description | service_process_steps | description | Process Steps |
| Step Image | service_process_steps | image_media_id | Process Steps |
| Plan Name | service_pricing_plans | plan_name | Pricing Plans |
| Plan Price | service_pricing_plans | price_amount | Pricing Plans |
| Plan Features | service_pricing_plans | features (JSON) | Pricing Plans |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
