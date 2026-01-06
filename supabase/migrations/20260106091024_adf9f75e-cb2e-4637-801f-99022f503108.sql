-- Add view_count column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN view_count integer NOT NULL DEFAULT 0;

-- Create a function to increment view count (can be called by anyone for public posts)
CREATE OR REPLACE FUNCTION public.increment_blog_view(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.blog_posts 
  SET view_count = view_count + 1 
  WHERE id = post_id AND is_published = true;
END;
$$;