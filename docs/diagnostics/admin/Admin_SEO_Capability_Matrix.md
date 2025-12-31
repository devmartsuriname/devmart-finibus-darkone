# Admin Diagnostic: SEO Capability Matrix

**Last Verified:** 2025-12-31  
**Updated:** 2025-12-31 (Phase 2.1a–2.3 Complete)

---

## Module SEO Field Support

| Module | meta_title | meta_description | og_image | canonical | noindex | Status |
|--------|:----------:|:----------------:|:--------:|:---------:|:-------:|--------|
| Pages | ✅ | ✅ | ❌ | ❌ | ❌ | Partial |
| **Blog** | ✅ | ✅ | ✅ | ✅ | ✅ | **COMPLETE** |
| Services | ❌ | ❌ | ❌ | ❌ | ❌ | Missing |
| Projects | ❌ | ❌ | ❌ | ❌ | ❌ | Missing |

---

## Detailed Breakdown

### Pages Module
- **Table:** `pages`
- **SEO Fields Present:** `meta_title`, `meta_description`
- **SEO Fields Missing:** `og_image`, `canonical_url`, `robots`
- **Admin Modal:** Has SEO tab with title/description fields
- **Character Limits:** meta_title 70, meta_description 160
- **Public Wiring Status:** WIRED (used by react-helmet-async)

### Blog Module ✅ COMPLETE (Phase 2.1a–2.3)
- **Table:** `blog_posts`
- **SEO Fields Present:** `meta_title`, `meta_description`, `og_image_media_id`, `canonical_url`, `noindex`
- **SEO Fields Missing:** None
- **Admin Modal:** Has SEO tab (Tab 4) with all 5 fields
- **Character Limits:** meta_title 70, meta_description 160
- **Public Wiring Status:** ✅ WIRED to useBlogDetails hook
- **Data Seeding:** ✅ All published posts seeded (except og_image)
- **Dynamic Placeholders:** ✅ Show fallback values from title/excerpt

### Services Module
- **Table:** `services`
- **SEO Fields Present:** None
- **SEO Fields Missing:** `meta_title`, `meta_description`, `og_image`
- **Admin Modal:** No SEO tab
- **Future Expansion Required:** Yes
- **Public Wiring Status:** NOT WIRED (no SEO fields exist)

### Projects Module
- **Table:** `projects`
- **SEO Fields Present:** None
- **SEO Fields Missing:** `meta_title`, `meta_description`, `og_image`
- **Admin Modal:** No SEO tab
- **Future Expansion Required:** Yes
- **Public Wiring Status:** NOT WIRED (no SEO fields exist)

---

## Homepage SEO (Special Case)

- **Stored In:** `homepage_settings` JSON → `seo` block
- **Fields:** `meta_title`, `meta_description`
- **Admin Access:** Pages module → Homepage → SEO tab
- **Status:** ✅ Implemented
- **Public Wiring Status:** WIRED

---

## Future Expansion Needs

| Module | Schema Change | Modal Change | Priority |
|--------|--------------|--------------|----------|
| ~~Blog~~ | ~~Add 5 columns~~ | ~~Add SEO tab~~ | ~~High~~ ✅ DONE |
| Services | Add 3 columns | Add SEO tab | Medium |
| Projects | Add 3 columns | Add SEO tab | Medium |
| Pages | Add 2 columns | Extend SEO tab | Low |

---

## Implementation Notes

### Pages Module (Partial Implementation)
- ✅ `meta_title` and `meta_description` fields exist in `pages` table
- ✅ Admin modal has SEO tab for editing these fields
- ❌ `og_image` field missing — cannot set social sharing image per page
- ❌ `canonical_url` field missing — cannot override canonical URL
- **Note:** Current implementation covers basic on-page SEO; advanced features require schema expansion

### Blog Module ✅ COMPLETE
- ✅ All 5 SEO fields exist in `blog_posts` table
- ✅ Admin modal has SEO tab (Tab 4) for editing all fields
- ✅ Character counters with warning states (70/160)
- ✅ Dynamic placeholders showing fallback values
- ✅ OG Image uses MediaPicker component
- ✅ Public hook (`useBlogDetails`) fetches all SEO fields
- ✅ All published posts seeded with SEO data
- **Note:** Full implementation complete as of Phase 2.1a–2.3

### Services Module (No SEO Support)
- ❌ No dedicated SEO fields in `services` table
- ❌ Admin modal has no SEO tab
- ⚠️ Public frontend uses `title` and `short_description` as fallbacks
- **Future Requirement:** Add `meta_title`, `meta_description`, `og_image_media_id` columns
- **Future Requirement:** Add SEO tab to ServiceModal

### Projects Module (No SEO Support)
- ❌ No dedicated SEO fields in `projects` table
- ❌ Admin modal has no SEO tab
- ⚠️ Public frontend uses `title` and `description` as fallbacks
- **Future Requirement:** Add `meta_title`, `meta_description`, `og_image_media_id` columns
- **Future Requirement:** Add SEO tab to ProjectModal

---

## SEO Tab UI Standard (Reference)

The Blog module SEO tab is the reference implementation:

```
SEO Tab Structure (Blog — Tab 4):
├── Meta Title (input, maxLength 70)
│   ├── Character counter with warning at 60+
│   └── Dynamic placeholder: post title fallback
├── Meta Description (textarea, maxLength 160)
│   ├── Character counter with warning at 150+
│   └── Dynamic placeholder: excerpt fallback
├── OG Image (MediaPicker)
│   └── Helper text: "Recommended: 1200x630 pixels"
├── Canonical URL (input)
│   └── Helper text: "Leave blank to use default URL"
└── Noindex (switch)
    └── Helper text: "Exclude from search engines"
```

---

## SEO Fallback Hierarchy

The blog module implements a 3-tier fallback:

1. **Per-Post SEO Fields** (highest priority)
2. **Content Fallbacks** (title → meta_title, excerpt → meta_description)
3. **Global SEO Settings** (from settings table)

---

**Status:** ✅ Blog SEO COMPLETE | Pending: Services, Projects  
**Execution:** Phase 2.1a–2.3 Complete
