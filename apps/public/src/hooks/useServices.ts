/**
 * useServices Hook
 * 
 * Fetches published services from Supabase with icon media.
 * Phase 5.2 - Services Page Integration
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Service, Media } from '../types/database';

interface ServiceWithIcon extends Service {
  icon: Media | null;
}

interface UseServicesResult {
  services: ServiceWithIcon[];
  loading: boolean;
  error: string | null;
}

export function useServices(): UseServicesResult {
  const [services, setServices] = useState<ServiceWithIcon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        setError(null);

        // Fetch published services with icon media
        const { data, error: fetchError } = await supabase
          .from('services')
          .select(`
            id,
            title,
            slug,
            short_description,
            full_description,
            icon_media_id,
            display_order,
            status,
            icon:media!services_icon_media_id_fkey (
              id,
              public_url,
              alt_text,
              title
            )
          `)
          .eq('status', 'published')
          .order('display_order', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        // Transform data to match expected shape
        const transformedServices: ServiceWithIcon[] = (data || []).map((service: any) => ({
          id: service.id,
          title: service.title,
          slug: service.slug,
          short_description: service.short_description,
          full_description: service.full_description,
          icon_media_id: service.icon_media_id,
          display_order: service.display_order,
          status: service.status,
          icon: service.icon || null,
        }));

        setServices(transformedServices);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}
