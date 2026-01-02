-- Create contact_leads table for website contact form submissions
CREATE TABLE public.contact_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email_encrypted TEXT,
  phone_encrypted TEXT,
  company_name TEXT,
  service_interested TEXT,
  message TEXT,
  page_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- RLS policies for contact_leads
CREATE POLICY "Allow public contact form submission" 
ON public.contact_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all contact leads" 
ON public.contact_leads 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contact leads" 
ON public.contact_leads 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact leads" 
ON public.contact_leads 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create fellowship_applications table
CREATE TABLE public.fellowship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email_encrypted TEXT,
  phone_encrypted TEXT,
  city TEXT,
  skill_interest TEXT,
  experience_level TEXT,
  motivation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fellowship_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for fellowship_applications
CREATE POLICY "Allow public fellowship application" 
ON public.fellowship_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all fellowship applications" 
ON public.fellowship_applications 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update fellowship applications" 
ON public.fellowship_applications 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete fellowship applications" 
ON public.fellowship_applications 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[],
  cover_image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  author_id UUID REFERENCES auth.users(id),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS policies for blog_posts
CREATE POLICY "Anyone can view published blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admins can view all blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create blog posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update blog posts" 
ON public.blog_posts 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete blog posts" 
ON public.blog_posts 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create page_views table for analytics
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- RLS policies for page_views
CREATE POLICY "Allow public page view tracking" 
ON public.page_views 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all page views" 
ON public.page_views 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for better query performance
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at);
CREATE INDEX idx_page_views_page_path ON public.page_views(page_path);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published);
CREATE INDEX idx_fellowship_applications_created_at ON public.fellowship_applications(created_at);
CREATE INDEX idx_contact_leads_created_at ON public.contact_leads(created_at);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policies for blog images
CREATE POLICY "Anyone can view blog images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update blog images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete blog images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for blog_posts updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create decrypted views for admin access
CREATE OR REPLACE FUNCTION public.get_decrypted_contact_leads()
RETURNS TABLE(
  id uuid, 
  name text, 
  email text, 
  phone text, 
  company_name text,
  service_interested text,
  message text,
  page_source text,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    cl.id,
    cl.name,
    decrypt_pii(cl.email_encrypted) as email,
    decrypt_pii(cl.phone_encrypted) as phone,
    cl.company_name,
    cl.service_interested,
    cl.message,
    cl.page_source,
    cl.created_at
  FROM public.contact_leads cl
  ORDER BY cl.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_decrypted_fellowship_applications()
RETURNS TABLE(
  id uuid, 
  full_name text, 
  email text, 
  phone text, 
  city text,
  skill_interest text,
  experience_level text,
  motivation text,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    fa.id,
    fa.full_name,
    decrypt_pii(fa.email_encrypted) as email,
    decrypt_pii(fa.phone_encrypted) as phone,
    fa.city,
    fa.skill_interest,
    fa.experience_level,
    fa.motivation,
    fa.created_at
  FROM public.fellowship_applications fa
  ORDER BY fa.created_at DESC;
END;
$$;