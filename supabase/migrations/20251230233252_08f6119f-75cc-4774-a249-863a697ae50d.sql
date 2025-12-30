-- Phase 12.X: Projects Content Swap (Anonymized Capability Cases)
-- Updates 5 published projects with Devmart-aligned content
-- NO SCHEMA CHANGES - Content only

-- Project 1: corporate-brand-identity → national-digital-services-portal
UPDATE projects SET
  title = 'National Digital Services Portal',
  slug = 'national-digital-services-portal',
  heading = 'National Digital Services Portal',
  category = 'Government Platform',
  client = 'Public Institution',
  website = NULL,
  start_date = '2023-06-01',
  end_date = '2023-12-15',
  description = 'This project focused on designing and implementing a scalable national portal that consolidates essential government services into one secure, user-friendly digital environment.',
  check_launch_content = 'The system was deployed with monitoring, access governance, and documentation for long-term operation. Platform passed security audit and achieved compliance certification.'
WHERE id = 'a0622123-7318-46f6-bc0b-b29e72339172';

-- Project 2: ecommerce-platform-redesign → immigration-case-management-system
UPDATE projects SET
  title = 'Immigration Case Management System',
  slug = 'immigration-case-management-system',
  heading = 'Immigration Case Management System',
  category = 'Government Information System',
  client = 'Government Agency',
  website = NULL,
  start_date = '2023-09-01',
  end_date = '2024-03-30',
  description = 'This system digitizes complex immigration workflows, enabling structured case handling, document management, and decision tracking within a secure environment.',
  check_launch_content = 'Governance rules, access roles, and monitoring were configured for day-to-day operations. System achieved full operational readiness with documented procedures.'
WHERE id = '2fa4bf26-a2a2-44e8-bcb1-59a4a84f78aa';

-- Project 3: saas-dashboard-interface → enterprise-operations-dashboard
UPDATE projects SET
  title = 'Enterprise Operations Dashboard',
  slug = 'enterprise-operations-dashboard',
  heading = 'Enterprise Operations Dashboard',
  category = 'Enterprise Dashboard',
  client = 'Enterprise Organization',
  website = NULL,
  start_date = '2024-01-15',
  end_date = '2024-06-30',
  description = 'This project delivered a centralized dashboard that aggregates operational data, enabling leadership to monitor performance and make informed decisions.',
  check_launch_content = 'Performance tuning and documentation ensured reliable long-term usage. Dashboard achieved 99.9% uptime with real-time data refresh capabilities.'
WHERE id = '89626530-d246-41d8-8ac1-71d337db98ea';

-- Project 4: mobile-banking-application → housing-registration-subsidy-platform
UPDATE projects SET
  title = 'Housing Registration & Subsidy Platform',
  slug = 'housing-registration-subsidy-platform',
  heading = 'Housing Registration & Subsidy Platform',
  category = 'Public Sector Platform',
  client = 'Public Authority',
  website = NULL,
  start_date = '2024-02-01',
  end_date = '2024-08-15',
  description = 'This platform enables structured registration of housing applicants and streamlined handling of subsidy requests within a governed digital workflow.',
  check_launch_content = 'The system was deployed with user guidance and operational documentation. All registration workflows validated and staff training completed.'
WHERE id = '3e4d702e-4c4b-41fd-bf3f-e1f97b7e6d3c';

-- Project 5: restaurant-website-ordering → saas-management-analytics-platform
UPDATE projects SET
  title = 'SaaS Management & Analytics Platform',
  slug = 'saas-management-analytics-platform',
  heading = 'SaaS Management & Analytics Platform',
  category = 'SaaS Platform',
  client = 'Technology Company',
  website = NULL,
  start_date = '2024-04-01',
  end_date = '2024-10-30',
  description = 'This project focused on building a multi-tenant SaaS platform with integrated analytics and subscription management capabilities.',
  check_launch_content = 'Operational monitoring and scaling strategies were implemented to support growth. Platform successfully onboarded initial customer cohort.'
WHERE id = '1ecfb4db-2470-4b85-a623-4cc30be28601';

-- Update process steps for Project 1 (national-digital-services-portal)
UPDATE project_process_steps SET
  title = 'Discovery & Architecture',
  description = 'We analyzed institutional workflows, security requirements, and scalability needs to define a robust system architecture.'
WHERE project_id = 'a0622123-7318-46f6-bc0b-b29e72339172' AND step_number = 1;

UPDATE project_process_steps SET
  title = 'Platform Development',
  description = 'A modular web platform was developed with secure APIs, service modules, and administrative controls.'
