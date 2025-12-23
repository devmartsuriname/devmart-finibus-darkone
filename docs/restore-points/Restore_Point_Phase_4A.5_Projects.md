# Restore Point — Phase 4A.5 Projects Module

```
Status: PRE-IMPLEMENTATION
Created: 2025-12-23
Phase: 4A.5 - Projects Module (Admin CRUD + Seeding)
```

---

## 1. Pre-Implementation State

### 1.1 Files Before Changes

| File | Status |
|------|--------|
| `src/app/(admin)/content/projects/page.tsx` | Placeholder with EmptyTablePlaceholder |
| `src/integrations/supabase/types.ts` | No projects table |
| `docs/Backend.md` | Phase 4A.4B complete |
| `docs/Architecture.md` | Phase 4A.4B complete |

### 1.2 Database Before Changes

| Table | Status |
|-------|--------|
| `public.projects` | Does NOT exist |

### 1.3 Scope Declaration

- **Admin-only scope:** `src/app/(admin)/content/projects/**`
- **Frontend:** ❌ LOCKED — NOT touched
- **Public access:** ❌ NO public RLS policies (admin-only)

---

## 2. Changes To Be Applied

### 2.1 Database Migration

**New Table: `public.projects`**

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, gen_random_uuid() |
| title | TEXT | NOT NULL |
| heading | TEXT | NOT NULL |
| slug | TEXT | NOT NULL, UNIQUE |
| description | TEXT | |
| image_media_id | UUID | FK → media(id) ON DELETE SET NULL |
| featured_image_media_id | UUID | FK → media(id) ON DELETE SET NULL |
| category | TEXT | NOT NULL |
| is_featured | BOOLEAN | NOT NULL DEFAULT false |
| display_order | INTEGER | |
| status | TEXT | NOT NULL DEFAULT 'draft', CHECK (draft/published/archived) |
| client | TEXT | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() |

**Indexes:**
- `projects_category_idx` ON (category)
- `projects_status_idx` ON (status)
- `projects_featured_idx` ON (is_featured, display_order)

**RLS Policies (ADMIN-ONLY):**
- Admins can view all projects (SELECT)
- Admins can create projects (INSERT)
- Admins can update projects (UPDATE)
- Admins can delete projects (DELETE)

**PUBLIC HAS NO ACCESS** — confirmed.

**Trigger:**
- `update_projects_updated_at` → calls `update_updated_at_column()`

**Seed Data:**
- 8 projects (5 Published, 3 Draft)
- Categories: UI/UX, Web Design, Developing, Graphic Design
- 4 featured with display_order

### 2.2 New Admin Files

| File | Purpose |
|------|---------|
| `src/app/(admin)/content/projects/hooks/useProjects.ts` | CRUD hook |
| `src/app/(admin)/content/projects/components/ProjectModal.tsx` | Create/Edit modal |
| `src/app/(admin)/content/projects/components/DeleteProjectModal.tsx` | Delete confirmation |
| `src/app/(admin)/content/projects/page.tsx` | Updated list page |

### 2.3 Documentation Updates

| File | Changes |
|------|---------|
| `docs/Backend.md` | Add projects table schema + RLS |
| `docs/Architecture.md` | Update phase status |

---

## 3. Rollback Instructions

### 3.1 Database Rollback

```sql
-- Drop table (cascades indexes, triggers, policies)
DROP TABLE IF EXISTS public.projects CASCADE;
```

### 3.2 File Rollback

Restore original placeholder:
```tsx
// src/app/(admin)/content/projects/page.tsx
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import EmptyTablePlaceholder from '@/components/placeholders/EmptyTablePlaceholder'

const ProjectsPage = () => {
  return (
    <>
      <PageTitle subName="Content" title="Projects" />
      <EmptyTablePlaceholder 
        title="Projects" 
        columns={['Name', 'Status', 'Date', 'Actions']}
        emptyMessage="No projects yet"
      />
      <Footer />
    </>
  )
}

export default ProjectsPage
```

Delete new files:
- `src/app/(admin)/content/projects/hooks/useProjects.ts`
- `src/app/(admin)/content/projects/components/ProjectModal.tsx`
- `src/app/(admin)/content/projects/components/DeleteProjectModal.tsx`

---

## 4. Verification Checklist

- [ ] Projects table created with correct schema
- [ ] All 4 indexes created
- [ ] RLS policies applied (admin-only)
- [ ] `updated_at` trigger working
- [ ] 8 projects seeded (5 published, 3 draft)
- [ ] Admin list shows thumbnail, title, category, status, featured, actions
- [ ] Create/Edit modal works with both image pickers
- [ ] Delete confirmation works
- [ ] No console errors
- [ ] Frontend untouched (LOCKED)

---

## 5. Guardrails Confirmation

| Rule | Compliance |
|------|------------|
| Admin-only scope | ✅ Only touching `src/app/(admin)/content/projects/**` |
| Frontend LOCKED | ✅ No public/frontend code touched |
| Darkone UI patterns | ✅ Following Blog module patterns exactly |
| No speculative features | ✅ Only CRUD + seeding |
| Public has NO access | ✅ No public RLS policies |
