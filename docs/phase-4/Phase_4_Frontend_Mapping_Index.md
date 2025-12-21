# Phase 4 — Frontend Mapping Index

```
Status: Draft
Phase: Documentation Only
Execution: Not Authorized
Last Updated: 2025-12-21
```

---

## 1. Purpose

This document maps ALL public frontend (Finibus) routes and their content blocks to identify:
- Which sections contain static vs dynamic content
- Required fields for CMS integration
- Assets needed (images, files)
- Relationships between content types

**CRITICAL**: This mapping is the ONLY allowed source for data-field assumptions.

---

## 2. Route Inventory

| Route | Component | Layout | CMS Required |
|-------|-----------|--------|--------------|
| `/` | HomePage | HomeLayout | Yes |
| `/home2` | HomePage2 | DarkLayout | Yes |
| `/about` | AboutPage | MainLayout | Partial |
| `/service` | ServicesPage | MainLayout | TBD |
| `/service-details` | ServiceDetails | MainLayout | TBD |
| `/project` | ProjectsPage | MainLayout | Yes |
| `/project-details` | ProjectDetailsPage | MainLayout | Yes |
| `/blog` | BlogPage | MainLayout | Yes |
| `/blog-standard` | BlogStandardPage | MainLayout | Yes |
| `/blog-details` | BlogDetailsPage | MainLayout | Yes |
| `/contact` | ContactPage | MainLayout | Leads Capture |
| `/commingsoon` | CommingSoonPage | Standalone | No |
| `/error` | ErrorPage | MainLayout | No |

---

## 3. Homepage (`/`) — Content Blocks

### 3.1 HeroArea

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Background image | Image | TBD | TBD |
| Headline | Text | TBD | TBD |
| Subheadline | Text | TBD | TBD |
| CTA Button | Link | TBD | TBD |

**Source File**: `apps/public/src/components/pages/Home/HeroArea.tsx`

### 3.2 ServiceArea

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Service cards | Repeater | TBD | TBD |
| Service title | Text | TBD | TBD |
| Service description | Text | TBD | TBD |
| Service icon | Image/Icon | TBD | TBD |

**Source File**: `apps/public/src/components/pages/Home/ServiceArea.tsx`
**Note**: Services behavior requires further analysis — **TBD**

### 3.3 AboutArea

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Section heading | Text | Static | N/A |
| About text | Text | Static | N/A |
| About image | Image | Static | N/A |

**Source File**: `apps/public/src/components/pages/Home/AboutArea.tsx`

### 3.4 OurPartnerArea

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Partner logos | Images | Static | N/A |

**Source File**: `apps/public/src/components/pages/Home/OurPartnerArea.tsx`

### 3.5 PortfolioArea

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Project cards | Repeater | **Yes** | See Projects module |
| Project image | Image | **Yes** | `image` |
| Project title | Text | **Yes** | `title` |
| Project category | Text | **Yes** | `category` |
| Project heading | Text | **Yes** | `heading` |

**Source File**: `apps/public/src/components/pages/Home/PortfolioArea.tsx`
**Data Source**: `apps/public/src/components/data/Data.ts`

### 3.6 WhyChooseUsArea

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Section content | Text | Static | N/A |
| Feature list | Text | Static | N/A |

**Source File**: `apps/public/src/components/common/WhyChooseUsArea.tsx`

### 3.7 TestimonialArea (CONFIRMED DYNAMIC)

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Client photo | Image | **Yes** | `client_image` |
| Client name | Text | **Yes** | `client_name` |
| Client title | Text | **Yes** | `client_title` |
| Quote text | Text | **Yes** | `quote_text` |
| Rating | Number | **Yes** | `rating` (1-5) |

**Source File**: `apps/public/src/components/common/TestimonialArea.tsx`
**Display**: Swiper carousel with navigation

### 3.8 NewsLatterArea

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Newsletter form | Form | Static | N/A |
| Background | Image | Static | N/A |

**Source File**: `apps/public/src/components/pages/Home/NewsLatterArea.tsx`

### 3.9 LetsTalkArea

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| CTA text | Text | Static | N/A |
| CTA button | Link | Static | N/A |

**Source File**: `apps/public/src/components/common/LetsTalkArea.tsx`

---

## 4. Projects Page (`/project`) — Content Blocks

### 4.1 Breadcrumb

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Page name | Text | Static | N/A |

### 4.2 ProjectWrapper / CartFilter (CONFIRMED DYNAMIC)

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Filter tabs | Repeater | **Yes** | Category list |
| Project cards | Repeater | **Yes** | See below |

**Source File**: `apps/public/src/components/common/CartFilter.tsx`
**Data Source**: `apps/public/src/components/data/Data.ts`

#### Project Card Fields (CONFIRMED)

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `id` | Number | Yes | Data.ts |
| `title` | String | Yes | Data.ts |
| `heading` | String | Yes | Data.ts |
| `image` | String (URL) | Yes | Data.ts |
| `category` | String | Yes | Data.ts |

**Current Categories (from Data.ts)**:
- UI/UX
- Web Design
- Developing
- Graphic Design

---

