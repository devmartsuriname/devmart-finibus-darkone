/**
 * useBlogDetails Hook
 * 
 * Fetches a single published blog post by slug from Supabase.
 * Phase 5.5 — Public → DB Integration
 * Phase 2.1a-2.3 — Enhanced with Details Layout + SEO fields
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
  // Details Layout fields (Phase 2.1a)
  quote_text: string | null;
  quote_author: string | null;
  secondary_image: Media | null;
  secondary_content: string | null;
  author_display_name: string | null;
  tags: string[] | null;
  // SEO fields
  meta_title: string | null;
  meta_description: string | null;
  og_image: Media | null;
  canonical_url: string | null;
  noindex: boolean | null;
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
            featured_image:media!blog_posts_featured_image_media_id_fkey(id, public_url, alt_text),
            quote_text,
            quote_author,
            secondary_image:media!blog_posts_secondary_image_media_id_fkey(id, public_url, alt_text),
            secondary_content,
            author_display_name,
            tags,
            meta_title,
            meta_description,
            og_image:media!blog_posts_og_image_media_id_fkey(id, public_url, alt_text),
            canonical_url,
            noindex
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
            // Details Layout fields
            quote_text: data.quote_text,
            quote_author: data.quote_author,
            secondary_image: (data as any).secondary_image || null,
            secondary_content: data.secondary_content,
            author_display_name: data.author_display_name,
            tags: data.tags,
            // SEO fields
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            og_image: (data as any).og_image || null,
            canonical_url: data.canonical_url,
            noindex: data.noindex,
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
