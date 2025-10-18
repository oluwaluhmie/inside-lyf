-- Remove the duplicate 'user' role from super_admin account
DELETE FROM public.user_roles 
WHERE user_id = 'c14c0c91-8ae9-4c79-8fd1-2797cc13e275' 
AND role = 'user';