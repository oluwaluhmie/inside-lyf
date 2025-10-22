-- Assign super_admin role to oeolumide@gmail.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('c14c0c91-8ae9-4c79-8fd1-2797cc13e275', 'super_admin');

-- Create profile for the user
INSERT INTO public.profiles (id, email, full_name)
VALUES (
  'c14c0c91-8ae9-4c79-8fd1-2797cc13e275',
  'oeolumide@gmail.com',
  'Super Admin'
);