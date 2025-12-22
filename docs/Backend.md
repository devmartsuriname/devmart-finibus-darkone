# Backend Specification — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 4A.2 Seeding Complete (v2 Final Fix)
Execution: Admin Auth + Media Library + Seed Tool Storage+DB RLS Fixed
Last Updated: 2025-12-22
```

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
| `settings` | Site configuration key-value store | ✅ Implemented (Phase 4A.3) |

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

### 2.5 Database Functions

| Function | Purpose |
|----------|---------|
| `has_role(_user_id, _role)` | Check if user has specific role (SECURITY DEFINER) |
| `update_updated_at_column()` | Trigger function for updated_at |

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

---

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

**Next Review:** After Phase 4A.3 authorization
