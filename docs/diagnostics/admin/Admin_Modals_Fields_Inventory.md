# Admin Diagnostic: Modal Fields Inventory

**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Public Wiring Status column)

---

## BlogPostModal

**Component:** `src/app/(admin)/content/blog/components/BlogPostModal.tsx`  
**Size:** xl (standardized)

### Fields

| Tab | Field | Type | Required | Max Length | DB Column | Public Wiring Status |
|-----|-------|------|----------|------------|-----------|---------------------|
| Main | Title | Input | ✅ | 200 | title | ✅ WIRED |
| Main | Slug | Input (auto) | ✅ | - | slug | ✅ WIRED |
| Main | Excerpt | Textarea | ❌ | 300 | excerpt | ✅ WIRED |
| Main | Content | Textarea/RichText | ✅ | - | content | ✅ WIRED |
| Main | Featured Image | MediaPicker | ❌ | - | featured_image_media_id | ✅ WIRED |
| Main | Status | Select | ❌ | - | status | ✅ WIRED (filter) |
| Main | Publish Date | DatePicker | ❌ | - | published_at | ✅ WIRED |

### Missing Fields (Gap Analysis)

| Field | DB Column | Admin Status | Public Status | Notes |
|-------|-----------|--------------|---------------|-------|
| Category | blog_posts.category | ⚠️ UNVERIFIED | ⚠️ PARTIAL | Column exists; verify modal has dropdown |
| SEO Tab | - | ❌ MISSING | ❌ N/A | No SEO fields in modal |
| meta_title | - | ❌ MISSING | ❌ N/A | Column does not exist |
| meta_description | - | ❌ MISSING | ❌ N/A | Column does not exist |
| Tags | blog_post_tags | ❌ NOT IMPLEMENTED | ❌ NOT WIRED | Junction table exists but no UI |

### Expansion Required

- **Priority:** High
- **Add:** Category dropdown (verify if missing)
- **Add:** SEO tab with meta_title, meta_description, og_image
- **Add:** Tags multi-select (wire to blog_post_tags)

---

## PageEditModal

**Component:** `src/app/(admin)/content/pages/components/PageEditModal.tsx`  
**Size:** xl (standardized)

### Fields — Standard Pages

| Tab | Field | Type | Required | Max Length | DB Column | Public Wiring Status |
|-----|-------|------|----------|------------|-----------|---------------------|
| Main | Slug | Input (readonly) | ✅ | 50 | slug | ✅ WIRED (route) |
| Main | Title | Input | ✅ | 100 | title | ✅ WIRED |
| SEO | Meta Title | Input | ❌ | 70 | meta_title | ✅ WIRED |
| SEO | Meta Description | Textarea | ❌ | 160 | meta_description | ✅ WIRED |
| Main | Published | Switch | ❌ | - | is_published | ✅ WIRED (filter) |

### Fields — Homepage (Special)

| Tab | Field | Type | Required | DB Location | Public Wiring Status |
|-----|-------|------|----------|-------------|---------------------|
| Sections | Hero Slides | Dynamic Editor | ✅ | homepage_settings.hero | ✅ WIRED |
| Sections | About Section | JSON fields | ✅ | homepage_settings.home_about | ✅ WIRED |
| Sections | Services Wrapper* | JSON fields | ❌ | homepage_settings.services | ❌ NOT WIRED |
| Sections | Portfolio Wrapper* | JSON fields | ❌ | homepage_settings.portfolio | ❌ NOT WIRED |
| Sections | Blog Wrapper* | JSON fields | ❌ | homepage_settings.blog | ❌ NOT WIRED |
| Sections | Why Choose Us | JSON fields | ✅ | homepage_settings.why_choose | ✅ WIRED |
| Sections | CTA | JSON fields | ✅ | homepage_settings.cta | ✅ WIRED |
| Sections | Partners | Dynamic Editor | ❌ | homepage_settings.partners | ✅ WIRED |
| SEO | Meta Title | Input | ❌ | homepage_settings.seo | ✅ WIRED |
| SEO | Meta Description | Textarea | ❌ | homepage_settings.seo | ✅ WIRED |

*Wrapper fields: Admin CAN edit `section_title`, `section_subtitle`, etc. but public components DO NOT consume these values.

### Fields — About Page

| Tab | Field | Type | Required | DB Location | Public Wiring Status |
|-----|-------|------|----------|-------------|---------------------|
| Sections | Inside Story | JSON fields | ✅ | page_settings (slug: about) | ✅ WIRED |
| SEO | Meta Title | Input | ❌ | pages.meta_title | ✅ WIRED |
| SEO | Meta Description | Textarea | ❌ | pages.meta_description | ✅ WIRED |

