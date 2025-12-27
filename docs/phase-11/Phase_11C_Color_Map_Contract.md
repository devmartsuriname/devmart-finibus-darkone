# Phase 11C — Color Map Contract & Injection Strategy

> **Status:** 📋 DOCUMENTATION ONLY  
> **Phase:** 11C-0 (Planning)  
> **Execution:** ❌ NOT AUTHORIZED  
> **Last Updated:** 2025-12-27

---

## 1. Token Roles (Database Keys — Already Exist)

| Token | Default Value | Purpose | Origin |
|-------|---------------|---------|--------|
| `primary_color` | `#D90A2C` | Primary brand color (maps to `$theme-color`) | Finibus `_variables.scss` |
| `secondary_color` | `#17161A` | Secondary/dark color (headings, backgrounds) | Finibus `$black` |
| `accent_color` | `#F7941D` | Accent highlights (badges, stars) | Complementary orange |

**Fonts Status:** ❌ LOCKED — No typography tokens, no font controls

---

## 2. Scope Boundary

**Application Target:** PUBLIC FRONTEND ONLY (`apps/public/`)

### Explicit Exclusions

- ❌ Darkone Admin SCSS/CSS — NOT touched, NOT mixed
- ❌ Admin UI styling — NO changes beyond Settings form
- ❌ Shared component libraries — NOT created
- ❌ Font/typography system — LOCKED

### Separation Enforcement

- Public frontend: `apps/public/src/`
- Admin backend: `src/app/(admin)/`
- No cross-pollination of styles

---

## 3. Selector Coverage Strategy

### 3.1 Phase 11C-1: Minimal Pilot Surface (SAFE)

**Target:** Primary CTA buttons + basic link hover states only

| Selector | File | Current Value | Risk Level |
|----------|------|---------------|------------|
| `.cmn-btn a` (background) | `_common.scss:372` | `linear-gradient(90deg, #D90A2C, #730000)` | ⚠️ MEDIUM (gradient) |
| Link hover states (color) | Multiple files | `$theme-color` / `#D90A2C` | ✅ LOW |
| `.breadcrumb-wrapper span a` | `_common.scss:445` | `$theme-color` | ✅ LOW |

**Phase 11C-1 Scope:**

- Wire `--theme-color` CSS variable to existing `$theme-color` references
- Start with **solid color** selectors only (not gradients)
- Test on: Header nav hover, footer link hover, breadcrumb links

**Files Affected (Pilot):**

- `apps/public/src/assets/sass/_header.scss` — Nav hover/active states
- `apps/public/src/assets/sass/_footer.scss` — Link hover states
- `apps/public/src/assets/sass/_common.scss` — Breadcrumb links

### 3.2 Phase 11C-2: Expand to Secondary Surfaces (MEDIUM RISK)

**Target:** Badges, active nav states, form submit buttons

| Selector | File | Current Value | Risk Level |
|----------|------|---------------|------------|
| `input[type="submit"]` | `_contact_page.scss:151` | `$theme-color` | ⚠️ MEDIUM |
| `.signle-news:hover .tag a` | `_blog.scss:67` | `$theme-color` | ⚠️ MEDIUM |
| `.nav-link.active` | `_service_page.scss:189` | `linear-gradient(90deg, #D90A2C, #730000)` | ⚠️ HIGH |

**Approach:**

- Test each selector in isolation
- Verify hover/active states don't regress
- Do NOT touch gradient backgrounds yet

### 3.3 Phase 11C-3: Advanced Surfaces (HIGH RISK — DEFERRED)

**These require explicit authorization and may stay hardcoded:**

| Selector | File | Current Value | Risk Level | Recommendation |
|----------|------|---------------|------------|----------------|
| `.hero-content` gradient | `_hero.scss:146` | `rgba(217, 10, 44, 0.8)` | 🔴 HIGH | DEFER |
| `-webkit-text-stroke` | `_common.scss:346, 428` | `#D90A2C` | 🔴 HIGH | DEFER |
| Progress bar circles | `_about.scss:244-258` | `$theme-color !important` | 🔴 HIGH | DEFER |
| Service icon backgrounds | `_services.scss:130` | `#D90A2C` | 🔴 HIGH | DEFER |

---

## 4. "Do Not Touch" List (High Regression Zones)

| Area | Files | Reason | Risk |
|------|-------|--------|------|
| **Hero Section Overlays** | `_hero.scss` | Complex `rgba()` gradients with specific opacity | 🔴 CRITICAL |
| **Gradients** | `_common.scss`, `_service_page.scss`, `_project_page.scss` | Multi-color stops, hardcoded HEX | 🔴 CRITICAL |
| **Pseudo-elements (::before, ::after)** | Multiple files | Decorative borders, lines, shapes | 🔴 HIGH |
| **Text-stroke effects** | `_common.scss`, `_error_page.scss` | Browser-specific, hardcoded | 🔴 HIGH |
| **Progress Bars** | `_about.scss` | Complex transforms, `!important` overrides | 🔴 HIGH |
| **Service Icon Circles** | `_services.scss` | Radial gradients, opacity layers | 🔴 HIGH |
| **Testimonial Pagination** | `_testimonial.scss` | Swiper-specific, hardcoded | ⚠️ MEDIUM |

