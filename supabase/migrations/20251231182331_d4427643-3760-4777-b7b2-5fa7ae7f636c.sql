-- Part C: Populate SEO data for all published Projects

UPDATE public.projects SET
  meta_title = 'National Digital Services Portal | Government Digitization',
  meta_description = 'Unified citizen services portal enabling seamless government interactions. Modern, accessible, and scalable.',
  canonical_url = 'https://devmart.co/projects/national-digital-services-portal'
WHERE slug = 'national-digital-services-portal';

UPDATE public.projects SET
  meta_title = 'Immigration Case Management | Public Sector Solutions',
  meta_description = 'Comprehensive case management system streamlining immigration workflows and improving processing efficiency.',
  canonical_url = 'https://devmart.co/projects/immigration-case-management-system'
WHERE slug = 'immigration-case-management-system';

UPDATE public.projects SET
  meta_title = 'Enterprise Operations Dashboard | Business Intelligence',
  meta_description = 'Real-time operations dashboard providing actionable insights for enterprise decision-making.',
  canonical_url = 'https://devmart.co/projects/enterprise-operations-dashboard'
WHERE slug = 'enterprise-operations-dashboard';

UPDATE public.projects SET
  meta_title = 'Housing Registration Platform | Government Services',
  meta_description = 'Digital platform for housing registration and subsidy management. Efficient, transparent, citizen-focused.',
  canonical_url = 'https://devmart.co/projects/housing-registration-subsidy-platform'
WHERE slug = 'housing-registration-subsidy-platform';

UPDATE public.projects SET
  meta_title = 'SaaS Management Platform | Analytics & Insights',
  meta_description = 'Centralized SaaS management and analytics platform for enterprise software portfolio optimization.',
  canonical_url = 'https://devmart.co/projects/saas-management-analytics-platform'
WHERE slug = 'saas-management-analytics-platform';