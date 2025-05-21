"use client"
import { AppLayout } from "@/shared/components/layout/AppLayout"
import { Card } from "@/components/ui/card"
import { blogPosts } from "@/shared/use/api/blogPosts"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { t } from "@/shared/use/i18n"

const Blog = () => {
  const tabs = [
    {
      value: "all",
      label: t("blog.allPosts"),
      content: <BlogPosts posts={blogPosts} />,
    },
    {
      value: "news",
      label: t("blog.news"),
      content: <BlogPosts posts={blogPosts.filter((post) => post.category === "news")} />,
    },
    {
      value: "tips",
      label: t("blog.tips"),
      content: <BlogPosts posts={blogPosts.filter((post) => post.category === "tips")} />,
    },
    {
      value: "community",
      label: t("blog.community"),
      content: <BlogPosts posts={blogPosts.filter((post) => post.category === "community")} />,
    },
  ]

  return (
    <AppLayout tabs={tabs}>
    </AppLayout>
  )
}

const BlogPosts = ({ posts }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {posts.map((post, index) => (
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
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">{post.category}</span>
            </div>
            <h2 className="text-xl font-semibold mb-3 group-hover:text-green-600 transition-colors">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Button variant="ghost" className="group-hover:translate-x-2 transition-transform p-0">
              {t("blog.readMore")} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    ))}
  </div>
)

export default Blog

