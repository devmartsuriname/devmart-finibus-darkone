# Restore Point — Phase 11F: Full Public App Red Residual Cleanup

**Created:** 2025-12-27  
**Phase:** 11F  
**Purpose:** Full public app red residual cleanup — eliminate ALL remaining hardcoded red UI accents  
**Status:** Pre-Implementation Snapshot

---

## Overview

This restore point documents the state of ALL selectors being modified in Phase 11F for rollback purposes.

---

## Selectors Modified (16 Total)

### 1. Gradient Patterns (4 selectors)

#### _common.scss — Line 372
**Selector:** `.cmn-btn a`
```scss
// BEFORE
background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%);

// AFTER
background: linear-gradient(90deg, var(--theme-color, $theme-color) 1.05%, var(--theme-color-dark, $theme-color-dark) 100%);
```

#### _service_page.scss — Line 249
**Selector:** `.single-price-box h3:before`
```scss
// BEFORE
background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%);

// AFTER
background: linear-gradient(90deg, var(--theme-color, $theme-color) 1.05%, var(--theme-color-dark, $theme-color-dark) 100%);
```

#### _service_page.scss — Line 310
**Selector:** `.pay-btn a`
```scss
// BEFORE
background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%);

// AFTER
background: linear-gradient(90deg, var(--theme-color, $theme-color) 1.05%, var(--theme-color-dark, $theme-color-dark) 100%);
```

#### _service_details.scss — Line 144
**Selector:** `.sidebar-search form button`
```scss
// BEFORE
background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%);

// AFTER
background: linear-gradient(90deg, var(--theme-color, $theme-color) 1.05%, var(--theme-color-dark, $theme-color-dark) 100%);
```

---

### 2. Solid Color References (6 selectors)

#### _footer.scss — Line 55
**Selector:** `address h4:before`
```scss
// BEFORE
border: 1.5px solid #D90A2C;

// AFTER
border: 1.5px solid var(--theme-color, $theme-color);
```

#### _footer.scss — Line 148
**Selector:** `.footer-menu li a:before`
```scss
// BEFORE
background-color: #D90A2C;

// AFTER
background-color: var(--theme-color, $theme-color);
```

#### _testimonial.scss — Line 35
**Selector:** `.swiper-pagination.swiper-pagination-fraction.swiper-pagination-horizontal`
```scss
// BEFORE
color: #D90A2C !important;

// AFTER
color: var(--theme-color, $theme-color) !important;
```

#### _testimonial.scss — Line 48
**Selector:** `.swiper-pagination-total`
```scss
// BEFORE
color: #D90A2C;

// AFTER
color: var(--theme-color, $theme-color);
```

#### _blog.scss — Line 191
**Selector:** `.view-btn a:before`
```scss
// BEFORE
background: #D90A2C;

// AFTER
background: var(--theme-color, $theme-color);
```

#### _blog_page.scss — Line 424
**Selector:** `.blog-quate b:before`
```scss
// BEFORE
border: 1px solid #D90A2C;

// AFTER
border: 1px solid var(--theme-color, $theme-color);
```

---

### 3. Text-Stroke Properties (3 selectors)

#### _common.scss — Line 346
**Selector:** `.title.special h2 b`
```scss
// BEFORE
-webkit-text-stroke: 2px #D90A2C;

// AFTER
-webkit-text-stroke: 2px var(--theme-color, $theme-color);
```

#### _common.scss — Line 428
**Selector:** `.breadcrumb-wrapper h1`
```scss
// BEFORE
-webkit-text-stroke: 2px #D90A2C;

// AFTER
-webkit-text-stroke: 2px var(--theme-color, $theme-color);
```

#### _error_page.scss — Line 39
**Selector:** `.error-content h2`
```scss
// BEFORE
-webkit-text-stroke: 2px #D90A2C;

// AFTER
-webkit-text-stroke: 2px var(--theme-color, $theme-color);
```

---

### 4. Alpha/RGBA Colors (2 selectors)

#### _contact_page.scss — Line 39
**Selector:** `.office-info .icon`
```scss
// BEFORE
background-color: #D90A2C30;

// AFTER
background-color: rgba($theme-color, 0.19);
```

#### _service_details.scss — Line 180
**Selector:** `.single-step .step`
```scss
// BEFORE
border: 1px solid rgba(217, 10, 44, 0.2);

// AFTER
border: 1px solid rgba($theme-color, 0.2);
```

---

### 5. Malformed CSS (1 selector)

#### _partner.scss — Line 150
**Selector:** `.subscribe-form form input[type="submit"]:hover`
```scss
// BEFORE (malformed)
box-shadow: 0 0 20px (#D90A2C 1.05%, #730000 100%);

// AFTER (fixed)
box-shadow: 0 0 20px rgba($theme-color, 0.3);
```

---

## Rollback Instructions

To revert Phase 11F changes:

1. **Open each file listed above**
2. **Locate the specified line number**
3. **Replace the AFTER code with the BEFORE code**
4. **Verify SCSS compilation: 0 errors**
5. **Verify console: 0 errors**

### Files to Rollback (10 files)
- `apps/public/src/assets/sass/_footer.scss` — Lines 55, 148
- `apps/public/src/assets/sass/_common.scss` — Lines 346, 372, 428
- `apps/public/src/assets/sass/_testimonial.scss` — Lines 35, 48
- `apps/public/src/assets/sass/_blog.scss` — Line 191
- `apps/public/src/assets/sass/_blog_page.scss` — Line 424
- `apps/public/src/assets/sass/_contact_page.scss` — Line 39
- `apps/public/src/assets/sass/_partner.scss` — Line 150
- `apps/public/src/assets/sass/_service_details.scss` — Lines 144, 180
- `apps/public/src/assets/sass/_error_page.scss` — Line 39
- `apps/public/src/assets/sass/_service_page.scss` — Lines 249, 310

---

## Verification Checkpoints

After rollback, verify:

| Route | Visual Element | Expected State |
|-------|----------------|----------------|
| `/` | CTA buttons | Red gradient |
| `/about` | Breadcrumb title | Red text-stroke |
| `/service` | Pricing section | Red accents |
| `/blog` | View buttons | Red background |
| `/contact` | Office info icons | Red tint |
| `/error` | Error title | Red text-stroke |

---

## Guardian Rules (Verified)

- ✅ NO font changes
- ✅ NO admin SCSS changes
- ✅ NO new variables (using existing `$theme-color`, `$theme-color-dark`)
- ✅ NO layout alterations
- ✅ Color substitution ONLY
