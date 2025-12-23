-- Phase 5.4+ Hotfix: Seed backfill for existing 8 projects
-- Adds: website, start_date, end_date, check_launch_content, check_launch_image_media_id
-- Creates: 4 process steps per project (32 total)

-- ============================================
-- UPDATE EXISTING PROJECTS WITH NEW FIELDS
-- ============================================

-- Project 1: Corporate Brand Identity (published)
UPDATE public.projects
SET 
  website = 'www.corpbrand.com',
  start_date = '2024-01-15',
  end_date = '2024-03-20',
  check_launch_content = 'Final brand guidelines were delivered including logo usage, color palette specifications, and typography standards. The client received comprehensive brand assets for web, print, and social media applications. Quality assurance testing confirmed consistent rendering across all platforms.',
  check_launch_image_media_id = '3787af8a-2a24-4e1d-a5dc-858b932945e9'
WHERE slug = 'corporate-brand-identity';

-- Project 2: E-Commerce Platform Redesign (published)
UPDATE public.projects
SET 
  website = 'www.shopease.io',
  start_date = '2024-02-01',
  end_date = '2024-05-15',
  check_launch_content = 'The redesigned e-commerce platform launched with improved UX flows, resulting in a 35% increase in conversion rates. Performance benchmarks met all targets with sub-2-second page loads. Mobile responsiveness verified across 50+ device configurations.',
  check_launch_image_media_id = '77151126-071b-4993-bad3-5f1be537ecb5'
WHERE slug = 'ecommerce-platform-redesign';

-- Project 3: SaaS Dashboard Interface (published)
UPDATE public.projects
SET 
  website = 'app.analyticscloud.com',
  start_date = '2024-03-10',
  end_date = '2024-06-25',
  check_launch_content = 'Dashboard interface deployed with real-time data visualization components. User testing showed 45% reduction in time-to-insight. Accessibility audit passed WCAG 2.1 AA standards. Integration with existing APIs completed successfully.',
  check_launch_image_media_id = '15bf813d-75c9-4b6e-8083-d78b58bb4732'
WHERE slug = 'saas-dashboard-interface';

-- Project 4: Mobile Banking Application (published)
UPDATE public.projects
SET 
  website = 'www.securefinance.app',
  start_date = '2024-04-01',
  end_date = '2024-08-30',
  check_launch_content = 'Banking app launched on iOS and Android with biometric authentication and real-time transaction monitoring. Security penetration testing passed all compliance requirements. App store approval obtained in both markets with featured placement.',
  check_launch_image_media_id = '6fd69cc5-7649-4902-83f0-930a34507264'
WHERE slug = 'mobile-banking-application';

-- Project 5: Restaurant Website & Ordering System (published)
UPDATE public.projects
SET 
  website = 'www.tastebuds.restaurant',
  start_date = '2024-05-15',
  end_date = '2024-07-30',
  check_launch_content = 'Restaurant website and ordering system went live with integrated menu management and POS connectivity. Online ordering adoption reached 60% within first month. Customer feedback scores averaged 4.8/5 for ordering experience.',
  check_launch_image_media_id = 'cde09e5b-d849-4e53-af73-809120c8c3cf'
WHERE slug = 'restaurant-website-ordering';

-- Project 6: Healthcare Portal Concept (draft)
UPDATE public.projects
SET 
  website = NULL,
  start_date = '2024-09-01',
  end_date = NULL,
  check_launch_content = 'Project currently in discovery phase. Initial wireframes and user research completed. Awaiting regulatory compliance review before proceeding to development phase.',
  check_launch_image_media_id = NULL
WHERE slug = 'healthcare-portal-concept';

-- Project 7: Fitness App Branding (draft)
UPDATE public.projects
SET 
  website = NULL,
  start_date = '2024-10-15',
  end_date = NULL,
  check_launch_content = 'Brand identity exploration in progress. Mood boards and initial concepts presented to stakeholders. Awaiting feedback consolidation before final direction selection.',
  check_launch_image_media_id = NULL
WHERE slug = 'fitness-app-branding';

-- Project 8: Real Estate Platform (draft)
UPDATE public.projects
SET 
  website = NULL,
  start_date = '2024-11-01',
  end_date = NULL,
  check_launch_content = 'Market research and competitive analysis phase. Property listing wireframes under development. API integration requirements being documented.',
  check_launch_image_media_id = NULL
WHERE slug = 'real-estate-platform';

-- ============================================
-- CREATE PROCESS STEPS FOR ALL 8 PROJECTS
-- ============================================

