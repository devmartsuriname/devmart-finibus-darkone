# Restore Point: Phase 11C-3 — Advanced Surfaces

> **Status:** Draft  
> **Phase:** Planning Only  
> **Execution:** NOT AUTHORIZED (Awaiting approval)  
> **Created:** 2025-12-27  
> **Parent Phase:** Phase 11C (Color Variable Wiring)

---

## 1. Phase Scope Declaration

**Objective:** Extend CSS variable consumption to selected pseudo-elements, decorative accents, and non-critical UI highlights.

**Scope:**
- 10 selectors across 5 files
- Risk levels: 3 LOW, 7 MEDIUM
- No HIGH/CRITICAL risk selectors

**Pattern to apply:**
```scss
// BEFORE
color: $theme-color;
background: $theme-color;

// AFTER
color: var(--theme-color, $theme-color);
background: var(--theme-color, $theme-color);
```

---

## 2. Exact Selectors (No Wildcards)

### File 1: `apps/public/src/assets/sass/_blog_page.scss`

| # | Line | Selector | Current Value | Proposed Change | Risk |
|---|------|----------|---------------|-----------------|------|
| 1 | 510 | `.social-share a:hover` | `color: $theme-color` | `color: var(--theme-color, $theme-color)` | ✅ LOW |
| 2 | 626 | `.reply a:hover` | `color: $theme-color` | `color: var(--theme-color, $theme-color)` | ✅ LOW |
| 3 | 692 | `.comment-form form input[type="submit"]` | `background: $theme-color` | `background: var(--theme-color, $theme-color)` | ⚠️ MEDIUM |
| 4 | 704 | `.comment-form form input[type="submit"]:hover` | `border: 2px solid $theme-color` | `border: 2px solid var(--theme-color, $theme-color)` | ⚠️ MEDIUM |

**Routes affected:** `/blog/:slug`

---

### File 2: `apps/public/src/assets/sass/_home2.scss`

| # | Line | Selector | Current Value | Proposed Change | Risk |
|---|------|----------|---------------|-----------------|------|
| 5 | 73 | `.view-btn a` | `color: $theme-color` | `color: var(--theme-color, $theme-color)` | ✅ LOW |

**Routes affected:** `/` (if home2 layout active)

---

### File 3: `apps/public/src/assets/sass/_project_details.scss`

| # | Line | Selector | Current Value | Proposed Change | Risk |
|---|------|----------|---------------|-----------------|------|
| 6 | 182 | `.project-step:hover b` | `background: $theme-color` | `background: var(--theme-color, $theme-color)` | ⚠️ MEDIUM |
| 7 | 236 | `.swiper-button-next:hover, .swiper-button-prev:hover` | `background-color: $theme-color` | `background-color: var(--theme-color, $theme-color)` | ⚠️ MEDIUM |

**Routes affected:** `/project-details/:slug`

---

### File 4: `apps/public/src/assets/sass/_portfolio.scss`

| # | Line | Selector | Current Value | Proposed Change | Risk |
|---|------|----------|---------------|-----------------|------|
| 8 | 73 | `.swiper-button-next:hover, .swiper-button-prev:hover` | `background-color: $theme-color` | `background-color: var(--theme-color, $theme-color)` | ⚠️ MEDIUM |
| 9 | 31 | `.swiper-pagination-bullet` | `border: 1px solid $theme-color` | `border: 1px solid var(--theme-color, $theme-color)` | ⚠️ MEDIUM |
| 9b | 41 | `.swiper-pagination-bullet:hover` | `background: $theme-color` | `background: var(--theme-color, $theme-color)` | ⚠️ MEDIUM |
| 9c | 49 | `.swiper-pagination-bullet-active` | `background: $theme-color` | `background: var(--theme-color, $theme-color)` | ⚠️ MEDIUM |

**Routes affected:** `/project`, portfolio sections

---

### File 5: `apps/public/src/assets/sass/_commingsoon.scss`

| # | Line | Selector | Current Value | Proposed Change | Risk |
|---|------|----------|---------------|-----------------|------|
| 10 | 156 | `button:hover` | `background-color: $theme-color` | `background-color: var(--theme-color, $theme-color)` | ⚠️ MEDIUM |

**Routes affected:** `/coming-soon` (if route exists)

---

## 3. Explicit "Do Not Touch" List

The following elements are **EXCLUDED** from Phase 11C-3 and must NOT be modified:

### HIGH/CRITICAL Risk Zones

| File | Selector/Element | Reason |
|------|------------------|--------|
| `_common.scss` | `.cursor`, `.cursor-follower` | Cursor elements — complex interaction |
| `_common.scss` | Lines 103, 117, 126, 154 | Cursor hover states |
| `_about.scss` | `.progress-bar`, `.CircularProgressbar` | Progress bars — complex JS interaction |
| `_hero.scss` | All selectors | Hero overlays — visual regression risk |
| `_services.scss` | `-webkit-text-stroke` | Text-stroke effects — browser compat |
| `_partner.scss` | `.partner-btn:hover` | Hardcoded HEX (`#6f6f6f`) |
| `_blog.scss` | `.cmn-btn a` | Gradient background — HIGH risk |
| All files | `linear-gradient()` | All gradient backgrounds |
| All files | `::before`, `::after` with HEX | Pseudo-elements with hardcoded colors |

