-- Delete phantom media records causing 404 errors
-- These records have invalid public_url paths pointing to non-existent files

DELETE FROM media 
WHERE id IN (
  'f1a1a1a1-1111-1111-1111-111111111111',
  'f2a2a2a2-2222-2222-2222-222222222222',
  'f3a3a3a3-3333-3333-3333-333333333333'
);