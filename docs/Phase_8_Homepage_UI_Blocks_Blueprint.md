# Phase 8 — Homepage UI Blocks Blueprint + Light/Dark Switch Plan

```
Status: DEFINITION COMPLETE — Execution not started
Phase: 8
Created: 2025-12-25
Prerequisite: Phase 7.2 CLOSED AND VERIFIED
```

---

## 1. Executive Summary

This blueprint defines the UI Blocks governance system for the Devmart Homepage. It is a **definition-only document** — no implementation has been performed.

**Key Findings:**

- `homepage_settings` table already exists with JSONB `data` column
- All 9 Homepage sections are currently wired (some static, some DB-driven)
- Existing Pages module modal pattern is suitable for UI Blocks editing
- Section ordering is FIXED (Finibus parity) — no reorder feature required

**Theme Variants:**

- **Variant A (Light)**: DEFAULT theme
- **Variant B (Dark)**: CSS-based variant only (same content, different styling)

**Known Issue — Documented, NOT to be fixed in Phase 8:**

- Dark-theme readability issue exists in the Home About section
- This is a CSS/theming issue requiring targeted SCSS adjustments
- Will be addressed in a dedicated theming fix phase, not Phase 8 execution

**Content Policy:**

- No content writing is allowed
- All content remains 1:1 with existing DB and frontend
- UI Blocks only govern editing of existing content, not creation of new copy

---

## 2. Current State Snapshot

### Admin Pages Module Behavior

- Uses modal-based editing (`PageEditModal.tsx`)
- Supports title, slug, meta fields, published toggle
- MediaPicker component available for image selection/upload

### Admin Media Module Behavior

- Upload via drag/drop or file picker
- Returns `media.id` for foreign key references
- Supports alt text, title metadata

### Current Homepage Wiring

| Section | Component | Current Data Source |
|---------|-----------|---------------------|
| Hero Slider | `HeroArea.tsx` | `homepage_settings.data.hero_slides` |
| Services | `ServiceArea.tsx` | `services` table (dynamic module) |
| About + Stats | `AboutArea.tsx` | `homepage_settings.data.about` + `homepage_settings.data.stats` |
| Partners | `OurPartnerArea.tsx` | `homepage_settings.data.partners` |
| Portfolio | `PortfolioArea.tsx` | `projects` table (dynamic module) |
| Why Choose Us | `WhyChooseUsArea.tsx` | `homepage_settings.data.why_choose` |
| Testimonials | `TestimonialArea.tsx` | `testimonials` table (dynamic module) |
| Latest Blog | `NewsLatterArea.tsx` | `blog_posts` table (dynamic module) |
| CTA Strip | `LetsTalkArea.tsx` | `homepage_settings.data.cta` |

### Existing `homepage_settings` Table

```sql
CREATE TABLE public.homepage_settings (
  id integer PRIMARY KEY,
  data jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid
);
```

- RLS enabled with admin-only write policy
- Public read policy exists

---

## 3. Homepage Section Matrix — Variant A + Variant B

### Theme Variant Clarification

| Aspect | Variant A (Light) | Variant B (Dark) |
|--------|-------------------|------------------|
| Default | ✅ YES | ❌ No |
| Content | Identical | Identical |
| Styling | Light theme CSS | `.dark-theme` CSS class |
| Data Source | Same JSONB | Same JSONB |

**No content differences exist between variants — only CSS styling differs.**

### Section-by-Section Matrix

#### Section 1: Hero Slider (UI Blocks)

| Field | Type | Editable | Notes |
|-------|------|----------|-------|
| `enabled` | boolean | ✅ | Toggle section visibility |
| `slides[].title` | string | ✅ | Main headline per slide |
| `slides[].subtitle` | string | ✅ | Subheading per slide |
| `slides[].button_text` | string | ✅ | CTA button label |
| `slides[].button_url` | string | ✅ | CTA button link |
| `slides[].background_media_id` | uuid | ✅ | MediaPicker selection |

#### Section 2: Services (Dynamic Module)

| Field | Type | Editable | Notes |
|-------|------|----------|-------|
| `enabled` | boolean | ✅ | Toggle section visibility |
| `section_title` | string | ✅ | "Our Services" heading |
| `section_subtitle` | string | ✅ | Section description |
| Service items | — | ❌ | Managed via Services module |

