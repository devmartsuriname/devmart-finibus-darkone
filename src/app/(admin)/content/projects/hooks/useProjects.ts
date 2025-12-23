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
  created_at: string
  updated_at: string
  // Joined data
  image_url?: string | null
  featured_image_url?: string | null
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
          featured:featured_image_media_id (public_url)
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
        thumbnail: undefined,
        featured: undefined,
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

  const createProject = useCallback(async (input: ProjectInput): Promise<boolean> => {
    try {
      // Check for duplicate slug
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', input.slug)
        .maybeSingle()

      if (existing) {
        toast.error('A project with this slug already exists')
        return false
      }

      const { error: insertError } = await supabase
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
        })

      if (insertError) {
        throw insertError
      }

      toast.success('Project created successfully')
      await fetchProjects()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create project'
      toast.error(`Error creating project: ${message}`)
      console.error('Error creating project:', err)
      return false
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

  return {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
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
