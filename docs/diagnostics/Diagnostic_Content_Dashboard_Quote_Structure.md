# Diagnostic Report: Content, Dashboard & Quote Structure

**Status:** Diagnostic Only  
**Phase:** Pre-Authorization Analysis  
**Date:** 2025-12-29  
**Purpose:** Strategic decision support for Content Swap, Dashboard KPIs, and Quote Wizard planning

---

## Scope A — Content Structure (MD Mapping Pre-check)

### Overview

Analysis of text-field structure across 6 public pages. Images, icons, layout, styling, button URLs, and forms are explicitly excluded.

---

### Page: Home (`/`)

| Section | Identifier | Title Fields | Description/Body Fields | CTA Labels | Source |
|---------|------------|--------------|------------------------|------------|--------|
| Hero | `hero` | `title`, `subtitle` | — | `cta_primary_text`, `cta_secondary_text` | CMS (`homepage_settings`) |
| About Preview | `about_preview` | `title`, `subtitle` | `description` | `cta_text` | CMS (`homepage_settings`) |
| Services Grid | `services` | `section_title`, `section_subtitle` | — | — | CMS (`homepage_settings`) |
| Service Cards | (per service) | `title` | `short_description` | — | CMS (`services` table) |
| Counter Stats | `counters` | — | — | — | CMS (`homepage_settings.counters[]`) |
| How We Work | `how_we_work` | `section_title` | `section_description` | — | CMS (`homepage_settings`) |
| Process Steps | (per step) | `title` | `description` | — | CMS (`homepage_settings.process_steps[]`) |
| Projects Preview | `projects` | `section_title`, `section_subtitle` | — | — | CMS (`homepage_settings`) |
| Project Cards | (per project) | `title`, `category` | — | — | CMS (`projects` table) |
| Testimonials | `testimonials` | `section_title` | — | — | CMS (`homepage_settings`) |
| Testimonial Cards | (per testimonial) | `author_name`, `author_title`, `company` | `quote` | — | CMS (`testimonials` table) |
| CTA Banner | `cta_banner` | `title` | `description` | `cta_text` | CMS (`homepage_settings`) |
| Blog Preview | `blog` | `section_title`, `section_subtitle` | — | — | CMS (`homepage_settings`) |
| Blog Cards | (per post) | `title` | `excerpt` | — | CMS (`blog_posts` table) |

**Field Classification:**
- CMS-Driven: ~25 fields
- Hardcoded: ~5 section labels ("what we do", "How We Work", etc.)

---

### Page: About (`/about`)

| Section | Identifier | Title Fields | Description/Body Fields | CTA Labels | Source |
|---------|------------|--------------|------------------------|------------|--------|
| Page Header | `breadcrumb` | Page title | — | — | Hardcoded ("About Us") |
| About Content | `about_main` | `title` | `content` (rich text) | — | CMS (`page_settings` where `page_slug='about'`) |
| Vision/Mission | `vision_mission` | `vision_title`, `mission_title` | `vision_content`, `mission_content` | — | CMS (`page_settings`) |
| Team Section | `team` | `section_title` | — | — | Hardcoded label + CMS data |
| Team Members | (per member) | `name`, `role` | `bio` | — | CMS (`page_settings.team[]`) |
| Counter Stats | `counters` | — | — | — | CMS (shared or page-specific) |

**Field Classification:**
- CMS-Driven: ~12 fields
- Hardcoded: ~3 labels

---

### Page: Services (`/services`)

| Section | Identifier | Title Fields | Description/Body Fields | CTA Labels | Source |
|---------|------------|--------------|------------------------|------------|--------|
| Page Header | `breadcrumb` | Page title | — | — | Hardcoded ("Our Services") |
| Services Grid | `services_list` | `section_title`, `section_subtitle` | — | — | CMS (`page_settings`) or Hardcoded |
| Service Cards | (per service) | `title` | `short_description` | — | CMS (`services` table) |

