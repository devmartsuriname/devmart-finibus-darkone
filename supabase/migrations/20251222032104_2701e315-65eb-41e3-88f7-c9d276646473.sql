-- Phase 4A.2: Allow admin users to upload media to any path in the media bucket
-- This is required for template seeding (Finibus assets) and future shared assets
-- The policy uses the existing has_role() security definer function to check admin status

CREATE POLICY "Admins can upload media to any path"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media' AND 
  public.has_role(auth.uid(), 'admin'::app_role)
);