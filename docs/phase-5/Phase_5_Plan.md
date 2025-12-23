# Phase 5: Public → DB Integration Plan

> **Status:** 📋 PLANNED — Awaiting GO Authorization  
> **Created:** 2025-01-20  
> **Scope:** Read-only data wiring from Finibus to Supabase  
> **Constraint:** Finibus UI must remain 1:1 with template

---

## Overview

Wire Finibus public pages to consume data from Supabase via read-only queries. The public app will fetch published content dynamically instead of using static data files.

---

## Guardian Rules (NON-NEGOTIABLE)

| # | Rule |
|---|------|
| 1 | Finibus UI must remain 1:1 — NO layout or styling changes |
| 2 | Public app is READ-ONLY except Contact → Leads insert |
| 3 | No analytics implementation |
| 4 | No new features or UX enhancements |
| 5 | No Stripe, payments, or pricing logic execution |
| 6 | No changes outside `finibus/` and documentation |
| 7 | One restore point per completed integration step |

---

## Prerequisites

### RLS Policies Required Before Execution

| Table | Policy Name | Expression |
|-------|-------------|------------|
| `projects` | `Public can view published projects` | `status = 'published'` |
| `blog_posts` | `Public can view published posts` | `status = 'published'` |
| `blog_tags` | `Public can view tags` | `true` |
| `blog_post_tags` | `Public can view post tags` | Via join or `true` |
| `blog_comments` | `Public can view comments on published posts` | Via join to published post |

### Already Configured

| Table | Policy |
|-------|--------|
| `services` | `Public can view published services` ✅ |
| `service_process_steps` | `Public can view steps of published services` ✅ |
| `service_pricing_plans` | `Public can view published plans of published services` ✅ |
| `testimonials` | `Public can view published testimonials` ✅ |
| `leads` | `Public can submit leads` ✅ |
| `media` | `Public can view media` ✅ |
| `settings` | `Public can read settings` ✅ |

---

## Phase 5.1: Supabase Client Setup

**Objective:** Add Supabase client to Finibus for read-only access.

| Task | Description |
|------|-------------|
| 5.1.1 | Create `finibus/src/lib/supabase.ts` |
| 5.1.2 | Configure with anon key (read-only) |
| 5.1.3 | Create TypeScript types for public data |
| 5.1.4 | Create base query hooks pattern |

**Files Created:**
- `finibus/src/lib/supabase.ts`
- `finibus/src/types/database.ts`
- `finibus/src/hooks/useSupabaseQuery.ts`

**Success Criteria:**
- Supabase client initializes without errors
- Can make a test query to `settings` table

---

## Phase 5.2: Services Page

**Route:** `/service`  
**Component:** `finibus/src/components/pages/service/WhatWeDoArea.jsx`  
**Tables:** `services`, `media`  
**RLS:** ✅ Already configured

| Task | Description |
|------|-------------|
| 5.2.1 | Create `usePublicServices()` hook |
| 5.2.2 | Query published services with icon media |
| 5.2.3 | Replace static service data in `WhatWeDoArea` |
| 5.2.4 | Map `icon_media_id` → `media.public_url` |

**Data Shape:**
```typescript
interface PublicService {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  icon_url: string | null; // from media.public_url
  display_order: number;
}
```

**Success Criteria:**
- 7 services render on `/service` page
- Each service shows correct icon
- No visual changes to page layout

---

## Phase 5.3: Service Details Page

**Route:** `/service-details` → `/service-details/:slug`  
**Components:**
- `finibus/src/components/pages/serviceDetails/ServiceDetailsPage.jsx`
- `finibus/src/components/pages/service/HowWeWorkArea.jsx`
- `finibus/src/components/pages/service/ServicePrice.jsx`

**Tables:** `services`, `service_process_steps`, `service_pricing_plans`, `media`  
**RLS:** ✅ Already configured

| Task | Description |
|------|-------------|
| 5.3.1 | Update route to accept `:slug` parameter |
| 5.3.2 | Create `usePublicServiceBySlug(slug)` hook |
| 5.3.3 | Fetch service with related steps and pricing |
| 5.3.4 | Update `HowWeWorkArea` for dynamic steps |
| 5.3.5 | Update `ServicePrice` for dynamic pricing |

