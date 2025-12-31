# Restore Point: Phase 2.1 + 2.2 (Blog Parity + Comments Removal)

**Created:** 2025-12-31  
**Status:** Pre-Implementation Snapshot  
**Scope:** Blog Field Parity Validation + Comments Feature Removal

---

## Purpose

This restore point captures the state before executing:
- **Phase 2.1:** Blog Field Parity Audit & Fix
- **Phase 2.2:** Blog Comments Removal

---

## Pre-Execution State

### Blog Admin Modal (BlogPostModal.tsx)
- 4-tab structure: Content, Taxonomy, Media & Publishing, SEO
- All 18 editable fields mapped to DB columns
- ContentBlocksEditor + legacy HTML mode supported
- CategorySelector + TagsInput components implemented

### blog_posts Table Columns (20 total)
| Column | Type | Admin Editable |
|--------|------|----------------|
| id | uuid | No (auto) |
| title | text | Yes |
| slug | text | Yes |
| excerpt | text | Yes |
| content | text | Yes |
| content_blocks | jsonb | Yes |
| category | text | Yes |
| tags | text[] | Yes |
| featured_image_media_id | uuid | Yes |
| status | text | Yes |
| published_at | timestamptz | Yes |
| author_id | uuid | No (auto) |
| created_at | timestamptz | No (auto) |
| updated_at | timestamptz | No (auto) |
| meta_title | text | Yes |
| meta_description | text | Yes |
| og_image_media_id | uuid | Yes |
| canonical_url | text | Yes |
| noindex | boolean | Yes |

### Public BlogDetailsWrapper Props
- title, content, excerpt, featuredImage, publishedAt, category
- All bound from useBlogDetails hook

### BlogDetailsComments Component
- Exists at: apps/public/src/components/pages/blogDetails/BlogDetailsComments.tsx
- Renders: hardcoded comments list + comment submission form
- Status: TO BE REMOVED in Phase 2.2

### blog_comments Table
- Contains: 8 seeded comments
- Status: Will be marked DEPRECATED (table not dropped)

---

## Files to Modify

### Phase 2.1 (Documentation Only - No Code Changes)
- Create: docs/Blog_Field_Parity_Matrix.md

### Phase 2.2 (Comments Removal)
- Modify: apps/public/src/components/pages/blogDetails/BlogDetailsPage.tsx
- Modify: apps/public/src/components/pages/blogDetails/BlogDetailsWrapper.tsx (remove comment counter)
- Create: docs/Policy_Blog_Comments_Disabled.md
- Update: docs/Architecture.md
- Update: docs/Backend.md

---

## Rollback Strategy

If issues arise after Phase 2.1 + 2.2:
1. Restore BlogDetailsPage.tsx to include `<BlogDetailsComments />`
2. Restore BlogDetailsWrapper.tsx comment counter UI
3. Revert documentation changes
4. Verify public /blog/:slug renders correctly

---

## Verification Checklist (Post-Execution)

- [ ] Blog admin modal saves all fields correctly
- [ ] Public blog pages render without console errors
- [ ] Comments section removed from blog details
- [ ] Comment counter removed from blog details header
- [ ] blog_comments table still exists (not dropped)
- [ ] Documentation updated with parity matrix
- [ ] Documentation updated with comments deprecation policy
