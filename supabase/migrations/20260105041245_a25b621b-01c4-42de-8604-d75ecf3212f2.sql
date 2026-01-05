-- Phase 13D.4: Add Coming Soon countdown settings
-- Safe INSERT with ON CONFLICT (upsert pattern for idempotency)

INSERT INTO public.settings (key, value, category, description)
VALUES 
  ('coming_soon_countdown_enabled', 'true', 'system', 'Enable countdown timer on Coming Soon page'),
  ('coming_soon_countdown_target', '', 'system', 'Target date/time for Coming Soon countdown (ISO 8601 format)')
ON CONFLICT (key) DO UPDATE SET
  category = EXCLUDED.category,
  description = EXCLUDED.description;