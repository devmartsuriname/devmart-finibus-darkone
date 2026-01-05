/**
 * System Settings Hook
 * 
 * Purpose: Fetch system operational settings from Supabase.
 * Used for Coming Soon mode redirect, countdown, and feature toggles.
 * 
 * Phase 13D.3 — System Toggles Wiring
 * Phase 13D.4 — Maintenance Mode + Countdown Wiring
 * 
 * Settings Keys (seeded in Phase 13D.1 + 13D.4):
 * - maintenance_mode: Full site offline
 * - coming_soon_enabled: Redirect to /commingsoon
 * - coming_soon_message: Custom Coming Soon message
 * - coming_soon_countdown_enabled: Enable countdown timer
 * - coming_soon_countdown_target: Target datetime (ISO 8601)
 * - quotes_enabled: Quote Wizard availability
 * - contact_form_enabled: Contact Form availability
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// System settings keys (must match Phase 13D.1 + 13D.4 seeding)
const SYSTEM_SETTINGS_KEYS = [
  'maintenance_mode',
  'coming_soon_enabled',
  'coming_soon_message',
  'coming_soon_countdown_enabled',
  'coming_soon_countdown_target',
  'quotes_enabled',
  'contact_form_enabled',
] as const;

// Type-safe defaults (matching database seeding)
// All modes disabled by default, features enabled by default
const SYSTEM_SETTINGS_DEFAULTS: SystemSettings = {
  maintenance_mode: false,
  coming_soon_enabled: false,
  coming_soon_message: '',
  coming_soon_countdown_enabled: true,
  coming_soon_countdown_target: '',
  quotes_enabled: true,
  contact_form_enabled: true,
};

export interface SystemSettings {
  maintenance_mode: boolean;
  coming_soon_enabled: boolean;
  coming_soon_message: string;
  coming_soon_countdown_enabled: boolean;
  coming_soon_countdown_target: string;
  quotes_enabled: boolean;
  contact_form_enabled: boolean;
}

interface UseSystemSettingsResult {
  settings: SystemSettings;
  isLoading: boolean;
  error: Error | null;
}

export function useSystemSettings(): UseSystemSettingsResult {
  const [settings, setSettings] = useState<SystemSettings>(SYSTEM_SETTINGS_DEFAULTS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSystemSettings() {
      try {
        const { data, error: fetchError } = await supabase
          .from('settings')
          .select('key, value')
          .in('key', SYSTEM_SETTINGS_KEYS);

        if (fetchError) throw fetchError;

        const fetched: Partial<SystemSettings> = {};

        if (data && data.length > 0) {
          for (const row of data) {
            switch (row.key) {
              case 'maintenance_mode':
                // Parse string 'true'/'false' to boolean
                fetched.maintenance_mode = row.value === 'true';
                break;
              case 'coming_soon_enabled':
                fetched.coming_soon_enabled = row.value === 'true';
                break;
              case 'coming_soon_message':
                // String value, empty string fallback
                fetched.coming_soon_message = row.value || '';
                break;
              case 'coming_soon_countdown_enabled':
                // Default true, only false if explicitly 'false'
                fetched.coming_soon_countdown_enabled = row.value !== 'false';
                break;
              case 'coming_soon_countdown_target':
                // ISO 8601 datetime string
                fetched.coming_soon_countdown_target = row.value || '';
                break;
              case 'quotes_enabled':
                // Default true, only false if explicitly 'false'
                fetched.quotes_enabled = row.value !== 'false';
                break;
              case 'contact_form_enabled':
                // Default true, only false if explicitly 'false'
                fetched.contact_form_enabled = row.value !== 'false';
                break;
            }
          }
        }

        // Merge with defaults (ensures all fields have values)
        setSettings({ ...SYSTEM_SETTINGS_DEFAULTS, ...fetched });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch system settings'));
        // Keep defaults on error - site remains functional
      } finally {
        setIsLoading(false);
      }
    }

    fetchSystemSettings();
  }, []);

  return { settings, isLoading, error };
}

export { SYSTEM_SETTINGS_DEFAULTS };
