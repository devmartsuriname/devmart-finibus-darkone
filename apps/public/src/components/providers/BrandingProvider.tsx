/**
 * BrandingProvider
 * 
 * Phase 11 — Step 5: CSS Variable Injection
 * 
 * Purpose: Injects branding colors as CSS custom properties on :root.
 * This allows components to consume branding colors via CSS variables
 * without requiring any direct modifications.
 * 
 * Variables exposed:
 * - --color-primary
 * - --color-secondary
 * - --color-accent
 * 
 * Values are sourced from the settings table via useBrandingColors hook.
 * Finibus defaults are applied automatically when DB values are missing.
 */

import React, { useEffect } from 'react';
import { useBrandingColors } from '../../hooks/useBrandingColors';

interface BrandingProviderProps {
  children: React.ReactNode;
}

export function BrandingProvider({ children }: BrandingProviderProps) {
  const { colors } = useBrandingColors();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primaryColor);
    root.style.setProperty('--color-secondary', colors.secondaryColor);
    root.style.setProperty('--color-accent', colors.accentColor);
  }, [colors.primaryColor, colors.secondaryColor, colors.accentColor]);

  return <>{children}</>;
}
