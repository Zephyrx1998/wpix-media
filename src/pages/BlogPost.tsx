import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  tags: string[] | null;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt || "",
          url,
        });
      } catch (error) {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      
      <Navigation />
      
      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(post.published_at || post.created_at), "MMMM dd, yyyy")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {getReadingTime(post.content)} min read
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </header>

            {/* Cover Image */}
            {post.cover_image_url && (
              <div className="aspect-video rounded-xl overflow-hidden mb-8">
                <img 
                  src={post.cover_image_url} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <Link to="/blog">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    More Articles
                  </Button>
                </Link>
                <Button onClick={handleShare} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Article
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