---

## ServiceModal

**Component:** `src/app/(admin)/content/services/components/ServiceModal.tsx`  
**Size:** xl (standardized)

### Fields — Basic Info Tab

| Tab | Field | Type | Required | Max Length | DB Column | Public Wiring Status |
|-----|-------|------|----------|------------|-----------|---------------------|
| Basic Info | Title | Input | ✅ | 100 | title | ✅ WIRED |
| Basic Info | Slug | Input (auto) | ✅ | - | slug | ✅ WIRED |
| Basic Info | Short Description | Textarea | ✅ | 200 | short_description | ✅ WIRED |
| Basic Info | Full Description | Textarea/RichText | ❌ | - | full_description | ✅ WIRED |
| Basic Info | Service Icon | MediaPicker | ❌ | - | icon_media_id | ✅ WIRED |
| Basic Info | Display Order | Number | ❌ | - | display_order | ✅ WIRED (sort) |
| Basic Info | Status | Select | ❌ | - | status | ✅ WIRED (filter) |
| Basic Info | Show Pricing | Switch | ❌ | - | show_pricing | ✅ WIRED (conditional) |
| Basic Info | Monthly Enabled | Switch | ❌ | - | pricing_monthly_enabled | ✅ WIRED |
| Basic Info | Yearly Enabled | Switch | ❌ | - | pricing_yearly_enabled | ✅ WIRED |

### Fields — Process Steps Tab

| Tab | Field | Type | Required | Max Length | DB Column | Public Wiring Status |
|-----|-------|------|----------|------------|-----------|---------------------|
| Process Steps | Step Number | Number (auto) | ✅ | - | step_number | ✅ WIRED |
| Process Steps | Title | Input | ✅ | 50 | title | ✅ WIRED |
| Process Steps | Description | Textarea | ✅ | 300 | description | ✅ WIRED |
| Process Steps | Image | MediaPicker | ❌ | - | image_media_id | ✅ WIRED |

### Fields — Pricing Plans Tab

| Tab | Field | Type | Required | Max Length | DB Column | Public Wiring Status |
|-----|-------|------|----------|------------|-----------|---------------------|
| Pricing Plans | Billing Period | Tabs | ✅ | - | billing_period | ✅ WIRED |
| Pricing Plans | Plan Name | Input | ✅ | 30 | plan_name | ✅ WIRED |
| Pricing Plans | Plan Subtitle | Input | ❌ | 50 | plan_subtitle | ✅ WIRED |
| Pricing Plans | Price Amount | Number | ✅ | - | price_amount | ✅ WIRED |
| Pricing Plans | Currency | Select | ✅ | - | currency | ✅ WIRED |
| Pricing Plans | Features | JSON Array | ❌ | - | features | ✅ WIRED |
| Pricing Plans | CTA Label | Input | ✅ | 20 | cta_label | ✅ WIRED |
| Pricing Plans | Display Order | Number | ❌ | - | display_order | ✅ WIRED |

### Missing Fields (Gap Analysis)

| Field | Status | Notes |
|-------|--------|-------|
| SEO Tab | ❌ MISSING | No SEO fields in modal |
| meta_title | ❌ MISSING | Column does not exist |
| meta_description | ❌ MISSING | Column does not exist |

---

## ProjectModal

**Component:** `src/app/(admin)/content/projects/components/ProjectModal.tsx`  
**Size:** xl (standardized)

### Fields — Basic Info Tab

| Tab | Field | Type | Required | Max Length | DB Column | Public Wiring Status |
|-----|-------|------|----------|------------|-----------|---------------------|
| Basic Info | Title | Input | ✅ | 200 | title | ✅ WIRED |
| Basic Info | Heading | Input | ✅ | 300 | heading | ✅ WIRED |
| Basic Info | Slug | Input (auto) | ✅ | - | slug | ✅ WIRED |
| Basic Info | Description | Textarea | ❌ | - | description | ✅ WIRED |
| Basic Info | Client | Input | ❌ | - | client | ✅ WIRED |
| Basic Info | Website | Input | ❌ | - | website | ✅ WIRED |
| Basic Info | Start Date | DatePicker | ❌ | - | start_date | ✅ WIRED |
| Basic Info | End Date | DatePicker | ❌ | - | end_date | ✅ WIRED |
| Basic Info | Check & Launch Content | Textarea | ❌ | - | check_launch_content | ✅ WIRED |
| Basic Info | Thumbnail Image | MediaPicker | ❌ | - | image_media_id | ✅ WIRED |
| Basic Info | Featured Image | MediaPicker | ❌ | - | featured_image_media_id | ✅ WIRED |
| Basic Info | Check & Launch Image | MediaPicker | ❌ | - | check_launch_image_media_id | ✅ WIRED |
| Basic Info | Category | Select | ✅ | - | category | ✅ WIRED |
| Basic Info | Status | Select | ❌ | - | status | ✅ WIRED (filter) |
| Basic Info | Featured | Checkbox | ❌ | - | is_featured | ✅ WIRED (filter) |
| Basic Info | Display Order | Number | ❌ | - | display_order | ✅ WIRED (sort) |

