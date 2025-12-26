# Restore Point: Public TypeScript Build Fixes

## Created
- **Date:** 2024-12-26
- **Phase:** Frontend Stability / TypeScript Build
- **Fix ID:** TypeScript Build Errors (6 errors in 4 files)

## Purpose
Fix TypeScript build errors caused by:
1. Array vs single object mismatches for Supabase media joins
2. Missing required fields in transformations
3. Invalid property names

## Files Changed

### 1. LatesNewsArea.tsx
- **Error:** `featured_image_url` does not exist on type
- **Fix:** Changed to `featured_image?.public_url`

### 2. useProjects.ts
- **Errors:** 4 type mismatches
- **Fix:** Added `extractMedia` helper, added missing fields (website, start_date, end_date, check_launch_content, check_launch_image, process_steps)

### 3. useProjectDetails.ts
- **Errors:** 3 type mismatches
- **Fix:** Added `extractMedia` helper for media array extraction

### 4. useServices.ts
- **Errors:** 1 type mismatch (missing pricing fields)
- **Fix:** Added show_pricing, pricing_monthly_enabled, pricing_yearly_enabled to select and transformation

## Root Cause
Supabase returns joined relations as arrays even for single-row joins. TypeScript expects single objects based on interface definitions.

## Rollback Instructions
Revert each file to its previous state from git history.

## Verification
Run: `cd apps/public && npm run build`
- PASS = 0 errors, 0 warnings
