/**
 * useServicePricingPlans Hook
 * 
 * Phase 6D-3: Fetches published pricing plans for a specific service
 * filtered by billing period.
 * 
 * Uses existing service_pricing_plans table with RLS policies.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { ServicePricingPlan } from '../types/database';

interface UseServicePricingPlansResult {
  plans: ServicePricingPlan[];
  loading: boolean;
  error: string | null;
}

/**
 * Fetch pricing plans for a service by billing period
 */
export function useServicePricingPlans(
  serviceId: string | null,
  billingPeriod: 'monthly' | 'yearly'
): UseServicePricingPlansResult {
  const [plans, setPlans] = useState<ServicePricingPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip if no service ID
    if (!serviceId) {
      setPlans([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchPlans = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: queryError } = await supabase
          .from('service_pricing_plans')
          .select('*')
          .eq('service_id', serviceId)
          .eq('billing_period', billingPeriod)
          .eq('status', 'published')
          .order('display_order', { ascending: true });

        if (queryError) {
          throw queryError;
        }

        // Transform features from Json to string[]
        const transformedPlans: ServicePricingPlan[] = (data || []).map(plan => ({
          ...plan,
          features: Array.isArray(plan.features) 
            ? plan.features as string[]
            : []
        }));

        setPlans(transformedPlans);
      } catch (err) {
        console.error('Error fetching pricing plans:', err);
        setError('Unable to load pricing plans.');
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [serviceId, billingPeriod]);

  return { plans, loading, error };
}

export default useServicePricingPlans;
