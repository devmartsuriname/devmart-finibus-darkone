# Restore Point — Phase 11 Branding Color Root-Cause Audit

```
Created: 2025-12-26
Phase: Phase 11 — Branding Colors Root-Cause Fix
Trigger: User reported partial/incorrect color changes on frontend
```

---

## 1. Current State (What Is Wrong)

### 1.1 Selectors That Were Overridden (Broken)

| Selector | Override Applied | Problem |
|----------|------------------|---------|
| `.cmn-btn` | `background-color: var(--color-primary)` | Targets wrapper div, not the `<a>` inside. Finibus applies gradient to `.cmn-btn a` |
| `.eg-btn`, `.primary-btn1`, `.quote-btn` | `background-color` | These selectors don't exist in Finibus DOM |
| `.header-area .header-right .quote-btn a` | `background-color` | Finibus uses gradient, not solid color |

### 1.2 Elements That Changed Incorrectly

| Element | Issue |
|---------|-------|
| Wrapper backgrounds | Some parent containers got colored instead of the actual button/element |
| CTA buttons | Solid color override doesn't override `linear-gradient` properly |

### 1.3 Elements That Did NOT Change (Still Hardcoded Red)

| Element | Selector | Property |
|---------|----------|----------|
| CTA button gradients | `.cmn-btn a` | `background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%)` |
| Service icons | `.service-icon i` | `background-color: #D90A2C` |
| Nav active/hover | `.main-nav ul li a.active` | `color: #D90A2C` |
| Title accent lines | `.title span::before` | `background-color: #D90A2C` |
| Subscribe button | Subscribe form input | `background: linear-gradient(...)` |
| Project filter tabs | `.project-filter-tab li.active` | `background: linear-gradient(...)` |
| Hero overlay | Hero section | `linear-gradient with rgba(217,10,44,0.8)` |

---

## 2. Root Cause Analysis

### 2.1 Gradient Override Failure

**Problem:** Finibus buttons use:
```css
.cmn-btn a {
  background: linear-gradient(90deg, #D90A2C 1.05%, #730000 100%);
}
```

**Current Override (Wrong):**
```css
.cmn-btn {
  background-color: var(--color-primary) !important;
}
```

**Why It Fails:**
- Targets `.cmn-btn` (wrapper div), not `.cmn-btn a` (anchor with visual styling)
- Uses `background-color` which doesn't override `background: linear-gradient(...)`
- Need to use `background: var(...) !important` AND `background-image: none !important`

### 2.2 Dead Selectors

These selectors in index.scss don't exist in Finibus:
- `.eg-btn`
- `.primary-btn1`  
- `.quote-btn` (exists but needs different targeting)

### 2.3 Missing Coverage

587 occurrences of `#D90A2C` in Finibus SCSS files. Current override layer covers only ~10 selectors.

---

## 3. Files to Restore (If Rollback Needed)

### 3.1 `apps/public/src/index.scss` — BRANDING OVERRIDES Section

```scss
/* ============================================================
   BRANDING OVERRIDES (DB-driven) — Phase 11 Step 6
   Must load after Finibus styles to take precedence.
   These selectors map Finibus hardcoded colors to CSS variables.
   ============================================================ */

/* Primary CTA Buttons */
.eg-btn,
.primary-btn1,
.quote-btn,
.cmn-btn {
  background-color: var(--color-primary, #D90A2C) !important;
  border-color: var(--color-primary, #D90A2C) !important;
}

.eg-btn:hover,
.primary-btn1:hover,
.quote-btn:hover,
.cmn-btn:hover {
  background-color: var(--color-secondary, #17161A) !important;
  border-color: var(--color-secondary, #17161A) !important;
}

/* Header Quote Button */
.header-area .header-right .quote-btn a,
.header-area .header-right .quote-btn button {
  background-color: var(--color-primary, #D90A2C) !important;
}

/* Section Title Accent Lines */
.title span::before,
.section-title span::before {
  background-color: var(--color-primary, #D90A2C) !important;
}

/* Service Cards Hover */
.single-service:hover,
.service-card:hover {
  border-color: var(--color-primary, #D90A2C) !important;
}

/* Links Primary Color */
a.theme-color,
.theme-color {
  color: var(--color-primary, #D90A2C) !important;
}

/* Footer Accent */
.footer-area .footer-widget h4::after {
  background-color: var(--color-primary, #D90A2C) !important;
}

/* Breadcrumb Active */
.breadcrumb-area .breadcrumb li.active {
  color: var(--color-primary, #D90A2C) !important;
}

/* Play Button */
.play-btn .popup-video {
  background-color: var(--color-primary, #D90A2C) !important;
}

/* Swiper Pagination Active */
.swiper-pagination-bullet-active {
  background-color: var(--color-primary, #D90A2C) !important;
}
```

### 3.2 `apps/public/src/components/common/WhyChooseUsArea.tsx`

Progress bar inline styles using `color-mix()` function.

### 3.3 `apps/public/src/hooks/useBrandingColors.ts`

Current implementation fetches `primary_color`, `secondary_color`, `accent_color` from settings table.

### 3.4 `apps/public/src/components/providers/BrandingProvider.tsx`

Sets CSS variables on `:root`:
- `--color-primary`
- `--color-secondary`
- `--color-accent`

---

## 4. Planned Fix

### 4.1 Correct Button Targeting

```scss
/* Target the actual anchor element, not wrapper */
.cmn-btn a {
  background: var(--color-primary, #D90A2C) !important;
  background-image: none !important; /* Neutralize gradient */
}
```

### 4.2 Add Gradient Token Support (Optional)

If full gradient control is needed:
- Add settings keys: `primary_gradient_start`, `primary_gradient_end`
- Add CSS variables: `--color-primary-grad-start`, `--color-primary-grad-end`
- Override: `background: linear-gradient(90deg, var(--color-primary-grad-start), var(--color-primary-grad-end))`

### 4.3 Expand Coverage

Add overrides for:
- `.service-icon i`
- `.main-nav ul li a.active, .main-nav ul li a:hover`
- `.service-content a`
- `.project-filter-tab li.active, .project-filter-tab li:hover`
- `.subscribe-form form input[type="submit"]`
- `.footer-area .social-list li a:hover`
- `.scroll-top.opacity span`

### 4.4 Remove Dead Selectors

Remove: `.eg-btn`, `.primary-btn1`

---

## 5. Rollback Instructions

If fix introduces new issues:

1. Restore BRANDING OVERRIDES section in `apps/public/src/index.scss` to content in Section 3.1
2. Restore `WhyChooseUsArea.tsx` inline styles to use `color-mix()` with hardcoded fallback
3. No database rollback needed (settings keys remain, values are still valid)

---

## 6. Verification Checklist

After fix, with `primary_color=#4be89b`:

| Element | Expected | Verify |
|---------|----------|--------|
| Header "Get A Quote" button | Green (solid or gradient) | ☐ |
| All `.cmn-btn` CTA buttons | Green background | ☐ |
| Service section icons | Green circular background | ☐ |
| Service "Read More" links | Green text | ☐ |
| Section title accents | Green underline | ☐ |
| Nav active/hover state | Green text | ☐ |
| Progress bars | Green stroke/fill | ☐ |
| Swiper pagination active | Green bullet | ☐ |
| Footer social hover | Green background | ☐ |
| Scroll-to-top button | Green border | ☐ |
| **No unintended backgrounds** | No green containers | ☐ |
