# Architecture Documentation

**Status:** ✅ PHASE 12 COMPLETE — FRONTEND FROZEN  
**Phase:** Phase 12 CLOSED | Phase 4D ✅ CLOSED | Phase 5 SEO ✅ EXECUTED  
**Last Updated:** 2025-12-31

---

## Phase 5 — Public SEO Wiring (2025-12-31)

**Status:** ✅ **EXECUTED** (5.1 + 5.2 ONLY)

### Objective

Render SEO meta tags on public detail pages using existing database fields and the 3-tier fallback hierarchy.

### Implementation Summary

| Phase | Module | SEO Component | Status |
|-------|--------|---------------|--------|
| 5.1 | Services | `ServiceDetailsSeo.tsx` | ✅ COMPLETE |
| 5.2 | Projects | `ProjectDetailsSeo.tsx` | ✅ COMPLETE |
| Blog | Blog | `BlogDetailsSeo.tsx` | ✅ (Pre-existing) |

### Files Created

| File | Purpose |
|------|---------|
| `apps/public/src/components/pages/ServiceDetails/ServiceDetailsSeo.tsx` | SEO meta tags for service details |
| `apps/public/src/components/pages/projectDetails/ProjectDetailsSeo.tsx` | SEO meta tags for project details |

### Files Modified

| File | Change |
|------|--------|
| `apps/public/src/hooks/useServiceDetails.ts` | Added SEO fields to SELECT query + og_image join |
| `apps/public/src/hooks/useProjectDetails.ts` | Added SEO fields to SELECT query + og_image join |
| `apps/public/src/hooks/useProjects.ts` | Extended ProjectWithMedia interface with SEO fields |
| `apps/public/src/components/pages/ServiceDetails/ServiceDetailsPage.tsx` | Wired ServiceDetailsSeo |
| `apps/public/src/components/pages/projectDetails/ProjectDetailsPage.tsx` | Wired ProjectDetailsSeo |

### SEO Meta Tags Rendered

- `<title>` — Resolved via fallback hierarchy
- `<meta name="description">` — Resolved via fallback hierarchy
- `<meta name="robots">` — noindex handling
- `<link rel="canonical">` — From database
- `<meta property="og:*">` — Open Graph tags
- `<meta name="twitter:*">` — Twitter Card tags

### Guardian Rules Compliance

- ✅ Frontend layout unchanged (meta tags only)
- ✅ No schema changes
- ✅ No new packages
- ✅ No routing changes
- ✅ Darkone Admin 1:1 preserved
- ✅ Finibus Public UI 1:1 preserved

---

## Phase 4D — URL Normalization (2025-12-31)

**Status:** ✅ **VERIFIED AND CLOSED**

### URL Normalization Strategy

Phase 4D defines the approach for normalizing canonical URLs across all content modules.

#### Domain Normalization

| Setting | Before | After |
|---------|--------|-------|
| Domain | `https://devmart.co` | `https://devmart.sr` |
| Status | ✅ NORMALIZED | All 25 records updated |

#### Path Pattern Alignment (Finibus Parity)

| Module | Current Path | Target Path |
|--------|--------------|-------------|
| Services | `/services/{slug}` | `/service-details/{slug}` |
| Projects | `/projects/{slug}` | `/project-details/{slug}` |
| Blog | `/blog/{slug}` (relative) | `https://devmart.sr/blog/{slug}` (absolute) |
| Pages | Inconsistent | `https://devmart.sr/{slug}` |

#### Canonical URL Behavior

- Canonical URLs are **stored** in database (not enforced via redirects)
- Canonical URLs are rendered in `<link rel="canonical">` meta tags
- No server-side redirects implemented
- No URL enforcement at application layer

#### Execution Results

| Module | Records | Status |
|--------|---------|--------|
| Services | 7 | ✅ Normalized |
| Projects | 5 | ✅ Normalized |
| Blog Posts | 6 | ✅ Normalized |
| Pages | 7 | ✅ Normalized |

**Total:** 25 records updated

#### Restore Point

Pre-execution state documented in `docs/restore-points/Restore_Point_Phase_4D_URL_Normalization.md`

See: `docs/phase-4/Phase_4D_URL_Normalization_Plan.md`

---

## Phase 4C — Projects SEO Expansion (2025-12-31)

**Status:** ✅ **CLOSED**

### SEO Parity Achievement

All 4 content modules now have full SEO capability:

