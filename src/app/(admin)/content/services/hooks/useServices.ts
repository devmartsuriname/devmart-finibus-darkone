import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { notifySuccess, notifyError } from '@/lib/notify'

export interface Service {
  id: string
  title: string
  slug: string
  short_description: string
  full_description: string | null
  icon_media_id: string | null
  display_order: number
  status: 'draft' | 'published'
  // Phase 10B: Pricing visibility controls
  show_pricing: boolean
  pricing_monthly_enabled: boolean
  pricing_yearly_enabled: boolean
  created_at: string
  updated_at: string
  // Joined data
  icon_url?: string | null
}

export interface ServiceProcessStep {
  id: string
  service_id: string
  step_number: number
  title: string
  description: string
  image_media_id: string | null
  created_at: string
  updated_at: string
  image_url?: string | null
}

export interface ServicePricingPlan {
  id: string
  service_id: string
  billing_period: 'monthly' | 'yearly'
  plan_name: string
  plan_subtitle: string | null
  price_amount: number
  currency: string
  features: string[]
  cta_label: string
  display_order: number
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export interface ServiceInput {
  title: string
  slug: string
  short_description: string
  full_description?: string | null
  icon_media_id?: string | null
  display_order: number
  status: 'draft' | 'published'
  // Phase 10B: Pricing visibility controls
  show_pricing?: boolean
  pricing_monthly_enabled?: boolean
  pricing_yearly_enabled?: boolean
}

export interface ProcessStepInput {
  step_number: number
  title: string
  description: string
  image_media_id?: string | null
}

export interface PricingPlanInput {
  billing_period: 'monthly' | 'yearly'
  plan_name: string
  plan_subtitle?: string | null
  price_amount: number
  currency?: string
  features: string[]
  cta_label?: string
  display_order: number
  status: 'draft' | 'published'
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('services')
        .select(`
          *,
          icon:icon_media_id (public_url)
        `)
        .order('display_order', { ascending: true })

      if (fetchError) throw fetchError

      const transformedData: Service[] = (data || []).map((service: any) => ({
        ...service,
        icon_url: service.icon?.public_url || null,
        icon: undefined,
      }))

      setServices(transformedData)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch services'
      setError(message)
      console.error('Error fetching services:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const createService = useCallback(async (input: ServiceInput): Promise<{ success: boolean; id?: string }> => {
    try {
      const { data: existing } = await supabase
        .from('services')
        .select('id')
        .eq('slug', input.slug)
        .maybeSingle()

      if (existing) {
        notifyError('A service with this slug already exists')
        return { success: false }
      }

      const { data: inserted, error: insertError } = await supabase
        .from('services')
        .insert({
          title: input.title,
          slug: input.slug,
          short_description: input.short_description,
          full_description: input.full_description || null,
          icon_media_id: input.icon_media_id || null,
          display_order: input.display_order,
          status: input.status,
          show_pricing: input.show_pricing ?? true,
          pricing_monthly_enabled: input.pricing_monthly_enabled ?? true,
          pricing_yearly_enabled: input.pricing_yearly_enabled ?? true,
        })
        .select('id')
        .single()

      if (insertError) throw insertError

      notifySuccess('Service created successfully')
      await fetchServices()
      return { success: true, id: inserted.id }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create service'
      notifyError(`Error creating service: ${message}`)
      console.error('Error creating service:', err)
      return { success: false }
    }
  }, [fetchServices])

  const updateService = useCallback(async (id: string, input: Partial<ServiceInput>): Promise<boolean> => {
    try {
      if (input.slug) {
        const { data: existing } = await supabase
          .from('services')
          .select('id')
          .eq('slug', input.slug)
          .neq('id', id)
          .maybeSingle()

        if (existing) {
          notifyError('A service with this slug already exists')
          return false
        }
      }

      const updateData: Record<string, any> = {}
      if (input.title !== undefined) updateData.title = input.title
      if (input.slug !== undefined) updateData.slug = input.slug
      if (input.short_description !== undefined) updateData.short_description = input.short_description
      if (input.full_description !== undefined) updateData.full_description = input.full_description || null
      if (input.icon_media_id !== undefined) updateData.icon_media_id = input.icon_media_id || null
      if (input.display_order !== undefined) updateData.display_order = input.display_order
      if (input.status !== undefined) updateData.status = input.status
      if (input.show_pricing !== undefined) updateData.show_pricing = input.show_pricing
      if (input.pricing_monthly_enabled !== undefined) updateData.pricing_monthly_enabled = input.pricing_monthly_enabled
      if (input.pricing_yearly_enabled !== undefined) updateData.pricing_yearly_enabled = input.pricing_yearly_enabled

      const { error: updateError } = await supabase
        .from('services')
        .update(updateData)
        .eq('id', id)

      if (updateError) throw updateError

      notifySuccess('Service updated successfully')
      await fetchServices()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update service'
      notifyError(`Error updating service: ${message}`)
      console.error('Error updating service:', err)
      return false
    }
  }, [fetchServices])

