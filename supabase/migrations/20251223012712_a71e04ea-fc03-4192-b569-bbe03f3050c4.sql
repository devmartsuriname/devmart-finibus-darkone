-- ============================================
-- Phase 4 CRM/Leads Module — Leads Table
-- ============================================

-- Create leads table
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT,
    source TEXT NOT NULL DEFAULT 'contact_form',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX leads_status_idx ON public.leads(status);
CREATE INDEX leads_created_at_idx ON public.leads(created_at DESC);
CREATE INDEX leads_source_idx ON public.leads(source);

-- Add updated_at trigger (reuse existing function)
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies
-- ============================================

-- PUBLIC: Can submit leads (contact form submissions)
-- This is the ONLY public access
CREATE POLICY "Public can submit leads"
    ON public.leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- ADMIN: Can view all leads
CREATE POLICY "Admins can view all leads"
    ON public.leads
    FOR SELECT
    TO authenticated
    USING (has_role(auth.uid(), 'admin'::app_role));

-- ADMIN: Can update leads (status and notes only)
CREATE POLICY "Admins can update leads"
    ON public.leads
    FOR UPDATE
    TO authenticated
    USING (has_role(auth.uid(), 'admin'::app_role));

-- NOTE: The following policies are INTENTIONALLY NOT CREATED:
-- - Public SELECT (leads are private)
-- - Public UPDATE (leads are private)
-- - Public DELETE (leads are private)
-- - Admin INSERT (leads come from public forms only)
-- - Admin DELETE (MVP restriction per Phase_4_Module_Leads.md)