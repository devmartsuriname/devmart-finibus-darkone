-- Phase 7A: Add UTM tracking fields to leads and quotes tables

-- Add UTM fields to leads table
ALTER TABLE public.leads 
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT;

-- Add UTM fields to quotes table  
ALTER TABLE public.quotes 
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT;

-- Add comments for documentation
COMMENT ON COLUMN public.leads.utm_source IS 'Traffic source (e.g., google, facebook)';
COMMENT ON COLUMN public.leads.utm_medium IS 'Marketing medium (e.g., cpc, social, email)';
COMMENT ON COLUMN public.leads.utm_campaign IS 'Campaign identifier';
COMMENT ON COLUMN public.leads.utm_content IS 'Ad variant identifier';
COMMENT ON COLUMN public.leads.utm_term IS 'Search keyword';

COMMENT ON COLUMN public.quotes.utm_source IS 'Traffic source (e.g., google, facebook)';
COMMENT ON COLUMN public.quotes.utm_medium IS 'Marketing medium (e.g., cpc, social, email)';
COMMENT ON COLUMN public.quotes.utm_campaign IS 'Campaign identifier';
COMMENT ON COLUMN public.quotes.utm_content IS 'Ad variant identifier';
COMMENT ON COLUMN public.quotes.utm_term IS 'Search keyword';