# Restore Point — Phase 4A.4: Blog Module (Admin-Only)

```
Status: RESTORE POINT CREATED
Phase: Phase 4A.4 Blog Module
Created: 2025-12-22
```

---

## 1. Pre-Implementation State

### 1.1 Current Blog Page

**File:** `src/app/(admin)/content/blog/page.tsx`

```tsx
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import EmptyTablePlaceholder from '@/components/placeholders/EmptyTablePlaceholder'

const BlogPage = () => {
  return (
    <>
      <PageTitle subName="Content" title="Blog" />
      <EmptyTablePlaceholder 
        title="Blog Posts" 
        columns={['Title', 'Status', 'Date', 'Actions']}
        emptyMessage="No blog posts yet"
      />
      <Footer />
    </>
  )
}

export default BlogPage
```

### 1.2 Database State (Before)

- `blog_posts` table: **DOES NOT EXIST**

---

## 2. Files To Be Created

| File | Purpose |
|------|---------|
| `src/app/(admin)/content/blog/hooks/useBlogPosts.ts` | CRUD hook |
| `src/app/(admin)/content/blog/components/BlogPostModal.tsx` | Create/Edit modal |
| `src/app/(admin)/content/blog/components/DeleteBlogPostModal.tsx` | Delete confirmation |

---

## 3. Files To Be Modified

| File | Changes |
|------|---------|
| `src/app/(admin)/content/blog/page.tsx` | Replace placeholder with full CRUD UI |
| `docs/Backend.md` | Add blog_posts table documentation |
| `docs/Architecture.md` | Update phase status |

---

## 4. Database Changes (Planned)

### 4.1 New Table: blog_posts

```sql
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  author_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 4.2 RLS Policies (ADMIN-ONLY)

- **NO PUBLIC ACCESS** in this phase
- Admins: full CRUD via `has_role(auth.uid(), 'admin')`

---

## 5. Rollback Procedure

### 5.1 Database

```sql
DROP TABLE IF EXISTS public.blog_posts;
```

### 5.2 Files

1. Restore `src/app/(admin)/content/blog/page.tsx` to placeholder state
2. Delete `src/app/(admin)/content/blog/hooks/useBlogPosts.ts`
3. Delete `src/app/(admin)/content/blog/components/BlogPostModal.tsx`
4. Delete `src/app/(admin)/content/blog/components/DeleteBlogPostModal.tsx`
5. Revert documentation changes

---

## 6. Guardrails Applied

- ✅ Scope: `src/app/(admin)/content/blog/` only
- ✅ No public routes/pages
- ✅ No public SELECT access in RLS
- ✅ Darkone UI patterns only
- ✅ Text-only toast notifications

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-22 | Implementation Agent | Restore point created |