| Module | meta_title | meta_description | og_image | canonical_url | noindex | Status |
|--------|------------|------------------|----------|---------------|---------|--------|
| Blog | ✅ | ✅ | ✅ | ✅ | ✅ | COMPLETE |
| Pages | ✅ | ✅ | ✅ | ✅ | ✅ | COMPLETE |
| Services | ✅ | ✅ | ✅ | ✅ | ✅ | COMPLETE |
| Projects | ✅ | ✅ | ✅ | ✅ | ✅ | COMPLETE |

### Project Process Steps Correction

All 5 published projects now have 4 process steps (was 3).
Step order: 1 → 2 → 3 → 4 (stored and rendered correctly).

### Canonical Domain Status

| Setting | Value |
|---------|-------|
| Current canonical URLs | `https://devmart.co/...` |
| Production domain | `https://devmart.sr` |
| Status | INTENTIONAL MISMATCH |
| Resolution | Phase 4D (planning complete, execution pending) |

---

## App Separation Architecture

### Strict Separation Between Apps

```
┌─────────────────────────────────────────────────────────────┐
│                  App Architecture                            │
├─────────────────────────────────────────────────────────────┤
│  apps/public/                                                │
│    ├── src/hooks/           (public-only hooks)              │
│    ├── src/lib/seo/         (public SEO utilities)           │
│    ├── src/components/      (Finibus components)             │
│    └── Fully self-contained — NO imports from admin          │
│                                                              │
│  apps/admin/ (or src/ for admin)                             │
│    ├── src/hooks/           (admin-only hooks)               │
│    ├── src/lib/seo/         (admin SEO utilities)            │
│    ├── src/components/      (Darkone components)             │
│    └── Fully self-contained — NO imports from public         │
│                                                              │
│  CRITICAL: No cross-app imports permitted                    │
│  If shared utility needed → copy to both apps                │
└─────────────────────────────────────────────────────────────┘
```

**Stability Note (Phase 3):** The `resolveSeoFallbacks.ts` utility exists in both apps to maintain strict separation.

---

## Admin Blog Enhancement — Phase 3: SEO Fallback Wiring (2025-12-31)

**Status:** ✅ **CLOSED**

### Public Blog SEO Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Blog Details SEO Flow                       │
├─────────────────────────────────────────────────────────────┤
│  BlogDetailsPage.tsx                                         │
│    ├── useBlogDetails(slug) → fetches post data              │
│    ├── <BlogDetailsSeo post={post} />                        │
│    │     ├── useGlobalSeoSettings() → fallback tier 3        │
│    │     ├── resolveSeoFallbacks() → 3-tier resolution       │
│    │     └── <Helmet> → injects meta tags                    │
│    └── <BlogDetailsWrapper ... />                            │
└─────────────────────────────────────────────────────────────┘
```

### SEO Resolution Priority

```
┌─────────────────────────────────────────────────────────────┐
│                  SEO Fallback Hierarchy                      │
├─────────────────────────────────────────────────────────────┤
│  Priority 1: Post SEO Fields                                 │
│    └── meta_title, meta_description, og_image_media_id,      │
│        canonical_url, noindex                                │
│                                                              │
│  Priority 2: Content-Derived Values                          │
│    └── title → meta_title, excerpt → description,            │
│        featured_image → OG image, /blog/{slug} → canonical   │
│                                                              │
│  Priority 3: Global SEO Settings                             │
│    └── default_meta_title, default_meta_description,         │
│        default_og_image_media_id from settings table         │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3 Closure Confirmation

- **Public SEO wiring:** Complete and verified
- **App separation:** Enforced (no cross-app imports)
- **Frontend layout:** Unchanged (frozen)
- **Schema:** Unchanged (no migrations)

---

## Admin Blog Enhancement — Phase 2.1a–2.3: Field Parity + Wiring + Seeding (2025-12-31)

**Status:** ✅ **COMPLETE + FINALIZED**

### Phase 2.1a: Schema Migration (ADDITIVE ONLY)
Added 5 new columns to `blog_posts` for blog details page parity:

| Column | Type | Purpose |
|--------|------|---------|
| `quote_text` | TEXT | Quote block text |
| `quote_author` | TEXT | Quote attribution |
| `secondary_image_media_id` | UUID FK | Banner section image |
| `secondary_content` | TEXT | Banner section body text |
| `author_display_name` | TEXT | Author display name (default: "Devmart Team") |

### Phase 2.2–2.3: Public Wiring + Seeding
- useBlogDetails hook extended with 11 new fields
- BlogDetailsWrapper props wired with fallbacks
- All 6 published posts seeded with unique, article-derived content
- Tags populated (3 per post)

