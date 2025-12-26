# Architecture — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 4 COMPLETE | Phase 5 COMPLETE | Phase 6.1 COMPLETE | Phase 7.2 COMPLETE | Phase 9 CLOSED | Phase 10A COMPLETE | Phase 10B CLOSED
Auth: IMPLEMENTED (Supabase JWT + Roles + RLS)
Execution: All 8 Admin Modules Complete | Public → DB Integration Complete | Routing/404/Image Parity Fixed | Phase 9 About/Global Blocks Complete | Phase 10B Pricing Controls Complete
Last Updated: 2025-12-26
```

---

## 1. Current Repository Structure (As-Is)

```
/
├── apps/
│   ├── public/              # Finibus-based public website (LOCKED)
│   │   ├── src/
│   │   ├── public/
│   │   └── ...
│   │
│   └── admin/               # Darkone-based admin portal
│       ├── src/
│       ├── public/
│       └── ...
│
├── Darkone-React_v1.0/      # Admin template (reference, read-only)
│
├── docs/                    # Documentation (this directory)
│   └── phase-4/             # Phase 4 module documentation
└── README.md
```

> **No restructuring is approved in any phase unless explicitly authorized.**

---

## 2. Application Status

### 2.1 Public Website (apps/public)

| Attribute | Value |
|-----------|-------|
| Template | Finibus React |
| Status | **LOCKED** — Phase 2 Complete |
| Phase | Phase 2 Complete |
| Modifications | ❌ Not Authorized |

### 2.2 Admin Portal (apps/admin)

| Attribute | Value |
|-----------|-------|
| Template | Darkone React |
| Status | **Phase 4 COMPLETE** |
| Auth | ✅ Supabase Auth IMPLEMENTED (JWT + Roles + RLS) |
| Build | ✅ All 8 Admin Modules Complete |

---

## 3. Application Isolation

### 3.1 Build Isolation

| Aspect | Public App | Admin App |
|--------|------------|-----------|
| Location | `/apps/public/` | `/apps/admin/` |
| Entry point | `src/main.tsx` | `src/main.tsx` |
| Dev port | 3000 | 8080 |
| Base path | `/` | `/admin` (TBD) |

### 3.2 Dependency Isolation

- Each app maintains its own `package.json`
- No shared runtime dependencies
- No cross-app imports
- Shared tooling only at root level (if needed)

### 3.3 Public App Dependencies (Phase 5 Hotfix)

| Package | Version | Purpose |
|---------|---------|---------|
| @supabase/supabase-js | ^2.89.0 | Database access for public pages |

**Install command:** `cd apps/public && bun install` (or npm/pnpm)

---

## 4. SCSS Isolation Rules

### 4.1 Strict Separation

```
apps/public/src/assets/scss/    # Finibus styles ONLY
apps/admin/src/assets/scss/     # Darkone styles ONLY
```

### 4.2 Prohibited Actions

- ❌ No cross-importing SCSS between apps
- ❌ No shared SCSS tokens or variables
- ❌ No Bootstrap version mixing
- ❌ No custom theme modifications

### 4.3 Rationale

- Finibus uses its own Bootstrap customization
- Darkone uses its own Bootstrap customization
- Mixing creates specificity conflicts
- Template updates become impossible

---

## 5. Routing Architecture

### 5.1 Public App Routes (Locked)

```
/                   # Homepage
/about              # About page
/services           # Services page
/projects           # Projects page
/blog               # Blog listing
/blog/:slug         # Blog detail
/contact            # Contact page
```

### 5.2 Admin App Routes (Phase 4A)

**Devmart Business Routes:**

| Route | Module | Current State |
|-------|--------|---------------|
| `/admin/dashboard` | Dashboard | Coming Soon |
| `/admin/content/blog` | Blog | Empty table |
| `/admin/content/projects` | Projects | Empty table |
| `/admin/content/pages` | Pages | Empty table |
| `/admin/content/media` | Media | ✅ Phase 4A.2 Complete |
| `/admin/content/testimonials` | Testimonials | Empty table |
| `/admin/crm/leads` | Leads | Empty table |
| `/admin/analytics` | Analytics | Coming Soon |
| `/admin/settings` | Settings | ✅ Phase 4A.3 Complete |

**Auth Routes (Implemented):**

| Route | Purpose | Status |
|-------|---------|--------|
| `/admin/auth/sign-in` | Login | ✅ Supabase Auth |
| `/admin/auth/sign-up` | Registration | ❌ Removed from MVP |
| `/admin/auth/reset-password` | Password reset | ❌ Removed from MVP |
| `/admin/auth/lock-screen` | Lock screen | Preserved (demo) |

**Darkone Demo Routes (Hidden from Navigation):**

| Route Pattern | Status |
|---------------|--------|
| `/admin/base-ui/*` | Hidden |
| `/admin/forms/*` | Hidden |
| `/admin/tables/*` | Hidden |
| `/admin/charts/*` | Hidden |
| `/admin/maps/*` | Hidden |
| `/admin/icons/*` | Hidden |
| `/admin/layouts/*` | Hidden |

### 5.3 No Cross-Navigation

- Public app never links to admin routes
- Admin app never links to public routes
- Separate session management

---

## 6. Authentication Boundary

### 6.1 Current State (Supabase Auth - Implemented)

**Admin App Authentication:**

| Component | Location | Purpose |
|-----------|----------|---------|
| Supabase Client | `src/integrations/supabase/client.ts` | Auth SDK |
| Auth Context | `src/context/useAuthContext.tsx` | Session management |
| Route Guard | `src/routes/router.tsx` | Auth + Role check |
| Access Denied | `src/components/AccessDenied.tsx` | Non-admin block |

**Authentication Flow:**

```
┌─────────────────┐
│  User Request   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     No      ┌─────────────────┐
│ isAuthenticated?├────────────►│ /auth/sign-in   │
└────────┬────────┘             └─────────────────┘
         │ Yes
         ▼
┌─────────────────┐     No      ┌─────────────────┐
│    isAdmin?     ├────────────►│  AccessDenied   │
└────────┬────────┘             └─────────────────┘
         │ Yes
         ▼
┌─────────────────┐
│  Admin Content  │
└─────────────────┘
```

**Role Enforcement:**

| Role | Access | Check Method |
|------|--------|--------------|
| `admin` | Full admin | `user_roles` table via `has_role()` |
| Others | Blocked | Shows AccessDenied component |

**Public App:**
- No authentication
- No protected routes
- All pages publicly accessible

### 6.2 Supabase Integration

| Component | Purpose | Status |
|-----------|---------|--------|
| Supabase Auth | User authentication | ✅ Implemented |
| Supabase Database | Data persistence | ✅ Tables created |
| Supabase Storage | File storage | ✅ Bucket created |
| Edge Functions | Server-side logic | Not implemented |

---

## 7. Deployment Architecture

### 7.1 Current (Development)

| App | Command | URL |
|-----|---------|-----|
| Admin | `npm run dev` | `http://localhost:8080` |
| Public | `npm run dev` | `http://localhost:3000` |

### 7.2 Future (Production)

| App | Domain | Path |
|-----|--------|------|
| Public | `devmart.com` | `/` |
| Admin | `devmart.com` | `/admin` |

OR

| App | Domain |
|-----|--------|
| Public | `devmart.com` |
| Admin | `admin.devmart.com` |

**Deployment strategy to be determined.**

---

## 8. Asset Isolation

### 8.1 Images

```
apps/public/src/assets/images/    # Public website images
apps/admin/src/assets/images/     # Admin portal images
```

### 8.2 Fonts

- Each app bundles its own fonts
- No shared font loading

### 8.3 Icons

- Public: Finibus icon set
- Admin: Iconify + Solar/Box icons

---

## 9. Environment Variables

### 9.1 Current (Active)

```
# Supabase (via Lovable integration)
VITE_SUPABASE_URL=https://hwrlkrrdqbtgyjpsrijh.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbG...
```

### 9.2 Secrets Configured

| Secret | Purpose | Status |
|--------|---------|--------|
| SUPABASE_URL | Database URL | ✅ Set |
| SUPABASE_PUBLISHABLE_KEY | Anon key | ✅ Set |
| SUPABASE_SERVICE_ROLE_KEY | Admin key | ✅ Set |
| SUPABASE_DB_URL | Direct DB | ✅ Set |

---

## 10. Devmart Admin Module Architecture

### 10.1 Approved Modules

| Section | Modules |
|---------|---------|
| MAIN | Dashboard |
| CONTENT | Blog, Projects, Pages, Media, Testimonials, Services |
| CRM | Leads |
| ANALYTICS | Analytics Dashboard |
| SYSTEM | Settings |

### 10.2 Excluded Modules

| Module | Reason |
|--------|--------|
| Team Management | Not in scope |
| Client Portal | Not in scope |
| User/Profile | Phase 3 excluded |

### 10.3 Hidden Modules (Darkone Demo)

| Category | Status |
|----------|--------|
| Base UI | Hidden from navigation |
| Forms | Hidden from navigation |
| Tables | Hidden from navigation |
| Charts | Hidden from navigation |
| Maps | Hidden from navigation |
| Icons | Hidden from navigation |
| Layouts | Hidden from navigation |

---

## 11. Phase 4 Documentation Status

### 11.1 Documentation Structure

```
docs/phase-4/
├── Phase_4_Overview.md              # Master overview + execution order
├── Phase_4_Admin_UI_Standard.md     # Shared UI patterns (NEW)
├── Phase_4_Frontend_Mapping_Index.md
├── Phase_4_Module_Media_Library.md  # Seeding plan included
├── Phase_4_Module_Settings.md       # Seeding plan included
├── Phase_4_Module_Pages.md          # Seeding plan included
├── Phase_4_Module_Projects.md       # Seeding plan included
├── Phase_4_Module_Blog.md           # Seeding plan included
├── Phase_4_Module_Testimonials.md   # Seeding plan included
├── Phase_4_Module_Leads.md          # Seeding plan included
├── Phase_4_Module_Services.md       # Seeding plan included
├── Phase_4_Module_Analytics.md      # Seeding plan included
└── Restore_Point_Phase_4A.2.md
```

### 11.2 Phase 4 Execution Order

| Order | Module | Status | Seeding |
|-------|--------|--------|---------|
| 1 | Media Library | ✅ Complete | 38 assets seeded |
| 2 | Settings | ✅ Complete | 14 keys seeded |
| 3 | Pages | ✅ Complete (Edit-Only) | 6 pages seeded |
| 4 | Projects | ✅ Complete | 8 projects (5 published, 3 draft) |
| 5 | Blog | ✅ Complete | 6 posts, 10 tags, 8 comments |
| 6 | Testimonials | ✅ Complete | 6 testimonials (4 published, 2 draft) |
| 7 | Leads | ✅ Complete (Admin) | None (from public forms) |
| 8 | Services | ✅ Complete | 7 services, 21 steps, 42 pricing plans |
| 9 | Analytics | Documentation | None |

### 11.3 Admin-Seeded Asset Strategy

**Location:** `public/seed/finibus/`

**Rationale:** Assets must be served from a path the admin app can access at runtime. The `finibus/public/images/` directory is NOT served by the Vite dev server or production build. Assets were copied to `public/seed/finibus/` which IS served at `/seed/finibus/...`.

**Folder Structure:**
```
public/seed/finibus/
├── hero/           # 3 hero slider images
├── portfolio/      # 9 portfolio thumbnails
├── blog/           # 8 blog post images
├── avatars/        # 7 author avatars
├── clients/        # 3 client photos
├── backgrounds/    # 5 background images
└── logos/          # 3 logo images
```

**Constraints:**
- These assets are for seeding ONLY
- After seeding, assets live in Supabase Storage
- The seed folder can be removed after initial seeding if desired
- Do NOT modify these assets without updating SEED_PACK in MediaSeedTool.tsx

---

## 12. Frontend Style Guide Requirement

**Status:** Required in later phase — NOT Phase 4A

A Finibus-based Frontend Style Guide is required to ensure consistency between public frontend and admin content creation.

**Phase 4A Action:** Document the requirement only.

---

---

## 13. Admin Modal Consistency Standard

All admin content CRUD modals must follow the Services modal as the single source of truth.

### 13.1 Gold Standard Reference

**File:** `src/app/(admin)/content/services/components/ServiceModal.tsx`

### 13.2 Required Modal Shell Pattern

```tsx
<Modal show={show} onHide={handleClose} centered size="xl">
  <Modal.Header closeButton className="border-bottom">
    <Modal.Title as="h5">{title}</Modal.Title>
  </Modal.Header>
  <Modal.Body>{/* Form content */}</Modal.Body>
  <Modal.Footer className="border-top">
    <Button variant="secondary" onClick={handleClose} disabled={isSaving}>Cancel</Button>
    <Button variant="primary" onClick={handleSubmit} disabled={isSaving}>Save Changes</Button>
  </Modal.Footer>
