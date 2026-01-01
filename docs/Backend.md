# Backend Documentation

# Backend Documentation

**Status:** ✅ PHASE 12 COMPLETE — FRONTEND FROZEN  
**Phase:** Phase 12 CLOSED | Phase 6C Schema ✅ EXECUTED | Phase 5 SEO ✅ EXECUTED  
**Last Updated:** 2025-12-31

---

## Phase 6C — Quote Wizard Schema & RLS (2025-12-31)

**Status:** ✅ **EXECUTED AND VERIFIED**

### Objective

Create database schema and RLS policies for the Quote Wizard feature.

### Tables Created

#### public.quotes

| Column | Type | Nullable | Default | Constraint |
|--------|------|----------|---------|------------|
| id | uuid | NO | gen_random_uuid() | PRIMARY KEY |
| reference_number | text | NO | — | UNIQUE |
| lead_id | uuid | YES | — | FK → leads(id) |
| total_amount | numeric | NO | — | — |
| currency | text | NO | 'USD' | — |
| billing_period | text | NO | — | CHECK (monthly, yearly) |
| status | text | NO | 'pending' | CHECK (pending, reviewed, converted, expired) |
| created_at | timestamptz | NO | now() | — |
| updated_at | timestamptz | NO | now() | — |

#### public.quote_items

| Column | Type | Nullable | Default | Constraint |
|--------|------|----------|---------|------------|
| id | uuid | NO | gen_random_uuid() | PRIMARY KEY |
| quote_id | uuid | NO | — | FK → quotes(id) CASCADE |
| service_id | uuid | YES | — | FK → services(id) |
| plan_id | uuid | YES | — | FK → service_pricing_plans(id) |
| service_title | text | NO | — | — |
| plan_name | text | NO | — | — |
| price_amount | numeric | NO | — | — |
| currency | text | NO | 'USD' | — |
| created_at | timestamptz | NO | now() | — |

#### public.leads (Extended)

| Column Added | Type | Nullable | Constraint |
|--------------|------|----------|------------|
| quote_id | uuid | YES | FK → quotes(id) |

### Indexes Created

| Index | Table | Columns |
|-------|-------|---------|
| idx_quotes_lead_id | quotes | lead_id |
| idx_quotes_status_created | quotes | status, created_at DESC |
| idx_quote_items_quote_id | quote_items | quote_id |
| idx_leads_quote_id | leads | quote_id |

### Trigger

| Trigger | Table | Function |
|---------|-------|----------|
| update_quotes_updated_at | quotes | update_updated_at_column() |

### RLS Policies

#### quotes table

| Policy | Command | Expression |
|--------|---------|------------|
| Public can submit quotes | INSERT | WITH CHECK (true) |
| Admins can view all quotes | SELECT | USING (has_role(auth.uid(), 'admin')) |
| Admins can update quotes | UPDATE | USING (has_role(auth.uid(), 'admin')) |

#### quote_items table

| Policy | Command | Expression |
|--------|---------|------------|
| Public can submit quote items | INSERT | WITH CHECK (true) |
| Admins can view all quote items | SELECT | USING (has_role(auth.uid(), 'admin')) |

### Security Notes

- **No DELETE policies:** Quotes are immutable for audit trail
- **Public INSERT:** Allows anonymous quote submissions (like contact forms)
- **No public SELECT:** Users cannot view other quotes
- **Admin only:** Full visibility and status management

### Restore Point

**File:** `docs/restore-points/Restore_Point_Phase_6C_Schema_Execution.md`

---

**Status:** ✅ **EXECUTED** (5.1 + 5.2 ONLY)

### Objective

Wire SEO meta tags to public detail pages using existing database fields.

### Implementation Summary

| Phase | Module | SEO Component | Hook Extended |
|-------|--------|---------------|---------------|
| 5.1 | Services | `ServiceDetailsSeo.tsx` | `useServiceDetails.ts` |
| 5.2 | Projects | `ProjectDetailsSeo.tsx` | `useProjectDetails.ts` |

### SEO Fields Wired

| Field | Services | Projects | Blog |
|-------|----------|----------|------|
| meta_title | ✅ | ✅ | ✅ |
| meta_description | ✅ | ✅ | ✅ |
| og_image_media_id | ✅ | ✅ | ✅ |
| canonical_url | ✅ | ✅ | ✅ |
| noindex | ✅ | ✅ | ✅ |

### Fallback Hierarchy

All modules use the same 3-tier fallback:

1. **Content-specific SEO fields** (highest priority)
2. **Content-derived values** (title, description, featured_image)
3. **Global SEO settings** (from settings table)

### Files Created

| File | Purpose |
|------|---------|
| `apps/public/src/components/pages/ServiceDetails/ServiceDetailsSeo.tsx` | Service details SEO |
| `apps/public/src/components/pages/projectDetails/ProjectDetailsSeo.tsx` | Project details SEO |

### Verification Required

- [ ] Service details meta tags visible in page source
- [ ] Project details meta tags visible in page source
- [ ] Canonical URLs render correctly (`https://devmart.sr/...`)
- [ ] No console errors
- [ ] No visual changes

---

## Phase 4D — URL Normalization (2025-12-31)

**Status:** ✅ **VERIFIED AND CLOSED**

### Execution Summary

| Step | Module | Records | Result |
|------|--------|---------|--------|
| 1 | Services | 7 | ✅ Domain + path normalized |
| 2 | Projects | 5 | ✅ Domain + path normalized |
| 3 | Blog Posts | 6 | ✅ Relative → absolute |
| 4 | Pages | 7 | ✅ Canonical URLs populated |

