# Restore Point — Phase 11G-A Fix (Mobile Menu Parity)

**Created:** 2025-12-28
**Phase:** 11G-A Fix
**Status:** Pre-implementation snapshot

---

## Issue Description

Mobile menu is:
- Auto-opening on page load (should be closed)
- Covering entire screen (should be 260px sidebar)
- Overlaying hero content when closed (should be off-canvas)

## Root Cause

Previous fix added non-original CSS properties:
- `display: block;` (line 69)
- `visibility: visible;` (line 85)

These properties are NOT present in the original Finibus template and interfere with the `transform: translateX(-260px)` behavior.

## Files to be Modified

| File | Change |
|------|--------|
| `apps/public/src/assets/sass/style.scss` | Remove non-original CSS properties |
| `apps/public/src/components/common/Header.tsx` | Restore exact Finibus sidebar logic |

## Pre-Fix State (for rollback if needed)

### style.scss (lines 68-95)
```scss
@media#{$responsive-mobile-menu} {
    header .main-nav {
        display: block;
        position: fixed;
        // ... with visibility: visible added
    }
}
```

### Header.tsx sidebar logic
```tsx
const [sidebar, setSidebar] = useState(false);
const showSidebar = () => setSidebar(!sidebar);
<nav className={sidebar ? 'main-nav slidenav' : 'main-nav'}>
```

## Expected Post-Fix State

- Mobile menu hidden off-canvas by default
- Opens only on hamburger click
- 260px left-aligned sidebar when open
- Hero content visible when menu closed

---

## Rollback Instructions

If fix fails, revert to previous commit or restore the pre-fix code shown above.
