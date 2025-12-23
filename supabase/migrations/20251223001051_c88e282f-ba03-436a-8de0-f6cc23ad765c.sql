-- =============================================
-- Phase 4A.4B: Blog Seeding Schema + Data
-- =============================================

-- 1. Add category column to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category TEXT;

-- 2. Create blog_tags table
CREATE TABLE IF NOT EXISTS public.blog_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on blog_tags
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;

-- RLS policies for blog_tags (admin-only)
CREATE POLICY "Admins can view all tags" ON public.blog_tags
    FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create tags" ON public.blog_tags
    FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update tags" ON public.blog_tags
    FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete tags" ON public.blog_tags
    FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Create blog_post_tags join table
CREATE TABLE IF NOT EXISTS public.blog_post_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.blog_tags(id) ON DELETE CASCADE,
    UNIQUE(post_id, tag_id)
);

-- Enable RLS on blog_post_tags
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

-- RLS policies for blog_post_tags (admin-only)
CREATE POLICY "Admins can view all post tags" ON public.blog_post_tags
    FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create post tags" ON public.blog_post_tags
    FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete post tags" ON public.blog_post_tags
    FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Create blog_comments table
CREATE TABLE IF NOT EXISTS public.blog_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    commenter_name TEXT NOT NULL,
    commenter_email TEXT,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on blog_comments
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- RLS policies for blog_comments (admin-only)
CREATE POLICY "Admins can view all comments" ON public.blog_comments
    FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create comments" ON public.blog_comments
    FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update comments" ON public.blog_comments
    FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete comments" ON public.blog_comments
    FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- =============================================
-- SEED DATA
-- =============================================

-- 5. Seed 10 tags
INSERT INTO public.blog_tags (id, name, slug) VALUES
    ('a1000000-0000-0000-0000-000000000001', 'Technology', 'technology'),
    ('a1000000-0000-0000-0000-000000000002', 'Business Strategy', 'business-strategy'),
    ('a1000000-0000-0000-0000-000000000003', 'Design', 'design'),
    ('a1000000-0000-0000-0000-000000000004', 'Development', 'development'),
    ('a1000000-0000-0000-0000-000000000005', 'Marketing', 'marketing'),
    ('a1000000-0000-0000-0000-000000000006', 'Innovation', 'innovation'),
    ('a1000000-0000-0000-0000-000000000007', 'Analytics', 'analytics'),
    ('a1000000-0000-0000-0000-000000000008', 'Security', 'security'),
    ('a1000000-0000-0000-0000-000000000009', 'Performance', 'performance'),
    ('a1000000-0000-0000-0000-000000000010', 'Digital Transformation', 'digital-transformation')
ON CONFLICT (slug) DO NOTHING;

-- 6. Seed 6 blog posts (3 published, 3 draft)
-- Using a fixed author_id placeholder (will be actual admin user in production)
-- Using existing media library image IDs for featured images

-- Post 1: Published - Business Strategy
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, featured_image_media_id, status, published_at, author_id, category) VALUES
(
    'b1000000-0000-0000-0000-000000000001',
    'The Future of Digital Business Strategy',
    'future-of-digital-business-strategy',
    'Discover how leading organizations are leveraging digital transformation to create competitive advantages and drive sustainable growth in an increasingly connected world.',
    '<h2>Embracing the Digital Revolution</h2>
<p>In today''s rapidly evolving business landscape, digital transformation is no longer optional—it''s essential for survival and growth. Organizations across industries are reimagining their operations, customer experiences, and business models to thrive in the digital age.</p>

<p>The most successful companies understand that digital transformation goes beyond implementing new technologies. It requires a fundamental shift in mindset, culture, and strategy. This comprehensive approach enables organizations to unlock new value streams and create lasting competitive advantages.</p>

<h3>Key Pillars of Digital Strategy</h3>
<p>Building a robust digital strategy requires focus on several critical areas:</p>
<ul>
<li>Customer-centric design thinking</li>
<li>Data-driven decision making</li>
<li>Agile organizational structures</li>
<li>Continuous innovation culture</li>
</ul>

<blockquote>
<p>"Digital transformation is not about technology—it''s about reimagining your business for the digital age. The companies that succeed are those that put customers at the center of everything they do."</p>
</blockquote>

<h3>Measuring Success</h3>
<p>Successful digital initiatives require clear metrics and KPIs. Organizations should track both operational improvements and strategic outcomes to ensure their investments deliver tangible results.</p>

<img src="https://hwrlkrrdqbtgyjpsrijh.supabase.co/storage/v1/object/public/media/finibus/portfolio/portfolio-1.jpg" alt="Digital strategy visualization" />

<p>As we look to the future, the pace of change will only accelerate. Organizations that build adaptable, customer-focused digital strategies today will be best positioned to capture tomorrow''s opportunities.</p>',
    '6782fdae-6e39-4769-a50b-c039b168e4fe',
    'published',
    '2025-12-20 10:00:00+00',
    '00000000-0000-0000-0000-000000000000',
    'Business'
);

