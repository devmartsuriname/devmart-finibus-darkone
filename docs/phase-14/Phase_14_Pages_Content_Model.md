# Phase 14 — Pages Content Model

**Status:** 📋 PLANNING APPROVED — NOT AUTHORIZED FOR EXECUTION  
**Type:** Schema Extension + Admin UI + Public Frontend Wiring  
**Planning Approved:** 2026-01-05  
**Last Updated:** 2026-01-05

---

## 1. Objective

Enable CMS-driven content management for all static pages (legal pages, etc.) through the Admin Pages module.

**Goal:** Admin becomes the single source of truth for static page content and SEO metadata.

**Scope:**
- Wire legal pages (Privacy Policy, Terms of Use, Support Policy, Terms of Service) to database
- Extend `pages` table with `content` column
- Add Content tab to PageEditModal for legal pages
- Preserve 1:1 Finibus visual parity on public frontend

---

## 2. Current State (Pre-Phase 14)

### 2.1 Legal Pages (Frontend)

| Page | Route | Content Source | Status |
|------|-------|----------------|--------|
| Privacy Policy | `/privacy-policy` | Hardcoded React HTML | ✅ Static |
| Terms of Use | `/terms-of-use` | Hardcoded React HTML | ✅ Static |
| Support Policy | `/support-policy` | Hardcoded React HTML | ✅ Static |
| Terms of Service | `/terms-of-service` | Hardcoded React HTML | ✅ Static |

### 2.2 Database (`pages` table)

**Current Schema:**

| Column | Type | Purpose |
|--------|------|---------|
| id | UUID | Primary key |
| slug | TEXT | URL identifier (immutable) |
| title | TEXT | Page title |
| meta_title | TEXT | SEO title override |
| meta_description | TEXT | SEO description override |
| og_image_media_id | UUID FK | OG image reference |
| canonical_url | TEXT | Canonical URL |
| noindex | BOOLEAN | Search engine exclusion |
| is_published | BOOLEAN | Publication status |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Missing Column:**

| Column | Type | Purpose |
|--------|------|---------|
| content | TEXT | ❌ DOES NOT EXIST — Page body content (HTML) |

### 2.3 Admin UI (`PageEditModal`)

**Current Structure:**
- Supports Homepage (Sections + SEO tabs)
- Supports About page (Sections + SEO tabs)
- Standard pages: Page Info + SEO tabs only
- **NO Content tab for page body editing**

### 2.4 Legal Page Slugs in Database

**Status:** Legal page slugs are **NOT** present in the `pages` table.

---

## 3. Proposed Data Model (Planning Only)

### 3.1 Schema Extension

**Required Change:** Add `content` column to `public.pages` table

```sql
-- PLANNING ONLY — NOT EXECUTED
ALTER TABLE public.pages
ADD COLUMN content TEXT;

COMMENT ON COLUMN public.pages.content IS 'HTML content body for static pages (legal pages, etc.)';
```

**Justification:**
- Content storage requires a dedicated field
- Existing `pages` table was designed for metadata only (Phase 4 MVP scope)
- Reusing `pages` table maintains single-module pattern (no new tables)

### 3.2 Database Records (Seed Legal Pages)

**Required Change:** INSERT 4 legal page records

| slug | title | is_published | content |
|------|-------|--------------|---------|
| `privacy-policy` | Privacy Policy | true | (Current hardcoded HTML) |
| `terms-of-use` | Terms of Use | true | (Current hardcoded HTML) |
| `support-policy` | Support Policy | true | (Current hardcoded HTML) |
| `terms-of-service` | Terms of Service | true | (Current hardcoded HTML) |

**SEO Defaults:**
- `meta_title`: "{Page Title} - Devmart"
- `meta_description`: Derived from first paragraph
- `canonical_url`: `https://devmart.sr/{slug}`
- `noindex`: false

---

## 4. Admin UX (Planning Only)

### 4.1 PageEditModal Extension

**Required Change:** Add "Content" tab for legal pages (identified by slug pattern)

**Detection Logic:**
```typescript
const isLegalPage = ['privacy-policy', 'terms-of-use', 'support-policy', 'terms-of-service'].includes(page?.slug)
```

