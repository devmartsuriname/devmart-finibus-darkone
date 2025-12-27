/**
 * Branding Provider Component
 * 
 * Purpose: Root-level component that initializes branding CSS variables.
 * Wraps the public app to ensure CSS variables are injected before render.
 * 
 * Phase 11C-1 — Minimal Pilot (CSS Variable Injection Only)
 * 
 * Behavior:
 * - Fetches branding colors from Supabase on mount
 * - Injects CSS custom properties on :root
 * - Falls back to Finibus defaults if fetch fails
 * - Silent failure — no UI breakage on error
 */

import { ReactNode } from 'react';
import { useBrandingColors } from '../../hooks/useBrandingColors';

interface BrandingProviderProps {
  children: ReactNode;
}

export function BrandingProvider({ children }: BrandingProviderProps) {
  // Hook handles fetching and CSS injection
  // We don't need to use the returned values here,
  // the side effect (CSS injection) is what matters
  useBrandingColors();

  // Render children immediately — no loading state needed
  // CSS variables will update when fetch completes
  return <>{children}</>;
}
