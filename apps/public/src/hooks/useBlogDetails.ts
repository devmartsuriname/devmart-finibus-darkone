/**
 * useBlogDetails Hook
 * 
 * Fetches a single published blog post by slug from Supabase.
 * Phase 5.5 — Public → DB Integration
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Media {
  id: string;
  public_url: string;
  alt_text: string | null;
}

export interface BlogPostDetails {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  featured_image: Media | null;
}

interface UseBlogDetailsResult {
  post: BlogPostDetails | null;
  loading: boolean;
  error: string | null;
}

export function useBlogDetails(slug: string | undefined): UseBlogDetailsResult {
  const [post, setPost] = useState<BlogPostDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setLoading(false);
        setError('No slug provided');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            slug,
            excerpt,
            content,
            category,
            status,
            published_at,
            created_at,
            updated_at,
            featured_image:media!blog_posts_featured_image_media_id_fkey(id, public_url, alt_text)
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          setError('Post not found');
          setPost(null);
        } else {
          // Transform the response to flatten media relations
          const transformedPost: BlogPostDetails = {
            id: data.id,
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            status: data.status,
            published_at: data.published_at,
            created_at: data.created_at,
            updated_at: data.updated_at,
            featured_image: (data as any).featured_image || null,
          };
          setPost(transformedPost);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}

export default useBlogDetails;
