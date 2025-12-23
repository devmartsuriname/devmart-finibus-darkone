/**
 * Supabase Client for Public App
 * 
 * Purpose: Read-only access to published content
 * Exception: Contact form → leads INSERT
 * 
 * Phase 5.1 - Public → DB Integration
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hwrlkrrdqbtgyjpsrijh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cmxrcnJkcWJ0Z3lqcHNyaWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTk5MTksImV4cCI6MjA4MTkzNTkxOX0.rFJuSDhgzTykdeA5qKfRrdmNE8VYgp4sQCzuESsp3LI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
