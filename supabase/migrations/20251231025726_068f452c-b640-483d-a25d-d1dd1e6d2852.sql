-- Phase 2.1a: Add Blog Details Layout Fields
-- ADDITIVE ONLY - No drops, no renames

-- Add quote block fields
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS quote_text TEXT,
  ADD COLUMN IF NOT EXISTS quote_author TEXT;

-- Add secondary/banner section fields
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS secondary_image_media_id UUID REFERENCES public.media(id),
  ADD COLUMN IF NOT EXISTS secondary_content TEXT;

-- Add author display name with NULL default (UI will show "Devmart Team" as placeholder)
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS author_display_name TEXT;

-- Add column comments for documentation
COMMENT ON COLUMN public.blog_posts.quote_text IS 'Quote block text displayed after main content on blog details page';
COMMENT ON COLUMN public.blog_posts.quote_author IS 'Quote attribution (author name) for the quote block';
COMMENT ON COLUMN public.blog_posts.secondary_image_media_id IS 'Banner section image displayed after quote block on blog details';
COMMENT ON COLUMN public.blog_posts.secondary_content IS 'Banner section body text below secondary image';
COMMENT ON COLUMN public.blog_posts.author_display_name IS 'Author display name (defaults to "Devmart Team" in UI if NULL)';