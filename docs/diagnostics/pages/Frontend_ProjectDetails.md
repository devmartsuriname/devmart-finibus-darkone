# Frontend Diagnostic: Project Details Page (Template)

**Route:** `/project-details/:slug`  
**Component:** `apps/public/src/components/pages/projectDetails/ProjectDetailsPage.tsx`  
**Purpose:** Case Study Details  
**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Swapability Labels, Wiring Status)

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/project-details/:slug` |
| Page Name | Dynamic (project title) |
| Primary Purpose | Full case study, process documentation, client info |
| SEO Type | Entity detail page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

**Swapable via CMS:** YES  
**Reason:** Project title from CMS drives breadcrumb  
**Admin Fields Available:** `projects.title`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Page Title (H1) | Dynamic project title | 15–40 chars | 10–50 | B (projects.title) | High |
| Breadcrumb Trail | "Home > {Project Title}" | varies | - | HARDCODED + CMS | Medium |

**Heading Structure:** H1 (project title)

---

### 2. Project Meta Row (`ProjectProcess.tsx`)

**Swapable via CMS:** PARTIAL  
**Reason:** Project data from CMS; labels HARDCODED  
**Admin Fields Available:** `client`, `category`, `website`, `start_date`, `end_date`  
**Public Rendering Source:** Mixed  
**Wiring Status:** PARTIAL (data WIRED, labels NOT WIRED)

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Label "Client:" (H4) | "Client:" | 7 chars | 7 | HARDCODED | Low |
| Client Value | e.g., "Devmart Client" | 15–30 chars | 10–40 | B (projects.client) | Low |
| Label "Services:" (H4) | "Services:" | 9 chars | 9 | HARDCODED | Low |
| Services Value | e.g., "Design & Development" | 15–30 chars | 10–40 | B (projects.category) | Low |
| Label "Website:" (H4) | "Website:" | 8 chars | 8 | HARDCODED | Low |
| Website Value | e.g., "www.example.com" | 15–30 chars | 10–50 | B (projects.website) | Low |
| Label "Start Date:" (H4) | "Start Date:" | 11 chars | 11 | HARDCODED | Low |
| Start Date Value | e.g., "15.01.2024" | 10 chars | 10 | B (projects.start_date) | Low |
| Label "end Date:" (H4) | "end Date:" | 9 chars | 9 | HARDCODED | Low |
| End Date Value | e.g., "30.06.2024" | 10 chars | 10 | B (projects.end_date) | Low |

**Layout Sensitivity:** 5-column row on desktop. Fields conditionally render (null = hidden). Date format: DD.MM.YYYY

---

### 3. Featured Image Banner (`ProjectProcess.tsx`)

**Swapable via CMS:** YES  
**Reason:** Featured image from CMS  
**Admin Fields Available:** `projects.featured_image_media_id`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Featured Image | (no text) | - | - | B (featured_image_media_id) | Low (alt text) |
| Image Alt | Project title | varies | - | B (projects.title) | Medium |

**Layout Sensitivity:** Full-width banner image. Aspect ratio preserved via CSS object-fit.

---

### 4. Overview Section (`ProjectProcess.tsx`)

**Swapable via CMS:** YES  
**Reason:** CMS-driven content  
**Admin Fields Available:** `heading`, `description`, `image_media_id`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Title (H3) | "OVERVIEW" | 8 chars | 8 | HARDCODED | Medium |
| Overview Heading (H3) | e.g., "Our Client Work Brief" | 20–40 chars | 15–50 | B (projects.heading) | High |
| Description | Long-form project description | 500–1500 chars | 400–2000 | B (projects.description) | High |

**Heading Structure:** H3 (section) → H3 (overview heading)

**Layout Sensitivity:** 5-column image, 7-column content. Description supports long text.

---

### 5. Project Process Steps (`ProjectProcess.tsx`)

**Swapable via CMS:** YES  
**Reason:** Fully CMS-driven from `project_process_steps` table  
**Admin Fields Available:** `step_number`, `title`, `description`, `image_media_id`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Title (H3) | "PROJECT PROCESS" | 15 chars | 15 | HARDCODED | Medium |
| Step Number + Title (H4) | e.g., "01. Brainstorming" | 15–25 chars | 10–30 | B (step_number + title) | Low |
| Step Description | Process details | 100–250 chars | 80–300 | B (description) | Low |
| Step Image | Process illustration | - | - | B (image_media_id) | Low |

**Heading Structure:** H3 (section) → H4 (step titles)

**Layout Sensitivity:** 4-column grid, visual order varies. Images optional.

**Conditional Rendering:** Only renders if `project_process_steps` exist for the project.

---

### 6. Check & Launch Section (`ProjectProcess.tsx`)

**Swapable via CMS:** YES  
**Reason:** CMS-driven via dedicated fields  
**Admin Fields Available:** `projects.check_launch_content`, `projects.check_launch_image_media_id`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Title (H3) | "Check & launch" | 14 chars | 14 | HARDCODED | Low |
| Content | Long-form summary text | 500–1500 chars | 400–2000 | B (check_launch_content) | Medium |
| Image | Launch image | - | - | B (check_launch_image_media_id) | Low |

**Heading Structure:** H3 (section title)

**Conditional Rendering:** Only renders if `check_launch_content` exists.

---

### 7. Related Projects (`ReletedProject.tsx`)

**Swapable via CMS:** YES  
**Reason:** Projects from same category via CMS  
**Admin Fields Available:** `projects` table (filtered by category)  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Title (H3) | "Related Project" | 15 chars | 15 | HARDCODED | Low |
| Project Heading (H4) | Same as Projects page | 20–40 chars | 15–50 | B (projects.heading) | Medium |
| Card CTA | "Case Study" | 10 chars | 8–15 | HARDCODED | Low |

**Layout Sensitivity:** 3-column grid. Shows other projects in same category.

---

### 8. Let's Talk CTA Section (`LetsTalkArea.tsx`)

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
| Website Link | Meta Row | External URL | Navigation | CMS |
| "Case Study" | Related Projects | `/project-details/{slug}` | Navigation | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | Project title (breadcrumb) | Primary keyword |
| H3s | Headings | Section titles, overview heading | Secondary keywords |
| H4s | Headings | Process steps, related projects | Long-tail keywords |
| Description | Paragraph | Project description | High SEO value |
| Category | Metadata | Project classification | Low |

---

## Swapability Summary

| Section | Swapable | Admin Fields Exist | Public Wired | Gap |
|---------|----------|-------------------|--------------|-----|
| Breadcrumb | ✅ YES | ✅ | ✅ | None |
| Project Meta (data) | ✅ YES | ✅ | ✅ | None |
| Project Meta (labels) | ❌ NO | ❌ | ❌ | Labels hardcoded |
| Featured Image | ✅ YES | ✅ | ✅ | None |
| Overview | ✅ YES | ✅ | ✅ | None |
| Process Steps | ✅ YES | ✅ | ✅ | None |
| Check Launch | ✅ YES | ✅ | ✅ | None |
| Related Projects | ✅ YES | ✅ | ✅ | None |
| Let's Talk CTA | ✅ YES | ✅ | ✅ | None (shared) |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 8 |
| Fully CMS-Driven | 7 (all except meta labels) |
| CMS-Driven Fields | ~20+ per project (with steps) |
| Hardcoded Labels | ~15 (meta labels, section titles) |
| CTAs | 4+ |
| Conditional Sections | 2 (Process Steps, Check Launch) |

---

## Project-Specific Data Fields

| Field | Table | Column | Admin Modal Tab |
|-------|-------|--------|----------------|
| Title | projects | title | Basic Info |
| Heading | projects | heading | Basic Info |
| Slug | projects | slug | Basic Info |
| Description | projects | description | Basic Info |
| Category | projects | category | Basic Info |
| Client | projects | client | Basic Info |
| Website | projects | website | Basic Info |
| Start Date | projects | start_date | Basic Info |
| End Date | projects | end_date | Basic Info |
| Thumbnail Image | projects | image_media_id | Basic Info |
| Featured Image | projects | featured_image_media_id | Basic Info |
| Check Launch Content | projects | check_launch_content | Basic Info |
| Check Launch Image | projects | check_launch_image_media_id | Basic Info |
| Step Title | project_process_steps | title | Process Steps |
| Step Description | project_process_steps | description | Process Steps |
| Step Image | project_process_steps | image_media_id | Process Steps |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
