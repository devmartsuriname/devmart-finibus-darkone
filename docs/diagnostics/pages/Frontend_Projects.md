# Frontend Diagnostic: Projects Page

**Route:** `/projects`  
**Component:** `apps/public/src/components/pages/projects/ProjectsPage.tsx`  
**Purpose:** Portfolio Showcase + Filtering  
**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Swapability Labels, Wiring Status)

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/projects` |
| Page Name | Projects |
| Primary Purpose | Portfolio showcase, category filtering, navigation to details |
| SEO Type | Category/listing page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

**Swapable via CMS:** PARTIAL  
**Reason:** Page title from props/route; breadcrumb trail HARDCODED structure  
**Admin Fields Available:** N/A (route-driven)  
**Public Rendering Source:** Prop-driven  
**Wiring Status:** N/A

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Page Title (H1) | "Projects" | 8 chars | 8–15 | PROP | High |
| Breadcrumb Trail | "Home > Projects" | 16 chars | - | HARDCODED + PROP | Medium |

**Heading Structure:** H1 (page title)

---

### 2. Project Grid with Filters (`ProjectWrapper.tsx` → `CartFilter.tsx`)

**Swapable via CMS:** PARTIAL  
**Reason:** Project cards from CMS; filter tabs derived from data; wrapper labels HARDCODED  
**Admin Fields Available:** `projects` table (all published)  
**Public Rendering Source:** Mixed (Cards=CMS, Labels=Hardcoded, Filters=Dynamic from data)  
**Wiring Status:** PARTIAL (cards WIRED, wrapper NOT WIRED)

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Filter Tab: All | "All" | 3 chars | 3–5 | HARDCODED | Low |
| Filter Tabs: Categories | e.g., "UI/UX", "Web Design" | 5–20 chars | 5–25 | B (distinct categories) | Medium |
| Project Category | e.g., "UI/UX Design" | 8–20 chars | 8–25 | B (projects.category) | Low |
| Project Title (H4) | e.g., "Creative Agency Dashboard" | 20–40 chars | 15–50 | B (projects.heading) | Medium |
| Project CTA | "Case Study" | 10 chars | 8–15 | HARDCODED | Low |
| Project Image | Featured image | - | - | B (projects.image_media_id) | Low (alt) |

**Heading Structure:** H4 (project titles)

**Layout Sensitivity:** 3-column grid on desktop. Filter tabs are horizontally scrollable on mobile. Card images are fixed aspect ratio.

**Note:** Filter categories are DYNAMICALLY extracted from `projects.category` column values (not a separate table).

---

### 3. Let's Talk CTA Section (`LetsTalkArea.tsx`)

**Swapable via CMS:** YES  
**Reason:** Reused from Homepage; CMS-driven via `homepage_settings.cta`  
**Admin Fields Available:** `title_line_1`, `title_line_2`, `title_line_3`, `cta_label`, `cta_url`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Label | "Let's Talk" | 10 chars | 8–15 | HARDCODED | Low |
| Title Line 1 (H2) | "About Your Next" | 15 chars | 12–25 | A+B+C | Medium |
| Title Line 2 (bold) | "Project" | 7 chars | 5–15 | A+B+C | High |
| Title Line 3 | "Your Mind" | 9 chars | 8–15 | A+B+C | Low |
| CTA Label | "Get In Touch" | 12 chars | 10–20 | A+B+C | Low |

**Heading Structure:** H2 (title)

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| Filter Tabs | Filter Bar | Page filter (no navigation) | UI | Dynamic |
| "Case Study" (×N) | Project Cards | `/project-details/{slug}` | Navigation | HARDCODED |
| Image Lightbox | Project Cards | Opens image | Engagement | CMS |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | "Projects" (breadcrumb) | Primary keyword |
| H4s | Headings | Project titles | Entity names |
| Category tabs | Navigation | Filter categories | Semantic grouping |
| Project slugs | URLs | `/project-details/{slug}` | Crawlable links |

---

## Swapability Summary

| Section | Swapable | Admin Fields Exist | Public Wired | Gap |
|---------|----------|-------------------|--------------|-----|
| Breadcrumb | N/A | N/A | Route-driven | None |
| Project Grid (cards) | ✅ YES | ✅ | ✅ | None |
| Project Grid (filters) | ✅ YES | ✅ (derived) | ✅ | Dynamic from category values |
| Project Grid (wrapper) | ❌ NO | ❌ | ❌ | No wrapper text in Admin |
| Let's Talk CTA | ✅ YES | ✅ | ✅ | None (shared) |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 3 |
| CMS-Driven Sections | 2 (Project cards, CTA) |
| Hardcoded Labels | ~5 (wrapper, CTA labels) |
| CTAs | 3+ (varies by project count) |
| Filter Categories | 4 (UI/UX, Web Design, Developing, Graphic Design) |

---

## Project Card Fields

| Field | Table | Column | Used In Card |
|-------|-------|--------|--------------|
| Title | projects | heading | Card title (H4) |
| Category | projects | category | Category badge + filter |
| Image | projects | image_media_id | Card thumbnail |
| Slug | projects | slug | Link URL |
| Status | projects | status | Filter (published only) |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
