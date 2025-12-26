# Backend Specification — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 4 COMPLETE | Phase 5 COMPLETE | Phase 6.1 COMPLETE | Phase 7 CLOSED | Phase 8 CLOSED | Phase 9 CLOSED | Phase 10B FINALIZED | Phase 10C COMPLETE | Phase 11 Step 4 COMPLETE
Auth: IMPLEMENTED (Supabase JWT + Roles + RLS Active)
Execution: All 8 Admin Modules Complete | Public → DB Integration Complete | Homepage Wiring Verified + Visual Acceptance | Phase 8 UI Blocks Verified | Phase 9 About/Global Blocks Complete | Phase 10B Pricing Controls + Bootstrap Toast Parity | Phase 10C About Page Wiring | Phase 11 Branding Colors (Admin + Public Hook)
Note: Phase 7.1 = Verification + Documentation Only (No backend changes)
Note: Phase 7.2 = Visual Verification Only (No backend changes)
Note: Phase 8 = Verification + Documentation Only (No backend changes — Admin UI was already complete)
Note: Phase 10C = No backend/schema changes — uses existing page_settings table
Note: Phase 11 Step 2 = Added 3 branding color keys to settings table (migration)
Note: Phase 11 Step 4 = No backend changes — public hook reads existing settings table
Last Updated: 2025-12-26
```

---

## 0. Public App Supabase Client (Phase 5 Hotfix)

### 0.1 Dependency

| App | Package | Version | Status |
|-----|---------|---------|--------|
| apps/public | @supabase/supabase-js | ^2.89.0 | ✅ Added |

### 0.2 Client Location

| File | Purpose |
|------|---------|
| `apps/public/src/lib/supabase.ts` | Public app Supabase client |

### 0.3 Access Pattern

- **Read-only** access to published content (services, projects, testimonials, blog)
- **INSERT-only** for leads table (contact form submissions)
- Uses same Supabase project as admin app (hwrlkrrdqbtgyjpsrijh)

---

## 1. Current State — Supabase Backend (Active)

### 1.1 Overview

The Devmart admin portal now uses **Supabase Auth** for real authentication. The demo backend has been removed.

### 1.2 Authentication Components

| Component | File | Purpose |
|-----------|------|---------|
| Supabase Client | `src/integrations/supabase/client.ts` | Supabase SDK client |
| Auth Context | `src/context/useAuthContext.tsx` | Session state management with Supabase |
| Sign In Hook | `src/app/(other)/auth/sign-in/useSignIn.ts` | Login form handler |
| Access Denied | `src/components/AccessDenied.tsx` | Unauthorized access page |

### 1.3 Authentication Implementation

#### Auth Context (useAuthContext.tsx)

```typescript
// Supabase session management
- Uses supabase.auth.onAuthStateChange() for reactive auth
- Uses supabase.auth.getSession() for initial load
- Stores both user and session objects
- Checks admin role via user_roles table
- Exposes: isAuthenticated, isAdmin, isLoading, signIn, signOut
```

#### Session Storage

- **Method:** Supabase built-in (localStorage)
- **Persistence:** Automatic via Supabase client
- **Token Refresh:** Automatic via Supabase client

### 1.4 Role-Based Access Control

| Role | Access Level | Implementation |
|------|--------------|----------------|
| `admin` | Full admin access | Checked via `user_roles` table |
| `moderator` | Future use | Not enforced in MVP |
| `user` | Future use | Not enforced in MVP |

#### Role Checking

```typescript
// Uses has_role() database function (SECURITY DEFINER)
// Queries user_roles table for admin role
// Non-admin authenticated users see AccessDenied page
```

### 1.5 Removed Components

| Component | Status |
|-----------|--------|
| `fake-backend.ts` | No longer imported (file preserved for reference) |
| Cookie-based auth | Replaced with Supabase |
| Demo credentials | Removed |

---

## 2. Database Schema (Implemented)

### 2.1 Tables

| Table | Purpose | Status |
|-------|---------|--------|
| `user_roles` | Role assignments | ✅ Implemented |
| `media` | Media library entries | ✅ Implemented |
| `blog_posts` | Blog post entries | ✅ Implemented (Phase 4A.4) |
| `blog_tags` | Blog tag storage | ✅ Implemented (Phase 4A.4B) |
| `blog_post_tags` | Post-tag relationships | ✅ Implemented (Phase 4A.4B) |
| `blog_comments` | Blog comments | ✅ Implemented (Phase 4A.4B) |
| `settings` | Site configuration key-value store | ✅ Implemented (Phase 4A.3) |
| `projects` | Portfolio projects | ✅ Implemented (Phase 4A.5) |
| `testimonials` | Client testimonials | ✅ Implemented (Phase 4A.6) |
| `pages` | Page metadata (edit-only) | ✅ Implemented (Phase 4A.7) |
| `leads` | CRM lead capture | ✅ Implemented (Phase 4) |
| `services` | Service offerings | ✅ Implemented (Phase 4 Services) |
| `service_process_steps` | Service work process steps | ✅ Implemented (Phase 4 Services) |
| `service_pricing_plans` | Service pricing plans | ✅ Implemented (Phase 4 Services) |

### 2.2 user_roles Table

```sql
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);
```

### 2.3 media Table

```sql
CREATE TABLE public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL UNIQUE,  -- Added unique constraint for upsert
    public_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    alt_text TEXT,
    title TEXT,
    uploaded_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Unique constraint for seeding upsert support
