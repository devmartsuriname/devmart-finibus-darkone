# Restore Point — Phase 13.1 Pre-Execution

**Created:** 2026-01-04  
**Phase:** Phase 13.1 — Interaction Infrastructure  
**Status:** 📋 RESTORE POINT CREATED (Pre-Execution)

---

## Purpose

This restore point documents the system state immediately before Phase 13.1 execution, enabling full rollback if required.

---

## Current State Summary

### Notifications System

| Component | State |
|-----------|-------|
| Database table | ❌ Does not exist |
| Triggers | ❌ None |
| Admin UI | Static demo data from `src/assets/data/topbar.ts` |
| Real-time | ❌ Not implemented |

### User Profiles

| Component | State |
|-----------|-------|
| Database table | ❌ Does not exist |
| Profile hook | ❌ Not implemented |
| ProfileDropdown | Shows email-derived name, hardcoded avatar |
| My Account page | ❌ Does not exist |

### RLS Policies

| Role | State |
|------|-------|
| admin | ✅ Fully implemented via `has_role()` |
| moderator (editor) | ❌ Not implemented |
| user (viewer) | ❌ Not implemented |

### Enum Status

```sql
-- Current enum (will NOT be altered)
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
```

---

## Files in Current State

### Notifications Component

**File:** `src/components/layout/TopNavigationBar/components/Notifications.tsx`

**Current behavior:**
- Imports `notificationsData` from `@/assets/data/topbar`
- Displays static demo notifications
- No database connection
- No mark-as-read functionality

### ProfileDropdown Component

**File:** `src/components/layout/TopNavigationBar/components/ProfileDropdown.tsx`

**Current behavior:**
- Imports hardcoded avatar from `@/assets/images/users/avatar-1.jpg`
- Uses `useAuthContext()` for logout only
- No profile data fetching
- Links to `/auth/lock-screen` and `/auth/sign-in`

### Auth Context

**File:** `src/context/useAuthContext.tsx`

**Current behavior:**
- Stores user session in cookies
- Provides `saveSession`, `removeSession`, `isAuthenticated`
- No profile integration

---

## Database State

### Existing Tables (Preserved)

- `user_roles` — Stores user-role mappings
- All content tables (blog_posts, projects, services, etc.)
- All CRM tables (leads, quotes, etc.)

### Existing Functions (Preserved)

```sql
-- has_role function (unchanged)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;
```

---

## Rollback Instructions

### If Phase 13.1 Fails

Execute the following in order:

```sql
-- 1. Drop triggers
DROP TRIGGER IF EXISTS on_lead_created ON public.leads;
DROP TRIGGER IF EXISTS on_quote_created ON public.quotes;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Drop functions
DROP FUNCTION IF EXISTS public.notify_admins_new_lead();
DROP FUNCTION IF EXISTS public.notify_admins_new_quote();
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.has_editor_role(UUID);
DROP FUNCTION IF EXISTS public.has_viewer_role(UUID);

-- 3. Drop tables
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
```

### Code Rollback

Revert the following files to their pre-execution state:

| File | Action |
|------|--------|
| `src/components/layout/TopNavigationBar/components/Notifications.tsx` | Restore static demo data import |
| `src/components/layout/TopNavigationBar/components/ProfileDropdown.tsx` | Restore hardcoded avatar |
| `src/app/(admin)/hooks/useNotifications.ts` | DELETE |
| `src/app/(admin)/hooks/useProfile.ts` | DELETE |
| `src/app/(admin)/pages/account/page.tsx` | DELETE |

---

## Verification

Before rollback, verify:

- [ ] No active user sessions depend on profiles table
- [ ] No unread notifications will be lost (none exist pre-execution)
- [ ] Admin functionality remains intact

---

## Approval Gate

Phase 13.1 execution may proceed only after:

1. ✅ This restore point is created
2. ✅ Phase_13.1_Implementation_Plan.md is complete
3. ⏳ Explicit execution authorization received

**Status:** AWAITING AUTHORIZATION
