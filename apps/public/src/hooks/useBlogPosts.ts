/**
 * useBlogPosts Hook
 * 
 * Fetches published blog posts from Supabase for the Blog List page.
 * Phase 5.5 — Public → DB Integration
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Media {
  id: string;
  public_url: string;
  alt_text: string | null;
}

export interface BlogPostWithMedia {
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

interface UseBlogPostsResult {
  posts: BlogPostWithMedia[];
  loading: boolean;
  error: string | null;
}

export function useBlogPosts(): UseBlogPostsResult {
  const [posts, setPosts] = useState<BlogPostWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
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
          .eq('status', 'published')
          .order('published_at', { ascending: false, nullsFirst: false });

        if (fetchError) {
          throw fetchError;
        }

        // Transform the response to flatten media relations
        const transformedPosts: BlogPostWithMedia[] = (data || []).map((post: any) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          status: post.status,
          published_at: post.published_at,
          created_at: post.created_at,
          updated_at: post.updated_at,
          featured_image: post.featured_image || null,
        }));

        setPosts(transformedPosts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export default useBlogPosts;
