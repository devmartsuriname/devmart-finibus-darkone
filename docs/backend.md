# Backend Documentation

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized

---

## Overview

This document covers the admin backend (Darkone template) and Supabase integration status.

---

## Current State

### Admin Backend (Darkone)
- Demo authentication: **Active** (temporary)
- Supabase authentication: **Planned** (not implemented)
- Dashboard layout: **Preserved**
- Sidebar structure: **Preserved**

### Database (Supabase)
- Connection: **Active**
- Migrations: Applied
- Field name fix: `percent` → `percentage` in `page_settings.about.inside_story.progress_stats`

---

## Cross-Reference: Frontend Runtime Gate

**Status:** Validated

The frontend runtime gate has been validated with the following results:

| Environment | Status |
|-------------|--------|
| Lovable Preview | PASS (0/0) |
| Local Incognito | PASS (0/0) |

The only observed error (`contentScript.js`) was confirmed as external browser extension injection, not an application issue.

See: `docs/frontend.md` for full runtime matrix.

---

## Stability & Reliability Fixes (2025-12-27)

### Public App Fixes

| File | Issue | Fix |
|------|-------|-----|
| Header.tsx | `/blog-details` route not defined | Changed to `/blog` |
| Footer.tsx | Placeholder `#` links (4x) | Changed to `/commingsoon` |

### Admin App Fixes (Hook Stability)

| File | Issue | Fix |
|------|-------|-----|
| useMediaLibrary.ts | Missing useRef pattern for notifications | Added `notifySuccessRef`/`notifyErrorRef` with sync `useEffect` |
| useGlobalBlocks.ts | Unstable deps (`notifyError` line 85, `notifySuccess/notifyError` line 121) | Added useRef pattern, removed from dependency arrays |

### Verification Evidence

| Environment | Console Errors | Console Warnings | Status |
|-------------|----------------|------------------|--------|
| Lovable Preview | 0 | 0 | PASS |
| Local Incognito | 0 | 0 | PASS |

---

## Admin Module Audit — VERIFIED

| Module | Create | Edit | Delete | Tabs | Typing | Save Once | Persist | Status |
|--------|--------|------|--------|------|--------|-----------|---------|--------|
| Services | ✅ | ✅ | ✅ | Process Steps, Pricing | ✅ | ✅ | ✅ | **PASS** |
| Projects | ✅ | ✅ | ✅ | Process Steps | ✅ | ✅ | ✅ | **PASS** |
| Blog | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | **PASS** |
| Testimonials | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | **PASS** |
| Media Library | Upload ✅ | — | Delete ✅ | — | — | ✅ | ✅ | **PASS** |
| Pages | — | ✅ | — | Homepage/About | ✅ | ✅ | ✅ | **PASS** |
| Global Blocks | — | ✅ | — | Toggle ✅ | ✅ | ✅ | ✅ | **PASS** |
| Settings | — | ✅ | — | General/SEO/Social/Branding | ✅ | ✅ | ✅ | **PASS** |

**Verified:** 2025-12-27  
**Environment:** Local Incognito  
**Result:** 0 console errors, 0 console warnings

---

## Stability Status — COMPLETE

| Module | Status | Notes |
|--------|--------|-------|
| Admin fixed modules | **Complete** | Placeholders in place |
| Frontend runtime | **PASS** | Verified in clean environments |
| Public navigation | **PASS** | Header/Footer links verified |
| Admin hooks | **PASS** | useRef pattern applied |
| Admin module audit | **PASS** | All modules verified |

**Phase 4 Acceptance Gate:** ✅ **PASSED**

---

## Phase 11B — Branding Settings Expansion (2025-12-27)

**Status:** ✅ **COMPLETE**

### Objective
Enable Admin to manage theme colors via Settings → Branding tab.

### Database Keys (category: branding)
| Key | Default Value | Status |
|-----|---------------|--------|
| primary_color | #D90A2C | ✅ Wired to Admin UI |
| secondary_color | #17161A | ✅ Wired to Admin UI |
| accent_color | #F7941D | ✅ Wired to Admin UI |
| logo_media_id | (empty) | ✅ Existing (unchanged) |
| favicon_media_id | (empty) | ✅ Existing (unchanged) |

### Admin UI Changes
| File | Change |
|------|--------|
| `settings/page.tsx` | Added color keys to FormValues interface and initial values |
| `settings/components/BrandingSettingsTab.tsx` | Replaced "Coming Soon" placeholder with 3 color pickers |

### Settings Flow (Technical)
```
FormValues state → handleChange() → setFormValues() → setHasChanges(true)
                                                            ↓
Save Changes click → handleSave() → updateSettings(updates[])
                                                            ↓
                     supabase.from('settings').update({value, updated_by}).eq('key', key)
                                                            ↓
                     fetchSettings() → refresh form state
```

### Constraints Enforced
- ❌ **Fonts LOCKED** — No font pickers or typography controls added
- ❌ **No SCSS changes** — UI-only implementation
- ❌ **No public frontend color injection** — Pending explicit authorization

