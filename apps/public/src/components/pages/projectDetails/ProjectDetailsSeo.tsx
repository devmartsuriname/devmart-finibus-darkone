/**
 * Project Details SEO Component
 * 
 * Purpose: Render SEO meta tags for project detail pages using react-helmet-async.
 * Implements 3-tier fallback hierarchy:
 *   1. Project SEO fields (meta_title, meta_description, etc.)
 *   2. Content-derived (title, description, featured_image)
 *   3. Global SEO settings
 * 
 * Phase 5.2: Public SEO Wiring for Projects
 * Status: Active
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGlobalSeoSettings } from '../../../hooks/useGlobalSeoSettings';
import { resolveSeoFallbacks, generateCanonicalUrl } from '../../../lib/seo/resolveSeoFallbacks';

interface ProjectDetailsSeoProps {
  project: {
    title: string;
    description?: string | null;
    slug: string;
    meta_title?: string | null;
    meta_description?: string | null;
    og_image?: { public_url: string } | null;
    featured_image?: { public_url: string } | null;
    canonical_url?: string | null;
    noindex?: boolean | null;
  };
}

function ProjectDetailsSeo({ project }: ProjectDetailsSeoProps) {
  const { settings: globalSeo } = useGlobalSeoSettings();
  
  // Get the base URL for canonical URL generation
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  // Build content URL for canonical fallback
  const contentUrl = generateCanonicalUrl(baseUrl, `project-details/${project.slug}`);
  
  // Resolve SEO values using fallback hierarchy
  const resolved = resolveSeoFallbacks({
    // Priority 1: Project SEO fields
    metaTitle: project.meta_title,
    metaDescription: project.meta_description,
    ogImageUrl: project.og_image?.public_url,
    canonicalUrl: project.canonical_url || undefined,
    noindex: project.noindex ?? false,
    
    // Priority 2: Content-derived
    contentTitle: project.title,
    contentExcerpt: project.description,
    contentFeaturedImageUrl: project.featured_image?.public_url,
    contentUrl: contentUrl,
    
    // Priority 3: Global settings
    globalMetaTitle: globalSeo.globalMetaTitle,
    globalMetaDescription: globalSeo.globalMetaDescription,
    globalOgImageUrl: globalSeo.globalOgImageUrl,
  });

  // Build robots meta content
  const robotsContent = resolved.noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{resolved.title}</title>
      {resolved.description && (
        <meta name="description" content={resolved.description} />
      )}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={resolved.canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={resolved.title} />
      {resolved.description && (
        <meta property="og:description" content={resolved.description} />
      )}
      <meta property="og:url" content={resolved.canonicalUrl} />
      {resolved.ogImage && (
        <meta property="og:image" content={resolved.ogImage} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolved.title} />
      {resolved.description && (
        <meta name="twitter:description" content={resolved.description} />
      )}
      {resolved.ogImage && (
        <meta name="twitter:image" content={resolved.ogImage} />
      )}
    </Helmet>
  );
}

export default ProjectDetailsSeo;
