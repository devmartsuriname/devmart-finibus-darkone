# Restore Point: Phase 11J — Google Maps Settings Wiring

**Created:** 2025-12-29  
**Phase:** 11J  
**Status:** Pre-implementation snapshot

---

## Purpose

Snapshot before implementing Google Maps embed URL setting in Admin → Settings → General and wiring to Contact page.

---

## Files Modified in This Phase

| File | Action |
|------|--------|
| `settings` table | INSERT `google_maps_embed_url` key |
| `src/app/(admin)/settings/page.tsx` | Add field + strict validation |
| `src/app/(admin)/settings/components/GeneralSettingsTab.tsx` | Add input field |
| `apps/public/src/hooks/usePublicSettings.ts` | Add key + fallback |
| `apps/public/src/components/pages/contact/ContactForm.tsx` | Wire iframe src |
| `docs/Tasks.md` | Mark Phase 11J complete |

---

## Rollback Instructions

1. Revert all file changes listed above
2. Delete `google_maps_embed_url` from `settings` table:
   ```sql
   DELETE FROM settings WHERE key = 'google_maps_embed_url';
   ```

---

## Verification After Rollback

- Admin → Settings → General should NOT show Google Maps field
- Contact page should display hardcoded Finibus map (Dhaka location)