### Per-Post Unique Content (2025-12-31)
All 6 posts now have:
- Unique `quote_text` derived from article content
- Unique `secondary_content` derived from article content
- Relevant `tags` array (3 tags each)

### What Was NOT Changed
- Public frontend layout (frontend frozen — data binding only)
- Existing blog_posts columns (additive only)
- No new npm packages
- Image fields left NULL for manual selection

---

## Admin Blog Enhancement — Phase 2.2: Comments Removal (2025-12-31)

**Status:** ✅ **COMPLETE**

### Decision
Blog comments are **permanently disabled**. This is a policy decision documented in `docs/Policy_Blog_Comments_Disabled.md`.

### Changes Made
- Removed `<BlogDetailsComments />` from BlogDetailsPage.tsx
- Removed "Comments (01)" counter from BlogDetailsWrapper.tsx
- `blog_comments` table marked DEPRECATED (not dropped, 8 records preserved)

### What Was NOT Changed
- BlogDetailsComments.tsx component file retained for reference
- Database table preserved for schema history
- No layout or styling modifications

---

## Admin Blog Enhancement — Phase 2.1: Field Parity Audit (2025-12-31)

**Status:** ✅ **COMPLETE**

### Audit Result
All 20 blog_posts columns verified. 18 editable via Admin Modal, 4 auto-managed (id, author_id, created_at, updated_at).

See: `docs/Blog_Field_Parity_Matrix.md` for complete parity table.

### Conclusion
No missing fields. Admin → DB → Frontend parity confirmed for existing schema.

---

## Admin Blog Enhancement — Phase 2: Modal UX Upgrade (2025-12-31)

**Status:** ✅ **COMPLETE**

### Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  BlogPostModal (4-Tab Layout)                │
├─────────────────────────────────────────────────────────────┤
│  Tab 1: Content                                              │
│    ├── Title, Slug, Excerpt fields                           │
│    └── ContentBlocksEditor                                   │
│         ├── Block types: paragraph, heading, list,           │
│         │   quote, image                                     │
│         ├── Add/Edit/Delete/Reorder controls                 │
│         └── Falls back to textarea for legacy posts          │
│                                                              │
│  Tab 2: Taxonomy                                             │
│    ├── CategorySelector (dropdown + add-new)                 │
│    └── TagsInput (chip-style array input)                    │
│                                                              │
│  Tab 3: Media & Publishing                                   │
│    ├── Featured Image (MediaPicker)                          │
│    ├── Status (draft/published)                              │
│    └── Publish Date                                          │
│                                                              │
│  Tab 4: SEO                                                  │
│    ├── Meta Title (70 char counter)                          │
│    ├── Meta Description (160 char counter)                   │
│    ├── OG Image (MediaPicker)                                │
│    ├── Canonical URL                                         │
│    └── Noindex toggle                                        │
└─────────────────────────────────────────────────────────────┘
```

### Content Compile Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  On Save (Admin Modal)                       │
├─────────────────────────────────────────────────────────────┤
│  1. Validate content_blocks structure                        │
│  2. compileBlocksToHtml(content_blocks) → HTML string        │
│  3. Save both:                                               │
│     └── content_blocks (JSONB) - authoring source            │
│     └── content (TEXT) - compiled HTML for public render     │
└─────────────────────────────────────────────────────────────┘
```

### ContentBlock Type Definition

```typescript
interface ContentBlock {
  id: string
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'image'
  content: string
  level?: 2 | 3 | 4           // For headings: h2, h3, h4
  items?: string[]            // For lists
}
```

### Files Created

| File | Purpose |
|------|---------|
| `components/ContentBlocksEditor.tsx` | Structured content editing UI |
| `components/CategorySelector.tsx` | Category dropdown with add-new |
| `components/TagsInput.tsx` | Tags array chip input |
| `utils/compileContent.ts` | JSONB → HTML compiler + validators |

---

## Admin Blog Enhancement — Phase 1: Schema Enhancements (2025-12-31)

**Status:** ✅ **COMPLETE**

### Dual-Storage Content Model

```
┌─────────────────────────────────────────────────────────────┐
│                  Blog Content Architecture                   │
├─────────────────────────────────────────────────────────────┤
│  AUTHORING (Admin)                                           │
│    └── content_blocks (JSONB)                                │
│         └── Structured block array                           │
│         └── Edited via structured UI (Phase 2)               │
│                                                              │
│  RENDERING (Public)                                          │
│    └── content (TEXT)                                        │
│         └── HTML string                                      │
│         └── Rendered via dangerouslySetInnerHTML             │
│         └── UNCHANGED (frontend frozen)                      │
│                                                              │
│  COMPILE (On Save)                                           │
│    └── content_blocks → [compileBlocksToHtml] → content      │
└─────────────────────────────────────────────────────────────┘
```

