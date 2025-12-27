# Restore Point: Stability - Public Links + Admin Modals

**Created:** 2025-12-27  
**Phase:** Stability & Reliability  
**Status:** Implementation Complete — Public PASS Verified

---

## Purpose

Capture state before stability fixes for:
1. Public app navigation wiring (header/footer dead links)
2. Admin hooks notification stability pattern

---

## Known Issues to Fix

### Public App (apps/public/)

| Issue | File | Line | Current | Fix |
|-------|------|------|---------|-----|
| Dead route | Header.tsx | 223 | `/blog-details` | → `/blog` |
| Placeholder link | Footer.tsx | 213 | `#` | → `/commingsoon` |
| Placeholder link | Footer.tsx | 218 | `#` | → `/commingsoon` |
| Placeholder link | Footer.tsx | 223 | `#` | → `/commingsoon` |
| Placeholder link | Footer.tsx | 228 | `#` | → `/commingsoon` |

**Route Verification:**
- `/blog` → Exists (BlogPage)
- `/commingsoon` → Exists (CommingSoonPage) — note: double 'm' spelling per original Finibus template

### Admin App (src/)

| Issue | File | Description |
|-------|------|-------------|
| Missing useRef pattern | useMediaLibrary.ts | notifySuccess/notifyError called directly, may cause stale closures |
| Unstable dependencies | useGlobalBlocks.ts | notifyError in line 85 deps, notifySuccess/notifyError in line 121 deps |

---

## Acceptance Criteria

- All header/footer links resolve to valid routes
- No console errors/warnings (application-owned)
- Admin modals open/close/save correctly with stable typing
- Tests pass in both Lovable Preview and Local Incognito

---

## Files to Modify

1. `apps/public/src/components/common/Header.tsx`
2. `apps/public/src/components/common/Footer.tsx`
3. `src/app/(admin)/content/media/hooks/useMediaLibrary.ts`
4. `src/app/(admin)/content/global-blocks/hooks/useGlobalBlocks.ts`

---

## Rollback Instructions

If issues arise, revert these 4 files to their state before this restore point was created.

---

## Guardian Rules Compliance

- ✅ No new features
- ✅ No UI redesign/branding
- ✅ No CSS/SCSS changes
- ✅ No layout refactors
- ✅ Wiring/stability fixes only
- ✅ Finibus template preserved
