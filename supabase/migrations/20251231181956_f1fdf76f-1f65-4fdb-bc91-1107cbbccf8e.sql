-- Phase 4C: Projects SEO Expansion
-- Add SEO fields to projects table following Blog/Pages/Services pattern

ALTER TABLE public.projects
ADD COLUMN meta_title TEXT,
ADD COLUMN meta_description TEXT,
ADD COLUMN og_image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
ADD COLUMN canonical_url TEXT,
ADD COLUMN noindex BOOLEAN DEFAULT false;