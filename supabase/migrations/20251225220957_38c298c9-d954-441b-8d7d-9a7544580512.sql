-- Phase 7.1: Fix portfolio thumbnail image assignments
-- Assign correct square portfolio thumbnails to image_media_id field

-- Project 1 (Corporate Brand Identity) - already has portfolio-1.jpg, leave unchanged

-- Project 2 (E-Commerce Platform Redesign) - assign portfolio-2.jpg
UPDATE public.projects 
SET image_media_id = '77151126-071b-4993-bad3-5f1be537ecb5'
WHERE slug = 'ecommerce-platform-redesign';

-- Project 3 (SaaS Dashboard Interface) - assign portfolio-3.jpg
UPDATE public.projects 
SET image_media_id = '15bf813d-75c9-4b6e-8083-d78b58bb4732'
WHERE slug = 'saas-dashboard-interface';

-- Project 4 (Mobile Banking Application) - assign portfolio-4.jpg
UPDATE public.projects 
SET image_media_id = '6fd69cc5-7649-4902-83f0-930a34507264'
WHERE slug = 'mobile-banking-application';

-- Project 5 (Restaurant Website & Ordering) - assign portfolio-5.jpg
UPDATE public.projects 
SET image_media_id = 'cde09e5b-d849-4e53-af73-809120c8c3cf'
WHERE slug = 'restaurant-website-ordering';