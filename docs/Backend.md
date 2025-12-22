# Backend Specification — Devmart Platform

```
Status: AUTHORITATIVE
Phase: Phase 4A.1.5 Complete
Execution: Admin Auth Foundation Implemented
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
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    alt_text TEXT,
    title TEXT,
    uploaded_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### 2.4 Database Functions

| Function | Purpose |
|----------|---------|
| `has_role(_user_id, _role)` | Check if user has specific role (SECURITY DEFINER) |
| `update_updated_at_column()` | Trigger function for updated_at |

---

## 3. Storage (Implemented)

### 3.1 Buckets

| Bucket | Access | Purpose |
|--------|--------|---------|
| `media` | Public read | Media library files |

### 3.2 Storage RLS Policies

| Policy | Access | Condition |
|--------|--------|-----------|
| Public read | SELECT | Anyone |
| Authenticated upload | INSERT | Authenticated users (own folder) |
| Owner update | UPDATE | File owner only |
| Admin delete | DELETE | Admin role required |

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
| Authenticated insert | INSERT | Authenticated |
| Owner update | UPDATE | `auth.uid() = uploaded_by` |
| Admin delete | DELETE | `has_role(auth.uid(), 'admin')` |

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

## 7. Explicit Exclusions

### 7.1 Phase 4A.1.5 Scope

| Item | Status |
|------|--------|
| Public app authentication | ❌ Not in scope |
| User registration | ❌ Not in scope |
| Password reset | ❌ Not in scope |
| Email verification | ❌ Disabled |
| OAuth/social login | ❌ Not in scope |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-01-XX | Planning Agent | Initial draft |
| 1.0 | 2025-12-21 | Planning Agent | Phase 3 alignment complete |
| 2.0 | 2025-12-22 | Implementation Agent | Phase 4A.1.5 - Supabase Auth implemented |

**Next Review:** After Phase 4A.2 build authorization
