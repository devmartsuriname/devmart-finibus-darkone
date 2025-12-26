# Phase 9A — Page UI Blocks Architecture Blueprint

```
Status: DEFINITION COMPLETE — Execution not started
Phase: 9A
Created: 2025-12-26
Prerequisite: Phase 8 CLOSED AND VERIFIED
Mode: DOCUMENTATION ONLY
```

---

## 1. Executive Summary

This blueprint defines a **scalable, governance-safe architecture** for extending the Homepage UI Blocks model to other static pages, starting with the **About page** as pilot — while keeping Homepage as the locked master reference.

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| Homepage (`homepage_settings`) is LOCKED | Master reference, no refactoring |
| New `page_settings` table for page-specific blocks | Generic model for any page |
| New `global_blocks` table for shared blocks | Single source for cross-page content |
| About page is first consumer | Pilot implementation |

### Three-Table Model

```
┌─────────────────────────────────────────────────────────┐
│                  UI Blocks Data Layer                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────────────┐                               │
│   │  homepage_settings  │  ← Phase 8 (LOCKED)           │
│   │  (id: 1, JSONB)     │     Homepage-only data        │
│   │                     │     NO CHANGES IN PHASE 9     │
│   └─────────────────────┘                               │
│                                                         │
│   ┌─────────────────────┐                               │
│   │    global_blocks    │  ← Phase 9 (NEW)              │
│   │  (block_key, JSONB) │     Shared blocks across      │
│   │                     │     multiple pages            │
│   └─────────────────────┘                               │
│                                                         │
│   ┌─────────────────────┐                               │
│   │   page_settings     │  ← Phase 9 (NEW)              │
│   │  (page_slug, JSONB) │     Page-specific UI blocks   │
│   └─────────────────────┘                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Data Model Definitions (PROPOSED — NO CREATION)

### 2.1 `page_settings` Table

**Purpose:** Store page-specific UI block data for any static page.

```sql
-- PROPOSED SCHEMA (NOT EXECUTED)
CREATE TABLE public.page_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text UNIQUE NOT NULL,
  data jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- RLS Policies (Proposed)
ALTER TABLE public.page_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage page settings"
ON public.page_settings FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read page settings"
ON public.page_settings FOR SELECT
USING (true);
```

**Key Constraints:**

- One row per `page_slug`
- `page_slug` must match `pages.slug` (referential integrity via application logic)
- JSONB structure varies per page type

### 2.2 `global_blocks` Table

**Purpose:** Store shared UI blocks used across multiple pages.

```sql
-- PROPOSED SCHEMA (NOT EXECUTED)
CREATE TABLE public.global_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  block_key text UNIQUE NOT NULL,
  data jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- RLS Policies (Proposed)
