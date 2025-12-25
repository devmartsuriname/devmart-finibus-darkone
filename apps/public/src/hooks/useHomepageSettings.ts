/**
 * useHomepageSettings Hook
 * 
 * Fetches homepage configuration from homepage_settings table (single-row JSON).
 * Returns typed data with null-safe access.
 * Phase 7 — Homepage Dynamic Wiring
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Type definitions for homepage_settings.data structure
export interface HeroSlide {
  image: string;
  subtitle: string;
  title_prefix: string;
  title_highlight: string;
  description: string;
  cta1_label: string;
  cta1_url: string;
  cta2_label: string;
  cta2_url: string;
}

export interface StatItem {
  icon: string;
  value: number;
  label: string;
}

export interface PartnerItem {
  logo: string;
  url: string;
}

export interface SkillBar {
  label: string;
  percent: number;
  sublabel?: string;
}

export interface HomeAboutData {
  title: string;
  description: string;
  mission_title: string;
  mission_text: string;
  cta_label: string;
  cta_url: string;
  skills: SkillBar[];
}

export interface WhyChooseData {
  title: string;
  video_url: string;
  video_poster: string;
  skills: SkillBar[];
}

export interface CtaData {
  title_line1: string;
  title_line2: string;
  title_line3: string;
  cta_label: string;
  cta_url: string;
}

export interface HomepageData {
  hero?: { slides: HeroSlide[] };
  home_about?: HomeAboutData;
  stats?: StatItem[];
  partners?: PartnerItem[];
  why_choose?: WhyChooseData;
  cta?: CtaData;
}

interface UseHomepageSettingsResult {
  data: HomepageData | null;
  loading: boolean;
  error: string | null;
}

export function useHomepageSettings(): UseHomepageSettingsResult {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data: row, error: fetchError } = await supabase
          .from('homepage_settings')
          .select('data')
          .eq('id', 1)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        setData(row?.data || null);
      } catch (err) {
        console.error('Error fetching homepage settings:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch homepage settings');
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { data, loading, error };
}

export default useHomepageSettings;
