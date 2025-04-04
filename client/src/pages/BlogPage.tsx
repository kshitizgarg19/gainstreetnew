import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/lib/types";
import { format } from "date-fns";

export default function BlogPage() {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Market <span className="text-secondary">Insights</span>
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Stay informed with our latest analysis, trading strategies, and market forecasts.
        </p>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="premium-card overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-7 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-5 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 p-8">
            <p>Error loading blog posts. Please try again later.</p>
          </div>
        )}

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="premium-card overflow-hidden shadow-lg hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs text-gray-500">
                      {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-secondary">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-secondary hover:text-secondary/80 font-medium flex items-center">
                    Read More <i className="fas fa-arrow-right ml-2 text-sm"></i>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="text-center p-8">
              <p>No blog posts found.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