#### Section 3: About + Stats (UI Blocks)

| Field | Type | Editable | Notes |
|-------|------|----------|-------|
| `enabled` | boolean | ✅ | Toggle section visibility |
| `about.title` | string | ✅ | Section heading |
| `about.description` | string | ✅ | About paragraph |
| `about.image_media_id` | uuid | ✅ | MediaPicker selection |
| `stats[].value` | string | ✅ | Stat number (e.g., "150+") |
| `stats[].label` | string | ✅ | Stat description |

**Known Issue:** Dark-theme readability issue exists in this section. This is a CSS/theming issue — NOT to be fixed in Phase 8 execution.

#### Section 4: Partners (UI Blocks)

| Field | Type | Editable | Notes |
|-------|------|----------|-------|
| `enabled` | boolean | ✅ | Toggle section visibility |
| `partners[].name` | string | ✅ | Partner name (for alt text) |
| `partners[].logo_media_id` | uuid | ✅ | MediaPicker selection |
| `partners[].url` | string | ✅ | Optional link |

#### Section 5: Portfolio (Dynamic Module)

| Field | Type | Editable | Notes |
|-------|------|----------|-------|
| `enabled` | boolean | ✅ | Toggle section visibility |
| `section_title` | string | ✅ | "Our Portfolio" heading |
| `section_subtitle` | string | ✅ | Section description |
| `view_all_text` | string | ✅ | "View All" button text |
| `view_all_url` | string | ✅ | "View All" button link |
| Project items | — | ❌ | Managed via Projects module |

#### Section 6: Why Choose Us (UI Blocks)

| Field | Type | Editable | Notes |
|-------|------|----------|-------|
| `enabled` | boolean | ✅ | Toggle section visibility |
| `title` | string | ✅ | Section heading |
| `subtitle` | string | ✅ | Section description |
| `features[].icon` | string | ✅ | Icon class/name |
| `features[].title` | string | ✅ | Feature heading |
| `features[].description` | string | ✅ | Feature description |
| `skills[].name` | string | ✅ | Skill name |
| `skills[].percentage` | number | ✅ | Skill percentage (0-100) |
| `image_media_id` | uuid | ✅ | MediaPicker selection |

#### Section 7: Testimonials (Dynamic Module)

| Field | Type | Editable | Notes |
|-------|------|----------|-------|
| `enabled` | boolean | ✅ | Toggle section visibility |
| `section_title` | string | ✅ | "Testimonials" heading |
| `section_subtitle` | string | ✅ | Section description |
| Testimonial items | — | ❌ | Managed via Testimonials module |

#### Section 8: Latest Blog (Dynamic Module)

| Field | Type | Editable | Notes |
|-------|------|----------|-------|
| `enabled` | boolean | ✅ | Toggle section visibility |
| `section_title` | string | ✅ | "Latest Blog" heading |
| `section_subtitle` | string | ✅ | Section description |
| `view_all_text` | string | ✅ | "View All" button text |
| `view_all_url` | string | ✅ | "View All" button link |
| Blog posts | — | ❌ | Managed via Blog module |

#### Section 9: CTA Strip (UI Blocks)

| Field | Type | Editable | Notes |
|-------|------|----------|-------|
| `enabled` | boolean | ✅ | Toggle section visibility |
| `title` | string | ✅ | CTA heading |
| `subtitle` | string | ✅ | CTA description |
| `button_text` | string | ✅ | CTA button label |
| `button_url` | string | ✅ | CTA button link |
| `background_media_id` | uuid | ✅ | MediaPicker selection (optional) |

### Section Ordering

**FIXED ORDER (Finibus parity — no reorder feature):**

1. Hero Slider
2. Services
3. About + Stats
4. Partners
5. Portfolio
6. Why Choose Us
7. Testimonials
8. Latest Blog
9. CTA Strip

---

## 4. UI Blocks Options Analysis

### Option A: Extend Existing `homepage_settings.data` JSONB (RECOMMENDED)

**Data Model:**

