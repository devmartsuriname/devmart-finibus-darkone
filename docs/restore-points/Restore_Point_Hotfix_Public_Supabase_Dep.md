# Restore Point: Hotfix — Public App Supabase Dependency

```
Status: CHECKPOINT
Created: 2025-12-23
Phase: 5.2 (Hotfix)
Type: Build Fix
```

---

## Issue

**Error:** `Failed to resolve import "@supabase/supabase-js" from "apps/public/src/lib/supabase.ts"`

**Cause:** The public app (`apps/public`) has its own `package.json` and does not inherit dependencies from the root. The `@supabase/supabase-js` package was not listed in `apps/public/package.json`.

---

## Fix Applied

### 1. Dependency Added

**File:** `apps/public/package.json`

```json
{
  "dependencies": {
    "@ramonak/react-progress-bar": "^5.0.3",
    "@supabase/supabase-js": "^2.89.0",  // ← ADDED
    "react": "^18.3.1",
    ...
  }
}
```

### 2. Documentation Updated

| File | Change |
|------|--------|
| `docs/Backend.md` | Added Section 0 — Public App Supabase Client |
| `docs/Architecture.md` | Added Section 3.3 — Public App Dependencies |

---

## Verification Steps

After applying fix, run:

```bash
cd apps/public
bun install   # or npm install / pnpm install
bun dev       # or npm run dev
```

**Expected Result:**
- No Vite import-analysis errors
- Page loads at `http://localhost:3000`
- Services page fetches data from Supabase

---

## Rollback

If rollback needed:
1. Remove `"@supabase/supabase-js": "^2.89.0"` from `apps/public/package.json`
2. Run `bun install` in `apps/public`
3. Revert docs changes

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| Scope limited to build fix | ✅ |
| No Phase 5.3 started | ✅ |
| No UI/styling changes | ✅ |
| No admin app changes | ✅ |
| No new features | ✅ |

---

## Next Steps

- User runs `cd apps/public && bun install` locally
- User verifies localhost:3000 runs without errors
- Await authorization for Phase 5.3
