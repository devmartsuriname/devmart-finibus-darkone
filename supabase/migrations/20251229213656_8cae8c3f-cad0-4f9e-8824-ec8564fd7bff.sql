-- Phase 12.4: Update Pricing Plans - app-design (6 records)
-- Monthly plans
UPDATE service_pricing_plans SET 
  plan_name = 'UX Sprint', 
  plan_subtitle = 'Fast validation package', 
  price_amount = 699, 
  features = '["User flow + wireframes","1 key journey prototype","UI direction and layout rules","Copy structure guidance","Handoff notes for dev"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = 'f96ef8d7-9b97-4d2e-b651-1e6f9131dfd5';

UPDATE service_pricing_plans SET 
  plan_name = 'Product UI Kit', 
  plan_subtitle = 'Design system starter', 
  price_amount = 1299, 
  features = '["Component set definition","Core screens + states","Responsive layout rules","Interaction guidelines","Design QA checklist"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = 'fa5c1629-ef36-41ab-974e-4f5b4c109a62';

UPDATE service_pricing_plans SET 
  plan_name = 'Full Product Design', 
  plan_subtitle = 'End-to-end coverage', 
  price_amount = 2499, 
  features = '["UX + UI full workflow","Multi-screen prototype","Accessibility considerations","Design-dev alignment sessions","Iteration cycle included"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = '1ad19c7c-a8fd-4305-969c-076b49d08fb5';

-- Yearly plans
UPDATE service_pricing_plans SET 
  plan_name = 'UX Annual', 
  plan_subtitle = 'Continuous UX support', 
  price_amount = 6999, 
  features = '["Quarterly UX improvements","Ongoing screen expansion","Conversion journey tuning","Component library growth","Priority design QA support"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = '6e6a30bd-0d83-4477-9450-d4eb5b8a9c32';

UPDATE service_pricing_plans SET 
  plan_name = 'UI Kit Annual', 
  plan_subtitle = 'Maintain design quality', 
  price_amount = 12999, 
  features = '["Design system governance","New features UI coverage","Documentation upkeep","Release-by-release QA","Stakeholder review support"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = '3e1b7494-4476-4547-ba42-5267b2789e52';

UPDATE service_pricing_plans SET 
  plan_name = 'Product Annual', 
  plan_subtitle = 'Product design retained', 
  price_amount = 24999, 
  features = '["Roadmap-driven design","Multi-module UI evolution","UX research touchpoints","Accessibility refinement","Dedicated design cadence"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = '2382f5b8-5590-4b96-9c44-27e122857ec0';