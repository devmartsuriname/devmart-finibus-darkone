# Phase 11E / 11F / 11G — Future Execution Specifications

**Status:** NOT AUTHORIZED  
**Phase:** Specification Only  
**Execution:** BLOCKED — Requires explicit authorization  
**Date:** 2025-12-27

---

## Overview

This document defines the scope, risk level, and execution requirements for future branding rollout phases. These phases extend the work completed in Phase 11C (safe selector conversion) and Phase 11D (gradient/overlay design contract).

**No execution is authorized.** This is specification only.

---

## Phase 11E — Safe CTA Gradients (Pattern A)

### Scope

Convert CTA button gradients from multi-color pattern to single-hue primary-derived pattern.

### Current Pattern (Finibus)
```scss
linear-gradient(to right, $theme-color 0%, #ff5722 50%, $theme-color 100%)
```

### Target Pattern (Devmart)
```scss
linear-gradient(to right, var(--theme-color, $theme-color) 0%, var(--theme-color-light, lighten($theme-color, 15%)) 50%, var(--theme-color, $theme-color) 100%)
```

### Selectors (8 total)

| File | Selector |
|------|----------|
| `_services.scss` | `.btn-theme:after` |
| `_services.scss` | `.btn-theme:hover:after` |
| `_commingsoon.scss` | `.comingsoon-form button:after` |
| `_commingsoon.scss` | `.comingsoon-form button:hover:after` |
| `_contact_page.scss` | `.btn-theme:after` |
| `_contact_page.scss` | `.btn-theme:hover:after` |
| `_hero.scss` | `.btn-theme:after` |
| `_hero.scss` | `.btn-theme:hover:after` |

### Risk Level

⚠️ **MEDIUM**

**Rationale:**
- Pseudo-element gradients are visually prominent
- Requires consistent light-variant calculation
- Affects interactive hover states

### Execution Requirements

1. **Restore Point:** Mandatory before execution
2. **SCSS Variable:** Define `$theme-color-light` in `_variables.scss`
3. **CSS Variable:** Inject `--theme-color-light` via `useBrandingColors.ts`
4. **Batch Size:** Maximum 4 selectors per wave
5. **Verification:** SCSS compile + console + visual review

### Guardian Constraints

| Constraint | Status |
|------------|--------|
| Fonts LOCKED | ✅ ENFORCED |
| No layout changes | ✅ ENFORCED |
| No new SCSS files | ✅ ENFORCED |
| No admin modifications | ✅ ENFORCED |

### Hard Stop Language

After Phase 11E completion, STOP. Do not proceed to 11F without explicit authorization.

---

## Phase 11F — Complex Overlays (Hero, Radial, RGBA)

### Scope

Convert hero section overlays and radial gradients to use RGB variable pattern for opacity support.

### Current Pattern (Finibus)
```scss
linear-gradient(to right, rgba($theme-color, 0.9) 0%, rgba($theme-color, 0.7) 50%, rgba($theme-color, 0.9) 100%)
```

### Target Pattern (Devmart)
```scss
linear-gradient(to right, rgba(var(--theme-color-rgb, 217, 10, 44), 0.9) 0%, rgba(var(--theme-color-rgb, 217, 10, 44), 0.7) 50%, rgba(var(--theme-color-rgb, 217, 10, 44), 0.9) 100%)
```

### Selectors (7 total)

| File | Selector | Type |
|------|----------|------|
| `_hero.scss` | `.hero-section::before` | Linear overlay |
| `_about.scss` | `.about-overlay::before` | Linear overlay |
| `_service_page.scss` | `.service-banner::before` | Linear overlay |
| `_portfolio.scss` | `.portfolio-overlay::before` | Linear overlay |
| `_blog_page.scss` | `.blog-banner::before` | Linear overlay |
| `_hero.scss` | `.hero-decoration` | Radial gradient |
| `_common.scss` | `.section-decoration` | Radial gradient |

### Risk Level

🔴 **HIGH**

