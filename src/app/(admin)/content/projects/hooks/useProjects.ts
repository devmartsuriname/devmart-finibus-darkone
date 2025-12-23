/**
 * useProjects Hook
 * 
 * Phase 5.4+ Hotfix: Extended with new fields + process steps CRUD
 */

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'react-toastify'

export interface Project {
  id: string
  title: string
  heading: string
  slug: string
  description: string | null
  image_media_id: string | null
  featured_image_media_id: string | null
  category: string
  is_featured: boolean
  display_order: number | null
  status: 'draft' | 'published' | 'archived'
  client: string | null
  // New fields (Phase 5.4+)
  website: string | null
  start_date: string | null
  end_date: string | null
  check_launch_content: string | null
  check_launch_image_media_id: string | null
  created_at: string
  updated_at: string
  // Joined data
  image_url?: string | null
  featured_image_url?: string | null
  check_launch_image_url?: string | null
}

export interface ProjectInput {
  title: string
  heading: string
  slug: string
  description?: string | null
  image_media_id?: string | null
  featured_image_media_id?: string | null
  category: string
  is_featured?: boolean
  display_order?: number | null
  status: 'draft' | 'published' | 'archived'
  client?: string | null
  // New fields (Phase 5.4+)
  website?: string | null
  start_date?: string | null
  end_date?: string | null
  check_launch_content?: string | null
  check_launch_image_media_id?: string | null
}

export interface ProjectProcessStep {
  id: string
  project_id: string
  step_number: number
  title: string
  description: string | null
  image_media_id: string | null
  created_at: string
  updated_at: string
  // Joined
  image_url?: string | null
}

export interface ProjectProcessStepInput {
  step_number: number
  title: string
  description: string
  image_media_id: string | null
}

export const PROJECT_CATEGORIES = [
  'UI/UX',
  'Web Design',
  'Developing',
  'Graphic Design',
] as const

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch projects with joined image URLs
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select(`
          *,
          thumbnail:image_media_id (public_url),
          featured:featured_image_media_id (public_url),
          check_launch_img:check_launch_image_media_id (public_url)
        `)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      // Transform data to flatten media URLs
      const transformedData: Project[] = (data || []).map((project: any) => ({
        ...project,
        image_url: project.thumbnail?.public_url || null,
        featured_image_url: project.featured?.public_url || null,
        check_launch_image_url: project.check_launch_img?.public_url || null,
        thumbnail: undefined,
        featured: undefined,
        check_launch_img: undefined,
      }))

      setProjects(transformedData)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch projects'
      setError(message)
      console.error('Error fetching projects:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const createProject = useCallback(async (input: ProjectInput): Promise<{ success: boolean; id?: string }> => {
    try {
      // Check for duplicate slug
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', input.slug)
        .maybeSingle()

      if (existing) {
        toast.error('A project with this slug already exists')
        return { success: false }
      }

      const { data, error: insertError } = await supabase
        .from('projects')
        .insert({
          title: input.title,
          heading: input.heading,
          slug: input.slug,
          description: input.description || null,
          image_media_id: input.image_media_id || null,
          featured_image_media_id: input.featured_image_media_id || null,
          category: input.category,
          is_featured: input.is_featured || false,
          display_order: input.display_order || null,
          status: input.status,
          client: input.client || null,
          website: input.website || null,
          start_date: input.start_date || null,
          end_date: input.end_date || null,
          check_launch_content: input.check_launch_content || null,
          check_launch_image_media_id: input.check_launch_image_media_id || null,
        })
        .select('id')
        .single()

      if (insertError) {
        throw insertError
      }

      toast.success('Project created successfully')
      await fetchProjects()
      return { success: true, id: data?.id }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create project'
      toast.error(`Error creating project: ${message}`)
      console.error('Error creating project:', err)
      return { success: false }
    }
  }, [fetchProjects])

  const updateProject = useCallback(async (id: string, input: Partial<ProjectInput>): Promise<boolean> => {
    try {
      // Check for duplicate slug if slug is being changed
      if (input.slug) {
        const { data: existing } = await supabase
          .from('projects')
          .select('id')
          .eq('slug', input.slug)
          .neq('id', id)
          .maybeSingle()

        if (existing) {
          toast.error('A project with this slug already exists')
          return false
        }
      }

      const updateData: Record<string, any> = {}
      if (input.title !== undefined) updateData.title = input.title
      if (input.heading !== undefined) updateData.heading = input.heading
      if (input.slug !== undefined) updateData.slug = input.slug
      if (input.description !== undefined) updateData.description = input.description || null
      if (input.image_media_id !== undefined) updateData.image_media_id = input.image_media_id || null
      if (input.featured_image_media_id !== undefined) updateData.featured_image_media_id = input.featured_image_media_id || null
      if (input.category !== undefined) updateData.category = input.category
      if (input.is_featured !== undefined) updateData.is_featured = input.is_featured
      if (input.display_order !== undefined) updateData.display_order = input.display_order
      if (input.status !== undefined) updateData.status = input.status
      if (input.client !== undefined) updateData.client = input.client || null
      // New fields
      if (input.website !== undefined) updateData.website = input.website || null
      if (input.start_date !== undefined) updateData.start_date = input.start_date || null
      if (input.end_date !== undefined) updateData.end_date = input.end_date || null
      if (input.check_launch_content !== undefined) updateData.check_launch_content = input.check_launch_content || null
      if (input.check_launch_image_media_id !== undefined) updateData.check_launch_image_media_id = input.check_launch_image_media_id || null

      const { error: updateError } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)

      if (updateError) {
        throw updateError
      }

      toast.success('Project updated successfully')
      await fetchProjects()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update project'
      toast.error(`Error updating project: ${message}`)
      console.error('Error updating project:', err)
      return false
    }
  }, [fetchProjects])

  const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (deleteError) {
        throw deleteError
      }

      toast.success('Project deleted successfully')
      await fetchProjects()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete project'
      toast.error(`Error deleting project: ${message}`)
      console.error('Error deleting project:', err)
      return false
    }
  }, [fetchProjects])

  // Process Steps CRUD
  const fetchProcessSteps = useCallback(async (projectId: string): Promise<ProjectProcessStep[]> => {
    try {
      const { data, error } = await supabase
        .from('project_process_steps')
        .select(`
          *,
          step_image:image_media_id (public_url)
        `)
        .eq('project_id', projectId)
        .order('step_number', { ascending: true })

      if (error) throw error

      return (data || []).map((step: any) => ({
        ...step,
        image_url: step.step_image?.public_url || null,
        step_image: undefined,
      }))
    } catch (err) {
      console.error('Error fetching process steps:', err)
      return []
    }
  }, [])

  const saveProcessSteps = useCallback(async (projectId: string, steps: ProjectProcessStepInput[]): Promise<boolean> => {
    try {
      // Delete existing steps
      const { error: deleteError } = await supabase
        .from('project_process_steps')
        .delete()
        .eq('project_id', projectId)

      if (deleteError) throw deleteError

      // Insert new steps
      if (steps.length > 0) {
        const insertData = steps.map(step => ({
          project_id: projectId,
          step_number: step.step_number,
          title: step.title,
          description: step.description || '',
          image_media_id: step.image_media_id,
        }))

        const { error: insertError } = await supabase
          .from('project_process_steps')
          .insert(insertData)

        if (insertError) throw insertError
      }

      return true
    } catch (err) {
      console.error('Error saving process steps:', err)
      toast.error('Failed to save process steps')
      return false
    }
  }, [])

  return {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
    fetchProcessSteps,
    saveProcessSteps,
    refetch: fetchProjects,
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
