# Restore Point — Phase 13E.2 Pre-Execution

**Created:** 2026-01-05  
**Phase:** 13E.2 — User List Page (Admin Only)  
**Status:** PRE-EXECUTION SNAPSHOT

---

## Execution Scope

### What Will Be Created

| Type | Path/Name |
|------|-----------|
| DB Function | `public.get_admin_user_list()` |
| Page | `src/app/(admin)/system/users/page.tsx` |
| Hook | `src/app/(admin)/system/users/hooks/useUsers.ts` |
| Component | `src/app/(admin)/system/users/components/UserRoleModal.tsx` |
| Component | `src/app/(admin)/system/users/components/DeleteUserModal.tsx` |

### What Will Be Modified

| File | Change |
|------|--------|
| `src/routes/index.tsx` | Add `/system/users` route |
| `src/assets/data/menu-items.ts` | Add Users nav item |
| `docs/Tasks.md` | Add 13E.2 execution entry |
| `docs/backend.md` | Add 13E.2 section |
| `docs/Architecture.md` | Add 13E.2 architecture notes |
| `docs/phase-13/Phase_13E_User_Access_Planning.md` | Update 13E.2 status |

---

## Pre-Execution State

### Database Functions

**Existing helper functions:**
- `has_role(_user_id, _role)` — Check specific role
- `has_editor_role(_user_id)` — Check admin OR moderator
- `has_viewer_role(_user_id)` — Check any authenticated role

**No `get_admin_user_list()` exists.**

### Navigation

**Current SYSTEM section in menu-items.ts:**
```typescript
{
  key: 'system-title',
  label: 'SYSTEM',
  isTitle: true,
},
{
  key: 'settings',
  label: 'Settings',
  icon: 'mingcute:settings-3-line',
  url: '/settings',
}
```

**No `/system/users` route exists.**

---

## Rollback Procedure

If Phase 13E.2 execution fails or needs to be reverted:

### 1. Delete Created Files

```bash
rm -rf src/app/(admin)/system/users/
```

### 2. Remove Route from index.tsx

Remove the lazy import and route entry for `/system/users`.

### 3. Remove Navigation Item from menu-items.ts

Remove the Users menu item from SYSTEM section.

### 4. Drop Database Function

```sql
DROP FUNCTION IF EXISTS public.get_admin_user_list();
```

### 5. Revert Documentation

Restore `docs/Tasks.md`, `docs/backend.md`, `docs/Architecture.md`, and `docs/phase-13/Phase_13E_User_Access_Planning.md` to their pre-execution state.

---

## Guardian Rules Compliance

| Rule | Requirement |
|------|-------------|
| Admin UI 1:1 Darkone | ✅ Use existing table/modal patterns (Testimonials/Leads) |
| Public UI 1:1 Finibus | ✅ No public frontend changes |
| No new dependencies | ✅ Supabase RPC only |
| Existing schema preserved | ✅ No alterations to app_role enum |

---

## Verification Checklist (Post-Execution)

- [ ] `/system/users` route accessible (admin only)
- [ ] Users table displays correctly
- [ ] Role badges render correctly
- [ ] Edit role modal opens
- [ ] Role update persists
- [ ] Delete modal confirms action
- [ ] Non-admin users denied access
- [ ] Navigation shows Users menu item

---

## Phase Dependencies

| Dependency | Status |
|------------|--------|
| 13E.1 RLS Verification | ✅ COMPLETE |
| user_roles table | ✅ EXISTS |
| profiles table | ✅ EXISTS |
| has_role function | ✅ EXISTS |

---

## Exit Criteria

Phase 13E.2 is complete when:
1. Admin can view list of all users
2. Admin can edit user roles
3. Admin can delete users (cascade handled by FK)
4. Non-admins cannot access the page
5. All documentation updated