**Total records updated:** 25

### Normalization Applied

| Module | Before | After |
|--------|--------|-------|
| Services | `https://devmart.co/services/{slug}` | `https://devmart.sr/service-details/{slug}` |
| Projects | `https://devmart.co/projects/{slug}` | `https://devmart.sr/project-details/{slug}` |
| Blog | `/blog/{slug}` (relative) | `https://devmart.sr/blog/{slug}` (absolute) |
| Pages | NULL | `https://devmart.sr/{slug}` |

### Verification Results

| Check | Result |
|-------|--------|
| All canonical URLs use `https://devmart.sr` | ✅ PASS |
| All paths match target patterns | ✅ PASS |
| No NULL canonical_url for published records | ✅ PASS |
| Frontend routing unchanged | ✅ VERIFIED |
| Admin functionality unchanged | ✅ VERIFIED |

### Restore Point

**File:** `docs/restore-points/Restore_Point_Phase_4D_URL_Normalization.md`

Contains pre-execution state snapshot and rollback SQL for all 25 records.

---

## Phase 4C — Projects SEO Schema Expansion (2025-12-31)

**Status:** ✅ **CLOSED**

### Schema Changes

**Table:** `projects`

| Column Added | Type | Default | Purpose |
|--------------|------|---------|---------|
| `meta_title` | TEXT | NULL | SEO title override |
| `meta_description` | TEXT | NULL | SEO description override |
| `og_image_media_id` | UUID FK | NULL | OG image for social sharing |
| `canonical_url` | TEXT | NULL | Canonical URL for SEO |
| `noindex` | BOOLEAN | FALSE | Exclude from search engines |

### Data Population

**Projects:** All 5 published projects seeded with:
- meta_title (unique, meaningful)
- meta_description (unique, meaningful)
- canonical_url (`https://devmart.sr/project-details/{slug}`) — **NORMALIZED**
- noindex = false

**Services:** All 7 services seeded with:
- meta_title (unique, meaningful)
- meta_description (unique, meaningful)
- canonical_url (`https://devmart.sr/service-details/{slug}`) — **NORMALIZED**
- noindex = false

### Canonical Domain Status

| Domain | Status |
|--------|--------|
| `https://devmart.sr` | ✅ Production domain (ACTIVE) |
| `https://devmart.co` | ❌ Deprecated (normalized out) |

**Status:** Domain normalization complete via Phase 4D execution.

### Project Process Steps

Step 4 ("Deployment & Launch") added to all 5 published projects.

| Project | Steps Before | Steps After |
|---------|--------------|-------------|
| All published | 3 | 4 |

---

## Admin Blog Enhancement — Phase 3: SEO Fallback Wiring (2025-12-31)

**Status:** ✅ **CLOSED**

### Objective
Wire blog post SEO metadata to public blog details page using react-helmet-async with 3-tier fallback hierarchy.

### Files Created

| File | Purpose |
|------|---------|
| `apps/public/src/hooks/useGlobalSeoSettings.ts` | Fetch global SEO fallbacks from settings table |
| `apps/public/src/components/pages/blogDetails/BlogDetailsSeo.tsx` | Render SEO meta tags with fallback resolution |
| `apps/public/src/lib/seo/resolveSeoFallbacks.ts` | SEO utility (copied for app separation) |

### Stability Fix Applied

**Issue:** Cross-app import bug — BlogDetailsSeo.tsx imported from admin app path.  
**Fix:** Copied `resolveSeoFallbacks.ts` to `apps/public/src/lib/seo/` and updated import.  
**Result:** No cross-app imports, both apps are fully self-contained.

### SEO Fallback Hierarchy

| Priority | Source | Description |
|----------|--------|-------------|
| 1 | Post SEO Fields | meta_title, meta_description, og_image, canonical_url, noindex |
| 2 | Content-Derived | title → meta_title, excerpt → description, featured_image → OG |
| 3 | Global Settings | default_meta_title, default_meta_description, default_og_image |

### Meta Tags Rendered

- `<title>` — Post title or fallback
- `<meta name="description">` — Post description or fallback
- `<meta name="robots">` — noindex handling
- `<link rel="canonical">` — Canonical URL
- `<meta property="og:*">` — Open Graph tags
- `<meta name="twitter:*">` — Twitter Card tags
- `<meta property="article:*">` — Article metadata

### Phase 3 Closure Confirmation

- **No schema changes pending** — All blog_posts columns stable
- **App separation enforced** — Utilities duplicated, no cross-imports
- **Blog SEO fields complete** — All 5 fields (meta_title, meta_description, og_image, canonical_url, noindex) active

---

## Admin Blog Enhancement — Phase 2.1a–2.3: Field Parity + Wiring + Seeding (2025-12-31)

**Status:** ✅ **COMPLETE + FINALIZED**

### Phase 2.1a: New Database Columns (ADDITIVE)

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| `quote_text` | TEXT | NULL | Quote block text for blog details |
| `quote_author` | TEXT | NULL | Quote attribution name |
| `secondary_image_media_id` | UUID FK | NULL | Banner section image |
| `secondary_content` | TEXT | NULL | Banner section body text |
| `author_display_name` | TEXT | NULL | Author name (UI default: "Devmart Team") |

### Phase 2.2–2.3: Public Wiring + Per-Post Seeding

**Hook Extended:** `useBlogDetails.ts` now fetches all Details Layout + SEO fields  
**Component Wired:** `BlogDetailsWrapper.tsx` accepts new props with fallbacks  
**Data Seeded:** All 6 published posts with unique, article-derived content

