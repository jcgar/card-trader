
import { useEffect, useState } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/use/api/blogPosts";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <NavigationBar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Blog</h1>
          <p className="text-green-600 max-w-2xl mx-auto">
            Descubre las últimas novedades, consejos y trucos del mundo del coleccionismo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <Button variant="ghost" className="group-hover:translate-x-2 transition-transform p-0">
                    Leer más <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;
