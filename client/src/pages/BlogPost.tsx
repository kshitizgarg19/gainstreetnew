import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/lib/types";
import { format } from "date-fns";

export default function BlogPostPage() {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${slug}`],
  });

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="flex items-center mb-6">
              <Skeleton className="h-4 w-32 mr-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-64 w-full mb-6" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
              <p className="mb-6">The blog post you are looking for does not exist or has been removed.</p>
              <Link 
                href="/blog" 
                className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded transition-colors"
              >
                Back to Blog
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-secondary mb-6 hover:underline"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to All Posts
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center mb-6">
            <span className="text-sm text-gray-500">
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </span>
            <span className="mx-3 text-gray-300">•</span>
            <span className="text-sm text-secondary font-medium">{post.category}</span>
          </div>
          
          <div className="mb-8 rounded-md overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1DA1F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                aria-label="Share on Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0077B5] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                aria-label="Share on LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#4267B2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                aria-label="Share on Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${window.location.href}`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                aria-label="Share on WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
