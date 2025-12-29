# Frontend Documentation

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized

---

## Overview

This document covers the public frontend (Finibus template) implementation status and runtime validation results.

---

## Frontend Runtime Gate — Validated

### Runtime Test Matrix

| Environment | Errors | Warnings | Status |
|-------------|--------|----------|--------|
| Lovable Preview | 0 | 0 | **PASS** |
| Local Incognito (extensions disabled) | 0 | 0 | **PASS** |
| Local normal browser (extensions active) | 1 (extension-injected) | 0 | Out of scope |

### Error Classification

The only error observed in non-clean environments:

```
TypeError: Cannot read properties of null (reading 'indexOf')
    at contentScript.js
```

**Classification:** External browser extension (not application code)

**Evidence:**
- Stack trace contains only `contentScript.js` — no application files
- Error disappears in Incognito mode (extensions disabled)
- Local build succeeds with zero errors

---

## Environment Hygiene Note

When debugging frontend issues:

1. **Always reproduce in Incognito mode first** (or a clean browser profile with extensions disabled)
2. If errors reference `contentScript.js`, `inject.js`, or similar extension scripts, classify as **external/out of scope**
3. Only errors originating from `src/` or `apps/` paths should be treated as application bugs
4. Document the isolation test results before classifying any error

---

## Template Compliance

- Finibus template: **100% 1:1 parity required**
- No custom Bootstrap modifications
- No SCSS refactors
- No token changes
- No design abstraction
- Reuse only existing template assets

---

## Branding Settings Status (Phase 11B)

### Admin UI
| Setting | Status | Notes |
|---------|--------|-------|
| primary_color | ✅ Admin UI wired | Color picker in Settings → Branding |
| secondary_color | ✅ Admin UI wired | Color picker in Settings → Branding |
| accent_color | ✅ Admin UI wired | Color picker in Settings → Branding |
| logo_media_id | ✅ Admin UI wired | Media picker (existing) |
| favicon_media_id | ✅ Admin UI wired | Media picker (existing) |

### Public Frontend
| Setting | Status | Notes |
|---------|--------|-------|
| primary_color | ✅ CSS var injected | `--theme-color` on `:root` (Phase 11C-1) |
| secondary_color | ✅ CSS var injected | `--secondary-color` on `:root` (Phase 11C-1) |
| accent_color | ✅ CSS var injected | `--accent-color` on `:root` (Phase 11C-1) |
| logo_media_id | ❌ NOT consumed | Pending explicit authorization |
| favicon_media_id | ❌ NOT consumed | Pending explicit authorization |

### Phase 11C-1 Implementation (2025-12-27)
| Component | Status | Purpose |
|-----------|--------|---------|
| `useBrandingColors.ts` | ✅ Created | Fetch colors + inject CSS vars |
| `BrandingProvider.tsx` | ✅ Created | Root-level integration |
| `main.tsx` | ✅ Updated | BrandingProvider wrapper added |

### CSS Variables Injected
```css
:root {
  --theme-color: [primary_color from DB or #D90A2C];
  --secondary-color: [secondary_color from DB or #17161A];
  --accent-color: [accent_color from DB or #F7941D];
}
```

### Constraints
- **Fonts:** LOCKED — No font customization (admin or frontend)
- **SCSS:** No modifications — CSS variables injected, SCSS untouched
- **Selector targeting:** NOT done in Phase 11C-1 — variables available but not consumed by SCSS

---

## Optional Completeness Scan (User-Provided Evidence)

The following 9 routes should be verified in Incognito for full coverage:

- [ ] `/` — Homepage
- [ ] `/about` — About page
- [ ] `/service` — Services listing
- [ ] `/service-details/:slug` — Service detail page
- [ ] `/project` — Projects listing
- [ ] `/project-details/:slug` — Project detail page
- [ ] `/blog` — Blog listing
- [ ] `/blog/:slug` — Blog post detail
- [ ] `/contact` — Contact page

**Note:** This is a documentation TODO. User will provide screenshots when ready.

---

## Phase 12.1 — Homepage Content Character Limits (2025-12-29)

### Hero Slides

| Field | Content | Length | Safe Range | Status |
|-------|---------|--------|------------|--------|
| Slide 1 title_prefix | "We Design, Build, and Operate" | 30 | 20-40 | ✅ Safe |
| Slide 1 title_highlight | "Critical Digital Systems" | 24 | 8-25 | ✅ Safe |
| Slide 1 description | (155 chars) | 155 | 150-250 | ✅ Safe |
| Slide 2 title_prefix | "Digital Infrastructure for" | 27 | 20-40 | ✅ Safe |
| Slide 2 title_highlight | "Public Services" | 15 | 8-25 | ✅ Safe |
| Slide 2 description | (170 chars) | 170 | 150-250 | ✅ Safe |
| Slide 3 title_prefix | "Enterprise Systems That" | 23 | 20-40 | ✅ Safe |
| Slide 3 title_highlight | "Scale with Governance" | 21 | 8-25 | ✅ Safe |
| Slide 3 description | (148 chars) | 148 | 150-250 | ⚠️ Slightly short |

