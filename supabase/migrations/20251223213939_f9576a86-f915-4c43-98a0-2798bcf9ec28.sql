-- Phase 5.4+ Hotfix: Projects Parity + Public RLS
-- Adds new columns to projects table for Project Details page parity
-- Creates project_process_steps table (mirrors service_process_steps pattern)
-- Adds public RLS policies for projects

-- ============================================
-- 1. Add new columns to projects table
-- ============================================
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS start_date date,
ADD COLUMN IF NOT EXISTS end_date date,
ADD COLUMN IF NOT EXISTS check_launch_content text,
ADD COLUMN IF NOT EXISTS check_launch_image_media_id uuid REFERENCES public.media(id) ON DELETE SET NULL;

-- ============================================
-- 2. Create project_process_steps table
-- ============================================
CREATE TABLE IF NOT EXISTS public.project_process_steps (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    step_number integer NOT NULL,
    title text NOT NULL,
    description text,
    image_media_id uuid REFERENCES public.media(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT project_process_steps_unique_step UNIQUE(project_id, step_number)
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_project_process_steps_project_id 
ON public.project_process_steps(project_id);

-- Trigger for updated_at
CREATE TRIGGER update_project_process_steps_updated_at
    BEFORE UPDATE ON public.project_process_steps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.project_process_steps ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. RLS Policies for project_process_steps
-- ============================================

-- Admin policies (CRUD)
CREATE POLICY "Admins can create project steps"
ON public.project_process_steps FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all project steps"
ON public.project_process_steps FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project steps"
ON public.project_process_steps FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project steps"
ON public.project_process_steps FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Public read access for steps of published projects
CREATE POLICY "Public can view steps of published projects"
ON public.project_process_steps FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = project_process_steps.project_id
        AND projects.status = 'published'
    )
);

-- ============================================
-- 4. Public RLS Policy for projects table
-- ============================================
CREATE POLICY "Public can view published projects"
ON public.projects FOR SELECT
USING (status = 'published');