**Rationale:**
- Hero sections are first-impression surfaces
- RGBA with CSS variables requires RGB triplet format
- Complex opacity layering
- High visual impact if incorrect

### Execution Requirements

1. **Restore Point:** Mandatory before execution
2. **RGB Variable:** Inject `--theme-color-rgb` as comma-separated triplet (e.g., `30, 179, 107`)
3. **Fallback Pattern:** Must include SCSS variable fallback for compilation
4. **Batch Size:** Maximum 2 selectors per wave (due to high risk)
5. **Verification:** SCSS compile + console + visual review on all hero sections

### Guardian Constraints

| Constraint | Status |
|------------|--------|
| Fonts LOCKED | ✅ ENFORCED |
| No layout changes | ✅ ENFORCED |
| No new SCSS files | ✅ ENFORCED |
| No admin modifications | ✅ ENFORCED |
| No swiper/pagination | ✅ ENFORCED |

### Hard Stop Language

After Phase 11F completion, STOP. Do not proceed to 11G without explicit authorization.

---

## Phase 11G — Alpha / Opacity Decorative Surfaces

### Scope

Convert remaining brand-colored pseudo-elements (`::before`, `::after`) that use the primary color for decorative accents.

### Target Pattern
```scss
background-color: var(--theme-color, $theme-color);
// or
border-color: var(--theme-color, $theme-color);
```

### Selectors (8 total)

| File | Selector | Usage |
|------|----------|-------|
| `_services.scss` | `.services-item:after` | Decorative underline |
| `_hero.scss` | `.hero-title:after` | Title decoration |
| `_about.scss` | `.about-title:before` | Section marker |
| `_portfolio.scss` | `.portfolio-item:before` | Card overlay |
| `_blog_page.scss` | `.blog-card:after` | Card decoration |
| `_common.scss` | `.section-title:after` | Section title underline |
| `_footer.scss` | `.footer-link:before` | Link decoration |
| `_contact_page.scss` | `.contact-info:after` | Info decoration |

### Risk Level

⚠️ **MEDIUM**

**Rationale:**
- Pseudo-elements are decoration-focused
- Less visually prominent than hero overlays
- Simpler conversion pattern (no opacity needed)

### Execution Requirements

1. **Restore Point:** Mandatory before execution
2. **Pattern:** `var(--theme-color, $theme-color)`
3. **Batch Size:** Maximum 4 selectors per wave
4. **Verification:** SCSS compile + console + visual review

### Guardian Constraints

| Constraint | Status |
|------------|--------|
| Fonts LOCKED | ✅ ENFORCED |
| No layout changes | ✅ ENFORCED |
| No new SCSS files | ✅ ENFORCED |
| No admin modifications | ✅ ENFORCED |

### Hard Stop Language

After Phase 11G completion, STOP. Phase 11 branding rollout is complete.

---

## Summary Table

| Phase | Scope | Selectors | Risk | Status |
|-------|-------|-----------|------|--------|
| 11E | CTA Gradients (Pattern A) | 8 | ⚠️ MEDIUM | NOT AUTHORIZED |
| 11F | Hero Overlays + Radial | 7 | 🔴 HIGH | NOT AUTHORIZED |
| 11G | Pseudo-element Decorations | 8 | ⚠️ MEDIUM | NOT AUTHORIZED |
| **Total** | — | **23** | — | — |

---

## Execution Order Recommendation

```
Phase 11E (CTA Gradients) → Phase 11G (Pseudo-elements) → Phase 11F (Hero Overlays)
```

**Rationale:**
- 11E and 11G are medium-risk, can be executed with confidence
- 11F is high-risk, should be last to minimize regression surface

---

## Authorization Requirements

Each phase requires:
1. Explicit GO authorization from project owner
2. Restore point creation before execution
3. Wave-based incremental rollout
4. Visual verification after each wave
5. Hard stop after phase completion

---

**Document Author:** Lovable AI  
**Specification Date:** 2025-12-27  
**Execution Status:** BLOCKED
