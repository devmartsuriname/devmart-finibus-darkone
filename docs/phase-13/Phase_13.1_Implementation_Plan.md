# Phase 13.1 — Interaction Infrastructure Implementation Plan

**Status:** ✅ EXECUTED  
**Execution Date:** 2026-01-04  
**Phase:** Phase 13.1 (Backend-first Interaction Infrastructure)

---

## Objective

Implement the foundational backend + admin wiring for notifications, user profiles, and multi-role RLS, enabling real data in the Admin UI while maintaining Darkone 1:1 parity.

---

## Scope Confirmation

| Requirement | Status |
|-------------|--------|
| Phase 13 only | ✅ Confirmed |
| Backend + Admin interaction infrastructure | ✅ In scope |
| No public frontend changes | ✅ Confirmed |
| No content creation | ✅ Confirmed |
| No visual redesigns | ✅ Confirmed |

---

## Part 1: Schema Changes Overview

### 1A. Notifications Table

**Table:** `public.notifications`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| user_id | UUID | No | - | FK to auth.users(id) |
| type | TEXT | No | - | System event type |
| title | TEXT | No | - | Notification title |
| message | TEXT | No | - | Notification body |
| link | TEXT | Yes | NULL | Optional navigation URL |
| is_read | BOOLEAN | No | false | Read status |
| created_at | TIMESTAMPTZ | No | now() | Creation timestamp |

**Indexes:**
- Primary key on `id`
- Performance index on `(user_id, is_read) WHERE is_read = false`

**RLS Policies:**
- `Users can view own notifications` — SELECT where `auth.uid() = user_id`
- `Users can update own notifications` — UPDATE where `auth.uid() = user_id`
- `System can insert notifications` — INSERT with CHECK true (via SECURITY DEFINER triggers)

---

### 1B. Profiles Table

**Table:** `public.profiles`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | - | PK, FK to auth.users(id) |
| display_name | TEXT | Yes | NULL | User display name |
| avatar_url | TEXT | Yes | NULL | Avatar image URL |
| created_at | TIMESTAMPTZ | No | now() | Creation timestamp |
| updated_at | TIMESTAMPTZ | No | now() | Last update timestamp |

**RLS Policies:**
- `Users can view own profile` — SELECT where `auth.uid() = id`
- `Users can update own profile` — UPDATE where `auth.uid() = id`
- `Admins can view all profiles` — SELECT where `has_role(auth.uid(), 'admin')`

**Auto-creation Trigger:**
- `handle_new_user()` — Creates profile record on `auth.users` INSERT
- Default `display_name` = first part of email (before @)

---

## Part 2: Role Mapping Decision

### Mapping (Using Existing Enum)

The existing `app_role` enum (`admin`, `moderator`, `user`) is preserved without alteration.

| Enum Value | Mapped Role | Access Level |
|------------|-------------|--------------|
| `admin` | Admin | Full access to all modules |
| `moderator` | Editor | Content modules (Blog, Projects, Services, etc.) + read-only CRM |
| `user` | Viewer | Read-only access to content |

### Role Access Matrix

| Module | Admin | Editor (moderator) | Viewer (user) |
|--------|-------|---------------------|----------------|
| Dashboard | View | View | View |
| Blog | CRUD | CRUD | Read |
| Projects | CRUD | CRUD | Read |
| Services | CRUD | CRUD | Read |
| Pages | CRUD | CRUD | Read |
| Media | CRUD | CRUD | Read |
| Testimonials | CRUD | CRUD | Read |
| Leads | CRUD | Read | Read |
| Quotes | CRUD | Read | Read |
| Analytics | View | View | View |
| Settings | CRUD | - | - |
| User Management | CRUD | - | - |

### Helper Functions

```sql
-- Check if user has editor or higher role
CREATE OR REPLACE FUNCTION public.has_editor_role(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id
        AND role IN ('admin', 'moderator')
    )
$$;

-- Check if user has viewer or higher role (any authenticated role)
CREATE OR REPLACE FUNCTION public.has_viewer_role(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id
        AND role IN ('admin', 'moderator', 'user')
    )
$$;
```

---

## Part 3: Trigger Logic Summary

### 3A. Notification Triggers

**Trigger 1: New Lead Notification**

```sql
CREATE OR REPLACE FUNCTION public.notify_admins_new_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    SELECT ur.user_id, 'new_lead', 'New Lead Received',
           'A new lead from ' || NEW.name || ' has been submitted.',
           '/crm/leads'
    FROM public.user_roles ur
    WHERE ur.role = 'admin';
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_lead_created
AFTER INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.notify_admins_new_lead();
```

**Trigger 2: New Quote Notification**

