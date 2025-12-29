# Frontend Diagnostic: Blog Page

**Route:** `/blog`  
**Component:** `apps/public/src/components/pages/blog/BlogPage.tsx`  
**Purpose:** Informational  
**Last Verified:** 2025-12-29

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/blog` |
| Page Name | Blog |
| Primary Purpose | Content discovery, thought leadership, SEO |
| SEO Type | Archive/listing page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Page Title (H1) | "Blog" | 4 chars | 4–15 | PROP (pageName) | High |
| Breadcrumb Trail | "Home > Blog" | varies | - | HARDCODED + PROP | Low |

**Heading Structure:** H1 (page title)

**Data Source Status:** Prop-driven from parent

---

### 2. Sidebar Search (`SidebarSearch.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Input Placeholder | "Search Here..." | 14 chars | 10–20 | HARDCODED | None |

**Data Source Status:** HARDCODED (search not functional - UI only)

---

### 3. Service List Widget (`ServiceList.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Widget Title (H4) | "Services" | 8 chars | 8–15 | HARDCODED | Low |
| Service Links | e.g., "Web Design", "App Design" | 10–20 chars | 10–25 | HARDCODED | Medium |

**Data Source Status:** HARDCODED (static list, not from DB)

**Gap:** Should potentially be wired to `services` table

---

### 4. Newest Post Widget (`NewsPost.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Widget Title (H4) | "Newest Post" | 11 chars | 10–20 | HARDCODED | Low |
| Post Title (H6) | e.g., "Etiam vel diam volutpa pellentesque." | 38 chars | 30–50 | HARDCODED | Medium |
| Post Date | "05 January, 2022" | 17 chars | 15–25 | HARDCODED | Low |

**Data Source Status:** COMPLETELY HARDCODED

**Gap:** Should be wired to latest 3 `blog_posts` (published)

---

### 5. Popular Tags Widget (`PopularTag.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Widget Title (H4) | "Popular Tags" | 12 chars | 10–20 | HARDCODED | Low |
| Tag Links | "Website", "Agency", "Software", etc. | 5–10 chars | 5–15 | HARDCODED | Medium |

**Data Source Status:** HARDCODED

**Gap:** Should be wired to `blog_tags` table

---

### 6. Banner Widget (`BannerWiget.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Banner Text | "Looking For new job?" | 20 chars | 15–30 | HARDCODED | Low |
| CTA Label | "Get Start" | 9 chars | 8–15 | HARDCODED | Low |

**Data Source Status:** HARDCODED

---

### 7. Blog Post Grid (`BlogCart.tsx` × N)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Category Tag | e.g., "Web Design", "General" | 8–15 chars | 8–20 | CMS (B) | Low |
| Post Title (H3) | e.g., "Donec a porttitor phari sod tellus..." | 40–60 chars | 35–80 | CMS (B) | High |
| Excerpt | "Aptent taciti sociosqu ad litora..." | 80–120 chars | 60–150 | CMS (B) | Medium |
| Author Name | "Devmart Team" | 12 chars | 8–25 | HARDCODED | Low |
| Published Date | "05 January, 2022" | 17 chars | 15–25 | CMS (B) | Low |
| Card CTA | "Read More" | 9 chars | 8–15 | HARDCODED | Low |

**Heading Structure:** H3 (post titles)

**Layout Sensitivity:**
- 2-column grid within 8-column main area
- Post titles can wrap to 2 lines
- Excerpts truncated at ~150 chars

**Data Source Status:**
- Main data: CMS-driven via `blog_posts` table (published)
- Author: HARDCODED as "Devmart Team" (no author_name in posts table)
- "Read More" CTA: HARDCODED

---

### 8. Pagination (`Pagination.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Page Numbers | "01", "02", "03" | 2 chars | 2 | HARDCODED | Low |
| Next Arrow | (icon) | - | - | HARDCODED | None |

**Data Source Status:** HARDCODED (not functional)

**Gap:** Pagination is UI-only, needs implementation

---

### 9. Let's Talk CTA Section (`LetsTalkArea.tsx`)

*Reused from Homepage - see Frontend_Home.md for full breakdown*

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| Service Links (×5) | Sidebar | `/service-details/{slug}` | Navigation | HARDCODED |
| Post Links (×3) | Newest Post Widget | `/blog` | Navigation | HARDCODED |
| Tag Links (×7) | Popular Tags Widget | `#` (non-functional) | Navigation | HARDCODED |
| "Get Start" | Banner Widget | `/contact` | Conversion | HARDCODED |
| "Read More" (×N) | Blog Cards | `/blog/{slug}` | Navigation | HARDCODED |
| Page Numbers | Pagination | (non-functional) | Navigation | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | "Blog" (breadcrumb) | Primary page identifier |
| H3s | Headings | Post titles | High-value keywords |
| H4s | Headings | Widget titles | Structural |
| Excerpts | Body text | Post summaries | Snippet content |
| Category/Tags | Metadata | Classification | Potential facets |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 9 (including breadcrumb + CTA) |
| CMS-Driven Fields | ~18 (6 posts × 3 displayed fields) |
| Hardcoded Labels | ~30+ (sidebar widgets) |
| CTAs | 15+ |
| Non-Functional UI | 3 (search, pagination, tag links) |

---

## Gaps Identified

| Gap | Component | Current State | Required |
|-----|-----------|---------------|----------|
| Sidebar Search | `SidebarSearch.tsx` | UI only | Functional search |
| Newest Posts | `NewsPost.tsx` | Hardcoded | Wire to latest 3 posts |
| Popular Tags | `PopularTag.tsx` | Hardcoded | Wire to `blog_tags` |
| Service List | `ServiceList.tsx` | Hardcoded | Wire to `services` |
| Pagination | `Pagination.tsx` | UI only | Functional pagination |
| Author Name | `BlogCart.tsx` | Hardcoded "Devmart Team" | Optional author field |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
