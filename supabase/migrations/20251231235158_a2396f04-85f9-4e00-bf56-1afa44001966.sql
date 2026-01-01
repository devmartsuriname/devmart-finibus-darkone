-- ================================================================
-- PHASE 6C: QUOTE WIZARD SCHEMA & RLS EXECUTION
-- Executed: 2025-12-31
-- ================================================================

-- ----------------------------------------------------------------
-- 1. CREATE QUOTES TABLE
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

ALTER TABLE public.quotes 
  ADD CONSTRAINT quotes_reference_number_unique UNIQUE (reference_number);

COMMENT ON TABLE public.quotes IS 'Quote requests submitted via the public Quote Wizard';

-- ----------------------------------------------------------------
-- 2. CREATE QUOTE_ITEMS TABLE
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

COMMENT ON TABLE public.quote_items IS 'Individual line items for each quote request';

-- ----------------------------------------------------------------
-- 3. EXTEND LEADS TABLE
-- ----------------------------------------------------------------
ALTER TABLE public.leads 
  ADD COLUMN quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL;

COMMENT ON COLUMN public.leads.quote_id IS 'Optional link to quote request if lead came from Quote Wizard';

-- ----------------------------------------------------------------
-- 4. CREATE INDEXES
-- ----------------------------------------------------------------
CREATE INDEX idx_quotes_lead_id ON public.quotes(lead_id);
CREATE INDEX idx_quotes_status_created ON public.quotes(status, created_at DESC);
CREATE INDEX idx_quote_items_quote_id ON public.quote_items(quote_id);
CREATE INDEX idx_leads_quote_id ON public.leads(quote_id);

-- ----------------------------------------------------------------
-- 5. CREATE TRIGGER FOR UPDATED_AT
-- ----------------------------------------------------------------
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------
-- 6. ENABLE ROW LEVEL SECURITY
-- ----------------------------------------------------------------
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------
-- 7. RLS POLICIES FOR QUOTES TABLE
-- ----------------------------------------------------------------

-- Public can submit quotes (wizard submission)
CREATE POLICY "Public can submit quotes"
ON public.quotes
FOR INSERT
WITH CHECK (true);

-- Admins can view all quotes
CREATE POLICY "Admins can view all quotes"
ON public.quotes
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Admins can update quote status
CREATE POLICY "Admins can update quotes"
ON public.quotes
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- ----------------------------------------------------------------
-- 8. RLS POLICIES FOR QUOTE_ITEMS TABLE
-- ----------------------------------------------------------------

-- Public can submit quote items
CREATE POLICY "Public can submit quote items"
ON public.quote_items
FOR INSERT
WITH CHECK (true);

-- Admins can view all quote items
CREATE POLICY "Admins can view all quote items"
ON public.quote_items
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- ================================================================
-- END OF PHASE 6C MIGRATION
-- ================================================================