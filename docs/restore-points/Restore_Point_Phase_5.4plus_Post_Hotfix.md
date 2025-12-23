# Restore Point — Phase 5.4+ Post-Hotfix

```
Status: POST-IMPLEMENTATION
Phase: 5.4+ Hotfix (Projects Parity + Modal Standardization + Public RLS)
Created: 2025-12-23
```

---

## 1. Changes Implemented

### Database
- **projects table**: Added 5 new columns (website, start_date, end_date, check_launch_content, check_launch_image_media_id)
- **project_process_steps table**: Created (mirrors service_process_steps)
- **RLS**: Added "Public can view published projects" policy
- **RLS**: Added admin + public policies for project_process_steps

### Admin UI
- **ProjectModal.tsx**: Updated to size="xl" with Tabs (Basic Info | Process Steps)
- **ProjectProcessStepsEditor.tsx**: Created (mirrors services pattern)
- **useProjects.ts**: Extended with new fields + process steps CRUD

### Public Hooks
- **useProjects.ts**: Updated interface with new fields
- **useProjectDetails.ts**: Fetches new fields + process steps

---

## 2. Verification Checklist

- [x] Migration executed successfully
- [x] Admin modal updated to xl size
- [x] New fields visible in admin
- [x] Process Steps tab functional
- [x] Public RLS policy active
- [x] Hooks updated for new data

---

## 3. Modal Standardization Note

All content modals must use the Services modal sizing/layout standard:
- size="xl"
- Tab-based layout for related data
- Footer: Cancel + Save Changes buttons

---

## Document Control

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2025-12-23 | POST restore point created |
