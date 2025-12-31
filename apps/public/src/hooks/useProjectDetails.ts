/**
 * useProjectDetails Hook
 * 
 * Phase 5.4+ Hotfix: Extended with new fields + process steps
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ProjectWithMedia, ProjectProcessStep } from './useProjects';

interface Media {
  id: string;
  public_url: string;
  alt_text: string | null;
}

// Helper to extract single media from Supabase array response
const extractMedia = (mediaData: unknown): Media | null => {
  if (!mediaData) return null;
  if (Array.isArray(mediaData)) return mediaData[0] || null;
  return mediaData as Media;
};

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

        // Fetch the project by slug with new fields + SEO fields
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select(`
            id, title, heading, slug, description, category, client,
            is_featured, display_order, status, created_at, updated_at,
            website, start_date, end_date, check_launch_content,
            meta_title, meta_description, canonical_url, noindex,
            image:media!projects_image_media_id_fkey(id, public_url, alt_text),
            featured_image:media!projects_featured_image_media_id_fkey(id, public_url, alt_text),
            check_launch_image:media!projects_check_launch_image_media_id_fkey(id, public_url, alt_text),
            og_image:media!projects_og_image_media_id_fkey(id, public_url, alt_text)
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (projectError) {
          if (projectError.code === 'PGRST116') {
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

        // Fetch process steps for this project
        const { data: stepsData } = await supabase
          .from('project_process_steps')
          .select(`
            id, step_number, title, description,
            image:media!project_process_steps_image_media_id_fkey(id, public_url, alt_text)
          `)
          .eq('project_id', projectData.id)
          .order('step_number', { ascending: true });

        const processSteps: ProjectProcessStep[] = (stepsData || []).map((s: any) => ({
          id: s.id,
          step_number: s.step_number,
          title: s.title,
          description: s.description,
          image: extractMedia(s.image),
        }));

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
          website: projectData.website,
          start_date: projectData.start_date,
          end_date: projectData.end_date,
          check_launch_content: projectData.check_launch_content,
          image: extractMedia(projectData.image),
          featured_image: extractMedia(projectData.featured_image),
          check_launch_image: extractMedia(projectData.check_launch_image),
          process_steps: processSteps,
          // SEO fields
          meta_title: (projectData as any).meta_title || null,
          meta_description: (projectData as any).meta_description || null,
          og_image: extractMedia((projectData as any).og_image),
          canonical_url: (projectData as any).canonical_url || null,
          noindex: (projectData as any).noindex ?? false,
        };

        setProject(transformedProject);

        // Fetch related projects
        const { data: relatedData } = await supabase
          .from('projects')
          .select(`
            id, title, heading, slug, description, category, client,
            is_featured, display_order, status, created_at, updated_at,
            website, start_date, end_date, check_launch_content,
            image:media!projects_image_media_id_fkey(id, public_url, alt_text),
            featured_image:media!projects_featured_image_media_id_fkey(id, public_url, alt_text),
            check_launch_image:media!projects_check_launch_image_media_id_fkey(id, public_url, alt_text)
          `)
          .eq('status', 'published')
          .neq('id', projectData.id)
          .order('display_order', { ascending: true, nullsFirst: false })
          .limit(6);

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
          website: p.website,
          start_date: p.start_date,
          end_date: p.end_date,
          check_launch_content: p.check_launch_content,
          image: extractMedia(p.image),
          featured_image: extractMedia(p.featured_image),
          check_launch_image: extractMedia(p.check_launch_image),
          process_steps: [],
        }));
        setRelatedProjects(transformedRelated);
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
