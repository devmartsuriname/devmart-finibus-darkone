# Restore Point — Phase 11C-1: Minimal Pilot

**Created:** 2025-12-27  
**Phase:** 11C-1 (Minimal Pilot Execution)  
**Status:** ✅ Pre-Implementation Snapshot

---

## Purpose

This restore point documents the pre-implementation state before Phase 11C-1 changes. Use this to rollback if CSS variable injection causes unexpected issues.

---

## Pre-Implementation State

### Files That Will Be Created
| File | Purpose |
|------|---------|
| `apps/public/src/hooks/useBrandingColors.ts` | Fetch branding colors + inject CSS vars |
| `apps/public/src/components/providers/BrandingProvider.tsx` | Root-level integration component |

### Files That Will Be Modified
| File | Change |
|------|--------|
| `apps/public/src/main.tsx` | Add BrandingProvider wrapper |
| `docs/phase-11/Phase_11C_Color_Map_Contract.md` | Mark 11C-1 as COMPLETE |
| `docs/backend.md` | Document CSS var injection |
| `docs/architecture.md` | Add injection flow |
| `docs/frontend.md` | Update branding status |

---

## Original State: main.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Import styles - isolated to this app only
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

---

## Authorized Scope (What We're Allowed to Do)

- ✅ Create `useBrandingColors.ts` hook
- ✅ Create `BrandingProvider.tsx` component
- ✅ Inject CSS custom properties on `:root`:
  - `--theme-color` → `primary_color`
  - `--secondary-color` → `secondary_color`
  - `--accent-color` → `accent_color`
- ✅ Fallback to Finibus defaults if fetch fails

---

## Forbidden Actions (What We Cannot Do)

- ❌ NO SCSS file modifications
- ❌ NO gradient changes
- ❌ NO Admin CSS/SCSS changes
- ❌ NO font/typography changes (LOCKED)
- ❌ NO selector targeting beyond CSS var injection

---

## Rollback Instructions

If Phase 11C-1 causes issues:

1. **Delete created files:**
   - `apps/public/src/hooks/useBrandingColors.ts`
   - `apps/public/src/components/providers/BrandingProvider.tsx`

2. **Restore main.tsx to original state:**
   - Remove `BrandingProvider` import
   - Remove `<BrandingProvider>` wrapper
   - Keep original structure as shown above

3. **Revert documentation changes:**
   - Restore Phase 11C-1 status to "Awaiting authorization"

---

## Verification Checklist (Post-Rollback)

- [ ] Public app loads without errors
- [ ] No CSS variables on `:root` (back to original state)
- [ ] Console: 0 application errors
- [ ] Network: 0 failed requests

---

## Document Control

| Version | Date | Action |
|---------|------|--------|
| 1.0 | 2025-12-27 | Pre-implementation snapshot created |
