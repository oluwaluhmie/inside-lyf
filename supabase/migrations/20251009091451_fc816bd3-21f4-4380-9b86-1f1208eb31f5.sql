-- Enable realtime for posts table
ALTER TABLE public.posts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;

-- Enable realtime for comments table
ALTER TABLE public.comments REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;