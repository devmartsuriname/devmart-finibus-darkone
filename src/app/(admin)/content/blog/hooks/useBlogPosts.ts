import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuthContext } from '@/context/useAuthContext'
import { useAdminNotify } from '@/lib/notify'
import { Json } from '@/integrations/supabase/types'
import { ContentBlock } from '../utils/compileContent'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  content_blocks: Json | null
  category: string | null
  tags: string[] | null
  featured_image_media_id: string | null
  status: 'draft' | 'published'
  published_at: string | null
  author_id: string
  created_at: string
  updated_at: string
  // SEO fields (Phase 1)
  meta_title: string | null
  meta_description: string | null
  og_image_media_id: string | null
  canonical_url: string | null
  noindex: boolean | null
  // Details Layout fields (Phase 2.1a)
  quote_text: string | null
  quote_author: string | null
  secondary_image_media_id: string | null
  secondary_content: string | null
  author_display_name: string | null
  // Joined data
  featured_image_url?: string | null
  og_image_url?: string | null
  secondary_image_url?: string | null
}

export interface BlogPostInput {
  title: string
  slug: string
  excerpt?: string
  content: string
  content_blocks?: ContentBlock[]
  category?: string | null
  tags?: string[]
  featured_image_media_id?: string | null
  status: 'draft' | 'published'
  published_at?: string | null
  // SEO fields
  meta_title?: string | null
  meta_description?: string | null
  og_image_media_id?: string | null
  canonical_url?: string | null
  noindex?: boolean
  // Details Layout fields (Phase 2.1a)
  quote_text?: string | null
  quote_author?: string | null
  secondary_image_media_id?: string | null
  secondary_content?: string | null
  author_display_name?: string | null
}

export const useBlogPosts = () => {
  const { user } = useAuthContext()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { notifySuccess, notifyError } = useAdminNotify()

  // Store notify functions in refs to avoid dependency issues
  const notifySuccessRef = useRef(notifySuccess)
  const notifyErrorRef = useRef(notifyError)

  // Sync refs on each render
  useEffect(() => {
    notifySuccessRef.current = notifySuccess
    notifyErrorRef.current = notifyError
  })

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch posts with all media URLs via join
      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          featured_media:featured_image_media_id (
            public_url
          ),
          og_media:og_image_media_id (
            public_url
          ),
          secondary_media:secondary_image_media_id (
            public_url
          )
        `)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      // Transform data to flatten media URLs
      const transformedData: BlogPost[] = (data || []).map((post: any) => ({
        ...post,
        featured_image_url: post.featured_media?.public_url || null,
        og_image_url: post.og_media?.public_url || null,
        secondary_image_url: post.secondary_media?.public_url || null,
        featured_media: undefined,
        og_media: undefined,
        secondary_media: undefined,
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
      notifyErrorRef.current('You must be logged in to create posts')
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
        notifyErrorRef.current('A post with this slug already exists')
        return false
      }

      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          title: input.title,
          slug: input.slug,
          excerpt: input.excerpt || null,
          content: input.content,
          content_blocks: input.content_blocks ? JSON.parse(JSON.stringify(input.content_blocks)) : [],
          category: input.category || null,
          tags: input.tags || [],
          featured_image_media_id: input.featured_image_media_id || null,
          status: input.status,
          published_at: input.status === 'published' ? (input.published_at || new Date().toISOString()) : null,
          author_id: user.id,
          // SEO fields
          meta_title: input.meta_title || null,
          meta_description: input.meta_description || null,
          og_image_media_id: input.og_image_media_id || null,
          canonical_url: input.canonical_url || null,
          noindex: input.noindex ?? false,
          // Details Layout fields (Phase 2.1a)
          quote_text: input.quote_text || null,
          quote_author: input.quote_author || null,
          secondary_image_media_id: input.secondary_image_media_id || null,
          secondary_content: input.secondary_content || null,
          author_display_name: input.author_display_name || null,
        })

      if (insertError) {
        throw insertError
      }

      notifySuccessRef.current('Post created successfully')
      await fetchPosts()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post'
      notifyErrorRef.current(`Error creating post: ${message}`)
      console.error('Error creating post:', err)
      return false
    }
  }, [user?.id, fetchPosts])

  const updatePost = useCallback(async (id: string, input: Partial<BlogPostInput>): Promise<boolean> => {
    if (!user?.id) {
      notifyErrorRef.current('You must be logged in to update posts')
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
          notifyErrorRef.current('A post with this slug already exists')
          return false
        }
      }

      const updateData: Record<string, any> = {}
      
      // Core fields
      if (input.title !== undefined) updateData.title = input.title
      if (input.slug !== undefined) updateData.slug = input.slug
      if (input.excerpt !== undefined) updateData.excerpt = input.excerpt || null
      if (input.content !== undefined) updateData.content = input.content
      if (input.content_blocks !== undefined) updateData.content_blocks = JSON.parse(JSON.stringify(input.content_blocks))
      if (input.category !== undefined) updateData.category = input.category || null
      if (input.tags !== undefined) updateData.tags = input.tags || []
      if (input.featured_image_media_id !== undefined) updateData.featured_image_media_id = input.featured_image_media_id || null
      if (input.status !== undefined) updateData.status = input.status
      if (input.published_at !== undefined) updateData.published_at = input.published_at
      
      // SEO fields
      if (input.meta_title !== undefined) updateData.meta_title = input.meta_title || null
      if (input.meta_description !== undefined) updateData.meta_description = input.meta_description || null
      if (input.og_image_media_id !== undefined) updateData.og_image_media_id = input.og_image_media_id || null
      if (input.canonical_url !== undefined) updateData.canonical_url = input.canonical_url || null
      if (input.noindex !== undefined) updateData.noindex = input.noindex
      
      // Details Layout fields (Phase 2.1a)
      if (input.quote_text !== undefined) updateData.quote_text = input.quote_text || null
      if (input.quote_author !== undefined) updateData.quote_author = input.quote_author || null
      if (input.secondary_image_media_id !== undefined) updateData.secondary_image_media_id = input.secondary_image_media_id || null
      if (input.secondary_content !== undefined) updateData.secondary_content = input.secondary_content || null
      if (input.author_display_name !== undefined) updateData.author_display_name = input.author_display_name || null

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

      notifySuccessRef.current('Post updated successfully')
      await fetchPosts()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update post'
      notifyErrorRef.current(`Error updating post: ${message}`)
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

      notifySuccessRef.current('Post deleted successfully')
      await fetchPosts()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete post'
      notifyErrorRef.current(`Error deleting post: ${message}`)
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
