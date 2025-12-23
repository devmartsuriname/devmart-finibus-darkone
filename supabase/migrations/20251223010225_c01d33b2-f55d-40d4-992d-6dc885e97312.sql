-- Phase 4A.7: Pages Module (Docs-Strict / Edit-Only)
-- Per Phase_4_Module_Pages.md specifications

-- Create pages table with meta-only fields
CREATE TABLE public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- Constraints per documentation
    CONSTRAINT pages_title_max_length CHECK (char_length(title) <= 100),
    CONSTRAINT pages_meta_title_max_length CHECK (meta_title IS NULL OR char_length(meta_title) <= 70),
    CONSTRAINT pages_meta_description_max_length CHECK (meta_description IS NULL OR char_length(meta_description) <= 160)
);

-- Indexes
CREATE INDEX pages_is_published_idx ON public.pages(is_published);

-- Updated_at trigger (reuse existing function)
CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON public.pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- SLUG IMMUTABILITY: Trigger to prevent slug changes after insert
CREATE OR REPLACE FUNCTION public.prevent_slug_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.slug IS DISTINCT FROM NEW.slug THEN
        RAISE EXCEPTION 'Slug is immutable and cannot be changed';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER pages_prevent_slug_change
    BEFORE UPDATE ON public.pages
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_slug_change();

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Admin SELECT + UPDATE only (NO INSERT/DELETE per docs)
CREATE POLICY "Admins can view all pages"
    ON public.pages FOR SELECT
    USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update pages"
    ON public.pages FOR UPDATE
    USING (has_role(auth.uid(), 'admin'));

-- Public SELECT for published pages (future-ready)
CREATE POLICY "Public can view published pages"
    ON public.pages FOR SELECT
    USING (is_published = true);

-- Seed exactly 6 predefined pages per documentation
INSERT INTO public.pages (slug, title, meta_title, meta_description, is_published) VALUES
    ('about', 'About Us', 'About Devmart | Professional Software Development', 'Learn about Devmart, our mission, values, and the expert team behind our innovative software solutions.', true),
    ('services', 'Services', 'Our Services | Devmart Development Solutions', 'Discover our comprehensive range of software development services including web, mobile, and enterprise solutions.', true),
    ('service-details', 'Service Details', 'Service Details | Devmart', 'Detailed information about our specialized development services and technical expertise.', true),
    ('contact', 'Contact Us', 'Contact Devmart | Get in Touch', 'Contact our team for inquiries, project discussions, or partnership opportunities. We are here to help.', true),
    ('blog', 'Blog', 'Devmart Blog | Insights and Updates', 'Read the latest insights, tutorials, and updates from our development team.', true),
    ('projects', 'Projects', 'Our Projects | Devmart Portfolio', 'Explore our portfolio of successful software development projects and client solutions.', true);