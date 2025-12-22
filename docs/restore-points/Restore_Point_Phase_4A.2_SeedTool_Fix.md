# Restore Point — Phase 4A.2 Seed Tool Fix

```
Created: 2025-12-22
Phase: 4A.2 — Media Library Seeding
Objective: Fix Media Seed Tool for deterministic asset paths and text-only UI
```

---

## 1. Pre-Change State

### 1.1 Bug Symptoms

| Issue | Description |
|-------|-------------|
| Path resolution | `sourcePath` entries use `/finibus/public/images/...` which is NOT served by the app at runtime |
| Icon dependency | Uses `IconifyIcon` component for UI elements (user requested text-only) |
| Toast icons | `react-toastify` shows icons in success/error messages |
| Untested runtime | Asset paths have not been validated in Lovable preview environment |

### 1.2 Root Causes

| Issue | Root Cause |
|-------|------------|
| Path resolution | Finibus assets are in `finibus/public/images/` but app only serves from `public/` |
| Asset fetch fails | `fetch('/finibus/public/images/...')` returns 404 at runtime |
| Icons present | Component uses IconifyIcon imports and emoji characters |

### 1.3 Files Before Change

| File | State |
|------|-------|
| `src/app/(admin)/content/media/components/MediaSeedTool.tsx` | Uses IconifyIcon, paths point to `/finibus/public/images/` |
| `src/app/(admin)/content/media/page.tsx` | Uses IconifyIcon for empty state |
| `public/` | Contains only favicon.ico, placeholder.svg, robots.txt |

---

## 2. Planned Changes

### 2.1 Asset Strategy (Option A — Deterministic)

Copy required Finibus seed assets to `public/seed/finibus/` so they are served at runtime.

**Path convention:**
```
public/seed/finibus/hero/hero-slider-1.jpg
public/seed/finibus/portfolio/portfolio-1.jpg
...etc
```

**Runtime access:**
```
fetch('/seed/finibus/hero/hero-slider-1.jpg')
```

### 2.2 MediaSeedTool.tsx Changes

| Change | Before | After |
|--------|--------|-------|
| Title icon | `<IconifyIcon icon="bx:package" />` | Text: "Media Seed Tool" |
| Button icon | `<IconifyIcon icon="bx:upload" />` | Text: "Start Seeding" |
| Success emoji | `✅` | Text: "Success:" |
| Warning emoji | `⚠️` | Text: "Warning:" |
| Toast icons | Default icons | `icon: false` |
| Source paths | `/finibus/public/images/...` | `/seed/finibus/...` |

### 2.3 Files to Modify

| File | Action |
|------|--------|
| `public/seed/finibus/*` | Create (copy Finibus assets) |
| `MediaSeedTool.tsx` | Update paths, remove icons |
| `docs/Backend.md` | Update seeding documentation |
| `docs/Architecture.md` | Update seeding status |

---

## 3. Verification Checklist

| Check | Expected |
|-------|----------|
| MediaSeedTool renders | Text-only, no icons |
| "Start Seeding" button visible | Text button |
| Assets fetchable at runtime | `/seed/finibus/...` returns 200 |
| All 38 assets upload | Supabase Storage populated |
| 38 DB rows created | `media` table has entries |
| Media list shows files | Thumbnails visible |
| No console errors | Clean console |
| apps/public untouched | No changes |

---

## 4. Rollback

To rollback:
1. Delete `public/seed/` directory
2. Revert `MediaSeedTool.tsx` to previous version
3. Revert documentation changes

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-22 | Implementation Agent | Pre-fix restore point |