</Modal>
```

### 13.3 Required Attributes

| Attribute | Required Value |
|-----------|----------------|
| Modal Size | `size="xl"` |
| Header | `closeButton className="border-bottom"` |
| Title | `as="h5"` |
| Footer | `className="border-top"` |
| Cancel Button | `variant="secondary"` (left position) |
| Save Button | `variant="primary"` (right position) |
| Button Order | Cancel → Save (left to right) |
| Spinner | `<Spinner size="sm" className="me-1" />` during save |

### 13.4 Compliance Status

| Module | Modal File | Status |
|--------|------------|--------|
| Services | `ServiceModal.tsx` | ✅ Reference implementation |
| Projects | `ProjectModal.tsx` | ✅ Compliant |
| Pages | `PageEditModal.tsx` | ✅ Updated (Modal Standardization Hotfix) |
| Testimonials | `TestimonialModal.tsx` | ✅ Updated (Modal Standardization Hotfix) |
| Leads | `LeadDetailModal.tsx` | ✅ Updated (Modal Standardization Hotfix) |
| Blog | `BlogPostModal.tsx` | ✅ Updated (Phase 5.5 Blog Wiring) |

### 13.5 Excluded Modules

| Module | Reason |
|--------|--------|
| Media Library | Explicitly excluded per guardrails |
| Settings | Not modal-based (tab page)

---

## 14. Phase 9 — UI Blocks Architecture (CLOSED)

### 14.1 Overview

Phase 9 established the architecture for managing UI blocks across pages:

| Storage Type | Table | Purpose |
|--------------|-------|---------|
| Per-Page Blocks | `page_settings` | Page-specific UI block configuration |
| Shared Blocks | `global_blocks` | Blocks shared across multiple pages |
| Homepage Blocks | `homepage_settings` | Homepage-specific blocks (Phase 8, LOCKED) |

### 14.2 Block Categories

| Category | Storage | Example Blocks |
|----------|---------|----------------|
| Page Blocks | `page_settings` | Inside Story, Latest News (About page) |
| Shared Blocks | `global_blocks` | CTA Strip, Why Choose Us |
| Dynamic Modules | Separate tables | Services, Projects, Blog, Testimonials |

### 14.3 Admin UI Structure

**About Page Admin:**
- Extended PageEditModal with conditional tabs for About page (slug = 'about')
- Tabs: Page Info, Sections, SEO
- Sections tab contains editable blocks + read-only shared block references

**Global Blocks Admin:**
- Dedicated admin page at `/admin/content/global-blocks`
- Card-based list of all global blocks
- Edit modal per block (CTA Strip, Why Choose Us)

### 14.4 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                       ADMIN UI                              │
├─────────────────────────────────────────────────────────────┤
│  Pages Module          │  Global Blocks Module              │
│  (PageEditModal)       │  (/admin/content/global-blocks)    │
│  - About Sections Tab  │  - CTA Strip Editor                │
│  - SEO Tab             │  - Why Choose Us Editor            │
└────────────┬───────────┴────────────────┬───────────────────┘
             │                            │
             ▼                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      SUPABASE                               │
├─────────────────────────────────────────────────────────────┤
│  page_settings         │  global_blocks                     │
│  (page_slug = 'about') │  (cta_strip, why_choose_us)        │
└─────────────────────────────────────────────────────────────┘
```

