# Restore Point: Phase 12.5 — Projects Verification

**Created:** 2025-12-29  
**Phase:** 12.5 — Projects Verification & GAP Fix  
**Status:** Pre-Implementation Snapshot

---

## Scope of Changes

- **File:** `apps/public/src/components/pages/Home/HeroArea.tsx`
- **Change:** Update STATIC_SLIDES fallback `cta2_url` values from `/project-details` to `/project`
- **Lines affected:** 20, 31, 42
- **Reason:** Fix GAP-PROJ-001 (broken CTA links when DB slides are unavailable)

---

## Pre-Check Verification

### DB Hero Slides Status
Query: `SELECT data->'hero'->'slides' FROM homepage_settings WHERE id = 1`

**Result:** DB slides ARE active with correct URLs:
- Slide 1: `cta2_url: "/service"` ✅
- Slide 2: `cta2_url: "/projects"` ✅
- Slide 3: `cta2_url: "/about"` ✅

**Conclusion:** Fix applies to STATIC_SLIDES fallback only (used when DB is unavailable).

---

## Original STATIC_SLIDES Content (Before Fix)

```tsx
const STATIC_SLIDES: HeroSlide[] = [
  {
    image: "/images/hero-slider-1.jpg",
    subtitle: "We Design & Operate",
    title_prefix: "",
    title_highlight: "Digital Systems",
    description: "...",
    cta1_label: "Start a Project",
    cta1_url: "/contact",
    cta2_label: "How we work",
    cta2_url: "/project-details",  // ← BROKEN (no slug)
  },
  {
    image: "/images/hero-slider-2.png",
    subtitle: "We Build for You",
    title_prefix: "Tech",
    title_highlight: "Solutions",
    description: "...",
    cta1_label: "Discover More",
    cta1_url: "/about",
    cta2_label: "How we work",
    cta2_url: "/project-details",  // ← BROKEN (no slug)
  },
  {
    image: "/images/hero-slider-3.png",
    subtitle: "We Integrate & Scale",
    title_prefix: "Smart",
    title_highlight: "Platforms",
    description: "...",
    cta1_label: "Get in Touch",
    cta1_url: "/contact",
    cta2_label: "How we work",
    cta2_url: "/project-details",  // ← BROKEN (no slug)
  },
];
```

---

## Rollback Instructions

If rollback is required, restore the `cta2_url` values in STATIC_SLIDES to `/project-details`:

```tsx
// Line 20
cta2_url: "/project-details",

// Line 31
cta2_url: "/project-details",

// Line 42
cta2_url: "/project-details",
```

---

## Compliance

- ✅ No schema changes
- ✅ No column additions
- ✅ No type changes
- ✅ No component refactors
- ✅ No CSS/SCSS changes
- ✅ Finibus Frontend 1:1 (value-only edit)
- ✅ Darkone Admin 1:1 (no changes)

---

## Files Changed

| File | Change Type |
|------|-------------|
| `apps/public/src/components/pages/Home/HeroArea.tsx` | Value update (3 lines) |
| `docs/Tasks.md` | Documentation |
| `docs/Backend.md` | Documentation |
| `docs/Architecture.md` | Documentation |
