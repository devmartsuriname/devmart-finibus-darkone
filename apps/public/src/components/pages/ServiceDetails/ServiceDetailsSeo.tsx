/**
 * Service Details SEO Component
 * 
 * Purpose: Render SEO meta tags for service detail pages using react-helmet-async.
 * Implements 3-tier fallback hierarchy:
 *   1. Service SEO fields (meta_title, meta_description, etc.)
 *   2. Content-derived (title, short_description, icon)
 *   3. Global SEO settings
 * 
 * Phase 5.1: Public SEO Wiring for Services
 * Status: Active
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGlobalSeoSettings } from '../../../hooks/useGlobalSeoSettings';
import { resolveSeoFallbacks, generateCanonicalUrl } from '../../../lib/seo/resolveSeoFallbacks';

interface ServiceDetailsSeoProps {
  service: {
    title: string;
    short_description?: string | null;
    slug: string;
    meta_title?: string | null;
    meta_description?: string | null;
    og_image?: { public_url: string } | null;
    icon?: { public_url: string } | null;
    canonical_url?: string | null;
    noindex?: boolean | null;
  };
}

function ServiceDetailsSeo({ service }: ServiceDetailsSeoProps) {
  const { settings: globalSeo } = useGlobalSeoSettings();
  
  // Get the base URL for canonical URL generation
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  // Build content URL for canonical fallback
  const contentUrl = generateCanonicalUrl(baseUrl, `service-details/${service.slug}`);
  
  // Resolve SEO values using fallback hierarchy
  const resolved = resolveSeoFallbacks({
    // Priority 1: Service SEO fields
    metaTitle: service.meta_title,
    metaDescription: service.meta_description,
    ogImageUrl: service.og_image?.public_url,
    canonicalUrl: service.canonical_url || undefined,
    noindex: service.noindex ?? false,
    
    // Priority 2: Content-derived
    contentTitle: service.title,
    contentExcerpt: service.short_description,
    contentFeaturedImageUrl: service.icon?.public_url,
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

export default ServiceDetailsSeo;
