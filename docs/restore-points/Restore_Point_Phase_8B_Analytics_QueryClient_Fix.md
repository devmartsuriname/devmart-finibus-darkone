# Restore Point: Phase 8B Analytics QueryClient Fix

**Created:** 2026-01-02
**Phase:** 8B — Analytics Module Runtime Fix
**Trigger:** "No QueryClient set" error on /analytics page

---

## Issue Description

The Analytics page crashed with:
```
No QueryClient set, use QueryClientProvider to set one
```

## Root Cause

- `useAnalyticsStats.ts` used `@tanstack/react-query` (`useQuery`)
- The admin app's `AppProvidersWrapper` has no `QueryClientProvider`
- Dashboard works because `useDashboardStats.ts` uses `useState` + `useEffect` pattern

## Fix Applied

**Strategy A (Parity-safe):** Rewrote `useAnalyticsStats.ts` to match Dashboard pattern:
- Removed `useQuery` import
- Implemented `useState` for data, loading, error states
- Implemented `useEffect` for data fetching on mount
- Maintained same return signature for page compatibility

## Files Changed

| File | Change |
|------|--------|
| `src/app/(admin)/analytics/hooks/useAnalyticsStats.ts` | Rewritten to useState + useEffect pattern |

## Rollback Instructions

If rollback is needed, restore `useAnalyticsStats.ts` to use `useQuery` pattern and add `QueryClientProvider` to `AppProvidersWrapper`.

---

## Pre-Fix State (useAnalyticsStats.ts)

```typescript
import { useQuery } from '@tanstack/react-query'
// ... used useQuery({ queryKey, queryFn })
```

## Post-Fix State

```typescript
import { useState, useEffect } from 'react'
// ... uses useState + useEffect pattern matching useDashboardStats.ts
```