ALTER TABLE public.global_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage global blocks"
ON public.global_blocks FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read global blocks"
ON public.global_blocks FOR SELECT
USING (true);
```

**Initial Block Keys (Proposed):**

| block_key | Purpose | Current Source |
|-----------|---------|----------------|
| `cta_strip` | "Let's Talk" CTA section | `homepage_settings.data.cta` |
| `why_choose_us` | "Why Choose Us" section | `homepage_settings.data.why_choose` |

---

## 3. Block Ownership Matrix

### 3.1 Global Blocks (Shared Across Pages)

| Block Key | Description | Used By |
|-----------|-------------|---------|
| `cta_strip` | "Let's Talk" CTA section | Homepage, About, Services, Contact |
| `why_choose_us` | "Why Choose Us" section | Homepage, About |

### 3.2 Page-Specific Blocks

| Page | Block Key | Description |
|------|-----------|-------------|
| About | `inside_story` | "Inside Story" section with CTO message |
| About | `latest_news` | Section config for latest blog posts |
| Services | `hero` | Services page hero section |
| Careers | `positions` | Job listings section config |

### 3.3 Dynamic Modules (NOT UI Blocks)

| Module | Table | Used By |
|--------|-------|---------|
| Services | `services` | Homepage, Services page |
| Projects | `projects` | Homepage, Projects page |
| Testimonials | `testimonials` | Homepage, About page |
| Blog Posts | `blog_posts` | Homepage, Blog page |

---

## 4. About Page — Section Mapping

### 4.1 Current State Analysis

| Section | Component | Current Data Source | Phase 9 Target |
|---------|-----------|---------------------|----------------|
| Breadcrumb | `Breadcrumb` | Props | `pages.title` (existing) |
| Inside Story | `InsideStoryArea` | **STATIC (hardcoded)** | `page_settings.about.inside_story` |
| Why Choose Us | `WhyChooseUsArea` | `homepage_settings.data.why_choose` | `global_blocks.why_choose_us` |
| Testimonials | `TestimonialArea` | `testimonials` table | `testimonials` table (unchanged) |
| Latest News | `LatesNewsArea` | **STATIC (hardcoded)** | `page_settings.about.latest_news` |
| Let's Talk | `LetsTalkArea` | `homepage_settings.data.cta` | `global_blocks.cta_strip` |

### 4.2 Phase 9 Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                  About Page Data Flow                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  PAGE-SPECIFIC BLOCKS                                   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  page_settings (page_slug = 'about')            │   │
│  │  ├── data.inside_story → InsideStoryArea        │   │
│  │  └── data.latest_news → LatesNewsArea (config)  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  SHARED BLOCKS                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  global_blocks                                   │   │
│  │  ├── why_choose_us → WhyChooseUsArea            │   │
│  │  └── cta_strip → LetsTalkArea                   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  DYNAMIC MODULES (unchanged)                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │  testimonials table → TestimonialArea           │   │
│  │  blog_posts table → LatesNewsArea (items)       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4.3 JSONB Structure for About Page (`page_settings`)

```jsonb
{
  "inside_story": {
    "enabled": true,
    "section_label": "Inside Story",
    "title": "We are creative Agency that creates beautiful.",
    "description": "Integer purus odio, placerat nec rhoncus...",
    "main_image_url": "/images/story.png",
    "main_image_media_id": null,
    "cto_message": "Integer purus odio, placerat neclessi rhoncus...",
    "cto_name": "Carlo Rabil.",
    "cto_title": "CTO & FOUNDER, Finibus",
    "cto_signature_url": "/images/cto-signature.png",
    "cto_signature_media_id": null,
    "progress_stats": [
      { "label": "Idea & Research", "percent": 90 },
      { "label": "Wireframe & Design", "percent": 95 },
      { "label": "Developing & Launch", "percent": 88 }
    ]
  },
  "latest_news": {
    "enabled": true,
    "section_label": "Blog",
    "section_title": "Latest news And Article modern design.",
    "view_all_label": "View All Blog",
    "view_all_url": "/blog",
    "posts_count": 2
  }
}
```

### 4.4 JSONB Structure for `global_blocks`

**CTA Strip (`block_key = 'cta_strip'`):**

```jsonb
{
  "enabled": true,
  "title": "Let's Talk About Your Project",
  "subtitle": "We're ready to help you achieve your goals",
  "button_text": "Get Started",
  "button_url": "/contact",
  "background_media_id": null
}
```

**Why Choose Us (`block_key = 'why_choose_us'`):**

```jsonb
{
  "enabled": true,
  "title": "Why Choose Us",
  "subtitle": "We bring creative solutions to life",
  "features": [
    { "icon": "icon-class", "title": "Feature 1", "description": "..." },
    { "icon": "icon-class", "title": "Feature 2", "description": "..." }
  ],
  "skills": [
    { "name": "Design", "percentage": 95 },
    { "name": "Development", "percentage": 90 }
  ],
  "image_media_id": null
}
```

---

## 5. Page Strategy

### 5.1 Homepage (LOCKED — Master Reference)

| Aspect | Status |
|--------|--------|
| Data source | `homepage_settings` table |
| Phase 8 implementation | ✅ COMPLETE |
| Phase 9 changes | ❌ NONE |
| Migration to new tables | ❌ NOT PLANNED |

**Critical:** Homepage continues to use `homepage_settings` exclusively. No data migration, no refactoring.

### 5.2 About Page (Pilot — Phase 9 Target)

| Aspect | Status |
|--------|--------|
| Data source | `page_settings` + `global_blocks` |
| Phase 9 implementation | ⬜ PLANNED |
| Admin UX | Modal tabs (Page Info, Sections, Shared, SEO) |

### 5.3 Future Pages (Documented for Readiness)

| Page | Status | Notes |
|------|--------|-------|
| Services | 📋 Future | Page-specific hero + global CTA |
| Careers | 📋 Future | Page-specific job listings section |
| Pricing | 📋 Future | Page-specific pricing tables |
| Contact | 📋 Future | Minimal UI blocks (form config) |

---

## 6. Admin UX Blueprint (NO CODE)

### 6.1 Integration Point

- **Pages module** → Edit page → Extended modal for UI Block-enabled pages
- Detection: Check if `page_slug` has corresponding `page_settings` row

### 6.2 Modal Tabs for About Page

| Tab | Contents |
|-----|----------|
| **Page Info** | Title, slug (read-only), published toggle |
| **Sections** | Inside Story, Latest News (page-specific blocks) |
| **Shared Blocks** | Read-only panel showing shared block sources |
| **SEO** | Meta title, meta description, OG image |

### 6.3 Sections Tab Layout

```
┌─────────────────────────────────────────────────────┐
│ About Page Sections                                 │
├─────────────────────────────────────────────────────┤
│ PAGE-SPECIFIC BLOCKS                                │
├─────────────────────────────────────────────────────┤
│ ☑ Inside Story                             [Edit]  │
│ ☑ Latest News                              [Edit]  │
├─────────────────────────────────────────────────────┤
│ SHARED BLOCKS (from Global Blocks)                  │
├─────────────────────────────────────────────────────┤
│ ✓ Why Choose Us     [Edit in Global Blocks]        │
│ ✓ Testimonials      [Manage in Testimonials]       │
│ ✓ Let's Talk CTA    [Edit in Global Blocks]        │
└─────────────────────────────────────────────────────┘
```

### 6.4 Shared Blocks Admin (New Module)

**Route:** `/admin/content/global-blocks`

**List View:**

| Block | Description | Actions |
|-------|-------------|---------|
| CTA Strip | "Let's Talk" section | [Edit] |
| Why Choose Us | Features + Skills section | [Edit] |

**Edit Modal:** Standard Darkone modal with JSONB form fields.

### 6.5 Constraints (Enforced)

- ❌ No delete button for sections
- ❌ No reorder/drag functionality
- ❌ No add new section button
- ✅ Fixed section list per page type
- ✅ Shared blocks show read-only status with navigation links

---

## 7. Read/Write Flow

### 7.1 Admin Write Flow

```
Admin UI
    │
    ├── Page-Specific Sections
    │   └── POST /api/page_settings
    │       └── UPDATE page_settings SET data = {...} WHERE page_slug = 'about'
    │
    └── Global Blocks
        └── POST /api/global_blocks
            └── UPDATE global_blocks SET data = {...} WHERE block_key = 'cta_strip'
