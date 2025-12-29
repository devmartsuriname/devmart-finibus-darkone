# Frontend Diagnostic: Contact Page

**Route:** `/contact`  
**Component:** `apps/public/src/components/pages/contact/ContactPage.tsx`  
**Purpose:** Conversion  
**Last Verified:** 2025-12-29

---

## Page Metadata

| Property | Value |
|----------|-------|
| Route | `/contact` |
| Page Name | Contact Us |
| Primary Purpose | Lead capture, inquiry submission |
| SEO Type | Conversion page |

---

## Section Breakdown (Top → Bottom Order)

### 1. Breadcrumb (`Breadcrumb.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Page Title (H1) | "Contact Us" | 10 chars | 8–20 | PROP (pageName) | High |
| Breadcrumb Trail | "Home > Contact Us" | varies | - | HARDCODED + PROP | Low |

**Heading Structure:** H1 (page title)

**Data Source Status:** Prop-driven from parent

---

### 2. Contact Info Cards (`ContactUsArea.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Section Label | "Get In Touch" | 12 chars | 10–20 | HARDCODED | Low |
| Section Title (H2) | "contact us if you have more questions." | 40 chars | 30–60 | HARDCODED | Medium |
| Card 1 Title (H4) | "Location" | 8 chars | 8–15 | HARDCODED | Low |
| Card 1 Value | e.g., "168/170, Ave 01, Mirpur DOHS..." | 30–60 chars | 20–80 | CMS (B+C) | Medium |
| Card 2 Title (H4) | "Phone" | 5 chars | 5–10 | HARDCODED | Low |
| Card 2 Value | e.g., "+88 1234 567 890" | 15–20 chars | 12–25 | CMS (B+C) | Medium |
| Card 3 Title (H4) | "Email" | 5 chars | 5–10 | HARDCODED | Low |
| Card 3 Value | e.g., "contact@devmart.com" | 15–25 chars | 15–40 | CMS (B+C) | Medium |

**Heading Structure:** H2 (section) → H4 (card titles)

**Layout Sensitivity:**
- 3-column grid for contact cards
- Address may wrap on mobile
- Phone/email as clickable links

**Data Source Status:**
- Card labels: HARDCODED
- Values: CMS-driven via `settings` table (`contact_address`, `contact_phone`, `contact_email`)

---

### 3. Contact Form (`ContactForm.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Form Title (H3) | "Have Any Questions" | 18 chars | 15–30 | HARDCODED | Low |
| Name Placeholder | "Enter your name" | 15 chars | 12–25 | HARDCODED | None |
| Email Placeholder | "Enter your email" | 16 chars | 12–25 | HARDCODED | None |
| Subject Placeholder | "Subject" | 7 chars | 7–15 | HARDCODED | None |
| Message Placeholder | "Your message" | 12 chars | 10–20 | HARDCODED | None |
| Submit Button | "Send Message" | 12 chars | 10–20 | HARDCODED | None |
| Success Message | "Thank you! Your message has been sent successfully." | 50 chars | 40–80 | HARDCODED | None |
| Error Message | Dynamic error text | varies | 30–100 | HARDCODED | None |

**Heading Structure:** H3 (form title)

**Layout Sensitivity:**
- 6-column form, 6-column map
- Form fields stack vertically
- Submit button full-width within form

**Data Source Status:**
- All labels/placeholders: HARDCODED
- Form submits to `leads` table

**Form Functionality:**
- ✅ Functional submission to `leads` table
- ✅ Client-side validation (required fields, email format)
- ✅ Honeypot anti-spam field
- ✅ Success/error feedback

---

### 4. Google Map (`ContactForm.tsx`)

| Element | Text Content | Observed Length | Safe Range | Data Source | SEO Relevance |
|---------|-------------|-----------------|------------|-------------|---------------|
| Map Embed | (no text) | - | - | CMS (B+C) | Low |

**Data Source Status:**
- CMS-driven via `settings` table (`google_maps_embed_url`)

---

### 5. Let's Talk CTA Section (`LetsTalkArea.tsx`)

*Reused from Homepage - see Frontend_Home.md for full breakdown*

---

## CTA Inventory

| CTA | Location | Destination | Role | Data Source |
|-----|----------|-------------|------|-------------|
| "Home" | Breadcrumb | `/` | Navigation | HARDCODED |
| Phone Link | Contact Card | `tel:{phone}` | Conversion | CMS |
| Email Link | Contact Card | `mailto:{email}` | Conversion | CMS |
| "Send Message" | Form | Form Submit | Conversion | HARDCODED |
| "Get In Touch" | Let's Talk | `/contact` (self) | Conversion | CMS |

---

## SEO-Relevant Elements

| Element | Type | Content | Notes |
|---------|------|---------|-------|
| H1 | Heading | "Contact Us" (breadcrumb) | Primary page identifier |
| H2 | Heading | Section title | Secondary keyword |
| H3 | Heading | Form title | Low priority |
| Contact info | Structured data | Address, phone, email | Schema.org potential |

---

## Summary

| Metric | Value |
|--------|-------|
| Total Sections | 5 (including breadcrumb + CTA) |
| CMS-Driven Fields | 4 (address, phone, email, map) |
| Hardcoded Labels | ~15 |
| CTAs | 5 |
| Form Fields | 4 (name, email, subject, message) |

---

## Form → Database Mapping

| Form Field | DB Column | Required | Validation |
|------------|-----------|----------|------------|
| Name | leads.name | Yes | Non-empty |
| Email | leads.email | Yes | Email format |
| Subject | leads.subject | No | - |
| Message | leads.message | Yes | Non-empty |
| (auto) | leads.source | - | "contact_form" |
| (auto) | leads.status | - | "new" |

---

## Settings Keys Used

| Key | Table | Purpose |
|-----|-------|---------|
| `contact_address` | settings | Location card value |
| `contact_phone` | settings | Phone card value |
| `contact_email` | settings | Email card value |
| `google_maps_embed_url` | settings | Map iframe src |

---

**Status:** DONE  
**Execution:** Not Authorized  
**Source Verification:** A (UI) + B (DB Seed) + C (Admin)