| Slug | quote_text | secondary_content | tags |
|------|------------|-------------------|------|
| building-scalable-web-applications-2025 | Unique | Unique | Development, Technology, Performance |
| complete-guide-marketing-automation | Unique | Unique | Marketing, Automation, Analytics |
| design-thinking-modern-enterprise | Unique | Unique | Design, Innovation, Strategy |
| future-of-digital-business-strategy | Unique | Unique | Strategy, Digital Transformation, Business |
| security-best-practices-modern-applications | Unique | Unique | Security, Development, Technology |
| upcoming-trends-ai-machine-learning | Unique | Unique | Technology, AI, Machine Learning |

### Admin Modal Changes
- Tab 5 "Details Layout" added to BlogPostModal
- All 5 fields exposed with character counters
- MediaPicker for secondary image

---

## Blog Comments — DEPRECATED (2025-12-31)

**Status:** ⚠️ **TABLE DEPRECATED — NOT IN USE**

### Table: `blog_comments`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| post_id | uuid | FK to blog_posts |
| commenter_name | text | — |
| commenter_email | text | — |
| body | text | — |
| created_at | timestamptz | — |

### Current State
- **Records:** 8 (seeded test data, never production)
- **RLS:** Admin-only access (no public policies)
- **UI:** None (removed from public frontend)
- **Admin:** No moderation UI exists

### Policy Decision
Blog comments are permanently disabled. See: `docs/Policy_Blog_Comments_Disabled.md`

**Do NOT:**
- Create comment moderation features
- Add comment UI to public or admin
- Re-enable commenting functionality

---

## Admin Blog Enhancement — Phase 2.1: Field Parity (2025-12-31)

**Status:** ✅ **VERIFIED**

All blog_posts columns mapped to Admin Modal fields. See: `docs/Blog_Field_Parity_Matrix.md`

---

## Admin Blog Enhancement — Phase 2: Modal UX Upgrade (2025-12-31)

**Status:** ✅ **COMPLETE**

### Objective
Restructure BlogPostModal to 4-tab layout with full SEO governance and taxonomy management.

### Components Created

| File | Purpose |
|------|---------|
| `ContentBlocksEditor.tsx` | Structured content blocks UI (paragraph, heading, list, quote, image) |
| `CategorySelector.tsx` | Category dropdown with add-new option |
| `TagsInput.tsx` | Tags array input with chips UI |
| `compileContent.ts` | content_blocks → HTML compiler utility |

### Modal Tab Structure

| Tab | Fields |
|-----|--------|
| Content | Title, Slug, Excerpt (counter), ContentBlocksEditor or legacy textarea |
| Taxonomy | CategorySelector, TagsInput |
| Media & Publishing | Featured Image, Status, Publish Date |
| SEO | Meta Title (counter), Meta Description (counter), OG Image, Canonical URL, Noindex |

### useBlogPosts Hook Extended

New fields in `BlogPost` and `BlogPostInput` interfaces:
- `content_blocks: Json | null`
- `category: string | null`
- `tags: string[] | null`
- `meta_title: string | null`
- `meta_description: string | null`
- `og_image_media_id: string | null`
- `canonical_url: string | null`
- `noindex: boolean | null`

### Backward Compatibility

- Legacy posts (empty `content_blocks`) load in HTML textarea mode
- "Convert to Blocks" button available for migration
- Existing posts remain fully editable

### Verification
- ✅ All 4 tabs functional
- ✅ Content blocks compile to HTML on save
- ✅ Legacy posts load correctly
- ✅ SEO fields persist correctly
- ✅ No console errors
- ✅ Public frontend unchanged

---

## Admin Blog Enhancement — Phase 1: Schema Enhancements (2025-12-31)

**Status:** ✅ **COMPLETE**

### Objective
Add SEO and taxonomy fields to `blog_posts` table with dual-storage content model.

### Database Changes (ADDITIVE ONLY)

| Column | Type | Default | Constraint | Purpose |
|--------|------|---------|------------|---------|
| content_blocks | JSONB | '[]' | — | Structured blocks for admin editor |
| tags | TEXT[] | '{}' | GIN indexed | Taxonomy tags array |
| meta_title | TEXT | NULL | max 70 chars | SEO title override |
| meta_description | TEXT | NULL | max 160 chars | SEO description |
| og_image_media_id | UUID | NULL | FK to media | OG image override |
| canonical_url | TEXT | NULL | — | Canonical URL |
| noindex | BOOLEAN | FALSE | — | Search engine indexing |

### Indexes Added
- `idx_blog_posts_tags` — GIN index on tags array
- `idx_blog_posts_category` — B-tree index on category

### Check Constraints
- `blog_posts_meta_title_length` — max 70 characters
- `blog_posts_meta_description_length` — max 160 characters

### Dual-Storage Content Model
```
┌─────────────────────────────────────────────────────────────┐
│                  Content Storage Architecture                │
├─────────────────────────────────────────────────────────────┤
│  blog_posts.content (TEXT)                                   │
│    └── HTML string for public rendering (UNCHANGED)         │
│                                                              │
│  blog_posts.content_blocks (JSONB)                           │
│    └── Structured blocks for admin authoring (NEW)          │
│                                                              │
│  Compile Flow:                                               │
│    Admin Editor → content_blocks → [Compile] → content       │
└─────────────────────────────────────────────────────────────┘
```

### SEO Fallback Order
1. Blog post SEO fields (meta_title, meta_description, etc.)
2. Blog static page SEO (page_settings for /blog route)
3. Global SEO settings (settings table)