### SEO Governance Model

```
┌─────────────────────────────────────────────────────────────┐
│                  SEO Field Fallback Order                    │
├─────────────────────────────────────────────────────────────┤
│  Priority 1: Blog Post SEO Fields                            │
│    └── meta_title, meta_description, og_image_media_id,      │
│        canonical_url, noindex                                │
│                                                              │
│  Priority 2: Blog Static Page SEO                            │
│    └── page_settings where page_slug = 'blog'                │
│                                                              │
│  Priority 3: Global SEO Settings                             │
│    └── settings table (seo category)                         │
└─────────────────────────────────────────────────────────────┘
```

### New Database Columns (blog_posts)

| Column | Type | Purpose |
|--------|------|---------|
| content_blocks | JSONB | Structured authoring data |
| tags | TEXT[] | Taxonomy tags array |
| meta_title | TEXT | SEO title (max 70) |
| meta_description | TEXT | SEO description (max 160) |
| og_image_media_id | UUID | OG image FK |
| canonical_url | TEXT | Canonical URL |
| noindex | BOOLEAN | Search indexing control |

### Constraints Applied
- `blog_posts_meta_title_length` — max 70 chars
- `blog_posts_meta_description_length` — max 160 chars

### Indexes Added
- GIN index on `tags` for array operations
- B-tree index on `category` for filtering

---

## Overview

This document outlines the architecture decisions and validation requirements for the Devmart project.

---

## Project Structure

- **Public Frontend:** Finibus template (apps/public or src/)
- **Admin Backend:** Darkone template (apps/admin)
- **Database:** Supabase
- **Authentication:** Supabase Auth (planned, demo auth currently active)

---

## Runtime Validation

### Clean-Environment Testing Requirement

**Mandatory for acceptance:** All runtime validation must be performed in a clean environment before results are accepted.

#### Required Test Environments

1. **Incognito mode** (all extensions disabled)
2. **Clean browser profile** (no extensions, fresh cache)
3. **Lovable Preview** (isolated sandbox)

#### Validation Criteria

- **PASS:** 0 errors, 0 warnings in clean environments
- **External/Out of Scope:** Errors originating from `contentScript.js` or other extension scripts
- **FAIL:** Any error originating from application code (`src/`, `apps/`)

#### Error Attribution Process

1. Capture error in normal browser
2. Reproduce in Incognito mode
3. If error disappears → External (browser extension)
4. If error persists → Application bug (requires fix)

### Stability Fixes Applied (2025-12-27)

**Public App:**
- Header.tsx: Fixed `/blog-details` → `/blog` (route was undefined)
- Footer.tsx: Fixed 4x placeholder `#` links → `/commingsoon`

**Admin App:**
- useMediaLibrary.ts: Applied useRef pattern for `notifySuccess`/`notifyError`
- useGlobalBlocks.ts: Applied useRef pattern, removed unstable deps from `useCallback` arrays

**Result:** All fixes are wiring/stability only, no new features added.

### URL Fix Option A (2025-12-29)

**Broken Service Links Fixed:**
- Footer.tsx: 6 "Our Services" links changed from `/service-details` (no slug) → `/service`
- ServiceList.tsx: 6 blog sidebar links changed from `/service-details` (no slug) → `/service`

### Phase 12.5 — Projects Verification (2025-12-29)

**GAP-PROJ-001 Fixed:**
- HeroArea.tsx: 3 STATIC_SLIDES fallback `cta2_url` changed from `/project-details` (no slug) → `/project`
- Note: DB hero slides already had correct URLs — fix applies to fallback only

### Phase 12.6 — Blog Content Swap (2025-12-29)

**Type:** DB-Only Content Replacement (NO code changes)

**Posts Updated:** 5 of 6 published blog posts  
**Post Skipped:** `design-thinking-modern-enterprise` (production-ready)

**Fields Changed:** title, excerpt, content, category (where specified)  
**Fields Preserved:** id, slug, featured_image_media_id, status, published_at, author_id

**Structural Changes:** NONE (schema, routes, components unchanged)

### Phase 12.X — Projects Content Swap (2025-12-30)

**Type:** DB-Only Content Replacement (NO code changes)

