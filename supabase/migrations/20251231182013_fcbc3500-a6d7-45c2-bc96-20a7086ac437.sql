-- Part A: Add Step 4 to all 5 published projects that currently have only 3 steps

INSERT INTO project_process_steps (project_id, step_number, title, description, image_media_id)
VALUES
  ('89626530-d246-41d8-8ac1-71d337db98ea', 4, 'Deployment & Launch', 'Final deployment to production, comprehensive quality assurance testing, and launch with ongoing monitoring and support setup.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
  ('3e4d702e-4c4b-41fd-bf3f-e1f97b7e6d3c', 4, 'Monitoring & Maintenance', 'Continuous system monitoring, performance optimization, and proactive maintenance to ensure platform reliability.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
  ('2fa4bf26-a2a2-44e8-bcb1-59a4a84f78aa', 4, 'Go-Live & Support', 'Production launch with full operational support, user training completion, and handover documentation.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
  ('a0622123-7318-46f6-bc0b-b29e72339172', 4, 'Continuous Improvement', 'Post-launch optimization, user feedback integration, and iterative enhancements to maximize platform value.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0'),
  ('1ecfb4db-2470-4b85-a623-4cc30be28601', 4, 'Scale & Optimize', 'Platform scaling infrastructure, performance tuning, and analytics-driven optimization for sustained growth.', '9092bb55-7fbf-428e-a6fd-5f2adc58cbc0');