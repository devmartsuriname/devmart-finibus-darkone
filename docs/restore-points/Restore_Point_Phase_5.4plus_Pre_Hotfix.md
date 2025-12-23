# Restore Point — Phase 5.4+ Pre-Hotfix

```
Status: PRE-IMPLEMENTATION
Phase: 5.4+ Hotfix (Projects Parity + Modal Standardization + Public RLS)
Created: 2025-12-23
```

---

## 1. Scope

This restore point captures the state before implementing:

1. **Database Schema Extensions**
   - New columns on `projects` table (website, start_date, end_date, check_launch_content, check_launch_image_media_id)
   - New `project_process_steps` table (mirroring service_process_steps)
   
2. **RLS Policies**
   - "Public can view published projects" on projects table
   - Admin + public RLS on project_process_steps table

3. **Admin UI Updates**
   - ProjectModal: size="lg" → size="xl"
   - ProjectModal: Add Tabs (Basic Info | Process Steps)
   - ProjectModal: New fields (website, dates, check_launch)
   - New ProcessStepsEditor component for projects

4. **Public Wiring**
   - Update useProjectDetails hook for new fields
   - Update ProjectProcess component for dynamic data

5. **Seed/Backfill**
   - Populate 8 existing projects with new fields
   - Create 4 process steps per project (32 total)

---

## 2. Files to Modify

### Database (Migration)
- `supabase/migrations/` — New migration file

### Admin Files
| File | Change |
|------|--------|
| `src/app/(admin)/content/projects/components/ProjectModal.tsx` | size="xl", tabs, new fields |
| `src/app/(admin)/content/projects/components/ProjectProcessStepsEditor.tsx` | NEW file |
| `src/app/(admin)/content/projects/hooks/useProjects.ts` | New fields + process steps CRUD |

### Public Files
| File | Change |
|------|--------|
| `apps/public/src/hooks/useProjectDetails.ts` | Fetch new fields + process steps |
| `apps/public/src/hooks/useProjects.ts` | Type updates |
| `apps/public/src/components/pages/projectDetails/ProjectProcess.tsx` | Bind dynamic data |

### Documentation
| File | Change |
|------|--------|
| `docs/Backend.md` | New columns, table, RLS policies |
| `docs/Architecture.md` | Phase 5.4+ completion note |

---

## 3. Pre-Change State

### projects Table Columns (Current)
- id, title, heading, slug, description, image_media_id, featured_image_media_id
- category, is_featured, display_order, status, client, created_at, updated_at

### projects RLS Policies (Current)
- Admins can create/update/delete/view all — RESTRICTIVE

### ProjectModal (Current)
- size="lg"
- No tabs
- Fields: title, heading, slug, description, client, thumbnail, featured, category, status, display_order

---

## 4. Rollback Instructions

If issues occur after implementation:

1. **Database Rollback**
   - Drop `project_process_steps` table
   - Remove new columns from `projects` table
   - Drop new RLS policies

2. **Code Rollback**
   - Restore `ProjectModal.tsx` to size="lg", no tabs
   - Delete `ProjectProcessStepsEditor.tsx`
   - Restore `useProjects.ts` admin hook
   - Restore `useProjectDetails.ts` and `useProjects.ts` public hooks
   - Restore `ProjectProcess.tsx`

3. **Reference Files**
   - This restore point preserves the "before" state
   - POST restore point will capture "after" state

---

## 5. Verification Before Proceeding

- [ ] Admin projects page loads correctly
- [ ] Public projects page loads (empty due to missing RLS)
- [ ] No console errors in admin
- [ ] 8 existing projects in database

---

## Document Control

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2025-12-23 | Initial PRE restore point |
