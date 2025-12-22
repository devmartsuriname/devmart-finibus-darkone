-- Add storage UPDATE policy for admins to allow upsert when files already exist
CREATE POLICY "Admins can update media files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'media' 
  AND has_role(auth.uid(), 'admin'::app_role)
);