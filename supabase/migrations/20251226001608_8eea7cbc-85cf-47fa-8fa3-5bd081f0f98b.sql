-- Phase 8A Unblock: Create Homepage page record
-- This is a data insert, but using migration for admin INSERT since pages table has no public INSERT RLS

INSERT INTO pages (slug, title, meta_title, meta_description, is_published)
VALUES ('/', 'Homepage', NULL, NULL, true)
ON CONFLICT (slug) DO NOTHING;