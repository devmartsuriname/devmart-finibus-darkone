-- ============================================
-- Phase 4A.6: Testimonials Table + RLS + Seed
-- ============================================

-- 1. Create testimonials table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    author_title TEXT,
    company TEXT,
    quote TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    avatar_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    featured BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    display_order INTEGER,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create indexes
CREATE INDEX testimonials_status_idx ON public.testimonials(status);
CREATE INDEX testimonials_featured_idx ON public.testimonials(featured, display_order);

-- 3. Create updated_at trigger
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies: Admin full CRUD
CREATE POLICY "Admins can view all testimonials"
    ON public.testimonials
    FOR SELECT
    USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create testimonials"
    ON public.testimonials
    FOR INSERT
    WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials"
    ON public.testimonials
    FOR UPDATE
    USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials"
    ON public.testimonials
    FOR DELETE
    USING (has_role(auth.uid(), 'admin'));

-- 6. RLS Policy: Public can read published testimonials (future-ready)
CREATE POLICY "Public can view published testimonials"
    ON public.testimonials
    FOR SELECT
    USING (status = 'published');

-- 7. Seed testimonials (6 records)
-- Avatar IDs resolved from media table by filename:
-- client-1.jpg: 3b22a9d3-bcc9-47ae-ba2e-1d1ce0c2dc29
-- client-2.jpg: 7ed2a7e4-25da-4a2a-ab75-fa5fd20ff71f
-- client-3.jpg: 52629895-4c89-4fda-bdc1-f7de9aa5f6c1
-- author-1.jpg: 96912445-d79e-47f6-8476-bf12eb111c13
-- author-2.jpg: c01eff35-45d2-4b00-a6c8-84e85eae133d
-- author-3.jpg: a527fdf6-1e4c-461d-8712-6830bc55bd03

INSERT INTO public.testimonials (author_name, author_title, company, quote, rating, avatar_media_id, featured, status, display_order, published_at)
VALUES
    -- Featured testimonials (published, with display_order)
    (
        'Savannah Nguyen',
        'Executive CEO',
        'TechCorp Solutions',
        'Devmart transformed our digital presence completely. Their team delivered a stunning website that exceeded our expectations and drove measurable business results. The attention to detail and strategic approach made all the difference.',
        5,
        '3b22a9d3-bcc9-47ae-ba2e-1d1ce0c2dc29',
        true,
        'published',
        1,
        now()
    ),
    (
        'Nailong Jeso',
        'CTO & Founder',
        'InnovateTech Labs',
        'Working with Devmart was an absolute pleasure. They understood our vision from day one and executed flawlessly. The project was delivered on time and the quality of work speaks for itself. Highly recommended!',
        5,
        '7ed2a7e4-25da-4a2a-ab75-fa5fd20ff71f',
        true,
        'published',
        2,
        now()
    ),
    (
        'Gautam Yamni',
        'Head of Design',
        'CreativeHub Agency',
        'The team at Devmart brings both creativity and technical excellence to every project. Our new platform has received overwhelmingly positive feedback from users. They truly care about delivering exceptional results.',
        5,
        '52629895-4c89-4fda-bdc1-f7de9aa5f6c1',
        true,
        'published',
        3,
        now()
    ),
    -- Non-featured published testimonial
    (
        'Marcus Johnson',
        'Product Manager',
        'SolutionsInc',
        'Devmart helped us modernize our legacy systems with a fresh, user-friendly interface. The transition was smooth and our team productivity has increased significantly since the launch.',
        4,
        '96912445-d79e-47f6-8476-bf12eb111c13',
        false,
        'published',
        NULL,
        now()
    ),
    -- Draft testimonials (not published)
    (
        'Emily Chen',
        'Marketing Director',
        'GrowthLabs',
        'Outstanding work on our marketing website. The design is modern, the performance is excellent, and the SEO improvements have already started showing results in our analytics.',
        5,
        'c01eff35-45d2-4b00-a6c8-84e85eae133d',
        false,
        'draft',
        NULL,
        NULL
    ),
    (
        'David Wilson',
        'Operations Lead',
        'ScaleUp Co',
        'Professional team that delivers on their promises. The project management was excellent and communication was clear throughout the entire development process.',
        4,
        'a527fdf6-1e4c-461d-8712-6830bc55bd03',
        false,
        'draft',
        NULL,
        NULL
    );