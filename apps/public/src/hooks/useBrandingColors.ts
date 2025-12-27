/**
 * Branding Colors Hook
 * 
 * Purpose: Fetch branding colors from Supabase and inject CSS custom properties on :root.
 * Includes safe fallbacks to Finibus defaults if fetch fails.
 * 
 * Phase 11C-1 — Minimal Pilot (CSS Variable Injection Only)
 * 
 * Constraints:
 * - NO SCSS modifications
 * - NO gradient changes
 * - Fonts remain LOCKED
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Branding keys stored in settings table
const BRANDING_KEYS = [
  'primary_color',
  'secondary_color',
  'accent_color',
] as const;

// Finibus template defaults — used if DB fetch fails
const FALLBACK_COLORS: BrandingColors = {
  primary_color: '#D90A2C',
  secondary_color: '#17161A',
  accent_color: '#F7941D',
};

// CSS variable mapping
const CSS_VAR_MAP: Record<keyof BrandingColors, string> = {
  primary_color: '--theme-color',
  secondary_color: '--secondary-color',
  accent_color: '--accent-color',
};

export interface BrandingColors {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
}

interface UseBrandingColorsResult {
  colors: BrandingColors;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Injects CSS custom properties on :root element
 */
function injectCSSVariables(colors: BrandingColors): void {
  const root = document.documentElement;
  
  for (const [key, cssVar] of Object.entries(CSS_VAR_MAP)) {
    const colorValue = colors[key as keyof BrandingColors];
    if (colorValue) {
      root.style.setProperty(cssVar, colorValue);
    }
  }
}

/**
 * Validates that a string is a valid hex color
 */
function isValidHexColor(color: string): boolean {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(color);
}

export function useBrandingColors(): UseBrandingColorsResult {
  const [colors, setColors] = useState<BrandingColors>(FALLBACK_COLORS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBrandingColors() {
      try {
        const { data, error: fetchError } = await supabase
          .from('settings')
          .select('key, value')
          .in('key', BRANDING_KEYS);

        if (fetchError) {
          throw fetchError;
        }

        // Start with fallback colors
        const resolvedColors: BrandingColors = { ...FALLBACK_COLORS };

        if (data && data.length > 0) {
          for (const row of data) {
            const key = row.key as keyof BrandingColors;
            const value = row.value?.trim();
            
            // Only use valid hex colors
            if (value && isValidHexColor(value)) {
              resolvedColors[key] = value;
            }
          }
        }

        setColors(resolvedColors);
        injectCSSVariables(resolvedColors);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch branding colors'));
        // Inject fallback colors on error — no UI breakage
        injectCSSVariables(FALLBACK_COLORS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBrandingColors();
  }, []);

  return { colors, isLoading, error };
}

export { FALLBACK_COLORS };
