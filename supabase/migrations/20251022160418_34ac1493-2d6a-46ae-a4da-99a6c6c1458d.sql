-- Clear all data from tables while preserving structure
-- Order matters due to foreign key constraints

-- Clear comments first (references posts)
TRUNCATE TABLE public.comments CASCADE;

-- Clear posts (references users and communities)
TRUNCATE TABLE public.posts CASCADE;

-- Clear community memberships (references communities and users)
TRUNCATE TABLE public.community_memberships CASCADE;

-- Clear community suggestions
TRUNCATE TABLE public.community_suggestions CASCADE;

-- Clear communities
TRUNCATE TABLE public.communities CASCADE;

-- Clear newsletter subscriptions
TRUNCATE TABLE public.newsletter_subscriptions CASCADE;

-- Clear user roles
TRUNCATE TABLE public.user_roles CASCADE;

-- Clear profiles (tied to auth.users but can be cleared)
TRUNCATE TABLE public.profiles CASCADE;