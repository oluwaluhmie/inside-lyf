-- Fix 1: Restrict profiles table to prevent public email exposure
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a policy that allows authenticated users to view all profiles
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

-- Create a policy that allows users to view only basic profile info (excluding email) when not authenticated
-- Note: This requires using a view for public access or just requiring authentication
-- For now, we'll require authentication to view any profiles

-- Fix 2: Secure newsletter subscriptions UPDATE policy
-- Drop the insecure policy
DROP POLICY IF EXISTS "Users can update own subscription" ON public.newsletter_subscriptions;

-- Create a secure policy that only allows users to update their own subscriptions
CREATE POLICY "Users can update own subscription"
ON public.newsletter_subscriptions FOR UPDATE
USING (
  auth.uid() = user_id OR 
  email = auth.email()
)
WITH CHECK (
  auth.uid() = user_id OR 
  email = auth.email()
);