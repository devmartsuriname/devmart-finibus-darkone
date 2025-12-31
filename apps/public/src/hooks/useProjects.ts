/**
 * useProjects Hook
 * 
 * Fetches published projects from Supabase for the Projects List page.
 * Phase 5.4 — Public → DB Integration
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Media {
  id: string;
  public_url: string;
  alt_text: string | null;
}

export interface ProjectProcessStep {
  id: string;
  step_number: number;
  title: string;
  description: string | null;
  image: Media | null;
}

export interface ProjectWithMedia {
  id: string;
  title: string;
  heading: string;
  slug: string;
  description: string | null;
  category: string;
  client: string | null;
  is_featured: boolean;
  display_order: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  image: Media | null;
  featured_image: Media | null;
  // New fields (Phase 5.4+)
  website: string | null;
  start_date: string | null;
  end_date: string | null;
  check_launch_content: string | null;
  check_launch_image: Media | null;
  process_steps: ProjectProcessStep[];
  // SEO fields (Phase 5.2)
  meta_title?: string | null;
  meta_description?: string | null;
  og_image?: Media | null;
  canonical_url?: string | null;
  noindex?: boolean | null;
}

interface UseProjectsResult {
  projects: ProjectWithMedia[];
  loading: boolean;
  error: string | null;
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<ProjectWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('projects')
          .select(`
            id,
            title,
            heading,
            slug,
            description,
            category,
            client,
            is_featured,
            display_order,
            status,
            created_at,
            updated_at,
            image:media!projects_image_media_id_fkey(id, public_url, alt_text),
            featured_image:media!projects_featured_image_media_id_fkey(id, public_url, alt_text)
          `)
          .eq('status', 'published')
          .order('display_order', { ascending: true, nullsFirst: false })
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        // Helper to extract single media from Supabase array response
        const extractMedia = (mediaData: unknown): Media | null => {
          if (!mediaData) return null;
          if (Array.isArray(mediaData)) return mediaData[0] || null;
          return mediaData as Media;
        };

        // Transform the response to flatten media relations
        const transformedProjects: ProjectWithMedia[] = (data || []).map((project: any) => ({
          id: project.id,
          title: project.title,
          heading: project.heading,
          slug: project.slug,
          description: project.description,
          category: project.category,
          client: project.client,
          is_featured: project.is_featured,
          display_order: project.display_order,
          status: project.status,
          created_at: project.created_at,
          updated_at: project.updated_at,
          website: project.website || null,
          start_date: project.start_date || null,
          end_date: project.end_date || null,
          check_launch_content: project.check_launch_content || null,
          image: extractMedia(project.image),
          featured_image: extractMedia(project.featured_image),
          check_launch_image: null,
          process_steps: [],
        }));

        setProjects(transformedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export default useProjects;
