-- Delete user enuelbassey1@gmail.com from public tables
-- Remove from user_roles
DELETE FROM public.user_roles 
WHERE user_id = '85005514-e233-432d-9c73-e139a2946b67';

-- Remove from profiles
DELETE FROM public.profiles 
WHERE id = '85005514-e233-432d-9c73-e139a2946b67';