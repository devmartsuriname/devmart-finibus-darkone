# Restore Point — Phase 11G-A: Mobile Menu Regression Fix

**Created:** 2025-12-28  
**Phase:** 11G-A  
**Status:** Pre-implementation snapshot  
**Scope:** apps/public ONLY

---

## Issue Description

Mobile menu renders open by default instead of hidden. User must click hamburger to see expected behavior.

**Expected:** Menu hidden off-canvas on mobile viewport load  
**Actual:** Menu visible overlapping hero content on initial load

---

## Root Cause Analysis

### Evidence Gathered

| Aspect | Original Finibus | Current apps/public | Status |
|--------|-----------------|---------------------|--------|
| `sidebar` state init | `useState(false)` | `useState(false)` | ✅ MATCH |
| `slidenav` conditional | `sidebar === 1` | `sidebar ? 'slidenav' : ''` | ✅ Functionally equivalent |
| CSS transform hidden | `translateX(-260px)` | `translateX(-260px)` | ✅ MATCH |
| CSS transform visible | `translateX(0)` on `.slidenav` | Same | ✅ MATCH |

### Root Cause Identified

The **JavaScript logic is functionally correct**. The issue is **CSS-based**:

1. The base `.main-nav` style in `_header.scss` (line 47-48) sets `display: inline-block`
2. The mobile override in `style.scss` media query sets `position: fixed` and `transform: translateX(-260px)`
3. **Potential conflict:** The base `display: inline-block` may be interfering with the fixed positioning, OR another CSS rule has higher specificity

### Selector Path
- Element: `header .main-nav`
- Default state (mobile): `transform: translateX(-260px)`
- Open state: `.main-nav.slidenav` → `transform: translateX(0)`

---

## Files to be Modified

### 1. apps/public/src/assets/sass/style.scss
**Lines 68-93 (mobile menu media query section)**

Before:
```scss
header .main-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    padding: 10px 15px !important;
    z-index: 99999;
    height: 100%;
    overflow: auto;
    background: #242424;
    -webkit-transform: translateX(-260px);
    transform: translateX(-260px);
    // ... transitions
}
```

### 2. apps/public/src/assets/sass/_header.scss
**Lines 47-48**

Before:
```scss
.main-nav {
    display: inline-block;
    // ...
}
```

---

## Verification Checklist

After fix implementation, verify:

| Check | Expected |
|-------|----------|
| Mobile load | Menu HIDDEN (off-canvas left) |
| Hamburger click | Menu SLIDES IN from left |
| Hamburger click again | Menu SLIDES OUT |
| No overlap on hero | Content not blocked by menu |
| No console errors | Clean console |
| Desktop header | Unaffected |

---

## Rollback Instructions

If issues arise, restore these files to their pre-11G-A state:
1. `apps/public/src/assets/sass/style.scss`
2. `apps/public/src/assets/sass/_header.scss`

---

## Guardian Rules Compliance

- ✅ apps/public ONLY
- ✅ No branding changes
- ✅ No new color tokens
- ✅ No layout rework beyond menu fix
- ✅ Finibus parity restoration
