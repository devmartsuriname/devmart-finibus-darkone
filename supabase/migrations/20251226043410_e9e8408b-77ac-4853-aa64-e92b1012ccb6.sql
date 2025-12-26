-- ============================================
-- PHASE 9B: DATABASE FOUNDATION
-- ============================================

-- ============================================
-- TABLE 1: page_settings
-- Purpose: Page-specific UI blocks (one row per page)
-- ============================================

CREATE TABLE public.page_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text UNIQUE NOT NULL,
  data jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Add updated_at trigger
CREATE TRIGGER set_page_settings_updated_at
BEFORE UPDATE ON public.page_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.page_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Admins can manage (ALL operations)
CREATE POLICY "Admins can manage page settings"
ON public.page_settings FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policy: Public can read
CREATE POLICY "Public can read page settings"
ON public.page_settings FOR SELECT
USING (true);

-- ============================================
-- TABLE 2: global_blocks
-- Purpose: Shared UI blocks across multiple pages
-- ============================================

CREATE TABLE public.global_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  block_key text UNIQUE NOT NULL,
  data jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Add updated_at trigger
CREATE TRIGGER set_global_blocks_updated_at
BEFORE UPDATE ON public.global_blocks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.global_blocks ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Admins can manage (ALL operations)
CREATE POLICY "Admins can manage global blocks"
ON public.global_blocks FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policy: Public can read
CREATE POLICY "Public can read global blocks"
ON public.global_blocks FOR SELECT
USING (true);

-- ============================================
-- SEED DATA: page_settings for About page
-- Values extracted from InsideStoryArea.tsx and LatesNewsArea.tsx
-- ============================================

INSERT INTO public.page_settings (page_slug, data) VALUES (
  'about',
  '{
    "inside_story": {
      "enabled": true,
      "section_label": "Inside Story",
      "title": "We are creative Agency that creates beautiful.",
      "description": "Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Classe aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptosi himenaeos. Praesent nec neque at dolor venenatis consectetur eu quis e Donec lacinia placerat felis non aliquam.Integer purus odio.",
      "main_image_url": "/images/story.png",
      "main_image_media_id": null,
      "cto_message": "Integer purus odio, placerat neclessi rhoncus in, ullamcorper nec dolor.ol aptent taciti sociosqu.",
      "cto_name": "Carlo Rabil.",
      "cto_title": "CTO & FOUNDER, Finibus",
      "cto_signature_url": "/images/cto-signature.png",
      "cto_signature_media_id": null,
      "progress_stats": [
        { "label": "Idea & Research", "percent": 90 },
        { "label": "Wirfirm & Design", "percent": 95 },
        { "label": "Developing & Launch", "percent": 88 }
      ]
    },
    "latest_news": {
      "enabled": true,
      "section_label": "Blog",
      "section_title": "Latest news And Article modern design.",
      "view_all_label": "View All Blog",
      "view_all_url": "/blog",
      "posts_count": 2
    }
  }'::jsonb
);

-- ============================================
-- SEED DATA: global_blocks (structural only)
-- Minimal structure - no content invention
-- ============================================

INSERT INTO public.global_blocks (block_key, data) VALUES 
  ('cta_strip', '{"enabled": true}'::jsonb),
  ('why_choose_us', '{"enabled": true}'::jsonb);