```jsonb
{
  "hero": { "enabled": true, "slides": [...] },
  "services": { "enabled": true, "section_title": "...", "section_subtitle": "..." },
  "about": { "enabled": true, "title": "...", "description": "...", "image_media_id": "...", "stats": [...] },
  "partners": { "enabled": true, "items": [...] },
  "portfolio": { "enabled": true, "section_title": "...", "section_subtitle": "...", "view_all_text": "...", "view_all_url": "..." },
  "why_choose": { "enabled": true, "title": "...", "features": [...], "skills": [...], "image_media_id": "..." },
  "testimonials": { "enabled": true, "section_title": "...", "section_subtitle": "..." },
  "blog": { "enabled": true, "section_title": "...", "section_subtitle": "...", "view_all_text": "...", "view_all_url": "..." },
  "cta": { "enabled": true, "title": "...", "subtitle": "...", "button_text": "...", "button_url": "..." },
  "seo": { "meta_title": "...", "meta_description": "...", "og_image_media_id": "..." }
}
```

**Pros:**

- Uses existing table — no migration needed
- Single-row update (row id=1)
- Already wired in `useHomepageSettings` hook
- Flexible schema for future additions

**Cons:**

- Large JSONB blob (acceptable for single homepage)

**Compatibility:**

- ✅ Works with existing Pages module modal pattern
- ✅ MediaPicker integration via `*_media_id` fields
- ✅ Supports enable/disable per section
- ✅ No delete/reorder needed

### Option B: Separate `homepage_sections` Table

**Data Model:**

```sql
CREATE TABLE homepage_sections (
  id uuid PRIMARY KEY,
  section_key text UNIQUE NOT NULL,
  enabled boolean DEFAULT true,
  data jsonb DEFAULT '{}',
  display_order integer NOT NULL,
  updated_at timestamptz DEFAULT now()
);
```

**Pros:**

- Normalized structure
- Per-section row updates

**Cons:**

- Requires new migration
- More complex queries
- Changes existing wiring

### Option C: Hybrid (JSONB + SEO Table)

**Data Model:**

- Keep `homepage_settings.data` for sections
- Add `homepage_seo` table for SEO fields

**Pros:**

- Separates content from SEO concerns

**Cons:**

- Two data sources for one page
- Unnecessary complexity

### Recommended Option: A (Extend Existing JSONB)

**Rationale:**

- Minimal change to existing architecture
- Already has RLS policies
- Already has hook wiring
- Single source of truth

---

## 5. Admin UX Blueprint (Modal-Compatible)

### Navigation

- Add "Homepage" entry in Admin sidebar under "Content" section
- Route: `/admin/homepage`

### Section List View

```
┌─────────────────────────────────────────────────────┐
│ Homepage Sections                                   │
├─────────────────────────────────────────────────────┤
│ ☑ Hero Slider                              [Edit]  │
│ ☑ Services                                 [Edit]  │
│ ☑ About + Stats                            [Edit]  │
│ ☑ Partners                                 [Edit]  │
│ ☑ Portfolio                                [Edit]  │
│ ☑ Why Choose Us                            [Edit]  │
│ ☑ Testimonials                             [Edit]  │
│ ☑ Latest Blog                              [Edit]  │
│ ☑ CTA Strip                                [Edit]  │
├─────────────────────────────────────────────────────┤
│ SEO Settings                               [Edit]  │
└─────────────────────────────────────────────────────┘
```

### Section Editing (Modal)

- Each section opens a modal with its editable fields
- Toggle at top of modal for enable/disable
- MediaPicker for image fields
- Save/Cancel buttons

### Constraints (Enforced)

- ❌ No delete button for sections
- ❌ No reorder/drag functionality
- ❌ No add new section button
- ✅ Fixed list of 9 sections + SEO

---

## 6. Theme Switch Plan (Future Phase)

**Status: PLAN ONLY — NOT IMPLEMENTED IN PHASE 8**

### Default Theme

- **Light (Variant A)** is the default
- Applied when no preference is stored

### UI Switch Location

- Header area (top-right, near navigation)
- Toggle icon (sun/moon)

### Storage Strategy

```javascript
// localStorage key
'devmart-theme-preference': 'light' | 'dark'
```

### Implementation Pattern

```javascript
// On load
const savedTheme = localStorage.getItem('devmart-theme-preference') || 'light';
document.documentElement.classList.toggle('dark-theme', savedTheme === 'dark');

// On toggle
const newTheme = currentTheme === 'light' ? 'dark' : 'light';
localStorage.setItem('devmart-theme-preference', newTheme);
document.documentElement.classList.toggle('dark-theme', newTheme === 'dark');
```

