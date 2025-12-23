-- Phase 5.4+ Parity Hotfix: Add template landscape images + fix project media assignments
-- This fixes stretched images on Project Details page

-- Step 1: Insert landscape template images into media table
INSERT INTO public.media (id, filename, storage_path, public_url, file_type, file_size, alt_text, title)
VALUES 
  (
    'f1a1a1a1-1111-1111-1111-111111111111',
    'process-banner.jpg',
    'finibus/project/process-banner.jpg',
    '/images/process-banner.jpg',
    'image/jpeg',
    150000,
    'Project process banner - landscape hero image',
    'Process Banner'
  ),
  (
    'f2a2a2a2-2222-2222-2222-222222222222',
    'overview-1.jpg',
    'finibus/project/overview-1.jpg',
    '/images/overview-1.jpg',
    'image/jpeg',
    120000,
    'Project overview section image',
    'Overview 1'
  ),
  (
    'f3a3a3a3-3333-3333-3333-333333333333',
    'overview-2.jpg',
    'finibus/project/overview-2.jpg',
    '/images/overview-2.jpg',
    'image/jpeg',
    120000,
    'Check and launch section image',
    'Overview 2 (Check & Launch)'
  )
ON CONFLICT (storage_path) DO NOTHING;

-- Step 2: Update ALL 8 projects to use correct LANDSCAPE images for detail-page slots
-- Keep portfolio images ONLY for card thumbnails (image_media_id can be kept as-is for cards)
-- BUT for detail page: featured_image = banner, image = overview, check_launch_image = overview-2

-- Project 1: Corporate Brand Identity
UPDATE public.projects
SET 
  featured_image_media_id = 'f1a1a1a1-1111-1111-1111-111111111111',
  image_media_id = 'f2a2a2a2-2222-2222-2222-222222222222',
  check_launch_image_media_id = 'f3a3a3a3-3333-3333-3333-333333333333'
WHERE slug = 'corporate-brand-identity';

-- Project 2: E-Commerce Platform Redesign
UPDATE public.projects
SET 
  featured_image_media_id = 'f1a1a1a1-1111-1111-1111-111111111111',
  image_media_id = 'f2a2a2a2-2222-2222-2222-222222222222',
  check_launch_image_media_id = 'f3a3a3a3-3333-3333-3333-333333333333'
WHERE slug = 'ecommerce-platform-redesign';

-- Project 3: SaaS Dashboard Interface
UPDATE public.projects
SET 
  featured_image_media_id = 'f1a1a1a1-1111-1111-1111-111111111111',
  image_media_id = 'f2a2a2a2-2222-2222-2222-222222222222',
  check_launch_image_media_id = 'f3a3a3a3-3333-3333-3333-333333333333'
WHERE slug = 'saas-dashboard-interface';

-- Project 4: Mobile Banking Application
UPDATE public.projects
SET 
  featured_image_media_id = 'f1a1a1a1-1111-1111-1111-111111111111',
  image_media_id = 'f2a2a2a2-2222-2222-2222-222222222222',
  check_launch_image_media_id = 'f3a3a3a3-3333-3333-3333-333333333333'
WHERE slug = 'mobile-banking-application';

-- Project 5: Restaurant Website & Ordering System
UPDATE public.projects
SET 
  featured_image_media_id = 'f1a1a1a1-1111-1111-1111-111111111111',
  image_media_id = 'f2a2a2a2-2222-2222-2222-222222222222',
  check_launch_image_media_id = 'f3a3a3a3-3333-3333-3333-333333333333'
WHERE slug = 'restaurant-website-ordering';

-- Project 6: Healthcare Portal Concept
UPDATE public.projects
SET 
  featured_image_media_id = 'f1a1a1a1-1111-1111-1111-111111111111',
  image_media_id = 'f2a2a2a2-2222-2222-2222-222222222222',
  check_launch_image_media_id = 'f3a3a3a3-3333-3333-3333-333333333333'
WHERE slug = 'healthcare-portal-concept';

-- Project 7: Fitness App Branding
UPDATE public.projects
SET 
  featured_image_media_id = 'f1a1a1a1-1111-1111-1111-111111111111',
  image_media_id = 'f2a2a2a2-2222-2222-2222-222222222222',
  check_launch_image_media_id = 'f3a3a3a3-3333-3333-3333-333333333333'
WHERE slug = 'fitness-app-branding';

-- Project 8: Real Estate Platform
UPDATE public.projects
SET 
  featured_image_media_id = 'f1a1a1a1-1111-1111-1111-111111111111',
  image_media_id = 'f2a2a2a2-2222-2222-2222-222222222222',
  check_launch_image_media_id = 'f3a3a3a3-3333-3333-3333-333333333333'
WHERE slug = 'real-estate-platform';