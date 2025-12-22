# Phase 4 — Module: Settings

```
Status: Draft
Phase: Documentation Only
Execution: Not Authorized
Last Updated: 2025-12-22
```

---

## 1. Module Overview

| Attribute | Value |
|-----------|-------|
| Module Name | Settings |
| Admin Route | `/settings` |
| Public Routes | N/A |
| Current State | Coming Soon placeholder |
| Priority | 2 (after Media Library) |

---

## 2. Phase 4 Scope

### 2.1 What Phase 4 Includes

- Site identity settings (name, tagline, contact)
- Social media links
- Basic SEO defaults
- Key-value storage

### 2.2 What Phase 4 Does NOT Include

- Branding/color customization (requires template modification)
- API key storage (use environment variables)
- Multi-language settings

---

## 3. Settings Categories

### 3.1 General Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `site_name` | string | "Devmart" | Site/company name |
| `site_tagline` | string | — | Tagline/slogan |
| `contact_email` | string | — | Primary contact email |
| `contact_phone` | string | — | Primary contact phone |
| `contact_address` | text | — | Physical address |

### 3.2 SEO Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `default_meta_title` | string | — | Fallback title tag |
| `default_meta_description` | string | — | Fallback meta description |

### 3.3 Social Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `facebook_url` | string | — | Facebook page URL |
| `twitter_url` | string | — | Twitter/X profile URL |
| `linkedin_url` | string | — | LinkedIn company URL |
| `instagram_url` | string | — | Instagram profile URL |

---

## 4. Data Model Proposal (MVP)

### 4.1 Option: Key-Value Table

| Column | Type | Description |
|--------|------|-------------|
| `key` | text (PK) | Unique setting key |
| `value` | text | Setting value |
| `category` | text | Setting category |
| `updated_at` | timestamptz | Last modified |

### 4.2 RLS Considerations

**Public Access (SELECT)**:
- Public can read non-sensitive settings (for SEO, contact display)

**Admin Access (ALL)**:
- Authenticated users can update all settings

---

## 5. Seeding Plan

### 5.1 Seed Data Requirement

| Attribute | Value |
|-----------|-------|
| **Required** | **YES** |
| **Reason** | Default settings must exist before site functions correctly |

### 5.2 Seed Dataset

| Key | Category | Default Value |
|-----|----------|---------------|
| `site_name` | general | "Devmart" |
| `site_tagline` | general | "We build critical digital systems" |
| `contact_email` | general | "info@devmart.sr" |
| `contact_phone` | general | "" |
| `contact_address` | general | "" |
| `default_meta_title` | seo | "Devmart - Digital Solutions" |
| `default_meta_description` | seo | "Professional digital solutions for your business" |
| `facebook_url` | social | "" |
| `twitter_url` | social | "" |
| `linkedin_url` | social | "" |
| `instagram_url` | social | "" |

**Count:** 11 settings (1 config set)

### 5.3 Seeding Method

**Recommended:** SQL seed migration

**Rationale:**
- Settings are pre-defined with default values
- Simple INSERT statements
- Consistent across environments
- One-time setup

### 5.4 Sample Seed SQL

```sql
INSERT INTO public.settings (key, value, category)
VALUES
  ('site_name', 'Devmart', 'general'),
  ('site_tagline', 'We build critical digital systems', 'general'),
  ('contact_email', 'info@devmart.sr', 'general'),
  ('contact_phone', '', 'general'),
  ('contact_address', '', 'general'),
  ('default_meta_title', 'Devmart - Digital Solutions', 'seo'),
  ('default_meta_description', 'Professional digital solutions for your business', 'seo'),
  ('facebook_url', '', 'social'),
  ('twitter_url', '', 'social'),
  ('linkedin_url', '', 'social'),
  ('instagram_url', '', 'social');
```

### 5.5 Acceptance Criteria

- [ ] All 11 default settings exist in database
- [ ] Admin can view settings by category
- [ ] Admin can update each setting value
- [ ] Updated settings reflect on public site (where applicable)
- [ ] Empty values handled gracefully

---

## 6. Admin UI Requirements

### 6.1 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Settings | `/settings` | Category tabs with forms |

### 6.2 Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Settings                                                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────────────────────────┐│
│  │ Categories  │  │ General Settings                        ││
│  │             │  │                                         ││
│  │ ● General   │  │ Site Name: [___________]                ││
│  │ ○ SEO       │  │ Tagline: [___________]                  ││
│  │ ○ Social    │  │ Email: [___________]                    ││
│  │             │  │                                         ││
│  │             │  │                        [Save Changes]   ││
│  └─────────────┘  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Admin UI Standard Reference

See: `Phase_4_Admin_UI_Standard.md`

This module uses a different layout (tabs + forms) but MUST follow:
- Toast notifications for save success/error
- Form validation patterns
- Button placement conventions

---

## 8. Phase Gate

### 8.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create settings table, seed defaults | Separate authorization required |
| Step 2 | Build settings UI forms | Separate authorization required |
| Step 3 | Integrate settings with frontend | Separate authorization required |

### 8.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| Media Library | Logo uploads (future) |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft (placeholder requirements only) |
| 1.0 | 2025-12-22 | Planning Agent | Added Seeding Plan (REQUIRED), updated priority |

**Next Review:** After Media Library seeding complete
