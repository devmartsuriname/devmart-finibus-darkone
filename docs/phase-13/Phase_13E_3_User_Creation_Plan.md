# Phase 13E.3 — User Creation Flow (PLANNING ONLY)

**Status:** 📋 PLANNING ONLY — NOT AUTHORIZED FOR EXECUTION  
**Created:** 2026-01-05  
**Phase:** 13E — User & Access Completion

---

## ⚠️ AUTHORIZATION STATUS

**THIS DOCUMENT IS FOR PLANNING PURPOSES ONLY.**

Execution of Phase 13E.3 is NOT AUTHORIZED. This plan documents the proposed approach for future reference when authorization is granted.

---

## Objective

Enable admin-initiated user creation via an invite-based flow using Supabase Edge Functions with `service_role` key.

---

## Recommended Approach: Invite-Based Flow

### Flow Overview

```
Admin                     Edge Function                  Supabase Auth              User
  |                            |                              |                      |
  |--[Enter email + role]----->|                              |                      |
  |                            |--[Verify admin role]-------->|                      |
  |                            |<-[Confirmed]--------------------|                   |
  |                            |--[Create invite]------------->|                      |
  |                            |                              |--[Send invite email]->|
  |                            |<-[User ID]-------------------|                      |
  |                            |--[Insert user_roles]-------->|                      |
  |<-[Success]-----------------|                              |                      |
  |                            |                              |                      |
  |                            |                              |  [User clicks link]  |
  |                            |                              |<-[Sets password]-----|
  |                            |                              |--[Account active]--->|
```

### Why Invite-Based

| Aspect | Invite-Based | Direct Creation |
|--------|--------------|-----------------|
| Password security | ✅ User sets own password | ❌ Admin knows initial password |
| User verification | ✅ Email confirmed | ⚠️ Email may be invalid |
| Supabase best practice | ✅ Recommended | ⚠️ Not recommended |
| User experience | ✅ Standard onboarding | ❌ Forced password reset |

---

## Proposed Edge Function

### Function Name

`invite-user`

### Location

`supabase/functions/invite-user/index.ts`

### Inputs

```typescript
interface InviteUserRequest {
  email: string;
  role: 'admin' | 'moderator' | 'user';
}
```

### Outputs

```typescript
interface InviteUserResponse {
  success: boolean;
  user_id?: string;
  error?: string;
}
```

### Implementation Outline (NOT AUTHORIZED)

```typescript
// supabase/functions/invite-user/index.ts

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  // 1. Verify request method
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // 2. Get caller's JWT and verify admin role
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
  if (authError || !user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 3. Check admin role
  const { data: roleData } = await supabaseAdmin
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .single();

  if (!roleData) {
    return new Response('Forbidden: Admin role required', { status: 403 });
  }

  // 4. Parse request body
  const { email, role } = await req.json();

  // 5. Validate inputs
  if (!email || !role) {
    return new Response('Bad request: email and role required', { status: 400 });
  }

  if (!['admin', 'moderator', 'user'].includes(role)) {
    return new Response('Bad request: invalid role', { status: 400 });
  }

  // 6. Create invite using Admin API
  const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);

  if (inviteError) {
    return new Response(JSON.stringify({ success: false, error: inviteError.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    });
  }

  // 7. Assign role to new user
  const { error: roleError } = await supabaseAdmin
    .from('user_roles')
    .insert({ user_id: inviteData.user.id, role });

  if (roleError) {
    return new Response(JSON.stringify({ success: false, error: roleError.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }

  // 8. Return success
  return new Response(JSON.stringify({ 
    success: true, 
    user_id: inviteData.user.id 
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
});
```

---

## Security Considerations

### 1. Service Role Key Protection

| Requirement | Implementation |
|-------------|----------------|
| Key storage | Supabase Secrets (never in code) |
| Access | Edge Functions only |
| Exposure | Never sent to client |

### 2. Admin Verification

| Check | Location |
|-------|----------|
| JWT validation | Edge Function |
| Role verification | Query `user_roles` table |
| Rate limiting | Supabase Edge Functions built-in |

### 3. Email Validation

| Check | Implementation |
|-------|----------------|
| Format validation | Basic regex in Edge Function |
| Duplicate check | Supabase Auth handles this |
| Domain restrictions | Optional — not implemented initially |

---

## Admin UI Requirements (Proposed)

### Invite User Modal

**Trigger:** "Invite User" button on `/system/users` page

**Fields:**
- Email (required, validated)
- Role (dropdown: Admin, Editor, Viewer)

**Actions:**
- Cancel → Close modal
- Invite → Call Edge Function → Show success/error toast

### User List Updates

After successful invite:
- Refresh user list
- New user appears with "Pending" status (until they accept invite)

---

## Files to Create (When Authorized)

| File | Purpose |
|------|---------|
| `supabase/functions/invite-user/index.ts` | Edge Function |
| `src/app/(admin)/system/users/components/InviteUserModal.tsx` | Invite UI |

### Files to Modify (When Authorized)

| File | Change |
|------|--------|
| `src/app/(admin)/system/users/page.tsx` | Add Invite User button |
| `src/app/(admin)/system/users/hooks/useUsers.ts` | Add inviteUser function |

---

## Explicit Scope Exclusions

| Item | Reason |
|------|--------|
| Password creation by admin | Security — user should set own password |
| Public signup flow | Not authorized |
| OAuth providers (Google, GitHub) | Not authorized |
| Email template customization | Use Supabase defaults |
| Two-factor authentication | Future phase |
| Bulk user import | Not authorized |
| User deactivation (soft delete) | Use existing delete flow |

---

## Dependencies

| Dependency | Status |
|------------|--------|
| Supabase Cloud integration | ✅ Already connected |
| Edge Functions enabled | ✅ Already available |
| Service role key | ⏳ Requires Lovable Cloud secrets |
| LOVABLE_API_KEY | ⏳ May need to enable AI Gateway |

---

## Execution Gates (When Authorized)

| Gate | Description |
|------|-------------|
| 13E.3.0 | Authorization granted |
| 13E.3.1 | Service role key configured |
| 13E.3.2 | Edge Function created and deployed |
| 13E.3.3 | Admin UI modal implemented |
| 13E.3.4 | End-to-end testing complete |
| 13E.3.5 | Documentation updated |

---

## HARD STOP

**This document is for PLANNING ONLY.**

Do NOT:
- Create Edge Functions
- Add service role key
- Modify Admin UI for invite flow
- Create user accounts

Await explicit authorization before proceeding.
