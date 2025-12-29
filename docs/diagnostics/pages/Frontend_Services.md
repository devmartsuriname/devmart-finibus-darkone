# Frontend Diagnostic: Services Page

**Route:** `/service`  
**Component:** `apps/public/src/components/pages/service/ServicesPage.tsx`  
**Purpose:** Service Discovery + Navigation  
**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Swapability Labels, Wiring Status)

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/service` |
| Page Name | Services |
| Primary Purpose | Service discovery, navigation to details |
| SEO Type | Category/listing page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

**Swapable via CMS:** PARTIAL  
**Reason:** Page title from props/route; breadcrumb trail HARDCODED structure  
**Admin Fields Available:** N/A (route-driven)  
**Public Rendering Source:** Prop-driven  
**Wiring Status:** N/A

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Page Title (H1) | "Service" | 7 chars | 7–15 | PROP | High |
| Breadcrumb Trail | "Home > Service" | 15 chars | - | HARDCODED + PROP | Medium |

**Heading Structure:** H1 (page title)

---

### 2. What We Do Section (`WhatWeDoArea.tsx`)

**Swapable via CMS:** PARTIAL  
**Reason:** Service cards from CMS; wrapper labels HARDCODED  
**Admin Fields Available:** N/A for wrapper (no homepage_settings for this page's wrapper)  
**Public Rendering Source:** Mixed (Cards=CMS, Labels=Hardcoded)  
**Wiring Status:** PARTIAL (cards WIRED, wrapper NOT WIRED)

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Label | "what we do" | 10 chars | 10–20 | HARDCODED | Low |
| Section Title (H2) | "we work performed for client happy." | 36 chars | 30–60 | HARDCODED | Medium |
| CTA Label | "view all services" | 17 chars | 15–25 | HARDCODED | Low |
| Service Title (H4) | e.g., "Web Design", "App Design" | 10–25 chars | 10–25 | B (services table) | High |
| Short Description | e.g., "Fusce ornare mauris nisi..." | 60–100 chars | 60–120 | B (services table) | Medium |
| Service Icon | Icon from media table | - | - | B (services.icon_media_id) | None |
| Card CTA | "read more" | 9 chars | 8–15 | HARDCODED | Low |

**Heading Structure:** H2 (section) → H4 (service cards)

**Layout Sensitivity:** 
- First 4 services display in right column (2×2 grid)
- Services 5–7 display in bottom row (1×3 grid)
- All 7 published services render (no limit)
- Unlike Homepage which shows first 4 only

---

### 3. How We Work Section (`HowWeWorkArea.tsx`)

**Swapable via CMS:** NO  
**Reason:** COMPLETELY HARDCODED — static Finibus template content  
**Admin Fields Available:** None  
**Public Rendering Source:** Hardcoded  
**Wiring Status:** NOT WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Label | "How We Work" | 11 chars | 10–20 | HARDCODED | Low |
| Section Title (H2) | "Our Unique Work Process." | 24 chars | 20–40 | HARDCODED | Medium |
| Slide Step Number | "01", "02" | 2 chars | 2 | HARDCODED | None |
| Slide Title (H4) | "Brainstorm & Wirefirm" | 21 chars | 15–30 | HARDCODED | Low |
| Slide Description | Process step details | ~100 chars | 80–150 | HARDCODED | Low |

**Heading Structure:** H2 (section) → H4 (slide titles)

**Layout Sensitivity:** Full-width carousel with navigation arrows. Step images are fixed aspect ratio.

**Gap:** This section is COMPLETELY HARDCODED with no CMS support. This is a KNOWN LIMITATION — maintaining Finibus template parity takes priority over CMS-ification.

---

### 4. Let's Talk CTA Section (`LetsTalkArea.tsx`)

**Swapable via CMS:** YES  
**Reason:** Reused from Homepage; CMS-driven via `homepage_settings.cta`  
**Admin Fields Available:** `title_line_1`, `title_line_2`, `title_line_3`, `cta_label`, `cta_url`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Label | "Let's Talk" | 10 chars | 8–15 | HARDCODED | Low |
| Title Line 1 (H2) | "About Your Next" | 15 chars | 12–25 | A+B+C | Medium |
| Title Line 2 (bold) | "Project" | 7 chars | 5–15 | A+B+C | High |
| Title Line 3 | "Your Mind" | 9 chars | 8–15 | A+B+C | Low |
| CTA Label | "Get In Touch" | 12 chars | 10–20 | A+B+C | Low |

**Heading Structure:** H2 (title)

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| "view all services" | What We Do | `/service` (self) | Navigation | HARDCODED |
| "read more" (×7) | Service Cards | `/service-details/{slug}` | Navigation | HARDCODED |
| Carousel Arrows | How We Work | Slider navigation | UI | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | "Service" (breadcrumb) | Primary keyword |
| H2s | Headings | Section titles (2) | Secondary keywords |
| H4s | Headings | Service titles + step titles | Entity names |
| Service slugs | URLs | `/service-details/{slug}` | Crawlable links |

---

## Swapability Summary

| Section | Swapable | Admin Fields Exist | Public Wired | Gap |
|---------|----------|-------------------|--------------|-----|
| Breadcrumb | N/A | N/A | Route-driven | None |
| What We Do (wrapper) | ❌ NO | ❌ | ❌ | No Admin fields for this page's wrapper |
| What We Do (cards) | ✅ YES | ✅ | ✅ | None |
| How We Work | ❌ NO | ❌ | ❌ | FULLY HARDCODED — Template parity |
| Let's Talk CTA | ✅ YES | ✅ | ✅ | None (shared) |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 4 |
| CMS-Driven Sections | 2 (Service cards, CTA) |
| Hardcoded Sections | 1 (How We Work - entire section) |
| Partial Sections | 1 (What We Do - wrapper only) |
| CMS-Driven Fields | ~21 (7 services × 3 fields) |
| Hardcoded Labels | ~20 |
| CTAs | 10 |
| Known Gap | How We Work section has no CMS support |

---

## Gap: How We Work Section

**Status:** HARDCODED (template parity)  
**Component:** `HowWeWorkArea.tsx`  
**Current State:** 4 slides with static content  
**Admin Support:** None  
**Public Wiring:** None  
**Future Consideration:** Could be wired to `global_blocks` table if CMS control is needed, but this is NOT authorized under current constraints.

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
