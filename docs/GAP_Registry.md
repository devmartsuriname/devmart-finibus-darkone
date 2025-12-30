# GAP Registry — Devmart Phase 12.x Findings

**Status:** Reference Document  
**Last Updated:** 2025-12-30  
**Total GAPs:** 56

---

## Summary by Classification

| Classification | Count | Description |
|----------------|-------|-------------|
| Content-Only | 35 | Hardcoded labels eligible for future CMS wiring |
| Structural | 21 | Non-functional UI or template parity constraints |

---

## Summary by Page

| Page | GAP Range | Content-Only | Structural |
|------|-----------|--------------|------------|
| Homepage | GAP-01–05 | 5 | 0 |
| About | GAP-06–08 | 0 | 3 |
| Contact | GAP-09–20 | 12 | 0 |
| Services Listing | GAP-21–28 | 4 | 4 |
| Service Details | GAP-29–36 | 8 | 0 |
| Projects Listing | GAP-37–41 | 5 | 0 |
| Blog Listing | GAP-42–56 | 1 | 14 |

---

## Detailed GAP Registry

### Homepage (GAP-01 to GAP-05)

| ID | Component | Element | Current Value | Classification | Status |
|----|-----------|---------|---------------|----------------|--------|
| GAP-01 | ServiceArea.tsx | Section label | "what we do" | Content-Only | NOT WIRED |
| GAP-02 | PortfolioArea.tsx | Section labels | Hardcoded intro/title | Content-Only | NOT WIRED |
| GAP-03 | NewsLatterArea.tsx | Section labels | Hardcoded intro/title | Content-Only | NOT WIRED |
| GAP-04 | NewsLatterArea.tsx | Newsletter section | All labels hardcoded | Content-Only | NOT WIRED |
| GAP-05 | TestimonialArea.tsx | Section title | Hardcoded | Content-Only | NOT WIRED |

---

### About Page (GAP-06 to GAP-08)

| ID | Component | Element | Issue | Classification | Status |
|----|-----------|---------|-------|----------------|--------|
| GAP-06 | InsideStoryArea.tsx | Signature image | No MediaPicker wired | Structural | NOT WIRED |
| GAP-07 | InsideStoryArea.tsx | Main image | No MediaPicker wired | Structural | NOT WIRED |
| GAP-08 | LatesNewsArea.tsx | Author info | "Posted by, Admin" static | Structural | HARDCODED |

---

### Contact Page (GAP-09 to GAP-20)

| ID | Component | Element | Current Value | Classification | Status |
|----|-----------|---------|---------------|----------------|--------|
| GAP-09 | ContactUsArea.tsx | Section label | "Get In Touch" | Content-Only | HARDCODED |
| GAP-10 | ContactUsArea.tsx | Section title | "contact us if you have more questions." | Content-Only | HARDCODED |
| GAP-11 | ContactUsArea.tsx | Card label | "Location" | Content-Only | HARDCODED |
| GAP-12 | ContactUsArea.tsx | Card label | "Phone" | Content-Only | HARDCODED |
| GAP-13 | ContactUsArea.tsx | Card label | "Email" | Content-Only | HARDCODED |
| GAP-14 | ContactForm.tsx | Form heading | "Have Any Questions" | Content-Only | HARDCODED |
| GAP-15 | ContactForm.tsx | Placeholder | "Your Name" | Content-Only | HARDCODED |
| GAP-16 | ContactForm.tsx | Placeholder | "Your Email" | Content-Only | HARDCODED |
| GAP-17 | ContactForm.tsx | Placeholder | "Subject" | Content-Only | HARDCODED |
| GAP-18 | ContactForm.tsx | Placeholder | "Your Message" | Content-Only | HARDCODED |
| GAP-19 | ContactForm.tsx | Submit button | "Send Message" | Content-Only | HARDCODED |
| GAP-20 | ContactForm.tsx | Success message | "Thank you!..." | Content-Only | HARDCODED |

---

### Services Listing (GAP-21 to GAP-28)

| ID | Component | Element | Current Value | Classification | Status |
|----|-----------|---------|---------------|----------------|--------|
| GAP-21 | WhatWeDoArea.tsx | Section label | "what we do" | Content-Only | HARDCODED |
| GAP-22 | WhatWeDoArea.tsx | Section title | "we work performed for client happy." | Content-Only | HARDCODED |
| GAP-23 | WhatWeDoArea.tsx | CTA label | "view all services" | Content-Only | HARDCODED |
| GAP-24 | WhatWeDoArea.tsx | Card CTA | "read more" | Content-Only | HARDCODED |
| GAP-25 | HowWeWorkArea.tsx | Entire section | Completely hardcoded | Structural | TEMPLATE PARITY |
| GAP-26 | HowWeWorkArea.tsx | Section label | "How We Work" | Structural | TEMPLATE PARITY |
| GAP-27 | HowWeWorkArea.tsx | Section title | "Our Unique Work Process." | Structural | TEMPLATE PARITY |
| GAP-28 | HowWeWorkArea.tsx | Slide titles | "Brainstorm & Wirefirm" etc. | Structural | TEMPLATE PARITY |

---

### Service Details (GAP-29 to GAP-36)

