# Restore Point — Phase 12.6.1: Logo Wiring Fix

**Created:** 2025-12-30  
**Phase:** 12.6.1  
**Type:** Bug Fix  
**Status:** Pre-Implementation Snapshot

---

## Issue Summary

Admin-uploaded logo (`logo_media_id`) was not appearing on public Header/Footer.

**Root Cause:** Header.tsx and Footer.tsx hardcoded `/images/logo.png` instead of resolving `logo_media_id` from settings → media table.

---

## Files Changed

| File | Change |
|------|--------|
| `apps/public/src/hooks/usePublicSettings.ts` | Added `logo_media_id` to whitelist, added `logo_url` resolution via media table |
| `apps/public/src/components/common/Header.tsx` | Replaced hardcoded logo src with `settings.logo_url` |
| `apps/public/src/components/common/Footer.tsx` | Replaced hardcoded logo src with `settings.logo_url` |

---

## Pre-Change State

### usePublicSettings.ts (Lines 14-24)
```typescript
const PUBLIC_SETTINGS_KEYS = [
  'contact_email',
  'contact_phone',
  'contact_address',
  'site_name',
  'facebook_url',
  'instagram_url',
  'linkedin_url',
  'youtube_url',
  'google_maps_embed_url',
] as const;
```

### Header.tsx (Lines 83-85, 91-93)
```tsx
<Link onClick={scrollTop} to="/">
  <img src="/images/logo.png" alt="Devmart Logo" />
</Link>
```

### Footer.tsx (Lines 32-34)
```tsx
<Link onClick={scrollTop} to="/">
  <img src="/images/logo.png" alt="Devmart Logo" />
</Link>
```

---

## Rollback Instructions

1. Remove `logo_media_id` from `PUBLIC_SETTINGS_KEYS`
2. Remove `logo_url` from `PublicSettings` interface
3. Remove media query logic from `fetchSettings()`
4. Revert Header.tsx logo to `src="/images/logo.png"`
5. Revert Footer.tsx logo to `src="/images/logo.png"`

---

## Verification

- [ ] Logo appears in Header from DB
- [ ] Logo appears in Footer from DB
- [ ] Logo appears in mobile menu from DB
- [ ] Fallback works if DB unavailable
- [ ] No console errors
