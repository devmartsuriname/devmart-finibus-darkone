-- Phase 14A: Add content column to pages table
-- Safe, forward-only migration
-- Execution authorized: 2026-01-05

ALTER TABLE public.pages
ADD COLUMN content TEXT;

COMMENT ON COLUMN public.pages.content 
IS 'HTML content body for static pages (legal pages, etc.)';