### 14.5 Guardian Rules (Phase 9)

| Rule | Status |
|------|--------|
| `homepage_settings` immutable | ✅ Not touched |
| No frontend changes | ✅ Admin-only |
| No CSS/SCSS changes | ✅ Existing patterns |
| 1:1 Darkone patterns | ✅ Reused components |

---

## 15. Phase 10 — Services Pricing Architecture (DOCUMENTED)

### 15.1 Overview

Phase 10 addresses the Services module pricing display:

| Page | Action | Status |
|------|--------|--------|
| `/services` (Landing) | Remove pricing section | PENDING |
| `/service-details/:slug` | Fix pricing table visual parity | PENDING |

### 15.2 Relationship Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN MODULE                             │
│                    (Services)                               │
├─────────────────────────────────────────────────────────────┤
│  Services CRUD       │  Pricing Plans CRUD                  │
│  /admin/content/     │  (Embedded in Service modal)         │
│  services            │                                      │
└────────────┬─────────┴────────────────┬─────────────────────┘
             │                          │
             ▼                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      SUPABASE                               │
├─────────────────────────────────────────────────────────────┤
│  services            │  service_pricing_plans               │
│  (7 records)         │  (42 records: 6 per service × 7)     │
└────────────┬─────────┴────────────────┬─────────────────────┘
             │                          │
             ▼                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   PUBLIC FRONTEND                           │
