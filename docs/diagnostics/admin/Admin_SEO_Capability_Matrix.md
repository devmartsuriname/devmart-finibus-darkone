# Admin Diagnostic: SEO Capability Matrix

**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Implementation Notes)

---

## Module SEO Field Support

| Module | meta_title | meta_description | og_image | canonical | Status |
|--------|:----------:|:----------------:|:--------:|:---------:|--------|
| Pages | ✅ | ✅ | ❌ | ❌ | Partial |
| Blog | ❌ | ❌ | ❌ | ❌ | Missing |
| Services | ❌ | ❌ | ❌ | ❌ | Missing |
| Projects | ❌ | ❌ | ❌ | ❌ | Missing |

---

## Detailed Breakdown

### Pages Module
- **Table:** `pages`
- **SEO Fields Present:** `meta_title`, `meta_description`
- **SEO Fields Missing:** `og_image`, `canonical_url`, `robots`
- **Admin Modal:** Has SEO tab with title/description fields
- **Character Limits:** meta_title 70, meta_description 160
- **Public Wiring Status:** WIRED (used by react-helmet-async)

### Blog Module
- **Table:** `blog_posts`
- **SEO Fields Present:** None (uses title/excerpt as fallback)
- **SEO Fields Missing:** `meta_title`, `meta_description`, `og_image`, `canonical_url`
- **Admin Modal:** No SEO tab
- **Future Expansion Required:** Yes - modal needs SEO tab
- **Public Wiring Status:** NOT WIRED (no SEO fields exist)

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
| Blog | Add 4 columns | Add SEO tab | High |
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

### Blog Module (No SEO Support)
- ❌ No dedicated SEO fields in `blog_posts` table
- ❌ Admin modal has no SEO tab
- ⚠️ Public frontend falls back to `title` for `<title>` and `excerpt` for meta description
- **Future Requirement:** Add `meta_title`, `meta_description`, `og_image_media_id`, `canonical_url` columns
- **Future Requirement:** Add SEO tab to BlogPostModal matching Pages pattern

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

When implementing SEO tabs for Blog/Services/Projects, follow the Pages module pattern:

```
SEO Tab Structure:
├── Meta Title (input, maxLength 70)
│   └── Helper text: "Recommended: 50-60 characters"
├── Meta Description (textarea, maxLength 160)
│   └── Helper text: "Recommended: 150-160 characters"
├── OG Image (MediaPicker) [future]
│   └── Helper text: "Recommended: 1200x630 pixels"
└── Canonical URL (input) [future]
    └── Helper text: "Leave blank to use default URL"
```

---

**Status:** DONE  
**Execution:** Not Authorized
