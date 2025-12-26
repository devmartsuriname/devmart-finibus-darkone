-- Phase 10B: Add pricing visibility controls to services table
-- These columns allow admin to control pricing section visibility per service

-- Master toggle: Show/hide pricing section entirely on Service Detail page
ALTER TABLE public.services
ADD COLUMN show_pricing BOOLEAN NOT NULL DEFAULT true;

-- Enable/disable Monthly billing period tab
ALTER TABLE public.services
ADD COLUMN pricing_monthly_enabled BOOLEAN NOT NULL DEFAULT true;

-- Enable/disable Yearly billing period tab  
ALTER TABLE public.services
ADD COLUMN pricing_yearly_enabled BOOLEAN NOT NULL DEFAULT true;

-- Add comments for documentation
COMMENT ON COLUMN public.services.show_pricing IS 'Master toggle: show/hide pricing section on Service Detail page';
COMMENT ON COLUMN public.services.pricing_monthly_enabled IS 'Enable/disable Monthly tab in pricing section';
COMMENT ON COLUMN public.services.pricing_yearly_enabled IS 'Enable/disable Yearly tab in pricing section';