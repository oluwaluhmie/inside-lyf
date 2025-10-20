-- Fix security warnings by setting search_path on all functions

-- 1. Fix handle_updated_at function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- 2. Fix get_user_role function (already has search_path, but ensuring it's correct)
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid)
RETURNS user_role
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT role FROM public.user_roles 
  WHERE user_id = user_uuid 
  ORDER BY 
    CASE role 
      WHEN 'super_admin' THEN 1
      WHEN 'admin' THEN 2  
      WHEN 'moderator' THEN 3
      WHEN 'user' THEN 4
    END
  LIMIT 1;
$function$;

-- 3. Fix is_community_member function
CREATE OR REPLACE FUNCTION public.is_community_member(community_uuid uuid, user_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS(
    SELECT 1 FROM public.community_memberships 
    WHERE community_id = community_uuid AND user_id = user_uuid
  );
$function$;

-- 4. Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$function$;