**Projects Updated:** 5 of 5 published projects (slugs changed to anonymized capability cases)

| Old Slug | New Slug |
|----------|----------|
| `corporate-brand-identity` | `national-digital-services-portal` |
| `ecommerce-platform-redesign` | `immigration-case-management-system` |
| `saas-dashboard-interface` | `enterprise-operations-dashboard` |
| `mobile-banking-application` | `housing-registration-subsidy-platform` |
| `restaurant-website-ordering` | `saas-management-analytics-platform` |

**Process Steps:** Step 4 deleted from all projects (20 → 15 total)

**Fields Changed:** title, slug, heading, description, category, client, website (NULL), start_date, end_date, check_launch_content  
**Fields Preserved:** id, image_media_id, featured_image_media_id, check_launch_image_media_id, status, is_featured, display_order

**Structural Changes:** NONE (schema, routes, components unchanged)

**Canonical Routes (Single Source of Truth):**

| Content Type | Canonical Route |
|--------------|-----------------|
| Service Details | `/service-details/:slug` |
| Project Details | `/project-details/:slug` |
| Blog Details | `/blog/:slug` |
| Services Listing | `/service` |
| Projects Listing | `/project` |
| Blog Listing | `/blog` |

---

## Template Rules

### Finibus (Public Frontend)
- 100% 1:1 template parity required
- No modifications to Bootstrap
- No SCSS refactors
- No token changes

### Darkone (Admin Backend)
- 100% 1:1 template parity required
- Supabase authentication: **IMPLEMENTED** (admin role enforcement)
- Dashboard layout and sidebar preserved

---

## Phase 11B — Branding Settings (2025-12-27)

**Status:** ✅ **COMPLETE**

### Scope
- Admin can manage theme colors via Settings → Branding tab
- Color keys: `primary_color`, `secondary_color`, `accent_color`
- Public frontend color injection: **NOT IMPLEMENTED** (requires explicit authorization)

### Settings Flow Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Admin Settings Page                       │
├─────────────────────────────────────────────────────────────┤
│  FormValues (React state)                                    │
│    ├── general keys (site_name, contact_email, etc.)        │
│    ├── seo keys (default_meta_title, etc.)                  │
│    ├── social keys (facebook_url, etc.)                     │
│    └── branding keys (primary_color, secondary_color, etc.) │
├─────────────────────────────────────────────────────────────┤
│  handleChange(key, value) → updates FormValues + hasChanges │
├─────────────────────────────────────────────────────────────┤
│  handleSave() → updateSettings(updates[])                   │
│    └── supabase.from('settings').update() for each key      │
├─────────────────────────────────────────────────────────────┤
│  fetchSettings() → refreshes FormValues from DB             │
└─────────────────────────────────────────────────────────────┘
```

### Constraints
- **Fonts LOCKED** — No font customization added
- **No SCSS modifications** — UI changes only
- **No layout redesign** — Replaced placeholder content only

### Files Modified
1. `src/app/(admin)/settings/page.tsx` — Added color keys to form state
2. `src/app/(admin)/settings/components/BrandingSettingsTab.tsx` — Added color pickers

### Regression Verification
All Settings tabs (General/SEO/Social/Branding) verified: Save + Persist + 0 errors

---

## Phase 11C — Color Map Contract (2025-12-27)

**Status:** ✅ **PHASE COMPLETE — CLOSED**  
**Closure Date:** 2025-12-27

### Objective
Define injection strategy for public frontend branding colors with regression-resistant approach.

### Document Reference
- `docs/phase-11/Phase_11C_Color_Map_Contract.md`

### Architecture (Planned — Not Implemented)
```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Admin Panel    │     │    Supabase      │     │  Public Frontend │
│   (Darkone)      │     │    (settings)    │     │    (Finibus)     │
├──────────────────┤     ├──────────────────┤     ├──────────────────┤
│ Color Pickers    │────▶│ primary_color    │────▶│ useBrandingColors│
│ (BrandingTab)    │     │ secondary_color  │     │      ↓           │
│                  │     │ accent_color     │     │ :root CSS vars   │
│                  │     │                  │     │ --theme-color    │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

### Incremental Rollout (Phased)
| Phase | Target | Risk | Status |
|-------|--------|------|--------|
| 11C-1 | CSS variable injection | LOW | ✅ COMPLETE |
| 11C W1-W4 | SCSS selector conversion | LOW-MEDIUM | ✅ COMPLETE (15 selectors, 10 files) |
| 11C-2 | Solid backgrounds | MEDIUM | ⚠️ DEFERRED |
| 11C-3 | Gradients, pseudo-elements | HIGH | ⚠️ DEFERRED (see Phase 11D) |