-- Using step images from media library:
-- step-1.png: 9092bb55-7fbf-428e-a6fd-5f2adc58cbc0
-- step-2.jpg: 6ec8107f-b723-4da8-80de-48d9f0dfbb33
-- step-3.jpg: c6a8859b-c89a-4c97-a7a9-150b19136549
-- (step-4 will reuse step-1 pattern for variety)

-- Process Steps for Project 1: Corporate Brand Identity
INSERT INTO public.project_process_steps (project_id, step_number, title, description, image_media_id) VALUES
((SELECT id FROM projects WHERE slug = 'corporate-brand-identity'), 1, 'Brainstorming', 'Initial discovery sessions to understand brand values, target audience, and competitive landscape. Stakeholder interviews conducted to align vision.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
((SELECT id FROM projects WHERE slug = 'corporate-brand-identity'), 2, 'Wireframe', 'Brand architecture mapping and visual identity exploration. Logo concepts and color palette development with iterative refinement.', '6ec8107f-b723-4da8-80de-48d9f0dfbb33'),
((SELECT id FROM projects WHERE slug = 'corporate-brand-identity'), 3, 'UI Design', 'High-fidelity brand collateral design including stationery, digital templates, and social media assets.', 'c6a8859b-c89a-4c97-a7a9-150b19136549'),
((SELECT id FROM projects WHERE slug = 'corporate-brand-identity'), 4, 'Developing', 'Brand guidelines documentation and asset library creation. File handoff and implementation support provided.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0');

-- Process Steps for Project 2: E-Commerce Platform Redesign
INSERT INTO public.project_process_steps (project_id, step_number, title, description, image_media_id) VALUES
((SELECT id FROM projects WHERE slug = 'ecommerce-platform-redesign'), 1, 'Brainstorming', 'User journey mapping and pain point analysis. Competitive audit and conversion optimization opportunities identified.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
((SELECT id FROM projects WHERE slug = 'ecommerce-platform-redesign'), 2, 'Wireframe', 'Information architecture restructuring and checkout flow optimization. Low-fidelity prototypes for user testing.', '6ec8107f-b723-4da8-80de-48d9f0dfbb33'),
((SELECT id FROM projects WHERE slug = 'ecommerce-platform-redesign'), 3, 'UI Design', 'Visual design system creation with focus on product presentation and trust signals. Mobile-first responsive layouts.', 'c6a8859b-c89a-4c97-a7a9-150b19136549'),
((SELECT id FROM projects WHERE slug = 'ecommerce-platform-redesign'), 4, 'Developing', 'Frontend implementation with React and headless CMS integration. Performance optimization and A/B testing framework setup.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0');

-- Process Steps for Project 3: SaaS Dashboard Interface
INSERT INTO public.project_process_steps (project_id, step_number, title, description, image_media_id) VALUES
((SELECT id FROM projects WHERE slug = 'saas-dashboard-interface'), 1, 'Brainstorming', 'User research and persona development. Data visualization requirements gathering and metric prioritization.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
((SELECT id FROM projects WHERE slug = 'saas-dashboard-interface'), 2, 'Wireframe', 'Dashboard layout exploration and widget hierarchy definition. Interactive prototype for stakeholder alignment.', '6ec8107f-b723-4da8-80de-48d9f0dfbb33'),
((SELECT id FROM projects WHERE slug = 'saas-dashboard-interface'), 3, 'UI Design', 'Data visualization component library design. Dark/light theme implementation with accessibility considerations.', 'c6a8859b-c89a-4c97-a7a9-150b19136549'),
((SELECT id FROM projects WHERE slug = 'saas-dashboard-interface'), 4, 'Developing', 'Chart library integration and real-time data binding. Role-based dashboard customization and export functionality.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0');

-- Process Steps for Project 4: Mobile Banking Application
INSERT INTO public.project_process_steps (project_id, step_number, title, description, image_media_id) VALUES
((SELECT id FROM projects WHERE slug = 'mobile-banking-application'), 1, 'Brainstorming', 'Security requirements analysis and regulatory compliance mapping. User trust factors research and competitive benchmarking.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
((SELECT id FROM projects WHERE slug = 'mobile-banking-application'), 2, 'Wireframe', 'Core banking flows wireframing including authentication, transfers, and account management. Biometric integration planning.', '6ec8107f-b723-4da8-80de-48d9f0dfbb33'),
((SELECT id FROM projects WHERE slug = 'mobile-banking-application'), 3, 'UI Design', 'Native mobile interface design following iOS and Android guidelines. Security-focused UI patterns with clear feedback states.', 'c6a8859b-c89a-4c97-a7a9-150b19136549'),
((SELECT id FROM projects WHERE slug = 'mobile-banking-application'), 4, 'Developing', 'React Native implementation with secure API layer. Third-party security audit and penetration testing coordination.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0');

-- Process Steps for Project 5: Restaurant Website & Ordering System
INSERT INTO public.project_process_steps (project_id, step_number, title, description, image_media_id) VALUES
((SELECT id FROM projects WHERE slug = 'restaurant-website-ordering'), 1, 'Brainstorming', 'Menu digitization strategy and ordering workflow mapping. Integration requirements for POS and kitchen display systems.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
((SELECT id FROM projects WHERE slug = 'restaurant-website-ordering'), 2, 'Wireframe', 'Menu browsing and cart experience wireframing. Pickup vs delivery flow differentiation and scheduling interface.', '6ec8107f-b723-4da8-80de-48d9f0dfbb33'),
((SELECT id FROM projects WHERE slug = 'restaurant-website-ordering'), 3, 'UI Design', 'Appetite-driven visual design with high-quality food photography integration. Mobile-optimized ordering interface.', 'c6a8859b-c89a-4c97-a7a9-150b19136549'),
((SELECT id FROM projects WHERE slug = 'restaurant-website-ordering'), 4, 'Developing', 'Full-stack implementation with real-time order status. Payment gateway integration and receipt automation.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0');

-- Process Steps for Project 6: Healthcare Portal Concept (draft)
INSERT INTO public.project_process_steps (project_id, step_number, title, description, image_media_id) VALUES
((SELECT id FROM projects WHERE slug = 'healthcare-portal-concept'), 1, 'Brainstorming', 'HIPAA compliance requirements gathering and patient journey mapping. Stakeholder alignment on privacy-first approach.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
((SELECT id FROM projects WHERE slug = 'healthcare-portal-concept'), 2, 'Wireframe', 'Patient portal information architecture and appointment scheduling flows. Accessibility standards integration.', '6ec8107f-b723-4da8-80de-48d9f0dfbb33'),
((SELECT id FROM projects WHERE slug = 'healthcare-portal-concept'), 3, 'UI Design', 'Calming, trust-building visual design language. Clear medical information hierarchy and action-oriented CTAs.', 'c6a8859b-c89a-4c97-a7a9-150b19136549'),
((SELECT id FROM projects WHERE slug = 'healthcare-portal-concept'), 4, 'Developing', 'In planning - secure infrastructure architecture and EHR integration specifications being finalized.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0');

-- Process Steps for Project 7: Fitness App Branding (draft)
INSERT INTO public.project_process_steps (project_id, step_number, title, description, image_media_id) VALUES
((SELECT id FROM projects WHERE slug = 'fitness-app-branding'), 1, 'Brainstorming', 'Target audience profiling and brand personality definition. Competitive analysis in fitness and wellness space.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
((SELECT id FROM projects WHERE slug = 'fitness-app-branding'), 2, 'Wireframe', 'Brand touchpoint mapping and visual identity exploration. Mood board development and direction proposals.', '6ec8107f-b723-4da8-80de-48d9f0dfbb33'),
((SELECT id FROM projects WHERE slug = 'fitness-app-branding'), 3, 'UI Design', 'In progress - logo concepts and color palette options under development.', 'c6a8859b-c89a-4c97-a7a9-150b19136549'),
((SELECT id FROM projects WHERE slug = 'fitness-app-branding'), 4, 'Developing', 'Pending - awaiting brand direction approval before asset production.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0');

-- Process Steps for Project 8: Real Estate Platform (draft)
INSERT INTO public.project_process_steps (project_id, step_number, title, description, image_media_id) VALUES
((SELECT id FROM projects WHERE slug = 'real-estate-platform'), 1, 'Brainstorming', 'Market research and buyer/seller persona development. Feature prioritization based on competitive landscape analysis.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
((SELECT id FROM projects WHERE slug = 'real-estate-platform'), 2, 'Wireframe', 'Property listing pages and search/filter experience wireframing. Map integration and neighborhood data display.', '6ec8107f-b723-4da8-80de-48d9f0dfbb33'),
((SELECT id FROM projects WHERE slug = 'real-estate-platform'), 3, 'UI Design', 'In progress - visual design exploration for property showcase and inquiry flows.', 'c6a8859b-c89a-4c97-a7a9-150b19136549'),
((SELECT id FROM projects WHERE slug = 'real-estate-platform'), 4, 'Developing', 'Pending - API integration specifications for MLS data feeds being documented.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0');