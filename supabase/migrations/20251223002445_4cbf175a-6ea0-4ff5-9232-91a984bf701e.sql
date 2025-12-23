-- Phase 4A.5: Projects Module
-- Create projects table with full schema per spec

CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    heading TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    featured_image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    category TEXT NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    client TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create required indexes per spec
CREATE INDEX projects_category_idx ON public.projects(category);
CREATE INDEX projects_status_idx ON public.projects(status);
CREATE INDEX projects_featured_idx ON public.projects(is_featured, display_order);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies: ADMIN-ONLY (no public access)
CREATE POLICY "Admins can view all projects"
ON public.projects
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create projects"
ON public.projects
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
ON public.projects
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
ON public.projects
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed data: 8 projects (5 published, 3 draft)
-- Using portfolio images from Media Library

INSERT INTO public.projects (title, heading, slug, description, image_media_id, featured_image_media_id, category, is_featured, display_order, status, client) VALUES
-- Published projects (5)
(
    'Corporate Brand Identity',
    'Complete brand transformation for tech startup',
    'corporate-brand-identity',
    'A comprehensive branding project that included logo design, color palette development, typography selection, and brand guidelines. The client required a modern, tech-forward identity that would appeal to both enterprise clients and innovative startups.',
    '3787af8a-2a24-4e1d-a5dc-858b932945e9', -- portfolio-1.jpg
    '3787af8a-2a24-4e1d-a5dc-858b932945e9',
    'Graphic Design',
    true,
    1,
    'published',
    'TechVenture Inc.'
),
(
    'E-Commerce Platform Redesign',
    'Modern shopping experience for fashion retailer',
    'ecommerce-platform-redesign',
    'Complete redesign of an e-commerce platform focusing on user experience, conversion optimization, and mobile-first design. The project included user research, wireframing, prototyping, and final implementation support.',
    '77151126-071b-4993-bad3-5f1be537ecb5', -- portfolio-2.jpg
    '77151126-071b-4993-bad3-5f1be537ecb5',
    'UI/UX',
    true,
    2,
    'published',
    'StyleHub Fashion'
),
(
    'SaaS Dashboard Interface',
    'Analytics dashboard for data-driven teams',
    'saas-dashboard-interface',
    'Design and development of a comprehensive analytics dashboard featuring real-time data visualization, customizable widgets, and intuitive navigation. Built with React and modern charting libraries.',
    '15bf813d-75c9-4b6e-8083-d78b58bb4732', -- portfolio-3.jpg
    '15bf813d-75c9-4b6e-8083-d78b58bb4732',
    'Web Design',
    true,
    3,
    'published',
    'DataFlow Analytics'
),
(
    'Mobile Banking Application',
    'Secure and intuitive banking experience',
    'mobile-banking-application',
    'Full-stack development of a mobile banking application with features including account management, fund transfers, bill payments, and real-time notifications. Security was paramount throughout the development process.',
    '6fd69cc5-7649-4902-83f0-930a34507264', -- portfolio-4.jpg
    '6fd69cc5-7649-4902-83f0-930a34507264',
    'Developing',
    true,
    4,
    'published',
    'SecureBank Financial'
),
(
    'Restaurant Website & Ordering System',
    'Digital transformation for local dining',
    'restaurant-website-ordering',
    'Complete digital solution including responsive website, online ordering system, and reservation management. The project helped the client increase online orders by 300% within the first quarter.',
    'cde09e5b-d849-4e53-af73-809120c8c3cf', -- portfolio-5.jpg
    'cde09e5b-d849-4e53-af73-809120c8c3cf',
    'Web Design',
    false,
    NULL,
    'published',
    'Bistro Moderne'
),
-- Draft projects (3)
(
    'Healthcare Portal Concept',
    'Patient management system design',
    'healthcare-portal-concept',
    'Work-in-progress design for a healthcare patient portal. Currently in the wireframing and user research phase.',
    '462265ab-7b81-4f81-9635-c00366bd02fb', -- portfolio-6.jpg
    '462265ab-7b81-4f81-9635-c00366bd02fb',
    'UI/UX',
    false,
    NULL,
    'draft',
    NULL
),
(
    'Fitness App Branding',
    'Visual identity for wellness startup',
    'fitness-app-branding',
    'Brand identity development for a new fitness and wellness application. Initial concepts under review.',
    '0cc54eed-5319-45fe-a68e-8e8438f8fe08', -- portfolio-7.jpg
    '0cc54eed-5319-45fe-a68e-8e8438f8fe08',
    'Graphic Design',
    false,
    NULL,
    'draft',
    NULL
),
(
    'Real Estate Platform',
    'Property listing and management system',
    'real-estate-platform',
    'Early development phase for a comprehensive real estate platform with property listings, virtual tours, and agent management.',
    '0d01e4fd-167e-47b8-971c-9453732374ee', -- portfolio-8.jpg
    '0d01e4fd-167e-47b8-971c-9453732374ee',
    'Developing',
    false,
    NULL,
    'draft',
    NULL
);