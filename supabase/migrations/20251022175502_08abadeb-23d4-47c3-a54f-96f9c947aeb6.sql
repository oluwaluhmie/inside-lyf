-- Assign super_admin role to enuelbassey1@gmail.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('85005514-e233-432d-9c73-e139a2946b67', 'super_admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Ensure profile exists for the user
INSERT INTO public.profiles (id, email, full_name)
VALUES (
  '85005514-e233-432d-9c73-e139a2946b67',
  'enuelbassey1@gmail.com',
  'Super Admin'
)
ON CONFLICT (id) DO UPDATE 
SET email = EXCLUDED.email;