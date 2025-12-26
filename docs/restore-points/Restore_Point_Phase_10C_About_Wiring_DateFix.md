# Restore Point: Phase 10C — About Page Wiring Date Fix

**Created:** 2025-12-26
**Phase:** 10C — Build Blocker Hotfix
**Status:** Pre-fix snapshot

---

## Root Cause

- `apps/public/src/components/pages/aboutUs/LatesNewsArea.tsx` imported `date-fns` library
- `date-fns` is not available in the `apps/public` workspace
- Vite fails with: `Failed to resolve import "date-fns"`
- This blocks the entire public app from running

## Impacted File

- `apps/public/src/components/pages/aboutUs/LatesNewsArea.tsx`

## Fix Approach

- Remove `import { format } from "date-fns";`
- Replace with native `Intl.DateTimeFormat` implementation
- Output format: `DD Month, YYYY` (e.g., "05 January, 2021")
- Defensive handling for null/invalid dates

## Scope Statement

- **apps/public only** — no admin changes
- **No new dependencies** — using native JavaScript APIs
- **No CSS/Bootstrap changes** — formatting logic only
- **Finibus parity maintained** — date format matches demo

## Rollback Instructions

If issues occur, restore `LatesNewsArea.tsx` to the version that used hardcoded post data without date formatting, or revert to the previous commit before Phase 10C wiring changes.
