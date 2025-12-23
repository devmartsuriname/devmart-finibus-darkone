# Backend Specification — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 4 COMPLETE | Phase 5 IN PROGRESS
Auth: IMPLEMENTED (Supabase JWT + Roles + RLS Active)
Execution: All 8 Admin Modules Complete | Public → DB Integration Active
Last Updated: 2025-12-23
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

**RLS:** Admin-only access (no public access in this phase).

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

### 2.9 projects Table (Phase 4A.5)

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

**RLS:** Admin-only access (no public access in this phase).

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

**RLS:** Public INSERT only (anon). Admin SELECT + UPDATE only (NO INSERT/DELETE per MVP).

**Seeding:** None — leads are captured via public form submissions.

### 2.13 services Table (Phase 4 Services)

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
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Indexes:**
- `idx_services_status` ON (status)
- `idx_services_display_order` ON (display_order)

**Trigger:**
- `update_services_updated_at` → calls `update_updated_at_column()`

**RLS:** Admin full CRUD + Public SELECT for published services.

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

### 2.16 Database Functions

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

### 4.4 blog_posts (Phase 4A.4 — ADMIN-ONLY)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can view all posts | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create posts | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update posts | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete posts | DELETE | `has_role(auth.uid(), 'admin')` |

**Note:** Public SELECT access will be added in a future phase when public blog rendering is authorized.

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

### 4.8 projects (Phase 4A.5 — ADMIN-ONLY)

| Policy | Operation | Condition |
|--------|-----------|-----------|
| Admins can view all projects | SELECT | `has_role(auth.uid(), 'admin')` |
| Admins can create projects | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update projects | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete projects | DELETE | `has_role(auth.uid(), 'admin')` |

**Note:** Public SELECT access may be added in a future phase when public portfolio rendering is authorized.

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

**Next Review:** After Analytics module authorization

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
