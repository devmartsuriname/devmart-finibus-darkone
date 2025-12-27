# Restore Point: Public Warning Elimination

**Created:** 2025-12-27
**Phase:** Frontend Runtime Gate — Warning Elimination
**Status:** Pre-Implementation

---

## Purpose

This restore point documents the state of the codebase BEFORE applying warning elimination fixes for the public frontend application.

---

## Files Modified

| File | Change Type | Purpose |
|------|-------------|---------|
| `apps/public/src/main.tsx` | MODIFY | Add react-router-dom v7 future flags |
| `src/main.tsx` | MODIFY | Add react-router-dom v7 future flags |

---

## Original File States

### apps/public/src/main.tsx (Before)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Import styles - isolated to this app only
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

### src/main.tsx (Before)

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { basePath } from './context/constants.ts'

// Darkone React Template SCSS (primary styles)
import './assets/scss/style.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

---

## Warning Analysis

### 1. React-Router-DOM Future Flags Warnings

**Warning Text:**
```
React Router Future Flag Warning: The `v7_startTransition` future flag will enable new behaviors. 
React Router Future Flag Warning: The `v7_relativeSplatPath` future flag will enable new behaviors.
```

**Source:** `react-router-dom` package v6.x deprecation warnings
**Classification:** Third-party dependency (fixable via configuration)
**Fix:** Add `future` prop to `BrowserRouter` with required flags

### 2. Tailwind CDN Warning

**Warning Text:** `cdn.tailwindcss.com should not be used in production`

**Runtime Evidence (Lovable Preview):**
- Console log search: **No logs found** (warning not present in Lovable Preview)
- Codebase search: **0 matches** in `apps/public/**`
- Only occurrence: `Darkone-React_v1.0/Documentation/index.html` (static docs, not served)

**Classification:** External/Infrastructure (NOT from our code)
**Evidence:**
1. No Tailwind CDN script in `apps/public/index.html`
2. No Tailwind CDN in any runtime source files
3. Warning not reproducible in Lovable Preview environment
4. If present in local, likely browser cache or extension

**Action:** No code change required. Documented as external.

---

## Rollback Instructions

If issues arise after applying changes:

1. Revert `apps/public/src/main.tsx` to original state (remove `future` prop)
2. Revert `src/main.tsx` to original state (remove `future` prop)
3. Rebuild and verify

---

## Guardian Rules Compliance

- ✅ No branding work
- ✅ No layout refactors
- ✅ No typography changes
- ✅ No new CSS/SCSS files
- ✅ No Bootstrap CSS/JS added
- ✅ Root-cause fix only
