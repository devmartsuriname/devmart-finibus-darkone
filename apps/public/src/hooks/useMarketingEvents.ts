/**
 * Marketing Events Tracking Hook
 * 
 * Phase 7B: First-party event tracking for internal marketing analytics.
 * Events are stored in the marketing_events table in Supabase.
 * 
 * Design principles:
 * - Fire-and-forget: tracking should never block UX
 * - Silent failure: errors are logged but never break user flow
 * - Minimal data: only essential metadata to avoid bloat
 */

import { supabase } from '../lib/supabase';

export type EventType = 
  | 'quote_started'
  | 'quote_step_completed'
  | 'quote_submitted'
  | 'contact_form_submitted'
  | 'service_pricing_cta_clicked';

interface TrackEventOptions {
  eventType: EventType;
  source?: string;
  referenceId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Track a marketing event (fire-and-forget)
 * 
 * @param options - Event tracking options
 * @returns void (async but no await needed)
 */
export const trackEvent = async ({
  eventType,
  source,
  referenceId,
  metadata = {},
}: TrackEventOptions): Promise<void> => {
  try {
    await supabase.from('marketing_events').insert({
      event_type: eventType,
      source: source ?? null,
      reference_id: referenceId ?? null,
      metadata,
    });
  } catch (error) {
    // Fail silently - tracking should never break UX
    console.warn('Event tracking failed:', error);
  }
};