### Fonts (LOCKED)
- No font-family changes
- No font-size changes
- No typography modifications

### Admin (EXCLUDED)
- No changes to `apps/admin/` or Darkone styling
- No shared UI libraries

---

## 4. Pre-Implementation State (Snapshot)

### File: `_blog_page.scss`
```scss
// Line 510
.social-share a:hover {
  color: $theme-color;
}

// Line 626
.reply a:hover {
  color: $theme-color;
}

// Line 692
.comment-form form input[type="submit"] {
  background: $theme-color;
}

// Line 704
.comment-form form input[type="submit"]:hover {
  border: 2px solid $theme-color;
}
```

### File: `_home2.scss`
```scss
// Line 73
.view-btn a {
  color: $theme-color;
}
```

### File: `_project_details.scss`
```scss
// Line 182
.project-step:hover b {
  background: $theme-color;
}

// Line 236
.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: $theme-color;
}
```

### File: `_portfolio.scss`
```scss
// Line 31
.swiper-pagination-bullet {
  border: 1px solid $theme-color;
}

// Line 41
.swiper-pagination-bullet:hover {
  background: $theme-color;
}

// Line 49
.swiper-pagination-bullet-active {
  background: $theme-color;
}

// Line 73
.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: $theme-color;
}
```

### File: `_commingsoon.scss`
```scss
// Line 156
button:hover {
  background-color: $theme-color;
}
```

---

## 5. Rollback Instructions

### Per-File Rollback

**To rollback any file:**
1. Open the file in editor
2. Find the modified selector
3. Replace `var(--theme-color, $theme-color)` with `$theme-color`
4. Save and verify SCSS compiles
5. Test affected route in browser

### Rollback Commands (Pattern)

```scss
// ROLLBACK: Change this
color: var(--theme-color, $theme-color);

// BACK TO: Original
color: $theme-color;
```

### Full Phase Rollback

If Phase 11C-3 must be completely reverted:

1. **`_blog_page.scss`** — Revert lines 510, 626, 692, 704
2. **`_home2.scss`** — Revert line 73
3. **`_project_details.scss`** — Revert lines 182, 236
4. **`_portfolio.scss`** — Revert lines 31, 41, 49, 73
5. **`_commingsoon.scss`** — Revert line 156

---

## 6. Verification Protocol

### Routes to Test

| Route | Selectors Present |
|-------|-------------------|
| `/` | `.view-btn a` (if home2) |
| `/project` | `.swiper-pagination-bullet`, `.swiper-button-*` |
| `/project-details/:slug` | `.project-step:hover b`, `.swiper-button-*` |
| `/blog/:slug` | `.social-share a`, `.reply a`, `.comment-form input` |
| `/coming-soon` | `button:hover` |

### Acceptance Criteria

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| SCSS compiles | Build log | No SCSS errors |
| CSS vars work | DevTools → Inspect element | Shows `var(--theme-color)` |
| Fallback works | Block Supabase in DevTools | Uses `$theme-color` value |
| Console errors | DevTools Console (Incognito) | 0 application errors |
| Console warnings | DevTools Console | 0 application warnings |
| Visual regression | Visual inspection | No unintended color changes |
| Layout shifts | Visual inspection | No layout changes |
| Contrast | Visual inspection | No contrast regression |
| Interactivity | Click test | All buttons/links functional |

---

## 7. Execution Constraints (Non-Negotiable)

- ❌ **NO** font/typography changes (LOCKED)
- ❌ **NO** Admin CSS/SCSS changes
- ❌ **NO** new CSS/SCSS files
- ❌ **NO** gradient modifications
- ❌ **NO** hero/overlay changes
- ❌ **NO** cursor element changes
- ❌ **NO** progress bar changes
- ❌ **NO** pseudo-elements with hardcoded HEX
- ❌ **NO** refactors or restructuring
- ✅ **ONLY** apply `var(--theme-color, $theme-color)` pattern
- ✅ **ONLY** touch selectors listed in Section 2

---

## 8. Authorization Status

| Step | Status | Date |
|------|--------|------|
| Restore point created | ✅ COMPLETE | 2025-12-27 |
| User review | ⏳ PENDING | — |
| Execution authorized | ❌ NOT YET | — |
| Implementation started | ❌ NOT YET | — |
| Verification passed | ❌ NOT YET | — |
| Phase complete | ❌ NOT YET | — |

---

## 9. Related Documents

- `docs/phase-11/Phase_11C_Color_Map_Contract.md` — Master contract
- `docs/restore-points/Restore_Point_Phase_11C-2_Safe_Surfaces.md` — Previous phase
- `docs/Frontend.md` — Frontend documentation
- `docs/Architecture.md` — System architecture

---

**END OF RESTORE POINT DOCUMENT**

**HARD STOP:** Awaiting explicit authorization to proceed with Phase 11C-3 implementation.