## 5. Project Details Page (`/project-details`) — Content Blocks

### 5.1 ProjectProcess

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Project overview | Text | **Yes** | `description` |
| Project image | Image | **Yes** | `featured_image` |
| Process steps | Repeater | TBD | TBD |

**Source File**: `apps/public/src/components/pages/projectDetails/ProjectProcess.tsx`

### 5.2 ReletedProject

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Related projects | Repeater | **Yes** | Same as project cards |

**Source File**: `apps/public/src/components/pages/projectDetails/ReletedProject.tsx`

---

## 6. Blog Page (`/blog`) — Content Blocks

### 6.1 Sidebar Components

| Component | Type | Dynamic | MVP Field |
|-----------|------|---------|-----------|
| SidebarSearch | Form | Static | N/A |
| ServiceList | Links | TBD | TBD |
| NewsPost | Repeater | **Yes** | Recent posts |
| PopularTag | Links | **Yes** | Tags |
| BannerWiget | Image | Static | N/A |

### 6.2 BlogCart (CONFIRMED DYNAMIC)

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Post image | Image | **Yes** | `featured_image` |
| Post tag/category | Text | **Yes** | `category` |
| Author image | Image | **Yes** | `author_image` |
| Author name | Text | **Yes** | `author_name` |
| Post date | Date | **Yes** | `published_at` |
| Post title | Text | **Yes** | `title` |
| Post excerpt | Text | **Yes** | `excerpt` |

**Source File**: `apps/public/src/components/pages/blog/BlogCart.tsx`

### 6.3 Pagination

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Page numbers | Links | **Yes** | Computed from total |

---

## 7. Blog Details Page (`/blog-details`) — Content Blocks

### 7.1 BlogDetailsWrapper

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Post title | Text | **Yes** | `title` |
| Post content | Rich Text | **Yes** | `content` |
| Featured image | Image | **Yes** | `featured_image` |
| Post meta | Text | **Yes** | `published_at`, `author` |
| Tags | Repeater | **Yes** | `tags` |

**Source File**: `apps/public/src/components/pages/blogDetails/BlogDetailsWrapper.tsx`

### 7.2 BlogDetailsComments

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Comments list | Repeater | TBD | TBD |
| Comment form | Form | TBD | TBD |

**Note**: Comments functionality is **TBD** — not confirmed for MVP.

---

## 8. Contact Page (`/contact`) — Content Blocks

### 8.1 ContactUsArea

| Element | Type | Dynamic | MVP Field |
|---------|------|---------|-----------|
| Address | Text | Static | N/A |
| Phone | Text | Static | N/A |
| Email | Text | Static | N/A |

### 8.2 ContactForm (LEADS CAPTURE)

| Field | Type | Required | Maps To |
|-------|------|----------|---------|
| Name | Text | Yes | `leads.name` |
| Email | Email | Yes | `leads.email` |
| Subject | Text | No | `leads.subject` |
| Message | Textarea | No | `leads.message` |

**Source File**: `apps/public/src/components/pages/contact/ContactForm.tsx`
**Action**: Form submission → Leads table

---

## 9. Media Assets Inventory

### 9.1 Image Directories (from Finibus)

| Directory | Content | Used By |
|-----------|---------|---------|
| `/images/author/` | Author avatars | Blog |
| `/images/post/` | Blog post images | Blog |
| `/images/portfolio/` | Portfolio images | Projects |
| `/images/project/` | Project detail images | Projects |
| `/images/icons/` | Service icons | Services |
| `/images/partner-icons/` | Partner logos | Homepage |

### 9.2 Media Types Required

| Type | Extensions | Storage Bucket |
|------|------------|----------------|
| Images | jpg, png, svg, webp | `public` |
| Documents | pdf, doc, docx | `private` |
| Thumbnails | Auto-generated | `public` |

---

## 10. Content Relationship Map

```
┌─────────────────────────────────────────────────────────────┐
│                     MEDIA LIBRARY                            │
│                   (Central Asset Store)                      │
└─────────────────────────────────────────────────────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│     BLOG      │   │   PROJECTS    │   │ TESTIMONIALS  │
│  - featured   │   │  - image      │   │ - client_image│
│  - author img │   │  - gallery    │   │               │
└───────────────┘   └───────────────┘   └───────────────┘
        │
        ▼
┌───────────────┐
│    PAGES      │
│  - sections   │   ← Pages+Sections is LATER PHASE
│  - images     │
└───────────────┘

┌───────────────┐
│    LEADS      │   ← From Contact Form
│  (no media)   │
└───────────────┘
```

---

## 11. TBD Items (Require Further Analysis)

| Item | Location | Reason |
|------|----------|--------|
| Services behavior | `/service`, `/service-details` | Static vs dynamic unclear |
| Hero customization | Homepage variants | May be static branding |
| Comments system | Blog details | Not confirmed for MVP |
| Newsletter integration | Homepage | External service TBD |
| Page section variability | Pages module | Complex; later phase |

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 0.1 | 2025-12-21 | Planning Agent | Initial mapping from Finibus analysis |

**Next Review:** After module-specific documentation
