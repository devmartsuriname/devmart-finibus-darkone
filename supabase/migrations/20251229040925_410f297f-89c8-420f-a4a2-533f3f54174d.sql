-- Phase 12.1: Update Hero Slides with Devmart Strategic Positioning
UPDATE homepage_settings 
SET data = jsonb_set(
  data,
  '{hero,slides}',
  '[
    {
      "image": "/images/hero-slider-1.jpg",
      "subtitle": "Digital Agency",
      "title_prefix": "We Design, Build, and Operate",
      "title_highlight": "Critical Digital Systems",
      "description": "Devmart delivers mission-critical platforms for government and enterprise—secure, scalable, and built for long-term operation across Suriname and the Caribbean.",
      "cta1_label": "Request a Consultation",
      "cta1_url": "/contact",
      "cta2_label": "Explore Capabilities",
      "cta2_url": "/service"
    },
    {
      "image": "/images/hero-slider-2.png",
      "subtitle": "Government Solutions",
      "title_prefix": "Digital Infrastructure for",
      "title_highlight": "Public Services",
      "description": "From citizen portals to internal workflows and approvals, we modernize service delivery with robust architecture, integrations, and measurable operational impact.",
      "cta1_label": "Talk to Our Team",
      "cta1_url": "/contact",
      "cta2_label": "View Case Studies",
      "cta2_url": "/projects"
    },
    {
      "image": "/images/hero-slider-3.png",
      "subtitle": "Enterprise Systems",
      "title_prefix": "Enterprise Systems That",
      "title_highlight": "Scale with Governance",
      "description": "We build and integrate HRM, ERP, CRM, and secure data flows—engineered for reliability, compliance, and multi-stakeholder environments.",
      "cta1_label": "Start a Project",
      "cta1_url": "/contact",
      "cta2_label": "How We Work",
      "cta2_url": "/about"
    }
  ]'::jsonb
)
WHERE id = 1;

-- Phase 12.1: Update About / Intro Section
UPDATE homepage_settings 
SET data = jsonb_set(
  jsonb_set(
    data,
    '{home_about,title}',
    '"Your Digital Infrastructure Partner"'::jsonb
  ),
  '{home_about,description}',
  '"Devmart is a systems integrator for government and enterprise organizations. We design, build, and operate secure digital platforms—covering workflows, integrations, and long-term system stewardship in Suriname and the Caribbean."'::jsonb
)
WHERE id = 1;

-- Phase 12.1: Update Why Choose Us Section
UPDATE homepage_settings 
SET data = jsonb_set(
  jsonb_set(
    data,
    '{why_choose,title}',
    '"Why Institutions Choose Devmart"'::jsonb
  ),
  '{why_choose,skills}',
  '[
    {"label": "Mission-Critical Delivery", "percent": 95},
    {"label": "Secure Integrations", "percent": 90},
    {"label": "Scalable Architecture", "percent": 88},
    {"label": "Operational Stewardship", "percent": 92}
  ]'::jsonb
)
WHERE id = 1;

-- Phase 12.1: Update CTA Strip
UPDATE homepage_settings 
SET data = jsonb_set(
  data,
  '{cta}',
  '{
    "title_line1": "Ready to Build",
    "title_line2": "Critical Systems?",
    "title_line3": "Let''s Talk",
    "cta_label": "Get in Touch",
    "cta_url": "/contact"
  }'::jsonb
)
WHERE id = 1;