-- Allow admins to insert media with any owner (for system seeding)
CREATE POLICY "Admins can insert media"
ON public.media
FOR INSERT
TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role)
);