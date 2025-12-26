-- Phase 11: Add branding color keys to settings table
-- These colors are for FRONTEND consumption only (CSS variables)
-- Fonts remain LOCKED (Finibus 1:1)

INSERT INTO public.settings (key, value, category, description)
VALUES 
  ('primary_color', '#D90A2C', 'branding', 'Primary brand color (Finibus theme-color) - applied to frontend via CSS variables'),
  ('secondary_color', '#17161A', 'branding', 'Secondary brand color (Finibus black) - applied to frontend via CSS variables'),
  ('accent_color', '#F7941D', 'branding', 'Accent color (orange) - applied to frontend via CSS variables')
ON CONFLICT (key) DO NOTHING;