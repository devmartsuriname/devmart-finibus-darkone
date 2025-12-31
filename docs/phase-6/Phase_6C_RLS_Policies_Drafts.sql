-- ================================================================
-- PHASE 6C: RLS POLICIES FOR QUOTE WIZARD TABLES
-- STATUS: DRAFT ONLY — EXECUTION NOT AUTHORIZED
-- Prepared: 2025-12-31
-- ================================================================

-- ----------------------------------------------------------------
-- QUOTES TABLE POLICIES
-- ----------------------------------------------------------------

-- Policy: Public can insert quotes (wizard submission)
-- Anyone can submit a quote request without authentication
CREATE POLICY "Public can submit quotes"
ON public.quotes
FOR INSERT
WITH CHECK (true);

-- Policy: Admins can view all quotes
-- Uses existing has_role() security definer function
CREATE POLICY "Admins can view all quotes"
ON public.quotes
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Policy: Admins can update quote status
-- Allows status transitions and notes
CREATE POLICY "Admins can update quotes"
ON public.quotes
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- NOTE: No DELETE policy
-- Quotes are immutable for audit trail purposes
-- Expired quotes can be marked with status='expired' instead

-- ----------------------------------------------------------------
-- QUOTE_ITEMS TABLE POLICIES
-- ----------------------------------------------------------------

-- Policy: Public can insert quote items (wizard submission)
-- Items are inserted together with the quote
CREATE POLICY "Public can submit quote items"
ON public.quote_items
FOR INSERT
WITH CHECK (true);

-- Policy: Admins can view all quote items
CREATE POLICY "Admins can view all quote items"
ON public.quote_items
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- NOTE: No UPDATE or DELETE policies
-- Quote items are immutable once submitted
-- This preserves the original quote pricing snapshot

-- ================================================================
-- SECURITY NOTES
-- ================================================================
--
-- 1. Public INSERT is intentional:
--    Quote submissions work like contact forms (anonymous)
--    Lead capture happens in same transaction
--
-- 2. No public SELECT:
--    Users cannot view other quotes
--    No read access without admin role
--
-- 3. Immutability:
--    Quotes/items cannot be deleted to maintain audit trail
--    Status changes are the only allowed modification
--
-- 4. Rate limiting:
--    Consider adding application-level rate limiting
--    Not enforced at database level
--
-- ================================================================
-- END OF RLS POLICY DRAFT
-- STATUS: EXECUTION NOT AUTHORIZED
-- ================================================================
