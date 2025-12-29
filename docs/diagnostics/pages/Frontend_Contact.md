# Frontend Diagnostic: Contact Page

**Route:** `/contact`  
**Component:** `apps/public/src/components/pages/contact/ContactPage.tsx`  
**Purpose:** Lead Capture  
**Last Verified:** 2025-12-29  
**Updated:** 2025-12-29 (Added Swapability Labels, Wiring Status)

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/contact` |
| Page Name | Contact Us |
| Primary Purpose | Lead capture, contact information display |
| SEO Type | Conversion page |

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
| Page Title (H1) | "Contact Us" | 10 chars | 8–20 | PROP | High |
| Breadcrumb Trail | "Home > Contact Us" | 18 chars | - | HARDCODED + PROP | Medium |

**Heading Structure:** H1 (page title)

---

### 2. Contact Info Cards (`ContactUsArea.tsx`)

**Swapable via CMS:** PARTIAL  
**Reason:** Card values from CMS; card labels HARDCODED  
**Admin Fields Available:** `settings.contact_address`, `settings.contact_phone`, `settings.contact_email`  
**Public Rendering Source:** Mixed  
**Wiring Status:** PARTIAL (values WIRED, labels NOT WIRED)

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Section Label | "Get In Touch" | 12 chars | 10–20 | HARDCODED | Low |
| Section Title (H2) | "contact us if you have more questions." | 40 chars | 30–60 | HARDCODED | Medium |
| Card 1 Title (H4) | "Location" | 8 chars | 8–15 | HARDCODED | Low |
| Card 1 Value | e.g., "168/170, Ave 01, Mirpur DOHS..." | 30–60 chars | 20–80 | B+C (settings) | Medium |
| Card 2 Title (H4) | "Phone" | 5 chars | 5–10 | HARDCODED | Low |
| Card 2 Value | e.g., "+88 1234 567 890" | 15–20 chars | 12–25 | B+C (settings) | Medium |
| Card 3 Title (H4) | "Email" | 5 chars | 5–10 | HARDCODED | Low |
| Card 3 Value | e.g., "contact@devmart.com" | 15–25 chars | 15–40 | B+C (settings) | Medium |

**Heading Structure:** H2 (section) → H4 (card titles)

**Layout Sensitivity:** 3-column grid on desktop. Address may wrap on mobile. Phone/email as clickable links.

---

### 3. Contact Form (`ContactForm.tsx`)

**Swapable via CMS:** PARTIAL  
**Reason:** Form is functional (submits to leads); labels HARDCODED  
**Admin Fields Available:** N/A (form labels not CMS-managed)  
**Public Rendering Source:** Mixed (labels hardcoded, submission WIRED)  
**Wiring Status:** PARTIAL (submission WIRED, labels NOT WIRED)

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Form Title (H3) | "Have Any Questions" | 18 chars | 15–30 | HARDCODED | Low |
| Name Placeholder | "Enter your name" | 15 chars | 12–25 | HARDCODED | None |
| Email Placeholder | "Enter your email" | 16 chars | 12–25 | HARDCODED | None |
| Subject Placeholder | "Subject" | 7 chars | 7–15 | HARDCODED | None |
| Message Placeholder | "Your message" | 12 chars | 10–20 | HARDCODED | None |
| Submit Button | "Send Message" | 12 chars | 10–20 | HARDCODED | None |
| Success Message | "Thank you! Your message has been sent." | 50 chars | 40–80 | HARDCODED | None |

**Form Functionality:**
- ✅ Functional submission to `leads` table
- ✅ Client-side validation (required fields, email format)
- ✅ Honeypot anti-spam field
- ✅ Success/error feedback

---

### 4. Google Map (`ContactForm.tsx`)

**Swapable via CMS:** YES  
**Reason:** Map embed URL from CMS settings  
**Admin Fields Available:** `settings.google_maps_embed_url`  
**Public Rendering Source:** CMS  
**Wiring Status:** WIRED

| Element | Text Content | Observed Length | Safe Range | Source | SEO Relevance |
|---------|-------------|-----------------|------------|--------|---------------|
| Map Embed | (no text) | - | - | B+C (settings) | None |

**Layout Sensitivity:** Map is full-width below form. Aspect ratio maintained by container.

---

### 5. Let's Talk CTA Section (`LetsTalkArea.tsx`)

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
| Phone Link | Contact Card | `tel:{phone}` | Conversion | CMS |
| Email Link | Contact Card | `mailto:{email}` | Conversion | CMS |
| "Send Message" | Form | Form Submit → leads | Conversion | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` (self) | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | "Contact Us" (breadcrumb) | Primary keyword |
| H2 | Heading | Section title | Secondary keyword |
| H3 | Heading | Form title | Low priority |
| H4s | Headings | Card titles | Low priority |
| Contact info | Structured data | Address, phone, email | Schema.org potential |

---

## Swapability Summary

| Section | Swapable | Admin Fields Exist | Public Wired | Gap |
|---------|----------|-------------------|--------------|-----|
| Breadcrumb | N/A | N/A | Route-driven | None |
| Contact Info (values) | ✅ YES | ✅ | ✅ | None |
| Contact Info (labels) | ❌ NO | ❌ | ❌ | Labels hardcoded |
| Contact Form (labels) | ❌ NO | ❌ | ❌ | Labels hardcoded |
| Contact Form (submit) | ✅ YES | ✅ (leads table) | ✅ | None |
| Google Map | ✅ YES | ✅ | ✅ | None |
| Let's Talk CTA | ✅ YES | ✅ | ✅ | None (shared) |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 5 |
| CMS-Driven | 4 (Contact info values, Form submission, Map, CTA) |
| Hardcoded Labels | ~15 |
| CTAs | 5 |
| Functional Forms | 1 (Contact form → leads) |

---

## Form → Database Mapping

| Form Field | leads Column | Required | Validation |
|------------|--------------|----------|------------|
| Name | name | Yes | Non-empty |
| Email | email | Yes | Email format |
| Subject | subject | No | - |
| Message | message | Yes | Non-empty |
| (auto) | source | - | "contact_form" |
| (auto) | status | - | "new" |
| (auto) | created_at | - | Timestamp |

---

## Settings Keys Used

| Key | Category | Used By |
|-----|----------|---------|
| `contact_address` | contact | ContactUsArea |
| `contact_phone` | contact | ContactUsArea |
| `contact_email` | contact | ContactUsArea |
| `google_maps_embed_url` | contact | ContactForm |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