---

## Phase 12.X — Projects Content Swap (DB-Only)

**Type:** Content Replacement  
**Tables Updated:** `projects`, `project_process_steps`

**Projects Updated:** 5 of 5 published projects

| Old Slug | New Slug | Category |
|----------|----------|----------|
| `corporate-brand-identity` | `national-digital-services-portal` | Government Platform |
| `ecommerce-platform-redesign` | `immigration-case-management-system` | Government Information System |
| `saas-dashboard-interface` | `enterprise-operations-dashboard` | Enterprise Dashboard |
| `mobile-banking-application` | `housing-registration-subsidy-platform` | Public Sector Platform |
| `restaurant-website-ordering` | `saas-management-analytics-platform` | SaaS Platform |

**Fields Updated (projects table):**
- title, slug, heading, description, category, client, website (NULL), start_date, end_date, check_launch_content

**Process Steps:**
- Steps 1-3: Updated with new titles and descriptions
- Step 4: Deleted from all projects (20 → 15 total steps)

**Fields NOT Changed:**
- `id`, `image_media_id`, `featured_image_media_id`, `check_launch_image_media_id`, `status`, `is_featured`, `display_order`

---

## Phase 12.6 — Blog Content Swap (DB-Only)

**Type:** Content Replacement  
**Table Updated:** `blog_posts`

## URL Fix Option A — Broken Service Links

**Files Changed:**

| File | Before | After |
|------|--------|-------|
| Footer.tsx | `/service-details` (no slug) | `/service` |
| ServiceList.tsx | `/service-details` (no slug) | `/service` |

**Rationale:** Hardcoded demo links without DB mapping → safe redirect to listing page.

---

## Phase 12.5 — Projects Verification & GAP Fix

**Pre-Check:** DB hero slides confirmed ACTIVE with correct URLs (`/service`, `/projects`, `/about`).

**GAP-PROJ-001 Fixed:**

| File | Before | After |
|------|--------|-------|
| HeroArea.tsx (STATIC_SLIDES lines 20, 31, 42) | `/project-details` (no slug) | `/project` |

**Rationale:** Fix applies to fallback only (used when DB slides are unavailable).

**Verification Completed:**
- ✅ Projects listing renders from DB
- ✅ Project details load for all 8 slugs
- ✅ Cross-site links use canonical routes
- ✅ No console errors

---

## Phase 12.4 — Service Details Content Update

**Tables Updated:**

| Table | Records | Fields |
|-------|---------|--------|
| service_process_steps | 21 | title, description |
| service_pricing_plans | 42 | plan_name, plan_subtitle, price_amount, features[], cta_label |

**CTA Policy:** All 42 pricing plans now use "Get a Quote" (0 "Pay Now" remaining).

**Route Fix:** Homepage ServiceArea link changed from `/service/${slug}` to `/service-details/${slug}`.

---

## Overview

This document covers the admin backend (Darkone template) and Supabase integration status.

---

## Current State

### Admin Backend (Darkone)
- Demo authentication: **Replaced**
- Supabase authentication: **IMPLEMENTED** (admin role enforcement via user_roles table)
- Dashboard layout: **Preserved**
- Sidebar structure: **Preserved**

### Database (Supabase)
- Connection: **Active**
- Migrations: Applied
- Field name fix: `percent` → `percentage` in `page_settings.about.inside_story.progress_stats`

---

## Cross-Reference: Frontend Runtime Gate

**Status:** Validated

The frontend runtime gate has been validated with the following results:

| Environment | Status |
|-------------|--------|
| Lovable Preview | PASS (0/0) |
| Local Incognito | PASS (0/0) |

The only observed error (`contentScript.js`) was confirmed as external browser extension injection, not an application issue.

See: `docs/frontend.md` for full runtime matrix.

---

## Stability & Reliability Fixes (2025-12-27)

### Public App Fixes

| File | Issue | Fix |
|------|-------|-----|
| Header.tsx | `/blog-details` route not defined | Changed to `/blog` |
| Footer.tsx | Placeholder `#` links (4x) | Changed to `/commingsoon` |

### Admin App Fixes (Hook Stability)

| File | Issue | Fix |
|------|-------|-----|
| useMediaLibrary.ts | Missing useRef pattern for notifications | Added `notifySuccessRef`/`notifyErrorRef` with sync `useEffect` |
| useGlobalBlocks.ts | Unstable deps (`notifyError` line 85, `notifySuccess/notifyError` line 121) | Added useRef pattern, removed from dependency arrays |

### Verification Evidence

| Environment | Console Errors | Console Warnings | Status |
|-------------|----------------|------------------|--------|
| Lovable Preview | 0 | 0 | PASS |
| Local Incognito | 0 | 0 | PASS |

---

## Admin Module Audit — VERIFIED

| Module | Create | Edit | Delete | Tabs | Typing | Save Once | Persist | Status |
|--------|--------|------|--------|------|--------|-----------|---------|--------|
| Services | ✅ | ✅ | ✅ | Process Steps, Pricing | ✅ | ✅ | ✅ | **PASS** |
| Projects | ✅ | ✅ | ✅ | Process Steps | ✅ | ✅ | ✅ | **PASS** |
| Blog | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | **PASS** |
| Testimonials | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | **PASS** |
| Media Library | Upload ✅ | — | Delete ✅ | — | — | ✅ | ✅ | **PASS** |
| Pages | — | ✅ | — | Homepage/About | ✅ | ✅ | ✅ | **PASS** |
| Global Blocks | — | ✅ | — | Toggle ✅ | ✅ | ✅ | ✅ | **PASS** |
| Settings | — | ✅ | — | General/SEO/Social/Branding | ✅ | ✅ | ✅ | **PASS** |

