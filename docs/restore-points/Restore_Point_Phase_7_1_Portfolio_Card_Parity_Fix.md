# Restore Point — Phase 7.1: Portfolio Card Image Parity Fix

```
Status: PRE-IMPLEMENTATION
Phase: 7.1 — Portfolio Card UI Parity Fix
Created: 2025-12-25
```

---

## Problem Statement

After wiring dynamic data for projects/portfolio, portfolio card images became smaller and caused layout shift across 3 surfaces:
1. Home "Case Study / Portfolio" slider
2. Projects listing page grid
3. Project Details "Related Project" slider

---

## Root Cause Analysis

### Issue 1: Missing CSS Object-Fit
**File:** `apps/public/src/assets/sass/_portfolio.scss` (lines 113-116)

Current:
```scss
img {
    border-radius: 10px;
    width: 100%;
    max-height: 500px;
}
```

Missing: `height: 100%` and `object-fit: cover` to enforce consistent card sizing with any image aspect ratio.

### Issue 2: Image Priority in Components
Components use `featured_image` first, but this field contains landscape detail-page images (process-banner.jpg, overview-1.jpg) instead of square portfolio thumbnails.

**Affected Files:**
- `apps/public/src/components/pages/Home/PortfolioArea.tsx` (line 30)
- `apps/public/src/components/common/CartFilter.tsx` (line 121)
- `apps/public/src/components/pages/projectDetails/ReletedProject.tsx` (line 103)

### Issue 3: Database Image Assignments
`image_media_id` field contains landscape images instead of square portfolio thumbnails (`portfolio-X.jpg`).

---

## Fix Scope

| Component | Change |
|-----------|--------|
| `_portfolio.scss` | Add `object-fit: cover`, `height` constraints |
| `PortfolioArea.tsx` | Swap image priority: `image` before `featured_image` |
| `CartFilter.tsx` | Swap image priority |
| `ReletedProject.tsx` | Swap image priority |
| DB: projects table | Assign correct portfolio thumbnail UUIDs |

---

## Guardian Compliance

| Rule | Status |
|------|--------|
| `apps/public` only | ✅ |
| No layout restructuring | ✅ (CSS-only for sizing) |
| Finibus DOM 1:1 | ✅ |
| Isolated fix | ✅ (only .portfolio-data img) |

---

## Rollback

Revert the specific CSS additions in `_portfolio.scss` and swap image priority back in the 3 component files.
