# Restore Point: Phase 6 — Contact/Leads Pipeline + Settings Wiring

**Created:** 2025-12-25
**Status:** Active
**Phase:** 6.1 — Stability-First Hotfix

---

## Decision

**Selected Option:** Document and defer (NO architecture change)

**Rationale:** `apps/public` is a separate Vite application and is NOT executed in the Lovable Preview environment. The preview runs the Admin app from `/src`. We will NOT move Contact into `/src` and will NOT restructure architecture for preview limitations.

---

## Scope

### Allowed
- `apps/public` — contact form wiring + footer/settings reads
- Supabase RLS verification (leads INSERT + public settings read)
- Documentation updates

### Forbidden
- Moving Contact page to Admin (`/src`)
- Changing routing architecture
- CSS/markup refactors
- New UI libraries

---

## Root Cause Analysis

### Issue: Contact form shows "success" but Admin Leads remains empty

**Finding:** The RLS policies are correctly configured:
- `leads` table has INSERT policy: `"Public can submit leads"` with `WITH CHECK (true)`
- `settings` table has SELECT policy: `"Public can read settings"` with `QUAL (true)`

**True Root Cause:** The `apps/public` Vite app is NOT deployed in the Lovable Preview. The preview runs only the Admin app at `/src`. Therefore:
1. Contact form submissions from `apps/public` can only be tested in local development or separate deployment
2. The Lovable Preview cannot execute `apps/public` code

### Verification
- Supabase URL in `apps/public/src/lib/supabase.ts`: `hwrlkrrdqbtgyjpsrijh.supabase.co` ✓
- Same as Admin's Supabase project ✓
- RLS allows anonymous INSERT to leads ✓
- Settings have public SELECT policy ✓

---

## Files Changed in This Phase

| File | Action | Purpose |
|------|--------|---------|
| `apps/public/src/hooks/usePublicSettings.ts` | CREATE | Settings fetch hook with fallbacks |
| `apps/public/src/components/common/Footer.tsx` | EDIT | Wire to settings with fallbacks |
| `apps/public/src/components/pages/contact/ContactUsArea.tsx` | EDIT | Wire to settings with fallbacks |
| `docs/Backend.md` | UPDATE | Document leads pipeline + settings wiring |
| `docs/Architecture.md` | UPDATE | Document deployment reality |

---

## Verification Checklist

- [ ] Contact form INSERT uses correct Supabase URL
- [ ] RLS allows anonymous INSERT to leads
- [ ] Settings have public SELECT policy for whitelisted keys
- [ ] Footer displays settings values (with fallback)
- [ ] ContactUsArea displays settings values (with fallback)
- [ ] No console errors
- [ ] No CSS/layout changes

---

## Rollback Instructions

If issues arise, revert the following files to their state before this phase:
1. `apps/public/src/hooks/usePublicSettings.ts` — Delete
2. `apps/public/src/components/common/Footer.tsx` — Restore hardcoded values
3. `apps/public/src/components/pages/contact/ContactUsArea.tsx` — Restore hardcoded values
