# Phase 13E — User & Access Completion

**Status:** 📋 PLANNING ONLY — 13E.1 VERIFICATION COMPLETE  
**Planning Date:** 2026-01-05  
**13E.1 Verification Date:** 2026-01-05

---

## Objective

Complete the User Management module visibility in admin, enable admin-initiated user creation, and verify RLS coverage for all three roles (admin / editor / viewer).

---

## Current Infrastructure (Already Exists)

### Database Tables

| Table | Status | Columns |
|-------|--------|---------|
| `public.user_roles` | ✅ EXISTS | id, user_id, role, created_at |
| `public.profiles` | ✅ EXISTS | id, display_name, avatar_url, created_at, updated_at |

### Enum

| Name | Values | Status |
|------|--------|--------|
| `app_role` | `admin`, `moderator`, `user` | ✅ EXISTS |

### Helper Functions (SECURITY DEFINER)

| Function | Purpose | Status |
|----------|---------|--------|
| `has_role(_user_id, _role)` | Check if user has specific role | ✅ EXISTS |
| `has_editor_role(_user_id)` | Check admin OR moderator | ✅ EXISTS |
| `has_viewer_role(_user_id)` | Check any role (admin/moderator/user) | ✅ EXISTS |

### Triggers

| Trigger | Event | Action | Status |
|---------|-------|--------|--------|
| `on_auth_user_created` | INSERT on `auth.users` | Create profile record | ✅ EXISTS |
| `on_lead_created` | INSERT on `public.leads` | Notify admins | ✅ EXISTS |
| `on_quote_created` | INSERT on `public.quotes` | Notify admins | ✅ EXISTS |

---

## Current Gaps (Analysis)

| Gap | Description |
|-----|-------------|
| No Users page in admin | Admin navigation does not include a Users menu item |
| No user list view | Cannot view registered users from admin |
| No user creation flow | Cannot create users from admin (invite or direct) |
| No role assignment UI | Cannot assign or change roles from admin |
| RLS not fully verified | Editor/Viewer permissions untested with actual accounts |

---

## Role Mapping (Confirmed)

| Enum Value | Display Name | Access Level |
|------------|--------------|--------------|
| `admin` | Admin | Full access to all modules |
| `moderator` | Editor | Content modules + read-only CRM |
| `user` | Viewer | Read-only access |

---

## Proposed Scope (Documentation Only)

### 13E.1 — Admin User List Page (Darkone Pattern)

**Route:** `/settings/users` or `/system/users`

**Components:**
- User list table (Darkone table pattern)
- Columns: Avatar, Display Name, Email, Role, Created At, Status
- Actions: Edit Role, Disable/Enable, Delete
- Must use existing Darkone table components (no custom tables)

**Data Source:**
- Join `auth.users` with `profiles` and `user_roles`
- Requires SECURITY DEFINER function (cannot query `auth.users` directly from client)
- Function: `get_users_with_profiles()` or similar

**Darkone Pattern Reference:**
- Use `ComponentContainerCard` wrapper
- Use existing table component structure
- Match existing CRUD patterns (Blog, Projects, etc.)

### 13E.2 — User Creation Flow

**Option A: Invite-based (Recommended)**
- Admin enters email → Supabase sends invite → User sets password
- Requires Supabase Auth Admin API (Edge Function with `service_role` key)
- More secure: user controls their own password

**Option B: Direct creation**
- Admin enters email + password → User created immediately
- Requires Supabase Auth Admin API (Edge Function with `service_role` key)
- Less secure: admin knows initial password

**Recommendation:** Option A (invite-based) for security best practices

**Edge Function Required:**
- Name: `create-user` (or `invite-user`)
- Inputs: email, role
- Outputs: success/error, user_id
- Authentication: Admin-only (verify role in function)

### 13E.3 — Role Assignment UI

**Location:** User list page actions or User detail modal

**Requirements:**
- Dropdown with 3 roles: Admin, Editor, Viewer
- Updates `user_roles` table on save
- Only admins can assign roles (RLS enforced)
- Confirm before role change (Darkone modal pattern)

