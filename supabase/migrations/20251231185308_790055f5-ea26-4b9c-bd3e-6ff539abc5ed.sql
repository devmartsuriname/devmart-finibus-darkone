-- Phase 4D: URL Normalization Execution
-- DATA-ONLY: No schema changes

-- Step 1: Services - Domain + path normalization
UPDATE services 
SET canonical_url = REPLACE(
  REPLACE(canonical_url, 'https://devmart.co', 'https://devmart.sr'),
  '/services/', '/service-details/'
)
WHERE canonical_url IS NOT NULL;

-- Step 2: Projects - Domain + path normalization
UPDATE projects 
SET canonical_url = REPLACE(
  REPLACE(canonical_url, 'https://devmart.co', 'https://devmart.sr'),
  '/projects/', '/project-details/'
)
WHERE canonical_url IS NOT NULL;

-- Step 3: Blog Posts - Relative to absolute conversion
UPDATE blog_posts 
SET canonical_url = CONCAT('https://devmart.sr', canonical_url)
WHERE canonical_url IS NOT NULL 
  AND canonical_url NOT LIKE 'https://%';

-- Step 4: Pages - Populate canonical URLs
UPDATE pages 
SET canonical_url = CASE 
  WHEN slug = '/' THEN 'https://devmart.sr/'
  ELSE CONCAT('https://devmart.sr/', slug)
END
WHERE is_published = true;