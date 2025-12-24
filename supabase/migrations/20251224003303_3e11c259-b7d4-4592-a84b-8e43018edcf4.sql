-- Phase 5.5 Blog Parity Hotfix — Seed Data Backfill
-- Updates blog posts with Finibus-style lorem ipsum content for demo parity

-- Update post 1: future-of-digital-business-strategy
UPDATE public.blog_posts
SET 
  title = 'Nullam lacinia magna vitae mi tincidunt tudou owner Dolebon li faucibus Aenean nec eros sagittis.',
  excerpt = 'Donec bibendum enim ut elit porta ullamcorper. Vestibulum quam nulla, venenatis eget dapibus ac iaculis vitae nulla. Morbi mattis nec mi ac mollis.',
  content = '<p>Donec bibendum enim ut elit porta ullamcorper. Vestibulum quam nulla, venenatis eget dapibus ac iaculis vitae nulla. Morbi mattis nec mi ac mollis. Nam et consequat tellus, a varius magna. Curabitu iaculis, ligula vitae commodo blandit, augue urna accumsan sapien, at accumsan metus dolor eu ju Vivamus pharetra ullamcorper efficitur. Vestibulum at ex in massa consequat faucibus. Nullam and gravida ex nisl, semper lacinia urna mattis vel. Nullam pharetra aliquam sapien.</p><h4>Curabitur semper quam sit amet lacus venenatis, iaculis.</h4><p>Donec bibendum enim ut elit porta ullamcorper. Vestibulum quam nulla, venenatis eget dapibus ac iaculis vitae nulla. Morbi mattis nec mi ac mollis. Nam et consequat tellus, a varius magna. Curabituiaculis, ligula vitae commodo blandit, augue urna accumsan sapien, at accumsan metus dolor eu juVivamus pharetra ullamcorper efficitur.</p>',
  category = 'Website',
  featured_image_media_id = '6782fdae-6e39-4769-a50b-c039b168e4fe'
WHERE slug = 'future-of-digital-business-strategy';

-- Update post 2: building-scalable-web-applications-2025
UPDATE public.blog_posts
SET 
  title = 'Aenean molestie enim vel elementum sodales elitmagna condimentum lorem nec pretium.',
  excerpt = 'Quisque ut dui pulvinar, sagittis mi vitae, posuere justo. Ut ac metus porta orci posuere tegestas. Donec suscipit dapibus purus at pretium.',
  content = '<p>Quisque ut dui pulvinar, sagittis mi vitae, posuere justo. Ut ac metus porta orci posuere tegestas. Donec suscipit dapibus purus at pretium. Morbi ullamcorper vulputate nibh eu tempus. Fuvestibulum hendrerit dapibus. Nam lobortis urna vel augue pellentesque lobortis. Cras non pharetrturpis. In tincidunt lacus et fringilla malesuada.</p><h4>Vestibulum at ex in massa consequat faucibus nullam.</h4><p>Aenean molestie, enim vel elementum sodales, elitmagna condimentum lorem, nec pretium nunc felis sed nulla. In efficitur dignissim velit, sed varius dapibus quis. Maecenas finibus purus sit amet sem consequat faucibus.</p>',
  category = 'Software Design',
  featured_image_media_id = 'd159e397-5dcf-4136-892f-763502a86975'
WHERE slug = 'building-scalable-web-applications-2025';

-- Update post 3: ux-design-principles-modern-web
UPDATE public.blog_posts
SET 
  title = 'Maecenas finibus purus sit amet sem consequat faucibus nullam gravida ex nisl.',
  excerpt = 'Nam lobortis urna vel augue pellentesque lobortis. Cras non pharetrturpis. In tincidunt lacus et fringilla malesuada aenean molestie.',
  content = '<p>Nam lobortis urna vel augue pellentesque lobortis. Cras non pharetrturpis. In tincidunt lacus et fringilla malesuada. Aenean molestie, enim vel elementum sodales, elitmagna condimentum lorem, nec pretium nunc felis sed nulla. In efficitur dignissim velit, sed varius dapibus quis.</p><h4>Donec bibendum enim ut elit porta ullamcorper vestibulum.</h4><p>Vestibulum quam nulla, venenatis eget dapibus ac iaculis vitae nulla. Morbi mattis nec mi ac mollis. Nam et consequat tellus, a varius magna. Curabitu iaculis, ligula vitae commodo blandit.</p>',
  category = 'UI/UX Design',
  featured_image_media_id = '55c44637-efcd-41b0-9796-c25e042e9f4b'
