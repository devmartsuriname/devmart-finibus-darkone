# Restore Point — Phase 7: Homepage Dynamic Wiring (Pre-Implementation)

```
Status: CREATED
Phase: 7 — Homepage Dynamic Wiring
Created: 2025-12-25
Type: Pre-Implementation Checkpoint
```

---

## 1. Phase 7 Scope

### 1.1 Objective
Wire all Homepage sections to database with safe static fallbacks.

### 1.2 New Database Objects

| Object | Type | Purpose |
|--------|------|---------|
| `homepage_settings` | Table | Single-row JSON config for homepage sections |
| `newsletter_subscribers` | Table | Newsletter email collection |

### 1.3 New Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useHomepageSettings` | `apps/public/src/hooks/useHomepageSettings.ts` | Fetch homepage config |
| `useNewsletterSubscribe` | `apps/public/src/hooks/useNewsletterSubscribe.ts` | Newsletter submission |
| `useTestimonials` | `apps/public/src/hooks/useTestimonials.ts` | Fetch published testimonials |

### 1.4 Components to Wire

| Component | Section | Data Source |
|-----------|---------|-------------|
| `HeroArea.tsx` | Hero slides | `homepage_settings.data.hero` |
| `ServiceArea.tsx` | Services grid | `services` table |
| `AboutArea.tsx` | About + Stats | `homepage_settings.data.home_about/stats` |
| `OurPartnerArea.tsx` | Newsletter + Partners | `newsletter_subscribers` + `homepage_settings.data.partners` |
| `PortfolioArea.tsx` | Portfolio carousel | `projects` table |
| `WhyChooseUsArea.tsx` | Video + Skills | `homepage_settings.data.why_choose` |
| `TestimonialArea.tsx` | Testimonials | `testimonials` table |
| `NewsLatterArea.tsx` | Latest blog | `blog_posts` table |
| `LetsTalkArea.tsx` | CTA strip | `homepage_settings.data.cta` |

---

## 2. Guardian Rules (Non-Negotiable)

- ✅ `apps/public` ONLY — no `/src` or `apps/admin` changes
- ✅ No CSS changes, no class renames
- ✅ No markup restructuring — preserve Finibus DOM 1:1
- ✅ No new UI libraries
- ✅ Safe fallbacks to static content on DB failure/empty

---

## 3. Pre-Flight Check Results

| Check | Status | Notes |
|-------|--------|-------|
| `has_role(uuid, app_role)` | ✅ Exists | Security definer function |
| `update_updated_at_column()` | ✅ Exists | Trigger function |
| `gen_random_uuid()` | ✅ Available | Standard Postgres 13+ |
| `apps/public/src/lib/supabase.ts` | ✅ Correct | Points to hwrlkrrdqbtgyjpsrijh |
| `testimonials` table | ✅ Exists | Has correct schema |

---

## 4. Rollback Instructions

If Phase 7 causes issues:

1. **Revert Component Changes:**
   - Restore original static components from Git
   - Remove hook imports

2. **Remove New Hooks:**
   - Delete `apps/public/src/hooks/useHomepageSettings.ts`
   - Delete `apps/public/src/hooks/useNewsletterSubscribe.ts`
   - Delete `apps/public/src/hooks/useTestimonials.ts`

3. **Database (optional):**
   - Tables can remain (no harm if unused)
   - Or drop: `DROP TABLE homepage_settings; DROP TABLE newsletter_subscribers;`

---

## 5. Files Before Modification

### 5.1 Components (Static State)

- `apps/public/src/components/pages/Home/HeroArea.tsx`
- `apps/public/src/components/pages/Home/ServiceArea.tsx`
- `apps/public/src/components/pages/Home/AboutArea.tsx`
- `apps/public/src/components/pages/Home/OurPartnerArea.tsx`
- `apps/public/src/components/pages/Home/PortfolioArea.tsx`
- `apps/public/src/components/pages/Home/NewsLatterArea.tsx`
- `apps/public/src/components/common/WhyChooseUsArea.tsx`
- `apps/public/src/components/common/TestimonialArea.tsx`
- `apps/public/src/components/common/LetsTalkArea.tsx`

### 5.2 Hooks (New Files)

None exist yet — will be created.

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-25 | Implementation Agent | Pre-implementation checkpoint |
