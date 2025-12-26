# Restore Point — Phase 10C: About Page DB Wiring Start

**Created:** 2025-12-26  
**Phase:** 10C — About Page DB Wiring + Heading Color Parity  
**Status:** Pre-execution snapshot

---

## Current About Page Status

### Hardcoded Sections
- **InsideStoryArea**: All content hardcoded (title, description, CTO message, progress stats)
- **LatesNewsArea**: All content hardcoded (section header, blog posts)
- **WhyChooseUsArea**: Receives props but `black=""` causes white heading (BUG)
- **TestimonialArea**: Already DB-wired (Phase 7)
- **LetsTalkArea**: Common component, already DB-wired

### Expected DB Source
- Table: `page_settings`
- Filter: `page_slug = 'about'`
- Structure: JSON `data` column with section objects

---

## Heading Color Mismatch Root Cause

**Issue:** "Why Choose Devmart / Success Is Just Around The Next Online Corner" heading renders white on About page but dark on Homepage.

**Root Cause:** In `AboutPage.tsx`, the `WhyChooseUsArea` component receives `black=""` (empty string) instead of `black="black"`.

**Fix:** Change `black=""` to `black="black"` to apply `.title.black h2` CSS rule (dark heading).

---

## Guardian Rules Confirmation

| Rule | Status |
|------|--------|
| apps/public only | ✅ |
| No Bootstrap | ✅ |
| No custom CSS/SCSS | ✅ |
| No schema changes | ✅ |
| Finibus layout parity | ✅ |

---

## Files in Scope

- `apps/public/src/components/pages/aboutUs/AboutPage.tsx` (black prop fix)
- `apps/public/src/components/pages/aboutUs/InsideStoryArea.tsx` (DB wiring)
- `apps/public/src/components/pages/aboutUs/LatesNewsArea.tsx` (DB wiring)
- `apps/public/src/hooks/useAboutPageSettings.ts` (CREATE)
