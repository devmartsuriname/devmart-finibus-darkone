# Restore Point: Phase 13D.2 — Admin System Settings UI

**Created:** 2026-01-05  
**Phase:** 13D.2  
**Status:** Pre-Execution Snapshot  
**Type:** Admin UI Implementation

---

## Pre-Execution State

### Settings Page Summary

- **File:** `src/app/(admin)/settings/page.tsx`
- **Lines:** 310
- **Tabs:** 4 (General, SEO, Social, Branding)

### useSettings Hook Summary

- **File:** `src/app/(admin)/settings/hooks/useSettings.ts`
- **Lines:** 138
- **Categories in Interface:** 4 (general, seo, social, branding)

### Component Structure

| File | Status |
|------|--------|
| `GeneralSettingsTab.tsx` | EXISTS |
| `SeoSettingsTab.tsx` | EXISTS |
| `SocialSettingsTab.tsx` | EXISTS |
| `BrandingSettingsTab.tsx` | EXISTS |
| `SystemSettingsTab.tsx` | DOES NOT EXIST |

### FormValues Interface (Pre-Execution)

```typescript
interface FormValues {
  // General (6 keys)
  site_name: string
  site_tagline: string
  contact_email: string
  contact_phone: string
  contact_address: string
  google_maps_embed_url: string
  // SEO (3 keys)
  default_meta_title: string
  default_meta_description: string
  default_og_image_media_id: string
  // Social (4 keys)
  facebook_url: string
  instagram_url: string
  linkedin_url: string
  youtube_url: string
  // Branding (5 keys)
  logo_media_id: string
  favicon_media_id: string
  primary_color: string
  secondary_color: string
  accent_color: string
}
```

### Database State (Post Phase 13D.1)

- **Total Settings:** 22
- **System Keys (seeded in 13D.1):**
  - `maintenance_mode` = 'false'
  - `coming_soon_enabled` = 'false'
  - `coming_soon_message` = ''
  - `quotes_enabled` = 'true'
  - `contact_form_enabled` = 'true'

---

## Planned Changes

### Files to Create

| File | Purpose |
|------|---------|
| `src/app/(admin)/settings/components/SystemSettingsTab.tsx` | New System settings tab |

### Files to Modify

| File | Change |
|------|--------|
| `src/app/(admin)/settings/hooks/useSettings.ts` | Add `system` to SettingsByCategory |
| `src/app/(admin)/settings/page.tsx` | Add System tab, FormValues, initial values |

---

## Rollback Strategy

1. Delete `src/app/(admin)/settings/components/SystemSettingsTab.tsx`
2. Revert `useSettings.ts` to remove `system` from interface
3. Revert `page.tsx` to remove System tab and form values
4. No database rollback needed

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| Admin UI 1:1 Darkone | ✅ Using Form.Check switches |
| Public frontend unchanged | ✅ No public changes |
| No schema changes | ✅ No migrations |
| No new dependencies | ✅ react-bootstrap only |