ALTER TABLE public.media ADD CONSTRAINT media_storage_path_unique UNIQUE (storage_path);
```

### 2.4 settings Table (Phase 4A.3)

```sql
CREATE TABLE public.settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);
```

**Categories:** general, seo, social, branding

**Keys (14 total):**
- General: site_name, site_tagline, contact_email, contact_phone, contact_address
- SEO: default_meta_title, default_meta_description, default_og_image_media_id
- Social: facebook_url, instagram_url, linkedin_url, youtube_url
- Branding: logo_media_id, favicon_media_id

**Media References:** default_og_image_media_id, logo_media_id, favicon_media_id store Media Library UUIDs (not URLs).

### 2.5 blog_posts Table (Phase 4A.4)

```sql
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMPTZ,
    author_id UUID NOT NULL,
    category TEXT,  -- Added in Phase 4A.4B
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**RLS Policies:**
- Admin full CRUD access
- **Public SELECT** for published posts only (Phase 5.5):
  ```sql
  CREATE POLICY "Public can view published posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');
  ```

**Public Read Model (Phase 5.5):**
- `/blog` list page: Fetches all posts where `status = 'published'`, ordered by `published_at DESC`
- `/blog/:slug`: Fetches single post where `slug = :slug` AND `status = 'published'`
- Joins `media` table for `featured_image_media_id` to get `public_url`
- Breadcrumb title dynamically shows the post title (Phase 5.5 Title Fix)

**Content Rendering Strategy (Phase 5.5 Parity Hotfix):**
- Blog post `content` is stored as HTML and rendered via `dangerouslySetInnerHTML`
- Template quote block (`.blog-quate`) and banner sections are ALWAYS rendered for demo parity
- This hybrid approach ensures visual consistency even when DB content lacks template structure

### 2.6 blog_tags Table (Phase 4A.4B)

```sql
CREATE TABLE public.blog_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**RLS:** Admin-only access.

### 2.7 blog_post_tags Table (Phase 4A.4B)

```sql
CREATE TABLE public.blog_post_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.blog_tags(id) ON DELETE CASCADE,
    UNIQUE(post_id, tag_id)
);
```

**RLS:** Admin-only access.

### 2.8 blog_comments Table (Phase 4A.4B)

```sql
CREATE TABLE public.blog_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    commenter_name TEXT NOT NULL,
    commenter_email TEXT,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**RLS:** Admin-only access.

### 2.9 projects Table (Phase 4A.5 + Phase 5.4+ Hotfix)

```sql
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    heading TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    featured_image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    category TEXT NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    client TEXT,
    -- Phase 5.4+ Hotfix additions
    website TEXT,
    start_date DATE,
    end_date DATE,
    check_launch_content TEXT,
    check_launch_image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
- `projects_category_idx` ON (category)
- `projects_status_idx` ON (status)
- `projects_featured_idx` ON (is_featured, display_order)

**Trigger:**
- `update_projects_updated_at` → calls `update_updated_at_column()`

**RLS:**
- Admin-only CRUD access
- Public SELECT access for published projects (Phase 5.4+ Hotfix)

### 2.9.1 project_process_steps Table (Phase 5.4+ Hotfix)

```sql
CREATE TABLE public.project_process_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(project_id, step_number)
);
```

**Indexes:**
- `idx_project_process_steps_project_id` ON (project_id)

**Trigger:**
- `update_project_process_steps_updated_at` → calls `update_updated_at_column()`

**RLS:**
- Admin full CRUD access
- Public SELECT access for steps of published projects (via parent join)

### 2.10 testimonials Table (Phase 4A.6)

```sql
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    author_title TEXT,
    company TEXT,
    quote TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    avatar_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    featured BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    display_order INTEGER,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
- `testimonials_status_idx` ON (status)
- `testimonials_featured_idx` ON (featured, display_order)

**Trigger:**
- `update_testimonials_updated_at` → calls `update_updated_at_column()`

**RLS:** Admin full CRUD + Public SELECT for published testimonials.

### 2.11 pages Table (Phase 4A.7)

```sql
CREATE TABLE public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT pages_title_max_length CHECK (char_length(title) <= 100),
    CONSTRAINT pages_meta_title_max_length CHECK (meta_title IS NULL OR char_length(meta_title) <= 70),
    CONSTRAINT pages_meta_description_max_length CHECK (meta_description IS NULL OR char_length(meta_description) <= 160)
);
```

**Indexes:**
- `pages_is_published_idx` ON (is_published)
- Unique constraint on slug

**Triggers:**
- `update_pages_updated_at` → calls `update_updated_at_column()`
- `pages_prevent_slug_change` → calls `prevent_slug_change()` (enforces slug immutability)

**RLS:** Admin SELECT + UPDATE only (NO INSERT/DELETE). Public SELECT for published pages.

**Seed Data (6 pre-defined pages):**
- about, services, service-details, contact, blog, projects

### 2.12 leads Table (Phase 4 CRM)

