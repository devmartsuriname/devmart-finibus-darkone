# Restore Point: Phase 13D.1 — System Toggles DB Seed

**Created:** 2026-01-05  
**Phase:** 13D.1  
**Status:** Pre-Execution Snapshot  
**Type:** Database Seeding

---

## Pre-Execution State

### Settings Table Summary

- **Total Rows:** 17
- **Categories:** branding (5), general (5), seo (3), social (4)
- **System Category:** Does NOT exist yet

### Current Settings Snapshot

| Key | Category | Value |
|-----|----------|-------|
| accent_color | branding | #F7941D |
| favicon_media_id | branding | b1b08104-3744-46f5-804a-783ace608c37 |
| logo_media_id | branding | 862c1408-0bb5-4bcb-9bdf-c39f711e46f4 |
| primary_color | branding | #1eb36b |
| secondary_color | branding | #17161A |
| contact_address | general | Jaggernath Lachmonstraat 152, Paramaribo |
| contact_email | general | info@devmart.sr |
| contact_phone | general | +597 854-1211 \| +597 761-4838 |
| google_maps_embed_url | general | (Google Maps embed URL) |
| site_name | general | Devmart |
| site_tagline | general | We build critical digital systems in suriname |
| default_meta_description | seo | Professional digital solutions for your business |
| default_meta_title | seo | Devmart - Digital Solutions |
| default_og_image_media_id | seo | (empty) |
| facebook_url | social | (empty) |
| instagram_url | social | (empty) |
| linkedin_url | social | (empty) |
| youtube_url | social | (empty) |

---

## Planned Execution

### Keys to Insert (Category: system)

| Key | Default Value | Description |
|-----|---------------|-------------|
| maintenance_mode | false | Enable maintenance mode for public site |
| coming_soon_enabled | false | Show Coming Soon page instead of normal site |
| coming_soon_message | (empty) | Custom message for Coming Soon page |
| quotes_enabled | true | Allow quote wizard submissions |
| contact_form_enabled | true | Allow contact form submissions |

### Expected Post-Execution State

- **Total Rows:** 22
- **Categories:** branding (5), general (5), seo (3), social (4), system (5)

---

## Rollback Strategy

If rollback is required:

```sql
DELETE FROM settings WHERE category = 'system';
```

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| No schema changes | ✅ INSERT only |
| No code changes | ✅ DB seeding only |
| No UI changes | ✅ Not in scope |
| 1:1 Darkone preserved | ✅ No admin changes |
| 1:1 Finibus preserved | ✅ No public changes |

---

## Notes

- Public Coming Soon route (`/commingsoon`) already exists in frontend
- This phase does NOT wire routing or toggles
- Wiring deferred to Phase 13D.3/13D.5
