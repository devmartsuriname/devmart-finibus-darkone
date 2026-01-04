# Phase 13.2 — Stabilization & Verification Plan

**Status:** 📋 PLANNING ONLY — NOT AUTHORIZED FOR EXECUTION  
**Created:** 2026-01-04  
**Predecessor:** Phase 13.1 (CLOSED)

---

## Objective

Verify all Phase 13.1 implementations are functioning correctly in a production-like environment before proceeding with additional Phase 13 work.

---

## Verification Scope

This phase covers verification ONLY — no new features, no code changes, no migrations.

---

## Verification Checklist

### 1. Notification Flow Verification

#### 1.1 Lead Trigger Verification
| Check | Expected Result | Status |
|-------|-----------------|--------|
| Create new lead via Contact Form | Notification created for all admin users | ⬜ NOT TESTED |
| Notification appears in bell dropdown | Shows "New Lead Received" with lead name | ⬜ NOT TESTED |
| Notification link navigates to `/crm/leads` | Correct navigation | ⬜ NOT TESTED |
| Unread count increments | Badge shows +1 | ⬜ NOT TESTED |

#### 1.2 Quote Trigger Verification
| Check | Expected Result | Status |
|-------|-----------------|--------|
| Create new quote via Quote Wizard | Notification created for all admin users | ⬜ NOT TESTED |
| Notification appears in bell dropdown | Shows "New Quote Submitted" with reference | ⬜ NOT TESTED |
| Notification link navigates to `/crm/quotes` | Correct navigation | ⬜ NOT TESTED |
| Unread count increments | Badge shows +1 | ⬜ NOT TESTED |

#### 1.3 Notification Actions Verification
| Check | Expected Result | Status |
|-------|-----------------|--------|
| Click notification → mark as read | `is_read` becomes true, badge decrements | ⬜ NOT TESTED |
| Click "Clear All" | All notifications marked as read | ⬜ NOT TESTED |
| View All Notifications page loads | `/notifications` shows full list | ⬜ NOT TESTED |
| Empty state displays correctly | Shows message when no notifications | ⬜ NOT TESTED |

---

### 2. Profile Creation & Update Verification

#### 2.1 Auto-Creation Trigger
| Check | Expected Result | Status |
|-------|-----------------|--------|
| Create new user account | Profile record auto-created in `profiles` table | ⬜ NOT TESTED |
| Profile `display_name` defaults correctly | Uses email prefix or metadata | ⬜ NOT TESTED |
| Profile `id` matches `auth.users.id` | UUID matches | ⬜ NOT TESTED |

#### 2.2 Profile Display
| Check | Expected Result | Status |
|-------|-----------------|--------|
| ProfileDropdown shows real name | Displays `display_name` from DB | ⬜ NOT TESTED |
| ProfileDropdown shows avatar | Displays `avatar_url` or fallback | ⬜ NOT TESTED |
| Name fallback works | Shows email prefix if no display_name | ⬜ NOT TESTED |

#### 2.3 Profile Editing
| Check | Expected Result | Status |
|-------|-----------------|--------|
| My Account page loads | `/account` renders correctly | ⬜ NOT TESTED |
| Can edit display_name | Field is editable | ⬜ NOT TESTED |
| Save updates profile | DB record updated | ⬜ NOT TESTED |
| Updated name reflects in dropdown | ProfileDropdown shows new name | ⬜ NOT TESTED |

---

### 3. RLS Sanity Checks

#### 3.1 Notifications RLS
| Check | Expected Result | Status |
|-------|-----------------|--------|
| User can only view own notifications | SELECT returns only user's rows | ⬜ NOT TESTED |
| User can only update own notifications | UPDATE blocked for other users' rows | ⬜ NOT TESTED |
| WITH CHECK enforced on UPDATE | Cannot change user_id via update | ⬜ NOT TESTED |

#### 3.2 Profiles RLS
| Check | Expected Result | Status |
|-------|-----------------|--------|
| User can view own profile | SELECT returns own profile | ⬜ NOT TESTED |
| User can update own profile | UPDATE works for own profile | ⬜ NOT TESTED |
| User cannot update other profiles | UPDATE blocked for other users | ⬜ NOT TESTED |
| Admin can view all profiles | Admin SELECT returns all rows | ⬜ NOT TESTED |

#### 3.3 Role-Based Access (Admin / Editor / Viewer)
| Check | Expected Result | Status |
|-------|-----------------|--------|
| Admin has full access | All modules accessible | ⬜ NOT TESTED |
| Editor (moderator) has content access | Content modules + read-only CRM | ⬜ NOT TESTED |
| Viewer (user) has read-only access | No write operations allowed | ⬜ NOT TESTED |
| `has_editor_role()` function works | Returns true for admin/moderator | ⬜ NOT TESTED |
| `has_viewer_role()` function works | Returns true for any role | ⬜ NOT TESTED |

---

### 4. Regression Checks — Existing Admin Modules

