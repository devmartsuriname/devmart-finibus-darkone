-- Phase 7B: Marketing Events Table for First-Party Analytics

-- Create marketing_events table
CREATE TABLE public.marketing_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  source TEXT,
  reference_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for efficient querying
CREATE INDEX idx_marketing_events_created_at ON public.marketing_events (created_at DESC);
CREATE INDEX idx_marketing_events_event_type ON public.marketing_events (event_type);

-- Enable RLS
ALTER TABLE public.marketing_events ENABLE ROW LEVEL SECURITY;

-- Public can insert events (anonymous tracking)
CREATE POLICY "Public can insert events"
  ON public.marketing_events FOR INSERT
  WITH CHECK (true);

-- Admins can view all events
CREATE POLICY "Admins can view all events"
  ON public.marketing_events FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));