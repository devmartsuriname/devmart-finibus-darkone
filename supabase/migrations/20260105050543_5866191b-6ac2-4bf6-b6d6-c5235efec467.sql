-- Create SECURITY DEFINER function to get admin user list
-- This function joins auth.users with profiles and user_roles
-- Only admins can call this function (enforced inside)

CREATE OR REPLACE FUNCTION public.get_admin_user_list()
RETURNS TABLE (
    user_id UUID,
    email TEXT,
    display_name TEXT,
    avatar_url TEXT,
    role TEXT,
    created_at TIMESTAMPTZ,
    last_sign_in_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Verify caller is admin
    IF NOT public.has_role(auth.uid(), 'admin') THEN
        RAISE EXCEPTION 'Access denied: admin role required';
    END IF;

    RETURN QUERY
    SELECT 
        u.id AS user_id,
        u.email::TEXT,
        COALESCE(p.display_name, split_part(u.email, '@', 1))::TEXT AS display_name,
        p.avatar_url::TEXT,
        COALESCE(ur.role::TEXT, 'user') AS role,
        u.created_at,
        u.last_sign_in_at
    FROM auth.users u
    LEFT JOIN public.profiles p ON p.id = u.id
    LEFT JOIN public.user_roles ur ON ur.user_id = u.id
    ORDER BY u.created_at DESC;
END;
$$;

-- Grant execute to authenticated users (admin check is inside function)
GRANT EXECUTE ON FUNCTION public.get_admin_user_list() TO authenticated;