#### 4.1 Services Module
| Check | Expected Result | Status |
|-------|-----------------|--------|
| List services | Table renders correctly | ⬜ NOT TESTED |
| Create service | INSERT works | ⬜ NOT TESTED |
| Edit service | UPDATE works | ⬜ NOT TESTED |
| Delete service | DELETE works | ⬜ NOT TESTED |

#### 4.2 Projects Module
| Check | Expected Result | Status |
|-------|-----------------|--------|
| List projects | Table renders correctly | ⬜ NOT TESTED |
| Create project | INSERT works | ⬜ NOT TESTED |
| Edit project | UPDATE works | ⬜ NOT TESTED |
| Delete project | DELETE works | ⬜ NOT TESTED |

#### 4.3 Blog Module
| Check | Expected Result | Status |
|-------|-----------------|--------|
| List posts | Table renders correctly | ⬜ NOT TESTED |
| Create post | INSERT works | ⬜ NOT TESTED |
| Edit post | UPDATE works | ⬜ NOT TESTED |
| Delete post | DELETE works | ⬜ NOT TESTED |

#### 4.4 Leads Module
| Check | Expected Result | Status |
|-------|-----------------|--------|
| List leads | Table renders correctly | ⬜ NOT TESTED |
| View lead detail | Modal opens with correct data | ⬜ NOT TESTED |
| Update lead status | UPDATE works | ⬜ NOT TESTED |

#### 4.5 Quotes Module
| Check | Expected Result | Status |
|-------|-----------------|--------|
| List quotes | Table renders correctly | ⬜ NOT TESTED |
| View quote detail | Modal opens with correct data | ⬜ NOT TESTED |
| Update quote status | UPDATE works | ⬜ NOT TESTED |

#### 4.6 Pages Module
| Check | Expected Result | Status |
|-------|-----------------|--------|
| List pages | Table renders correctly | ⬜ NOT TESTED |
| Edit page SEO | UPDATE works | ⬜ NOT TESTED |

#### 4.7 Testimonials Module
| Check | Expected Result | Status |
|-------|-----------------|--------|
| List testimonials | Table renders correctly | ⬜ NOT TESTED |
| Create testimonial | INSERT works | ⬜ NOT TESTED |
| Edit testimonial | UPDATE works | ⬜ NOT TESTED |
| Delete testimonial | DELETE works | ⬜ NOT TESTED |

#### 4.8 Settings Module
| Check | Expected Result | Status |
|-------|-----------------|--------|
| Load settings | All settings display | ⬜ NOT TESTED |
| Update setting | UPDATE works | ⬜ NOT TESTED |

---

## Verification SQL Snippets

### Check Notifications Trigger Execution
```sql
-- Verify notifications exist for admins after lead creation
SELECT n.*, p.display_name 
FROM public.notifications n
JOIN public.profiles p ON n.user_id = p.id
WHERE n.type = 'new_lead'
ORDER BY n.created_at DESC
LIMIT 5;
```

### Check Profile Auto-Creation
```sql
-- Verify all auth users have profiles
SELECT 
    au.id as auth_id,
    au.email,
    p.id as profile_id,
    p.display_name
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;
-- Expected: 0 rows (all users have profiles)
```

### Check Unread Notification Count
```sql
-- Count unread notifications per user
SELECT 
    p.display_name,
    COUNT(*) FILTER (WHERE n.is_read = false) as unread_count,
    COUNT(*) as total_count
FROM public.notifications n
JOIN public.profiles p ON n.user_id = p.id
GROUP BY p.display_name;
```

### Verify RLS Policies Exist
```sql
-- List RLS policies for notifications
SELECT schemaname, tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'notifications';

-- List RLS policies for profiles
SELECT schemaname, tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'profiles';
```

### Verify Helper Functions Exist
```sql
-- Check functions exist
SELECT proname, prosrc
FROM pg_proc
WHERE proname IN ('has_role', 'has_editor_role', 'has_viewer_role', 'handle_new_user', 'notify_admins_new_lead', 'notify_admins_new_quote');
```

---

## Rollback Reference

**Restore Point:** `docs/restore-points/Restore_Point_Phase_13.1_Pre_Execution.md`

Rollback commands are documented and ready if verification reveals critical issues.

---

## Execution Authorization

**Status:** ❌ NOT AUTHORIZED

This verification plan requires explicit authorization before any testing can begin.

---

## Hard Stops

- ❌ No new features
- ❌ No additional tables
- ❌ No UI changes
- ❌ No public frontend changes
- ❌ No Phase 14 work
- ❌ No code modifications during verification

---

## Post-Verification Actions (If Authorized)

Upon successful verification:
1. Mark all checklist items as ✅ PASSED
2. Update docs/Tasks.md with Phase 13.2 COMPLETE status
3. Update docs/Architecture.md with verification results
4. Await authorization for next Phase 13 sub-phase (13B, 13D, or closure)

Upon failed verification:
1. Document specific failures
2. Create targeted fix plan (requires separate authorization)
3. Re-execute verification after fixes

---

## Document Control

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-01-04 | Initial verification plan created |
