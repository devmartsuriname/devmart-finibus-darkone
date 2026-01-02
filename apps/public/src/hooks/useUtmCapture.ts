/**
 * UTM Capture Hook
 * 
 * Phase 7A: Marketing Data Foundations
 * 
 * Captures UTM parameters from URL and persists in sessionStorage.
 * Provides getUtmData() for form submissions.
 */

const UTM_STORAGE_KEY = 'devmart_utm_data';

const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export interface UtmData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
}

/**
 * Captures UTM parameters from current URL and stores in sessionStorage.
 * Call this on app initialization or route changes.
 */
export function captureUtmParams(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  
  // Check if any UTM params exist in URL
  const hasUtmInUrl = UTM_PARAMS.some(param => params.has(param));
  
  if (!hasUtmInUrl) return;

  // Capture UTM data from URL
  const utmData: UtmData = {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
  };

  // Store in sessionStorage (persists across navigation, cleared on tab close)
  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
  } catch (e) {
    // Ignore storage errors (private browsing, etc.)
    console.warn('UTM capture: sessionStorage not available');
  }
}

/**
 * Retrieves stored UTM data for form submissions.
 * Returns null values if no UTM data captured.
 */
export function getUtmData(): UtmData {
  const emptyUtm: UtmData = {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
  };

  if (typeof window === 'undefined') return emptyUtm;

  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return emptyUtm;
    
    const parsed = JSON.parse(stored) as Partial<UtmData>;
    return {
      utm_source: parsed.utm_source || null,
      utm_medium: parsed.utm_medium || null,
      utm_campaign: parsed.utm_campaign || null,
      utm_content: parsed.utm_content || null,
      utm_term: parsed.utm_term || null,
    };
  } catch (e) {
    return emptyUtm;
  }
}

/**
 * Clears stored UTM data (optional, for testing)
 */
export function clearUtmData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(UTM_STORAGE_KEY);
  } catch (e) {
    // Ignore
  }
}