-- Post 2: Published - Technology
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, featured_image_media_id, status, published_at, author_id, category) VALUES
(
    'b1000000-0000-0000-0000-000000000002',
    'Building Scalable Web Applications in 2025',
    'building-scalable-web-applications-2025',
    'Learn the essential principles and modern technologies for building web applications that can handle millions of users while maintaining performance and reliability.',
    '<h2>The Architecture of Scale</h2>
<p>Building applications that scale effectively requires careful planning from day one. Whether you''re starting a new project or evolving an existing system, understanding the principles of scalable architecture is crucial for long-term success.</p>

<p>Modern web applications face unprecedented demands. Users expect instant responses, seamless experiences across devices, and 24/7 availability. Meeting these expectations requires a thoughtful approach to system design.</p>

<h3>Foundation: Choosing the Right Stack</h3>
<p>Your technology choices matter. The foundation you build on will determine how easily your application can grow. Consider factors like:</p>
<ul>
<li>Horizontal vs vertical scaling capabilities</li>
<li>Database performance characteristics</li>
<li>Caching strategies and CDN integration</li>
<li>Microservices vs monolithic architectures</li>
</ul>

<blockquote>
<p>"Premature optimization is the root of all evil, but premature architecture decisions can be equally costly. Build for today, but design for tomorrow."</p>
</blockquote>

<h3>Performance Optimization</h3>
<p>Performance isn''t just about speed—it''s about efficiency. Every millisecond saved translates to better user experience and lower infrastructure costs. Focus on:</p>

<img src="https://hwrlkrrdqbtgyjpsrijh.supabase.co/storage/v1/object/public/media/finibus/portfolio/portfolio-2.jpg" alt="Application architecture diagram" />

<h3>Monitoring and Observability</h3>
<p>You can''t improve what you can''t measure. Implement comprehensive monitoring from the start to identify bottlenecks before they become critical issues.</p>

<p>Building scalable applications is both an art and a science. By following proven patterns and staying current with emerging technologies, you can create systems that grow gracefully with your business.</p>',
    'd159e397-5dcf-4136-892f-763502a86975',
    'published',
    '2025-12-18 14:30:00+00',
    '00000000-0000-0000-0000-000000000000',
    'Technology'
);