**Verified:** 2025-12-27  
**Environment:** Local Incognito  
**Result:** 0 console errors, 0 console warnings

---

## Stability Status — COMPLETE

| Module | Status | Notes |
|--------|--------|-------|
| Admin fixed modules | **Complete** | Placeholders in place |
| Frontend runtime | **PASS** | Verified in clean environments |
| Public navigation | **PASS** | Header/Footer links verified |
| Admin hooks | **PASS** | useRef pattern applied |
| Admin module audit | **PASS** | All modules verified |

**Phase 4 Acceptance Gate:** ✅ **PASSED**

---

## Phase 11B — Branding Settings Expansion (2025-12-27)

**Status:** ✅ **COMPLETE**

### Objective
Enable Admin to manage theme colors via Settings → Branding tab.

### Database Keys (category: branding)
| Key | Default Value | Status |
|-----|---------------|--------|
| primary_color | #D90A2C | ✅ Wired to Admin UI |
| secondary_color | #17161A | ✅ Wired to Admin UI |
| accent_color | #F7941D | ✅ Wired to Admin UI |
| logo_media_id | (empty) | ✅ Existing (unchanged) |
| favicon_media_id | (empty) | ✅ Existing (unchanged) |

### Admin UI Changes
| File | Change |
|------|--------|
| `settings/page.tsx` | Added color keys to FormValues interface and initial values |
| `settings/components/BrandingSettingsTab.tsx` | Replaced "Coming Soon" placeholder with 3 color pickers |

### Settings Flow (Technical)
```
FormValues state → handleChange() → setFormValues() → setHasChanges(true)
                                                            ↓
Save Changes click → handleSave() → updateSettings(updates[])
                                                            ↓
                     supabase.from('settings').update({value, updated_by}).eq('key', key)
                                                            ↓
                     fetchSettings() → refresh form state
```

### Constraints Enforced
- ❌ **Fonts LOCKED** — No font pickers or typography controls added
- ❌ **No SCSS changes** — UI-only implementation
- ❌ **No public frontend color injection** — Pending explicit authorization

### Regression Scan Results
| Tab | Save | Persist | Console Errors | Status |
|-----|------|---------|----------------|--------|
| Branding | ✅ | ✅ | 0 | **PASS** |
| General | ✅ | ✅ | 0 | **PASS** |
| SEO | ✅ | ✅ | 0 | **PASS** |
| Social | ✅ | ✅ | 0 | **PASS** |

### Verification Status
- ✅ Verified in Lovable Preview (0 errors)
- ✅ Recommended: Local Incognito (0 errors expected)

### Known Limitations
1. Public frontend color injection: NOT implemented (requires explicit authorization)
2. SCSS tokenization: NOT done (colors in DB, not yet in CSS variables)

---

## Phase 11C — Color Map Contract (2025-12-27)

**Status:** ✅ **PHASE COMPLETE — CLOSED**  
**Closure Date:** 2025-12-27

### Objective
Define a deterministic, regression-resistant strategy for public frontend color injection.

### Phase 11C-0: Color Map Contract
- **Document:** `docs/phase-11/Phase_11C_Color_Map_Contract.md`
- **Status:** ✅ COMPLETE

### Contract Summary

| Phase | Risk Level | Scope | Status |
|-------|------------|-------|--------|
| 11C-1 | ✅ LOW | Link hovers, text colors (CSS var injection) | ✅ COMPLETE |
| 11C W1-W4 | ✅ LOW-MEDIUM | SCSS selector conversion (15 selectors) | ✅ COMPLETE |
| 11C-2 | ⚠️ MEDIUM | Solid backgrounds (buttons, badges) | ⚠️ DEFERRED (requires separate phase) |
| 11C-3 | 🔴 HIGH | Gradients, pseudo-elements | ⚠️ DEFERRED (see Phase 11D contract) |

### "Do Not Touch" Zones (Documented)
- Hero section overlays (`rgba()` gradients)
- Multi-color gradients
- Pseudo-elements (`::before`, `::after`)
- Text-stroke effects
- Progress bars with `!important`

### Technical Approach (Planned)
```
┌─────────────────────────────────────────────────────────────┐
│                  Public Frontend Injection                   │
├─────────────────────────────────────────────────────────────┤
│  useBrandingColors.ts                                        │
│    ├── Fetch branding settings from Supabase                │
│    ├── Inject CSS variables on :root                        │
│    │   └── --theme-color, --secondary-color, --accent-color │
│    └── Fallback to Finibus defaults if unavailable          │
├─────────────────────────────────────────────────────────────┤
│  SCSS consumption (future phase)                             │
│    └── $theme-color: var(--theme-color, #D90A2C);           │
└─────────────────────────────────────────────────────────────┘
```

### Execution Status
- ✅ Phase 11C-1: COMPLETE (CSS variable injection)
- ✅ Phase 11C W1-W4: COMPLETE (SCSS selector conversion — 15 selectors, 10 files)
- ⚠️ Phase 11C-2: DEFERRED (requires separate authorization)
- ⚠️ Phase 11C-3: DEFERRED (see Phase 11D Gradient/Overlay Contract)

### Phase 11C Closure Verification
- **Guardian Rules:** Fully respected (fonts locked, no admin SCSS, no gradients/pseudo-elements)
- **Remaining Hardcoded:** ~108 references classified as out-of-scope (gradients, pseudo-elements, text-stroke, alpha-suffix)
- **Closure Authorization:** APPROVED by project owner (2025-12-27)

