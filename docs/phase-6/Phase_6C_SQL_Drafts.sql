-- ================================================================
-- PHASE 6C: QUOTE WIZARD SCHEMA MIGRATION
-- STATUS: DRAFT ONLY — EXECUTION NOT AUTHORIZED
-- Prepared: 2025-12-31
-- ================================================================

-- ----------------------------------------------------------------
-- 1. CREATE TABLE: public.quotes
-- ----------------------------------------------------------------

CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT NOT NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  billing_period TEXT NOT NULL CHECK (billing_period IN ('monthly', 'yearly')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'converted', 'expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add unique constraint for reference_number
ALTER TABLE public.quotes 
  ADD CONSTRAINT quotes_reference_number_unique UNIQUE (reference_number);

-- Add comment
COMMENT ON TABLE public.quotes IS 'Quote requests submitted via the public Quote Wizard';

-- ----------------------------------------------------------------
-- 2. CREATE TABLE: public.quote_items
-- ----------------------------------------------------------------

CREATE TABLE public.quote_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  plan_id UUID REFERENCES public.service_pricing_plans(id) ON DELETE SET NULL,
  service_title TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  price_amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add comment
COMMENT ON TABLE public.quote_items IS 'Individual line items for each quote request';

-- ----------------------------------------------------------------
-- 3. EXTEND TABLE: public.leads (add quote_id FK)
-- ----------------------------------------------------------------

ALTER TABLE public.leads 
  ADD COLUMN quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL;

-- Add comment
COMMENT ON COLUMN public.leads.quote_id IS 'Optional link to quote request if lead came from Quote Wizard';

-- ----------------------------------------------------------------
-- 4. CREATE INDEXES
-- ----------------------------------------------------------------

-- Index for lead_id lookups on quotes
CREATE INDEX idx_quotes_lead_id 
  ON public.quotes(lead_id);

-- Compound index for admin listing (status + date sort)
CREATE INDEX idx_quotes_status_created 
  ON public.quotes(status, created_at DESC);

-- Index for quote_id lookups on quote_items
CREATE INDEX idx_quote_items_quote_id 
  ON public.quote_items(quote_id);

-- Index for quote_id lookups on leads
CREATE INDEX idx_leads_quote_id 
  ON public.leads(quote_id);

-- ----------------------------------------------------------------
-- 5. CREATE TRIGGER: updated_at auto-update for quotes
-- ----------------------------------------------------------------

-- Note: Assumes update_updated_at_column() function already exists
-- If not, uncomment below:
--
-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = now();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------
-- 6. ENABLE ROW LEVEL SECURITY
-- ----------------------------------------------------------------

ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- END OF MIGRATION DRAFT
-- STATUS: EXECUTION NOT AUTHORIZED
-- ================================================================
