# Frontend Diagnostic: Projects Page

**Route:** `/projects`  
**Component:** `apps/public/src/components/pages/projects/ProjectsPage.tsx`  
**Purpose:** Informational  
**Last Verified:** 2025-12-29

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/projects` |
| Page Name | Projects |
| Primary Purpose | Portfolio showcase, category filtering, detail navigation |
| SEO Type | Category/listing page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Page Title (H1) | "Projects" | 8 chars | 8–20 | PROP (pageName) | High |
| Breadcrumb Trail | "Home > Projects" | varies | - | HARDCODED + PROP | Low |

**Heading Structure:** H1 (page title)

**Data Source Status:** Prop-driven from parent

---

### 2. Project Grid (`ProjectWrapper.tsx` → `CartFilter.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Filter Tab "All" | "All" | 3 chars | 3 | HARDCODED | Low |
| Filter Tabs (categories) | e.g., "UI/UX", "Web Development" | 5–20 chars | 5–25 | CMS (B) | Medium |
| Project Category | e.g., "Template", "UI Kit" | 8–20 chars | 8–25 | CMS (B) | Low |
| Project Heading (H4) | e.g., "Creative Agency Dashboard" | 20–40 chars | 15–50 | CMS (B) | High |
| Card CTA | "Case Study" | 10 chars | 8–15 | HARDCODED | Low |

**Heading Structure:** H4 (project headings)

**Layout Sensitivity:**
- 3-column grid layout
- Filter tabs dynamically generated from unique categories
- Project headings should fit 2 lines max
- Images: thumbnail or featured_image fallback

**Data Source Status:**
- Filter categories: Dynamically extracted from `projects.category` (published)
- Project cards: CMS-driven via `projects` table
- "All" tab and "Case Study" CTA: HARDCODED

---

### 3. Let's Talk CTA Section (`LetsTalkArea.tsx`)

*Reused from Homepage - see Frontend_Home.md for full breakdown*

**Data Source Status:** CMS-driven via `homepage_settings.cta`

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| Category Filters | Filter Bar | Same page (filter) | Navigation | CMS |
| "Case Study" | Project Cards | `/project-details/{slug}` | Navigation | HARDCODED |
| Image Lightbox | Project Cards | Opens image | Engagement | CMS |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | "Projects" (breadcrumb) | Primary page identifier |
| H4s | Headings | Project headings | High-value entity names |
| Category slugs | Filter | Unique categories | Potential faceted navigation |
| Project slugs | URLs | `/project-details/{slug}` | Internal linking |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 3 (including breadcrumb) |
| CMS-Driven Fields | ~24+ (8 projects × 3 displayed fields) |
| Hardcoded Labels | ~5 |
| CTAs | 10+ (varies by project count) |
| Filter Categories | Dynamic (currently 5-6 unique) |

---

## Project Card Fields

| Visual Element | DB Column | Notes |
|----------------|-----------|-------|
| Image | `image` or `featured_image` | Thumbnail preferred, fallback to featured |
| Category Badge | `category` | Used for filtering |
| Heading | `heading` | Displayed title on card |
| Link | `slug` | Routes to detail page |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