**Data Shape:**
```typescript
interface PublicServiceDetail extends PublicService {
  full_description: string | null;
  process_steps: {
    step_number: number;
    title: string;
    description: string;
    image_url: string | null;
  }[];
  pricing_plans: {
    plan_name: string;
    plan_subtitle: string | null;
    price_amount: number;
    currency: string;
    billing_period: string;
    features: string[];
    cta_label: string;
  }[];
}
```

**Success Criteria:**
- Service details page loads by slug
- 3 process steps render in carousel
- Monthly/yearly pricing tabs work
- No visual changes to page layout

---

## Phase 5.4: Projects Page

**Route:** `/project`  
**Component:** `finibus/src/components/common/CartFilter.jsx`  
**Tables:** `projects`, `media`  
**RLS:** ⚠️ REQUIRES NEW POLICY

| Task | Description |
|------|-------------|
| 5.4.0 | Add RLS policy: `Public can view published projects` |
| 5.4.1 | Create `usePublicProjects()` hook |
| 5.4.2 | Query published projects with images |
| 5.4.3 | Replace static `Data.ts` import |
| 5.4.4 | Maintain category filter functionality |

**Data Shape:**
```typescript
interface PublicProject {
  id: string;
  title: string;
  slug: string;
  heading: string;
  category: string;
  image_url: string | null;
  is_featured: boolean;
}
```

**Success Criteria:**
- Projects grid renders published projects
- Category filter works with DB categories
- No visual changes to page layout

---

## Phase 5.5: Project Details Page

**Route:** `/project-details` → `/project-details/:slug`  
**Component:** `finibus/src/components/pages/projectDetails/ProjectDetailsPage.jsx`  
**Tables:** `projects`, `media`  
**RLS:** ⚠️ Uses same policy as 5.4

| Task | Description |
|------|-------------|
| 5.5.1 | Update route to accept `:slug` parameter |
| 5.5.2 | Create `usePublicProjectBySlug(slug)` hook |
| 5.5.3 | Render project details from DB |

**Data Shape:**
```typescript
interface PublicProjectDetail extends PublicProject {
  description: string | null;
  client: string | null;
  featured_image_url: string | null;
}
```

**Success Criteria:**
- Project details page loads by slug
- All project content renders from DB
- No visual changes to page layout

---

## Phase 5.6: Blog Page

**Route:** `/blog`  
**Components:**
- `finibus/src/components/pages/blog/BlogPage.jsx`
- `finibus/src/components/pages/blog/BlogCart.jsx`

**Tables:** `blog_posts`, `media`  
**RLS:** ⚠️ REQUIRES NEW POLICY

| Task | Description |
|------|-------------|
| 5.6.0 | Add RLS policy: `Public can view published posts` |
| 5.6.1 | Create `usePublicBlogPosts()` hook |
| 5.6.2 | Query published posts with featured images |
| 5.6.3 | Replace hardcoded blog cards |
| 5.6.4 | Add pagination support |

**Data Shape:**
```typescript
interface PublicBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  featured_image_url: string | null;
  published_at: string;
}
```

**Success Criteria:**
- Blog grid renders published posts
- Featured images display correctly
- Pagination works
- No visual changes to page layout

---

## Phase 5.7: Blog Details Page

**Route:** `/blog-details` → `/blog-details/:slug`  
**Components:**
- `finibus/src/components/pages/blogDetails/BlogDetailsPage.jsx`
- `finibus/src/components/pages/blogDetails/BlogDetailsComments.jsx`

**Tables:** `blog_posts`, `blog_tags`, `blog_post_tags`, `blog_comments`, `media`  
**RLS:** ⚠️ REQUIRES NEW POLICIES for tags/comments

| Task | Description |
|------|-------------|
| 5.7.0 | Add RLS policies for tags and comments |
| 5.7.1 | Update route to accept `:slug` parameter |
| 5.7.2 | Create `usePublicBlogPostBySlug(slug)` hook |
| 5.7.3 | Fetch post with tags and comments |
| 5.7.4 | Render tags list |
| 5.7.5 | Render comments section |
| 5.7.6 | Wire comment submission form (INSERT) |

**Data Shape:**
```typescript
interface PublicBlogPostDetail extends PublicBlogPost {
  content: string;
  tags: { name: string; slug: string }[];
  comments: {
    commenter_name: string;
    body: string;
    created_at: string;
  }[];
}
```

