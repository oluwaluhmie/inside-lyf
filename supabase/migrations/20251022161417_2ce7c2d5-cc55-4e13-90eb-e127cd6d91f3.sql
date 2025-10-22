-- Clear all stories and discussions
-- Delete all comments
TRUNCATE TABLE public.comments CASCADE;

-- Delete all posts
TRUNCATE TABLE public.posts CASCADE;

-- Delete all community memberships except super admin's
DELETE FROM public.community_memberships 
WHERE user_id != 'c14c0c91-8ae9-4c79-8fd1-2797cc13e275';

-- Delete all community suggestions
TRUNCATE TABLE public.community_suggestions CASCADE;

-- Delete all newsletter subscriptions except super admin's
DELETE FROM public.newsletter_subscriptions 
WHERE user_id != 'c14c0c91-8ae9-4c79-8fd1-2797cc13e275';

-- Delete all user roles except super admin's
DELETE FROM public.user_roles 
WHERE user_id != 'c14c0c91-8ae9-4c79-8fd1-2797cc13e275';

-- Delete all profiles except super admin's
DELETE FROM public.profiles 
WHERE id != 'c14c0c91-8ae9-4c79-8fd1-2797cc13e275';

-- Communities table remains untouched