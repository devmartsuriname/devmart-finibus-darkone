# Restore Point — Phase 4A.3: Settings Module

```
Status: LOCKED
Phase: Phase 4A.3 — Settings Module Implementation
Created: 2025-12-22
Author: Implementation Agent
```

---

## 1. Purpose

This restore point documents the state of the codebase immediately before implementing the Settings Module.

---

## 2. Pre-Implementation State

### 2.1 Settings Page (Current)

**File:** `src/app/(admin)/settings/page.tsx`

```tsx
import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import ComingSoonPlaceholder from '@/components/placeholders/ComingSoonPlaceholder'

const SettingsPage = () => {
  return (
    <>
      <PageTitle subName="System" title="Settings" />
      <ComingSoonPlaceholder 
        title="Settings – Coming Soon" 
        description="System settings are under development."
      />
      <Footer />
    </>
  )
}

export default SettingsPage
```

### 2.2 Database State

| Table | Status |
|-------|--------|
| `public.settings` | Does NOT exist |

### 2.3 Dependencies

- No new dependencies required
- Using existing React Bootstrap components
- Using existing Supabase client

---

## 3. Planned Changes

### 3.1 Database

| Change | Description |
|--------|-------------|
| Create `settings` table | Key-value store with 14 approved keys |
| RLS policies | Public SELECT, Admin-only INSERT/UPDATE/DELETE |
| Seed data | 14 default settings across 4 categories |

### 3.2 Files to Create

| File | Purpose |
|------|---------|
| `src/app/(admin)/settings/hooks/useSettings.ts` | Settings CRUD hook |
| `src/app/(admin)/settings/components/MediaPicker.tsx` | Media selection component |
| `src/app/(admin)/settings/components/GeneralSettingsTab.tsx` | General settings form |
| `src/app/(admin)/settings/components/SeoSettingsTab.tsx` | SEO settings form |
| `src/app/(admin)/settings/components/SocialSettingsTab.tsx` | Social settings form |
| `src/app/(admin)/settings/components/BrandingSettingsTab.tsx` | Branding settings form |

### 3.3 Files to Modify

| File | Changes |
|------|---------|
| `src/app/(admin)/settings/page.tsx` | Replace placeholder with tabbed form UI |
| `docs/Backend.md` | Add settings table documentation |
| `docs/Architecture.md` | Update module status |

---

## 4. Settings Keys (Approved MVP)

### 4.1 General (5 keys)
- `site_name`
- `site_tagline`
- `contact_email`
- `contact_phone`
- `contact_address`

### 4.2 SEO (3 keys)
- `default_meta_title`
- `default_meta_description`
- `default_og_image_media_id` (UUID reference)

### 4.3 Social (4 keys)
- `facebook_url`
- `instagram_url`
- `linkedin_url`
- `youtube_url`

### 4.4 Branding (2 keys)
- `logo_media_id` (UUID reference)
- `favicon_media_id` (UUID reference)

**Total: 14 approved keys**

---

## 5. Rollback Instructions

### 5.1 Database Rollback

```sql
-- Remove settings table and related policies
DROP TABLE IF EXISTS public.settings CASCADE;
```

### 5.2 File Rollback

1. Restore `src/app/(admin)/settings/page.tsx` to placeholder version
2. Delete all files in:
   - `src/app/(admin)/settings/hooks/`
   - `src/app/(admin)/settings/components/`
3. Revert documentation changes in:
   - `docs/Backend.md`
   - `docs/Architecture.md`

---

## 6. Verification Checklist (Post-Implementation)

- [ ] Settings table exists with 14 rows
- [ ] RLS verified: public SELECT, admin-only INSERT/UPDATE/DELETE
- [ ] Admin UI: 4 tabs + Save works + reload shows persisted values
- [ ] MediaPicker selects from Media Library and saves UUID values correctly
- [ ] Navigation stable (no blank screen issues)
- [ ] No console errors
- [ ] apps/public untouched
- [ ] No SCSS/theme modifications

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-22 | Implementation Agent | Initial restore point |
