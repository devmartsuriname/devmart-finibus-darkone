-- Phase 7: Homepage Dynamic Wiring — Database Schema
-- Creates homepage_settings (single-row JSON config) + newsletter_subscribers

-- ============================================
-- 1. HOMEPAGE_SETTINGS TABLE
-- ============================================

CREATE TABLE public.homepage_settings (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Comment
COMMENT ON TABLE public.homepage_settings IS 'Single-row JSON configuration for homepage sections';

-- Updated_at trigger
CREATE TRIGGER update_homepage_settings_updated_at
    BEFORE UPDATE ON public.homepage_settings
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.homepage_settings ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Public can read homepage settings"
ON public.homepage_settings FOR SELECT
USING (true);

-- Admins can update
CREATE POLICY "Admins can update homepage settings"
ON public.homepage_settings FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Admins can insert (for initial seeding)
CREATE POLICY "Admins can insert homepage settings"
ON public.homepage_settings FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- ============================================
-- 2. SEED HOMEPAGE_SETTINGS WITH FINIBUS DATA
-- ============================================

INSERT INTO public.homepage_settings (id, data) VALUES (1, '{
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
      { "label": "Web", "sublabel": "Clean Design", "percent": 85 },
      { "label": "App", "sublabel": "Developing", "percent": 68 }
    ]
  },
  "stats": [
    { "icon": "/images/icons/count-1.png", "value": 250, "label": "Project Completed" },
    { "icon": "/images/icons/count-2.png", "value": 150, "label": "Satisfied Clients" },
    { "icon": "/images/icons/count-3.png", "value": 150, "label": "Expert Teams" },
    { "icon": "/images/icons/count-4.png", "value": 100, "label": "Win Awards" }
  ],
  "partners": [
    { "logo": "/images/partner-icons/partner-1.png", "url": "www.example.com" },
    { "logo": "/images/partner-icons/partner-2.png", "url": "www.example.com" },
    { "logo": "/images/partner-icons/partner-3.png", "url": "www.example.com" },
    { "logo": "/images/partner-icons/partner-4.png", "url": "www.example.com" },
    { "logo": "/images/partner-icons/partner-5.png", "url": "www.example.com" },
    { "logo": "/images/partner-icons/partner-6.png", "url": "www.example.com" },
    { "logo": "/images/partner-icons/partner-7.png", "url": "www.example.com" },
    { "logo": "/images/partner-icons/partner-8.png", "url": "www.example.com" },
    { "logo": "/images/partner-icons/partner-9.png", "url": "www.example.org" },
    { "logo": "/images/partner-icons/partner-10.png", "url": "www.example.com" }
  ],
  "why_choose": {
    "title": "success is just around the next online corner",
    "video_url": "https://www.youtube.com/embed/L61p2uyiMSo",
    "video_poster": "/images/play-video.jpg",
    "skills": [
      { "label": "Web Design", "percent": 85 },
      { "label": "App Development", "percent": 75 },
      { "label": "Backend", "percent": 55 },
      { "label": "Video Animation", "percent": 65 }
    ]
  },
  "cta": {
    "title_line1": "About Your Next",
    "title_line2": "Project",
    "title_line3": "Your Mind",
    "cta_label": "Get In Touch",
    "cta_url": "/contact"
  }
}'::jsonb)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now();

-- ============================================
-- 3. NEWSLETTER_SUBSCRIBERS TABLE
-- ============================================

CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'homepage',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Comment
COMMENT ON TABLE public.newsletter_subscribers IS 'Newsletter email subscriptions from public website';

-- Unique constraint on lowercase email
CREATE UNIQUE INDEX newsletter_subscribers_email_unique 
ON public.newsletter_subscribers (LOWER(email));

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public can subscribe (INSERT only)
CREATE POLICY "Public can subscribe"
ON public.newsletter_subscribers FOR INSERT
WITH CHECK (true);

-- Admins can view subscribers
CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Admins can delete subscribers
CREATE POLICY "Admins can delete subscribers"
ON public.newsletter_subscribers FOR DELETE
USING (has_role(auth.uid(), 'admin'));