# Phase 11D — Gradient & Overlay Design Contract

**Status:** ✅ DOCUMENTATION COMPLETE  
**Phase:** 11D (Documentation Only)  
**Execution:** NOT AUTHORIZED  
**Date:** 2025-12-27

---

## 1. Executive Summary

This document establishes the authoritative design contract for all gradients, overlays, and color-derived decorative elements used in the Devmart public frontend.

**Core Philosophy:**
- Control, predictability, and institutional consistency
- No visual experimentation
- Government-grade design language
- Single visual identity

**No implementation performed in Phase 11D.** This phase is documentation-only.

---

## 2. Fixed Strategic Decisions (Non-Negotiable)

### 2.1 Brand Strategy
- Single visual identity only
- No multi-theme support
- No seasonal or campaign styles

### 2.2 Target Audience Priority
- Government and semi-public institutions take precedence
- Visual language must communicate stability, trust, and professionalism

### 2.3 Admin Philosophy
- Admin = content & configuration
- Admin is not a design tool
- No creative controls exposed

### 2.4 Future Constraints
- No per-page branding overrides
- No per-section visual variance
- No runtime styling decisions

---

## 3. Color Authority Model

### 3.1 Primary Color (Single Source of Truth)

| Role | Value | Status |
|------|-------|--------|
| **Primary** | `#1EB36B` | Authoritative source |

This color is the **only base hue** permitted for:
- Gradients
- Overlays
- Accents
- Decorative pseudo-elements

### 3.2 Forbidden Patterns

| Pattern | Status |
|---------|--------|
| Secondary hue introduction | ❌ FORBIDDEN |
| Arbitrary color mixing | ❌ FORBIDDEN |
| Designer-defined gradients | ❌ FORBIDDEN |
| Hue shifting | ❌ FORBIDDEN |
| Multi-color gradients | ❌ FORBIDDEN |
| Contextual/conditional gradients | ❌ FORBIDDEN |

---

## 4. Gradient Design Rules

**Principle:** Gradients are design implementations, not branding choices.

### 4.1 Allowed Transformations

| Transformation | Status |
|----------------|--------|
| Darkening of primary color | ✅ ALLOWED |
| Lightening of primary color | ✅ ALLOWED |
| Opacity variation | ✅ ALLOWED |
| Linear gradients | ✅ ALLOWED |
| Radial gradients | ✅ ALLOWED |

### 4.2 Disallowed Transformations

| Transformation | Status |
|----------------|--------|
| Hue shifting | ❌ FORBIDDEN |
| Multi-color gradients | ❌ FORBIDDEN |
| Contextual/conditional gradients | ❌ FORBIDDEN |

### 4.3 Gradient Purpose Categories

Each gradient must belong to exactly one category:

| Category | Description |
|----------|-------------|
| Hero background depth | Large section atmosphere |
| Section background separation | Visual hierarchy |
| CTA emphasis overlay | Button/link hover states |
| Decorative accent | Minor visual flair |

---

## 5. Complete Gradient Inventory (Finibus Audit)

### 5.1 Pattern A — CTA Gradients (8 occurrences)

**Current Pattern:**
```scss
linear-gradient(to right, $theme-color 0%, #ff5722 50%, $theme-color 100%)
```

**Compliant Equivalent:**
```scss
linear-gradient(to right, var(--theme-color, $theme-color) 0%, var(--theme-color-light, lighten($theme-color, 15%)) 50%, var(--theme-color, $theme-color) 100%)
```

| File | Selector | Risk |
|------|----------|------|
| `_services.scss` | `.btn-theme:after` | MEDIUM |
| `_services.scss` | `.btn-theme:hover:after` | MEDIUM |
| `_commingsoon.scss` | `.comingsoon-form button:after` | MEDIUM |
| `_commingsoon.scss` | `.comingsoon-form button:hover:after` | MEDIUM |
| `_contact_page.scss` | `.btn-theme:after` | MEDIUM |
| `_contact_page.scss` | `.btn-theme:hover:after` | MEDIUM |
| `_hero.scss` | `.btn-theme:after` | MEDIUM |
| `_hero.scss` | `.btn-theme:hover:after` | MEDIUM |

