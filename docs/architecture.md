# Architecture Documentation

**Status:** Draft  
**Phase:** Planning Only  
**Execution:** Not Authorized

---

## Overview

This document outlines the architecture decisions and validation requirements for the Devmart project.

---

## Project Structure

- **Public Frontend:** Finibus template (apps/public or src/)
- **Admin Backend:** Darkone template (apps/admin)
- **Database:** Supabase
- **Authentication:** Supabase Auth (planned, demo auth currently active)

---

## Runtime Validation

### Clean-Environment Testing Requirement

**Mandatory for acceptance:** All runtime validation must be performed in a clean environment before results are accepted.

#### Required Test Environments

1. **Incognito mode** (all extensions disabled)
2. **Clean browser profile** (no extensions, fresh cache)
3. **Lovable Preview** (isolated sandbox)

#### Validation Criteria

- **PASS:** 0 errors, 0 warnings in clean environments
- **External/Out of Scope:** Errors originating from `contentScript.js` or other extension scripts
- **FAIL:** Any error originating from application code (`src/`, `apps/`)

#### Error Attribution Process

1. Capture error in normal browser
2. Reproduce in Incognito mode
3. If error disappears → External (browser extension)
4. If error persists → Application bug (requires fix)

### Stability Fixes Applied (2025-12-27)

**Public App:**
- Header.tsx: Fixed `/blog-details` → `/blog` (route was undefined)
- Footer.tsx: Fixed 4x placeholder `#` links → `/commingsoon`

**Admin App:**
- useMediaLibrary.ts: Applied useRef pattern for `notifySuccess`/`notifyError`
- useGlobalBlocks.ts: Applied useRef pattern, removed unstable deps from `useCallback` arrays

**Result:** All fixes are wiring/stability only, no new features added.

---

## Template Rules

### Finibus (Public Frontend)
- 100% 1:1 template parity required
- No modifications to Bootstrap
- No SCSS refactors
- No token changes

### Darkone (Admin Backend)
- 100% 1:1 template parity required
- Demo auth remains active (Supabase auth planned)
- Dashboard layout and sidebar preserved

---

## Phase Discipline

- Each phase requires explicit GO / NO-GO approval
- No automatic continuation between phases
- All changes must be documented before execution
