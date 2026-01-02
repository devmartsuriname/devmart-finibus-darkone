/**
 * Admin Marketing Events Hook
 * 
 * Phase 7B: Fetch marketing events for admin read-only display.
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MarketingEvent {
  id: string;
  event_type: string;
  source: string | null;
  reference_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export const useMarketingEvents = (limit: number = 500) => {
  const [events, setEvents] = useState<MarketingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('marketing_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (fetchError) {
      setError(fetchError.message);
      setEvents([]);
    } else {
      // Cast the data to handle JSONB metadata field
      const typedEvents = (data || []).map((event) => ({
        ...event,
        metadata: (event.metadata as Record<string, unknown>) || {},
      }));
      setEvents(typedEvents);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [limit]);

  return { events, isLoading, error, refetch: fetchEvents };
};
