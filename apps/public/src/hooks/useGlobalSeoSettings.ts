/**
 * Global SEO Settings Hook
 * 
 * Purpose: Fetch global SEO fallback values from the settings table.
 * Used as Priority 3 fallback in SEO resolution hierarchy.
 * 
 * Phase 3: SEO Fallback Wiring Finalization
 * Status: Active
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Global SEO settings keys
const GLOBAL_SEO_KEYS = [
  'default_meta_title',
  'default_meta_description',
  'default_og_image_media_id',
] as const;

// Fallback values if DB fetch fails
const FALLBACK_SEO = {
  globalMetaTitle: 'Devmart',
  globalMetaDescription: 'Digital transformation and technology solutions.',
  globalOgImageUrl: null as string | null,
};

export interface GlobalSeoSettings {
  globalMetaTitle: string;
  globalMetaDescription: string;
  globalOgImageUrl: string | null;
}

interface UseGlobalSeoSettingsResult {
  settings: GlobalSeoSettings;
  isLoading: boolean;
  error: Error | null;
}

export function useGlobalSeoSettings(): UseGlobalSeoSettingsResult {
  const [settings, setSettings] = useState<GlobalSeoSettings>(FALLBACK_SEO);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchGlobalSeo() {
      try {
        const { data, error: fetchError } = await supabase
          .from('settings')
          .select('key, value')
          .in('key', GLOBAL_SEO_KEYS);

        if (fetchError) {
          throw fetchError;
        }

        let ogImageMediaId: string | null = null;
        const fetched: Partial<GlobalSeoSettings> = {};

        if (data && data.length > 0) {
          for (const row of data) {
            if (row.value && row.value.trim() !== '') {
              if (row.key === 'default_meta_title') {
                fetched.globalMetaTitle = row.value;
              } else if (row.key === 'default_meta_description') {
                fetched.globalMetaDescription = row.value;
              } else if (row.key === 'default_og_image_media_id') {
                ogImageMediaId = row.value;
              }
            }
          }
        }

        // Resolve OG image media ID to public URL
        if (ogImageMediaId) {
          const { data: mediaData, error: mediaError } = await supabase
            .from('media')
            .select('public_url')
            .eq('id', ogImageMediaId)
            .single();

          if (!mediaError && mediaData) {
            fetched.globalOgImageUrl = mediaData.public_url;
          }
        }

        setSettings({ ...FALLBACK_SEO, ...fetched });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch global SEO settings'));
        // Keep fallback settings on error
      } finally {
        setIsLoading(false);
      }
    }

    fetchGlobalSeo();
  }, []);

  return { settings, isLoading, error };
}
