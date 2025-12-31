-- Part C: Populate SEO data for all Services

UPDATE public.services SET
  meta_title = 'Web Platforms | Custom Digital Solutions',
  meta_description = 'Enterprise web platforms designed for scale. From portals to SaaS applications, we build robust digital foundations.',
  canonical_url = 'https://devmart.co/services/web-design'
WHERE slug = 'web-design';

UPDATE public.services SET
  meta_title = 'Product Design | User-Centered Digital Products',
  meta_description = 'Strategic product design that balances user needs with business goals. Create products people love to use.',
  canonical_url = 'https://devmart.co/services/app-design'
WHERE slug = 'app-design';

UPDATE public.services SET
  meta_title = 'Software Engineering | Scalable Development',
  meta_description = 'Full-stack development services. Modern architectures, clean code, and systems built for growth.',
  canonical_url = 'https://devmart.co/services/developing'
WHERE slug = 'developing';

UPDATE public.services SET
  meta_title = 'Brand Design | Strategic Visual Identity',
  meta_description = 'Comprehensive brand design that communicates your value. Logo systems, guidelines, and visual standards.',
  canonical_url = 'https://devmart.co/services/graphic-design'
WHERE slug = 'graphic-design';

UPDATE public.services SET
  meta_title = 'Motion & Video | Dynamic Visual Content',
  meta_description = 'Motion graphics and video production that captures attention. Explainers, product demos, and brand videos.',
  canonical_url = 'https://devmart.co/services/video-animation'
WHERE slug = 'video-animation';

UPDATE public.services SET
  meta_title = '3D Visualization | Immersive Visual Experiences',
  meta_description = 'Photorealistic 3D rendering and visualization. Product renders, architectural viz, and interactive experiences.',
  canonical_url = 'https://devmart.co/services/3d-design'
WHERE slug = '3d-design';

UPDATE public.services SET
  meta_title = 'UX & Service Design | Experience Strategy',
  meta_description = 'End-to-end experience design. Research-driven UX, service blueprints, and journey optimization.',
  canonical_url = 'https://devmart.co/services/ui-ux-design'
WHERE slug = 'ui-ux-design';