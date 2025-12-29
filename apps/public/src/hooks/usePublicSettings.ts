/**
 * Public Settings Hook
 * 
 * Purpose: Fetch whitelisted contact settings from Supabase for public display.
 * Includes safe fallbacks if fetch fails or keys are missing.
 * 
 * Phase 6.1 — Contact/Footer Settings Wiring
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Whitelisted settings keys for public display
const PUBLIC_SETTINGS_KEYS = [
  'contact_email',
  'contact_phone',
  'contact_address',
  'site_name',
  'facebook_url',
  'instagram_url',
  'linkedin_url',
  'youtube_url',
  'google_maps_embed_url',
] as const;

// Fallback values (Finibus defaults) — used if DB fetch fails
const FALLBACK_SETTINGS: PublicSettings = {
  contact_email: 'info@example.com',
  contact_phone: '+880 566 1111 985',
  contact_address: '168/170, Avenue 01, Mirpur DOHS, Bangladesh',
  site_name: 'Devmart',
  facebook_url: 'https://www.facebook.com/',
  instagram_url: 'https://www.instagram.com/',
  linkedin_url: 'https://www.linkedin.com/',
  youtube_url: 'https://www.youtube.com/',
  google_maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3701967527613!2d90.39056151540181!3d23.734174695311943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c1f25e613d%3A0xaad562eec578f8ff!2sArts%20Faculty%2C%20Dhaka%201205!5e0!3m2!1sen!2sbd!4v1644381552436!5m2!1sen!2sbd',
};

export interface PublicSettings {
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  site_name: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  google_maps_embed_url: string;
}

interface UsePublicSettingsResult {
  settings: PublicSettings;
  isLoading: boolean;
  error: Error | null;
}

export function usePublicSettings(): UsePublicSettingsResult {
  const [settings, setSettings] = useState<PublicSettings>(FALLBACK_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error: fetchError } = await supabase
          .from('settings')
          .select('key, value')
          .in('key', PUBLIC_SETTINGS_KEYS);

        if (fetchError) {
          throw fetchError;
        }

        if (data && data.length > 0) {
          // Merge fetched values with fallbacks
          const fetched: Partial<PublicSettings> = {};
          for (const row of data) {
            if (row.value && row.value.trim() !== '') {
              fetched[row.key as keyof PublicSettings] = row.value;
            }
          }
          setSettings({ ...FALLBACK_SETTINGS, ...fetched });
        }
        // If no data, keep fallback settings
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch settings'));
        // Keep fallback settings on error — no UI breakage
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, isLoading, error };
}

export { FALLBACK_SETTINGS };
