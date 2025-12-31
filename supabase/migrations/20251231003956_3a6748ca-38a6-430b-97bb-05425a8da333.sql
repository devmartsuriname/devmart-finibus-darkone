-- ============================================================
-- Phase 1: Blog SEO & Taxonomy Enhancement Migration
-- Status: ADDITIVE ONLY — No destructive changes
-- Date: 2025-12-31
-- ============================================================

-- 1. Add content_blocks column for structured authoring
ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS content_blocks JSONB DEFAULT '[]'::jsonb;

-- 2. Add tags array column
ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- 3. Add SEO columns
ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS meta_title TEXT;

ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS meta_description TEXT;

ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS og_image_media_id UUID REFERENCES public.media(id);

ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS canonical_url TEXT;

ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS noindex BOOLEAN DEFAULT FALSE;

-- 4. Add check constraints for character limits
ALTER TABLE public.blog_posts 
  ADD CONSTRAINT blog_posts_meta_title_length 
  CHECK (char_length(meta_title) <= 70);

ALTER TABLE public.blog_posts 
  ADD CONSTRAINT blog_posts_meta_description_length 
  CHECK (char_length(meta_description) <= 160);

-- 5. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags 
  ON public.blog_posts USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_blog_posts_category 
  ON public.blog_posts(category);

-- 6. Add comments for documentation
COMMENT ON COLUMN public.blog_posts.content_blocks IS 
  'Structured JSON blocks for admin authoring. Compiled to HTML content on save.';

COMMENT ON COLUMN public.blog_posts.tags IS 
  'Taxonomy tags as text array. Simple array model for Phase 1.';

COMMENT ON COLUMN public.blog_posts.meta_title IS 
  'SEO title override. Max 70 characters. Falls back to Global SEO if empty.';

COMMENT ON COLUMN public.blog_posts.meta_description IS 
  'SEO description override. Max 160 characters. Falls back to Global SEO if empty.';

COMMENT ON COLUMN public.blog_posts.og_image_media_id IS 
  'Open Graph image override. FK to media table.';

COMMENT ON COLUMN public.blog_posts.canonical_url IS 
  'Canonical URL for SEO. If empty, defaults to post URL.';

COMMENT ON COLUMN public.blog_posts.noindex IS 
  'If true, instructs search engines not to index this post.';