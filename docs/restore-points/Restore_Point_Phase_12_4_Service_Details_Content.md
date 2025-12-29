# Restore Point: Phase 12.4 — Service Details Content

**Created:** 2025-12-29
**Phase:** 12.4 (Service Details)
**Scope:** service_process_steps (21 records) + service_pricing_plans (42 records)
**Status:** BEFORE UPDATE

---

## Snapshot Summary

| Table | Records | Fields Changed |
|-------|---------|----------------|
| service_process_steps | 21 | title, description |
| service_pricing_plans | 42 | plan_name, plan_subtitle, price_amount, features, cta_label |

---

## Pre-Update Data: service_process_steps (21 records)

All records had identical placeholder content before update:
- **title (step 1):** "Wireframe & Design"
- **title (step 2):** "Developing"
- **title (step 3):** "Checkup & Launch"
- **description (all):** "In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, eget lacinia magna justo vehiculametus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor."

### Record IDs by Service

| Service Slug | Step 1 ID | Step 2 ID | Step 3 ID |
|--------------|-----------|-----------|-----------|
| 3d-design | cd1d4ada-46a9-4a9d-9c91-8fbfb5ff683b | cf6f21cc-9ba7-443b-8621-dadc9138862d | 0fab4158-001d-4986-82ca-3d6ae7b715d9 |
| app-design | a77b8ca0-940b-485f-ac90-95964974e245 | 855ad763-18d3-40ff-9c7e-94fef5dd1736 | 7ca495da-0ea8-44fa-91d6-98da194efd14 |
| developing | 106c7cfc-c0e0-4b74-a0a5-c749761e5f68 | 39a32391-878b-43ff-8d97-a80de7f0a050 | 05a957bf-be9e-439f-a27c-be0d9b623edb |
| graphic-design | 64f33caa-c6fd-4bf0-a755-c22ac0d7d118 | 9b1e810e-580b-4566-bd80-f0e05e506559 | b2a53089-9cd4-483a-ae65-16c6066945ae |
| ui-ux-design | 633ff2fb-1074-42fa-a010-2d4ed4b16a38 | (see query) | (see query) |
| video-animation | (see query) | (see query) | (see query) |
| web-design | (see query) | (see query) | (see query) |

---

## Pre-Update Data: service_pricing_plans (42 records)

All records had identical placeholder content before update:
- **plan_name options:** "Small Business", "Professional", "Enterprise"
- **plan_subtitle options:** "Single Business", "Small team", "Large Business"
- **price_amount range:** 99.99 to 350.00
- **features:** Marketing-focused (PPC Campaigns, SEO Keywords, Facebook Campaigns, Video Campaigns)
- **cta_label:** "Pay Now" (all records)

---

## Rollback SQL: service_process_steps

```sql
-- ROLLBACK: Restore placeholder content to all 21 process steps
UPDATE service_process_steps
SET 
  title = CASE step_number
    WHEN 1 THEN 'Wireframe & Design'
    WHEN 2 THEN 'Developing'
    WHEN 3 THEN 'Checkup & Launch'
  END,
  description = 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, eget lacinia magna justo vehiculametus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor.';
```

---

## Rollback SQL: service_pricing_plans

```sql
-- ROLLBACK: Restore placeholder content to all 42 pricing plans
-- Monthly plans (display_order 1,2,3)
UPDATE service_pricing_plans
SET 
  plan_name = CASE display_order
    WHEN 1 THEN 'Small Business'
    WHEN 2 THEN 'Professional'
    WHEN 3 THEN 'Enterprise'
  END,
  plan_subtitle = CASE display_order
    WHEN 1 THEN 'Single Business'
    WHEN 2 THEN 'Small team'
    WHEN 3 THEN 'Large Business'
  END,
  price_amount = CASE display_order
    WHEN 1 THEN 150.99
    WHEN 2 THEN 99.99
    WHEN 3 THEN 350.00
  END,
  features = CASE display_order
    WHEN 1 THEN '["10 Pages Responsive Website","5 PPC Campaigns","10 SEO Keywords","5 Facebook Campaigns","2 Video Campaigns"]'::jsonb
    WHEN 2 THEN '["15 Pages Responsive Website","10 PPC Campaigns","15 SEO Keywords","8 Facebook Campaigns","5 Video Campaigns"]'::jsonb
    WHEN 3 THEN '["20 Pages Responsive Website","15 PPC Campaigns","20 SEO Keywords","15 Facebook Campaigns","12 Video Campaigns"]'::jsonb
  END,
  cta_label = 'Pay Now'
WHERE billing_period = 'monthly';

-- Yearly plans (display_order 1,2,3)
UPDATE service_pricing_plans
SET 
  plan_name = CASE display_order
    WHEN 1 THEN 'Professional'
    WHEN 2 THEN 'Small Business'
    WHEN 3 THEN 'Enterprise'
  END,
  plan_subtitle = CASE display_order
    WHEN 1 THEN 'Small team'
    WHEN 2 THEN 'Single Business'
    WHEN 3 THEN 'Large Business'
  END,
  price_amount = CASE display_order
    WHEN 1 THEN 99.99
    WHEN 2 THEN 150.00
    WHEN 3 THEN 130.00
  END,
  features = CASE display_order
    WHEN 1 THEN '["16 Pages Responsive Website","12 PPC Campaigns","18 SEO Keywords","8 Facebook Campaigns","7 Video Campaigns"]'::jsonb
    WHEN 2 THEN '["20 Pages Responsive Website","15 PPC Campaigns","20 SEO Keywords","15 Facebook Campaigns","11 Video Campaigns"]'::jsonb
    WHEN 3 THEN '["20 Pages Responsive Website","15 PPC Campaigns","50 SEO Keywords","15 Facebook Campaigns","12 Video Campaigns"]'::jsonb
  END,
  cta_label = 'Pay Now'
WHERE billing_period = 'yearly';
```

---

## Content Applied (Phase 12.4)

See Content Pack: `DOCUMENT_—_Phase_12.4B_Service_Details_Content_Pack.txt`

### Process Steps Updated (21 records)
All 7 services × 3 steps = 21 records updated with Devmart methodology content.

### Pricing Plans Updated (42 records)
All 7 services × 6 plans (3 monthly + 3 yearly) = 42 records updated.
- CTA changed from "Pay Now" to "Get a Quote"
- Features aligned to service-specific deliverables

---

## Guardian Rules Compliance

- ✅ No schema changes
- ✅ No slug changes
- ✅ No record additions/deletions
- ✅ No type/interface changes
- ✅ No component modifications
- ✅ No CSS/SCSS changes
- ✅ Darkone Admin 1:1 preserved
- ✅ Finibus Frontend 1:1 preserved