### About Section

| Field | Content | Length | Safe Range | Status |
|-------|---------|--------|------------|--------|
| title | "Your Digital Infrastructure Partner" | 36 | 25-50 | ✅ Safe |
| description | (227 chars) | 227 | 200-400 | ✅ Safe |

### Why Choose Us Section

| Field | Content | Length | Safe Range | Status |
|-------|---------|--------|------------|--------|
| title | "Why Institutions Choose Devmart" | 32 | 25-50 | ✅ Safe |
| skill 1 label | "Mission-Critical Delivery" | 25 | 15-30 | ✅ Safe |
| skill 2 label | "Secure Integrations" | 19 | 15-30 | ✅ Safe |
| skill 3 label | "Scalable Architecture" | 21 | 15-30 | ✅ Safe |
| skill 4 label | "Operational Stewardship" | 23 | 15-30 | ✅ Safe |

### CTA Strip

| Field | Content | Length | Safe Range | Status |
|-------|---------|--------|------------|--------|
| title_line1 | "Ready to Build" | 14 | 12-25 | ✅ Safe |
| title_line2 | "Critical Systems?" | 17 | 10-20 | ✅ Safe |
| title_line3 | "Let's Talk" | 10 | 8-15 | ✅ Safe |
| cta_label | "Get in Touch" | 12 | 10-20 | ✅ Safe |

### Source-of-Truth Mapping

| Field | Source A (Public UI) | Source B (Database) | Source C (Admin) |
|-------|---------------------|---------------------|------------------|
| Hero slides | ✅ Rendered | ✅ homepage_settings | ✅ Pages modal |
| About title/desc | ✅ Rendered | ✅ homepage_settings | ✅ Pages modal |
| Why Choose title | ✅ Rendered | ✅ homepage_settings | ✅ Pages modal |
| Why Choose skills | ✅ Rendered | ✅ homepage_settings | ✅ Pages modal |
| CTA strip | ✅ Rendered | ✅ homepage_settings | ✅ Pages modal |
| Services wrapper | ❌ Hardcoded | ✅ Exists | ✅ Admin exists |
| Portfolio wrapper | ❌ Hardcoded | ✅ Exists | ✅ Admin exists |
| News wrapper | ❌ Hardcoded | ✅ Exists | ✅ Admin exists |

---

## Phase 12.2 — About Page Content Character Limits (2025-12-29)

### Inside Story Section

| Field | Content | Length | Safe Range | Status |
|-------|---------|--------|------------|--------|
| section_label | "Our Story" | 9 | ±20 | ✅ Safe |
| title | "Building Mission-Critical Digital Systems" | 42 | 45-55 | ✅ Safe |
| description | (298 chars) | 298 | 260-300 | ✅ Safe |
| cto_message | (231 chars) | 231 | 220-260 | ✅ Safe |
| cto_name | "Devmart Leadership" | 18 | ±30 | ✅ Safe |
| cto_title | "Systems Integration Team" | 24 | ±35 | ✅ Safe |

### Progress Stats

| Field | Content | Length | Safe Range | Status |
|-------|---------|--------|------------|--------|
| stat 1 label | "Mission-Critical Systems" | 24 | ±30 | ✅ Safe |
| stat 2 label | "Government & Enterprise" | 23 | ±30 | ✅ Safe |
| stat 3 label | "Long-Term Operations" | 20 | ±30 | ✅ Safe |

### Latest News Section

| Field | Content | Length | Safe Range | Status |
|-------|---------|--------|------------|--------|
| section_label | "Insights" | 8 | ±20 | ✅ Safe |
| section_title | "Latest Updates from Devmart" | 28 | 45-55 | ✅ Safe |
| view_all_label | "View All Insights" | 17 | ±20 | ✅ Safe |

### Source-of-Truth Mapping (About Page)

| Field | Source A (Public UI) | Source B (Database) | Source C (Admin) |
|-------|---------------------|---------------------|------------------|
| Inside Story all fields | ✅ Rendered | ✅ page_settings (about) | ✅ Pages modal |
| Latest News labels | ✅ Rendered | ✅ page_settings (about) | ✅ Pages modal |
| Latest News posts | ✅ Rendered | ✅ blog_posts table | ✅ Blog module |
| Why Choose Us (shared) | ✅ Rendered | ✅ homepage_settings | ✅ Pages modal |
| Testimonials (shared) | ✅ Rendered | ✅ testimonials table | ✅ Testimonials module |
| CTA (shared) | ✅ Rendered | ✅ homepage_settings | ✅ Pages modal |