**Success Criteria:**
- Blog post loads by slug
- Tags display correctly
- Comments render
- Comment form submits to DB
- No visual changes to page layout

---

## Phase 5.8: Testimonials

**Component:** `finibus/src/components/common/TestimonialArea.jsx`  
**Tables:** `testimonials`, `media`  
**RLS:** ✅ Already configured

| Task | Description |
|------|-------------|
| 5.8.1 | Create `usePublicTestimonials()` hook |
| 5.8.2 | Query published testimonials with avatars |
| 5.8.3 | Update Swiper carousel with dynamic data |

**Data Shape:**
```typescript
interface PublicTestimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  company: string | null;
  quote: string;
  rating: number | null;
  avatar_url: string | null;
}
```

**Success Criteria:**
- Testimonial slider renders published testimonials
- Avatar images display correctly
- Rating stars work
- No visual changes to page layout

---

## Phase 5.9: Contact Form → Leads

**Route:** `/contact`  
**Component:** `finibus/src/components/pages/contact/ContactForm.jsx`  
**Tables:** `leads` (INSERT only)  
**RLS:** ✅ Already configured (`Public can submit leads`)

| Task | Description |
|------|-------------|
| 5.9.1 | Wire form submission to Supabase |
| 5.9.2 | Insert with `source: 'contact_form'` |
| 5.9.3 | Add success toast notification |
| 5.9.4 | Add error handling |
| 5.9.5 | Clear form on success |

**Data Shape (Insert):**
```typescript
interface LeadInsert {
  name: string;
  email: string;
  subject: string | null;
  message: string | null;
  source: 'contact_form';
}
```

**Success Criteria:**
- Form submission creates lead in DB
- Success toast displays
- Error handling works
- Form clears after success
- No visual changes to page layout

---

## Execution Order

| Order | Phase | Module | Dependencies | RLS Needed |
|-------|-------|--------|--------------|------------|
| 1 | 5.1 | Supabase Client | None | — |
| 2 | 5.2 | Services Page | 5.1 | ✅ |
| 3 | 5.3 | Service Details | 5.2 | ✅ |
| 4 | 5.8 | Testimonials | 5.1 | ✅ |
| 5 | 5.9 | Contact Form | 5.1 | ✅ |
| 6 | — | RLS: Projects | — | ⚠️ Add |
| 7 | 5.4 | Projects Page | 5.1, RLS | — |
| 8 | 5.5 | Project Details | 5.4 | — |
| 9 | — | RLS: Blog | — | ⚠️ Add |
| 10 | 5.6 | Blog Page | 5.1, RLS | — |
| 11 | 5.7 | Blog Details | 5.6 | — |

---

## Restore Point Strategy

| Checkpoint | Trigger | Location |
|------------|---------|----------|
| Pre-5.1 | Before any public app changes | `docs/restore-points/Pre_Phase_5_Snapshot.md` |
| Post-5.1 | After Supabase client added | `docs/restore-points/Phase_5_1_Client_Setup.md` |
| Post-5.2-5.3 | After Services integration | `docs/restore-points/Phase_5_Services_Complete.md` |
| Post-5.4-5.5 | After Projects integration | `docs/restore-points/Phase_5_Projects_Complete.md` |
| Post-5.6-5.7 | After Blog integration | `docs/restore-points/Phase_5_Blog_Complete.md` |
| Post-5.8-5.9 | After Testimonials + Contact | `docs/restore-points/Phase_5_Complete.md` |

---

## Explicit Exclusions

- ❌ NO analytics implementation
- ❌ NO new features beyond data wiring
- ❌ NO Finibus UI structure changes
- ❌ NO custom styling or component modifications
- ❌ NO authentication on public pages
- ❌ NO Stripe or payment processing
- ❌ NO changes to Darkone admin

---

## Success Criteria Summary

| Page | Criteria |
|------|----------|
| Services | 7 services with icons render |
| Service Details | Service + 3 steps + pricing render |
| Projects | Published projects with filter render |
| Project Details | Project details render by slug |
| Blog | Published posts with pagination render |
| Blog Details | Post + tags + comments render |
| Testimonials | Published testimonials in slider |
| Contact | Form creates lead in DB |

---

## Authorization

**Status:** PLANNED — Awaiting explicit GO  
**Execution:** NOT STARTED  
**Next Action:** Confirm plan, then await GO authorization
