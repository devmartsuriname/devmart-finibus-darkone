-- Seed SEO fields for existing published blog posts (ONLY when null)
UPDATE blog_posts
SET 
  meta_title = CASE WHEN meta_title IS NULL THEN LEFT(title, 70) ELSE meta_title END,
  meta_description = CASE WHEN meta_description IS NULL THEN LEFT(excerpt, 160) ELSE meta_description END,
  canonical_url = CASE WHEN canonical_url IS NULL THEN '/blog/' || slug ELSE canonical_url END,
  noindex = COALESCE(noindex, false),
  author_display_name = CASE WHEN author_display_name IS NULL THEN 'Devmart Team' ELSE author_display_name END,
  quote_text = CASE WHEN quote_text IS NULL THEN 'Innovation requires more than technology—it demands clear vision, disciplined execution, and commitment to continuous improvement.' ELSE quote_text END,
  quote_author = CASE WHEN quote_author IS NULL THEN 'Devmart Team' ELSE quote_author END,
  secondary_content = CASE WHEN secondary_content IS NULL THEN 'At Devmart, we approach every engagement with strategic clarity and operational discipline. Our team combines deep technical expertise with practical business understanding to deliver solutions that create lasting value for our clients.' ELSE secondary_content END
WHERE status = 'published';