```sql
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT,
    source TEXT NOT NULL DEFAULT 'contact_form',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
- `leads_status_idx` ON (status)
- `leads_created_at_idx` ON (created_at DESC)
- `leads_source_idx` ON (source)

**Trigger:**
- `update_leads_updated_at` → calls `update_updated_at_column()`

**RLS:** 
- `Public can submit leads` — INSERT with `WITH CHECK (true)` — allows anon users to insert
- `Admins can view all leads` — SELECT with `USING (has_role(auth.uid(), 'admin'))` — admin-only read
- `Admins can update leads` — UPDATE with `USING (has_role(auth.uid(), 'admin'))` — admin-only update
- No public SELECT policy — leads are not readable by anonymous users

**Seeding:** None — leads are captured via public form submissions.

### 2.12.1 Public Contact Form → Leads Integration (Phase 6)

**Component:** `apps/public/src/components/pages/contact/ContactForm.tsx`

**Flow:**
1. User fills out contact form (name, email, subject, message)
2. Client-side validation (required fields, email format)
3. Honeypot anti-spam check (hidden field, if filled → silent success, no DB insert)
4. INSERT into `leads` table with `source: 'contact_form'`, `status: 'new'` (default)
5. Success/error message displayed inline (no layout shift)
6. Button disabled during submission to prevent double-submit

**Anti-Spam:**
- Honeypot field (`name="website"`) hidden via inline CSS
- If filled by bots, shows success but does NOT insert into DB

**Validation:**
- `name` required (trimmed, non-empty)
- `email` required (basic regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- `message` required (trimmed, non-empty)
- `subject` optional

### 2.12.2 Public Settings Read — Contact/Footer Wiring (Phase 6.1)

**Hook:** `apps/public/src/hooks/usePublicSettings.ts`

**Purpose:** Fetch whitelisted contact settings from Supabase for public display in Contact page and Footer.

**Whitelisted Keys:**
| Key | Usage |
|-----|-------|
| `contact_email` | Email display in Footer + ContactUsArea |
| `contact_phone` | Phone display in Footer + ContactUsArea |
| `contact_address` | Address display in Footer + ContactUsArea |
| `site_name` | Footer copyright |
| `facebook_url` | Footer social icon |
| `instagram_url` | Footer social icon |
| `linkedin_url` | Footer social icon |
| `youtube_url` | Footer social icon |

**Fallback Behavior:**
- If Supabase fetch fails → use hardcoded Finibus defaults
- If specific key is empty → use fallback value for that key
- NO UI breakage on network error

**RLS Policy:** `"Public can read settings"` allows anon SELECT on settings table.


### 2.13 services Table (Phase 4 Services + Phase 10B)

```sql
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    full_description TEXT,
    icon_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    -- Phase 10B: Pricing Visibility Controls
    show_pricing BOOLEAN NOT NULL DEFAULT true,
    pricing_monthly_enabled BOOLEAN NOT NULL DEFAULT true,
    pricing_yearly_enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Phase 10B Additions:**

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| `show_pricing` | BOOLEAN NOT NULL | `true` | Master toggle: show/hide pricing section on Service Detail page |
| `pricing_monthly_enabled` | BOOLEAN NOT NULL | `true` | Enable/disable Monthly tab in pricing section |
| `pricing_yearly_enabled` | BOOLEAN NOT NULL | `true` | Enable/disable Yearly tab in pricing section |

**Admin Behavior:**
- All three toggles in ServiceModal Basic Info tab under "Pricing Visibility"
- Monthly/Yearly toggles disabled when Show Pricing is OFF
- Changes persist on save without regression to existing fields

**Public Behavior:**
- Pricing section renders only if `show_pricing = true`
- Monthly tab renders only if `pricing_monthly_enabled = true`
- Yearly tab renders only if `pricing_yearly_enabled = true`
- Edge case: If pricing enabled but both tabs disabled → section hidden + dev console warning

**Indexes:**
- `idx_services_status` ON (status)
- `idx_services_display_order` ON (display_order)

**Trigger:**
- `update_services_updated_at` → calls `update_updated_at_column()`

**RLS:** Admin full CRUD + Public SELECT for published services (including new columns).

**Seed Data:** 7 services matching Finibus template.

### 2.14 service_process_steps Table (Phase 4 Services)