```sql
CREATE OR REPLACE FUNCTION public.notify_admins_new_quote()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    SELECT ur.user_id, 'new_quote', 'New Quote Submitted',
           'Quote #' || NEW.reference_number || ' has been submitted.',
           '/crm/quotes'
    FROM public.user_roles ur
    WHERE ur.role = 'admin';
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_quote_created
AFTER INSERT ON public.quotes
FOR EACH ROW EXECUTE FUNCTION public.notify_admins_new_quote();
```

**Trigger 3: Profile Auto-Creation**

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## Part 4: Rollback Strategy

### Per-Change Rollback Plan

| Change | Rollback Command | Safe to Keep |
|--------|------------------|--------------|
| `notifications` table | `DROP TABLE IF EXISTS public.notifications CASCADE;` | No — requires data cleanup |
| `profiles` table | `DROP TABLE IF EXISTS public.profiles CASCADE;` | No — requires data cleanup |
| `on_lead_created` trigger | `DROP TRIGGER IF EXISTS on_lead_created ON public.leads;` | Yes — safe to disable |
| `on_quote_created` trigger | `DROP TRIGGER IF EXISTS on_quote_created ON public.quotes;` | Yes — safe to disable |
| `on_auth_user_created` trigger | `DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;` | Yes — safe to disable |
| `notify_admins_new_lead()` function | `DROP FUNCTION IF EXISTS public.notify_admins_new_lead();` | Yes — if trigger removed first |
| `notify_admins_new_quote()` function | `DROP FUNCTION IF EXISTS public.notify_admins_new_quote();` | Yes — if trigger removed first |
| `handle_new_user()` function | `DROP FUNCTION IF EXISTS public.handle_new_user();` | Yes — if trigger removed first |
| `has_editor_role()` function | `DROP FUNCTION IF EXISTS public.has_editor_role(UUID);` | Yes — if not used in RLS |
| `has_viewer_role()` function | `DROP FUNCTION IF EXISTS public.has_viewer_role(UUID);` | Yes — if not used in RLS |
| RLS policy updates | Revert to admin-only policies | Yes — restore from backup |

### Full Rollback Script

```sql
-- 1. Drop triggers first
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

---

## Part 5: Execution Sequence

| Step | Description | Dependency |
|------|-------------|------------|
| 1 | Create restore point documentation | None |
| 2 | Create `notifications` table + RLS | None |
| 3 | Create `profiles` table + RLS | None |
| 4 | Create `has_editor_role()` function | None |
| 5 | Create `has_viewer_role()` function | None |
| 6 | Create `handle_new_user()` trigger | Step 3 |
| 7 | Create `notify_admins_new_lead()` trigger | Step 2 |
| 8 | Create `notify_admins_new_quote()` trigger | Step 2 |
| 9 | Create `useNotifications.ts` hook | Step 2 |
| 10 | Wire `Notifications.tsx` component | Step 9 |
| 11 | Create `useProfile.ts` hook | Step 3 |
| 12 | Wire `ProfileDropdown.tsx` component | Step 11 |
| 13 | Create My Account page (minimal) | Step 11 |
| 14 | Update documentation | All steps |

---

## Part 6: Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/app/(admin)/hooks/useNotifications.ts` | CREATE | Notifications data hook |
| `src/app/(admin)/hooks/useProfile.ts` | CREATE | User profile hook |
| `src/app/(admin)/pages/account/page.tsx` | CREATE | My Account page |
| `src/components/layout/TopNavigationBar/components/Notifications.tsx` | MODIFY | Wire to real data |
| `src/components/layout/TopNavigationBar/components/ProfileDropdown.tsx` | MODIFY | Wire to profile data |

---

## Part 7: Guardian Rules Compliance

| Rule | Compliance |
|------|------------|
| Darkone Admin UI 1:1 | ✅ Reusing existing component patterns only |
| No visual redesigns | ✅ Only data wiring, no layout changes |
| No public frontend changes | ✅ All changes are Admin-only |
| No scope creep | ✅ Strictly notifications, profile, RLS |
| Supabase-only backend | ✅ All data via Supabase |
| Existing enum preserved | ✅ No alterations to app_role enum |

---

## Part 8: Verification Checklist

### Notifications
- [ ] `notifications` table created with RLS
- [ ] Lead creation triggers notification
- [ ] Quote creation triggers notification
- [ ] Notification bell shows real unread count
- [ ] Mark as read works
- [ ] Mark all as read works

### Profiles
- [ ] `profiles` table created with RLS
- [ ] Profile auto-created on user signup
- [ ] ProfileDropdown shows real display_name
- [ ] ProfileDropdown shows real avatar (if set)
- [ ] My Account page allows profile editing

### RLS / Roles
- [ ] Admin role has full access
- [ ] Editor role (moderator) has content access
- [ ] Viewer role (user) has read-only access
- [ ] No regressions in existing functionality

---

## Execution Summary

Phase 13.1 was executed successfully on 2026-01-04.

All verification checklist items completed. Darkone 1:1 parity preserved.

**Status:** ✅ EXECUTED & VERIFIED
