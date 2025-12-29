# Frontend Diagnostic: Services Page

**Route:** `/service`  
**Component:** `apps/public/src/components/pages/service/ServicesPage.tsx`  
**Purpose:** Informational  
**Last Verified:** 2025-12-29

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/service` |
| Page Name | Services |
| Primary Purpose | Service discovery, conversion path to service details |
| SEO Type | Category/listing page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Page Title (H1) | "Service" | 7 chars | 7–20 | PROP (pageName) | High |
| Breadcrumb Trail | "Home > Service" | varies | - | HARDCODED + PROP | Low |

**Heading Structure:** H1 (page title)

**Data Source Status:** Prop-driven from parent

---

### 2. What We Do Section (`WhatWeDoArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "what we do" | 10 chars | 10–20 | HARDCODED | Low |
| Section Title (H2) | "we work performed for client happy." | 36 chars | 30–60 | HARDCODED | Medium |
| CTA Label | "view all services" | 17 chars | 15–25 | HARDCODED | Low |
| Service Title (H4) | e.g., "Web Design", "App Design" | 10–25 chars | 10–25 | CMS (B) | High |
| Short Description | e.g., "Fusce ornare mauris nisi..." | 60–100 chars | 60–120 | CMS (B) | Medium |
| Card CTA | "read more" | 9 chars | 8–15 | HARDCODED | Low |

**Heading Structure:** H2 (section) → H4 (service cards)

**Layout Sensitivity:**
- First 4 services display in right column (2×2 grid)
- Services 5–7 display in bottom row (1×3 grid)
- Service titles should remain single-line
- Short descriptions truncated visually

**Data Source Status:**
- Section labels: HARDCODED
- Service data: CMS-driven via `services` table (all published, ordered by `display_order`)

---

### 3. How We Work Section (`HowWeWorkArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "How We Work" | 11 chars | 10–20 | HARDCODED | Low |
| Section Title (H2) | "Our Unique Work Process." | 24 chars | 20–40 | HARDCODED | Medium |
| Slide Step Number | "01", "02" | 2 chars | 2 | HARDCODED | None |
| Slide Title (H4) | "Brainstorm & Wirefirm" | 21 chars | 15–30 | HARDCODED | Low |

**Heading Structure:** H2 (section) → H4 (slide titles)

**Layout Sensitivity:** Full-width carousel with navigation arrows. Step images are fixed aspect ratio.

**Data Source Status:**
- COMPLETELY HARDCODED - no CMS integration
- Uses static Finibus images (`work-process-slider-1.png`, etc.)

**Note:** This section may need future CMS wiring if content swap is desired.

---

### 4. Let's Talk CTA Section (`LetsTalkArea.tsx`)

*Reused from Homepage - see Frontend_Home.md for full breakdown*

**Data Source Status:** CMS-driven via `homepage_settings.cta`

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| "view all services" | What We Do | `/service` (self) | Navigation | HARDCODED |
| "read more" (×7) | Service Cards | `/service-details/{slug}` | Navigation | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | "Service" (breadcrumb) | Primary page identifier |
| H2s | Headings | Section titles (×2) | Secondary keywords |
| H4s | Headings | Service titles | High-value entity names |
| Service slugs | URLs | `/service-details/{slug}` | Internal linking |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 4 (including breadcrumb) |
| CMS-Driven Fields | ~21 (7 services × 3 fields) |
| Hardcoded Labels | ~15 |
| CTAs | 10 |
| Pricing Section | Removed (Phase 10A - pricing on detail pages only) |

---

**Gap Identified:** 
- "How We Work" section is completely hardcoded
- No CMS support for work process slides
- Would require new table/JSON block if content swap needed

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