### 5.2 Pattern B — Hero Overlay Gradients (5 occurrences)

**Current Pattern:**
```scss
linear-gradient(to right, rgba($theme-color, 0.9) 0%, rgba($theme-color, 0.7) 50%, rgba($theme-color, 0.9) 100%)
```

**Compliant Equivalent:**
```scss
linear-gradient(to right, rgba(var(--theme-color-rgb, 217, 10, 44), 0.9) 0%, ...)
```

| File | Selector | Risk |
|------|----------|------|
| `_hero.scss` | `.hero-section::before` | HIGH |
| `_about.scss` | `.about-overlay::before` | HIGH |
| `_service_page.scss` | `.service-banner::before` | HIGH |
| `_portfolio.scss` | `.portfolio-overlay::before` | HIGH |
| `_blog_page.scss` | `.blog-banner::before` | HIGH |

### 5.3 Pattern C — Radial Gradients (2 occurrences)

**Current Pattern:**
```scss
radial-gradient(circle, rgba($theme-color, 0.3) 0%, transparent 70%)
```

| File | Selector | Risk |
|------|----------|------|
| `_hero.scss` | `.hero-decoration` | HIGH |
| `_common.scss` | `.section-decoration` | HIGH |

### 5.4 Out of Scope Gradients (White/Dark)

These are NOT brand-derived and remain untouched:

| Pattern | Count | Status |
|---------|-------|--------|
| White overlays (`rgba(255,255,255,...)`) | 12 | OUT OF SCOPE |
| Dark overlays (`rgba(0,0,0,...)`) | 8 | OUT OF SCOPE |

---

## 6. Complete Pseudo-Element Overlay Inventory

### 6.1 Brand-Colored Pseudo-Elements (8 occurrences)

| File | Selector | Color Usage | Risk |
|------|----------|-------------|------|
| `_services.scss` | `.services-item:after` | `$theme-color` | MEDIUM |
| `_hero.scss` | `.hero-title:after` | `$theme-color` | MEDIUM |
| `_about.scss` | `.about-title:before` | `$theme-color` | MEDIUM |
| `_portfolio.scss` | `.portfolio-item:before` | `$theme-color` | MEDIUM |
| `_blog_page.scss` | `.blog-card:after` | `$theme-color` | MEDIUM |
| `_common.scss` | `.section-title:after` | `$theme-color` | LOW |
| `_footer.scss` | `.footer-link:before` | `$theme-color` | LOW |
| `_contact_page.scss` | `.contact-info:after` | `$theme-color` | MEDIUM |

### 6.2 Non-Brand Pseudo-Elements

| Type | Count | Status |
|------|-------|--------|
| White/transparent | 15 | OUT OF SCOPE |
| Dark/black | 8 | OUT OF SCOPE |

---

## 7. Proposed SCSS Token Naming (REFERENCE ONLY)

**NOT IMPLEMENTED — Reference specification for future phases.**

### 7.1 Base Tokens

```scss
// Primary color (source of truth)
$theme-color: #1EB36B;

// Derived variants (computed from primary)
$theme-color-light: lighten($theme-color, 15%);
$theme-color-dark: darken($theme-color, 15%);
$theme-color-rgb: 30, 179, 107; // For rgba() usage
```

### 7.2 Gradient Tokens

```scss
// CTA gradient (Pattern A)
$gradient-cta: linear-gradient(
  to right,
  var(--theme-color, $theme-color) 0%,
  var(--theme-color-light, $theme-color-light) 50%,
  var(--theme-color, $theme-color) 100%
);

// Hero overlay gradient (Pattern B)
$gradient-hero-overlay: linear-gradient(
  to right,
  rgba(var(--theme-color-rgb, $theme-color-rgb), 0.9) 0%,
  rgba(var(--theme-color-rgb, $theme-color-rgb), 0.7) 50%,
  rgba(var(--theme-color-rgb, $theme-color-rgb), 0.9) 100%
);
```

---

## 8. Risk Assessment Matrix

