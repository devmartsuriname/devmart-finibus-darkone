# Frontend Diagnostic: Service Details Page (Template)

**Route:** `/service-details/:slug`  
**Component:** `apps/public/src/components/pages/ServiceDetails/ServiceDetailsPage.tsx`  
**Purpose:** Mixed (Informational + Conversion)  
**Last Verified:** 2025-12-29

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/service-details/:slug` |
| Page Name | Dynamic (service title) |
| Primary Purpose | Detailed service info, pricing, conversion |
| SEO Type | Entity detail page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Page Title (H1) | Dynamic service title | 10–25 chars | 10–40 | CMS (B) | High |
| Breadcrumb Trail | "Home > {Service Title}" | varies | - | HARDCODED + CMS | Medium |

**Heading Structure:** H1 (service title)

**Data Source Status:** CMS-driven via service title from `services` table

---

### 2. Service Content (`ServiceDetailsWrapper.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Service Title (H3) | e.g., "Web Design" | 10–25 chars | 10–40 | CMS (B) | High |
| Full Description | Long-form service description | 500–2000 chars | 400–3000 | CMS (B) | High |
| Search Placeholder | "Search Here" | 11 chars | 10–20 | HARDCODED | None |
| Sidebar Title (H4) | "Services" | 8 chars | 8–15 | HARDCODED | Low |
| Sidebar Service Links | Dynamic list of all services | varies | 10–40 each | CMS (B) | Medium |

**Heading Structure:** H3 (service title) → H4 (sidebar)

**Layout Sensitivity:**
- Main content: 8-column width
- Sidebar: 4-column width
- Full description supports rich text / HTML
- Long descriptions scroll naturally

**Data Source Status:**
- Service data: CMS-driven via `services` table
- Sidebar links: CMS-driven (all published services)
- Sidebar title: HARDCODED

---

### 3. Process Steps Section (within `ServiceDetailsWrapper.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Title (H3) | "How We Work in our services" | 27 chars | 20–40 | HARDCODED | Medium |
| Step Number | "01", "02", "03", etc. | 2 chars | 2 | CMS (B) | None |
| Step Title (H4) | e.g., "Brainstorm & Wireframe" | 20–30 chars | 15–40 | CMS (B) | Low |
| Step Description | Process step details | 100–300 chars | 80–400 | CMS (B) | Low |

**Heading Structure:** H3 (section) → H4 (step titles)

**Layout Sensitivity:**
- Alternating layout: odd steps (content left, image right), even steps (image left, content right)
- Step images are optional
- Section only renders if `processSteps.length > 0`

**Data Source Status:**
- CMS-driven via `service_process_steps` table
- Conditional render (no steps = no section)

---

### 4. Pricing Section (`ServicePrice.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Title (H2) | "Choose Your Pricing Plan" | 24 chars | 20–35 | HARDCODED | Low |
| Tab Labels | "Monthly", "Yearly" | 7–8 chars | 6–10 | HARDCODED | None |
| Plan Name (H5) | e.g., "Small Business" | 14 chars | 10–25 | CMS (B) | Medium |
| Plan Subtitle | e.g., "Best for startups" | 18 chars | 15–30 | CMS (B) | Low |
| Price Amount | e.g., "$299" | 4–6 chars | 3–10 | CMS (B) | None |
| Price Period | "monthly" / "yearly" | 6–7 chars | 6–10 | CMS (B) | None |
| Feature Items | e.g., "5 Pages Included" | 15–25 chars | 10–40 | CMS (B) | Low |
| CTA Label | e.g., "Get Started" | 11 chars | 8–20 | CMS (B) | Low |

**Heading Structure:** H2 (section) → H5 (plan names)

**Layout Sensitivity:**
- 3-column grid for pricing cards
- Feature list supports 5–10 items typically
- Long feature text may wrap
- Monthly/Yearly tabs toggle visibility

**Data Source Status:**
- CMS-driven via `service_pricing_plans` table
- Visibility controlled by `services.show_pricing`, `pricing_monthly_enabled`, `pricing_yearly_enabled`
- Conditional render (show_pricing = false hides section)

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| Sidebar Service Links | Sidebar | `/service-details/{slug}` | Navigation | CMS |
| "Get Started" (×3) | Pricing Cards | External / Contact | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | Service title (breadcrumb) | Primary keyword |
| H3 | Heading | Service title (content) | Reinforcement |
| H3 | Heading | "How We Work..." | Secondary keyword |
| H4s | Headings | Process step titles | Long-tail keywords |
| H5s | Headings | Pricing plan names | Entity names |
| Full Description | Body text | Rich text content | High SEO value |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 4 (breadcrumb + content + steps + pricing) |
| CMS-Driven Fields | ~30+ per service |
| Hardcoded Labels | ~10 |
| CTAs | 4+ (varies by pricing plans) |
| Conditional Sections | 2 (steps, pricing) |

---

## Service-Specific Data (per service)

| Field | Table | Column | Admin Modal Tab |
|-------|-------|--------|-----------------|
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
| Process Steps | service_process_steps | step_number, title, description, image | Process Steps tab |
| Pricing Plans | service_pricing_plans | plan_name, price_amount, features, etc. | Pricing Plans tab |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
