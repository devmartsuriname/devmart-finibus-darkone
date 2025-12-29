# Admin Diagnostic: Modals & Fields Inventory

**Last Verified:** 2025-12-29

---

## Blog Post Modal (`BlogPostModal.tsx`)

**Tabs:** None (single form)

| Field | Type | Required | Max Length | DB Column |
|-------|------|----------|------------|-----------|
| Title | text | ✅ | 200 | title |
| Slug | text | ✅ | - | slug |
| Excerpt | textarea | ❌ | 300 | excerpt |
| Content | textarea | ✅ | - | content |
| Featured Image | MediaPicker | ❌ | - | featured_image_media_id |
| Status | select | ❌ | - | status |
| Publish Date | date | ❌ | - | published_at |

**Missing Fields:** `category` (in DB but not in modal), SEO fields

**Expansion Needed:** Add Category dropdown, Add SEO tab

---

## Page Edit Modal (`PageEditModal.tsx`)

**Tabs:** Page Info | Sections | SEO (Homepage/About only)

### Standard Pages
| Field | Type | Required | Max Length | DB Column |
|-------|------|----------|------------|-----------|
| Slug | text | readonly | - | slug |
| Title | text | ✅ | 100 | title |
| Meta Title | text | ❌ | 70 | meta_title |
| Meta Description | textarea | ❌ | 160 | meta_description |
| Published | switch | ❌ | - | is_published |

### Homepage Special
- Sections tab with enable/disable toggles
- SEO tab with full meta fields

### About Page Special
- Sections tab (InsideStory editing)
- SEO tab

---

## Service Modal (`ServiceModal.tsx`)

**Tabs:** Basic Info | Process Steps | Pricing Plans

### Basic Info Tab
| Field | Type | Required | Max Length | DB Column |
|-------|------|----------|------------|-----------|
| Title | text | ✅ | 100 | title |
| Slug | text | ✅ | - | slug |
| Short Description | textarea | ✅ | 200 | short_description |
| Full Description | textarea | ❌ | - | full_description |
| Service Icon | MediaPicker | ❌ | - | icon_media_id |
| Display Order | number | ❌ | - | display_order |
| Status | select | ❌ | - | status |
| Show Pricing | switch | ❌ | - | show_pricing |
| Monthly Enabled | switch | ❌ | - | pricing_monthly_enabled |
| Yearly Enabled | switch | ❌ | - | pricing_yearly_enabled |

### Process Steps Tab
- Dynamic step editor (step_number, title, description, image)

### Pricing Plans Tab
- Dynamic plan editor (plan_name, price, features, billing_period)

**Missing:** SEO tab

---

## Project Modal (`ProjectModal.tsx`)

**Tabs:** Basic Info | Process Steps

### Basic Info Tab
| Field | Type | Required | Max Length | DB Column |
|-------|------|----------|------------|-----------|
| Title | text | ✅ | 200 | title |
| Heading | text | ✅ | 300 | heading |
| Slug | text | ✅ | - | slug |
| Description | textarea | ❌ | - | description |
| Client | text | ❌ | - | client |
| Website | text | ❌ | - | website |
| Start Date | date | ❌ | - | start_date |
| End Date | date | ❌ | - | end_date |
| Check & Launch Content | textarea | ❌ | - | check_launch_content |
| Thumbnail Image | MediaPicker | ❌ | - | image_media_id |
| Featured Image | MediaPicker | ❌ | - | featured_image_media_id |
| Check & Launch Image | MediaPicker | ❌ | - | check_launch_image_media_id |
| Category | select | ✅ | - | category |
| Status | select | ❌ | - | status |
| Featured | checkbox | ❌ | - | is_featured |
| Display Order | number | ❌ | - | display_order |

### Process Steps Tab
- Dynamic step editor (step_number, title, description, image)

**Missing:** SEO tab

---

## Summary: Modals Needing Expansion

| Modal | Missing | Priority |
|-------|---------|----------|
| BlogPostModal | Category field, SEO tab | High |
| ServiceModal | SEO tab | Medium |
| ProjectModal | SEO tab | Medium |
| PageEditModal | og_image, canonical | Low |

---

**Status:** DONE  
**Execution:** Not Authorized