**Phase 11C Closure:** Formally closed 2025-12-27. All eligible safe selectors converted. Remaining ~108 references classified as out-of-scope.

### Phase 11C SCSS Conversion (W1-W4) — COMPLETE

**Pattern:** `var(--theme-color, $theme-color)`

| Wave | Selectors | Files Modified |
|------|-----------|----------------|
| W1 | 1 | `index.scss` |
| W2 | 4 | `_footer.scss`, `_commingsoon.scss`, `_partner.scss` |
| W3 | 7 | `_contact_page.scss`, `_blog_page.scss`, `_service_page.scss`, `_hero.scss`, `_common.scss` |
| W4 | 3 | `_portfolio.scss`, `_services.scss` |

**Remaining:** ~108 hardcoded `#D90A2C` in protected zones (gradients, pseudo-elements, text-stroke, alpha-hex)

### Phase 11C-1 Implementation (2025-12-27)
```
┌──────────────────────────────────────────────────────────────┐
│                   Public App Startup                          │
├──────────────────────────────────────────────────────────────┤
│  main.tsx                                                     │
│    └── <BrandingProvider>                                     │
│          └── useBrandingColors()                              │
│                ├── Fetch from Supabase: settings table        │
│                │   └── primary_color, secondary_color,        │
│                │       accent_color                           │
│                ├── Inject on :root:                           │
│                │   └── --theme-color, --secondary-color,      │
│                │       --accent-color                         │
│                └── Fallback: Finibus defaults                 │
└──────────────────────────────────────────────────────────────┘
```

### Constraints
- Fonts remain LOCKED
- No SCSS file modifications in Phase 11C-1
- CSS variables available but not consumed by SCSS yet
- Gradients/pseudo-elements deferred to Phase 11D contract

---

## Phase 11D — Gradient & Overlay Design Contract (2025-12-27)

**Status:** ✅ **DOCUMENTATION COMPLETE**

### Objective
Establish authoritative design contract for all gradient and overlay surfaces.

### Document Reference
- `docs/phase-11/Phase_11D_Gradient_Overlay_Contract.md`
- `docs/phase-11/Phase_11E_11F_11G_Specifications.md`

### Architecture (Gradient Authority Model)
```
┌──────────────────────────────────────────────────────────────┐
│                   Color Authority Model                       │
├──────────────────────────────────────────────────────────────┤
│  Primary Color: #1EB36B (Single Source of Truth)             │
│                                                               │
│  Allowed Transformations:                                     │
│    ├── Darken / Lighten                                       │
│    ├── Opacity variation                                      │
│    └── Linear / Radial gradients                              │
│                                                               │
│  Forbidden:                                                   │
│    ├── Hue shifting                                           │
│    ├── Multi-color gradients                                  │
│    └── Designer-defined arbitrary gradients                   │
└──────────────────────────────────────────────────────────────┘
```

### Audit Summary
| Category | Selectors | Risk | Phase |
|----------|-----------|------|-------|
| CTA Gradients | 8 | MEDIUM | 11E |
| Hero Overlays | 7 | HIGH | 11F |
| Pseudo-elements | 8 | MEDIUM | 11G |

### Future Phases
- **Phase 11E Wave 2+:** Additional CTA Gradients (NOT AUTHORIZED)
- **Phase 11F:** Complex Overlays (7 selectors) (NOT AUTHORIZED)
- **Phase 11G:** Decorative Pseudo-elements (8 selectors) (NOT AUTHORIZED)

**Total surfaces documented:** 23

---

## Phase 11E — CTA Gradients (2025-12-27)

**Status:** Wave 1 COMPLETE | Wave 2 COMPLETE

### Objective
Introduce Devmart-branded CTA gradients using Pattern A (primary → darker primary).

### Wave 1 Implementation
| Selector | File | Line |
|----------|------|------|
| `.project-filter-tab li.active` | `_project_page.scss` | 46 |
| `.project-filter-tab li:hover` | `_project_page.scss` | 50 |
| `.nav-pills .nav-link:hover` | `_service_page.scss` | 183 |
| `.nav-pills .nav-link.active` | `_service_page.scss` | 190 |

### Wave 2 Implementation
| File | Line | Change |
|------|------|--------|
| `_variables.scss` | 8 | `$theme-color: #D90A2C` → `$theme-color: #1EB36B` |

