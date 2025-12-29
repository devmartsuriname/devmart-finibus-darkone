# Restore Point — Phase 12.1: Homepage Content Wiring

**Created:** 2025-12-29  
**Phase:** 12.1 — Homepage CMS Content Wiring  
**Status:** PRE-EXECUTION SNAPSHOT

---

## Scope

- **Table:** `homepage_settings` (id=1)
- **Fields Updated:** `hero.slides`, `home_about`, `why_choose`, `cta`
- **Action:** Database UPDATE only — no code changes

---

## Original Data Snapshot (BEFORE Changes)

```json
{
  "id": 1,
  "updated_at": "2025-12-29 00:56:57.337328+00",
  "data": {
    "hero": {
      "slides": [
        {
          "image": "/images/hero-slider-1.jpg",
          "subtitle": "Creative",
          "title_prefix": "Best solution for your",
          "title_highlight": "Business.",
          "description": "Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla an Duis a orci nunc. Suspendisse ac convallis sapien, quis commodosani libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.",
          "cta1_label": "About us",
          "cta1_url": "/about",
          "cta2_label": "How we work",
          "cta2_url": "/project-details"
        },
        {
          "image": "/images/hero-slider-2.png",
          "subtitle": "Creative",
          "title_prefix": "Best solution for your",
          "title_highlight": "Finances.",
          "description": "Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla an Duis a orci nunc. Suspendisse ac convallis sapien, quis commodosani libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.",
          "cta1_label": "About us",
          "cta1_url": "/about",
          "cta2_label": "How we work",
          "cta2_url": "/project-details"
        },
        {
          "image": "/images/hero-slider-3.png",
          "subtitle": "Creative",
          "title_prefix": "Best solution for your",
          "title_highlight": "Markets.",
          "description": "Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla an Duis a orci nunc. Suspendisse ac convallis sapien, quis commodosani libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.",
          "cta1_label": "About us",
          "cta1_url": "/about",
          "cta2_label": "How we work",
          "cta2_url": "/project-details"
        }
      ]
    },
    "home_about": {
      "title": "Direction with our company.",
      "description": "Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Classe aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent nec neque at dolor venenatis consectetur eu quis ei Donec lacinia placerat felis non aliquam.Integer purus odio.",
      "mission_title": "Our Mission",
      "mission_text": "Integer purus odio, placerat nec rhoni olor Class online and video.",
      "cta_label": "About more",
      "cta_url": "/about",
      "skills": [
        {"label": "Web", "percent": 85, "sublabel": "Clean Design"},
        {"label": "App", "percent": 68, "sublabel": "Developing"}
      ]
    },
    "why_choose": {
      "title": "success is just around the next online corner",
      "video_url": "https://www.youtube.com/embed/L61p2uyiMSo",
      "video_poster": "/images/play-video.jpg",
      "skills": [
        {"label": "Web Design", "percent": 85},
        {"label": "App Development", "percent": 75},
        {"label": "Backend", "percent": 55},
        {"label": "Video Animation", "percent": 65}
      ]
    },
    "cta": {
      "title_line1": "About Your Next",
      "title_line2": "Project",
      "title_line3": "Your Mind",
      "cta_label": "Get In Touch",
      "cta_url": "/contact"
    },
    "partners": [...],
    "stats": [...]
  }
}
```

---

## Rollback SQL

If issues occur, execute this to restore original state:

```sql
UPDATE homepage_settings 
SET data = jsonb_set(
  jsonb_set(
    jsonb_set(
      jsonb_set(
        data,
        '{hero,slides}',
        '[
          {"image":"/images/hero-slider-1.jpg","subtitle":"Creative","title_prefix":"Best solution for your","title_highlight":"Business.","description":"Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla an Duis a orci nunc. Suspendisse ac convallis sapien, quis commodosani libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.","cta1_label":"About us","cta1_url":"/about","cta2_label":"How we work","cta2_url":"/project-details"},
          {"image":"/images/hero-slider-2.png","subtitle":"Creative","title_prefix":"Best solution for your","title_highlight":"Finances.","description":"Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla an Duis a orci nunc. Suspendisse ac convallis sapien, quis commodosani libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.","cta1_label":"About us","cta1_url":"/about","cta2_label":"How we work","cta2_url":"/project-details"},
          {"image":"/images/hero-slider-3.png","subtitle":"Creative","title_prefix":"Best solution for your","title_highlight":"Markets.","description":"Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla an Duis a orci nunc. Suspendisse ac convallis sapien, quis commodosani libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.","cta1_label":"About us","cta1_url":"/about","cta2_label":"How we work","cta2_url":"/project-details"}
        ]'::jsonb
      ),
      '{home_about,title}',
      '"Direction with our company."'::jsonb
    ),
    '{home_about,description}',
    '"Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Classe aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent nec neque at dolor venenatis consectetur eu quis ei Donec lacinia placerat felis non aliquam.Integer purus odio."'::jsonb
  ),
  '{why_choose}',
  '{"title":"success is just around the next online corner","video_url":"https://www.youtube.com/embed/L61p2uyiMSo","video_poster":"/images/play-video.jpg","skills":[{"label":"Web Design","percent":85},{"label":"App Development","percent":75},{"label":"Backend","percent":55},{"label":"Video Animation","percent":65}]}'::jsonb
)
WHERE id = 1;

UPDATE homepage_settings 
SET data = jsonb_set(
  data,
  '{cta}',
  '{"title_line1":"About Your Next","title_line2":"Project","title_line3":"Your Mind","cta_label":"Get In Touch","cta_url":"/contact"}'::jsonb
)
WHERE id = 1;
```

---

## Guardian Rules Compliance

- ✅ No schema changes
- ✅ No new database columns
- ✅ No type/interface changes
- ✅ No component modifications
- ✅ No CSS/SCSS changes
- ✅ Reusing existing homepage_settings.data JSON structure

---

## Files Changed

| File | Change Type |
|------|-------------|
| `homepage_settings` table (id=1) | UPDATE via SQL |
| `docs/restore-points/Restore_Point_Phase_12_1_Homepage_Content_Wiring.md` | CREATE |
| `docs/Tasks.md` | UPDATE (Phase 12.1 status) |
| `docs/Frontend.md` | UPDATE (character limits) |
| `docs/Backend.md` | UPDATE (change note) |
| `docs/Architecture.md` | UPDATE (change note) |
