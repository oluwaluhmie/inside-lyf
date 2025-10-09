-- Create enum for community suggestion status
CREATE TYPE public.suggestion_status AS ENUM ('pending', 'approved', 'rejected');

-- Create community_suggestions table
CREATE TABLE public.community_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  suggested_by UUID NOT NULL,
  status suggestion_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID,
  admin_notes TEXT,
  CONSTRAINT title_length CHECK (char_length(title) >= 3 AND char_length(title) <= 100),
  CONSTRAINT description_length CHECK (char_length(description) >= 10 AND char_length(description) <= 500)
);

-- Enable RLS
ALTER TABLE public.community_suggestions ENABLE ROW LEVEL SECURITY;

-- Users can create suggestions
CREATE POLICY "Users can create community suggestions"
ON public.community_suggestions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = suggested_by);

-- Users can view their own suggestions
CREATE POLICY "Users can view their own suggestions"
ON public.community_suggestions
FOR SELECT
TO authenticated
USING (auth.uid() = suggested_by);

-- Admins can view all suggestions
CREATE POLICY "Admins can view all suggestions"
ON public.community_suggestions
FOR SELECT
TO authenticated
USING (
  public.get_user_role(auth.uid()) IN ('admin', 'super_admin', 'moderator')
);

-- Admins can update suggestions (approve/reject)
CREATE POLICY "Admins can update suggestions"
ON public.community_suggestions
FOR UPDATE
TO authenticated
USING (
  public.get_user_role(auth.uid()) IN ('admin', 'super_admin', 'moderator')
)
WITH CHECK (
  public.get_user_role(auth.uid()) IN ('admin', 'super_admin', 'moderator')
);

-- Create index for performance
CREATE INDEX idx_community_suggestions_status ON public.community_suggestions(status);
CREATE INDEX idx_community_suggestions_suggested_by ON public.community_suggestions(suggested_by);