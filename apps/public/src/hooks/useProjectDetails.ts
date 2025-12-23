/**
 * useProjectDetails Hook
 * 
 * Fetches a single project by slug and related projects from Supabase.
 * Phase 5.4 — Public → DB Integration
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ProjectWithMedia } from './useProjects';

interface UseProjectDetailsResult {
  project: ProjectWithMedia | null;
  relatedProjects: ProjectWithMedia[];
  loading: boolean;
  error: string | null;
  notFound: boolean;
}

export function useProjectDetails(slug: string | undefined): UseProjectDetailsResult {
  const [project, setProject] = useState<ProjectWithMedia | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProjectDetails() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setNotFound(false);

        // Fetch the project by slug
        const { data: projectData, error: projectError } = await supabase
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
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (projectError) {
          if (projectError.code === 'PGRST116') {
            // No rows returned
            setNotFound(true);
            setLoading(false);
            return;
          }
          throw projectError;
        }

        if (!projectData) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        // Transform project data
        const transformedProject: ProjectWithMedia = {
          id: projectData.id,
          title: projectData.title,
          heading: projectData.heading,
          slug: projectData.slug,
          description: projectData.description,
          category: projectData.category,
          client: projectData.client,
          is_featured: projectData.is_featured,
          display_order: projectData.display_order,
          status: projectData.status,
          created_at: projectData.created_at,
          updated_at: projectData.updated_at,
          image: projectData.image || null,
          featured_image: projectData.featured_image || null,
        };

        setProject(transformedProject);

        // Fetch related projects (exclude current, limit 6)
        const { data: relatedData, error: relatedError } = await supabase
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
          .neq('id', projectData.id)
          .order('display_order', { ascending: true, nullsFirst: false })
          .limit(6);

        if (relatedError) {
          console.error('Error fetching related projects:', relatedError);
        } else {
          const transformedRelated: ProjectWithMedia[] = (relatedData || []).map((p: any) => ({
            id: p.id,
            title: p.title,
            heading: p.heading,
            slug: p.slug,
            description: p.description,
            category: p.category,
            client: p.client,
            is_featured: p.is_featured,
            display_order: p.display_order,
            status: p.status,
            created_at: p.created_at,
            updated_at: p.updated_at,
            image: p.image || null,
            featured_image: p.featured_image || null,
          }));
          setRelatedProjects(transformedRelated);
        }
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    }

    fetchProjectDetails();
  }, [slug]);

  return { project, relatedProjects, loading, error, notFound };
}

export default useProjectDetails;
