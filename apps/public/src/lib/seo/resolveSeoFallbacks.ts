/**
 * SEO Fallback Resolution Utility
 * 
 * Resolves SEO meta values using a 3-tier priority system:
 * 1. Content-specific SEO fields (highest priority)
 * 2. Content-derived values (title, excerpt, featured image)
 * 3. Global SEO settings (fallback)
 * 
 * Phase 3: SEO Fallback Wiring for Public App
 * Status: Active
 */

export interface SeoInputs {
  // Content-level SEO overrides (highest priority)
  metaTitle?: string | null
  metaDescription?: string | null
  ogImageUrl?: string | null
  canonicalUrl?: string | null
  noindex?: boolean

  // Content-derived values (fallback tier 2)
  contentTitle: string
  contentExcerpt?: string | null
  contentFeaturedImageUrl?: string | null
  contentUrl: string

  // Global settings (fallback tier 3)
  globalMetaTitle?: string | null
  globalMetaDescription?: string | null
  globalOgImageUrl?: string | null
}

export interface ResolvedSeo {
  title: string
  description: string
  ogImage: string | null
  canonicalUrl: string
  noindex: boolean
  // Debug info for admin preview
  titleSource: 'content-seo' | 'content-title' | 'global'
  descriptionSource: 'content-seo' | 'content-excerpt' | 'global' | 'none'
  ogImageSource: 'content-seo' | 'content-featured' | 'global' | 'none'
}

/**
 * Resolves SEO values using the fallback hierarchy.
 * 
 * Priority order:
 * - Title: metaTitle → contentTitle → globalMetaTitle
 * - Description: metaDescription → contentExcerpt → globalMetaDescription
 * - OG Image: ogImageUrl → contentFeaturedImageUrl → globalOgImageUrl
 * - Canonical: canonicalUrl → contentUrl
 * - Noindex: explicit value or false
 */
export function resolveSeoFallbacks(inputs: SeoInputs): ResolvedSeo {
  // Resolve title
  let title: string
  let titleSource: ResolvedSeo['titleSource']
  
  if (inputs.metaTitle?.trim()) {
    title = inputs.metaTitle.trim()
    titleSource = 'content-seo'
  } else if (inputs.contentTitle?.trim()) {
    title = inputs.contentTitle.trim()
    titleSource = 'content-title'
  } else {
    title = inputs.globalMetaTitle?.trim() || 'Untitled'
    titleSource = 'global'
  }

  // Resolve description
  let description: string
  let descriptionSource: ResolvedSeo['descriptionSource']
  
  if (inputs.metaDescription?.trim()) {
    description = inputs.metaDescription.trim()
    descriptionSource = 'content-seo'
  } else if (inputs.contentExcerpt?.trim()) {
    description = inputs.contentExcerpt.trim()
    descriptionSource = 'content-excerpt'
  } else if (inputs.globalMetaDescription?.trim()) {
    description = inputs.globalMetaDescription.trim()
    descriptionSource = 'global'
  } else {
    description = ''
    descriptionSource = 'none'
  }

  // Resolve OG Image
  let ogImage: string | null
  let ogImageSource: ResolvedSeo['ogImageSource']
  
  if (inputs.ogImageUrl) {
    ogImage = inputs.ogImageUrl
    ogImageSource = 'content-seo'
  } else if (inputs.contentFeaturedImageUrl) {
    ogImage = inputs.contentFeaturedImageUrl
    ogImageSource = 'content-featured'
  } else if (inputs.globalOgImageUrl) {
    ogImage = inputs.globalOgImageUrl
    ogImageSource = 'global'
  } else {
    ogImage = null
    ogImageSource = 'none'
  }

  // Resolve canonical URL (content URL if not explicitly set)
  const canonicalUrl = inputs.canonicalUrl?.trim() || inputs.contentUrl

  // Noindex defaults to false
  const noindex = inputs.noindex ?? false

  return {
    title,
    description,
    ogImage,
    canonicalUrl,
    noindex,
    titleSource,
    descriptionSource,
    ogImageSource,
  }
}

/**
 * Truncates text to a maximum length, adding ellipsis if needed.
 * Used for SEO field character limits.
 */
export function truncateForSeo(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3).trim() + '...'
}

/**
 * Generates a canonical URL from a base URL and slug.
 */
export function generateCanonicalUrl(baseUrl: string, slug: string): string {
  const cleanBase = baseUrl.replace(/\/$/, '')
  const cleanSlug = slug.replace(/^\//, '')
  return `${cleanBase}/${cleanSlug}`
}
