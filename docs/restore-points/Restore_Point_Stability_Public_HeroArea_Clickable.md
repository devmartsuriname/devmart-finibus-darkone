# Restore Point: Public HeroArea Clickable Fix

## Created
- **Date:** 2024-12-26
- **Phase:** Global Stability Audit
- **Fix ID:** FIX #1 (PUBLIC)

## Purpose
Remove invalid `clickable: true` prop from HeroSlider config object to eliminate React warning.

## File Changed
- `apps/public/src/components/pages/Home/HeroArea.tsx`

## Original Code (Lines 58-71)
```tsx
const HeroSlider = {
  slidesPerView: 1,
  speed: 1500,
  spaceBetween: 0,
  loop: true,
  clickable: true,    // ← REMOVED
  autoplay: true,
  effect: "fade" as const,
  centeredSlides: true,
  roundLengths: true,
  fadeEffect: {
    crossFade: true,
  },
};
```

## Fixed Code (Lines 58-70)
```tsx
const HeroSlider = {
  slidesPerView: 1,
  speed: 1500,
  spaceBetween: 0,
  loop: true,
  autoplay: true,
  effect: "fade" as const,
  centeredSlides: true,
  roundLengths: true,
  fadeEffect: {
    crossFade: true,
  },
};
```

## Root Cause
`clickable` is a pagination-specific prop, not a valid Swiper root config prop. When spread onto the Swiper component, React warns about passing a non-boolean attribute.

## Rollback Instructions
1. Open `apps/public/src/components/pages/Home/HeroArea.tsx`
2. Add `clickable: true,` after line 62 (`loop: true,`)
3. Verify hero slider still functions

## Verification
- Console: 0 warnings, 0 errors on Home page
- HeroArea renders correctly with pagination bullets clickable
