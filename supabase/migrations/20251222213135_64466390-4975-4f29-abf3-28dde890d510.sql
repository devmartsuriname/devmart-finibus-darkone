-- Create settings table with key-value structure
CREATE TABLE public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Public can read all settings (for SEO, contact info display on public site)
CREATE POLICY "Public can read settings"
ON public.settings
FOR SELECT
USING (true);

-- Only admins can insert settings
CREATE POLICY "Admins can insert settings"
ON public.settings
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update settings
CREATE POLICY "Admins can update settings"
ON public.settings
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete settings
CREATE POLICY "Admins can delete settings"
ON public.settings
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add updated_at trigger (reusing existing function)
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed the 14 approved default settings
INSERT INTO public.settings (key, value, category, description)
VALUES
  -- General Settings (5)
  ('site_name', 'Devmart', 'general', 'Site/company name'),
  ('site_tagline', 'We build critical digital systems', 'general', 'Tagline/slogan'),
  ('contact_email', 'info@devmart.sr', 'general', 'Primary contact email'),
  ('contact_phone', '', 'general', 'Primary contact phone'),
  ('contact_address', '', 'general', 'Physical address'),
  
  -- SEO Settings (3)
  ('default_meta_title', 'Devmart - Digital Solutions', 'seo', 'Fallback title tag'),
  ('default_meta_description', 'Professional digital solutions for your business', 'seo', 'Fallback meta description'),
  ('default_og_image_media_id', '', 'seo', 'Default Open Graph image (Media Library UUID)'),
  
  -- Social Settings (4)
  ('facebook_url', '', 'social', 'Facebook page URL'),
  ('instagram_url', '', 'social', 'Instagram profile URL'),
  ('linkedin_url', '', 'social', 'LinkedIn company URL'),
  ('youtube_url', '', 'social', 'YouTube channel URL'),
  
  -- Branding Settings (2)
  ('logo_media_id', '', 'branding', 'Site logo (Media Library UUID)'),
  ('favicon_media_id', '', 'branding', 'Site favicon (Media Library UUID)')
ON CONFLICT (key) DO NOTHING;