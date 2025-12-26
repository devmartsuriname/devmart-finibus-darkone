import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuthContext } from '@/context/useAuthContext'
import { notifySuccess, notifyError } from '@/lib/notify'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image_media_id: string | null
  status: 'draft' | 'published'
  published_at: string | null
  author_id: string
  created_at: string
  updated_at: string
  // Joined data
  featured_image_url?: string | null
}

export interface BlogPostInput {
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image_media_id?: string | null
  status: 'draft' | 'published'
  published_at?: string | null
}

export const useBlogPosts = () => {
  const { user } = useAuthContext()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch posts with featured image URL via join
      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          media:featured_image_media_id (
            public_url
          )
        `)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      // Transform data to flatten media URL
      const transformedData: BlogPost[] = (data || []).map((post: any) => ({
        ...post,
        featured_image_url: post.media?.public_url || null,
        media: undefined, // Remove nested object
      }))

      setPosts(transformedData)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch posts'
      setError(message)
      console.error('Error fetching blog posts:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const createPost = useCallback(async (input: BlogPostInput): Promise<boolean> => {
    if (!user?.id) {
      notifyError('You must be logged in to create posts')
      return false
    }

    try {
      // Check for duplicate slug
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', input.slug)
        .maybeSingle()

      if (existing) {
        notifyError('A post with this slug already exists')
        return false
      }

      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          title: input.title,
          slug: input.slug,
          excerpt: input.excerpt || null,
          content: input.content,
          featured_image_media_id: input.featured_image_media_id || null,
          status: input.status,
          published_at: input.status === 'published' ? (input.published_at || new Date().toISOString()) : null,
          author_id: user.id,
        })

      if (insertError) {
        throw insertError
      }

      notifySuccess('Post created successfully')
      await fetchPosts()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post'
      notifyError(`Error creating post: ${message}`)
      console.error('Error creating post:', err)
      return false
    }
  }, [user?.id, fetchPosts])

  const updatePost = useCallback(async (id: string, input: Partial<BlogPostInput>): Promise<boolean> => {
    if (!user?.id) {
      notifyError('You must be logged in to update posts')
      return false
    }

    try {
      // Check for duplicate slug if slug is being changed
      if (input.slug) {
        const { data: existing } = await supabase
          .from('blog_posts')
          .select('id')
          .eq('slug', input.slug)
          .neq('id', id)
          .maybeSingle()

        if (existing) {
          notifyError('A post with this slug already exists')
          return false
        }
      }

      const updateData: Record<string, any> = {}
      if (input.title !== undefined) updateData.title = input.title
      if (input.slug !== undefined) updateData.slug = input.slug
      if (input.excerpt !== undefined) updateData.excerpt = input.excerpt || null
      if (input.content !== undefined) updateData.content = input.content
      if (input.featured_image_media_id !== undefined) updateData.featured_image_media_id = input.featured_image_media_id || null
      if (input.status !== undefined) updateData.status = input.status
      if (input.published_at !== undefined) updateData.published_at = input.published_at

      // Auto-set published_at when status changes to published
      if (input.status === 'published' && !input.published_at) {
        const currentPost = posts.find(p => p.id === id)
        if (!currentPost?.published_at) {
          updateData.published_at = new Date().toISOString()
        }
      }

      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)

      if (updateError) {
        throw updateError
      }

      notifySuccess('Post updated successfully')
      await fetchPosts()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update post'
      notifyError(`Error updating post: ${message}`)
      console.error('Error updating post:', err)
      return false
    }
  }, [user?.id, fetchPosts, posts])

  const deletePost = useCallback(async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (deleteError) {
        throw deleteError
      }

      notifySuccess('Post deleted successfully')
      await fetchPosts()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete post'
      notifyError(`Error deleting post: ${message}`)
      console.error('Error deleting post:', err)
      return false
    }
  }, [fetchPosts])

  return {
    posts,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  }
}

// Utility: Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars (except spaces and hyphens)
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Utility: Validate slug format
export const isValidSlug = (slug: string): boolean => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}