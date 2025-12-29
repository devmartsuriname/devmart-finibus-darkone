# Admin Diagnostic: SEO Capability Matrix

**Last Verified:** 2025-12-29

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

### Blog Module
- **Table:** `blog_posts`
- **SEO Fields Present:** None (uses title/excerpt as fallback)
- **SEO Fields Missing:** `meta_title`, `meta_description`, `og_image`, `canonical_url`
- **Admin Modal:** No SEO tab
- **Future Expansion Required:** Yes - modal needs SEO tab

### Services Module
- **Table:** `services`
- **SEO Fields Present:** None
- **SEO Fields Missing:** `meta_title`, `meta_description`, `og_image`
- **Admin Modal:** No SEO tab
- **Future Expansion Required:** Yes

### Projects Module
- **Table:** `projects`
- **SEO Fields Present:** None
- **SEO Fields Missing:** `meta_title`, `meta_description`, `og_image`
- **Admin Modal:** No SEO tab
- **Future Expansion Required:** Yes

---

## Homepage SEO (Special Case)

- **Stored In:** `homepage_settings` JSON → `seo` block
- **Fields:** `meta_title`, `meta_description`
- **Admin Access:** Pages module → Homepage → SEO tab
- **Status:** ✅ Implemented

---

## Future Expansion Needs

| Module | Schema Change | Modal Change | Priority |
|--------|--------------|--------------|----------|
| Blog | Add 4 columns | Add SEO tab | High |
| Services | Add 3 columns | Add SEO tab | Medium |
| Projects | Add 3 columns | Add SEO tab | Medium |
| Pages | Add 2 columns | Extend SEO tab | Low |

---

**Status:** DONE  
**Execution:** Not Authorized