### Phase 11C SCSS Conversion Summary (W1-W4)

| Wave | Selectors | Files | Status |
|------|-----------|-------|--------|
| W1 | 1 | `index.scss` | ✅ COMPLETE |
| W2 | 4 | `_footer.scss`, `_commingsoon.scss`, `_partner.scss` | ✅ COMPLETE |
| W3 | 7 | `_contact_page.scss`, `_blog_page.scss`, `_service_page.scss`, `_hero.scss`, `_common.scss` | ✅ COMPLETE |
| W4 | 3 | `_portfolio.scss`, `_services.scss` | ✅ COMPLETE |
| **TOTAL** | **15** | **10 files** | ✅ **ALL ELIGIBLE SELECTORS CONVERTED** |

**Pattern Used:** `var(--theme-color, $theme-color)`

**Remaining Hardcoded `#D90A2C`:** ~108 references (all in "Do Not Touch" categories: gradients, pseudo-elements, text-stroke, alpha-suffix, variable definition)

### Phase 11C-1 Implementation Details (2025-12-27)
| File | Action | Purpose |
|------|--------|---------|
| `apps/public/src/hooks/useBrandingColors.ts` | Created | Fetch branding colors, inject CSS vars |
| `apps/public/src/components/providers/BrandingProvider.tsx` | Created | Root-level provider component |
| `apps/public/src/main.tsx` | Modified | Added BrandingProvider wrapper |

**CSS Variables Injected on `:root`:**
- `--theme-color` ← `primary_color`
- `--secondary-color` ← `secondary_color`
- `--accent-color` ← `accent_color`

**Fallbacks:** Finibus defaults (`#D90A2C`, `#17161A`, `#F7941D`)

---

## Phase 11D — Gradient & Overlay Design Contract (2025-12-27)

**Status:** ✅ **DOCUMENTATION COMPLETE**

### Objective
Establish authoritative design contract for gradients, overlays, and color-derived decorative elements.

### Document Reference
- `docs/phase-11/Phase_11D_Gradient_Overlay_Contract.md`

### Key Decisions
- **Primary Color:** `#1EB36B` (single source of truth)
- **Gradient Philosophy:** Design implementations, not branding choices
- **Admin Exposure:** None (gradients remain design-locked)

### Audit Summary
| Category | Count | Risk | Future Phase |
|----------|-------|------|--------------|
| CTA Gradients (Pattern A) | 8 | ⚠️ MEDIUM | 11E |
| Hero Overlays (Pattern B) | 7 | 🔴 HIGH | 11F |
| Pseudo-element Decorations | 8 | ⚠️ MEDIUM | 11G |
| **Total Surfaces** | **23** | — | — |

### Future Phases (NOT AUTHORIZED)
- **Phase 11E Wave 2+:** Additional CTA Gradients
- **Phase 11F:** Complex Overlays (Hero, Radial, RGBA)
- **Phase 11G:** Alpha / Opacity Decorative Surfaces

See: `docs/phase-11/Phase_11E_11F_11G_Specifications.md`

---

## Phase 11E — CTA Gradients (2025-12-27)

**Status:** Wave 1 COMPLETE | Wave 2 COMPLETE

### Wave 1 Scope
- **Objective:** Introduce Devmart-branded CTA gradients using Pattern A (primary → darker primary)
- **Selectors:** 4 CTA tab/nav-pill selectors
- **Pattern:** `linear-gradient(90deg, var(--theme-color, $theme-color) 1.05%, var(--theme-color-dark, $theme-color-dark) 100%)`

### Wave 2 Scope (2025-12-27)
- **Objective:** Complete visual migration by updating base `$theme-color` to Devmart green
- **Change:** `$theme-color: #D90A2C` → `$theme-color: #1EB36B`
- **Effect:** All gradient fallbacks now compile to green → dark green

### Governance Clarification
The variable `$theme-color-dark` introduced in `_variables.scss` is:
- A **Phase 11E–SCOPED** derived token
- Intended **ONLY** for Pattern A gradients
- **NOT** a general-purpose color token
- **NOT** reusable outside Phase 11E without explicit authorization

### Files Modified

| File | Change |
|------|--------|
| `apps/public/src/assets/sass/_variables.scss` | Wave 1: Added `$theme-color-dark` / Wave 2: Updated `$theme-color` to `#1EB36B` |
| `apps/public/src/assets/sass/_project_page.scss` | Updated lines 46, 50 (`.project-filter-tab li.active`, `.project-filter-tab li:hover`) |
| `apps/public/src/assets/sass/_service_page.scss` | Updated lines 183, 190 (`.nav-pills .nav-link:hover`, `.nav-pills .nav-link.active`) |

### Verification
- SCSS compilation: 0 errors
- Console errors: 0
- Routes verified: `/project`, `/service`

### Restore Points
- Wave 1: `docs/restore-points/Restore_Point_Phase_11E_Wave_1.md`
- Wave 2: `docs/restore-points/Restore_Point_Phase_11E_Wave_2.md`

### Guardian Rules (Enforced)
- ✅ Fonts LOCKED
- ✅ No admin SCSS
- ✅ No hero/overlay gradients
- ✅ No pseudo-elements
- ✅ No alpha-hex colors
- ✅ No radial gradients

---

## Phase 11F — Final Red Residual Cleanup (2025-12-27)

**Status:** ✅ **COMPLETE**

### Objective
Eliminate ALL remaining red or red-derived UI accents across the ENTIRE public application.

