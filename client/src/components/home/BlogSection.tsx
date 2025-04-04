import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function BlogSection() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="blog" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-playfair font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Market <span className="text-secondary">Insights</span>
        </motion.h2>
        <motion.p 
          className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Stay informed with our latest analysis, trading strategies, and market forecasts.
        </motion.p>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="overflow-hidden shadow-lg">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-4 mx-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-28" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {posts?.slice(0, 3).map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="premium-card bg-white shadow-lg hover:shadow-xl rounded-md overflow-hidden">
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
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/blog" className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-sm transition duration-300">
            View All Insights
          </Link>
        </div>
      </div>
    </section>
  );
}
