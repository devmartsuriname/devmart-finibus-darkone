# Frontend Diagnostic: About Page

**Route:** `/about`  
**Component:** `apps/public/src/components/pages/aboutUs/AboutPage.tsx`  
**Purpose:** Informational  
**Last Verified:** 2025-12-29

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

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Page Title (H1) | "About Us" | 8 chars | 8–20 | PROP (pageName) | High |
| Breadcrumb Trail | "Home > About Us" | varies | - | HARDCODED + PROP | Low |

**Heading Structure:** H1 (page title)

**Layout Sensitivity:** Centered layout. Long page names may wrap on mobile.

**Data Source Status:** Prop-driven from parent component

---

### 2. Inside Story Section (`InsideStoryArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "Our Story" | 9 chars | 8–15 | CMS (A+B) | Low |
| Section Title (H2) | "The Inside Story of Devmart" | 28 chars | 25–50 | CMS (A+B) | High |
| Description | "Integer purus odio, placerat nec rhoncus..." | ~400 chars | 300–500 | CMS (A+B) | Medium |
| CTO Message | "Providing the best digital solutions..." | ~100 chars | 80–150 | CMS (A+B) | Low |
| CTO Name (H4) | "John Smith" | 10 chars | 8–25 | CMS (A+B) | Low |
| CTO Title | "Founder & CEO" | 13 chars | 10–25 | CMS (A+B) | Low |
| Stat Label 1 | "Creative Ideas" | 14 chars | 10–20 | CMS (A+B) | Low |
| Stat Percent 1 | 85 | number | 0–100 | CMS (A+B) | None |
| Stat Label 2 | "Top Quality" | 11 chars | 10–20 | CMS (A+B) | Low |
| Stat Percent 2 | 95 | number | 0–100 | CMS (A+B) | None |

**Heading Structure:** H2 (section) → H4 (CTO name)

**Layout Sensitivity:** CTO message box overlaps main image on desktop. Long messages may cause overflow. Stats display as circular progress bars with labels below.

**Data Source Status:**
- CMS-driven via `page_settings` (slug: "about") → `insideStory` JSON block
- Static fallback in hook

---

### 3. Why Choose Us Section (`WhyChooseUsArea.tsx`)

*Reused from Homepage - see Frontend_Home.md for full breakdown*

| Element | Text Content | Data Source |
|---------|-------------|-------------|
| Section Label | "Why Choose Devmart" | HARDCODED |
| Section Title (H2) | CMS-driven | CMS (A+B) |
| Skills (×4) | CMS-driven | CMS (A+B) |

**Data Source Status:** CMS-driven via `homepage_settings.why_choose`

---

### 4. Testimonials Section (`TestimonialArea.tsx`)

*Reused from Homepage - see Frontend_Home.md for full breakdown*

| Element | Text Content | Data Source |
|---------|-------------|-------------|
| Author Name (H4) | CMS-driven | CMS (B) |
| Author Title | CMS-driven | CMS (B) |
| Quote | CMS-driven | CMS (B) |

**Data Source Status:** CMS-driven via `testimonials` table

---

### 5. Latest News Section (`LatesNewsArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "Blog" | 4 chars | 4–10 | HARDCODED | Low |
| Section Title (H2) | "Latest news And Article modern design." | 39 chars | 30–50 | HARDCODED | Medium |
| CTA Label | "View All Blog" | 13 chars | 10–20 | HARDCODED | Low |
| Post Data | (same as Homepage) | varies | varies | CMS (B) | Medium |

**Data Source Status:** Same as Homepage NewsLatterArea

---

### 6. Let's Talk CTA Section (`LetsTalkArea.tsx`)

*Reused from Homepage - see Frontend_Home.md for full breakdown*

**Data Source Status:** CMS-driven via `homepage_settings.cta`

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| "Play now" | Why Choose Us | Video Modal | Engagement | HARDCODED |
| "View All Blog" | Latest News | `/blog` | Navigation | HARDCODED |
| "View details" (×2) | News Cards | `/blog/{slug}` | Navigation | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | "About Us" (breadcrumb) | Primary page identifier |
| H2s | Headings | Section titles | Secondary keywords |
| H4s | Headings | CTO name, author names | Entity names |
| Meta Title | pages table | `meta_title` field | Configurable in Admin |
| Meta Description | pages table | `meta_description` field | Configurable in Admin |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 6 (including breadcrumb) |
| CMS-Driven Fields | ~20 (About-specific) + shared components |
| Hardcoded Labels | ~10 |
| CTAs | 5 |
| Reused Components | 3 (WhyChooseUs, Testimonials, LetsTalk) |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