WHERE project_id = 'a0622123-7318-46f6-bc0b-b29e72339172' AND step_number = 2;

UPDATE project_process_steps SET
  title = 'Deployment & Governance',
  description = 'The system was deployed with monitoring, access governance, and documentation for long-term operation.'
WHERE project_id = 'a0622123-7318-46f6-bc0b-b29e72339172' AND step_number = 3;

DELETE FROM project_process_steps
WHERE project_id = 'a0622123-7318-46f6-bc0b-b29e72339172' AND step_number = 4;

-- Update process steps for Project 2 (immigration-case-management-system)
UPDATE project_process_steps SET
  title = 'Process Mapping',
  description = 'Existing manual workflows were analyzed and translated into structured digital processes.'
WHERE project_id = '2fa4bf26-a2a2-44e8-bcb1-59a4a84f78aa' AND step_number = 1;

UPDATE project_process_steps SET
  title = 'System Implementation',
  description = 'A secure web application was built to manage cases, documents, and internal approvals.'
WHERE project_id = '2fa4bf26-a2a2-44e8-bcb1-59a4a84f78aa' AND step_number = 2;

UPDATE project_process_steps SET
  title = 'Operational Readiness',
  description = 'Governance rules, access roles, and monitoring were configured for day-to-day operations.'
WHERE project_id = '2fa4bf26-a2a2-44e8-bcb1-59a4a84f78aa' AND step_number = 3;

DELETE FROM project_process_steps
WHERE project_id = '2fa4bf26-a2a2-44e8-bcb1-59a4a84f78aa' AND step_number = 4;

-- Update process steps for Project 3 (enterprise-operations-dashboard)
UPDATE project_process_steps SET
  title = 'Data Architecture Design',
  description = 'Data sources and KPIs were identified and structured into a unified data model.'
WHERE project_id = '89626530-d246-41d8-8ac1-71d337db98ea' AND step_number = 1;

UPDATE project_process_steps SET
  title = 'Dashboard Development',
  description = 'An interactive dashboard was built with role-based views and real-time updates.'
WHERE project_id = '89626530-d246-41d8-8ac1-71d337db98ea' AND step_number = 2;

UPDATE project_process_steps SET
  title = 'Optimization & Support',
  description = 'Performance tuning and documentation ensured reliable long-term usage.'
WHERE project_id = '89626530-d246-41d8-8ac1-71d337db98ea' AND step_number = 3;

DELETE FROM project_process_steps
WHERE project_id = '89626530-d246-41d8-8ac1-71d337db98ea' AND step_number = 4;

-- Update process steps for Project 4 (housing-registration-subsidy-platform)
UPDATE project_process_steps SET
  title = 'Requirements Analysis',
  description = 'Policy rules and operational needs were translated into digital workflows.'
WHERE project_id = '3e4d702e-4c4b-41fd-bf3f-e1f97b7e6d3c' AND step_number = 1;

UPDATE project_process_steps SET
  title = 'Platform Build',
  description = 'A scalable web application was developed to manage registrations and subsidy processing.'
WHERE project_id = '3e4d702e-4c4b-41fd-bf3f-e1f97b7e6d3c' AND step_number = 2;

UPDATE project_process_steps SET
  title = 'Deployment & Training',
  description = 'The system was deployed with user guidance and operational documentation.'
WHERE project_id = '3e4d702e-4c4b-41fd-bf3f-e1f97b7e6d3c' AND step_number = 3;

DELETE FROM project_process_steps
WHERE project_id = '3e4d702e-4c4b-41fd-bf3f-e1f97b7e6d3c' AND step_number = 4;

-- Update process steps for Project 5 (saas-management-analytics-platform)
UPDATE project_process_steps SET
  title = 'Platform Strategy',
  description = 'Business requirements and scalability goals were translated into a SaaS-ready architecture.'
WHERE project_id = '1ecfb4db-2470-4b85-a623-4cc30be28601' AND step_number = 1;

UPDATE project_process_steps SET
  title = 'Core Development',
  description = 'The platform was built with modular services, secure APIs, and analytics components.'
WHERE project_id = '1ecfb4db-2470-4b85-a623-4cc30be28601' AND step_number = 2;

UPDATE project_process_steps SET
  title = 'Launch & Scaling',
  description = 'Operational monitoring and scaling strategies were implemented to support growth.'
WHERE project_id = '1ecfb4db-2470-4b85-a623-4cc30be28601' AND step_number = 3;

DELETE FROM project_process_steps
WHERE project_id = '1ecfb4db-2470-4b85-a623-4cc30be28601' AND step_number = 4;