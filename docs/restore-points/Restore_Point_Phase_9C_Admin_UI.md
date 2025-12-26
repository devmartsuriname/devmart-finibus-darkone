# Restore Point: Phase 9C — Admin UI (About Page + Global Blocks)

**Created:** 2025-12-26  
**Phase:** 9C — Admin UI  
**Status:** Pre-Execution Snapshot  

---

## Purpose

This restore point captures the admin codebase state before Phase 9C implementation, enabling rollback if needed.

---

## Pre-Execution State

### Database Tables (Phase 9B Complete)
- `page_settings` — EXISTS, 1 row (page_slug = 'about')
- `global_blocks` — EXISTS, 2 rows (cta_strip, why_choose_us)
- `homepage_settings` — EXISTS, LOCKED, Phase 8 complete

### Admin Files to be Modified
- `src/app/(admin)/content/pages/components/PageEditModal.tsx` — Add About page tabs

### Admin Files to be Created
- `src/app/(admin)/content/pages/hooks/useAboutPageBlocks.ts`
- `src/app/(admin)/content/pages/components/AboutPageSectionsTab.tsx`
- `src/app/(admin)/content/pages/components/AboutPageSectionEditModal.tsx`
- `src/app/(admin)/content/global-blocks/page.tsx`
- `src/app/(admin)/content/global-blocks/hooks/useGlobalBlocks.ts`
- `src/app/(admin)/content/global-blocks/components/GlobalBlockEditModal.tsx`

### Routes to be Added
- `/content/global-blocks` — Global Blocks management page

---

## Phase 9C Scope

### Will Implement
1. **About Page Admin UI**
   - Extend PageEditModal for About page (slug = 'about')
   - Add "Sections" tab with Inside Story + Latest News editors
   - Add "SEO" tab (reuse existing pattern)
   - Read-only display for shared blocks (Why Choose Us, CTA)

2. **Global Blocks Admin UI**
   - New admin page at `/content/global-blocks`
   - Card-based list of global blocks
   - Edit modal for each block (CTA Strip, Why Choose Us)

### Will NOT Touch
- `homepage_settings` table
- Any frontend code (`apps/public`)
- Any CSS/SCSS files
- Finibus templates

---

## Rollback Instructions

If rollback is needed:

1. Delete new files:
```bash
rm src/app/(admin)/content/pages/hooks/useAboutPageBlocks.ts
rm src/app/(admin)/content/pages/components/AboutPageSectionsTab.tsx
rm src/app/(admin)/content/pages/components/AboutPageSectionEditModal.tsx
rm -rf src/app/(admin)/content/global-blocks/
```

2. Revert `PageEditModal.tsx` to Phase 8 state (Homepage-only tabs)

3. Remove Global Blocks route from `src/routes/index.tsx`

---

## Guardian Rules Verified

| Rule | Status |
|------|--------|
| `homepage_settings` untouched | ✅ Not in scope |
| No frontend code changes | ✅ Admin only |
| No CSS/SCSS changes | ✅ Using existing patterns |
| 1:1 Darkone patterns | ✅ Reusing existing modal/tab components |

---

## Execution Authorization

- Phase 9A: ✅ COMPLETE
- Phase 9B: ✅ COMPLETE  
- Phase 9C: ⏳ AUTHORIZED — Awaiting execution
