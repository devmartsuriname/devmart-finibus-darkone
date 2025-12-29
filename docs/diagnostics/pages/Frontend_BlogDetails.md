# Frontend Diagnostic: Blog Details Page (Template)

**Route:** `/blog/:slug`  
**Component:** `apps/public/src/components/pages/blogDetails/BlogDetailsPage.tsx`  
**Purpose:** Informational  
**Last Verified:** 2025-12-29

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/blog/:slug` |
| Page Name | Dynamic (post title) |
| Primary Purpose | Full article content, engagement, SEO |
| SEO Type | Entity detail page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Page Title (H1) | Dynamic post title | 40–80 chars | 30–100 | CMS (B) | High |
| Breadcrumb Trail | "Home > {Post Title}" | varies | - | HARDCODED + CMS | Medium |

**Heading Structure:** H1 (post title)

**Data Source Status:** CMS-driven via `blog_posts.title`

---

### 2. Post Content (`BlogDetailsWrapper.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Featured Image | (no text) | - | - | CMS (B) | Low (alt text) |
| Post Title (H3) | Same as breadcrumb | 40–80 chars | 30–100 | CMS (B) | High |
| Author Name | "Devmart Team" | 12 chars | 8–25 | HARDCODED | Low |
| Published Date | e.g., "05 January, 2021" | 17 chars | 15–25 | CMS (B) | Low |
| Comments Count | "Comments (01)" | 13 chars | 10–20 | HARDCODED | None |
| Body Content | Full article HTML | 1000–5000 chars | 500–10000 | CMS (B) | High |
| Subheading (H4) | In-content heading | 30–60 chars | 20–80 | CMS (B) | Medium |

**Heading Structure:** H3 (title) → H4 (content subheadings)

**Layout Sensitivity:**
- 8-column main content area
- Content rendered via `dangerouslySetInnerHTML`
- Supports rich HTML formatting

**Data Source Status:**
- Post data: CMS-driven via `blog_posts` table
- Author: HARDCODED "Devmart Team"
- Comments count: HARDCODED

---

### 3. Quote Block (`BlogDetailsWrapper.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Quote Text | "Donec bibendum enim ut elit porta..." | 150–200 chars | 100–250 | HARDCODED | Low |
| Quote Author (B) | "Ambrela Jwe" | 11 chars | 8–25 | HARDCODED | None |

**Data Source Status:** HARDCODED (template parity)

**Note:** Quote block always renders regardless of content

---

### 4. Banner Section (`BlogDetailsWrapper.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Banner Content | "Donec bibendum enim ut elit porta..." | ~350 chars | 200–500 | HARDCODED | Low |

**Data Source Status:** HARDCODED (template parity)

---

### 5. Tags Row (`BlogDetailsWrapper.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Primary Tag | Post category | 8–15 chars | 5–20 | CMS (B) | Medium |
| Secondary Tags | "Software Design", "UI/UX Design" | 10–15 chars | 8–20 | HARDCODED | Medium |

**Data Source Status:**
- First tag: CMS-driven (category)
- Other tags: HARDCODED

**Gap:** Should wire to `blog_post_tags` join table

---

### 6. Social Share Row (`BlogDetailsWrapper.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Label | "share now" | 9 chars | 8–15 | HARDCODED | None |
| Social Icons | Facebook, Twitter, Pinterest, Instagram | - | - | HARDCODED | None |

**Data Source Status:** HARDCODED

---

### 7. Comments Section (`BlogDetailsComments.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Title (H4) | "Comments (02)" | 13 chars | 10–20 | HARDCODED | Low |
| Commenter Name (H5) | e.g., "Savannah Nguyen" | 16 chars | 8–30 | HARDCODED | None |
| Comment Date | "05 January, 2022" | 17 chars | 15–25 | HARDCODED | None |
| Comment Text | "Donec bibendum enim ut elit porta..." | 150–300 chars | 100–500 | HARDCODED | None |
| Reply Button | "Reply" | 5 chars | 5–10 | HARDCODED | None |
| Form Title (H4) | "Leave a Comment" | 15 chars | 12–25 | HARDCODED | None |
| Form Placeholders | "Your Full Name", "Your Email", "Write Message" | varies | 10–20 | HARDCODED | None |
| Submit Button | "Send Message" | 12 chars | 10–20 | HARDCODED | None |

**Data Source Status:** COMPLETELY HARDCODED

**Gap:** 
- Existing comments not wired to `blog_comments` table
- Comment form not functional
- Should use `blog_comments` RLS for submission

---

### 8. Sidebar (Same as Blog Page)

*See Frontend_Blog.md for sidebar widgets*

**Data Source Status:** Mostly HARDCODED

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| Tag Links (×3) | Tags Row | `#` (non-functional) | Navigation | Mixed |
| Social Share (×4) | Share Row | External social | Sharing | HARDCODED |
| "Reply" (×2) | Comments | (non-functional) | Engagement | HARDCODED |
| "Send Message" | Comment Form | (non-functional) | Conversion | HARDCODED |
| Sidebar CTAs | Sidebar | Various | Navigation | HARDCODED |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | Post title (breadcrumb) | Primary keyword |
| H3 | Heading | Post title (content) | Reinforcement |
| H4s | Headings | Content subheadings | Long-tail keywords |
| Body Content | Rich text | Full article | High SEO value |
| Category Tag | Metadata | Post classification | Low |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 8 (content) + sidebar widgets |
| CMS-Driven Fields | ~8 per post |
| Hardcoded Content | ~60% (template blocks) |
| CTAs | 10+ |
| Non-Functional UI | 3 (comment form, reply, tag links) |

---

## Gaps Identified

| Gap | Component | Current State | Required |
|-----|-----------|---------------|----------|
| Comments Display | `BlogDetailsComments.tsx` | Hardcoded examples | Wire to `blog_comments` |
| Comment Form | `BlogDetailsComments.tsx` | UI only | Functional submission |
| Tags | `BlogDetailsWrapper.tsx` | 1 CMS + 2 hardcoded | Wire to `blog_post_tags` |
| Author Name | `BlogDetailsWrapper.tsx` | Hardcoded | Optional author field |
| Quote Block | `BlogDetailsWrapper.tsx` | Hardcoded | Could be CMS field |
| Banner Content | `BlogDetailsWrapper.tsx` | Hardcoded | Could be CMS field |

---

## Blog Post Fields (per post)

| Field | Table | Column | Admin Modal Location |
|-------|-------|--------|---------------------|
| Title | blog_posts | title | Main form |
| Slug | blog_posts | slug | Main form |
| Excerpt | blog_posts | excerpt | Main form |
| Content | blog_posts | content | Main form (textarea) |
| Featured Image | blog_posts | featured_image_media_id | Right sidebar |
| Category | blog_posts | category | (UNVERIFIED - missing from modal?) |
| Status | blog_posts | status | Right sidebar |
| Published At | blog_posts | published_at | Right sidebar |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