### Pattern Applied
```scss
// Before (Finibus red)
background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%);

// After (Devmart branded - Wave 2 complete)
background: linear-gradient(90deg, #1EB36B 1.05%, [dark green] 100%);
```

### Governance Note
`$theme-color-dark` is a **Phase 11E-scoped** derived token, not a general-purpose variable.

### Restore Points
- Wave 1: `docs/restore-points/Restore_Point_Phase_11E_Wave_1.md`
- Wave 2: `docs/restore-points/Restore_Point_Phase_11E_Wave_2.md`

---

## Phase 11F — Final Red Residual Cleanup (2025-12-27)

**Status:** ✅ **COMPLETE**

### Objective
Eliminate ALL remaining red or red-derived UI accents across the ENTIRE public application.

### Scope Summary
- **Selectors Modified:** 16 total
- **Files Modified:** 10 SCSS files
- **Categories:** Gradients (4), Solid Colors (6), Text-Stroke (3), Alpha/RGBA (2), Malformed CSS (1)

### Files Modified
| File | Selectors Changed |
|------|-------------------|
| `_common.scss` | 3 (lines 346, 372, 428) |
| `_footer.scss` | 2 (lines 55, 148) |
| `_testimonial.scss` | 2 (lines 35, 48) |
| `_blog.scss` | 1 (line 191) |
| `_blog_page.scss` | 1 (line 424) |
| `_contact_page.scss` | 1 (line 39) |
| `_partner.scss` | 1 (line 150) |
| `_service_details.scss` | 2 (lines 144, 180) |
| `_error_page.scss` | 1 (line 39) |
| `_service_page.scss` | 2 (lines 249, 310) |

### Routes Verified
`/`, `/about`, `/service`, `/service-details/:slug`, `/project`, `/blog`, `/blog/:slug`, `/contact`, `/error`

### Confirmation
**No hardcoded red remains in the public UI. Phase 11F is globally complete.**

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11F_Full_App.md`

---

## Phase 11F-B — Residual Red Cleanup Completion (2025-12-27)

**Status:** ✅ **COMPLETE**

### Objective
Complete elimination of all remaining red residuals missed in Phase 11F initial pass.

### Scope Summary
- **Additional Selectors Modified:** 5
- **Files Modified:** 4 SCSS files
- **Stale CSS Deleted:** 4 files

### Files Modified
| File | Changes |
|------|---------|
| `apps/public/src/index.scss` | CircularProgressbar stroke/fill, scroll-top color |
| `_hero.scss` | Hero overlay gradient (major visual impact) |
| `_project_page.scss` | Debug red background |
| `_common.scss` | Preloader animation text-stroke and drop-shadow |

### Files Deleted
- `apps/public/src/assets/sass/style.css` + `.map`
- `apps/public/src/assets/css/style.css` + `.map`

### Final Confirmation
**All public UI elements are now exclusively derived from Devmart Primary Green (#1EB36B) and its approved dark variant. No hardcoded red or red-derived values remain anywhere in the public application.**

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11F_B.md`

---

## Phase 11F-C — Complete Red Residual Elimination (2025-12-27)

**Status:** ✅ **COMPLETE**

### Objective
Final sweep to eliminate ALL remaining red residuals discovered during comprehensive audit.

### Scope Summary
- **TSX Files Modified:** 2
- **SCSS Files Modified:** 3
- **Image Assets Replaced:** 2

### Changes Applied

| Category | Files | Changes |
|----------|-------|---------|
| Cursor | Header.tsx | RGB color changed to green (30, 179, 107) |
| Progress Bars | WhyChooseUsArea.tsx | Background and fill colors to green |
| Newsletter | _partner.scss | Overlay gradient to green-dark |
| Services | _services.scss | 3 rgba values to $theme-color |
| About | _about.scss | Border rgba to $theme-color |
| Images | play-button-bg.png | Red overlay → green overlay |
| Images | portfolio-hover-bg.png | Red overlay → green overlay |