**Field Classification:**
- CMS-Driven: ~3 per service × 7 services = ~21 fields
- Hardcoded: ~2 labels

---

### Page: Service Details (`/services/:slug`)

| Section | Identifier | Title Fields | Description/Body Fields | CTA Labels | Source |
|---------|------------|--------------|------------------------|------------|--------|
| Page Header | `breadcrumb` | `title` (dynamic) | — | — | CMS (`services.title`) |
| Service Hero | `service_hero` | `title` | `full_description` | — | CMS (`services` table) |
| Process Steps | `process` | "How We Work" label | — | — | Hardcoded label |
| Process Step Cards | (per step) | `title` | `description` | — | CMS (`service_process_steps` table) |
| Pricing Section | `pricing` | "Pricing Plans" label | — | — | Hardcoded label |
| Pricing Cards | (per plan) | `plan_name`, `plan_subtitle` | `features[]` | `cta_label` | CMS (`service_pricing_plans` table) |

**Field Classification:**
- CMS-Driven: ~5 base + ~3 per step + ~6 per plan
- Hardcoded: ~2 section labels

---

### Page: Projects (`/projects`)

| Section | Identifier | Title Fields | Description/Body Fields | CTA Labels | Source |
|---------|------------|--------------|------------------------|------------|--------|
| Page Header | `breadcrumb` | Page title | — | — | Hardcoded ("Our Projects") |
| Filter Tabs | `category_filter` | Category names | — | — | CMS (derived from `projects.category`) |
| Project Cards | (per project) | `title`, `heading`, `category` | — | — | CMS (`projects` table) |

**Field Classification:**
- CMS-Driven: ~4 per project × 8 projects = ~32 fields
- Hardcoded: ~1 label

---

### Page: Project Details (`/projects/:slug`)

| Section | Identifier | Title Fields | Description/Body Fields | CTA Labels | Source |
|---------|------------|--------------|------------------------|------------|--------|
| Page Header | `breadcrumb` | `title` (dynamic) | — | — | CMS (`projects.title`) |
| Project Hero | `project_hero` | `title`, `heading` | `description` | — | CMS (`projects` table) |
| Project Meta | `project_meta` | "Client", "Category", "Date" labels | `client`, `category`, `start_date`/`end_date` | — | Mixed (labels hardcoded, values CMS) |
| Process Steps | `process` | "Project Process" label | — | — | Hardcoded label |
| Process Step Cards | (per step) | `title` | `description` | — | CMS (`project_process_steps` table) |
| Check & Launch | `check_launch` | "Check & Launch" label | `check_launch_content` | — | Mixed |

**Field Classification:**
- CMS-Driven: ~8 base + ~2 per step
- Hardcoded: ~4 labels

---

### Page: Blog (`/blog`)

| Section | Identifier | Title Fields | Description/Body Fields | CTA Labels | Source |
|---------|------------|--------------|------------------------|------------|--------|
| Page Header | `breadcrumb` | Page title | — | — | Hardcoded ("Blog") |
| Blog Cards | (per post) | `title` | `excerpt` | — | CMS (`blog_posts` table) |
| Post Meta | (per post) | `author_name`, `category` | — | — | CMS (`blog_posts` + related) |
| Tags | `tags` | `name` | — | — | CMS (`blog_tags` table) |

**Field Classification:**
- CMS-Driven: ~5 per post × 6 posts = ~30 fields
- Hardcoded: ~1 label

---

### Page: Blog Details (`/blog/:slug`)

| Section | Identifier | Title Fields | Description/Body Fields | CTA Labels | Source |
|---------|------------|--------------|------------------------|------------|--------|
| Page Header | `breadcrumb` | `title` (dynamic) | — | — | CMS (`blog_posts.title`) |
| Post Content | `post_content` | `title` | `content` (rich text), `excerpt` | — | CMS (`blog_posts` table) |
| Post Meta | `post_meta` | `author_name`, `category`, `published_at` | — | — | CMS |
| Tags | `post_tags` | `name` (per tag) | — | — | CMS (`blog_tags` via `blog_post_tags`) |
| Comments | `comments` | `commenter_name` | `body` | — | CMS (`blog_comments` table) |