### Scope
- **Global:** Full public app red residual cleanup
- **Selectors Modified:** 16 total
- **Files Modified:** 10 SCSS files

### Selectors Updated

#### Gradient Patterns (4 selectors)
| File | Line | Selector |
|------|------|----------|
| `_common.scss` | 372 | `.cmn-btn a` |
| `_service_page.scss` | 249 | `.single-price-box h3:before` |
| `_service_page.scss` | 310 | `.pay-btn a` |
| `_service_details.scss` | 144 | `.sidebar-search form button` |

#### Solid Color References (6 selectors)
| File | Line | Selector |
|------|------|----------|
| `_footer.scss` | 55 | `address h4:before` |
| `_footer.scss` | 148 | `.footer-menu li a:before` |
| `_testimonial.scss` | 35 | `.swiper-pagination...` |
| `_testimonial.scss` | 48 | `.swiper-pagination-total` |
| `_blog.scss` | 191 | `.view-btn a:before` |
| `_blog_page.scss` | 424 | `.blog-quate b:before` |

#### Text-Stroke Properties (3 selectors)
| File | Line | Selector |
|------|------|----------|
| `_common.scss` | 346 | `.title.special h2 b` |
| `_common.scss` | 428 | `.breadcrumb-wrapper h1` |
| `_error_page.scss` | 39 | `.error-content h2` |

#### Alpha/RGBA Colors (2 selectors)
| File | Line | Selector |
|------|------|----------|
| `_contact_page.scss` | 39 | `.office-info .icon` |
| `_service_details.scss` | 180 | `.single-step .step` |

#### Malformed CSS Fixed (1 selector)
| File | Line | Selector |
|------|------|----------|
| `_partner.scss` | 150 | `.subscribe-form form input[type="submit"]:hover` |

### Patterns Applied
- **Gradients:** `linear-gradient(90deg, var(--theme-color, $theme-color) 1.05%, var(--theme-color-dark, $theme-color-dark) 100%)`
- **Solid Colors:** `var(--theme-color, $theme-color)`
- **Alpha Colors:** `rgba($theme-color, <opacity>)`

### Verification
- SCSS compilation: 0 errors
- Console errors: 0
- Routes verified: `/`, `/about`, `/service`, `/service-details/:slug`, `/project`, `/blog`, `/blog/:slug`, `/contact`, `/error`

### Confirmation
**No hardcoded red remains in the public UI. Phase 11F is globally complete.**

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11F_Full_App.md`

### Guardian Rules (Enforced)
- ✅ NO font changes
- ✅ NO admin SCSS changes
- ✅ NO new variables (using existing `$theme-color`, `$theme-color-dark`)
- ✅ NO layout alterations
- ✅ Color substitution ONLY

---

## Phase 11F-B — Residual Red Cleanup Completion (2025-12-27)

**Status:** ✅ **COMPLETE**

### Objective
Complete elimination of all remaining red residuals missed in Phase 11F initial pass.

### Files Modified

| File | Changes |
|------|---------|
| `apps/public/src/index.scss` | Lines 30, 35, 167 — CircularProgressbar stroke/fill, scroll-top color |
| `apps/public/src/assets/sass/_hero.scss` | Line 146 — Hero overlay gradient |
| `apps/public/src/assets/sass/_project_page.scss` | Line 87 — Debug red background |
| `apps/public/src/assets/sass/_common.scss` | Lines 232-233 — Preloader animation reds |

### Files Deleted (Stale Compiled CSS)

| File | Reason |
|------|--------|
| `apps/public/src/assets/sass/style.css` | Stale compiled CSS with legacy red |
| `apps/public/src/assets/sass/style.css.map` | Associated source map |
| `apps/public/src/assets/css/style.css` | Stale compiled CSS with legacy red |
| `apps/public/src/assets/css/style.css.map` | Associated source map |

### Verification
- SCSS compilation: 0 errors
- Console errors: 0
- All public routes verified

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11F_B.md`

