-- Phase 12.4: Update Process Steps (21 records)
-- Service: web-design (Web Platforms)
UPDATE service_process_steps SET title = 'Discovery & Requirements', description = 'We clarify goals, users, compliance needs, and integration points. Output: scope, sitemap, technical approach, and a delivery plan aligned to operations.' WHERE id = 'a970f457-1d28-4c67-b26c-f1b1e66d4bd9';
UPDATE service_process_steps SET title = 'Architecture & Build', description = 'We design and implement a secure, scalable web platform with clean UI, performance baselines, and integration-ready components for forms, auth, and data.' WHERE id = '26f41dee-b0bd-425a-b016-da7984f7c4ec';
UPDATE service_process_steps SET title = 'QA, Launch & Support', description = 'We test responsiveness, accessibility, and reliability, then deploy with monitoring-ready setup. Post-launch support covers fixes, hardening, and iteration.' WHERE id = '6745faba-a20c-420c-ba7c-201a5d246f91';

-- Service: app-design (Product Design)
UPDATE service_process_steps SET title = 'Research & UX Mapping', description = 'We map users, workflows, and constraints. Output: UX flows, wireframes, and acceptance criteria that reduce rework and improve conversion clarity.' WHERE id = 'a77b8ca0-940b-485f-ac90-95964974e245';
UPDATE service_process_steps SET title = 'UI System & Prototypes', description = 'We build a consistent interface system and interactive prototypes aligned to the live layout. Output: component-ready designs and states for dev.' WHERE id = '855ad763-18d3-40ff-9c7e-94fef5dd1736';
UPDATE service_process_steps SET title = 'Handoff & Iteration', description = 'We support implementation with design QA, revisions, and usability adjustments. Output: clean handoff assets and a stable UI quality bar.' WHERE id = '7ca495da-0ea8-44fa-91d6-98da194efd14';

-- Service: developing (Software Engineering)
UPDATE service_process_steps SET title = 'System Planning & Scope', description = 'We define modules, data flows, and security boundaries. Output: architecture notes, delivery milestones, and a backlog aligned to operations.' WHERE id = '106c7cfc-c0e0-4b74-a0a5-c749761e5f68';
UPDATE service_process_steps SET title = 'Build & Integrate', description = 'We implement core features, APIs, and data logic with reliability in mind. Output: tested modules, integration points, and clean code structure.' WHERE id = '39a32391-878b-43ff-8d97-a80de7f0a050';
UPDATE service_process_steps SET title = 'Stabilize & Optimize', description = 'We harden performance, reduce errors, and prepare release. Output: QA results, monitoring readiness, and a support plan for iterations.' WHERE id = '05a957bf-be9e-439f-a27c-be0d9b623edb';

-- Service: graphic-design (Brand Design)
UPDATE service_process_steps SET title = 'Brand Strategy & Direction', description = 'We define positioning, messaging pillars, and visual direction. Output: brand goals, audience focus, and a clear design foundation for consistency.' WHERE id = '64f33caa-c6fd-4bf0-a755-c22ac0d7d118';
UPDATE service_process_steps SET title = 'Identity & Asset System', description = 'We design key brand assets and a usable system. Output: logo usage rules, color/graphic treatments, and templates aligned to real needs.' WHERE id = '9b1e810e-580b-4566-bd80-f0e05e506559';
UPDATE service_process_steps SET title = 'Rollout & Consistency', description = 'We prepare delivery files and guidance for teams. Output: practical handoff, brand checks, and recommendations for ongoing consistency.' WHERE id = 'b2a53089-9cd4-483a-ae65-16c6066945ae';

-- Service: video-animation (Motion & Video)
UPDATE service_process_steps SET title = 'Script & Creative Direction', description = 'We clarify the objective, audience, and message. Output: script outline, style direction, and an asset plan that matches the brand system.' WHERE id = '4360c5ac-4917-4444-8419-85cd49a7aa08';
UPDATE service_process_steps SET title = 'Production & Editing', description = 'We create motion assets and edit for clarity and pacing. Output: structured visuals, captions-ready delivery, and platform-friendly formats.' WHERE id = '270e07b2-b56c-4e67-825d-9e7f508cc951';
UPDATE service_process_steps SET title = 'Review & Delivery', description = 'We refine based on feedback and deliver final outputs. Output: final exports, cut-down variants, and guidance for publishing.' WHERE id = 'e5eb3078-2559-42d9-a546-8a8fa147849d';

-- Service: 3d-design (3D Visualization)
UPDATE service_process_steps SET title = 'Requirements & References', description = 'We define the subject, outputs, and usage context. Output: reference pack, scene requirements, and a plan for quality and timelines.' WHERE id = 'cd1d4ada-46a9-4a9d-9c91-8fbfb5ff683b';
UPDATE service_process_steps SET title = 'Modeling & Rendering', description = 'We produce accurate 3D visuals with consistent lighting and detail. Output: renders optimized for presentations, web, and stakeholder review.' WHERE id = 'cf6f21cc-9ba7-443b-8621-dadc9138862d';
UPDATE service_process_steps SET title = 'Review & Delivery', description = 'We refine angles and details based on feedback. Output: final renders, variants, and delivery files organized for use.' WHERE id = '0fab4158-001d-4986-82ca-3d6ae7b715d9';

-- Service: ui-ux-design (UX & Service Design)
UPDATE service_process_steps SET title = 'Workflow & Stakeholders', description = 'We map roles, pain points, and service flows. Output: workflow diagrams, requirements, and measurable targets for usability and efficiency.' WHERE id = '633ff2fb-1074-42fa-a010-2d4ed4b16a38';
UPDATE service_process_steps SET title = 'Service Blueprint & UX', description = 'We design the service blueprint and UX screens. Output: structured flows, components, and validations that fit real operations and constraints.' WHERE id = '39b856e2-cafb-4bf3-a2e6-f3fec34df9d5';
UPDATE service_process_steps SET title = 'Validation & Iteration', description = 'We test assumptions, refine friction points, and support build alignment. Output: improved flows, QA notes, and ready-to-implement guidance.' WHERE id = '4598a213-616d-4026-84bb-0bfe94b3b471';