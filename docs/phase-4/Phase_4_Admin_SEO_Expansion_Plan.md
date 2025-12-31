# Phase 4 Plan: Admin SEO Expansion

**Status:** PLANNING ONLY — EXECUTION NOT AUTHORIZED  
**Created:** 2025-12-31  
**Phase Type:** Admin Enhancement

---

## Overview

Phase 4 extends SEO field support to remaining admin modules (Pages, Services, Projects) and adds related UX improvements to the admin interface.

---

## Scope

### In Scope

| Area | Description |
|------|-------------|
| Pages Module | Extend SEO tab with og_image, canonical_url, robots fields |
| Services Module | Add SEO tab with meta_title, meta_description, og_image fields |
| Projects Module | Add SEO tab with meta_title, meta_description, og_image fields |
| Admin UX Polish | Character counters, fallback placeholders for new SEO tabs |

### Explicit Exclusions

| Exclusion | Reason |
|-----------|--------|
| Frontend changes | Frontend is FROZEN |
| Routing or URL normalization | Out of scope for admin SEO work |
| Schema changes | Requires separate migration authorization |
| Database migrations | Requires explicit approval |
| New features | Admin SEO enhancement only |
| Public SEO wiring | Deferred to future phases |

---

## Proposed Structure

### Phase 4A: Pages Module SEO Expansion

**Objective:** Extend existing SEO tab with additional fields.

| New Field | Type | Character Limit |
|-----------|------|-----------------|
| og_image | UUID (FK to media) | — |
| canonical_url | TEXT | — |
| robots | TEXT (noindex, nofollow options) | — |

**Admin Changes:**
- Extend PageEditModal SEO tab
- Add MediaPicker for OG image
- Add canonical URL input
- Add robots dropdown/checkboxes

**Dependencies:**
- Schema migration for new columns (requires separate authorization)

---

### Phase 4B: Services Module SEO Tab

**Objective:** Add SEO tab to ServiceModal.

| New Field | Type | Character Limit |
|-----------|------|-----------------|
| meta_title | TEXT | 70 |
| meta_description | TEXT | 160 |
| og_image_media_id | UUID (FK to media) | — |

**Admin Changes:**
- Add SEO tab (Tab 4) to ServiceModal
- Character counters matching Blog pattern
- MediaPicker for OG image
- Dynamic placeholders from title/short_description

**Dependencies:**
- Schema migration for new columns (requires separate authorization)

---

### Phase 4C: Projects Module SEO Tab

**Objective:** Add SEO tab to ProjectModal.

| New Field | Type | Character Limit |
|-----------|------|-----------------|
| meta_title | TEXT | 70 |
| meta_description | TEXT | 160 |
| og_image_media_id | UUID (FK to media) | — |

**Admin Changes:**
- Add SEO tab (Tab 4) to ProjectModal
- Character counters matching Blog pattern
- MediaPicker for OG image
- Dynamic placeholders from title/description

**Dependencies:**
- Schema migration for new columns (requires separate authorization)

---

### Phase 4D: Admin SEO UX Polish

**Objective:** Standardize SEO UI patterns across all modules.

| Enhancement | Description |
|-------------|-------------|
| Character counters | Warning states at 60/70 (title) and 150/160 (description) |
| Fallback placeholders | Show derived values when SEO fields are empty |
| Help text | Consistent guidance for OG image dimensions, canonical URLs |
| Info boxes | Explain fallback hierarchy to admins |

---

## Reference Implementation

The Blog module SEO tab (Tab 4) is the reference pattern for all new SEO tabs:

```
SEO Tab Standard:
├── Meta Title (input, maxLength 70)
│   ├── Character counter with warning at 60+
│   └── Dynamic placeholder: content title fallback
├── Meta Description (textarea, maxLength 160)
│   ├── Character counter with warning at 150+
│   └── Dynamic placeholder: excerpt/description fallback
├── OG Image (MediaPicker)
│   └── Helper text: "Recommended: 1200x630 pixels"
├── Canonical URL (input) [if applicable]
│   └── Helper text: "Leave blank to use default URL"
└── Noindex (switch) [if applicable]
    └── Helper text: "Exclude from search engines"
```

---

## Execution Prerequisites

Before Phase 4 execution can begin:

1. **Explicit authorization** from project governance
2. **Migration approval** for schema changes (if any)
3. **Confirmation** that frontend remains frozen
4. **Scope lock** — no additional features beyond SEO

---

## Guardian Rules (Binding)

| Rule | Enforcement |
|------|-------------|
| No schema changes without approval | Hard block |
| No frontend changes | Absolute prohibition |
| No routing changes | Absolute prohibition |
| No new npm packages | Requires justification |
| Documentation-first | Plan before execute |

---

## Estimated Effort

| Phase | Complexity | Dependencies |
|-------|------------|--------------|
| 4A (Pages) | Low | Schema migration |
| 4B (Services) | Medium | Schema migration |
| 4C (Projects) | Medium | Schema migration |
| 4D (UX Polish) | Low | None (existing fields) |

---

## Status

**PLANNING ONLY**

This document is a planning reference. No implementation is authorized.

Await explicit Phase 4 execution authorization.
