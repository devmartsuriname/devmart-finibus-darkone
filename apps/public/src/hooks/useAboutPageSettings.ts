/**
 * useAboutPageSettings Hook
 * 
 * Fetches About page configuration from page_settings table.
 * Returns typed data with null-safe access and fallbacks.
 * Phase 10C — About Page DB Wiring
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Type definitions for page_settings.data structure (about page)
export interface ProgressStat {
  label: string;
  percentage: number;
}

export interface InsideStoryData {
  enabled: boolean;
  section_label: string;
  title: string;
  description: string;
  main_image_url: string;
  cto_message: string;
  cto_name: string;
  cto_title: string;
  cto_signature_url: string;
  progress_stats: ProgressStat[];
}

export interface LatestNewsData {
  enabled: boolean;
  section_label: string;
  section_title: string;
  view_all_label: string;
  view_all_url: string;
  posts_count: number;
}

export interface AboutPageData {
  inside_story?: InsideStoryData;
  latest_news?: LatestNewsData;
}

// Static fallbacks (current hardcoded values)
export const STATIC_INSIDE_STORY: InsideStoryData = {
  enabled: true,
  section_label: 'Inside Story',
  title: 'We are creative Agency that creates beautiful.',
  description: 'Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Classe aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptosi himenaeos. Praesent nec neque at dolor venenatis consectetur eu quis e Donec lacinia placerat felis non aliquam.Integer purus odio.',
  main_image_url: '/images/story.png',
  cto_message: 'Integer purus odio, placerat neclessi rhoncus in, ullamcorper nec dolor.ol aptent taciti sociosqu.',
  cto_name: 'Carlo Rabil.',
  cto_title: 'CTO & FOUNDER, Finibus',
  cto_signature_url: '/images/cto-signature.png',
  progress_stats: [
    { label: 'Idea & Research', percentage: 90 },
    { label: 'Wirfirm & Design', percentage: 95 },
    { label: 'Developing & Launch', percentage: 88 }
  ]
};

export const STATIC_LATEST_NEWS: LatestNewsData = {
  enabled: true,
  section_label: 'Blog',
  section_title: 'Latest news And Article modern design.',
  view_all_label: 'View All Blog',
  view_all_url: '/blog',
  posts_count: 2
};

interface UseAboutPageSettingsResult {
  data: AboutPageData | null;
  insideStory: InsideStoryData;
  latestNews: LatestNewsData;
  loading: boolean;
  error: string | null;
}

export function useAboutPageSettings(): UseAboutPageSettingsResult {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data: row, error: fetchError } = await supabase
          .from('page_settings')
          .select('data')
          .eq('page_slug', 'about')
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        setData(row?.data as AboutPageData || null);
      } catch (err) {
        console.error('Error fetching about page settings:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch about page settings');
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  // Merge DB data with static fallbacks
  const insideStory: InsideStoryData = {
    ...STATIC_INSIDE_STORY,
    ...(data?.inside_story || {})
  };

  const latestNews: LatestNewsData = {
    ...STATIC_LATEST_NEWS,
    ...(data?.latest_news || {})
  };

  return { data, insideStory, latestNews, loading, error };
}

export default useAboutPageSettings;