### Final Confirmation
**All public UI elements are now exclusively derived from Devmart Primary Green (#1EB36B) and its approved dark variant. No hardcoded red or red-derived values remain anywhere in the public application.**

---

## Phase 11F-C — Complete Red Residual Elimination (2025-12-27)

**Status:** ✅ **COMPLETE**

### Objective
Complete elimination of ALL remaining red residuals discovered during final verification audit.

### Files Modified

| File | Changes |
|------|---------|
| `apps/public/src/components/common/Header.tsx` | Line 67 — Cursor color changed to green RGB |
| `apps/public/src/components/common/WhyChooseUsArea.tsx` | Lines 43, 52 — Progress bar colors |
| `apps/public/src/assets/sass/_partner.scss` | Line 32 — Newsletter overlay gradient |
| `apps/public/src/assets/sass/_services.scss` | Lines 58, 151, 167 — Service card rgba values |
| `apps/public/src/assets/sass/_about.scss` | Line 146 — About skills card border |

### Image Assets Replaced

| Image | Action |
|-------|--------|
| `apps/public/public/images/play-button-bg.png` | Replaced with green gradient |
| `apps/public/public/images/portfolio-hover-bg.png` | Replaced with green gradient |

### Verification
- SCSS compilation: 0 errors
- Console errors: 0
- All public routes verified
- Custom cursor: GREEN
- Progress bars: GREEN
- Newsletter overlay: GREEN gradient
- All service/about accents: GREEN

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11F_C.md`

### Final Confirmation
**All public UI elements are now exclusively derived from Devmart Primary Green (#1EB36B) and its approved dark variant. No hardcoded red, rgba-red, or red-tinted image assets remain anywhere in the public application. Phase 11F is globally complete.**

---

## Phase 11F-D — Final Red Residual Fix (2025-12-27)

**Status:** ✅ **COMPLETE**

### Objective
Final fix for the last remaining red residual: mobile hamburger menu gradient.

### Files Modified

| File | Changes |
|------|---------|
| `apps/public/src/assets/sass/style.scss` | Line 162 — Mobile hamburger gradient changed to green |

### Before/After

| Element | Before | After |
|---------|--------|-------|
| `.cross-btn span` | `rgba(115, 0, 0, 0.8)` → `rgba(217, 10, 44, 0.8)` | `rgba($theme-color-dark, 0.8)` → `rgba($theme-color, 0.8)` |

### Verification
- SCSS compilation: 0 errors
- Console errors: 0
- Mobile hamburger menu: GREEN gradient

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11F_D.md`

### Final Confirmation
**Phase 11F is NOW FULLY COMPLETE. All public UI elements are derived exclusively from Devmart Primary Green (#1EB36B) and its approved dark variant. Zero red residuals remain.**

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
- Phase 11G remains BLOCKED until explicitly authorized

---

## Phase 11G-A — Mobile Menu Regression Fix (2025-12-28)

**Status:** ✅ COMPLETE

### Issue
Mobile menu rendered open by default instead of hidden off-canvas.

### Root Cause
The base `.main-nav` style set `display: inline-block` which could interfere with the mobile fixed positioning and transform. The mobile media query needed to explicitly override this.

### Fix Applied
**File:** `apps/public/src/assets/sass/style.scss` (lines 68-95)
- Added `display: block;` to override base inline-block
- Added `visibility: visible;` to ensure consistent visibility handling
- Transform `translateX(-260px)` now correctly hides menu off-canvas

### Files Modified
- `apps/public/src/assets/sass/style.scss`

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11G_A_Mobile_Menu.md`

### Verification
- Mobile load: menu hidden ✅
- Hamburger click: opens ✅
- Hamburger click again: closes ✅
- Desktop header: unaffected ✅

---

## Phase 11G-B — Navigation Hygiene (2025-12-28)

**Status:** ✅ COMPLETE

### Scope
apps/public ONLY — Remove demo links, align navigation with actual routes

### Changes Made

**File:** `apps/public/src/components/common/Header.tsx`

| Before | After | Reason |
|--------|-------|--------|
| Home dropdown (Home 01, Home 02) | Flat "Home" link → `/` | Demo variant removal |
| Services dropdown | Flat "Services" link → `/service` | Details accessed via slug |
| Projects dropdown | Flat "Projects" link → `/project` | Details accessed via slug |
| Blogs dropdown (Blog, Blog Standard, Blog Details) | Flat "Blog" link → `/blog` | Demo variants removal |
| Pages dropdown (Coming Soon, Error 404) | Removed entirely | System pages, not nav items |

### Final Navigation Structure
```
Home → /
About us → /about
Services → /service
Projects → /project
Blog → /blog
Contact us → /contact
```

### Additional Improvements
- Added `useLocation` hook to close mobile menu on route change
- Removed unused `useReducer` (menu dropdown state no longer needed)
- Cleaned up component to remove demo-specific code

### Guardian Rules Compliance
- ✅ apps/public ONLY
- ✅ No branding changes
- ✅ No new styling/colors/animations
- ✅ Finibus structure preserved (flat nav is valid Finibus pattern)

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11G_B_Navigation_Hygiene.md`

### Next Phase
- Phase 11G-A Fix: COMPLETE (CSS parity restored)
- Phase 11G-A Fix V2: COMPLETE (Explicit desktop hidden states + explicit media query)
- Phase 11H: COMPLETE (Stats section admin wiring fix - onSaveStats prop chain wired)
- Phase 11G-C+: BLOCKED until explicitly authorized

---

## Phase 11G-A Fix — Mobile Menu Parity Restoration (2025-12-28)

**Status:** ✅ COMPLETE

### Issue
Previous fix added non-original CSS properties that caused mobile menu to:
- Auto-open on page load
- Cover entire screen instead of 260px sidebar
- Overlay hero content when closed

### Root Cause
Non-Finibus CSS additions:
- `display: block;` — NOT in original template
- `visibility: visible;` — NOT in original template

These interfered with `transform: translateX(-260px)` hide behavior.

### Fix Applied

**File:** `apps/public/src/assets/sass/style.scss`
- Removed `display: block;`
- Removed `visibility: visible;`
- Restored EXACT Finibus original CSS

**File:** `apps/public/src/components/common/Header.tsx`
- Restored exact Finibus sidebar toggle logic: `setSidebar(1)` / `setSidebar(false)`
- Class binding: `sidebar === 1 ? 'main-nav slidenav' : 'main-nav'`

### Guardian Rules Compliance
- ✅ apps/public ONLY
- ✅ 1:1 Finibus parity restored
- ✅ No custom UX patterns

### Restore Point
- `docs/restore-points/Restore_Point_Phase_11G_A_Fix.md`

---

### Darkone (Admin Backend)
- 100% 1:1 template parity required
- No custom Bootstrap modifications
- No icon changes
- No SCSS refactors
- No token changes
- No design abstraction
- No shared UI libraries
- Reuse only existing template assets

---

## Authentication (Planned)

**Current:** Demo auth (temporary)  
**Target:** Supabase Auth

Implementation blocked until:
1. Asset mapping complete
2. Admin cleanup complete
3. Explicit GO authorization received
