# Frontend Diagnostic: Project Details Page (Template)

**Route:** `/project-details/:slug`  
**Component:** `apps/public/src/components/pages/projectDetails/ProjectDetailsPage.tsx`  
**Purpose:** Mixed (Informational + Conversion)  
**Last Verified:** 2025-12-29

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/project-details/:slug` |
| Page Name | Dynamic (project title) |
| Primary Purpose | Case study showcase, project process, credibility |
| SEO Type | Entity detail page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Page Title (H1) | Dynamic project title | 15–40 chars | 10–50 | CMS (B) | High |
| Breadcrumb Trail | "Home > {Project Title}" | varies | - | HARDCODED + CMS | Medium |

**Heading Structure:** H1 (project title)

**Data Source Status:** CMS-driven via `projects.title`

---

### 2. Project Meta Row (`ProjectProcess.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Label "Client:" (H4) | "Client:" | 7 chars | 7 | HARDCODED | Low |
| Client Value | e.g., "Devmart Client" | 15–30 chars | 10–40 | CMS (B) | Low |
| Label "Services:" (H4) | "Services:" | 9 chars | 9 | HARDCODED | Low |
| Services Value | e.g., "Design & Development" | 15–30 chars | 10–40 | CMS (B) / category | Low |
| Label "Website:" (H4) | "Website:" | 8 chars | 8 | HARDCODED | Low |
| Website Value | e.g., "www.example.com" | 15–30 chars | 10–50 | CMS (B) | Low |
| Label "Start Date:" (H4) | "Start Date:" | 11 chars | 11 | HARDCODED | Low |
| Start Date Value | e.g., "15.01.2024" | 10 chars | 10 | CMS (B) | Low |
| Label "end Date:" (H4) | "end Date:" | 9 chars | 9 | HARDCODED | Low |
| End Date Value | e.g., "30.06.2024" | 10 chars | 10 | CMS (B) | Low |

**Layout Sensitivity:**
- 5-column row on desktop
- Fields conditionally render (null = hidden)
- Date format: DD.MM.YYYY

**Data Source Status:**
- All values: CMS-driven via `projects` table
- Labels: HARDCODED

---

### 3. Featured Image Banner (`ProjectProcess.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Image | (no text) | - | - | CMS (B) | Low (alt text) |

**Data Source Status:** 
- CMS-driven via `projects.featured_image_media_id`
- Fallback: `/images/process-banner.jpg`

---

### 4. Overview Section (`ProjectProcess.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Title (H3) | "OVERVIEW" | 8 chars | 8 | HARDCODED | Medium |
| Overview Heading (H3) | e.g., "Our Client Work Brief" | 20–40 chars | 15–50 | CMS (B) / heading | High |
| Description | Long-form project description | 500–1500 chars | 400–2000 | CMS (B) | High |

**Heading Structure:** H3 (section) → H3 (overview heading)

**Layout Sensitivity:**
- 5-column image, 7-column content
- Description supports long text with scrolling

**Data Source Status:**
- CMS-driven via `projects.heading`, `projects.description`
- Image: `projects.image_media_id`
- Fallback for empty fields: Static Finibus text

---

### 5. Project Process Steps (`ProjectProcess.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Title (H3) | "PROJECT PROCESS" | 15 chars | 15 | HARDCODED | Medium |
| Step Number + Title (H4) | e.g., "01. Brainstorming" | 15–25 chars | 10–30 | CMS (B) | Low |

**Layout Sensitivity:**
- 4-column grid, reverse visual order (4, 3, 2, 1)
- Images optional
- Fallback: Static Finibus steps if no DB data

**Data Source Status:**
- CMS-driven via `project_process_steps` table (linked by `project_id`)
- Static fallback if `processSteps.length === 0`

---

### 6. Check & Launch Section (`ProjectProcess.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Title (H3) | "Check & launch" | 14 chars | 14 | HARDCODED | Low |
| Content | Long-form summary text | 500–1500 chars | 400–2000 | CMS (B) | Medium |

**Layout Sensitivity:**
- 7-column content, 5-column image
- Image optional

**Data Source Status:**
- CMS-driven via `projects.check_launch_content`, `projects.check_launch_image_media_id`
- Static fallback if fields are null

---

### 7. Related Projects (`ReletedProject.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Title (H3) | "Related Project" | 15 chars | 15 | HARDCODED | Low |
| Project Heading (H4) | Same as Projects page | 20–40 chars | 15–50 | CMS (B) | Medium |
| Card CTA | "Case Study" | 10 chars | 8–15 | HARDCODED | Low |

**Layout Sensitivity:**
- 3-column grid
- Shows other projects in same category

**Data Source Status:**
- CMS-driven via `projects` table (filtered by category, excluding current)

---

### 8. Let's Talk CTA Section (`LetsTalkArea.tsx`)

*Reused from Homepage - see Frontend_Home.md for full breakdown*

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| "Case Study" | Related Projects | `/project-details/{slug}` | Navigation | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | Project title (breadcrumb) | Primary keyword |
| H3s | Headings | Section titles | Secondary keywords |
| H4s | Headings | Process steps, related projects | Long-tail keywords |
| Description | Body text | Full project description | High SEO value |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 8 (including breadcrumb + CTA) |
| CMS-Driven Fields | ~20+ per project |
| Hardcoded Labels | ~15 |
| CTAs | 4+ (varies by related projects) |
| Conditional Sections | 3 (website, dates, process steps) |

---

## Project-Specific Data (per project)

| Field | Table | Column | Admin Modal Tab |
|-------|-------|--------|-----------------|
| Title | projects | title | Basic Info |
| Heading | projects | heading | Basic Info |
| Slug | projects | slug | Basic Info |
| Description | projects | description | Basic Info |
| Category | projects | category | Basic Info |
| Client | projects | client | Basic Info |
| Website | projects | website | Basic Info |
| Start Date | projects | start_date | Basic Info |
| End Date | projects | end_date | Basic Info |
| Image (Thumbnail) | projects | image_media_id | Basic Info |
| Featured Image | projects | featured_image_media_id | Basic Info |
| Check & Launch Content | projects | check_launch_content | Basic Info |
| Check & Launch Image | projects | check_launch_image_media_id | Basic Info |
| Process Steps | project_process_steps | step_number, title, description, image | Process Steps tab |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
