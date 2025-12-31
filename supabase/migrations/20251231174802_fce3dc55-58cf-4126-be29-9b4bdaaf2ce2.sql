-- Phase 4A: Pages SEO Expansion
-- Add SEO fields to pages table for parity with Blog module

ALTER TABLE public.pages 
ADD COLUMN IF NOT EXISTS og_image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS noindex BOOLEAN DEFAULT false;

-- Add comment for documentation
COMMENT ON COLUMN public.pages.og_image_media_id IS 'Open Graph image for social sharing';
COMMENT ON COLUMN public.pages.canonical_url IS 'Canonical URL override (stored, not used for URL normalization)';
COMMENT ON COLUMN public.pages.noindex IS 'If true, page should not be indexed by search engines';