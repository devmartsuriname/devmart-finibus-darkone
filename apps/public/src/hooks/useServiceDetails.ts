/**
 * useServiceDetails Hook
 * 
 * Fetches a single service by slug with process steps and pricing plans.
 * Phase 5.3 - Service Details Page Integration
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Service, ServiceProcessStep, ServicePricingPlan, Media } from '../types/database';

interface ServiceWithIcon extends Service {
  icon: Media | null;
}

interface ProcessStepWithImage extends ServiceProcessStep {
  image: Media | null;
}

interface UseServiceDetailsResult {
  service: ServiceWithIcon | null;
  processSteps: ProcessStepWithImage[];
  pricingPlans: ServicePricingPlan[];
  allServices: ServiceWithIcon[];
  loading: boolean;
  error: string | null;
  notFound: boolean;
}

export function useServiceDetails(slug: string | undefined): UseServiceDetailsResult {
  const [service, setService] = useState<ServiceWithIcon | null>(null);
  const [processSteps, setProcessSteps] = useState<ProcessStepWithImage[]>([]);
  const [pricingPlans, setPricingPlans] = useState<ServicePricingPlan[]>([]);
  const [allServices, setAllServices] = useState<ServiceWithIcon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchServiceDetails() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setNotFound(false);

        // Fetch all published services for sidebar
        const { data: allServicesData, error: allServicesError } = await supabase
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
            show_pricing,
            pricing_monthly_enabled,
            pricing_yearly_enabled,
            icon:media!services_icon_media_id_fkey (
              id,
              public_url,
              alt_text,
              title
            )
          `)
          .eq('status', 'published')
          .order('display_order', { ascending: true });

        if (allServicesError) throw allServicesError;

        const transformedAllServices: ServiceWithIcon[] = (allServicesData || []).map((s: any) => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          short_description: s.short_description,
          full_description: s.full_description,
          icon_media_id: s.icon_media_id,
          display_order: s.display_order,
          status: s.status,
          show_pricing: s.show_pricing ?? true,
          pricing_monthly_enabled: s.pricing_monthly_enabled ?? true,
          pricing_yearly_enabled: s.pricing_yearly_enabled ?? true,
          icon: s.icon || null,
        }));

        setAllServices(transformedAllServices);

        // Fetch single service by slug
        const { data: serviceData, error: serviceError } = await supabase
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
            show_pricing,
            pricing_monthly_enabled,
            pricing_yearly_enabled,
            icon:media!services_icon_media_id_fkey (
              id,
              public_url,
              alt_text,
              title
            )
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (serviceError) {
          if (serviceError.code === 'PGRST116') {
            // No rows returned - service not found
            setNotFound(true);
            setLoading(false);
            return;
          }
          throw serviceError;
        }

        const transformedService: ServiceWithIcon = {
          id: serviceData.id,
          title: serviceData.title,
          slug: serviceData.slug,
          short_description: serviceData.short_description,
          full_description: serviceData.full_description,
          icon_media_id: serviceData.icon_media_id,
          display_order: serviceData.display_order,
          status: serviceData.status,
          show_pricing: (serviceData as any).show_pricing ?? true,
          pricing_monthly_enabled: (serviceData as any).pricing_monthly_enabled ?? true,
          pricing_yearly_enabled: (serviceData as any).pricing_yearly_enabled ?? true,
          icon: (serviceData as any).icon || null,
        };

        setService(transformedService);

        // Fetch process steps for this service
        const { data: stepsData, error: stepsError } = await supabase
          .from('service_process_steps')
          .select(`
            id,
            service_id,
            step_number,
            title,
            description,
            image_media_id,
            image:media!service_process_steps_image_media_id_fkey (
              id,
              public_url,
              alt_text,
              title
            )
          `)
          .eq('service_id', serviceData.id)
          .order('step_number', { ascending: true });

        if (stepsError) throw stepsError;

        const transformedSteps: ProcessStepWithImage[] = (stepsData || []).map((step: any) => ({
          id: step.id,
          service_id: step.service_id,
          step_number: step.step_number,
          title: step.title,
          description: step.description,
          image_media_id: step.image_media_id,
          image: step.image || null,
        }));

        setProcessSteps(transformedSteps);

        // Fetch pricing plans for this service
        const { data: plansData, error: plansError } = await supabase
          .from('service_pricing_plans')
          .select(`
            id,
            service_id,
            billing_period,
            plan_name,
            plan_subtitle,
            price_amount,
            currency,
            features,
            cta_label,
            display_order,
            status
          `)
          .eq('service_id', serviceData.id)
          .eq('status', 'published')
          .order('display_order', { ascending: true });

        if (plansError) throw plansError;

        const transformedPlans: ServicePricingPlan[] = (plansData || []).map((plan: any) => ({
          id: plan.id,
          service_id: plan.service_id,
          billing_period: plan.billing_period,
          plan_name: plan.plan_name,
          plan_subtitle: plan.plan_subtitle,
          price_amount: plan.price_amount,
          currency: plan.currency,
          features: Array.isArray(plan.features) ? plan.features : [],
          cta_label: plan.cta_label,
          display_order: plan.display_order,
          status: plan.status,
        }));

        setPricingPlans(transformedPlans);
      } catch (err) {
        console.error('Error fetching service details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch service details');
      } finally {
        setLoading(false);
      }
    }

    fetchServiceDetails();
  }, [slug]);

  return { service, processSteps, pricingPlans, allServices, loading, error, notFound };
}
