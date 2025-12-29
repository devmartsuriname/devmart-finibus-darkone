-- Phase 12.4: Update Pricing Plans - web-design (6 records)
-- Monthly plans
UPDATE service_pricing_plans SET 
  plan_name = 'Starter Platform', 
  plan_subtitle = 'For a focused MVP build', 
  price_amount = 799, 
  features = '["MVP scope + delivery plan","Responsive UI implementation","Basic SEO and metadata setup","Performance baseline checks","Handover + launch support"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = '442685b7-c01f-41bf-a865-6a3ea226a3a6';

UPDATE service_pricing_plans SET 
  plan_name = 'Growth Platform', 
  plan_subtitle = 'For production operations', 
  price_amount = 1499, 
  features = '["Scalable architecture setup","CMS integration-ready pages","Forms + validation workflows","Analytics-ready event planning","QA + release checklist"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = '0f500276-9ae0-4b10-ab67-6f318a7c3bad';

UPDATE service_pricing_plans SET 
  plan_name = 'Enterprise Platform', 
  plan_subtitle = 'For high-stakes systems', 
  price_amount = 2999, 
  features = '["Security hardening baseline","Integration mapping (APIs)","Accessibility + compliance pass","Performance optimization pass","Priority support window"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = '61f2e80e-8e7e-4b7f-a4ba-630490ef720b';

-- Yearly plans
UPDATE service_pricing_plans SET 
  plan_name = 'Starter Annual', 
  plan_subtitle = 'MVP + support retained', 
  price_amount = 7999, 
  features = '["Roadmap + quarterly planning","Ongoing fixes and tuning","SEO + content iteration support","Availability monitoring setup","Release governance support"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = 'c1701515-2fe3-46bd-88db-f63d4a44cfe4';

UPDATE service_pricing_plans SET 
  plan_name = 'Growth Annual', 
  plan_subtitle = 'Scale with governance', 
  price_amount = 14999, 
  features = '["Continuous improvement cycle","Integration expansion support","Performance review quarterly","Security review checkpoints","Priority support channel"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = '9c7d32ab-e78d-4748-b666-230484d7c2a3';

UPDATE service_pricing_plans SET 
  plan_name = 'Enterprise Annual', 
  plan_subtitle = 'Mission-critical coverage', 
  price_amount = 29999, 
  features = '["Operational stewardship model","Incident response readiness","Hardened release workflow","Audit-ready documentation","Dedicated support cadence"]'::jsonb,
  cta_label = 'Get a Quote'
WHERE id = 'fd1c910c-de93-4783-9c89-a55445b7c866';