**Field Classification:**
- CMS-Driven: ~10 fields + dynamic comments
- Hardcoded: ~2 labels

---

### Page: Contact (`/contact`)

| Section | Identifier | Title Fields | Description/Body Fields | CTA Labels | Source |
|---------|------------|--------------|------------------------|------------|--------|
| Page Header | `breadcrumb` | Page title | — | — | Hardcoded ("Contact Us") |
| Contact Info | `contact_info` | "Address", "Phone", "Email" labels | `contact_address`, `contact_phone`, `contact_email` | — | Mixed (labels hardcoded, values CMS `settings`) |
| Contact Form | `contact_form` | "Send us a Message" | — | "Send Message" | Hardcoded labels |
| Map | `map` | — | — | — | CMS (`settings.google_maps_embed_url`) |

**Field Classification:**
- CMS-Driven: ~4 fields
- Hardcoded: ~5 labels

---

### Summary: Content Structure Classification

| Category | Approximate Field Count |
|----------|------------------------|
| **CMS-Driven** | 65+ fields |
| **Hardcoded** | 35+ labels/headings |
| **Mixed** | 10+ (label hardcoded, value CMS) |

**Key Finding:** All entity-level content (services, projects, blog posts, testimonials) is CMS-driven. Most section-level labels (e.g., "How We Work", "Our Services") are hardcoded.

---

## Scope B — Dashboard & Analytics (Current State)

### Dashboard Routes Inventory

| Route | Current State | Connected to DB |
|-------|--------------|-----------------|
| `/dashboard` | "Coming Soon" placeholder | No |
| `/dashboards` | Darkone demo (static) | No |
| `/analytics` | "Coming Soon" placeholder | No |

### Admin Modules with Usable Data

| Module | Table(s) | Available KPI Data | Current Record Count |
|--------|----------|-------------------|---------------------|
| **Services** | `services`, `service_process_steps`, `service_pricing_plans` | Count by status, pricing plan counts | 7 services, 21 steps, 42 plans |
| **Projects** | `projects`, `project_process_steps` | Count by status, category distribution, featured count | 8 projects |
| **Blog** | `blog_posts`, `blog_tags`, `blog_comments`, `blog_post_tags` | Count by status, posts per category, comment count | 6 posts, 6 tags |
| **Testimonials** | `testimonials` | Count by status, featured count, avg rating | 6 testimonials |
| **Pages** | `pages`, `page_settings` | Count, published vs draft | 6 pages |
| **Media** | `media` | Total assets, by file type, total storage | 38 assets |
| **Leads** | `leads` | Count by status, by source, conversion rate | 0 leads |
| **Settings** | `settings` | Key count by category | 14+ keys |

### Technically Available KPI Fields

| Data Type | Available Fields |
|-----------|-----------------|
| **Counts** | All tables support `COUNT(*)` |
| **Status Distribution** | `services.status`, `projects.status`, `blog_posts.status`, `testimonials.status`, `leads.status` |
| **Timestamps** | `created_at`, `updated_at` on all tables; `published_at` on blog/testimonials |
| **Categories/Sources** | `projects.category`, `blog_posts.category`, `leads.source` |
| **Featured Flags** | `projects.is_featured`, `testimonials.featured` |
| **Ordering** | `display_order` on services, projects, testimonials |

### Current Dashboard Widget State

| Widget Type | Exists | Data Source |
|-------------|--------|-------------|
| Total counts cards | No (placeholder) | — |
| Status charts | No (placeholder) | — |
| Recent activity feed | No (placeholder) | — |
| Quick actions | No (placeholder) | — |
| Performance metrics | No (placeholder) | — |

**Key Finding:** All admin modules produce usable data for KPIs. Dashboard UI is placeholder-only with no database connections.

---

## Scope C — Quote / Pricing Foundation Check

