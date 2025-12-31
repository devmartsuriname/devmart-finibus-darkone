# Restore Point — Phase 4A: Pages SEO Expansion

**Status:** Complete  
**Phase:** Phase 4A  
**Execution:** Authorized and Complete  
**Timestamp:** 2025-12-31

---

## Objective

Bring Pages module SEO capabilities to full parity with Blog module using same fallback hierarchy and admin UX standards.

---

## Schema Changes

```sql
ALTER TABLE public.pages 
ADD COLUMN og_image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
ADD COLUMN canonical_url TEXT,
ADD COLUMN noindex BOOLEAN DEFAULT false;
```

**New Columns:**
- `og_image_media_id` - Open Graph image for social sharing
- `canonical_url` - Canonical URL override (stored, not used for URL normalization)
- `noindex` - Search engine indexing control

---

## Files Changed

| File | Action | Description |
|------|--------|-------------|
| `src/app/(admin)/content/pages/hooks/usePages.ts` | UPDATE | Added new SEO fields to Page interface and PageUpdateInput |
| `src/app/(admin)/content/pages/hooks/useHomepageBlocks.ts` | UPDATE | Extended seo type with canonical_url and noindex |
| `src/app/(admin)/content/pages/components/PageSeoTab.tsx` | CREATE | New standardized SEO tab component for all pages |
| `src/app/(admin)/content/pages/components/HomepageSeoTab.tsx` | UPDATE | Added canonical_url and noindex fields |
| `src/app/(admin)/content/pages/components/PageEditModal.tsx` | UPDATE | Integrated PageSeoTab for About and Standard pages |

---

## SEO Field Parity (Pages vs Blog)

| Field | Blog | Pages (After) |
|-------|------|---------------|
| meta_title | ✅ | ✅ |
| meta_description | ✅ | ✅ |
| og_image_media_id | ✅ | ✅ |
| canonical_url | ✅ | ✅ |
| noindex | ✅ | ✅ |

---

## Guardian Rules Compliance

| Rule | Status |
|------|--------|
| Frontend FROZEN | ✅ NOT TOUCHED |
| No layout changes | ✅ |
| No routing changes | ✅ |
| No URL normalization | ✅ (canonical stored only) |
| Reuse existing fallback logic | ✅ Same 3-tier hierarchy |
| Documentation mandatory | ✅ |

---

## Rollback Steps

1. Drop new columns:
```sql
ALTER TABLE public.pages 
DROP COLUMN IF EXISTS og_image_media_id,
DROP COLUMN IF EXISTS canonical_url,
DROP COLUMN IF EXISTS noindex;
```

2. Restore files from git:
- `src/app/(admin)/content/pages/hooks/usePages.ts`
- `src/app/(admin)/content/pages/hooks/useHomepageBlocks.ts`
- `src/app/(admin)/content/pages/components/HomepageSeoTab.tsx`
- `src/app/(admin)/content/pages/components/PageEditModal.tsx`

3. Delete new file:
- `src/app/(admin)/content/pages/components/PageSeoTab.tsx`
