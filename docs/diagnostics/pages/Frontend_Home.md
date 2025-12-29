# Frontend Diagnostic: Homepage

**Route:** `/`  
**Component:** `apps/public/src/components/pages/Home/HomePage.tsx`  
**Purpose:** Mixed (Informational + Conversion)  
**Last Verified:** 2025-12-29

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/` |
| Page Name | Homepage |
| Primary Purpose | Brand introduction, service discovery, lead conversion |
| SEO Type | Primary landing page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Hero Slider (`HeroArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Subtitle (H2) | "Creative" | 8 chars | 8–20 | CMS (A+B) | Low |
| Title Prefix | "Best solution for your" | 23 chars | 20–40 | CMS (A+B) | High (H1 partial) |
| Title Highlight (H1 span) | "Business." / "Finances." / "Markets." | 9–10 chars | 8–15 | CMS (A+B) | High (H1 keyword) |
| Description | "Curabitur sed facilisis erat..." | ~200 chars | 150–250 | CMS (A+B) | Medium |
| CTA 1 Label | "About us" | 8 chars | 8–15 | CMS (A+B) | Low |
| CTA 2 Label | "How we work" | 11 chars | 8–20 | CMS (A+B) | Low |

**Heading Structure:** H2 (subtitle) → H1 (title with span)

**Layout Sensitivity:** Title highlight must be short (single word) to prevent line break. Description supports multi-line but excess text may push CTAs below fold.

**Data Source Status:**
- CMS-driven via `homepage_settings.hero.slides[]`
- Static fallback in code for graceful degradation

---

### 2. Services Section (`ServiceArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "what we do" | 10 chars | 10–20 | HARDCODED | Low |
| Section Title (H2) | "we work performed for client happy." | 36 chars | 30–60 | HARDCODED | Medium |
| CTA Label | "view all services" | 17 chars | 15–25 | HARDCODED | Low |
| Service Title (H4) | e.g., "web design" | 10–15 chars | 10–25 | CMS (B) | Medium |
| Service Description | e.g., "Fusce ornare mauris nisi..." | 70–90 chars | 60–100 | CMS (B) | Low |
| Service Link Text | "read more" | 9 chars | 8–15 | HARDCODED | Low |

**Heading Structure:** H2 (section) → H4 (service cards)

**Layout Sensitivity:** Service titles should remain single-line. Descriptions truncated at ~100 chars to prevent card height variance.

**Data Source Status:**
- Service cards: CMS-driven via `services` table (first 4 published)
- Section title/label: HARDCODED

---

### 3. About Section (`AboutArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "About us" | 8 chars | 8–15 | HARDCODED | Low |
| Section Title (H2) | "Direction with our company." | 28 chars | 25–50 | CMS (A+B) | High |
| Description | "Integer purus odio, placerat nec rhoncus..." | ~350 chars | 250–400 | CMS (A+B) | Medium |
| Mission Title (H5) | "Our Mission" | 11 chars | 10–20 | CMS (A+B) | Low |
| Mission Text | "Integer purus odio, placerat nec rhoni olor..." | ~70 chars | 50–100 | CMS (A+B) | Low |
| CTA Label | "About more" | 10 chars | 8–15 | CMS (A+B) | Low |
| Skill Label 1 | "Web" | 3 chars | 3–10 | CMS (A+B) | Low |
| Skill Sublabel 1 | "Clean Design" | 12 chars | 10–20 | CMS (A+B) | Low |
| Skill Percent 1 | 85 | number | 0–100 | CMS (A+B) | None |
| Stat Labels | "Project Completed", "Satisfied Clients", etc. | 15–20 chars | 15–25 | CMS (A+B) | Low |
| Stat Values | 250, 150, 150, 100 | numbers | varies | CMS (A+B) | None |

**Heading Structure:** H2 (section) → H5 (mission) → H6 (skills)