### Fields — Process Steps Tab

| Tab | Field | Type | Required | Max Length | DB Column | Public Wiring Status |
|-----|-------|------|----------|------------|-----------|---------------------|
| Process Steps | Step Number | Number (auto) | ✅ | - | step_number | ✅ WIRED |
| Process Steps | Title | Input | ✅ | 50 | title | ✅ WIRED |
| Process Steps | Description | Textarea | ❌ | 300 | description | ✅ WIRED |
| Process Steps | Image | MediaPicker | ❌ | - | image_media_id | ✅ WIRED |

### Missing Fields (Gap Analysis)

| Field | Status | Notes |
|-------|--------|-------|
| SEO Tab | ❌ MISSING | No SEO fields in modal |
| meta_title | ❌ MISSING | Column does not exist |
| meta_description | ❌ MISSING | Column does not exist |

---

## TestimonialModal

**Component:** `src/app/(admin)/content/testimonials/components/TestimonialModal.tsx`  
**Size:** xl (standardized)

### Fields

| Tab | Field | Type | Required | Max Length | DB Column | Public Wiring Status |
|-----|-------|------|----------|------------|-----------|---------------------|
| Main | Author Name | Input | ✅ | 50 | author_name | ✅ WIRED |
| Main | Author Title | Input | ❌ | 50 | author_title | ✅ WIRED |
| Main | Company | Input | ❌ | 100 | company | ✅ WIRED |
| Main | Quote | Textarea | ✅ | 500 | quote | ✅ WIRED |
| Main | Rating | Number (1-5) | ❌ | - | rating | ✅ WIRED |
| Main | Avatar | MediaPicker | ❌ | - | avatar_media_id | ✅ WIRED |
| Main | Featured | Switch | ❌ | - | featured | ✅ WIRED (filter) |
| Main | Status | Select | ✅ | - | status | ✅ WIRED (filter) |
| Main | Display Order | Number | ❌ | - | display_order | ✅ WIRED (sort) |

### Missing Fields

None — fully implemented for current requirements.

---

## LeadsModal

**Component:** `src/app/(admin)/crm/leads/components/LeadsModal.tsx`  
**Size:** xl (standardized)

### Fields

| Tab | Field | Type | Required | Max Length | DB Column | Public Wiring Status |
|-----|-------|------|----------|------------|-----------|---------------------|
| Main | Name | Input (readonly) | ✅ | - | name | N/A (admin view) |
| Main | Email | Input (readonly) | ✅ | - | email | N/A (admin view) |
| Main | Subject | Input (readonly) | ❌ | - | subject | N/A (admin view) |
| Main | Message | Textarea (readonly) | ❌ | - | message | N/A (admin view) |
| Main | Source | Badge (readonly) | ✅ | - | source | N/A (admin view) |
| Main | Status | Select | ✅ | - | status | N/A (admin edit) |
| Main | Notes | Textarea | ❌ | - | notes | N/A (admin edit) |

### Notes

- Leads are created by public Contact form (INSERT)
- Admin can only UPDATE status and add notes
- No public wiring — admin-only CRUD

---

## Summary of Modals Needing Expansion

| Modal | Missing | Priority | Public Wiring Impact |
|-------|---------|----------|---------------------|
| BlogPostModal | Category field (verify), SEO tab, Tags | High | SEO fields would improve public SEO |
| ServiceModal | SEO tab | Medium | SEO fields would improve public SEO |
| ProjectModal | SEO tab | Medium | SEO fields would improve public SEO |
| PageEditModal | og_image, canonical_url fields | Low | Enhanced social sharing |

---

## Admin Modal Standard Reference

All content module modals MUST follow these patterns:
- **Size:** `xl` (extra large) — ENFORCED
- **Header:** Modal title + close button
- **Footer:** Cancel (secondary, left) + Save Changes (primary, right)
- **Tabs:** When multiple content areas exist
- **MediaPicker:** For all image fields
- **Form validation:** Required field indicators
- **Tab layout:** Match Services modal pattern

---

**Status:** DONE  
**Execution:** Not Authorized
