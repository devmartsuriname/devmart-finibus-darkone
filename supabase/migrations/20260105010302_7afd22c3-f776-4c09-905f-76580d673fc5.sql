-- Phase 13D.1: Insert system toggle settings
-- Idempotent: ON CONFLICT DO NOTHING prevents duplicates

INSERT INTO settings (key, value, category, description)
VALUES
  ('maintenance_mode', 'false', 'system', 'Enable maintenance mode for public site'),
  ('coming_soon_enabled', 'false', 'system', 'Show Coming Soon page instead of normal site'),
  ('coming_soon_message', '', 'system', 'Custom message for Coming Soon page'),
  ('quotes_enabled', 'true', 'system', 'Allow quote wizard submissions'),
  ('contact_form_enabled', 'true', 'system', 'Allow contact form submissions')
ON CONFLICT (key) DO NOTHING;