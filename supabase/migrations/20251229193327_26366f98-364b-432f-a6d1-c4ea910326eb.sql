UPDATE page_settings 
SET data = '{
  "inside_story": {
    "enabled": true,
    "section_label": "Our Story",
    "title": "Building Mission-Critical Digital Systems",
    "description": "Devmart was founded to design, build, and operate digital platforms that organizations can rely on. We specialize in mission-critical systems for government agencies and enterprise organizations, delivering secure, scalable solutions that support long-term operations across Suriname and the Caribbean.",
    "main_image_url": "/images/story.png",
    "main_image_media_id": null,
    "cto_message": "We do not build short-lived software. Every system we deliver is engineered as operational infrastructure—secure, maintainable, and designed to support real-world workflows, compliance requirements, and long-term organizational growth.",
    "cto_name": "Devmart Leadership",
    "cto_title": "Systems Integration Team",
    "cto_signature_url": "/images/cto-signature.png",
    "cto_signature_media_id": null,
    "progress_stats": [
      {"label": "Mission-Critical Systems", "percentage": 95},
      {"label": "Government & Enterprise", "percentage": 92},
      {"label": "Long-Term Operations", "percentage": 88}
    ]
  },
  "latest_news": {
    "enabled": true,
    "section_label": "Insights",
    "section_title": "Latest Updates from Devmart",
    "view_all_label": "View All Insights",
    "view_all_url": "/blog",
    "posts_count": 2
  }
}'::jsonb
WHERE page_slug = 'about';