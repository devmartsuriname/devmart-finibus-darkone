# Restore Point — Phase 5.5: Blog Public Wiring

```
Status: Active
Phase: 5.5 — Blog Public Wiring
Created: 2025-12-24
```

---

## Scope

Wire Finibus public blog pages (Blog List + Blog Details) to Supabase database.
Read published posts only via public RLS policy.

### Included

- Public blog list page wiring
- Public blog details page wiring
- New hooks: useBlogPosts.ts, useBlogDetails.ts
- Route update: /blog-details/:slug
- RLS policy for public SELECT on published posts
- Admin BlogPostModal size="xl" hotfix
- Documentation updates

### Excluded

- ❌ No blog creation routes in public
- ❌ No pagination redesign
- ❌ No search/filter implementation
- ❌ No tags filtering
- ❌ No comments submission
- ❌ No analytics
- ❌ No SEO refactor beyond existing meta fields
- ❌ No admin UX redesign beyond modal size parity

---

## Finibus Parity Rule

All public pages must maintain 1:1 visual parity with Finibus demo:
- NO layout changes
- NO typography changes
- NO spacing changes
- NO className/CSS refactors
- Data binding ONLY (replace static content with DB data)

---

## Files Created

| File | Purpose |
|------|---------|
| `apps/public/src/hooks/useBlogPosts.ts` | Fetch published blog posts for list page |
| `apps/public/src/hooks/useBlogDetails.ts` | Fetch single blog post by slug |

## Files Modified

| File | Change |
|------|--------|
| `apps/public/src/App.tsx` | Add route `/blog-details/:slug` |
| `apps/public/src/components/pages/blog/BlogPage.tsx` | Wire to DB |
| `apps/public/src/components/pages/blog/BlogCart.tsx` | Accept dynamic props |
| `apps/public/src/components/pages/blogDetails/BlogDetailsPage.tsx` | Wire to DB |
| `apps/public/src/components/pages/blogDetails/BlogDetailsWrapper.tsx` | Accept dynamic props |
| `src/app/(admin)/content/blog/components/BlogPostModal.tsx` | size="xl" |
| `docs/Backend.md` | Blog public read model |
| `docs/Architecture.md` | Phase 5.5 notes |

## Database Changes

| Table | Change |
|-------|--------|
| `blog_posts` | Add RLS policy "Public can view published posts" |

---

## Rollback Procedure

### 1. Revert RLS Policy

```sql
DROP POLICY IF EXISTS "Public can view published posts" ON public.blog_posts;
```

### 2. Revert Files

Delete:
- `apps/public/src/hooks/useBlogPosts.ts`
- `apps/public/src/hooks/useBlogDetails.ts`

Restore from git:
- `apps/public/src/App.tsx`
- `apps/public/src/components/pages/blog/BlogPage.tsx`
- `apps/public/src/components/pages/blog/BlogCart.tsx`
- `apps/public/src/components/pages/blogDetails/BlogDetailsPage.tsx`
- `apps/public/src/components/pages/blogDetails/BlogDetailsWrapper.tsx`
- `src/app/(admin)/content/blog/components/BlogPostModal.tsx`

### 3. Revert Documentation

Restore from git:
- `docs/Backend.md`
- `docs/Architecture.md`

---

## Verification Checklist

**Public:**
- [ ] `/blog` shows published posts from DB
- [ ] `/blog-details/:slug` renders correct post
- [ ] Draft posts NOT visible publicly
- [ ] No stretched images
- [ ] No layout shift
- [ ] No console errors
- [ ] Finibus markup/CSS untouched

**Admin:**
- [ ] Blog modal is `size="xl"`
- [ ] Save/Edit works
- [ ] No regressions

**RLS:**
- [ ] Anonymous SELECT works for published posts
- [ ] Draft posts blocked for anonymous users
