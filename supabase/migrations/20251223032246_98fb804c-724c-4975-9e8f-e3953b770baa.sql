-- =============================================
-- Phase 4: Services Module Tables
-- =============================================

-- 1. Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    icon_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT services_status_check CHECK (status IN ('draft', 'published'))
);

-- 2. Create service_process_steps table
CREATE TABLE public.service_process_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Create service_pricing_plans table
CREATE TABLE public.service_pricing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    billing_period TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    plan_subtitle TEXT,
    price_amount NUMERIC(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    cta_label TEXT NOT NULL DEFAULT 'Get Started',
    display_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT pricing_billing_period_check CHECK (billing_period IN ('monthly', 'yearly')),
    CONSTRAINT pricing_status_check CHECK (status IN ('draft', 'published'))
);

-- 4. Create indexes
CREATE INDEX idx_services_status ON public.services(status);
CREATE INDEX idx_services_display_order ON public.services(display_order);
CREATE INDEX idx_service_process_steps_service_id ON public.service_process_steps(service_id);
CREATE INDEX idx_service_process_steps_step_number ON public.service_process_steps(step_number);
CREATE INDEX idx_service_pricing_plans_service_id ON public.service_pricing_plans(service_id);
CREATE INDEX idx_service_pricing_plans_billing_period ON public.service_pricing_plans(billing_period);
CREATE INDEX idx_service_pricing_plans_status ON public.service_pricing_plans(status);

-- 5. Create updated_at triggers
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_process_steps_updated_at
    BEFORE UPDATE ON public.service_process_steps
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_pricing_plans_updated_at
    BEFORE UPDATE ON public.service_pricing_plans
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- RLS Policies
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_pricing_plans ENABLE ROW LEVEL SECURITY;

-- Services RLS Policies
CREATE POLICY "Public can view published services"
    ON public.services
    FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins can view all services"
    ON public.services
    FOR SELECT
    USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create services"
    ON public.services
    FOR INSERT
    WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update services"
    ON public.services
    FOR UPDATE
    USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete services"
    ON public.services
    FOR DELETE
    USING (has_role(auth.uid(), 'admin'));

-- Service Process Steps RLS Policies
CREATE POLICY "Public can view steps of published services"
    ON public.service_process_steps
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.services 
        WHERE services.id = service_process_steps.service_id 
        AND services.status = 'published'
    ));

CREATE POLICY "Admins can view all steps"
    ON public.service_process_steps
    FOR SELECT
    USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create steps"
    ON public.service_process_steps
    FOR INSERT
    WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update steps"
    ON public.service_process_steps
    FOR UPDATE
    USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete steps"
    ON public.service_process_steps
    FOR DELETE
    USING (has_role(auth.uid(), 'admin'));

-- Service Pricing Plans RLS Policies
CREATE POLICY "Public can view published plans of published services"
    ON public.service_pricing_plans
    FOR SELECT
    USING (
        status = 'published' 
        AND EXISTS (
            SELECT 1 FROM public.services 
            WHERE services.id = service_pricing_plans.service_id 
            AND services.status = 'published'
        )
    );

CREATE POLICY "Admins can view all plans"
    ON public.service_pricing_plans
    FOR SELECT
    USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create plans"
    ON public.service_pricing_plans
    FOR INSERT
    WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update plans"
    ON public.service_pricing_plans
    FOR UPDATE
    USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete plans"
    ON public.service_pricing_plans
    FOR DELETE
    USING (has_role(auth.uid(), 'admin'));

-- =============================================
-- Seed Data (7 Services with Steps and Pricing)
-- =============================================