### Regression Scan Results
| Tab | Save | Persist | Console Errors | Status |
|-----|------|---------|----------------|--------|
| Branding | ✅ | ✅ | 0 | **PASS** |
| General | ✅ | ✅ | 0 | **PASS** |
| SEO | ✅ | ✅ | 0 | **PASS** |
| Social | ✅ | ✅ | 0 | **PASS** |

### Verification Status
- ✅ Verified in Lovable Preview (0 errors)
- ✅ Recommended: Local Incognito (0 errors expected)

### Known Limitations
1. Public frontend color injection: NOT implemented (requires explicit authorization)
2. SCSS tokenization: NOT done (colors in DB, not yet in CSS variables)

---

## Phase 11C — Color Map Contract (2025-12-27)

**Status:** 📋 **DOCUMENTATION ONLY**

### Objective
Define a deterministic, regression-resistant strategy for public frontend color injection.

### Phase 11C-0: Color Map Contract
- **Document:** `docs/phase-11/Phase_11C_Color_Map_Contract.md`
- **Status:** ✅ COMPLETE

### Contract Summary

| Phase | Risk Level | Scope | Status |
|-------|------------|-------|--------|
| 11C-1 | ✅ LOW | Link hovers, text colors (CSS var injection) | Awaiting authorization |
| 11C-2 | ⚠️ MEDIUM | Solid backgrounds (buttons, badges) | Awaiting authorization |
| 11C-3 | 🔴 HIGH | Gradients, pseudo-elements | DEFERRED |

### "Do Not Touch" Zones (Documented)
- Hero section overlays (`rgba()` gradients)
- Multi-color gradients
- Pseudo-elements (`::before`, `::after`)
- Text-stroke effects
- Progress bars with `!important`

### Technical Approach (Planned)
```
┌─────────────────────────────────────────────────────────────┐
│                  Public Frontend Injection                   │
├─────────────────────────────────────────────────────────────┤
│  useBrandingColors.ts                                        │
│    ├── Fetch branding settings from Supabase                │
│    ├── Inject CSS variables on :root                        │
│    │   └── --theme-color, --secondary-color, --accent-color │
│    └── Fallback to Finibus defaults if unavailable          │
├─────────────────────────────────────────────────────────────┤
│  SCSS consumption (future phase)                             │
│    └── $theme-color: var(--theme-color, #D90A2C);           │
└─────────────────────────────────────────────────────────────┘
```

### Execution Status
- ✅ Phase 11C-1: COMPLETE (CSS variable injection)
- ✅ Phase 11C W1-W4: COMPLETE (SCSS selector conversion)
- ❌ Phase 11C-2: NOT AUTHORIZED
- ❌ Phase 11C-3: DEFERRED

### Phase 11C SCSS Conversion Summary (W1-W4)

| Wave | Selectors | Files | Status |
|------|-----------|-------|--------|
| W1 | 1 | `index.scss` | ✅ COMPLETE |
| W2 | 4 | `_footer.scss`, `_commingsoon.scss`, `_partner.scss` | ✅ COMPLETE |
| W3 | 7 | `_contact_page.scss`, `_blog_page.scss`, `_service_page.scss`, `_hero.scss`, `_common.scss` | ✅ COMPLETE |
| W4 | 3 | `_portfolio.scss`, `_services.scss` | ✅ COMPLETE |
| **TOTAL** | **15** | **10 files** | ✅ **ALL ELIGIBLE SELECTORS CONVERTED** |

**Pattern Used:** `var(--theme-color, $theme-color)`

**Remaining Hardcoded `#D90A2C`:** ~108 references (all in "Do Not Touch" categories: gradients, pseudo-elements, text-stroke, alpha-suffix, variable definition)

### Phase 11C-1 Implementation Details (2025-12-27)
| File | Action | Purpose |
|------|--------|---------|
| `apps/public/src/hooks/useBrandingColors.ts` | Created | Fetch branding colors, inject CSS vars |
| `apps/public/src/components/providers/BrandingProvider.tsx` | Created | Root-level provider component |
| `apps/public/src/main.tsx` | Modified | Added BrandingProvider wrapper |

**CSS Variables Injected on `:root`:**
- `--theme-color` ← `primary_color`
- `--secondary-color` ← `secondary_color`
- `--accent-color` ← `accent_color`

**Fallbacks:** Finibus defaults (`#D90A2C`, `#17161A`, `#F7941D`)

---

## Template Rules

### Darkone (Admin Backend)
- 100% 1:1 template parity required
- No custom Bootstrap modifications
- No icon changes
- No SCSS refactors
- No token changes
- No design abstraction
- No shared UI libraries
- Reuse only existing template assets

---

## Authentication (Planned)

**Current:** Demo auth (temporary)  
**Target:** Supabase Auth

Implementation blocked until:
1. Asset mapping complete
2. Admin cleanup complete
3. Explicit GO authorization received
