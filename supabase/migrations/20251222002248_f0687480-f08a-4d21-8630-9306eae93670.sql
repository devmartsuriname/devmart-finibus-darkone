-- Promote info@devmart.sr to admin role
INSERT INTO public.user_roles (user_id, role) 
VALUES ('d8e4fc7d-e459-482d-a7b7-4765950c4179', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;