### SCSS/Theme Token Implications

- All color variables must support both themes
- Dark theme overrides via `.dark-theme` class on `<html>`
- Finibus parity must be maintained for both variants

### Known Issue — NOT to be fixed in Phase 8

- Dark-theme readability issue in Home About section
- Requires targeted SCSS adjustments
- Will be addressed in a dedicated theming fix phase

---

## 7. Public Rendering Contract

### Data Source

- **Single source of truth:** `homepage_settings.data` (JSONB)
- **Dynamic modules:** Respective tables (`services`, `projects`, `testimonials`, `blog_posts`)

### Fallback Strategy

For safety, static fallbacks exist but are minimal:

```typescript
const section = data?.hero ?? { enabled: false, slides: [] };
```

### Non-Breaking Rules

| Rule | Implementation |
|------|----------------|
| Missing optional fields | Render empty/hidden, no crash |
| Disabled sections | Skip render entirely |
| Missing images | Use placeholder or hide image container |
| Empty arrays | Render nothing, no error |

### Image Stability

- All images use `object-fit: cover` (Phase 7.2 guarantee)
- MediaPicker returns valid `media.public_url`
- No changes to existing image behavior

### Dynamic Module Rendering

- Services, Portfolio, Testimonials, Blog remain module-driven
- UI Blocks only control wrapper text fields (section titles/subtitles)
- Module content comes from respective tables

---

## 8. SEO + Sitemap Readiness

### SEO Fields (Stored in `homepage_settings.data.seo`)

| Field | Purpose |
|-------|---------|
| `meta_title` | Homepage `<title>` tag |
| `meta_description` | Homepage meta description |
| `og_image_media_id` | Open Graph image reference |

### Sitemap Considerations

- Homepage URL: `/` (stable, no slug)
- Sitemap generation: NOT implemented in Phase 8
- Fields are present for future sitemap generator

---

## 9. Verification Checklist (For Future Execution)

### Admin Functionality

| Check | Status |
|-------|--------|
| Homepage entry visible in sidebar | ⬜ |
| All 9 sections listed in fixed order | ⬜ |
| Enable/disable toggle works per section | ⬜ |
| Edit modal opens for each section | ⬜ |
| MediaPicker works for image fields | ⬜ |
| SEO fields editable and saved | ⬜ |
| No delete button present | ⬜ |
| No reorder functionality present | ⬜ |
| Save persists to `homepage_settings.data` | ⬜ |

### Public Rendering — Variant A (Light)

| Check | Status |
|-------|--------|
| Hero Slider renders from DB | ⬜ |
| Services section wrapper text from DB | ⬜ |
| About + Stats renders from DB | ⬜ |
| Partners renders from DB | ⬜ |
| Portfolio section wrapper text from DB | ⬜ |
| Why Choose Us renders from DB | ⬜ |
| Testimonials section wrapper text from DB | ⬜ |
| Latest Blog section wrapper text from DB | ⬜ |
| CTA Strip renders from DB | ⬜ |
| Disabled sections hidden correctly | ⬜ |
| No console errors | ⬜ |

### Public Rendering — Variant B (Dark)

| Check | Status |
|-------|--------|
| All above checks pass with dark theme | ⬜ |
| Theme toggle works correctly | ⬜ |
| Theme preference persists in localStorage | ⬜ |

### Regression Checks (Phase 7.2)

| Check | Status |
|-------|--------|
| Home → Project Details routing works | ⬜ |
| 404 page has Header/Footer | ⬜ |
| Project Details images stable | ⬜ |
| No new console errors introduced | ⬜ |

---

## 10. Authoritative Document References

| Document | Role |
|----------|------|
| `docs/Backend.md` | Database schema, RLS policies |
| `docs/Architecture.md` | System architecture, module structure |
| `docs/Tasks.md` | Phase tracking, completion status |
| `docs/restore-points/Restore_Point_Phase_7_2_*.md` | Phase 7.2 stability baseline |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-25 | Planning Agent | Initial blueprint — Definition complete |

**Status:** Definition complete — Execution not started

**Next Step:** Await explicit authorization for Phase 8 execution