WHERE slug = 'ux-design-principles-modern-web';

-- Update post 4: cloud-migration-strategies
UPDATE public.blog_posts
SET 
  title = 'Vestibulum hendrerit dapibus nam lobortis urna vel augue pellentesque lobortis cras.',
  excerpt = 'Curabitu iaculis, ligula vitae commodo blandit, augue urna accumsan sapien, at accumsan metus dolor eu ju Vivamus pharetra ullamcorper.',
  content = '<p>Curabitu iaculis, ligula vitae commodo blandit, augue urna accumsan sapien, at accumsan metus dolor eu ju Vivamus pharetra ullamcorper efficitur. Vestibulum at ex in massa consequat faucibus. Nullam and gravida ex nisl, semper lacinia urna mattis vel.</p><h4>Nullam pharetra aliquam sapien duis aliquet varius commodo.</h4><p>Duis aliquet varius commodo. Quisque ut dui pulvinar, sagittis mi vitae, posuere justo. Ut ac metus porta orci posuere tegestas. Donec suscipit dapibus purus at pretium.</p>',
  category = 'Technology',
  featured_image_media_id = 'ac2f110e-26eb-4c80-8635-a786b16e9af4'
WHERE slug = 'cloud-migration-strategies';

-- Update post 5: api-integration-best-practices
UPDATE public.blog_posts
SET 
  title = 'Morbi ullamcorper vulputate nibh eu tempus fuvestibulum hendrerit dapibus nam lobortis.',
  excerpt = 'Nullam and gravida ex nisl, semper lacinia urna mattis vel. Nullam pharetra aliquam sapien. Duis aliquet varius commodo quisque.',
  content = '<p>Nullam and gravida ex nisl, semper lacinia urna mattis vel. Nullam pharetra aliquam sapien. Duis aliquet varius commodo. Quisque ut dui pulvinar, sagittis mi vitae, posuere justo. Ut ac metus porta orci posuere tegestas.</p><h4>Donec suscipit dapibus purus at pretium morbi ullamcorper.</h4><p>Morbi ullamcorper vulputate nibh eu tempus. Fuvestibulum hendrerit dapibus. Nam lobortis urna vel augue pellentesque lobortis. Cras non pharetrturpis. In tincidunt lacus et fringilla malesuada.</p>',
  category = 'Development',
  featured_image_media_id = 'f1289f86-f3ef-46a2-97da-d083ec66de5d'
WHERE slug = 'api-integration-best-practices';

-- Update post 6: cybersecurity-essentials
UPDATE public.blog_posts
SET 
  title = 'Cras non pharetrturpis in tincidunt lacus et fringilla malesuada aenean molestie enim.',
  excerpt = 'In efficitur dignissim velit, sed varius dapibus quis. Maecenas finibus purus sit amet sem consequat faucibus donec bibendum.',
  content = '<p>In efficitur dignissim velit, sed varius dapibus quis. Maecenas finibus purus sit amet sem consequat faucibus. Donec bibendum enim ut elit porta ullamcorper. Vestibulum quam nulla, venenatis eget dapibus ac iaculis vitae nulla.</p><h4>Morbi mattis nec mi ac mollis nam et consequat tellus.</h4><p>Nam et consequat tellus, a varius magna. Curabitu iaculis, ligula vitae commodo blandit, augue urna accumsan sapien, at accumsan metus dolor eu ju Vivamus pharetra ullamcorper efficitur.</p>',
  category = 'Security',
  featured_image_media_id = 'ab091553-041b-42b1-8943-e3a6fcdc792a'
WHERE slug = 'cybersecurity-essentials';