**Rule:** These areas remain hardcoded until a dedicated Phase explicitly maps and tests each selector.

---

## 5. Incremental Rollout Plan

### Phase 11C-1: Minimal Pilot (REQUIRES AUTHORIZATION)

**Objective:** Inject `--theme-color` for link/text hover states only

**Steps:**

1. Create `apps/public/src/hooks/useBrandingColors.ts` (fetch + inject CSS vars)
2. Integrate in public app root (e.g., `App.tsx` or layout)
3. Update ONLY solid color hover states (not backgrounds, not gradients)
4. Verify on 3 routes: Homepage, About, Contact

**Selector Target List (Pilot):**

```scss
// These use $theme-color for text color on hover — SAFE
.main-nav ul li a:hover { color: var(--theme-color); }
.footer-area .quick-links li a:hover { color: var(--theme-color); }
.breadcrumb-wrapper span a { color: var(--theme-color); }
```

**Success Criteria:**

- Link hovers use DB color
- 0 visual regressions on other elements
- 0 console errors
- Fallback to `#D90A2C` if DB unavailable

### Phase 11C-2: Secondary Surfaces (SEPARATE AUTHORIZATION)

**Objective:** Extend to submit buttons, badges, active states

**Selector Target List:**

```scss
// These use $theme-color as background — MEDIUM RISK
input[type="submit"] { background-color: var(--theme-color); }
.tag a:hover { background-color: var(--theme-color); }
```

**Explicitly Excluded:**

- Gradient backgrounds (remain hardcoded)
- Hero overlays (remain hardcoded)

### Phase 11C-3: Advanced Surfaces (OPTIONAL — DEFERRED)

**Objective:** Only if Phase 11C-1 and 11C-2 pass without regression

**Deferred Items:**

- Gradients require SCSS function or CSS variable fallback strategy
- `rgba()` variants require SCSS color functions or manual mapping
- Text-stroke requires browser testing

**Decision Point:** After Phase 11C-2, evaluate if advanced surfaces are worth the risk.

---

## 6. Verification Protocol (Per Sub-Phase)

### Pre-Implementation (MANDATORY)

- [ ] Restore point created: `docs/restore-points/Restore_Point_Phase_11C-X.md`
- [ ] Target selectors documented
- [ ] Fallback values confirmed

### Post-Implementation (MANDATORY)

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| **Route scan** | Visit: `/`, `/about`, `/contact`, `/services`, `/projects` | No visual breakage |
| **Console errors** | DevTools Console (Incognito) | 0 application errors |
| **Network errors** | DevTools Network | 0 failed settings fetch |
| **Hover states** | Manual interaction | Colors match DB values |
| **Fallback test** | Block Supabase request | Falls back to `#D90A2C` |
| **Save round-trip** | Admin: change color → public: verify | Color updates on refresh |

---

## 7. Technical Implementation Approach (Phase 11C-1 Only)

**File:** `apps/public/src/hooks/useBrandingColors.ts`

**Responsibilities:**

- Fetches branding colors from settings table
- Injects CSS custom properties on `:root`
- Falls back to Finibus defaults if unavailable

**Integration Point:** Root layout or `App.tsx`

**CSS Variable Names:**

- `--theme-color` (maps to `primary_color`)
- `--secondary-color` (maps to `secondary_color`)
- `--accent-color` (maps to `accent_color`)

**SCSS Consumption (Future Phase):**

```scss
// Eventually, in _variables.scss or component SCSS:
// $theme-color: var(--theme-color, #D90A2C);
```

**Phase 11C-1 does NOT modify SCSS files.** It only injects CSS variables that can be consumed by future SCSS updates.

---

## 8. Risk Summary

| Phase | Risk Level | Scope | Approach |
|-------|------------|-------|----------|
| **11C-1** | ✅ LOW | Link hovers, text colors | CSS var injection only |
| **11C-2** | ⚠️ MEDIUM | Solid backgrounds | Test in isolation |
| **11C-3** | 🔴 HIGH | Gradients, pseudo-elements | DEFER unless mapped |

---

## 9. Documentation Updates (After Each Sub-Phase)

| File | Update |
|------|--------|
| `docs/backend.md` | Note CSS var injection mechanism |
| `docs/architecture.md` | Add Admin → DB → Public color flow |
| `docs/frontend.md` | Document which selectors are wired |
| Restore point | Create before each sub-phase |

---

## 10. Governance & Hard Stops

### Phase 11C-0 (This Document)

- ❌ NO code changes
- ✅ Documentation only
- ✅ Mapping and strategy

### Phase 11C-1 (Requires Explicit Authorization)

- Create `useBrandingColors.ts`
- Integrate in public app
- NO SCSS modifications
- NO gradient changes

### Phase 11C-2 (Separate Authorization)

- Extend to solid backgrounds
- NO gradient changes
- Test each selector

### Phase 11C-3 (Deferred)

- Only if 11C-1 and 11C-2 pass
- Requires dedicated gradient strategy

---

## Document Control

| Version | Date | Status | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-27 | ✅ COMPLETE | Initial Color Map Contract — Phase 11C-0 |
