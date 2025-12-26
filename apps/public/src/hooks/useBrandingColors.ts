/**
 * Branding Colors Hook
 * 
 * Purpose: Fetch branding color settings from Supabase for public frontend consumption.
 * Returns primary, secondary, and accent colors with Finibus defaults as fallbacks.
 * 
 * Phase 11 — Step 4: Public Branding Hook
 * 
 * Note: CSS variable injection is handled separately in Step 5.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Branding settings keys
const BRANDING_KEYS = [
  'primary_color',
  'secondary_color',
  'accent_color',
] as const;

// Finibus default colors — used if DB values are missing/invalid
const FALLBACK_COLORS = {
  primaryColor: '#D90A2C',   // Finibus theme-color (red)
  secondaryColor: '#17161A', // Finibus black
  accentColor: '#F7941D',    // Finibus accent (orange)
} as const;

export interface BrandingColors {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface UseBrandingColorsResult {
  colors: BrandingColors;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Validates a hex color string.
 * Must be in format #RRGGBB (case-insensitive).
 * Returns true if valid, false otherwise.
 */
function isValidHexColor(value: string | null | undefined): boolean {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  // Match #RRGGBB format (6 hex digits after #)
  return /^#[0-9A-Fa-f]{6}$/.test(trimmed);
}

/**
 * Hook to fetch branding colors from the settings table.
 * Always returns stable fallback values if DB fetch fails or values are invalid.
 */
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

        if (data && data.length > 0) {
          // Map DB keys to hook output keys
          const keyMap: Record<string, keyof BrandingColors> = {
            'primary_color': 'primaryColor',
            'secondary_color': 'secondaryColor',
            'accent_color': 'accentColor',
          };

          // Build colors object with validation
          const fetched: Partial<BrandingColors> = {};
          for (const row of data) {
            const outputKey = keyMap[row.key];
            if (outputKey && isValidHexColor(row.value)) {
              fetched[outputKey] = row.value.trim();
            }
          }

          // Merge with fallbacks (fallbacks used for any missing/invalid values)
          setColors({ ...FALLBACK_COLORS, ...fetched });
        }
        // If no data, keep fallback colors
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch branding colors'));
        // Keep fallback colors on error — no UI breakage
      } finally {
        setIsLoading(false);
      }
    }

    fetchBrandingColors();
  }, []);

  return { colors, isLoading, error };
}

export { FALLBACK_COLORS };