| ID | Component | Element | Current Value | Classification | Status |
|----|-----------|---------|---------------|----------------|--------|
| GAP-29 | ServiceDetailsWrapper.tsx | Process heading | "How We Work in our services" | Content-Only | HARDCODED |
| GAP-30 | ServiceDetailsWrapper.tsx | Sidebar title | "Services" | Content-Only | HARDCODED |
| GAP-31 | ServiceDetailsWrapper.tsx | Search placeholder | "Search Here" | Content-Only | HARDCODED |
| GAP-32 | ServicePrice.tsx | Section label | "Pricing Plan" | Content-Only | HARDCODED |
| GAP-33 | ServicePrice.tsx | Section title | "Service Plans" | Content-Only | HARDCODED |
| GAP-34 | ServicePrice.tsx | Tab label | "Pay Monthly" | Content-Only | HARDCODED |
| GAP-35 | ServicePrice.tsx | Tab label | "Pay Yearly" | Content-Only | HARDCODED |
| GAP-36 | PriceBox.tsx | Price period | "Per month/year" | Content-Only | HARDCODED |

---

### Projects Listing (GAP-37 to GAP-41)

| ID | Component | Element | Current Value | Classification | Status |
|----|-----------|---------|---------------|----------------|--------|
| GAP-37 | CartFilter.tsx | Filter tab | "All" | Content-Only | HARDCODED |
| GAP-38 | CartFilter.tsx | Card CTA | "Case Study" | Content-Only | HARDCODED |
| GAP-39 | ProjectWrapper.tsx | Loading text | Placeholder text | Content-Only | HARDCODED |
| GAP-40 | Breadcrumb.tsx | SVG separator | Static icon | Content-Only | HARDCODED |
| GAP-41 | LetsTalkArea.tsx | Section label | "Let's Talk" | Content-Only | HARDCODED |

---

### Blog Listing (GAP-42 to GAP-56)

| ID | Component | Element | Issue | Classification | Status |
|----|-----------|---------|-------|----------------|--------|
| GAP-42 | BlogCart.tsx | Author name | "Devmart Team" hardcoded | Content-Only | HARDCODED |
| GAP-43 | BlogCart.tsx | Card CTA | "View details" hardcoded | Structural | HARDCODED |
| GAP-44 | BlogCart.tsx | Category link | Links to `/` (non-functional) | Structural | NOT WIRED |
| GAP-45 | SidebarSearch.tsx | Placeholder | "Search Here..." | Structural | UI-ONLY |
| GAP-46 | SidebarSearch.tsx | Search function | Form does nothing | Structural | NOT FUNCTIONAL |
| GAP-47 | ServiceList.tsx | Widget title | "Services" | Structural | HARDCODED |
| GAP-48 | ServiceList.tsx | Service links | Static list, not from DB | Structural | NOT WIRED |
| GAP-49 | NewsPost.tsx | Widget title | "Newest Post" | Structural | HARDCODED |
| GAP-50 | NewsPost.tsx | Post data | Hardcoded, not from blog_posts | Structural | NOT WIRED |
| GAP-51 | PopularTag.tsx | Widget title | "Popular Tags" | Structural | HARDCODED |
| GAP-52 | PopularTag.tsx | Tag links | Hardcoded, not from blog_tags | Structural | NOT WIRED |
| GAP-53 | BannerWiget.tsx | Banner text | "Looking For new job?" | Structural | HARDCODED |
| GAP-54 | BannerWiget.tsx | CTA label | "Get Start" | Structural | HARDCODED |
| GAP-55 | Pagination.tsx | Page numbers | UI-only, non-functional | Structural | NOT FUNCTIONAL |
| GAP-56 | Pagination.tsx | Pagination logic | No limit/offset implemented | Structural | NOT FUNCTIONAL |

---

## Prioritization Notes

### Phase 12.x Scope (Content-Only — Deferred)

| Priority | GAP Range | Description |
|----------|-----------|-------------|
| Low | GAP-09–20 | Contact page labels (cosmetic) |
| Medium | GAP-21–24 | Services wrapper labels |
| Medium | GAP-29–36 | Service Details labels |
| Low | GAP-37–41 | Projects listing labels |
| Low | GAP-42 | Blog author display |

### Future Phases (Structural — Out of Scope)

| Category | GAPs | Requirement |
|----------|------|-------------|
| MediaPicker | GAP-06, GAP-07 | Admin modal changes |
| How We Work | GAP-25–28 | Template parity constraint |
| Blog Sidebar | GAP-45–54 | Functional implementation |
| Pagination | GAP-55–56 | Backend query + UI wiring |
| Category Filter | GAP-44 | Route + query implementation |

---

## Guardian Rules Reminder

All structural GAPs are intentionally deferred per project constraints:

1. **Finibus Frontend LOCKED** — Must remain 1:1 with template
2. **No layout changes** — No CSS/SCSS modifications
3. **No new components** — No refactors beyond data binding
4. **Read-only public app** — Exception: Contact Form → Leads INSERT

---

## Document History

| Date | Phase | GAPs Added | Notes |
|------|-------|------------|-------|
| 2025-12-30 | 12.1 | GAP-01–05 | Homepage verification |
| 2025-12-30 | 12.2 | GAP-06–08 | About page verification |
| 2025-12-30 | 12.3 | GAP-09–20 | Contact page verification |
| 2025-12-30 | 12.7 | GAP-21–28 | Services Listing verification |
| 2025-12-30 | 12.8 | GAP-29–36 | Service Details verification |
| 2025-12-30 | 12.9 | GAP-37–41 | Projects Listing verification |
| 2025-12-30 | 12.10 | GAP-42–56 | Blog Listing verification |
