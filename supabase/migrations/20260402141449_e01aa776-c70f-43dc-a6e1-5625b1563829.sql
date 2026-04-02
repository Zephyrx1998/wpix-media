ALTER TABLE public.blog_posts 
ADD COLUMN blog_type text NOT NULL DEFAULT 'native',
ADD COLUMN external_url text;
