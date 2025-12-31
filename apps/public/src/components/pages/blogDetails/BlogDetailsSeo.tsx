/**
 * Blog Details SEO Component
 * 
 * Purpose: Render SEO meta tags for blog detail pages using react-helmet-async.
 * Implements 3-tier fallback hierarchy:
 *   1. Post SEO fields (meta_title, meta_description, etc.)
 *   2. Content-derived (title, excerpt, featured_image)
 *   3. Global SEO settings
 * 
 * Phase 3: SEO Fallback Wiring Finalization
 * Status: Active
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGlobalSeoSettings } from '../../../hooks/useGlobalSeoSettings';
import { resolveSeoFallbacks, generateCanonicalUrl } from '../../../../../../src/lib/seo/resolveSeoFallbacks';

interface BlogDetailsSeoProps {
  post: {
    title: string;
    excerpt?: string | null;
    slug: string;
    meta_title?: string | null;
    meta_description?: string | null;
    og_image?: { public_url: string } | null;
    featured_image?: { public_url: string } | null;
    canonical_url?: string | null;
    noindex?: boolean | null;
    published_at?: string | null;
    author_display_name?: string | null;
    tags?: string[] | null;
  };
}

function BlogDetailsSeo({ post }: BlogDetailsSeoProps) {
  const { settings: globalSeo } = useGlobalSeoSettings();
  
  // Get the base URL for canonical URL generation
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  // Build content URL for canonical fallback
  const contentUrl = generateCanonicalUrl(baseUrl, `blog/${post.slug}`);
  
  // Resolve SEO values using fallback hierarchy
  const resolved = resolveSeoFallbacks({
    // Priority 1: Post SEO fields
    metaTitle: post.meta_title,
    metaDescription: post.meta_description,
    ogImageUrl: post.og_image?.public_url,
    canonicalUrl: post.canonical_url ? generateCanonicalUrl(baseUrl, post.canonical_url) : undefined,
    noindex: post.noindex ?? false,
    
    // Priority 2: Content-derived
    contentTitle: post.title,
    contentExcerpt: post.excerpt,
    contentFeaturedImageUrl: post.featured_image?.public_url,
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
      <meta property="og:type" content="article" />
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

      {/* Article Metadata */}
      {post.published_at && (
        <meta property="article:published_time" content={post.published_at} />
      )}
      {post.author_display_name && (
        <meta property="article:author" content={post.author_display_name} />
      )}
      {post.tags && post.tags.length > 0 && (
        post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))
      )}
    </Helmet>
  );
}

export default BlogDetailsSeo;