-- Post 3: Published - Design
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, featured_image_media_id, status, published_at, author_id, category) VALUES
(
    'b1000000-0000-0000-0000-000000000003',
    'Design Thinking in the Modern Enterprise',
    'design-thinking-modern-enterprise',
    'Explore how design thinking methodologies are transforming enterprise innovation and helping organizations create products and services that truly resonate with users.',
    '<h2>Beyond Aesthetics: Design as Strategy</h2>
<p>Design thinking has evolved from a creative discipline into a powerful business strategy. Leading enterprises are embedding design principles throughout their organizations, from product development to customer service to internal processes.</p>

<p>This human-centered approach to problem-solving emphasizes empathy, experimentation, and iteration. By deeply understanding user needs before jumping to solutions, organizations can create more impactful and sustainable innovations.</p>

<h3>The Design Thinking Process</h3>
<p>Successful implementation of design thinking follows a structured yet flexible framework:</p>
<ul>
<li><strong>Empathize:</strong> Understand your users deeply</li>
<li><strong>Define:</strong> Articulate the core problem</li>
<li><strong>Ideate:</strong> Generate diverse solutions</li>
<li><strong>Prototype:</strong> Build to learn</li>
<li><strong>Test:</strong> Validate with real users</li>
</ul>

<blockquote>
<p>"Great design isn''t about making things pretty—it''s about solving real problems in elegant ways. The best solutions often come from unexpected places when you truly listen to your users."</p>
</blockquote>

<img src="https://hwrlkrrdqbtgyjpsrijh.supabase.co/storage/v1/object/public/media/finibus/portfolio/portfolio-3.jpg" alt="Design thinking workshop" />

<h3>Building a Design Culture</h3>
<p>Embedding design thinking requires more than training—it requires cultural change. Leaders must model design behaviors, celebrate experimentation, and create safe spaces for failure and learning.</p>

<h3>Measuring Design Impact</h3>
<p>Quantifying the value of design can be challenging, but it''s essential for sustained investment. Track metrics like customer satisfaction, conversion rates, and time-to-market for new features.</p>

<p>As markets become more competitive and customer expectations continue to rise, design thinking provides a proven framework for creating products and experiences that stand out.</p>',
    '55c44637-efcd-41b0-9796-c25e042e9f4b',
    'published',
    '2025-12-15 09:00:00+00',
    '00000000-0000-0000-0000-000000000000',
    'Design'
);

-- Post 4: Draft - Technology
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, featured_image_media_id, status, author_id, category) VALUES
(
    'b1000000-0000-0000-0000-000000000004',
    'Upcoming Trends in AI and Machine Learning',
    'upcoming-trends-ai-machine-learning',
    'A look at the emerging artificial intelligence trends that will shape business and technology in the coming years.',
    '<h2>The AI Revolution Continues</h2>
<p>Artificial intelligence is rapidly transforming every industry. From healthcare to finance, AI-powered solutions are creating new possibilities and disrupting established business models.</p>

<p>This article explores the key trends to watch and how organizations can prepare for the next wave of AI innovation.</p>

<h3>Key Trends</h3>
<ul>
<li>Generative AI applications</li>
<li>Edge AI deployment</li>
<li>Explainable AI requirements</li>
</ul>

<p>[Draft - Content to be expanded]</p>',
    'ac2f110e-26eb-4c80-8635-a786b16e9af4',
    'draft',
    '00000000-0000-0000-0000-000000000000',
    'Technology'
);

-- Post 5: Draft - Marketing
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, featured_image_media_id, status, author_id, category) VALUES
(
    'b1000000-0000-0000-0000-000000000005',
    'The Complete Guide to Marketing Automation',
    'complete-guide-marketing-automation',
    'Everything you need to know about implementing marketing automation to drive growth and improve customer engagement.',
    '<h2>Automating Your Marketing Success</h2>
<p>Marketing automation has become essential for modern businesses looking to scale their customer acquisition and retention efforts efficiently.</p>

<p>This comprehensive guide covers strategy, tools, and best practices for implementing effective marketing automation.</p>

<h3>Topics Covered</h3>
<ul>
<li>Choosing the right platform</li>
<li>Building automation workflows</li>
<li>Measuring ROI</li>
</ul>

<p>[Draft - Content to be expanded]</p>',
    'f1289f86-f3ef-46a2-97da-d083ec66de5d',
    'draft',
    '00000000-0000-0000-0000-000000000000',
    'Marketing'
);

-- Post 6: Draft - Technology/Security
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, featured_image_media_id, status, author_id, category) VALUES
(
    'b1000000-0000-0000-0000-000000000006',
    'Security Best Practices for Modern Applications',
    'security-best-practices-modern-applications',
    'Essential security practices every development team should implement to protect their applications and user data.',
    '<h2>Building Secure Applications</h2>
<p>Security should be a foundational concern, not an afterthought. This guide covers the essential practices for building and maintaining secure applications.</p>

<h3>Key Areas</h3>
<ul>
<li>Authentication and authorization</li>
<li>Data encryption</li>
<li>Input validation</li>
<li>Security testing</li>
</ul>

<p>[Draft - Content to be expanded]</p>',
    'ab091553-041b-42b1-8943-e3a6fcdc792a',
    'draft',
    '00000000-0000-0000-0000-000000000000',
    'Technology'
);