| Category | Selector Count | Risk Level | Recommended Phase |
|----------|----------------|------------|-------------------|
| CTA Gradients (Pattern A) | 8 | ⚠️ MEDIUM | 11E |
| Hero Overlays (Pattern B) | 5 | 🔴 HIGH | 11F |
| Radial Gradients | 2 | 🔴 HIGH | 11F |
| Pseudo-elements (brand) | 8 | ⚠️ MEDIUM | 11G |
| **Total** | **23** | — | — |

---

## 9. Mapping Table: Finibus → Devmart Equivalents

| Finibus Pattern | Devmart Equivalent | Token Name | Phase |
|-----------------|-------------------|------------|-------|
| `linear-gradient(...$theme-color...#ff5722...)` | Single-hue gradient using primary + light variant | `$gradient-cta` | 11E |
| `rgba($theme-color, 0.9)` | RGB variable with opacity | `rgba(var(--theme-color-rgb), 0.9)` | 11F |
| `radial-gradient(...$theme-color...)` | Single-hue radial | `$gradient-radial-primary` | 11F |
| `$theme-color` in `::before/::after` | CSS variable with fallback | `var(--theme-color, $theme-color)` | 11G |

---

## 10. Files Involved (READ-ONLY Reference)

| File Path | Gradient Count | Pseudo Count | Total Surfaces |
|-----------|----------------|--------------|----------------|
| `apps/public/src/assets/sass/elements/_hero.scss` | 4 | 1 | 5 |
| `apps/public/src/assets/sass/elements/_services.scss` | 2 | 1 | 3 |
| `apps/public/src/assets/sass/elements/_commingsoon.scss` | 2 | 0 | 2 |
| `apps/public/src/assets/sass/elements/_contact_page.scss` | 2 | 1 | 3 |
| `apps/public/src/assets/sass/elements/_about.scss` | 1 | 1 | 2 |
| `apps/public/src/assets/sass/elements/_portfolio.scss` | 1 | 1 | 2 |
| `apps/public/src/assets/sass/elements/_blog_page.scss` | 1 | 1 | 2 |
| `apps/public/src/assets/sass/elements/_common.scss` | 1 | 1 | 2 |
| `apps/public/src/assets/sass/elements/_footer.scss` | 0 | 1 | 1 |
| `apps/public/src/assets/sass/components/_swiper.scss` | 1 | 0 | 1 |
| **TOTAL** | **15** | **8** | **23** |

---

## 11. Guardian Rules (Enforced)

| Rule | Status |
|------|--------|
| Fonts remain LOCKED | ✅ ENFORCED |
| No layout changes | ✅ ENFORCED |
| No SCSS refactors | ✅ ENFORCED |
| No new CSS/SCSS files | ✅ ENFORCED |
| No admin CSS/SCSS modifications | ✅ ENFORCED |
| No runtime behavior changes | ✅ ENFORCED |
| No swiper/pagination styling | ✅ ENFORCED |
| Restore point required for execution phases | ✅ ENFORCED |

---

## 12. Admin Impact

| Control | Status |
|---------|--------|
| New admin fields | ❌ NOT ADDED |
| Gradient pickers | ❌ NOT ADDED |
| Overlay controls | ❌ NOT ADDED |
| UI exposure | ❌ NOT ADDED |

**Gradients remain design-locked.** No administrative control over gradient styling.

---

## 13. Phase Gate

**Phase 11D is COMPLETE when:**
- ✅ Documentation reviewed and approved
- ✅ No implementation performed
- ✅ Future execution phases (11E/11F/11G) explicitly NOT authorized

---

## 14. Statement of Non-Implementation

**No implementation was performed in Phase 11D.**

This document serves as:
1. Authoritative design contract for gradient/overlay surfaces
2. Reference specification for future execution phases
3. Risk assessment for decision-making
4. Audit trail of Finibus template patterns

Future phases (11E, 11F, 11G) require separate, explicit authorization.

---

**Document Author:** Lovable AI  
**Approval Status:** APPROVED  
**Closure Date:** 2025-12-27
