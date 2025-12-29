-- Phase 12.4: Services Content Replacement
-- Updates title, short_description, full_description for all 7 services
-- Source: Devmart Services Content – Phase 12.4 (CMS Fields)

UPDATE services SET
  title = 'Web Platforms',
  short_description = 'Secure, high-performance websites and portals built for institutions and enterprises.',
  full_description = 'Devmart designs and delivers modern web platforms that support real operations—not just marketing. We build secure, scalable websites and institutional portals for government agencies and enterprise organizations, optimized for speed, accessibility, and long-term maintainability. Typical deliverables include information architecture, UX/UI design, responsive implementation, content structures, and integration-ready components. When required, we connect platforms to authentication, forms, workflows, and third‑party services (analytics, CRM, notifications, and data sources). Our approach prioritizes governance, reliability, and clear ownership so your platform can evolve with policy, organizational growth, and new service requirements across Suriname and the Caribbean.',
  updated_at = now()
WHERE slug = 'web-design';

UPDATE services SET
  title = 'Product Design',
  short_description = 'Product and interface design for apps and platforms focused on clarity and conversion.',
  full_description = 'We design digital products that users can adopt quickly and organizations can operate confidently. Devmart provides end‑to‑end product design for web apps, dashboards, internal tools, and citizen-facing services. This includes user journeys, wireframes, UI systems, component specifications, and handoff documentation that supports consistent implementation. We design for complex environments—multiple roles, approvals, and compliance constraints—while keeping the experience simple and trustworthy. Where needed, we define content structures for SEO and public communication, as well as patterns for forms, validation, and high‑volume workflows. The result is a design system that aligns stakeholders, reduces implementation risk, and improves usability across devices.',
  updated_at = now()
WHERE slug = 'app-design';

UPDATE services SET
  title = 'Software Engineering',
  short_description = 'Custom software and integrations engineered for reliability, security, and scale.',
  full_description = 'Devmart engineers mission‑critical software for organizations that require stability and governance. We build custom web applications, back-office systems, and integration layers that support real operational workflows—requests, approvals, case handling, records management, and reporting. Our engineering focus is security, reliability, and maintainability: clear domain modeling, role-based access patterns, structured data flows, and integration readiness for existing systems. We also implement performance fundamentals (fast load, clean state management, predictable routing) to reduce downtime and support growth. Whether you need a new platform or an upgrade path from legacy processes, we deliver software that can be operated long-term with confidence in government and enterprise contexts.',
  updated_at = now()
WHERE slug = 'developing';

UPDATE services SET
  title = 'Brand Design',
  short_description = 'Visual identity and communication assets that reinforce trust and institutional clarity.',
  full_description = 'Strong design is not decoration—it signals credibility. Devmart produces brand and communication design that supports institutional trust, clear messaging, and consistent public presentation. We create identity systems, layout standards, and practical templates for digital channels, proposals, and campaign materials. For public-facing platforms, we align visual language with usability: readable typography rules (within your locked standards), clear hierarchy, and consistent component styling that improves comprehension. We also create graphics for service announcements, dashboards, and report-ready visuals where clarity matters more than trends. The outcome is a cohesive visual system that supports your digital platforms and communications across Suriname and the Caribbean.',
  updated_at = now()
WHERE slug = 'graphic-design';

UPDATE services SET
  title = 'Motion & Video',
  short_description = 'Explainer videos and motion content for public communication and product education.',
  full_description = 'Devmart produces motion and video content that helps organizations communicate complex services clearly. We develop short explainer videos, product walkthroughs, launch announcements, and campaign assets designed for web and social distribution. Our focus is clarity and trust: simple narratives, consistent branding, and visuals that support adoption of digital services. Where relevant, we align messaging to user journeys—what people need to know, what action to take, and how to complete it safely. This capability is especially valuable for government and enterprise platforms where onboarding and public understanding directly impact service success.',
  updated_at = now()
WHERE slug = 'video-animation';

UPDATE services SET
  title = '3D Visualization',
  short_description = '3D visuals and renders that support planning, communication, and stakeholder alignment.',
  full_description = 'When stakeholders need to see a concept before they approve it, 3D visualization becomes a decision tool. Devmart creates 3D renders and visualizations for projects, spaces, products, and presentations—supporting planning, communication, and alignment. We deliver visuals that match your brand and narrative needs, usable in digital platforms, reports, and public communication. This service is often paired with web content and campaigns where clear visual explanation improves credibility and reduces misunderstandings. The goal is not just realism, but clarity: helping audiences understand what is being built and why it matters.',
  updated_at = now()
WHERE slug = '3d-design';

UPDATE services SET
  title = 'UX & Service Design',
  short_description = 'UX research and service design for workflows, portals, and high-volume operational processes.',
  full_description = 'Devmart improves digital services by designing the end-to-end experience—across users, roles, and operational constraints. We provide UX and service design for portals, internal systems, and public services where forms, approvals, and case handling must be efficient and reliable. This includes user research, journey mapping, workflow modeling, IA, and usability validation. We also define role-based experiences (citizen, staff, admin, supervisor) and ensure the interface supports governance and compliance requirements. The output is practical: clear screens, predictable flows, reduced friction, and a design that developers can implement with minimal ambiguity. For institutions and enterprises, this directly improves adoption, reduces support load, and increases operational throughput.',
  updated_at = now()
WHERE slug = 'ui-ux-design';