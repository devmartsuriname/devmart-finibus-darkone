-- Add unique constraint on storage_path for upsert support
ALTER TABLE public.media ADD CONSTRAINT media_storage_path_unique UNIQUE (storage_path);