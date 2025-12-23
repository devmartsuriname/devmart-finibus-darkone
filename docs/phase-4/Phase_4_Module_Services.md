# Phase 4 Module: Services

**Status:** Pending Implementation  
**Created:** 2025-12-23  
**Priority:** MVP Required

---

## 1. Overview

The Services module enables administrators to manage service offerings displayed on the public website. This includes:
- Service listing cards (title, icon, short description)
- Service detail pages (full description, process steps)
- Pricing plans (monthly/yearly tiers with features)

---

## 2. MVP Scope

### Included
- Services CRUD (Admin only)
- Process Steps management (per service)
- Pricing Plans management (per service, monthly/yearly)
- Seed data matching Finibus template

### Excluded
- ❌ Public frontend changes (Finibus is LOCKED)
- ❌ Stripe integration
- ❌ Payment processing
- ❌ Checkout flows
- ❌ New public routes

---

## 3. Database Schema

### 3.1 services

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Primary key |
| title | text | NOT NULL, max 100 chars | Service name |
| slug | text | UNIQUE, NOT NULL | URL-safe identifier |
| short_description | text | NOT NULL, max 200 chars | Card description |
| full_description | text | NULL | Detail page content |
| icon_media_id | uuid | FK → media, NULL | Service icon |
| display_order | integer | NOT NULL, default 0 | Sort order |
| status | text | NOT NULL, default 'draft' | draft | published |
| created_at | timestamptz | NOT NULL, default now() | Created timestamp |
| updated_at | timestamptz | NOT NULL, default now() | Updated timestamp |

### 3.2 service_process_steps

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Primary key |
| service_id | uuid | FK → services, NOT NULL, ON DELETE CASCADE | Parent service |
| step_number | integer | NOT NULL | Step order (1, 2, 3...) |
| title | text | NOT NULL, max 100 chars | Step title |
| description | text | NOT NULL | Step description |
| image_media_id | uuid | FK → media, NULL | Step image |
| created_at | timestamptz | NOT NULL, default now() | Created timestamp |
| updated_at | timestamptz | NOT NULL, default now() | Updated timestamp |

### 3.3 service_pricing_plans

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Primary key |
| service_id | uuid | FK → services, NOT NULL, ON DELETE CASCADE | Parent service |
| billing_period | text | NOT NULL | 'monthly' or 'yearly' |
| plan_name | text | NOT NULL, max 50 chars | e.g., "Small Business" |
| plan_subtitle | text | NULL, max 100 chars | e.g., "Single Business" |
| price_amount | numeric(10,2) | NOT NULL | Price value |
| currency | text | NOT NULL, default 'USD' | Currency code |
| features | jsonb | NOT NULL, default '[]' | Array of feature strings |
| cta_label | text | NOT NULL, default 'Get Started' | Button text |
| display_order | integer | NOT NULL, default 0 | Sort order |
| status | text | NOT NULL, default 'draft' | draft | published |
| created_at | timestamptz | NOT NULL, default now() | Created timestamp |
| updated_at | timestamptz | NOT NULL, default now() | Updated timestamp |

---

## 4. RLS Policies

### services
- **Public SELECT:** WHERE status = 'published'
- **Admin SELECT:** has_role(auth.uid(), 'admin')
- **Admin INSERT:** has_role(auth.uid(), 'admin')
- **Admin UPDATE:** has_role(auth.uid(), 'admin')
- **Admin DELETE:** has_role(auth.uid(), 'admin')

### service_process_steps
- **Public SELECT:** WHERE service.status = 'published' (via join)
- **Admin CRUD:** has_role(auth.uid(), 'admin')

### service_pricing_plans
- **Public SELECT:** WHERE status = 'published' AND service.status = 'published'
- **Admin CRUD:** has_role(auth.uid(), 'admin')

---

## 5. Admin UI Specification

### Location
`/content/services` (sidebar under "Content")

### List View
- Columns: Icon/Thumbnail, Title, Status, Display Order, Updated, Actions
- Search by title
- Status badge (Draft/Published)
- Actions: Edit, Delete

### Create/Edit Modal
- **Basic Fields:**
  - Title (required)
  - Slug (auto-generated, editable)
  - Short Description (required, max 200)
  - Full Description (optional, textarea)
  - Icon (media picker)
  - Display Order
  - Status (Draft/Published)

- **Process Steps Tab:**
  - Inline editor for steps
  - Fields: Step Number, Title, Description, Image
  - Add/Remove steps

- **Pricing Plans Tab:**
  - Two sections: Monthly / Yearly
  - Fields: Plan Name, Subtitle, Price, Features (array), CTA Label
  - Status per plan

---

## 6. Seed Data Requirements

### Services (7 total, matching Finibus template)
1. Web Design
2. App Design
3. Developing
4. Graphic Design
5. Video Animation
6. 3D Design
7. UI/UX Design

### Process Steps (3 per service)
1. Wireframe & Design
2. Developing
3. Checkup & Launch

### Pricing Plans (6 per service: 3 monthly + 3 yearly)
- Small Business ($150.99/mo, $130/yr)
- Professional ($99.99/mo, $99.99/yr)
- Enterprise ($350/mo, $150/yr)

---

## 7. Acceptance Criteria

- [ ] Admin can create, read, update, delete services
- [ ] Admin can manage process steps per service
- [ ] Admin can manage pricing plans (monthly/yearly) per service
- [ ] Public users can only SELECT published services/plans
- [ ] Seed data populates all 7 services with steps and pricing
- [ ] No console errors on admin pages
- [ ] No public/frontend code modified

---

## 8. Future Enhancements (Out of MVP Scope)

- Link pricing CTA to Quote/Offer Wizard
- Dynamic service detail pages on public site
- Category filtering
- SEO metadata per service
