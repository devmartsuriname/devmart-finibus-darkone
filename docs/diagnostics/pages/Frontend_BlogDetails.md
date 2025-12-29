# Frontend Diagnostic: Blog Details Page (Template)

**Route:** `/blog/:slug`  
**Component:** `apps/public/src/components/pages/blogDetails/BlogDetailsPage.tsx`  
**Purpose:** Informational  
**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Swapability Labels, Wiring Status)

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

**Swapable via CMS:** YES  
**Reason:** Post title from CMS drives breadcrumb  
**Admin Fields Available:** `blog_posts.title`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Page Title (H1) | Dynamic post title | 40–80 chars | 30–100 | B (blog_posts.title) | High |
| Breadcrumb Trail | "Home > {Post Title}" | varies | - | HARDCODED + CMS | Medium |

**Heading Structure:** H1 (post title)

---

### 2. Post Content (`BlogDetailsWrapper.tsx`)

**Swapable via CMS:** PARTIAL  
**Reason:** Post data from CMS; author/comments count HARDCODED  
**Admin Fields Available:** `title`, `content`, `featured_image_media_id`, `published_at`, `category`  
**Public Rendering Source:** Mixed  
**Wiring Status:** PARTIAL (content WIRED, metadata NOT WIRED)

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Featured Image | (no text) | - | - | B (featured_image_media_id) | Low (alt) |
| Post Title (H3) | Same as breadcrumb | 40–80 chars | 30–100 | B (blog_posts.title) | High |
| Author Name | "Devmart Team" | 12 chars | 8–25 | HARDCODED | Low |
| Published Date | e.g., "05 January, 2021" | 17 chars | 15–25 | B (blog_posts.published_at) | Low |
| Comments Count | "Comments (01)" | 13 chars | 10–20 | HARDCODED | None |
| Body Content | Full article HTML | 1000–5000 chars | 500–10000 | B (blog_posts.content) | High |
| Subheading (H4) | In-content heading | 30–60 chars | 20–80 | B (embedded in content) | Medium |

**Heading Structure:** H3 (title) → H4 (content subheadings)

**Layout Sensitivity:** 8-column main content. Content rendered via `dangerouslySetInnerHTML`. Supports rich HTML.

---

### 3. Quote Block (`BlogDetailsWrapper.tsx`)

**Swapable via CMS:** NO  
**Reason:** HARDCODED — static Finibus template content  
**Admin Fields Available:** None  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Quote Text | "Donec bibendum enim ut elit porta..." | 150–200 chars | 100–250 | HARDCODED | Low |
| Quote Author (B) | "Ambrela Jwe" | 11 chars | 8–25 | HARDCODED | None |

**Note:** Quote block always renders regardless of post content. This is template parity.

---

### 4. Banner Section (`BlogDetailsWrapper.tsx`)

**Swapable via CMS:** NO  
**Reason:** HARDCODED — static Finibus template content  
**Admin Fields Available:** None  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Banner Content | "Donec bibendum enim ut elit porta..." | ~350 chars | 200–500 | HARDCODED | Low |

---

### 5. Tags Row (`BlogDetailsWrapper.tsx`)

**Swapable via CMS:** PARTIAL  
**Reason:** First tag from category; other tags HARDCODED  
**Admin Fields Available:** `blog_posts.category`, `blog_post_tags` (not used)  
**Public Rendering Source:** Mixed  
**Wiring Status:** PARTIAL (category WIRED, tags NOT WIRED)

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Primary Tag | Post category | 8–15 chars | 5–20 | B (blog_posts.category) | Medium |
| Secondary Tag 1 | "Software Design" | 15 chars | 8–20 | HARDCODED | Low |
| Secondary Tag 2 | "UI/UX Design" | 12 chars | 8–20 | HARDCODED | Low |

**Gap:** Should wire to `blog_post_tags` join table for full tag support.

---

### 6. Social Share Row (`BlogDetailsWrapper.tsx`)

**Swapable via CMS:** NO  
**Reason:** HARDCODED — static UI element  
**Admin Fields Available:** None  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Label | "share now" | 9 chars | 8–15 | HARDCODED | None |
| Social Icons | Facebook, Twitter, Pinterest, Instagram | - | - | HARDCODED | None |

---

### 7. Comments Section (`BlogDetailsComments.tsx`)

