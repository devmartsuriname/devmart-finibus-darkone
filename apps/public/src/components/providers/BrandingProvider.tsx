/**
 * BrandingProvider
 * 
 * Phase 11 — Root-Cause Fix: CSS Variable Injection with Gradient Support
 * 
 * Purpose: Injects branding colors as CSS custom properties on :root.
 * 
 * Variables exposed:
 * - --color-primary
 * - --color-secondary
 * - --color-accent
 * - --color-primary-grad-start
 * - --color-primary-grad-end
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
    root.style.setProperty('--color-primary-grad-start', colors.primaryGradientStart);
    root.style.setProperty('--color-primary-grad-end', colors.primaryGradientEnd);
  }, [colors]);

  return <>{children}</>;
}
