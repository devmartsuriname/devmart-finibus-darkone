UPDATE page_settings 
SET data = jsonb_set(
  data,
  '{inside_story,progress_stats}',
  '[
    {"label": "Idea & Research", "percentage": 90},
    {"label": "Wirfirm & Design", "percentage": 95},
    {"label": "Developing & Launch", "percentage": 88}
  ]'::jsonb
)
WHERE page_slug = 'about';