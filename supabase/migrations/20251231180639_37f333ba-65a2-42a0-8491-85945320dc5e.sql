-- Phase 4B: Services SEO Expansion
-- Add 5 SEO fields to services table for parity with Blog and Pages modules

ALTER TABLE public.services
ADD COLUMN meta_title TEXT,
ADD COLUMN meta_description TEXT,
ADD COLUMN og_image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
ADD COLUMN canonical_url TEXT,
ADD COLUMN noindex BOOLEAN DEFAULT false;