```

### 7.2 Public Read Flow

```
Public Frontend
    │
    ├── About Page Component
    │   ├── usePageSettings('about') → page_settings.data
    │   ├── useGlobalBlocks(['cta_strip', 'why_choose_us']) → global_blocks.data
    │   └── useTestimonials() → testimonials table
    │
    └── Render Components
        ├── InsideStoryArea ← page_settings.data.inside_story
        ├── WhyChooseUsArea ← global_blocks.why_choose_us
        ├── TestimonialArea ← testimonials table
        ├── LatesNewsArea ← page_settings.data.latest_news + blog_posts
        └── LetsTalkArea ← global_blocks.cta_strip
```

---

## 8. Governance & Safety Rules

### 8.1 CSS Isolation (MANDATORY)

| Rule | Enforcement |
|------|-------------|
| Admin SCSS stays in `apps/admin` | ✅ No cross-imports |
| Finibus SCSS stays in `apps/public` | ✅ No cross-imports |
| No shared CSS tokens | ✅ Separate design systems |
| No Bootstrap mixing | ✅ Each app has its own Bootstrap |

### 8.2 Homepage Protection

| Rule | Enforcement |
|------|-------------|
| `homepage_settings` table is LOCKED | ✅ No schema changes |
| No data migration from `homepage_settings` | ✅ Separate data sources |
| No RLS changes to `homepage_settings` | ✅ Phase 8 policies remain |
| Homepage continues using existing hooks | ✅ `useHomepageSettings` unchanged |

### 8.3 Block Duplication Prevention

| Rule | Enforcement |
|------|-------------|
| Shared blocks are consumed, NOT copied | ✅ Single source in `global_blocks` |
| No duplicate CTA data in `page_settings` | ✅ Reference `global_blocks` only |
| No duplicate "Why Choose Us" per page | ✅ Reference `global_blocks` only |

### 8.4 Stop Conditions

If any of these occur during execution, **STOP and REPORT**:

- Attempt to modify `homepage_settings` structure
- Request to refactor shared component data sources before migration complete
- Frontend CSS/styling changes required
- RLS policy conflicts detected
- Database constraint violations

---

## 9. Future Pages Readiness

| Page | `page_settings` Blocks | `global_blocks` Usage |
|------|------------------------|----------------------|
| About | `inside_story`, `latest_news` | `cta_strip`, `why_choose_us` |
| Services | `hero`, `process_overview` | `cta_strip` |
| Careers | `hero`, `positions_config` | `cta_strip` |
| Pricing | `hero`, `comparison_config` | `cta_strip` |
| Contact | `form_config` | `cta_strip` |

---

## 10. Phase 9 Execution Plan (NOT EXECUTED)

### Phase 9A: Definition (THIS PHASE) ✅

- Architecture blueprint
- Data model definitions
- Admin UX blueprint
- Governance rules
- Documentation updates

### Phase 9B: Database (AWAITING AUTHORIZATION)

- Create `page_settings` table
- Create `global_blocks` table
- RLS policies
- Seed About page data (extract from hardcoded)
- Seed global blocks data

### Phase 9C: Admin UI (AWAITING AUTHORIZATION)

- Global Blocks module
- Page-specific sections tab
- Edit modals for page-specific blocks
- Shared blocks read-only indicators

### Phase 9D: Frontend Wiring (AWAITING AUTHORIZATION)

- `usePageSettings` hook
- `useGlobalBlocks` hook
- Wire About page components
- Testing and verification

---

## 11. Verification Checklist (For Future Execution)

### Database

| Check | Status |
|-------|--------|
| `page_settings` table created | ⬜ |
| `global_blocks` table created | ⬜ |
| RLS policies applied | ⬜ |
| About page seed data inserted | ⬜ |
| Global blocks seed data inserted | ⬜ |

### Admin UI

| Check | Status |
|-------|--------|
| Global Blocks module accessible | ⬜ |
| About page shows extended modal | ⬜ |
| Sections tab displays correctly | ⬜ |
| Edit modals work for page-specific blocks | ⬜ |
| Shared blocks show read-only status | ⬜ |
| Save persists to database | ⬜ |

### Frontend

| Check | Status |
|-------|--------|
| About page reads from `page_settings` | ⬜ |
| Shared components read from `global_blocks` | ⬜ |
| Enable/disable toggle works | ⬜ |
| No console errors | ⬜ |
| 1:1 Finibus parity maintained | ⬜ |

---

## 12. Explicit Statements

- ✅ **Phase 9A is DEFINITION-COMPLETE**
- ❌ **No execution performed**
- ❌ **No database tables created**
- ❌ **No code written**
- ❌ **No frontend touched**
- ❌ **No SCSS touched**
- ❌ **No `homepage_settings` modified**

---

## 13. Decisions Requiring User Approval Before Phase 9B

1. **`page_settings` table creation** — Confirm schema and RLS policies
2. **`global_blocks` table creation** — Confirm schema and RLS policies
3. **Initial block keys** — Confirm `cta_strip` and `why_choose_us` as first global blocks
4. **Seeding strategy** — Confirm extraction of hardcoded values from `InsideStoryArea.tsx` and `LatesNewsArea.tsx`
5. **Shared blocks admin module** — Confirm new route `/admin/content/global-blocks`

---

```
Phase 9A: DEFINITION COMPLETE
Execution: NOT PERFORMED
Database: NO CHANGES
Code: NO CHANGES
Styling: NO CHANGES
```
