# Restore Point — Phase 5.5 Blog Title + Route Hotfix

```
Status: CREATED
Date: 2025-12-24
Phase: Phase 5.5 Blog Parity Hotfix
Type: Routing + Data Binding Fix
```

---

## 1. Scope of Changes

### 1.1 Work Item A: Dynamic Title per Slug (REQUIRED)

| File | Change |
|------|--------|
| `apps/public/src/components/pages/blogDetails/BlogDetailsPage.tsx` | Breadcrumb uses `post?.title \|\| "Blog Details"` |

### 1.2 Work Item B: Route Structure Change (APPROVED)

| File | Change |
|------|--------|
| `apps/public/src/App.tsx` | Route changed from `/blog-details/:slug` to `/blog/:slug` |
| `apps/public/src/components/pages/blog/BlogCart.tsx` | Links updated to `/blog/:slug` |
| `apps/public/src/components/pages/blog/NewsPost.tsx` | Links updated (static demo posts) |
| `apps/public/src/components/pages/blogStandard/StandardNewsList.tsx` | Links updated (static demo posts) |
| `apps/public/src/components/pages/Home/NewsLatterArea.tsx` | Links updated (static demo posts) |

### 1.3 Back-Compat Strategy

**Option Applied:** Option 2 — Old route removed entirely (user approved)

No redirect alias for `/blog-details/:slug`.

---

## 2. Guardian Compliance

- ✅ apps/public only (admin untouched)
- ✅ No CSS changes
- ✅ No markup structure changes
- ✅ No new UI libraries
- ✅ Data binding + routing only
- ✅ Finibus template structure preserved

---

## 3. Verification Checklist

| Check | Expected | Status |
|-------|----------|--------|
| `/blog` listing page | Cards render, links point to `/blog/:slug` | ⏳ |
| `/blog/:slug` route | Page loads, title in breadcrumb is dynamic | ⏳ |
| Navigate between 2 slugs | Title updates without refresh | ⏳ |
| Home page blog links | Point to `/blog/:slug` | ⏳ |
| Blog Standard links | Point to `/blog/:slug` | ⏳ |
| Sidebar NewsPost links | Point to `/blog/:slug` (static) | ⏳ |
| No console errors | Clean | ⏳ |

---

## 4. Rollback Procedure

If issues arise:

1. Restore route in `App.tsx` to `/blog-details/:slug`
2. Restore links in all affected components
3. Revert breadcrumb to static `"Blog Details"`

---

## 5. Files Changed Summary

```
apps/public/src/App.tsx
apps/public/src/components/pages/blogDetails/BlogDetailsPage.tsx
apps/public/src/components/pages/blog/BlogCart.tsx
apps/public/src/components/pages/blog/NewsPost.tsx
apps/public/src/components/pages/blogStandard/StandardNewsList.tsx
apps/public/src/components/pages/Home/NewsLatterArea.tsx
docs/Backend.md
docs/Architecture.md
```

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-24 | Implementation Agent | Initial restore point |