**Tab Structure (Legal Pages):**
1. Page Info (existing)
2. **Content (NEW)** — HTML textarea
3. SEO (existing)

### 4.2 UI Pattern (Darkone 1:1 Strict)

- Reuse existing `Form.Control` with `as="textarea"`
- Rows: 20 (large content area for legal text)
- No rich text editor (simple HTML editing only)
- Follow existing Darkone modal patterns exactly
- No new components created outside existing patterns

---

## 5. Public UX (Planning Only)

### 5.1 Frontend Wiring

**Required Change:** Replace hardcoded content with database fetch

**Pattern:**
```typescript
// PLANNING ONLY — NOT EXECUTED
function LegalPage({ slug }: { slug: string }) {
  const [pageData, setPageData] = useState<{title: string, content: string} | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPage() {
      const { data } = await supabase
        .from('pages')
        .select('title, content, meta_title, meta_description, canonical_url, noindex, og_image_media_id')
        .eq('slug', slug)
        .eq('is_published', true)
        .single()
      setPageData(data)
      setLoading(false)
    }
    fetchPage()
  }, [slug])

  if (loading) return <LegalPageLayout pageName="Loading...">Loading...</LegalPageLayout>
  if (!pageData) return <LegalPageLayout pageName="Not Found">Page not found</LegalPageLayout>

  return (
    <LegalPageLayout pageName={pageData.title}>
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </LegalPageLayout>
  )
}
```

### 5.2 Visual Parity

- `LegalPageLayout` component remains unchanged
- CSS/SCSS modifications: NONE
- Layout changes: NONE
- Only data source changes from hardcoded → database

### 5.3 Fallback Behavior

- If database content is empty/null: Render "Content not available" message
- No hardcoded fallback content (Admin is single source of truth)

---

## 6. SEO Wiring (Planning Only)

### 6.1 SEO Field Propagation

| Field | Source | Fallback |
|-------|--------|----------|
| `meta_title` | `pages.meta_title` | `pages.title + " - Devmart"` |
| `meta_description` | `pages.meta_description` | First 160 chars of content |
| `og_image` | `pages.og_image_media_id` → `media.public_url` | Global default OG image |
| `canonical_url` | `pages.canonical_url` | `https://devmart.sr/{slug}` |
| `noindex` | `pages.noindex` | `false` |

### 6.2 Data Flow

```
Admin Pages Module (Darkone)
    └── pages.meta_title
    └── pages.meta_description
    └── pages.og_image_media_id
    └── pages.canonical_url
    └── pages.noindex
           ↓
Public Legal Pages (Finibus + react-helmet-async)
    └── <title>{meta_title}</title>
    └── <meta name="description" content={meta_description} />
    └── <meta property="og:image" content={og_image_url} />
    └── <link rel="canonical" href={canonical_url} />
    └── <meta name="robots" content={noindex ? "noindex" : "index"} />
```

---

## 7. Explicit Non-Goals

| Item | Status | Notes |
|------|--------|-------|
| Content rewriting | ❌ NOT IN SCOPE | Current content migrated as-is |
| Layout changes | ❌ NOT IN SCOPE | LegalPageLayout preserved |
| CSS/SCSS modifications | ❌ NOT IN SCOPE | No styling changes |
| New components | ❌ NOT IN SCOPE | Only Content tab added |
| Block editor | ❌ NOT IN SCOPE | Simple HTML textarea only |
| Routing changes | ❌ NOT IN SCOPE | Routes remain as-is |
| New RLS policies | ❌ NOT IN SCOPE | Existing policies apply |
| Homepage/About changes | ❌ NOT IN SCOPE | Only legal pages affected |

---

## 8. Governance

### 8.1 Execution Gates

