# Phase 4 — Module: Settings

```
Status: Draft
Phase: Documentation Only
Execution: Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Module Overview

| Attribute | Value |
|-----------|-------|
| Module Name | Settings |
| Admin Route | `/settings` |
| Public Routes | N/A |
| Current State | Coming Soon placeholder |
| Priority | 8 (placeholder requirements only) |

---

## 2. Phase 4 Scope: PLACEHOLDER ONLY

### 2.1 What Phase 4 Includes

- Settings categories definition
- Key-value schema proposal
- No implementation

### 2.2 What Phase 4 Does NOT Include

- Database tables
- Settings UI forms
- Integration logic

---

## 3. Settings Categories (Future Implementation)

### 3.1 Category Overview

| Category | Purpose | Priority |
|----------|---------|----------|
| General | Site name, tagline, contact info | High |
| Branding | Colors, logo, favicon | Medium |
| SEO | Default meta tags, site verification | Medium |
| Social | Social media links | Medium |
| Integrations | Third-party service keys | Low |

### 3.2 General Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `site_name` | string | "Devmart" | Site/company name |
| `site_tagline` | string | — | Tagline/slogan |
| `contact_email` | string | — | Primary contact email |
| `contact_phone` | string | — | Primary contact phone |
| `contact_address` | text | — | Physical address |

### 3.3 Branding Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `logo_light` | uuid (FK) | — | Logo for light backgrounds |
| `logo_dark` | uuid (FK) | — | Logo for dark backgrounds |
| `favicon` | uuid (FK) | — | Site favicon |
| `primary_color` | string | — | Brand primary color (hex) |
| `secondary_color` | string | — | Brand secondary color (hex) |

**Note**: Branding settings would require template modification to apply. **TBD** whether this is in scope.

### 3.4 SEO Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `default_meta_title` | string | — | Fallback title tag |
| `default_meta_description` | string | — | Fallback meta description |
| `google_verification` | string | — | Google Search Console verification |
| `bing_verification` | string | — | Bing Webmaster verification |

### 3.5 Social Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `facebook_url` | string | — | Facebook page URL |
| `twitter_url` | string | — | Twitter/X profile URL |
| `linkedin_url` | string | — | LinkedIn company URL |
| `instagram_url` | string | — | Instagram profile URL |
| `youtube_url` | string | — | YouTube channel URL |

### 3.6 Integration Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `google_analytics_id` | string | — | GA4 measurement ID |
| `google_maps_api_key` | string | — | Google Maps API key |

**Note**: API keys should be stored securely (environment variables preferred)

---

## 4. Data Model Proposal (Conceptual)

### 4.1 Option A: Key-Value Table

| Column | Type | Description |
|--------|------|-------------|
| `key` | text | Unique setting key |
| `value` | text | Setting value (JSON for complex) |
| `category` | text | Setting category |
| `updated_at` | timestamptz | Last modified |

**Pros**: Flexible, easy to add new settings
**Cons**: No type safety, complex values require JSON

### 4.2 Option B: Typed Settings Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `site_name` | text | Site name |
| `site_tagline` | text | Tagline |
| `contact_email` | text | Email |
| ... | ... | ... |

**Pros**: Type safety, simpler queries
**Cons**: Schema migration for new settings

### 4.3 Recommendation

**Key-Value table** for flexibility, with validation in application layer.

---

## 5. Settings UI (Conceptual Wireframe)

```
┌─────────────────────────────────────────────────────────────┐
│  Settings                                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────────────────────────────────┐│
│  │ Categories  │  │ General Settings                        ││
│  │             │  │                                         ││
│  │ ● General   │  │ Site Name                               ││
│  │ ○ Branding  │  │ ┌─────────────────────────────────────┐ ││
│  │ ○ SEO       │  │ │ Devmart                             │ ││
│  │ ○ Social    │  │ └─────────────────────────────────────┘ ││
│  │ ○ Integrat. │  │                                         ││
│  │             │  │ Site Tagline                            ││
│  │             │  │ ┌─────────────────────────────────────┐ ││
│  │             │  │ │ We build critical digital systems   │ ││
│  │             │  │ └─────────────────────────────────────┘ ││
│  │             │  │                                         ││
│  │             │  │ Contact Email                           ││
│  │             │  │ ┌─────────────────────────────────────┐ ││
│  │             │  │ │ hello@devmart.com                   │ ││
│  │             │  │ └─────────────────────────────────────┘ ││
│  │             │  │                                         ││
│  │             │  │                        [Save Changes]   ││
│  └─────────────┘  └─────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Phase Gate

### 6.1 Implementation Steps (Future)

| Step | Scope | Authorization |
|------|-------|---------------|
| Step 1 | Create settings table, seed defaults | Separate authorization required |
| Step 2 | Build settings UI forms | Separate authorization required |
| Step 3 | Integrate settings with frontend | Separate authorization required |

### 6.2 Dependencies

| Dependency | Required For |
|------------|--------------|
| Media Library | Logo/favicon uploads |

### 6.3 Stop Condition

Before proceeding to implementation:
- [ ] Settings categories approved
- [ ] Key-value vs typed decision made
- [ ] UI wireframe approved
- [ ] Explicit authorization received

---

## 7. MVP vs Later Summary

### 7.1 MVP Scope (Future Implementation)

- General settings (site name, tagline, contact)
- Social media links
- Basic SEO defaults
- Key-value storage

### 7.2 Later Phase Scope

- Branding settings with template integration
- Integration API keys (secure storage)
- Settings history/audit log
- Settings import/export
- Environment-specific settings

---

## 8. TBD Items

| Item | Decision Required |
|------|-------------------|
| Branding integration | Can we apply colors without template modification? |
| API key storage | Environment variables or database? |
| Settings caching | Client-side cache or server-side? |
| Multi-language | Settings per language? |

---

## 9. Template Parity Consideration

### 9.1 Branding Limitations

Per project rules, template modification is NOT allowed. This means:

| Setting | Can Apply Without Template Mod? |
|---------|--------------------------------|
| Site name | Yes (text replacement) |
| Logo | Yes (image replacement) |
| Colors | **No** (requires SCSS changes) |
| Fonts | **No** (requires SCSS changes) |

### 9.2 Recommendation

MVP Settings should focus on:
- Text content (name, tagline, contact)
- Image assets (logo, favicon)
- External links (social media)
- Meta tags (SEO)

Color/font customization requires separate authorization and template modification approval.

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial draft (placeholder requirements only) |

**Next Review:** After Analytics requirements defined
