/**
 * Public App Database Types
 * 
 * Simplified types for public-facing data consumption.
 * These match the Supabase schema but only include fields
 * relevant to the public frontend.
 * 
 * Phase 5.1 - Public → DB Integration
 */

// Media (for image URLs)
export interface Media {
  id: string;
  public_url: string;
  alt_text: string | null;
  title: string | null;
}

// Services
export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string | null;
  icon_media_id: string | null;
  display_order: number;
  status: 'draft' | 'published';
  // Phase 10B: Pricing visibility controls
  show_pricing: boolean;
  pricing_monthly_enabled: boolean;
  pricing_yearly_enabled: boolean;
  icon?: Media | null;
}

export interface ServiceProcessStep {
  id: string;
  service_id: string;
  step_number: number;
  title: string;
  description: string;
  image_media_id: string | null;
  image?: Media | null;
}

export interface ServicePricingPlan {
  id: string;
  service_id: string;
  billing_period: 'monthly' | 'yearly';
  plan_name: string;
  plan_subtitle: string | null;
  price_amount: number;
  currency: string;
  features: string[];
  cta_label: string;
  display_order: number;
  status: 'draft' | 'published';
}

// Projects
export interface Project {
  id: string;
  title: string;
  heading: string;
  slug: string;
  description: string | null;
  category: string;
  is_featured: boolean;
  display_order: number | null;
  status: 'draft' | 'published' | 'archived';
  client: string | null;
  image_media_id: string | null;
  featured_image_media_id: string | null;
  image?: Media | null;
  featured_image?: Media | null;
}

// Blog
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  status: 'draft' | 'published';
  published_at: string | null;
  featured_image_media_id: string | null;
  featured_image?: Media | null;
  tags?: BlogTag[];
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogComment {
  id: string;
  post_id: string;
  commenter_name: string;
  commenter_email: string | null;
  body: string;
  created_at: string;
}

// Testimonials
export interface Testimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  company: string | null;
  quote: string;
  rating: number | null;
  avatar_media_id: string | null;
  featured: boolean;
  display_order: number | null;
  status: 'draft' | 'published';
  avatar?: Media | null;
}

// Leads (for contact form submission)
export interface LeadInsert {
  name: string;
  email: string;
  subject?: string;
  message?: string;
  source?: string;
}

// Settings (for site configuration)
export interface Setting {
  key: string;
  value: string;
  category: string;
}
