# Restore Point — Phase 5.5 Blog Parity Hotfix

```
Created: 2025-12-24
Phase: 5.5 Blog Public Wiring — Parity Hotfix
Status: Pre-Hotfix Snapshot
```

---

## Scope

This restore point captures the state before applying the Blog Parity Hotfix for Phase 5.5.

### Changes Included in This Hotfix

1. **BlogDetailsWrapper.tsx** — Ensure template quote block and banner sections always render for demo parity
2. **Seed Data Backfill** — Update blog posts to use Finibus-style lorem ipsum content
3. **Title Binding Verification** — Confirm dynamic title updates per slug
4. **Documentation Updates** — Backend.md and Architecture.md

### Exclusions

- ❌ No CSS changes in apps/public
- ❌ No markup structure refactors
- ❌ No new UI libraries or icon packs
- ❌ No schema expansion
- ❌ No pagination logic
- ❌ No comments submission logic
- ❌ No analytics

---

## Affected Files

| File | Action |
|------|--------|
| `apps/public/src/components/pages/blogDetails/BlogDetailsWrapper.tsx` | EDIT (always render template sections) |
| Supabase migration (seed content backfill) | CREATE |
| `docs/Backend.md` | UPDATE |
| `docs/Architecture.md` | UPDATE |

---

## Rollback Strategy

If hotfix causes issues:

1. Revert `BlogDetailsWrapper.tsx` to conditional rendering only
2. Revert seed data via SQL UPDATE statements
3. Verify public blog pages still render

---

## Pre-Hotfix State Summary

### BlogDetailsWrapper.tsx (lines 66-125)

- Current behavior: If `content` prop is provided, renders via `dangerouslySetInnerHTML`; otherwise shows template fallback
- Issue: Template quote block (`.blog-quate`) and visual structure lost when DB content is rendered

### Blog Posts (DB State)

| Slug | Title | Status | Has Content |
|------|-------|--------|-------------|
| future-of-digital-business-strategy | The Future of Digital Business Strategy | published | ✅ |
| building-scalable-web-applications-2025 | Building Scalable Web Applications in 2025 | published | ✅ |
| (others) | ... | various | ✅ |

### useBlogDetails Hook

- Correctly filters by `status = 'published'`
- Correctly refetches when `slug` changes (via `useEffect` dependency)

---

## Parity Requirements

The Finibus Blog Details demo includes these fixed visual sections that must always appear:

1. **Featured Image** — Full-width post thumbnail
2. **Post Title + Author + Date** — Header section
3. **Body Content** — Paragraphs (can be dynamic)
4. **Quote Block** — `.blog-quate` with red border and icons
5. **Blog Banner** — Image + text side-by-side section
6. **Tags + Social Share** — Bottom of post

If DB content is missing the quote structure, the template wrapper must render it as a fallback.

---

## Guardian Rules (Confirmed)

- ✅ apps/public: Data binding only, no CSS/markup changes
- ✅ No new UI libraries
- ✅ No schema expansion
- ✅ Finibus demo parity 1:1

---

## Document Control

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2025-12-24 | Initial restore point before parity hotfix |
