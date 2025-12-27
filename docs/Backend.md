# Backend Documentation

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized

---

## Overview

This document covers the admin backend (Darkone template) and Supabase integration status.

---

## Current State

### Admin Backend (Darkone)
- Demo authentication: **Active** (temporary)
- Supabase authentication: **Planned** (not implemented)
- Dashboard layout: **Preserved**
- Sidebar structure: **Preserved**

### Database (Supabase)
- Connection: **Active**
- Migrations: Applied
- Field name fix: `percent` → `percentage` in `page_settings.about.inside_story.progress_stats`

---

## Cross-Reference: Frontend Runtime Gate

**Status:** Validated

The frontend runtime gate has been validated with the following results:

| Environment | Status |
|-------------|--------|
| Lovable Preview | PASS (0/0) |
| Local Incognito | PASS (0/0) |

The only observed error (`contentScript.js`) was confirmed as external browser extension injection, not an application issue.

See: `docs/frontend.md` for full runtime matrix.

---

## Stability & Reliability Fixes (2025-12-27)

### Public App Fixes

| File | Issue | Fix |
|------|-------|-----|
| Header.tsx | `/blog-details` route not defined | Changed to `/blog` |
| Footer.tsx | Placeholder `#` links (4x) | Changed to `/commingsoon` |

### Admin App Fixes (Hook Stability)

| File | Issue | Fix |
|------|-------|-----|
| useMediaLibrary.ts | Missing useRef pattern for notifications | Added `notifySuccessRef`/`notifyErrorRef` with sync `useEffect` |
| useGlobalBlocks.ts | Unstable deps (`notifyError` line 85, `notifySuccess/notifyError` line 121) | Added useRef pattern, removed from dependency arrays |

### Verification Evidence

| Environment | Console Errors | Console Warnings | Status |
|-------------|----------------|------------------|--------|
| Lovable Preview | 0 | 0 | PASS |
| Local Incognito | Pending user verification | Pending | TBD |

---

## Stability Status

| Module | Status | Notes |
|--------|--------|-------|
| Admin fixed modules | Complete | Placeholders in place |
| Frontend runtime | Validated | PASS in clean environments |
| Public navigation | Fixed | Header/Footer links wired correctly |
| Admin hooks | Stabilized | useRef pattern applied |
| Remaining work | Planned QA | User verification in Local Incognito |

---

## Template Rules

### Darkone (Admin Backend)
- 100% 1:1 template parity required
- No custom Bootstrap modifications
- No icon changes
- No SCSS refactors
- No token changes
- No design abstraction
- No shared UI libraries
- Reuse only existing template assets

---

## Authentication (Planned)

**Current:** Demo auth (temporary)  
**Target:** Supabase Auth

Implementation blocked until:
1. Asset mapping complete
2. Admin cleanup complete
3. Explicit GO authorization received