**RLS for user_roles:**
```sql
-- Only admins can INSERT/UPDATE/DELETE roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

### 13E.1 — RLS Verification (✅ COMPLETE)

**Verification Date:** 2026-01-05  
**Status:** ✅ COMPLETE (Verification-Only)

#### Verification Results

| Metric | Result |
|--------|--------|
| Tables with RLS enabled | 24/24 (100%) |
| Total policies verified | 86+ |
| Helper functions verified | 3 |
| Supabase linter | PASSED |
| Blocking defects | 0 |

#### Key Finding: Editor/Viewer Access Gap

**CRITICAL DOCUMENTATION:**

The helper functions `has_editor_role()` and `has_viewer_role()` exist but are **NOT USED** in any RLS policies:

- **Moderator role (Editor):** Currently has **NO CMS editing access** — admin-only CRUD
- **User role (Viewer):** Currently has **NO content access** beyond own profile/notifications

This is a **documented gap for a future phase**, NOT a blocking defect.

#### Verified RLS Matrix (Current State)

**Admin Role (`admin`):**

| Table Category | SELECT | INSERT | UPDATE | DELETE |
|----------------|--------|--------|--------|--------|
| Content (blog, projects, services, pages) | ✅ | ✅ | ✅ | ✅ |
| CRM (leads, quotes) | ✅ | ✅ | ✅ | ✅ |
| System (settings, user_roles) | ✅ | ✅ | ✅ | ✅ |
| Media | ✅ | ✅ | ✅ | ✅ |
| Own data (profiles, notifications) | ✅ | ✅ | ✅ | N/A |

**Editor Role (`moderator`) — NOT IMPLEMENTED:**

| Table Category | SELECT | INSERT | UPDATE | DELETE |
|----------------|--------|--------|--------|--------|
| Content | ❌ | ❌ | ❌ | ❌ |
| CRM | ❌ | ❌ | ❌ | ❌ |
| System | ❌ | ❌ | ❌ | ❌ |
| Own data | ✅ | ✅ | ✅ | N/A |

**Viewer Role (`user`) — NOT IMPLEMENTED:**

| Table Category | SELECT | INSERT | UPDATE | DELETE |
|----------------|--------|--------|--------|--------|
| Content | ❌ | ❌ | ❌ | ❌ |
| CRM | ❌ | ❌ | ❌ | ❌ |
| System | ❌ | ❌ | ❌ | ❌ |
| Own data | ✅ | ❌ | ✅ | N/A |

**Public (unauthenticated):**

| Table | SELECT | INSERT |
|-------|--------|--------|
| Published content | ✅ | ❌ |
| Leads/Quotes | ❌ | ✅ |
| Settings | ✅ (read-only) | ❌ |

#### Restore Point

See: `docs/restore-points/Restore_Point_Phase_13E_1_RLS_Verification.md`

---

### 13E.2 — User List Page (PLANNING ONLY)

**Status:** ⏳ NOT AUTHORIZED

---

## Admin Navigation Update (Proposed)

**File:** `src/assets/data/menu-items.ts`

**Location:** Under SYSTEM section or new USERS section

```typescript
{
  key: 'users',
  label: 'Users',
  icon: 'mingcute:user-setting-line',
  url: '/settings/users',
},
```

---

## Guardian Rules Compliance

| Rule | Requirement |
|------|-------------|
| Admin UI 1:1 Darkone | Use existing table/modal/form patterns only |
| Public UI 1:1 Finibus | No public frontend changes in this phase |
| No new dependencies | Supabase Edge Functions only |
| Existing schema preserved | No alterations to `app_role` enum |
| No redesigns | Match existing CRUD module patterns |

---

## Execution Sub-Phases (Proposed)

| Sub-Phase | Description | Dependencies |
|-----------|-------------|--------------|
| 13E.1 | User list page (read-only) | SECURITY DEFINER function for auth.users |
| 13E.2 | User creation (invite flow) | Edge Function with service_role |
| 13E.3 | Role assignment UI | 13E.1 complete |
| 13E.4 | RLS verification | Test accounts for each role |

---

## Out of Scope

| Item | Reason |
|------|--------|
| Password reset UI | Use Supabase default flow |
| User profile editing by admin | Use existing My Account page |
| Granular permissions | Beyond role-based access |
| External auth providers (Google, GitHub) | Not authorized |
| Public signup flow | Not authorized |
| Email/password requirements | Use Supabase defaults |
| Two-factor authentication | Future phase |

---

## Execution Gates

| Gate | Description | Status |
|------|-------------|--------|
| Gate 13E.0 | Planning approved | ✅ COMPLETE |
| Gate 13E.1 | RLS Verification (docs only) | ✅ COMPLETE — 2026-01-05 |
| Gate 13E.2 | User List Page authorized | ⏳ PENDING |
| Gate 13E.3 | User Creation Flow authorized | ⏳ PENDING |
| Gate 13E.4 | Role Assignment UI authorized | ⏳ PENDING |
| Gate 13E.5 | Editor/Viewer RLS Implementation authorized | ⏳ PENDING |
| Gate 13E.6 | Phase 13E verification complete | ⏳ PENDING |

---

## HARD STOP

**Phase 13E is PLANNING ONLY.**

No execution authorized without explicit sub-phase approval.

Do NOT:
- Create user list page
- Create Edge Functions
- Modify RLS policies
- Add navigation items
- Create test accounts

Await further instructions.