  const deleteService = useCallback(async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      notifySuccess('Service deleted successfully')
      await fetchServices()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete service'
      notifyError(`Error deleting service: ${message}`)
      console.error('Error deleting service:', err)
      return false
    }
  }, [fetchServices])

  // Process Steps
  const fetchProcessSteps = useCallback(async (serviceId: string): Promise<ServiceProcessStep[]> => {
    try {
      const { data, error } = await supabase
        .from('service_process_steps')
        .select(`
          *,
          image:image_media_id (public_url)
        `)
        .eq('service_id', serviceId)
        .order('step_number', { ascending: true })

      if (error) throw error

      return (data || []).map((step: any) => ({
        ...step,
        image_url: step.image?.public_url || null,
        image: undefined,
      }))
    } catch (err) {
      console.error('Error fetching process steps:', err)
      return []
    }
  }, [])

  const saveProcessSteps = useCallback(async (serviceId: string, steps: ProcessStepInput[]): Promise<boolean> => {
    try {
      // Delete existing steps
      await supabase
        .from('service_process_steps')
        .delete()
        .eq('service_id', serviceId)

      // Insert new steps
      if (steps.length > 0) {
        const { error } = await supabase
          .from('service_process_steps')
          .insert(steps.map(step => ({
            service_id: serviceId,
            step_number: step.step_number,
            title: step.title,
            description: step.description,
            image_media_id: step.image_media_id || null,
          })))

        if (error) throw error
      }

      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save process steps'
      notifyError(`Error saving process steps: ${message}`)
      console.error('Error saving process steps:', err)
      return false
    }
  }, [])

  // Pricing Plans
  const fetchPricingPlans = useCallback(async (serviceId: string): Promise<ServicePricingPlan[]> => {
    try {
      const { data, error } = await supabase
        .from('service_pricing_plans')
        .select('*')
        .eq('service_id', serviceId)
        .order('billing_period', { ascending: true })
        .order('display_order', { ascending: true })

      if (error) throw error

      return (data || []).map((plan: any) => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : [],
      }))
    } catch (err) {
      console.error('Error fetching pricing plans:', err)
      return []
    }
  }, [])

  const savePricingPlans = useCallback(async (serviceId: string, plans: PricingPlanInput[]): Promise<boolean> => {
    try {
      // Delete existing plans
      await supabase
        .from('service_pricing_plans')
        .delete()
        .eq('service_id', serviceId)

      // Insert new plans
      if (plans.length > 0) {
        const { error } = await supabase
          .from('service_pricing_plans')
          .insert(plans.map(plan => ({
            service_id: serviceId,
            billing_period: plan.billing_period,
            plan_name: plan.plan_name,
            plan_subtitle: plan.plan_subtitle || null,
            price_amount: plan.price_amount,
            currency: plan.currency || 'USD',
            features: plan.features,
            cta_label: plan.cta_label || 'Get Started',
            display_order: plan.display_order,
            status: plan.status,
          })))

        if (error) throw error
      }

      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save pricing plans'
      notifyError(`Error saving pricing plans: ${message}`)
      console.error('Error saving pricing plans:', err)
      return false
    }
  }, [])

  return {
    services,
    isLoading,
    error,
    createService,
    updateService,
    deleteService,
    fetchProcessSteps,
    saveProcessSteps,
    fetchPricingPlans,
    savePricingPlans,
    refetch: fetchServices,
  }
}

// Utility: Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Utility: Validate slug format
export const isValidSlug = (slug: string): boolean => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}