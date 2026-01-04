-- ============================================
-- Phase 13.1 Migration: Notifications + Profiles
-- ============================================

-- ============================================
-- 1. CREATE NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies (HARDENED with explicit WITH CHECK)
CREATE POLICY "Users can view own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Admins can insert notifications (for triggers)
CREATE POLICY "System can insert notifications"
ON public.notifications FOR INSERT
WITH CHECK (true);

-- Performance index for unread notifications
CREATE INDEX idx_notifications_user_unread 
ON public.notifications(user_id, is_read) 
WHERE is_read = false;

CREATE INDEX idx_notifications_user_created
ON public.notifications(user_id, created_at DESC);

-- ============================================
-- 2. CREATE PROFILES TABLE
-- ============================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies (HARDENED with explicit WITH CHECK)
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- System can insert profiles (for trigger)
CREATE POLICY "System can insert profiles"
ON public.profiles FOR INSERT
WITH CHECK (true);

-- Updated_at trigger (uses existing function)
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 3. MULTI-ROLE HELPER FUNCTIONS
-- ============================================

-- Editor role check (admin or moderator)
CREATE OR REPLACE FUNCTION public.has_editor_role(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id
        AND role IN ('admin', 'moderator')
    )
$$;

-- Viewer role check (any authenticated role)
CREATE OR REPLACE FUNCTION public.has_viewer_role(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id
        AND role IN ('admin', 'moderator', 'user')
    )
$$;

-- ============================================
-- 4. PROFILE AUTO-CREATION TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name)
    VALUES (
        NEW.id, 
        COALESCE(
            NEW.raw_user_meta_data->>'display_name', 
            split_part(NEW.email, '@', 1)
        )
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 5. NOTIFICATION TRIGGERS
-- ============================================

-- New Lead notification trigger
CREATE OR REPLACE FUNCTION public.notify_admins_new_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    SELECT ur.user_id, 'new_lead', 'New Lead Received',
           'A new lead from ' || NEW.name || ' has been submitted.',
           '/crm/leads'
    FROM public.user_roles ur
    WHERE ur.role = 'admin';
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_lead_created
AFTER INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.notify_admins_new_lead();

-- New Quote notification trigger
CREATE OR REPLACE FUNCTION public.notify_admins_new_quote()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    SELECT ur.user_id, 'new_quote', 'New Quote Submitted',
           'Quote #' || NEW.reference_number || ' has been submitted.',
           '/crm/quotes'
    FROM public.user_roles ur
    WHERE ur.role = 'admin';
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_quote_created
AFTER INSERT ON public.quotes
FOR EACH ROW EXECUTE FUNCTION public.notify_admins_new_quote();

-- ============================================
-- 6. BACKFILL PROFILES FOR EXISTING USERS
-- ============================================
INSERT INTO public.profiles (id, display_name)
SELECT 
    id,
    COALESCE(
        raw_user_meta_data->>'display_name',
        split_part(email, '@', 1)
    )
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;