| Gate | Description | Status |
|------|-------------|--------|
| Gate 14.0 | Phase 14 planning approved | ✅ COMPLETE (2026-01-05) |
| Gate 14.1 | Schema migration authorized | ❌ NOT AUTHORIZED |
| Gate 14.2 | Database seeding authorized | ❌ NOT AUTHORIZED |
| Gate 14.3 | Admin UI changes authorized | ❌ NOT AUTHORIZED |
| Gate 14.4 | Frontend wiring authorized | ❌ NOT AUTHORIZED |
| Gate 14.5 | SEO propagation authorized | ❌ NOT AUTHORIZED |
| Gate 14.6 | Phase 14 verification | ❌ NOT STARTED |
| Gate 14.7 | Phase 14 governance lock | ❌ NOT STARTED |

### 8.2 Files to Modify (When Authorized)

| File | Action | Description |
|------|--------|-------------|
| `supabase/migrations/XXXXXX_pages_content_column.sql` | CREATE | Add content column |
| `src/app/(admin)/content/pages/hooks/usePages.ts` | UPDATE | Add content to interface |
| `src/app/(admin)/content/pages/components/PageEditModal.tsx` | UPDATE | Add Content tab |
| `apps/public/src/components/pages/legal/PrivacyPolicyPage.tsx` | UPDATE | Replace hardcoded → DB fetch |
| `apps/public/src/components/pages/legal/TermsOfUsePage.tsx` | UPDATE | Replace hardcoded → DB fetch |
| `apps/public/src/components/pages/legal/SupportPolicyPage.tsx` | UPDATE | Replace hardcoded → DB fetch |
| `apps/public/src/components/pages/legal/TermsOfServicePage.tsx` | UPDATE | Replace hardcoded → DB fetch |

### 8.3 Execution Sequence (When Authorized)

1. Create migration to add `content` column
2. INSERT 4 legal page records with current content
3. Update `usePages.ts` hook (add content field)
4. Update `PageEditModal.tsx` (add Content tab for legal pages)
5. Update 4 public legal page components
6. Verify SEO propagation
7. Update documentation

---

## 9. Risks and Considerations

### Risk 1: Content Migration Fidelity

**Issue:** HTML extraction from React components may introduce formatting issues  
**Mitigation:** Manual review of migrated content before marking complete

### Risk 2: Slug Immutability Enforcement

**Issue:** Existing `prevent_slug_change()` trigger must apply to new legal page slugs  
**Mitigation:** Trigger already exists and will apply automatically

### Risk 3: Empty Content Handling

**Issue:** If content column is NULL, public page renders empty  
**Mitigation:** Frontend shows "Content not available" fallback

### Risk 4: RLS Policy Coverage

**Issue:** Ensure existing RLS policies cover new legal page records  
**Mitigation:** Existing policies apply (public SELECT where is_published=true, admin UPDATE)

---

## 10. Rollback Strategy

### If Phase 14 must be reverted:

**Step 1: Revert migration**
```sql
-- ROLLBACK ONLY — NOT EXECUTED
ALTER TABLE public.pages DROP COLUMN IF EXISTS content;
DELETE FROM public.pages WHERE slug IN ('privacy-policy', 'terms-of-use', 'support-policy', 'terms-of-service');
```

**Step 2: Restore frontend components**
- Revert legal page components to hardcoded content (Git restore to Phase 13C state)

**Step 3: Restore admin components**
- Revert PageEditModal changes (Git restore)
- Revert usePages.ts changes (Git restore)

---

## 11. Legal Constraint Note

**Future content updates MUST ensure:**

- Governing law/jurisdiction is **Suriname** (not England/Wales)
- All email addresses use the **@devmart.sr** domain
- No references to UK-based legal entities or jurisdictions

---

## 12. Guardian Rules Compliance

| Rule | Compliance |
|------|------------|
| Admin UI 1:1 Darkone | ✅ Content tab follows existing tab/textarea patterns |
| Public UI 1:1 Finibus | ✅ Layout and styling unchanged |
| Reuse existing modules | ✅ Extends existing Pages module |
| No layout changes | ✅ Confirmed |
| No CSS changes | ✅ Confirmed |
| No new schemas (unless justified) | ✅ Schema extension justified (content storage) |

---

## HARD STOP

Phase 14 is **PLANNED** but **NOT AUTHORIZED**.

No execution may begin without explicit sub-phase authorization.

Await instructions.