├─────────────────────────────────────────────────────────────┤
│  /services           │  /service-details/:slug              │
│  - NO pricing        │  - Pricing table (Finibus parity)    │
│  - Service cards     │  - Monthly/Yearly toggle             │
└─────────────────────────────────────────────────────────────┘
```

### 15.3 Explicit Constraints

| Constraint | Status |
|------------|--------|
| No new tables | ✅ Not required |
| No changes to `page_settings` | ✅ Not related |
| No changes to `global_blocks` | ✅ Not related |
| No changes to `homepage_settings` | ✅ Not related |
| Finibus CSS reuse only | ✅ Required |

### 15.4 Blueprint Reference

Full specification: `docs/Phase_10A_Services_Pricing_Blueprint.md`

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-21 | Planning Agent | Phase 3 alignment complete |
| 2.0 | 2025-12-22 | Implementation Agent | Phase 4A.1.5 - Auth boundary implemented |
| 2.1 | 2025-12-22 | Implementation Agent | Phase 4A.2 - Media Library UI implemented |
| 2.2 | 2025-12-22 | Planning Agent | Added Phase 4 documentation status |
| 2.3 | 2025-12-22 | Implementation Agent | Phase 4A.2 - Seed Tool fixed with deterministic asset paths |
| 2.4 | 2025-12-22 | Implementation Agent | Phase 4A.2 v2 - RLS policy fix, preflight check, DB verification |
| 2.5 | 2025-12-22 | Implementation Agent | Phase 4A.2 - Error boundaries + Suspense fallbacks for routing stability |
| 2.6 | 2025-12-23 | Implementation Agent | Phase 4A.4B - Blog seeding complete |
| 2.7 | 2025-12-23 | Implementation Agent | Phase 4A.6 - Testimonials module complete |
| 2.8 | 2025-12-23 | Implementation Agent | Phase 4A.7 - Pages module complete (edit-only, slug-immutable, 6 pages seeded) |
| 2.9 | 2025-12-23 | Implementation Agent | Phase 4 CRM - Leads module complete (admin list + status/notes edit, no add/delete) |
| 3.0 | 2025-12-23 | Implementation Agent | Phase 4 Services - Services module complete (7 services, 21 steps, 42 pricing plans) |
| 3.1 | 2025-12-23 | Implementation Agent | Phase 5.3 - Service Details public wiring complete |
| 3.2 | 2025-12-23 | Implementation Agent | Phase 5.4 - Projects Detail + List public wiring complete |
| 3.3 | 2025-12-23 | Implementation Agent | Phase 5.4+ Hotfix - Projects parity complete (new fields, process_steps, public RLS, modal standardization) |
| 3.4 | 2025-12-23 | Implementation Agent | Phase 5.4+ Parity Restore - Fixed stretched images by adding landscape media + correcting project media assignments |
| 3.5 | 2025-12-24 | Implementation Agent | Phase 5.5 - Blog public wiring complete (list + details + RLS + modal parity) |
| 3.6 | 2025-12-24 | Implementation Agent | Phase 5.5 Title + Route Fix - Dynamic breadcrumb title, route changed from /blog-details/:slug to /blog/:slug |
| 3.7 | 2025-12-24 | Implementation Agent | Phase 6 - Contact form wired to leads table (honeypot anti-spam, client validation, no layout changes) |
| 3.8 | 2025-12-26 | Implementation Agent | Phase 9 CLOSED - About Page + Global Blocks architecture complete |
---

## 14. Phase 5.4+ Parity Restoration Notes

### 14.1 Problem Identified

Project Details page displayed stretched images because square portfolio thumbnails were assigned to slots that require landscape images.

### 14.2 Root Cause

- Finibus template landscape images (`process-banner.jpg`, `overview-1.jpg`, `overview-2.jpg`) were never added to Media Library
- Backfill incorrectly reused square portfolio thumbnails for all image slots

### 14.3 Fix Applied

1. **Added 3 landscape template images** to `media` table with known UUIDs
2. **Updated all 8 projects** to use correct landscape images for:
   - `featured_image_media_id` → `process-banner.jpg`
   - `image_media_id` → `overview-1.jpg`  
   - `check_launch_image_media_id` → `overview-2.jpg`

### 14.4 Verification

- Project Details page renders without image stretching
- Hero banner, overview, and check & launch sections use landscape images
- No layout/CSS changes were made (data-only fix)

---

## 15. Phase 5.5: Blog Public Wiring

### 15.1 Overview

Wired Finibus public blog pages to Supabase database while maintaining 1:1 template parity.

### 15.2 Components Created

| File | Purpose |
|------|---------|
| `apps/public/src/hooks/useBlogPosts.ts` | Fetch published blog posts for list page |
| `apps/public/src/hooks/useBlogDetails.ts` | Fetch single blog post by slug |

### 15.3 Components Modified

| File | Change |
|------|--------|
| `apps/public/src/App.tsx` | Added route `/blog-details/:slug` |
| `apps/public/src/components/pages/blog/BlogPage.tsx` | Wired to DB via useBlogPosts hook |
| `apps/public/src/components/pages/blog/BlogCart.tsx` | Accepts dynamic props for DB data |
| `apps/public/src/components/pages/blogDetails/BlogDetailsPage.tsx` | Reads slug from URL, fetches via hook |
| `apps/public/src/components/pages/blogDetails/BlogDetailsWrapper.tsx` | Renders DB content, supports HTML |
| `src/app/(admin)/content/blog/components/BlogPostModal.tsx` | Updated to `size="xl"` |

### 15.4 RLS Policy Added

```sql
CREATE POLICY "Public can view published posts"
ON public.blog_posts FOR SELECT
USING (status = 'published');
```

### 15.5 Route Pattern

| Route | Page | Data Source |
|-------|------|-------------|
| `/blog` | Blog list | `blog_posts` where status='published' |
| `/blog-details/:slug` | Blog detail | Single post by slug where status='published' |
| `/blog-details` (no slug) | Error page | Fallback route |

### 15.6 Finibus Parity

- NO layout changes
- NO typography changes
- NO spacing changes  
- NO className/CSS refactors
- Data binding ONLY (replace static content with DB data)

---

## 16. Phase 5.5 Blog Parity Hotfix

### 16.1 Problem Identified

When DB content was rendered, the Finibus template quote block (`.blog-quate`) was not displayed because the conditional rendering only showed either DB content OR template fallback.

### 16.2 Fix Applied

Modified `BlogDetailsWrapper.tsx` to ALWAYS render the template quote block and banner sections for demo parity, regardless of whether DB content is present.

**Rendering Strategy:**
```
1. If content exists → render via dangerouslySetInnerHTML
2. Else → render template paragraph placeholders
3. ALWAYS → render .blog-quate quote block
4. ALWAYS → render blog-banner section
```

### 16.3 Seed Data Backfill

Updated all 6 blog posts with Finibus-style lorem ipsum content:
- Titles match demo visual density
- Excerpts are properly formatted
- Categories assigned (Website, Software Design, UI/UX Design, etc.)
- Featured images assigned from Media Library

### 16.4 Verification

| Check | Status |
|-------|--------|
| Quote block visible | ✅ Always rendered |
| Blog banner visible | ✅ Always rendered |
| Dynamic title per slug | ✅ Working |
| No layout shift | ✅ Confirmed |
| No CSS changes | ✅ Confirmed |

---

## 17. Phase 6.1: Contact/Footer Settings Wiring

### 17.1 Overview

Wired Contact page and Footer components to Admin Settings (Supabase) with safe fallbacks.

### 17.2 Deployment Reality

**IMPORTANT:** The Lovable Preview runs the Admin app from `/src`. The `apps/public` Vite app is a **separate application** that requires independent deployment (e.g., local development, Vercel, Netlify).

| Environment | What Runs |
|-------------|-----------|
| Lovable Preview | Admin app (`/src/main.tsx`) |
| Local `cd apps/public && npm run dev` | Public app (`apps/public/src/main.tsx`) |
| Production deployment | Both apps separately |

### 17.3 Components Created

| File | Purpose |
|------|---------|
| `apps/public/src/hooks/usePublicSettings.ts` | Fetch whitelisted settings with fallbacks |

### 17.4 Components Modified

| File | Change |
|------|--------|
| `apps/public/src/components/common/Footer.tsx` | Wired to settings via usePublicSettings hook |
| `apps/public/src/components/pages/contact/ContactUsArea.tsx` | Wired to settings via usePublicSettings hook |

### 17.5 Leads Pipeline Summary

| Step | Description |
|------|-------------|
| 1 | User fills Contact form in `apps/public` |
| 2 | Client-side validation (name, email required, basic email format) |
| 3 | Honeypot check (if filled → silent success, no DB insert) |
| 4 | INSERT into `leads` table with `source='contact_form'` |
| 5 | Admin views leads at `/crm/leads` (authenticated, admin role required) |

**RLS Policies:**
- `"Public can submit leads"` — INSERT with `WITH CHECK (true)`
- `"Admins can view all leads"` — SELECT with `has_role(auth.uid(), 'admin')`
- `"Admins can update leads"` — UPDATE with `has_role(auth.uid(), 'admin')`

### 17.6 Public Settings Exposure

**Whitelisted Keys:**
- `contact_email`, `contact_phone`, `contact_address`
- `site_name`
- `facebook_url`, `instagram_url`, `linkedin_url`, `youtube_url`

**RLS Policy:** `"Public can read settings"` with `QUAL (true)` — allows anon SELECT.

**Fallback Behavior:** If fetch fails or keys empty, hardcoded Finibus defaults are used.

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-21 | Planning Agent | Phase 3 alignment complete |
| 2.0 | 2025-12-22 | Implementation Agent | Phase 4A.1.5 - Auth boundary implemented |
| 2.1 | 2025-12-22 | Implementation Agent | Phase 4A.2 - Media Library UI implemented |
| 2.2 | 2025-12-22 | Planning Agent | Added Phase 4 documentation status |
| 2.3 | 2025-12-22 | Implementation Agent | Phase 4A.2 - Seed Tool fixed with deterministic asset paths |
| 2.4 | 2025-12-22 | Implementation Agent | Phase 4A.2 v2 - RLS policy fix, preflight check, DB verification |
| 2.5 | 2025-12-22 | Implementation Agent | Phase 4A.2 - Error boundaries + Suspense fallbacks for routing stability |
| 2.6 | 2025-12-23 | Implementation Agent | Phase 4A.4B - Blog seeding complete |
| 2.7 | 2025-12-23 | Implementation Agent | Phase 4A.6 - Testimonials module complete |
| 2.8 | 2025-12-23 | Implementation Agent | Phase 4A.7 - Pages module complete (edit-only, slug-immutable, 6 pages seeded) |
| 2.9 | 2025-12-23 | Implementation Agent | Phase 4 CRM - Leads module complete (admin list + status/notes edit, no add/delete) |
| 3.0 | 2025-12-23 | Implementation Agent | Phase 4 Services - Services module complete (7 services, 21 steps, 42 pricing plans) |
| 3.1 | 2025-12-23 | Implementation Agent | Phase 5.3 - Service Details public wiring complete |
| 3.2 | 2025-12-23 | Implementation Agent | Phase 5.4 - Projects Detail + List public wiring complete |
| 3.3 | 2025-12-23 | Implementation Agent | Phase 5.4+ Hotfix - Projects parity complete (new fields, process_steps, public RLS, modal standardization) |
| 3.4 | 2025-12-23 | Implementation Agent | Phase 5.4+ Parity Restore - Fixed stretched images by adding landscape media + correcting project media assignments |
| 3.5 | 2025-12-24 | Implementation Agent | Phase 5.5 - Blog public wiring complete (list + details + RLS + modal parity) |
| 3.6 | 2025-12-24 | Implementation Agent | Phase 5.5 Blog Parity Hotfix - Quote block always rendered, seed data backfilled |
| 3.7 | 2025-12-25 | Implementation Agent | Phase 6.1 - Contact/Footer settings wiring + leads pipeline documentation |
| 3.8 | 2025-12-25 | Implementation Agent | Phase 7.2 - Routing 404 fix (Home → /project-details), 404 page parity (Header/Footer), Project Details image standardization (object-fit: cover) |
| 3.9 | 2025-12-26 | Definition Agent | Phase 9A - Page UI Blocks Architecture definition (documentation only, no execution) |

---

## 18. Phase 9 — Page UI Blocks Architecture

```
Status: DEFINITION COMPLETE — Execution not started
Phase: 9A
Created: 2025-12-26
```

### 18.1 Overview

Phase 9 extends the Homepage UI Blocks model to other static pages using a **scalable, governance-safe architecture**. The About page serves as the pilot implementation.

### 18.2 Three-Table Model

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

### 18.3 Block Ownership

| Block Type | Storage | Examples |
|------------|---------|----------|
| Homepage blocks | `homepage_settings` | Hero, About, Partners, Stats |
| Shared blocks | `global_blocks` | CTA Strip, Why Choose Us |
| Page-specific blocks | `page_settings` | About Inside Story, Services Hero |

### 18.4 About Page Section Mapping

| Section | Component | Data Source |
|---------|-----------|-------------|
| Breadcrumb | `Breadcrumb` | `pages.title` |
| Inside Story | `InsideStoryArea` | `page_settings` (slug='about') |
| Why Choose Us | `WhyChooseUsArea` | `global_blocks` (key='why_choose_us') |
| Testimonials | `TestimonialArea` | `testimonials` table |
| Latest News | `LatesNewsArea` | `page_settings` + `blog_posts` |
| Let's Talk | `LetsTalkArea` | `global_blocks` (key='cta_strip') |

### 18.5 Admin UX Integration

| Integration Point | Approach |
|-------------------|----------|
| Page-specific blocks | Pages module → Extended modal tabs |
| Global blocks | New `/admin/content/global-blocks` module |
| Shared block indicators | Read-only status with navigation links |

### 18.6 Governance Rules

| Rule | Enforcement |
|------|-------------|
| Homepage protection | `homepage_settings` NOT modified |
| CSS isolation | Admin SCSS ≠ Finibus SCSS |
| No block duplication | Shared blocks consumed, not copied |
| Fixed section order | Finibus parity maintained |

### 18.7 Execution Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 9A | Definition & documentation | ✅ COMPLETE |
| 9B | Database (tables, RLS, seeding) | ⬜ AWAITING |
| 9C | Admin UI (modals, forms) | ⬜ AWAITING |
| 9D | Frontend wiring (hooks, components) | ⬜ AWAITING |

### 18.8 Reference Documents

| Document | Purpose |
|----------|---------|
| `docs/Phase_9A_Page_UI_Blocks_Architecture.md` | Full architecture blueprint |
| `docs/restore-points/Restore_Point_Phase_9A_Definition.md` | Pre-execution snapshot |
| `docs/Backend.md` Section 16 | Proposed table schemas |