### Verification Completed
- ✅ Custom cursor: GREEN
- ✅ Progress bars: GREEN  
- ✅ Newsletter overlay: GREEN gradient
- ✅ Service card accents: GREEN
- ✅ About skills border: GREEN
- ✅ Play button background: GREEN
- ✅ Portfolio hover: GREEN

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11F_C.md`

### Final Confirmation
**All public UI elements are now exclusively derived from Devmart Primary Green (#1EB36B) and its approved dark variant. No hardcoded red, rgba-red, or red-tinted image assets remain anywhere in the public application.**

**Phase 11F is GLOBALLY COMPLETE.**

---

## Phase 11F-D — Final Red Residual Fix (2025-12-27)

**Status:** ✅ **COMPLETE**

### Objective
Final fix for the last remaining red residual discovered in comprehensive audit.

### Scope
- **Files Modified:** 1
- **Element Fixed:** Mobile hamburger menu gradient

### Change Applied

| File | Line | Before | After |
|------|------|--------|-------|
| `style.scss` | 162 | `rgba(115,0,0,0.8)` → `rgba(217,10,44,0.8)` | `rgba($theme-color-dark, 0.8)` → `rgba($theme-color, 0.8)` |

### Verification
- ✅ SCSS compilation: 0 errors
- ✅ Mobile hamburger menu: GREEN gradient
- ✅ All other elements unchanged

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11F_D.md`

### Final Confirmation
**Phase 11F is NOW FULLY COMPLETE. Zero red residuals remain anywhere in the public application.**

---

## Phase 11F — FORMAL CLOSURE (2025-12-28)

**Status:** 🔒 **CLOSED — DO NOT REOPEN**

### Closure Authorization
Phase 11F has been formally closed per governance directive.

### Basis for Closure
- All red and red-derived residuals fully eliminated
- Cursor, progress bars, overlays, cards, borders, and animations derive exclusively from:
  - Devmart Primary Green (#1EB36B)
  - Approved dark variant ($theme-color-dark)
- Red-tinted image assets replaced with green equivalents
- No hardcoded red, rgba-red, or baked-in red assets remain

### Restore Points Retained
- `docs/restore-points/Restore_Point_Phase_11F_C.md`
- `docs/restore-points/Restore_Point_Phase_11F_D.md`

### Governance
- Phase 11F MUST NOT be reopened
- No further color cleanup permitted under this phase
- Future visual adjustments fall under subsequent phases only

### Next Phase
- Phase 11G-A: COMPLETE (Mobile Menu Fix)
- Phase 11G-A Fix: COMPLETE (CSS parity restored — removed non-original `display: block` and `visibility: visible`)
- Phase 11G-B: COMPLETE (Navigation Hygiene)
- Phase 11G-C+: BLOCKED until explicitly authorized

---

## Phase 11G-B — Navigation Hygiene (2025-12-28)

**Status:** ✅ COMPLETE

### Scope
apps/public ONLY — Remove ThemeForest demo links, align with actual routes

### Architecture Change

**Before (Demo Structure):**
```
Home (dropdown)
├── Home 01 → /
└── Home 02 → /home2
About us → /about
Services (dropdown)
├── Service → /service
└── Service Details → /service-details
Projects (dropdown)
├── Project → /project
└── Project Details → /project-details
Blogs (dropdown)
├── Blog → /blog
├── Blog standard → /blog-standard
└── Blog Details → /blog
Pages (dropdown)
├── Coming soon → /commingsoon
└── Error 404 → /error
Contact us → /contact
```

**After (Production Structure):**
```
Home → /
About us → /about
Services → /service
Projects → /project
Blog → /blog
Contact us → /contact
```

### Rationale
- Demo variants (Home 02, Blog Standard) removed
- Details pages accessed via item slugs (e.g., `/service-details/:slug`)
- System pages (Coming Soon, Error 404) removed from navigation
- Dropdowns flattened where no longer needed

### Files Modified
- `apps/public/src/components/common/Header.tsx`

### Guardian Rules Compliance
- ✅ apps/public ONLY
- ✅ No custom UX patterns
- ✅ No new styling
- ✅ Finibus parity (flat nav is valid template pattern)

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11G_B_Navigation_Hygiene.md`

---

## Phase 11G-A — Mobile Menu Regression Fix (2025-12-28)

**Status:** ✅ COMPLETE

### Scope
apps/public ONLY — Finibus parity restoration

### Issue
Mobile menu rendered open by default instead of hidden off-canvas on mobile viewport.

### Root Cause
CSS specificity issue: base `.main-nav` had `display: inline-block` which interfered with mobile fixed positioning. The mobile media query needed to explicitly override the display property.

### Fix Applied
**File:** `apps/public/src/assets/sass/style.scss`
- Added `display: block;` to override base inline-block in mobile media query
- Added `visibility: visible;` for consistent handling
- Transform `translateX(-260px)` now correctly hides menu off-canvas

### Guardian Rules Compliance
- ✅ apps/public ONLY
- ✅ No branding changes
- ✅ No new color tokens
- ✅ Finibus parity restored

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11G_A_Mobile_Menu.md`

---