-- 7. Seed blog_post_tags (3-5 tags per published post)
-- Post 1: Business Strategy (Tags: Business Strategy, Digital Transformation, Innovation, Analytics)
INSERT INTO public.blog_post_tags (post_id, tag_id) VALUES
    ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002'),
    ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000010'),
    ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000006'),
    ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000007');

-- Post 2: Technology (Tags: Technology, Development, Performance, Security)
INSERT INTO public.blog_post_tags (post_id, tag_id) VALUES
    ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001'),
    ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000004'),
    ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000009'),
    ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000008');

-- Post 3: Design (Tags: Design, Innovation, Business Strategy)
INSERT INTO public.blog_post_tags (post_id, tag_id) VALUES
    ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003'),
    ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000006'),
    ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002');

-- 8. Seed 8 comments across published posts
-- Comments for Post 1 (3 comments)
INSERT INTO public.blog_comments (post_id, commenter_name, commenter_email, body, created_at) VALUES
(
    'b1000000-0000-0000-0000-000000000001',
    'Sarah Mitchell',
    'sarah.mitchell@example.com',
    'This is exactly the perspective our leadership team needs to see. Digital transformation really is about mindset first, technology second. We''ve struggled with this internally and your framework provides a great starting point for our discussions.',
    '2025-12-21 08:30:00+00'
),
(
    'b1000000-0000-0000-0000-000000000001',
    'James Chen',
    'jchen@techcorp.io',
    'Great insights on measuring digital transformation success. The KPI framework you mention is something we''ve been working on implementing. Would love to see a follow-up article diving deeper into specific metrics and benchmarks.',
    '2025-12-21 14:15:00+00'
),
(
    'b1000000-0000-0000-0000-000000000001',
    'Amanda Rodriguez',
    'amanda.r@consulting.com',
    'The quote about putting customers at the center really resonates. We''ve seen too many organizations get caught up in the technology itself rather than focusing on the outcomes they''re trying to achieve. Thanks for the reminder!',
    '2025-12-22 09:45:00+00'
);

-- Comments for Post 2 (3 comments)
INSERT INTO public.blog_comments (post_id, commenter_name, commenter_email, body, created_at) VALUES
(
    'b1000000-0000-0000-0000-000000000002',
    'Michael Thompson',
    'mthompson@startuplab.com',
    'The section on choosing between horizontal and vertical scaling is spot on. We made the mistake of going vertical first and are now paying the price in migration costs. This would have been great to read two years ago!',
    '2025-12-19 11:20:00+00'
),
(
    'b1000000-0000-0000-0000-000000000002',
    'Lisa Park',
    'lisa.park@devteam.org',
    'Excellent breakdown of scalability principles. I particularly appreciated the emphasis on monitoring from day one. We''ve found that observability investments pay for themselves many times over when debugging production issues.',
    '2025-12-20 16:00:00+00'
),
(
    'b1000000-0000-0000-0000-000000000002',
    'David Wilson',
    'dwilson@enterprise.net',
    'Would love to see more content on microservices vs monolith decision-making. It''s a debate we have regularly on our team, and there''s no one-size-fits-all answer. Your balanced perspective is refreshing.',
    '2025-12-21 10:30:00+00'
);

-- Comments for Post 3 (2 comments)
INSERT INTO public.blog_comments (post_id, commenter_name, commenter_email, body, created_at) VALUES
(
    'b1000000-0000-0000-0000-000000000003',
    'Jennifer Adams',
    'jadams@designstudio.com',
    'Finally, an article that explains design thinking in practical terms rather than abstract concepts. The five-step framework is easy to follow and I''m already planning how to introduce it to my team. Thank you!',
    '2025-12-16 13:45:00+00'
),
(
    'b1000000-0000-0000-0000-000000000003',
    'Robert Martinez',
    'robert.m@innovation.co',
    'The point about building a design culture is crucial and often overlooked. We tried to implement design thinking as a process but it only really took off when leadership started modeling the behaviors themselves.',
    '2025-12-17 09:00:00+00'
);