-- Assign super_admin role to oeolumide@gmail.com
INSERT INTO public.user_roles (user_id, role, assigned_by)
VALUES (
  'c14c0c91-8ae9-4c79-8fd1-2797cc13e275',
  'super_admin',
  'c14c0c91-8ae9-4c79-8fd1-2797cc13e275'
)
ON CONFLICT (user_id, role) 
DO UPDATE SET 
  role = 'super_admin',
  assigned_at = now();