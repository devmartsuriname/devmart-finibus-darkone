# Phase 4 — Module: Media Library

```
Status: Draft
Phase: Documentation Only
Execution: Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Module Overview

| Attribute | Value |
|-----------|-------|
| Module Name | Media Library |
| Admin Route | `/content/media` |
| Public Routes | N/A (asset storage) |
| Current State | Empty grid placeholder |
| Priority | 1 (enables other modules) |

---

## 2. Frontend Reference

### 2.1 Mapping Index Reference

See: `Phase_4_Frontend_Mapping_Index.md` Section 9

### 2.2 Public Display

Media Library has **no public-facing route**. It serves as the central asset storage for:

| Consumer Module | Asset Type |
|-----------------|------------|
| Blog | Featured images, author avatars |
| Projects | Portfolio images, thumbnails |
| Testimonials | Client photos |
| Pages | Section images, banners |

### 2.3 Current Asset Directories (Finibus)

| Directory | Sample Files | Count |
|-----------|--------------|-------|
| `/images/author/` | author-1.jpg through author-7.jpg | ~7 |
| `/images/post/` | post-1.jpg through post-8.jpg | ~8 |
| `/images/portfolio/` | portfolio-1.jpg through portfolio-9.jpg | ~9 |
| `/images/project/` | Various project images | TBD |
| `/images/icons/` | Service icons | TBD |

---

## 3. Data Model Proposal (MVP)

### 3.1 Table: `media`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | uuid | No | gen_random_uuid() | Primary key |
| `filename` | text | No | — | Original filename |
| `storage_path` | text | No | — | Path in storage bucket |
| `public_url` | text | No | — | Public access URL |
| `file_type` | text | No | — | MIME type (image/jpeg, etc.) |
| `file_size` | integer | No | — | Size in bytes |
| `alt_text` | text | Yes | NULL | Accessibility text |
| `title` | text | Yes | NULL | Display title |
| `uploaded_by` | uuid | Yes | auth.uid() | Reference to profiles |
| `created_at` | timestamptz | No | now() | Upload timestamp |
| `updated_at` | timestamptz | No | now() | Last modified |

### 3.2 Indexes

| Index | Columns | Purpose |
|-------|---------|---------|
| `media_pkey` | `id` | Primary key |
| `media_file_type_idx` | `file_type` | Filter by type |
| `media_created_at_idx` | `created_at` | Sort by date |

### 3.3 RLS Considerations (High-Level)

| Policy | Rule |
|--------|------|
| SELECT | Authenticated users can view all media |
| INSERT | Authenticated users can upload |
| UPDATE | Owner or admin can modify metadata |
| DELETE | Admin only |

### 3.4 Storage Bucket Configuration

| Bucket | Access | Purpose |
|--------|--------|---------|
| `public` | Public read | Public website assets |
| `private` | Authenticated only | Internal documents |
| `uploads` | Authenticated write | Temporary uploads |

### 3.5 Seed Data

**Required**: No
**Reason**: Media is uploaded via admin UI; existing Finibus images remain static in public folder.

---

## 4. Admin UI Requirements

### 4.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| List/Grid | `/content/media` | Display all media in grid view |
| Upload Modal | (modal) | Dropzone for file upload |
| Detail Modal | (modal) | View/edit metadata |

### 4.2 List View Features

| Feature | MVP | Later |
|---------|-----|-------|
| Grid display with thumbnails | ✅ | — |
| Filter by file type | ✅ | — |
| Search by filename/title | ✅ | — |
| Sort by date | ✅ | — |
| Pagination | ✅ | — |
| Bulk delete | — | ✅ |
| Folder organization | — | ✅ |

### 4.3 Upload Features

| Feature | MVP | Later |
|---------|-----|-------|
| Drag-and-drop upload | ✅ | — |
| Multiple file upload | ✅ | — |
| Progress indicator | ✅ | — |
| File type validation | ✅ | — |
| Size limit enforcement | ✅ | — |
| Auto-thumbnail generation | — | ✅ |
| Image resizing | — | ✅ |

### 4.4 Detail View Features

| Feature | MVP | Later |
|---------|-----|-------|
| View full image | ✅ | — |
| Edit alt text | ✅ | — |
| Edit title | ✅ | — |
| Copy public URL | ✅ | — |
| Delete file | ✅ | — |
| View usage (which content uses this) | — | ✅ |

### 4.5 Empty State

**Current (Phase 3)**: "No media files yet"

**Phase 4 MVP**: Same message with "Upload" button

### 4.6 Validation Rules

| Rule | Constraint |
|------|------------|
| File types | image/jpeg, image/png, image/svg+xml, image/webp, application/pdf |
| Max file size | 10MB per file |
| Filename | Sanitized on upload (alphanumeric, hyphens, underscores) |
| Alt text | Max 255 characters |
| Title | Max 255 characters |

---

## 5. Phase Gate

### 5.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create `media` table, storage buckets, RLS policies | Separate authorization required |
| Step 2 | Admin CRUD: upload, list, edit metadata, delete | Separate authorization required |
| Step 3 | Integration: Media picker component for other modules | Separate authorization required |

### 5.2 Stop Condition

Before proceeding to Step 2:
- [ ] `media` table created
- [ ] Storage buckets configured
- [ ] RLS policies applied
- [ ] Upload functionality tested
- [ ] Explicit authorization received

### 5.3 Verification Checklist (Per Step)

**Step 1 (DB Foundation)**:
- [ ] Table exists with correct schema
- [ ] Indexes created
- [ ] RLS policies active
- [ ] Storage buckets accessible

**Step 2 (Admin CRUD)**:
- [ ] Grid view renders correctly
- [ ] Upload works via dropzone
- [ ] Metadata editing saves correctly
- [ ] Delete removes file and record
- [ ] Empty state displays when no files

**Step 3 (Integration)**:
- [ ] Media picker modal available
- [ ] Other modules can reference media IDs
- [ ] URLs resolve correctly on public site

---

## 6. Dependencies

### 6.1 Required Before This Module

| Dependency | Status |
|------------|--------|
| Supabase Cloud enabled | Not yet |
| Storage configured | Not yet |
| Admin auth working | Demo only |

### 6.2 Modules Dependent on This

| Module | Dependency Type |
|--------|-----------------|
| Blog | Featured images, author avatars |
| Projects | Portfolio images |
| Testimonials | Client photos |
| Pages | Section images |

---

## 7. MVP vs Later Summary

### 7.1 MVP Scope

- Single `media` table
- File upload with basic metadata
- Grid view with type filter and search
- Public URL generation
- Basic CRUD operations

### 7.2 Later Phase Scope

- Folder organization
- Auto-thumbnail generation
- Image resizing/cropping
- Bulk operations
- Usage tracking (which content uses this file)
- CDN optimization

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft |

**Next Review:** After authorization for Step 1
