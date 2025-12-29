# Frontend Diagnostic: Blog Page

**Route:** `/blog`  
**Component:** `apps/public/src/components/pages/blog/BlogPage.tsx`  
**Purpose:** Content Discovery + SEO  
**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Swapability Labels, Wiring Status)

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/blog` |
| Page Name | Blog |
| Primary Purpose | Content discovery, SEO, engagement |
| SEO Type | Archive/listing page |

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
| Page Title (H1) | "Blog" | 4 chars | 4–15 | PROP | High |
| Breadcrumb Trail | "Home > Blog" | 12 chars | - | HARDCODED + PROP | Medium |

**Heading Structure:** H1 (page title)

---

### 2. Sidebar Search (`SidebarSearch.tsx`)

**Swapable via CMS:** NO  
**Reason:** HARDCODED — UI-only, not functional  
**Admin Fields Available:** None  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Input Placeholder | "Search Here..." | 14 chars | 10–20 | HARDCODED | None |
| Submit Button | (icon only) | - | - | HARDCODED | None |

**Gap:** Search form is UI-only. No search functionality implemented. Form submission does nothing.

---

### 3. Service List Widget (`ServiceList.tsx`)

**Swapable via CMS:** NO  
**Reason:** HARDCODED — static list not from `services` table  
**Admin Fields Available:** `services` table exists but not used here  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Widget Title (H4) | "Services" | 8 chars | 8–15 | HARDCODED | Low |
| Service Links | e.g., "Web Design", "App Design" | 10–20 chars | 10–25 | HARDCODED | Medium |

**Gap:** Should potentially be wired to `services` table (published).

---

### 4. Newest Post Widget (`NewsPost.tsx`)

**Swapable via CMS:** NO  
**Reason:** COMPLETELY HARDCODED — not wired to recent blog_posts  
**Admin Fields Available:** `blog_posts` table (query recent)  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Widget Title (H4) | "Newest Post" | 11 chars | 10–20 | HARDCODED | Low |
| Post Title (H6) | e.g., "Etiam vel diam volutpa..." | 38 chars | 30–50 | HARDCODED | Medium |
| Post Date | "05 January, 2022" | 17 chars | 15–25 | HARDCODED | Low |

**Gap:** Should query latest 3 published `blog_posts` ordered by `published_at DESC`.

---

### 5. Popular Tags Widget (`PopularTag.tsx`)

**Swapable via CMS:** NO  
**Reason:** HARDCODED — not wired to `blog_tags` table  
**Admin Fields Available:** `blog_tags` table exists but not used  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Widget Title (H4) | "Popular Tags" | 12 chars | 10–20 | HARDCODED | Low |
| Tag Links | "Website", "Agency", "Software", etc. | 5–10 chars | 5–15 | HARDCODED | Medium |

**Gap:** Should wire to `blog_tags` table.

---

### 6. Banner Widget (`BannerWiget.tsx`)

**Swapable via CMS:** NO  
**Reason:** HARDCODED — static promotional block  
**Admin Fields Available:** None  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Banner Text | "Looking For new job?" | 20 chars | 15–30 | HARDCODED | Low |
| CTA Label | "Get Start" | 9 chars | 8–15 | HARDCODED | Low |

---

### 7. Blog Post Grid (`BlogCart.tsx` × N)

**Swapable via CMS:** YES  
**Reason:** Blog posts from CMS via `blog_posts` table  
**Admin Fields Available:** `title`, `slug`, `excerpt`, `category`, `featured_image_media_id`, `published_at`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Category Tag | e.g., "Web Design", "General" | 8–15 chars | 8–20 | B (blog_posts.category) | Low |
| Post Title (H3) | e.g., "Donec a porttitor phari sod tellus..." | 40–60 chars | 35–80 | B (blog_posts.title) | High |
| Excerpt | "Aptent taciti sociosqu ad litora..." | 80–120 chars | 60–150 | B (blog_posts.excerpt) | Medium |
| Author Name | "Devmart Team" | 12 chars | 8–25 | HARDCODED | Low |
| Published Date | "05 January, 2022" | 17 chars | 15–25 | B (blog_posts.published_at) | Low |
| Card CTA | "Read More" | 9 chars | 8–15 | HARDCODED | Low |

**Heading Structure:** H3 (post titles)

**Layout Sensitivity:** 2-column grid within 8-column main area. Post titles can wrap to 2 lines.

---

### 8. Pagination (`Pagination.tsx`)

**Swapable via CMS:** NO  
**Reason:** UI-ONLY — not functional  
**Admin Fields Available:** N/A (logic-driven)  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Page Numbers | "01", "02", "03" | 2 chars | 2 | HARDCODED | None |
| Next Arrow | "→" | 1 char | 1 | HARDCODED | None |

**Gap:** Pagination UI exists but clicking does nothing. All posts render on single page.

---

### 9. Let's Talk CTA Section (`LetsTalkArea.tsx`)

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
| Search Submit | Sidebar | (non-functional) | UI | HARDCODED |
| Service Links (×5) | Sidebar | `/service-details/{slug}` | Navigation | HARDCODED |
| Post Links (×3) | Newest Post Widget | `/blog` (non-functional) | Navigation | HARDCODED |
| Tag Links (×7) | Popular Tags Widget | `#` (non-functional) | Navigation | HARDCODED |
| "Get Start" | Banner Widget | `/contact` | Conversion | HARDCODED |
| "Read More" (×N) | Blog Cards | `/blog/{slug}` | Navigation | HARDCODED |
| Page Numbers | Pagination | (non-functional) | Navigation | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | "Blog" (breadcrumb) | Primary keyword |
| H3s | Headings | Post titles | Long-tail keywords |
| H4s | Headings | Widget titles | Low value |
| Excerpts | Paragraph | Post summaries | Medium SEO |
| Category | Metadata | Post categories | Semantic grouping |

