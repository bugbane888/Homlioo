-- ============================================
-- MIGRATION 004: check_email_exists RPC function
-- Run this in Supabase SQL Editor
-- ============================================

-- This function is used during signup and password reset to check
-- whether an email already has a registered account, without
-- exposing the full auth.users table to unauthenticated callers.
-- It uses SECURITY DEFINER so it can access auth.users safely.

CREATE OR REPLACE FUNCTION public.check_email_exists(check_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  email_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO email_count
  FROM auth.users
  WHERE email = LOWER(TRIM(check_email));

  RETURN email_count > 0;
END;
$$;

-- Grant execute to anonymous and authenticated roles
GRANT EXECUTE ON FUNCTION public.check_email_exists(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.check_email_exists(TEXT) TO authenticated;
