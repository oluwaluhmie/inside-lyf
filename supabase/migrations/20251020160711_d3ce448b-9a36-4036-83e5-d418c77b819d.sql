-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  unsubscribe_token uuid DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable RLS
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscriptions
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Users can view their own subscription
CREATE POLICY "Users can view own subscription"
ON public.newsletter_subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR email = auth.email());

-- Policy: Admins can view all subscriptions
CREATE POLICY "Admins can view all subscriptions"
ON public.newsletter_subscriptions
FOR SELECT
TO authenticated
USING (get_user_role(auth.uid()) = ANY (ARRAY['admin'::user_role, 'super_admin'::user_role]));

-- Policy: Users can unsubscribe (update their own)
CREATE POLICY "Users can update own subscription"
ON public.newsletter_subscriptions
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON public.newsletter_subscriptions(is_active) WHERE is_active = true;