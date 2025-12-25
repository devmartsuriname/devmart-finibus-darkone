/**
 * useTestimonials Hook
 * 
 * Fetches published testimonials from Supabase for homepage slider.
 * Phase 7 — Homepage Dynamic Wiring
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Media {
  id: string;
  public_url: string;
  alt_text: string | null;
}

export interface TestimonialWithMedia {
  id: string;
  author_name: string;
  author_title: string | null;
  company: string | null;
  quote: string;
  rating: number | null;
  avatar: Media | null;
  display_order: number | null;
}

interface UseTestimonialsResult {
  testimonials: TestimonialWithMedia[];
  loading: boolean;
  error: string | null;
}

export function useTestimonials(): UseTestimonialsResult {
  const [testimonials, setTestimonials] = useState<TestimonialWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error: fetchError } = await supabase
          .from('testimonials')
          .select(`
            id,
            author_name,
            author_title,
            company,
            quote,
            rating,
            display_order,
            avatar:media!testimonials_avatar_media_id_fkey(id, public_url, alt_text)
          `)
          .eq('status', 'published')
          .order('display_order', { ascending: true, nullsFirst: false });

        if (fetchError) throw fetchError;

        const transformed: TestimonialWithMedia[] = (data || []).map((t: any) => ({
          id: t.id,
          author_name: t.author_name,
          author_title: t.author_title,
          company: t.company,
          quote: t.quote,
          rating: t.rating,
          display_order: t.display_order,
          avatar: t.avatar || null,
        }));

        setTestimonials(transformed);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}

export default useTestimonials;