```sql
CREATE TABLE public.service_process_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
- `idx_service_process_steps_service_id` ON (service_id)
- `idx_service_process_steps_step_number` ON (step_number)

**Trigger:**
- `update_service_process_steps_updated_at` → calls `update_updated_at_column()`

**RLS:** Admin full CRUD + Public SELECT for steps of published services.

**Seed Data:** 3 steps per service (21 total).

### 2.15 service_pricing_plans Table (Phase 4 Services)

```sql
CREATE TABLE public.service_pricing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    billing_period TEXT NOT NULL CHECK (billing_period IN ('monthly', 'yearly')),
    plan_name TEXT NOT NULL,
    plan_subtitle TEXT,
    price_amount NUMERIC(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    cta_label TEXT NOT NULL DEFAULT 'Get Started',
    display_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
- `idx_service_pricing_plans_service_id` ON (service_id)
- `idx_service_pricing_plans_billing_period` ON (billing_period)
- `idx_service_pricing_plans_status` ON (status)

**Trigger:**
- `update_service_pricing_plans_updated_at` → calls `update_updated_at_column()`

**RLS:** Admin full CRUD + Public SELECT for published plans of published services.

**Seed Data:** 6 plans per service (42 total: 3 monthly + 3 yearly).

### 2.17 page_settings Table (Phase 9B)

```sql
CREATE TABLE public.page_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT NOT NULL UNIQUE,
    data JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);
```

**Purpose:** Per-page UI block configuration storage.

**Trigger:**
- `set_page_settings_updated_at` → calls `update_updated_at_column()`

**RLS Policies:**
- `Admins can manage page settings` — ALL operations for admins
- `Public can read page settings` — SELECT with `USING (true)`

**Seed Data:** 1 row (page_slug = 'about') with Inside Story + Latest News configuration.

**Note:** `homepage_settings` remains untouched and is the master reference for homepage blocks.

### 2.18 global_blocks Table (Phase 9B)

```sql
CREATE TABLE public.global_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_key TEXT NOT NULL UNIQUE,
    data JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);
```

**Purpose:** Shared UI blocks that appear on multiple pages (CTA Strip, Why Choose Us).

**Trigger:**
- `set_global_blocks_updated_at` → calls `update_updated_at_column()`

**RLS Policies:**
- `Admins can manage global blocks` — ALL operations for admins
- `Public can read global blocks` — SELECT with `USING (true)`

**Seed Data:** 
- `cta_strip` — Call-to-action strip block
- `why_choose_us` — Why Choose Us section block

### 2.19 Database Functions

| Function | Purpose |
|----------|---------|
| `has_role(_user_id, _role)` | Check if user has specific role (SECURITY DEFINER) |
| `update_updated_at_column()` | Trigger function for updated_at |
| `prevent_slug_change()` | Trigger function for slug immutability (pages) |

---

## 3. Storage (Implemented)

### 3.1 Buckets

| Bucket | Access | Purpose |
|--------|--------|---------|
| `media` | **PUBLIC** | Media library files |

### 3.2 Storage RLS Policies

| Policy | Access | Condition |
|--------|--------|-----------|
| Public read | SELECT | Anyone |
| Authenticated upload | INSERT | Authenticated users (own folder) |
| Owner update | UPDATE | File owner only |
| **Admins can update media files** | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admin delete | DELETE | Admin role required |

> **Note (Phase 4A.2 v2):** The "Admins can update media files" storage policy was added to allow seed tool to upsert files that already exist in storage. Without this, the UPDATE operation fails when re-running the seed tool.

---

## 4. RLS Policies Summary

### 4.1 user_roles

| Policy | Operation | Condition |
|--------|-----------|-----------|
| View own roles | SELECT | `auth.uid() = user_id` |
| Admin manage all | ALL | `has_role(auth.uid(), 'admin')` |

### 4.2 media

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Public read | SELECT | `true` |
| Authenticated insert | INSERT | `auth.uid() = uploaded_by` |
| **Admins can insert media** | INSERT | `has_role(auth.uid(), 'admin')` |
| Owner update | UPDATE | `auth.uid() = uploaded_by` |
| Admin delete | DELETE | `has_role(auth.uid(), 'admin')` |

### 4.3 settings (Phase 4A.3)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Public can read settings | SELECT | `true` |
| Admins can insert settings | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update settings | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete settings | DELETE | `has_role(auth.uid(), 'admin')` |

### 4.4 blog_posts (Phase 4A.4 + Phase 5.5 Public Wiring)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can view all posts | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create posts | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update posts | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete posts | DELETE | `has_role(auth.uid(), 'admin')` |
| **Public can view published posts** | SELECT | `status = 'published'` |

**Note (Phase 5.5):** Public SELECT policy added to enable public blog rendering. Only posts with `status = 'published'` are visible to anonymous users.

### 4.5 blog_tags (Phase 4A.4B — ADMIN-ONLY)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can view all tags | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create tags | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update tags | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete tags | DELETE | `has_role(auth.uid(), 'admin')` |

### 4.6 blog_post_tags (Phase 4A.4B — ADMIN-ONLY)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can view all post tags | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create post tags | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can delete post tags | DELETE | `has_role(auth.uid(), 'admin')` |

### 4.7 blog_comments (Phase 4A.4B — ADMIN-ONLY)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can view all comments | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create comments | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update comments | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete comments | DELETE | `has_role(auth.uid(), 'admin')` |

### 4.8 projects (Phase 4A.5 + Phase 5.4+ Hotfix)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can view all projects | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create projects | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update projects | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete projects | DELETE | `has_role(auth.uid(), 'admin')` |
| **Public can view published projects** | SELECT | `status = 'published'` |

### 4.8.1 project_process_steps (Phase 5.4+ Hotfix)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can manage project steps | ALL | `has_role(auth.uid(), 'admin')` |
| Public can view steps of published projects | SELECT | Parent `project.status = 'published'` (via EXISTS subquery) |

### 4.9 testimonials (Phase 4A.6)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can view all testimonials | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create testimonials | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update testimonials | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete testimonials | DELETE | `has_role(auth.uid(), 'admin')` |
| Public can view published testimonials | SELECT | `status = 'published'` |

### 4.10 pages (Phase 4A.7 — EDIT-ONLY)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can view all pages | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can update pages | UPDATE | `has_role(auth.uid(), 'admin')` |
| Public can view published pages | SELECT | `is_published = true` |

**Note:** No INSERT or DELETE policies. Pages are pre-defined and slug-immutable per Phase_4_Module_Pages.md.

### 4.11 leads (Phase 4 CRM)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Public can submit leads | INSERT | `true` (anon, for contact form) |
| Admins can view all leads | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can update leads | UPDATE | `has_role(auth.uid(), 'admin')` |

**Explicitly NOT created (by design):**
- Public SELECT — leads are private
- Public UPDATE — leads are private
- Public DELETE — leads are private
- Admin INSERT — leads come from public forms only
- Admin DELETE — MVP restriction per Phase_4_Module_Leads.md

### 4.12 services (Phase 4 Services)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Public can view published services | SELECT | `status = 'published'` |
| Admins can view all services | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create services | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update services | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete services | DELETE | `has_role(auth.uid(), 'admin')` |

### 4.13 service_process_steps (Phase 4 Services)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Public can view steps of published services | SELECT | `service.status = 'published'` (via join) |
| Admins can view all steps | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create steps | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update steps | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete steps | DELETE | `has_role(auth.uid(), 'admin')` |

### 4.14 service_pricing_plans (Phase 4 Services)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Public can view published plans of published services | SELECT | `status = 'published' AND service.status = 'published'` |
| Admins can view all plans | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create plans | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update plans | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete plans | DELETE | `has_role(auth.uid(), 'admin')` |

## 5. Authentication Flow

### 5.1 Login Flow

```
1. User enters email/password on /auth/sign-in
2. useSignIn calls supabase.auth.signInWithPassword()
3. onAuthStateChange fires with new session
4. Auth context updates: user, session, isAuthenticated
5. checkAdminRole() queries user_roles table (via setTimeout)
6. isAdmin state updated
7. Router allows access if isAdmin = true
8. Router shows AccessDenied if authenticated but !isAdmin
```

### 5.2 Session Persistence

```
1. On app load, supabase.auth.getSession() retrieves stored session
2. onAuthStateChange listener registered FIRST
3. Admin role checked after session retrieved
4. isLoading = false after initial check complete
```

### 5.3 Logout Flow

```
1. User clicks Logout in ProfileDropdown
2. signOut() calls supabase.auth.signOut()
3. Local state cleared
4. Navigate to /auth/sign-in
```

---

## 6. Security Considerations

### 6.1 Implemented

| Security Feature | Implementation |
|------------------|----------------|
| Password auth | Supabase Auth (email/password) |
| Session management | Supabase JWT with auto-refresh |
| Role checking | Server-side via RLS + has_role() |
| Route protection | Client-side guard + server-side RLS |

### 6.2 Not Implemented (MVP Scope)

| Feature | Status |
|---------|--------|
| Email confirmation | Disabled (SMTP not configured) |
| Password reset | Not implemented |
| Magic links | Not implemented |
| OAuth providers | Not implemented |
| Registration flow | Not implemented (admin-only) |

---

## 7. Media Library Implementation (Phase 4A.2)

### 7.1 Overview

The Media Library provides admin-only file upload, management, and deletion capabilities.

### 7.2 Upload Flow

```
1. Admin clicks "Add Media" button
2. Modal opens with dropzone
3. File validated (type, size)
4. File uploaded to Supabase Storage: media/{userId}/{timestamp}-{filename}
5. Public URL generated (bucket is PUBLIC)
6. Metadata row inserted into media table
7. List refreshes on success
```

### 7.3 Storage Path Format

```
media/{user_id}/{timestamp}-{sanitized_filename}
```

- Files are organized by user ID
- Timestamp prevents filename collisions
- Filename sanitized to remove special characters

### 7.4 File Validation

| Constraint | Value |
|------------|-------|
| Max file size | 10MB |
| Allowed types | image/jpeg, image/png, image/gif, image/webp, application/pdf |

### 7.5 RLS Behavior

| Action | Policy | Behavior |
|--------|--------|----------|
| View | Public read | Anyone can view uploaded media |
| Upload | Authenticated insert | Authenticated users can upload (own folder) |
| Update | Owner update | Only file owner can update metadata |
| Delete | Admin delete | Only admins can delete files |

---

## 8. Phase 4 Seeding Policy

### 8.1 Overview

Data seeding is **REQUIRED** for applicable modules per Phase 4 governance.

### 8.2 Seeding Reference

See: `docs/phase-4/Phase_4_Overview.md` for complete seeding policy.

| Module | Seeding Required | Method |
|--------|------------------|--------|
| Media Library | **YES** | Seed Tool (38 assets from public/seed/finibus/) |
| Settings | **YES** | SQL migration |
| Pages | **YES** | SQL migration |
| Blog | Recommended | Manual via UI |
| Projects | Recommended | Manual via UI |
| Testimonials | Recommended | Manual via UI |
| Leads | NO | Form submissions |
| Analytics | NO | Aggregates other data |

### 8.3 Media Seed Tool Implementation

**Asset Source:** `public/seed/finibus/` (deterministic runtime path)

**Categories:**
- Hero (3 images)
- Portfolio (9 images)
- Blog (8 images)
- Avatars (7 images)
- Clients (3 images)
- Backgrounds (5 images)
- Logos (3 images)

**How seeding works:**
1. Admin navigates to `/content/media`
2. Seed Tool appears when media table is empty
3. Click "Start Seeding" button
4. **Preflight check:** Tool fetches one test asset to verify paths are accessible
5. Tool fetches files from `/seed/finibus/...` paths
6. Uploads to Supabase Storage bucket `media`
7. Inserts metadata rows into `public.media` table with `uploaded_by = current user ID`
8. Uses upsert with `storage_path` unique constraint for idempotency
9. **DB Verification:** Displays row count after seeding completes

**Re-running safely:**
- Tool uses `upsert` with `onConflict: 'storage_path'`
- Duplicate uploads overwrite existing files
- Duplicate rows update instead of insert
- Safe to re-run without creating duplicates

**RLS Requirements:**
- Seeding requires admin role (checked via `has_role()`)
- The "Admins can insert media" policy allows admins to insert with any `uploaded_by`
- The seed tool now sets `uploaded_by` to the current admin's user ID

---

## 9. Explicit Exclusions

### 9.1 Phase 4A Scope

| Item | Status |
|------|--------|
| Public app authentication | ❌ Not in scope |
| User registration | ❌ Not in scope |
| Password reset | ❌ Not in scope |
| Email verification | ❌ Disabled |
| OAuth/social login | ❌ Not in scope |

---

---

## 10. Error Handling & Stability (Phase 4A.2)

### 10.1 Error Boundaries

The admin application uses React Error Boundaries to catch runtime errors and prevent blank screens.

| Component | File | Purpose |
|-----------|------|---------|
| ErrorBoundary | `src/components/ErrorBoundary.tsx` | Catches errors, shows recovery UI |
| LoadingFallback | `src/components/LoadingFallback.tsx` | Loading spinner for Suspense |

### 10.2 Error Recovery

When an error occurs:
1. ErrorBoundary catches the error
2. Error card displays with message
3. User can click "Try Again" to reset state
4. User can click "Reload Page" for full refresh

### 10.3 Suspense Strategy

| Location | Fallback |
|----------|----------|
| Router level | Full-page loading spinner |
| AdminLayout children | Page-level loading spinner |
| TopNavigationBar | Empty div placeholder |
| VerticalNavigationBar | Empty div placeholder |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-21 | Planning Agent | Phase 3 alignment complete |
| 2.0 | 2025-12-22 | Implementation Agent | Phase 4A.1.5 - Supabase Auth implemented |
| 2.1 | 2025-12-22 | Implementation Agent | Phase 4A.2 - Media Library UI implemented |
| 2.2 | 2025-12-22 | Planning Agent | Added Phase 4 seeding policy reference |
| 2.3 | 2025-12-22 | Implementation Agent | Phase 4A.2 - Seed Tool fixed: deterministic paths, text-only UI |
| 2.4 | 2025-12-22 | Implementation Agent | Phase 4A.2 v2 - RLS fix: admin INSERT policy, uploaded_by = user.id, preflight check, DB verification |
| 2.5 | 2025-12-22 | Implementation Agent | Phase 4A.2 - Error boundaries + Suspense fallbacks added |
| 2.6 | 2025-12-23 | Implementation Agent | Phase 4A.4B - Blog seeding: tags, post-tags, comments tables + seed data |
| 2.7 | 2025-12-23 | Implementation Agent | Phase 4A.5 - Projects module: table, indexes, RLS, trigger, seed data (8 projects) |
| 2.8 | 2025-12-23 | Implementation Agent | Phase 4A.6 - Testimonials module: table, RLS, seed data (6 testimonials) |
| 2.9 | 2025-12-23 | Implementation Agent | Phase 4A.7 - Pages module: table, slug immutability trigger, RLS (SELECT+UPDATE only), seed data (6 pages) |
| 3.0 | 2025-12-23 | Implementation Agent | Phase 4 CRM - Leads module: table, RLS (Public INSERT, Admin SELECT+UPDATE), no seeding |
| 3.1 | 2025-12-23 | Implementation Agent | Phase 4 Services - Media seeder utility added for icon/step image import |
| 3.2 | 2025-12-23 | Implementation Agent | Phase 5.4+ Hotfix - Projects parity: new fields, process_steps table, public RLS, modal standardization |

**Next Review:** After Phase 5.5 authorization

---

## 12. Services Media Dependencies (Phase 4 Services Fix)

### 12.1 Required Media Assets

The Services module requires the following media assets to achieve 1:1 Finibus parity:

| Asset Type | Count | Source Path | Storage Path |
|------------|-------|-------------|--------------|
| Service Icons | 7 | `finibus/public/images/icons/service-icon-{1-7}.png` | `finibus/icons/service-icon-{1-7}.png` |
| Process Step Images | 3 | `finibus/public/images/step-{1-3}.{png,jpg}` | `finibus/services/step-{1-3}.{png,jpg}` |

### 12.2 Asset-to-Service Mapping

| Service (display_order) | Icon Filename |
|------------------------|---------------|
| Web Design (1) | service-icon-1.png |
| App Design (2) | service-icon-2.png |
| Developing (3) | service-icon-3.png |
| Graphic Design (4) | service-icon-4.png |
| Video Animation (5) | service-icon-5.png |
| 3D Design (6) | service-icon-6.png |
| UI/UX Design (7) | service-icon-7.png |

### 12.3 Process Step Image Mapping

| Step Number | Image Filename |
|-------------|----------------|
| 1 | step-1.png |
| 2 | step-2.jpg |
| 3 | step-3.jpg |

### 12.4 Seeder Utility

A one-time admin seeder utility is provided at `/content/services`:

- **Component:** `ServiceMediaSeeder.tsx`
- **Utility:** `seedServiceMedia.ts`
- **Purpose:** Upload Finibus assets to Media Library and link to services/process steps
- **Trigger:** Shown automatically when any service is missing an icon

### 12.5 Post-Seeding State

After running the seeder:
- 7 services have `icon_media_id` linked to corresponding icon
- 21 process steps have `image_media_id` linked to corresponding step image
- All media records created in `media` table with proper public URLs

---

## 13. Phase 5 — Public → DB Integration

### 13.1 Overview

Phase 5 wires the public frontend (`apps/public`) to read data from Supabase instead of hardcoded content.

### 13.2 Service Details (Phase 5.3) — IMPLEMENTED

| Component | Status |
|-----------|--------|
| Route: `/service-details/:slug` | ✅ Dynamic route |
| Route: `/service-details` (no slug) | ✅ Redirects to `/service` |
| Hook: `useServiceDetails.ts` | ✅ Fetches service + steps + pricing |
| Wrapper: `ServiceDetailsWrapper.tsx` | ✅ DB-driven content |
| Pricing: `ServicePrice.tsx` + `PriceBox.tsx` | ✅ Display-only (no Stripe) |

#### Data Contract

| Entity | Fields | Filter |
|--------|--------|--------|
| Service | title, slug, short_description, full_description, icon | `status = 'published'` |
| Process Steps | step_number, title, description, image | Ordered by step_number |
| Pricing Plans | billing_period, plan_name, price_amount, features | `status = 'published'` |
| Sidebar Services | All published services | For navigation |

#### RLS Access Pattern

- **Read-only** public anon access
- Service: `status = 'published'`
- Steps: Parent service `status = 'published'`
- Plans: Own `status = 'published'` AND parent service `status = 'published'`

#### Media Rendering Rule

- Icons and step images render ONLY if `media.public_url` exists
- No fallback icons or placeholder images
- If media not linked, element not rendered

#### Pricing CTA

- Links to `/contact` (placeholder)
- Future: Quote/Offer Wizard integration
- NO Stripe, NO checkout, NO payments

### 13.3 Projects Detail + List (Phase 5.4 + Phase 5.4+ Hotfix) — IMPLEMENTED

| Component | Status |
|-----------|--------|
| Route: `/project-details/:slug` | ✅ Dynamic route |
| Route: `/project-details` (no slug) | ✅ ErrorPage |
| Route: `/project` | ✅ Uses DB data via hook |
| Hook: `useProjects.ts` | ✅ Fetches published projects with new fields |
| Hook: `useProjectDetails.ts` | ✅ Fetches project + process steps + related projects |
| Wrapper: `ProjectWrapper.tsx` | ✅ DB-driven content |
| CartFilter: `CartFilter.tsx` | ✅ Presentational, receives projects as prop |
| Process: `ProjectProcess.tsx` | ✅ **Fully DB-driven** (all fields bound) |
| Related: `ReletedProject.tsx` | ✅ DB-driven slider |

#### Data Contract (Updated Phase 5.4+ Hotfix)

| Entity | Fields | Filter |
|--------|--------|--------|
| Project | title, heading, slug, description, category, client, **website, start_date, end_date, check_launch_content** | `status = 'published'` |
| Featured Image | public_url, alt_text | via `featured_image_media_id` |
| Overview Image | public_url, alt_text | via `image_media_id` |
| **Check Launch Image** | public_url, alt_text | via `check_launch_image_media_id` |
| **Process Steps** | step_number, title, description, image | via `project_process_steps` table |
| Related Projects | Same as Project | Exclude current, limit 6 |

#### RLS Access Pattern

- **Read-only** public anon access
- Project: `status = 'published'` (public SELECT policy added Phase 5.4+ Hotfix)
- Process Steps: Parent project `status = 'published'` (via EXISTS subquery)

#### Media Rendering Rule

- Featured, overview, check_launch, and step images render ONLY if `media.public_url` exists
- If no DB image, fallback to template static image (for parity)
- No broken img tags

#### Dynamic Fields (Now in DB)

- Website: Rendered from `projects.website` (if present)
- Start Date: Rendered from `projects.start_date` (formatted DD.MM.YYYY)
- End Date: Rendered from `projects.end_date` (formatted DD.MM.YYYY)
- Process Steps: Rendered from `project_process_steps` table (4 steps per project)
- Check & Launch: Rendered from `projects.check_launch_content` + `check_launch_image`

---

## 14. Admin Modal Consistency Standard (Phase 5.4+ Hotfix)

### 14.1 Overview

All admin content CRUD modals MUST follow a consistent sizing and layout standard based on the Services modal pattern.

### 14.2 Modal Sizing

| Modal Type | Size | Pattern |
|------------|------|---------|
| Content CRUD (Services, Projects, Blog, etc.) | `size="xl"` | Full-width with tabs |
| Simple Dialogs (Confirm, Alert) | `size="sm"` or default | Centered minimal |

### 14.3 Tab Layout Pattern

For multi-section content (e.g., Services, Projects):
- Use `Tabs` component with `TabsList` / `TabsTrigger` / `TabsContent`
- Tab 1: "Basic Info" (required fields)
- Tab 2: "Process Steps" (if applicable)
- Tab 3: Additional content tabs (pricing, etc.)

### 14.4 Footer Button Pattern

| Position | Element | Variant |
|----------|---------|---------|
| Left | "Cancel" button | `variant="outline"` |
| Right | "Save Changes" / "Add [Entity]" button | `variant="default"` (primary) |

### 14.5 Components Using This Standard

| Module | Modal File | Status |
|--------|------------|--------|
| Services | `ServiceModal.tsx` | ✅ Reference implementation |
| Projects | `ProjectModal.tsx` | ✅ Compliant |
| Pages | `PageEditModal.tsx` | ✅ Updated (Modal Standardization Hotfix) |
| Testimonials | `TestimonialModal.tsx` | ✅ Updated (Modal Standardization Hotfix) |
| Leads | `LeadDetailModal.tsx` | ✅ Updated (Modal Standardization Hotfix) |
| Blog | `BlogPostModal.tsx` | ⏳ Pending (Blog wiring phase) |

### 14.6 Excluded Modules

| Module | Reason |
|--------|--------|
| Media Library | Explicitly excluded per guardrails |
| Settings | Not modal-based (tab page) |

### 14.7 MediaPicker Consistency

All media selection fields should use the `MediaPicker` component with consistent styling:
- Trigger shows preview thumbnail if selected
- Modal allows browsing/filtering Media Library
- Selection callback updates form state

---

## 15. Project Details Media Requirements (Phase 5.4+ Parity Hotfix)

### 15.1 Overview

The Project Details page requires **landscape-oriented images** for certain slots. Using square/portrait images causes visual stretching.

### 15.2 Image Slots and Requirements

| Slot | DB Field | Required Aspect | Template Reference |
|------|----------|-----------------|-------------------|
| Hero/Banner | `featured_image_media_id` | Landscape (~3:1) | `process-banner.jpg` |
| Overview Section | `image_media_id` | Landscape | `overview-1.jpg` |
| Check & Launch | `check_launch_image_media_id` | Landscape | `overview-2.jpg` |
| Card Thumbnail | (uses `image_media_id` on list) | Any | `portfolio-X.jpg` |

### 15.3 Template Landscape Images (Seeded)

| Filename | Media ID | Purpose |
|----------|----------|---------|
| `process-banner.jpg` | `f1a1a1a1-1111-1111-1111-111111111111` | Hero/featured banner |
| `overview-1.jpg` | `f2a2a2a2-2222-2222-2222-222222222222` | Overview section |
| `overview-2.jpg` | `f3a3a3a3-3333-3333-3333-333333333333` | Check & Launch section |

### 15.4 Parity Rule

- **DO NOT** assign square portfolio thumbnails to detail-page image slots
- **Portfolio images** should be used for card/grid thumbnails ONLY
- **Landscape images** must be used for featured_image, image, and check_launch_image fields on Project Details

---

## 16. Phase 9 — Page UI Blocks Architecture (PROPOSED)

```
Status: DEFINITION ONLY — No execution performed
Phase: 9A
Created: 2025-12-26
```

### 16.1 Overview

Phase 9 extends the Homepage UI Blocks model to other static pages, starting with the About page as pilot. This section documents the **proposed** database schema — no tables have been created.

**Key Principle:** Homepage (`homepage_settings`) remains LOCKED and unchanged. New tables handle page-specific and global shared blocks.

### 16.2 `page_settings` Table (PROPOSED)

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
```

**Key Constraints:**

- One row per `page_slug`
- `page_slug` corresponds to `pages.slug` (referential integrity via application logic)
- JSONB structure varies per page type

**Proposed RLS Policies:**

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can manage page settings | ALL | `has_role(auth.uid(), 'admin')` |
| Public can read page settings | SELECT | `true` |

**Example JSONB for About Page:**

```jsonb
{
  "inside_story": {
    "enabled": true,
    "section_label": "Inside Story",
    "title": "...",
    "description": "...",
    "main_image_media_id": null,
    "cto_message": "...",
    "cto_name": "...",
    "cto_title": "...",
    "cto_signature_media_id": null,
    "progress_stats": [
      { "label": "Idea & Research", "percent": 90 }
    ]
  },
  "latest_news": {
    "enabled": true,
    "section_label": "Blog",
    "section_title": "...",
    "view_all_label": "View All Blog",
    "view_all_url": "/blog",
    "posts_count": 2
  }
}
```

### 16.3 `global_blocks` Table (PROPOSED)

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
```

**Initial Block Keys (Proposed):**

| block_key | Purpose | Current Source (Reference) |
|-----------|---------|---------------------------|
| `cta_strip` | "Let's Talk" CTA section | `homepage_settings.data.cta` |
| `why_choose_us` | "Why Choose Us" section | `homepage_settings.data.why_choose` |

**Proposed RLS Policies:**

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can manage global blocks | ALL | `has_role(auth.uid(), 'admin')` |
| Public can read global blocks | SELECT | `true` |

### 16.4 Homepage Protection Note

**CRITICAL:** The `homepage_settings` table is NOT modified in Phase 9.

| Aspect | Status |
|--------|--------|
| `homepage_settings` schema | ❌ NO CHANGES |
| `homepage_settings` RLS policies | ❌ NO CHANGES |
| `homepage_settings` data | ❌ NO MIGRATION |
| Homepage frontend hooks | ❌ NO CHANGES |

Homepage continues to use `homepage_settings` exclusively. The new `global_blocks` table is for future pages consuming shared content.

### 16.5 About Page Data Mapping (Proposed)

| Section | Data Source | Type |
|---------|-------------|------|
| Breadcrumb | `pages.title` | Page metadata |
| Inside Story | `page_settings` (slug='about') | Page-specific |
| Why Choose Us | `global_blocks` (key='why_choose_us') | **SHARED** |
| Testimonials | `testimonials` table | Dynamic module |
| Latest News | `page_settings` + `blog_posts` | Page-specific config |
| Let's Talk | `global_blocks` (key='cta_strip') | **SHARED** |

### 16.6 Execution Status

| Phase | Description | Status |
|-------|-------------|--------|
| 9A | Definition & documentation | ✅ COMPLETE |
| 9B | Database creation + seeding | ⬜ AWAITING AUTHORIZATION |
| 9C | Admin UI | ⬜ AWAITING AUTHORIZATION |
| 9D | Frontend wiring | ⬜ AWAITING AUTHORIZATION |