---

## Swapability Summary

| Section | Swapable | Admin Fields Exist | Public Wired | Gap |
|---------|----------|-------------------|--------------|-----|
| Breadcrumb | N/A | N/A | Route-driven | None |
| Search Widget | ❌ NO | ❌ | ❌ | UI-only |
| Service List Widget | ❌ NO | ✅ (services) | ❌ | Static list |
| Newest Posts Widget | ❌ NO | ✅ (blog_posts) | ❌ | Not wired |
| Popular Tags Widget | ❌ NO | ✅ (blog_tags) | ❌ | Not wired |
| Banner Widget | ❌ NO | ❌ | ❌ | Static promotional |
| Post Grid | ✅ YES | ✅ | ✅ | None |
| Pagination | ❌ NO | N/A | ❌ | UI-only |
| Let's Talk CTA | ✅ YES | ✅ | ✅ | None (shared) |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 9 |
| CMS-Driven Sections | 2 (Post Grid, CTA) |
| Hardcoded Sections | 7 (sidebar widgets, pagination) |
| CMS-Driven Fields | ~8 per post |
| Hardcoded Labels | ~40+ |
| CTAs | 15+ |
| Non-Functional UI | 4 (search, pagination, tag links, newest posts) |

---

## Gaps Identified

| Gap | Component | Current State | DB Support | Priority |
|-----|-----------|---------------|------------|----------|
| Search | SidebarSearch | UI-only | Needs query | Low |
| Service List | ServiceList | Hardcoded list | services table | Low |
| Newest Posts | NewsPost | Hardcoded list | blog_posts | Medium |
| Popular Tags | PopularTag | Hardcoded list | blog_tags exists | Medium |
| Pagination | Pagination | UI-only | Needs limit/offset logic | Low |
| Author Name | BlogCart | Hardcoded "Devmart Team" | Optional author field | Low |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