**Swapable via CMS:** NO  
**Reason:** COMPLETELY HARDCODED — not wired to `blog_comments`  
**Admin Fields Available:** `blog_comments` table exists but not used  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Title (H4) | "Comments (02)" | 13 chars | 10–20 | HARDCODED | Low |
| Commenter 1 Name (H5) | "Savannah Nguyen" | 16 chars | 8–30 | HARDCODED | None |
| Comment 1 Date | "05 January, 2022" | 17 chars | 15–25 | HARDCODED | None |
| Comment 1 Text | "Donec bibendum enim..." | 150–300 chars | 100–500 | HARDCODED | None |
| Reply Button | "Reply" | 5 chars | 5–10 | HARDCODED | None |
| Commenter 2 Name (H5) | "Leslie Alexander" | 17 chars | 8–30 | HARDCODED | None |
| Comment 2 Date | "05 January, 2022" | 17 chars | 15–25 | HARDCODED | None |
| Comment 2 Text | "Donec bibendum enim..." | 150–300 chars | 100–500 | HARDCODED | None |
| Form Title (H4) | "Leave a Comment" | 15 chars | 12–25 | HARDCODED | None |
| Form: Name Placeholder | "Your Full Name" | 14 chars | 10–20 | HARDCODED | None |
| Form: Email Placeholder | "Your Email" | 10 chars | 8–15 | HARDCODED | None |
| Form: Message Placeholder | "Write Message" | 13 chars | 10–20 | HARDCODED | None |
| Submit Button | "Send Message" | 12 chars | 10–20 | HARDCODED | None |

**Gap:** 
- Existing comments not wired to `blog_comments` table
- Comment form is UI-only (not functional)
- Reply buttons non-functional

---

### 8. Sidebar (Same as Blog Page)

**Swapable via CMS:** MOSTLY NO  
**Reason:** See `Frontend_Blog.md` for sidebar widget details  
**Admin Fields Available:** Various (see Blog diagnostic)  
**Public Rendering Source:** Mostly Hardcoded  
**Wiring Status:** MOSTLY NOT WIRED

*Sidebar widgets are identical to Blog listing page. See `Frontend_Blog.md` for full breakdown.*

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

## Swapability Summary

| Section | Swapable | Admin Fields Exist | Public Wired | Gap |
|---------|----------|-------------------|--------------|-----|
| Breadcrumb | ✅ YES | ✅ | ✅ | None |
| Post Content | ✅ YES | ✅ | ✅ | None |
| Post Metadata | ❌ NO | ❌ (author) | ❌ | Author hardcoded |
| Quote Block | ❌ NO | ❌ | ❌ | Static template |
| Banner Section | ❌ NO | ❌ | ❌ | Static template |
| Tags Row (category) | ✅ YES | ✅ | ✅ | None |
| Tags Row (other tags) | ❌ NO | ✅ (blog_tags) | ❌ | Not wired |
| Social Share | ❌ NO | ❌ | ❌ | Static UI |
| Comments Display | ❌ NO | ✅ (blog_comments) | ❌ | Not wired |
| Comment Form | ❌ NO | ✅ (blog_comments) | ❌ | UI-only |
| Sidebar | ❌ NO | Mixed | ❌ | See Blog diagnostic |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 8 (content) + sidebar widgets |
| CMS-Driven | 3 (Breadcrumb, Post Content, Primary Tag) |
| Hardcoded | 5+ (Quote, Banner, Comments, Social, Form) |
| CMS-Driven Fields | ~8 per post |
| Hardcoded Content | ~60% of page |
| CTAs | 10+ |
| Non-Functional UI | 3 (comment form, reply buttons, tag links) |

---

## Gaps Identified

| Gap | Component | Current State | DB Support | Priority |
|-----|-----------|---------------|------------|----------|
| Comments Display | BlogDetailsComments | Hardcoded examples | blog_comments exists | Medium |
| Comment Form | BlogDetailsComments | UI only | blog_comments exists | Medium |
| Tags | BlogDetailsWrapper | 1 CMS + 2 hardcoded | blog_post_tags exists | Low |
| Author Name | BlogDetailsWrapper | Hardcoded "Devmart Team" | Could add author field | Low |
| Quote Block | BlogDetailsWrapper | Hardcoded | Could be CMS field | Low |
| Banner Content | BlogDetailsWrapper | Hardcoded | Could be CMS field | Low |

---

## Blog Post Fields (per post)

| Field | Table | Column | Admin Modal | Wired |
|-------|-------|--------|-------------|-------|
| Title | blog_posts | title | Main form | ✅ |
| Slug | blog_posts | slug | Main form | ✅ |
| Excerpt | blog_posts | excerpt | Main form | ✅ |
| Content | blog_posts | content | Main form | ✅ |
| Featured Image | blog_posts | featured_image_media_id | Main form | ✅ |
| Category | blog_posts | category | UNVERIFIED | ⚠️ Partial |
| Status | blog_posts | status | Main form | ✅ |
| Published At | blog_posts | published_at | Main form | ✅ |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