-- Insert Services
INSERT INTO public.services (title, slug, short_description, full_description, display_order, status) VALUES
('Web Design', 'web-design', 'interger purus adio, placerat ni in, ullamcorper nec dolor.', 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, in eget lacinia magna justo vehicula metus. Morbi sit amet erat faucibus, sagittis libero sed, thatenigr condimentum tortor. Aenean ac nunc dolor. Quisque vestibulum mollis nisi, vel dictum nisi. nangol Vestibulum tempor tristique neque non pretium. Etiam leo risus, consectetur sagittis ullamcorper scelerisque, blandit vitae sem.', 1, 'published'),
('App Design', 'app-design', 'interger purus adio, placerat ni in, ullamcorper nec dolor.', 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, in eget lacinia magna justo vehicula metus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor.', 2, 'published'),
('Developing', 'developing', 'interger purus adio, placerat ni in, ullamcorper nec dolor.', 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, in eget lacinia magna justo vehicula metus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor.', 3, 'published'),
('Graphic Design', 'graphic-design', 'interger purus adio, placerat ni in, ullamcorper nec dolor.', 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, in eget lacinia magna justo vehicula metus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor.', 4, 'published'),
('Video Animation', 'video-animation', 'interger purus adio, placerat ni in, ullamcorper nec dolor.', 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, in eget lacinia magna justo vehicula metus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor.', 5, 'published'),
('3D Design', '3d-design', 'interger purus adio, placerat ni in, ullamcorper nec dolor.', 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, in eget lacinia magna justo vehicula metus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor.', 6, 'published'),
('UI/UX Design', 'ui-ux-design', 'interger purus adio, placerat ni in, ullamcorper nec dolor.', 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, in eget lacinia magna justo vehicula metus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor.', 7, 'published');

-- Insert Process Steps for each service
INSERT INTO public.service_process_steps (service_id, step_number, title, description)
SELECT 
    s.id,
    step.step_number,
    step.title,
    step.description
FROM public.services s
CROSS JOIN (
    VALUES 
        (1, 'Wireframe & Design', 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, eget lacinia magna justo vehiculametus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor.'),
        (2, 'Developing', 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, eget lacinia magna justo vehiculametus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor.'),
        (3, 'Checkup & Launch', 'In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis finibus, metus sapien venenatis orci, eget lacinia magna justo vehiculametus. Morbi sit amet erat faucibus, sagittis libero sed, condimentum tortor.')
) AS step(step_number, title, description);

-- Insert Pricing Plans (Monthly)
INSERT INTO public.service_pricing_plans (service_id, billing_period, plan_name, plan_subtitle, price_amount, currency, features, cta_label, display_order, status)
SELECT 
    s.id,
    'monthly',
    plan.plan_name,
    plan.plan_subtitle,
    plan.price_amount,
    'USD',
    plan.features::jsonb,
    'Pay Now',
    plan.display_order,
    'published'
FROM public.services s
CROSS JOIN (
    VALUES 
        ('Small Business', 'Single Business', 150.99, '["10 Pages Responsive Website", "5 PPC Campaigns", "10 SEO Keywords", "5 Facebook Campaigns", "2 Video Campaigns"]', 1),
        ('Professional', 'Small team', 99.99, '["15 Pages Responsive Website", "10 PPC Campaigns", "15 SEO Keywords", "8 Facebook Campaigns", "5 Video Campaigns"]', 2),
        ('Enterprise', 'Large Business', 350.00, '["20 Pages Responsive Website", "15 PPC Campaigns", "20 SEO Keywords", "15 Facebook Campaigns", "12 Video Campaigns"]', 3)
) AS plan(plan_name, plan_subtitle, price_amount, features, display_order);

-- Insert Pricing Plans (Yearly)
INSERT INTO public.service_pricing_plans (service_id, billing_period, plan_name, plan_subtitle, price_amount, currency, features, cta_label, display_order, status)
SELECT 
    s.id,
    'yearly',
    plan.plan_name,
    plan.plan_subtitle,
    plan.price_amount,
    'USD',
    plan.features::jsonb,
    'Pay Now',
    plan.display_order,
    'published'
FROM public.services s
CROSS JOIN (
    VALUES 
        ('Professional', 'Small team', 99.99, '["16 Pages Responsive Website", "12 PPC Campaigns", "18 SEO Keywords", "8 Facebook Campaigns", "7 Video Campaigns"]', 1),
        ('Small Business', 'Single Business', 150.00, '["20 Pages Responsive Website", "15 PPC Campaigns", "20 SEO Keywords", "15 Facebook Campaigns", "11 Video Campaigns"]', 2),
        ('Enterprise', 'Large Business', 130.00, '["20 Pages Responsive Website", "15 PPC Campaigns", "50 SEO Keywords", "15 Facebook Campaigns", "12 Video Campaigns"]', 3)
) AS plan(plan_name, plan_subtitle, price_amount, features, display_order);