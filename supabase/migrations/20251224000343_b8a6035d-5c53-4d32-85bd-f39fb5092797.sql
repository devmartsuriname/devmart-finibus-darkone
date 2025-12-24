-- Add public SELECT policy for published blog posts
-- This allows anonymous users to view published blog posts only

CREATE POLICY "Public can view published posts"
ON public.blog_posts FOR SELECT
USING (status = 'published');