### Existing Service Structure

**Table: `services`**

| Column | Type | Quote-Relevant |
|--------|------|----------------|
| `id` | uuid | Yes (service selection) |
| `title` | text | Yes (display) |
| `slug` | text | Yes (URL/reference) |
| `short_description` | text | Yes (summary) |
| `full_description` | text | Optional |
| `show_pricing` | boolean | Yes (visibility toggle) |
| `pricing_monthly_enabled` | boolean | Yes (billing option) |
| `pricing_yearly_enabled` | boolean | Yes (billing option) |
| `status` | text | Yes (only published) |

**Table: `service_pricing_plans`**

| Column | Type | Quote-Relevant |
|--------|------|----------------|
| `id` | uuid | Yes (plan selection) |
| `service_id` | uuid FK | Yes (service link) |
| `billing_period` | text ('monthly'/'yearly') | Yes |
| `plan_name` | text | Yes (tier: "Small Business", "Professional", "Enterprise") |
| `plan_subtitle` | text | Yes (description) |
| `price_amount` | numeric | Yes (base price) |
| `currency` | text | Yes (USD default) |
| `features` | jsonb[] | Yes (feature list) |
| `cta_label` | text | Yes (action text) |
| `display_order` | integer | Yes (sorting) |
| `status` | text | Yes (only published) |

### Current Capabilities (Quote Wizard Support)

| Capability | Supported | Notes |
|------------|-----------|-------|
| Single service selection | ✅ Yes | Via `services` table |
| Tier selection (3 levels) | ✅ Yes | Via `service_pricing_plans.plan_name` |
| Monthly/Yearly toggle | ✅ Yes | Via `billing_period` + service flags |
| Static price display | ✅ Yes | Via `price_amount` |
| Feature comparison | ✅ Yes | Via `features` jsonb array |

### Current Gaps (Quote Wizard Blockers)

| Gap | Impact | Required to Resolve |
|----|--------|---------------------|
| No multi-service bundling | Cannot combine services in one quote | New `quote_items` or similar table |
| No custom scope inputs | Cannot adjust pricing based on requirements | New fields/tables for scope variables |
| No dynamic pricing formulas | Price is static, no calculations | Business logic + formula storage |
| No quote persistence | Cannot save/retrieve quotes | New `quotes` table with line items |
| No add-ons or modifiers | Cannot upsell optional features | New `service_addons` table |
| No discount structures | No promo codes, volume discounts | New discount logic/tables |
| No quote-to-lead conversion | Quote cannot auto-create lead | Workflow/trigger implementation |

### Data Inventory for Future Wizard

**Currently Available:**
- 7 services with full metadata
- 42 pricing plans (6 per service: 3 monthly, 3 yearly)
- 3-tier structure: Small Business, Professional, Enterprise
- 5 features per plan (jsonb array)
- Monthly and yearly billing periods
- Price amounts in USD

**Not Available:**
- Quote entity/table
- Line item tracking
- Custom scope variables
- Dynamic pricing rules
- Bundle configurations
- Add-on catalog
- Discount mechanisms

---

## Summary

### Content Structure (Scope A)
- **65+ CMS-driven fields** across 6 pages
- **35+ hardcoded labels** (section titles, form labels)
- All entity content is fully CMS-driven
- Section labels require code changes to modify

### Dashboard (Scope B)
- **3 routes** exist, all are placeholders
- **8 admin modules** produce usable KPI data
- No dashboard widgets are connected to database
- All required data fields exist for basic KPIs

### Quote Foundation (Scope C)
- **Services + Pricing Plans** provide tier selection foundation
- **Static pricing** is fully supported
- **Multi-service quotes** not supported (table structure gap)
- **Quote persistence** not supported (no quotes table)

---

## Document Status

| Attribute | Value |
|-----------|-------|
| Type | Diagnostic Only |
| Execution | Not Authorized |
| Recommendations | None Provided |
| Next Step | Await strategic decisions |

---

*End of Diagnostic Report*