**Layout Sensitivity:** Description paragraph supports long text but may push circular progress charts. Stat labels must stay under 25 chars for mobile display.

**Data Source Status:**
- CMS-driven via `homepage_settings.home_about`, `homepage_settings.stats`
- Static fallback in code

---

### 4. Newsletter + Partners Section (`OurPartnerArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Newsletter Label | "Get In Touch" | 12 chars | 10–20 | HARDCODED | Low |
| Newsletter Title (H1) | "Subscribe Our" | 13 chars | 10–20 | HARDCODED | Medium |
| Newsletter Subtitle (H2) | "Newsletter" | 10 chars | 8–15 | HARDCODED | Medium |
| Input Placeholder | "Type Your Email" | 15 chars | 12–25 | HARDCODED | None |
| Submit Button | "Connect" | 7 chars | 6–12 | HARDCODED | None |
| Partner Section Label | "Our partner" | 11 chars | 10–20 | HARDCODED | Low |
| Partner Title (H2) | "Join our Finibus community." | 28 chars | 20–40 | HARDCODED | Low |
| Partner URLs (hover) | "www.example.com" | ~15 chars | 10–30 | CMS (A+B) | None |

**Heading Structure:** H1 + H2 (newsletter) → H2 (partners)

**Layout Sensitivity:** Partner logos in grid format; excess partners may wrap. Newsletter form is fixed-width.

**Data Source Status:**
- Newsletter: HARDCODED (form submits to `newsletter_subscribers` table)
- Partners: CMS-driven via `homepage_settings.partners[]`

---

### 5. Portfolio Section (`PortfolioArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "Case Study" | 10 chars | 8–15 | HARDCODED | Low |
| Section Title (H2) | "A diversified resilient portfolio." | 35 chars | 30–50 | HARDCODED | Medium |
| Project Category | e.g., "Template", "UI Kit" | 8–12 chars | 8–20 | CMS (B) | Low |
| Project Title (H4) | e.g., "Creative Agency" | 15 chars | 12–30 | CMS (B) | Medium |
| CTA Label | "Case Study" | 10 chars | 8–15 | HARDCODED | Low |

**Heading Structure:** H2 (section) → H4 (project cards)

**Layout Sensitivity:** Carousel requires minimum 5 projects. Project titles should be short to avoid overflow on slide cards.

**Data Source Status:**
- Section labels: HARDCODED
- Project data: CMS-driven via `projects` table (first 6 published)

---

### 6. Why Choose Us Section (`WhyChooseUsArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "Why Choose Devmart" | 18 chars | 15–25 | HARDCODED | Medium |
| Section Title (H2) | "success is just around the next online corner" | 46 chars | 35–60 | CMS (A+B) | High |
| Video CTA | "Play now" | 8 chars | 6–12 | HARDCODED | None |
| Skill Labels | "Web Design", "App Development", "Backend", "Video Animation" | 7–15 chars | 8–20 | CMS (A+B) | Low |
| Skill Percents | 85, 75, 55, 65 | numbers | 0–100 | CMS (A+B) | None |

**Heading Structure:** H2 (section) → H6 (skill labels)

**Layout Sensitivity:** Title supports 2 lines max. Video modal overlay covers viewport. Skill bars are responsive but labels should remain concise.

**Data Source Status:**
- CMS-driven via `homepage_settings.why_choose`
- Static fallback in code

---

### 7. Testimonials Section (`TestimonialArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Author Name (H4) | e.g., "Savannah Nguyen" | 16 chars | 10–30 | CMS (B) | Low |
| Author Title | e.g., "Executive CEO" | 13 chars | 10–30 | CMS (B) | Low |
| Quote | "Curabitur magna nisi, egestas quis est in..." | ~300 chars | 200–350 | CMS (B) | Medium |
| Rating | 5 stars | 1–5 | 1–5 | CMS (B) | None |

**Heading Structure:** H4 (author name)

