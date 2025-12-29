# Frontend Diagnostic: About Page

**Route:** `/about`  
**Component:** `apps/public/src/components/pages/aboutUs/AboutPage.tsx`  
**Purpose:** Informational + Credibility  
**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Swapability Labels, Wiring Status)

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/about` |
| Page Name | About Us |
| Primary Purpose | Company story, team culture, credibility building |
| SEO Type | Supporting page |

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
| Page Title (H1) | "About Us" | 8 chars | 8–20 | PROP | High |
| Breadcrumb Trail | "Home > About Us" | 15 chars | - | HARDCODED + PROP | Medium |

**Heading Structure:** H1 (page title)

**Layout Sensitivity:** Centered layout. Long page names may wrap on mobile.

---

### 2. Inside Story Section (`InsideStoryArea.tsx`)

**Swapable via CMS:** YES  
**Reason:** Fully CMS-driven via `page_settings` (about page)  
**Admin Fields Available:** `title`, `description`, `cto_message`, `cto_name`, `cto_title`, `stats[]`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Label | "Our Story" | 9 chars | 8–15 | A+B | Low |
| Section Title (H2) | "The Inside Story of Devmart" | 28 chars | 25–50 | A+B | High |
| Description | "Integer purus odio, placerat nec rhoncus..." | ~400 chars | 300–500 | A+B | Medium |
| CTO Message | "Providing the best digital solutions..." | ~100 chars | 80–150 | A+B | Low |
| CTO Name (H4) | "John Smith" | 10 chars | 8–25 | A+B | Low |
| CTO Title | "Founder & CEO" | 13 chars | 10–25 | A+B | Low |
| Stat Label 1 | "Creative Ideas" | 14 chars | 10–20 | A+B | Low |
| Stat Percent 1 | 85 | number | 0–100 | A+B | None |
| Stat Label 2 | "Top Quality" | 11 chars | 10–20 | A+B | Low |
| Stat Percent 2 | 95 | number | 0–100 | A+B | None |

**Heading Structure:** H2 (section) → H4 (CTO name)

**Layout Sensitivity:** CTO message box overlaps main image on desktop. Long messages may cause overflow. Stats display as circular progress bars.

---

### 3. Why Choose Us Section (`WhyChooseUsArea.tsx`)

**Swapable via CMS:** YES  
**Reason:** Reused from Homepage; CMS-driven via `homepage_settings.why_choose`  
**Admin Fields Available:** `title`, `video_id`, `skills[]`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Label | "Why Choose Devmart" | 18 chars | 15–25 | HARDCODED | Medium |
| Section Title (H2) | "success is just around the next online corner" | 46 chars | 35–60 | A+B+C | High |
| Video CTA | "Play now" | 8 chars | 6–12 | HARDCODED | None |
| Skill Labels | "Web Design", "App Development", etc. | 7–15 chars | 8–20 | A+B+C | Low |
| Skill Percents | 85, 75, 55, 65 | numbers | 0–100 | A+B+C | None |

**Heading Structure:** H2 (section) → H6 (skill labels)

**Note:** Shared component with Homepage - same data source.

---

### 4. Testimonials Section (`TestimonialArea.tsx`)

**Swapable via CMS:** YES  
**Reason:** Reused from Homepage; CMS-driven via `testimonials` table  
**Admin Fields Available:** `author_name`, `author_title`, `company`, `quote`, `rating`, `avatar_media_id`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Author Name (H4) | e.g., "Savannah Nguyen" | 16 chars | 10–30 | B | Low |
| Author Title | e.g., "Executive CEO" | 13 chars | 10–30 | B | Low |
| Quote | "Curabitur magna nisi..." | ~300 chars | 200–350 | B | Medium |
| Rating | 5 stars | 1–5 | 1–5 | B | None |

**Heading Structure:** H4 (author name)

**Note:** Shared component with Homepage - same data source.

---

### 5. Latest News Section (`LatesNewsArea.tsx`)

**Swapable via CMS:** YES  
**Reason:** Blog posts from CMS; wrapper labels CMS-driven (About page version IS wired, unlike Homepage)  
**Admin Fields Available:** `blog_posts` table + `page_settings` wrapper text  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Label | "Blog" | 4 chars | 4–10 | A+B | Low |
| Section Title (H2) | "Latest news And Article modern design." | 39 chars | 30–50 | A+B | Medium |
| CTA Label | "View All Blog" | 13 chars | 10–20 | A+B | Low |
| Post Title (H3) | Blog post title | 30–60 chars | 30–70 | B | High |
| Post Excerpt | Blog post excerpt | 80–150 chars | 80–150 | B | Medium |
| Post Date | "05 January, 2022" | 17 chars | 15–25 | B | Low |

**Heading Structure:** H2 (section) → H3 (post cards)

**Note:** DIFFERENT FROM HOMEPAGE — About page's `LatesNewsArea.tsx` DOES consume wrapper fields from CMS, unlike `NewsLatterArea.tsx` on Homepage which is hardcoded.

---

### 6. Let's Talk CTA Section (`LetsTalkArea.tsx`)

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

**Note:** Shared component with Homepage - same data source.

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| "Play now" | Why Choose Us | Video Modal | Engagement | HARDCODED |
| "View All Blog" | Latest News | `/blog` | Navigation | CMS |
| "View details" (×3) | News Cards | `/blog/{slug}` | Navigation | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | "About Us" (breadcrumb) | Primary keyword |
| H2s | Headings | Section titles | Secondary keywords |
| H3s | Headings | Blog post titles | Long-tail keywords |
| H4s | Headings | CTO name, testimonial names | Low SEO value |
| Meta Title | pages table | `meta_title` | Available via Admin |
| Meta Description | pages table | `meta_description` | Available via Admin |

---

## Swapability Summary

| Section | Swapable | Admin Fields Exist | Public Wired | Gap |
|---------|----------|-------------------|--------------|-----|
| Breadcrumb | N/A | N/A | Route-driven | None |
| Inside Story | ✅ YES | ✅ | ✅ | None |
| Why Choose Us | ✅ YES | ✅ | ✅ | None (shared) |
| Testimonials | ✅ YES | ✅ | ✅ | None (shared) |
| Latest News (wrapper) | ✅ YES | ✅ | ✅ | None (About version IS wired) |
| Latest News (cards) | ✅ YES | ✅ | ✅ | None |
| Let's Talk CTA | ✅ YES | ✅ | ✅ | None (shared) |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 6 |
| Shared Components with Homepage | 4 (WhyChoose, Testimonials, News, CTA) |
| CMS-Driven Fields | ~25 |
| Hardcoded Labels | ~8 |
| CTAs | 6 |
| Fully Wired | ✅ All sections |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