**Layout Sensitivity:** Quote text supports multi-line. Carousel navigation requires minimum 2 testimonials.

**Data Source Status:**
- CMS-driven via `testimonials` table (published)
- Static fallback in code

---

### 8. Latest News Section (`NewsLatterArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "Blog" | 4 chars | 4–10 | HARDCODED | Low |
| Section Title (H2) | "Latest news And Article modern design." | 39 chars | 30–50 | HARDCODED | Medium |
| CTA Label | "View All Blog" | 13 chars | 10–20 | HARDCODED | Low |
| Post Category Tag | e.g., "Web Design" | 10 chars | 8–20 | CMS (B) | Low |
| Post Title (H3) | e.g., "Donec a porttitor phari sod tellus..." | 45 chars | 35–60 | CMS (B) | High |
| Post Excerpt | "Aptent taciti sociosqu ad litora torquent..." | ~120 chars | 80–150 | CMS (B) | Medium |
| Author Name | e.g., "Alen Jodge" / "Admin" | 10–15 chars | 8–20 | CMS (B) / HARDCODED fallback | Low |
| Published Date | "05 January, 2022" | 17 chars | 15–25 | CMS (B) | Low |
| Card CTA | "View details" | 12 chars | 10–15 | HARDCODED | Low |

**Heading Structure:** H2 (section) → H3 (post cards)

**Layout Sensitivity:** Displays first 2 blog posts only. Post titles may wrap to 2 lines; longer titles acceptable.

**Data Source Status:**
- Section labels: HARDCODED
- Post data: CMS-driven via `blog_posts` table (first 2 published)

---

### 9. Let's Talk CTA Section (`LetsTalkArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "Let's Talk" | 10 chars | 8–15 | HARDCODED | Low |
| Title Line 1 (H2) | "About Your Next" | 15 chars | 12–25 | CMS (A+B) | Medium |
| Title Line 2 (bold) | "Project" | 7 chars | 5–15 | CMS (A+B) | High (keyword) |
| Title Line 3 | "Your Mind" | 9 chars | 8–15 | CMS (A+B) | Low |
| CTA Label | "Get In Touch" | 12 chars | 10–20 | CMS (A+B) | Low |

**Heading Structure:** H2 (title)

**Layout Sensitivity:** Title structure is intentional (3 parts). CTA button floats right on desktop. Mobile stacks vertically.

**Data Source Status:**
- CMS-driven via `homepage_settings.cta`
- Static fallback in code

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "About us" | Hero | `/about` | Navigation | CMS |
| "How we work" | Hero | `/project-details` | Navigation | CMS |
| "view all services" | Services | `/service` | Navigation | HARDCODED |
| "read more" (×4) | Service Cards | `/service/{slug}` | Navigation | HARDCODED |
| "About more" | About | `/about` | Navigation | CMS |
| "Connect" | Newsletter | Form Submit | Conversion | HARDCODED |
| "Case Study" (×6) | Portfolio | `/project-details/{slug}` | Navigation | HARDCODED |
| "Play now" | Why Choose Us | Video Modal | Engagement | HARDCODED |
| "View All Blog" | News | `/blog` | Navigation | HARDCODED |
| "View details" (×2) | News Cards | `/blog/{slug}` | Navigation | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | Hero title with highlight | Primary keyword placement |
| H2s | Headings | Section titles throughout | Secondary keyword opportunity |
| H3s | Headings | Blog post titles | Long-tail keywords |
| H4s | Headings | Service/project titles | Entity names |
| Meta Title | Not in component | Handled at page level | Requires Pages module |
| Meta Description | Not in component | Handled at page level | Requires Pages module |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 9 |
| CMS-Driven Fields | ~45 |
| Hardcoded Labels | ~25 |
| CTAs | 11 |
| H1 Count | 2 (Hero, Newsletter - needs SEO review) |
| H2 Count | 7 |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
