import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { slug } = req.params
  const blogService = req.scope.resolve("blog")
  const posts = await blogService.listBlogPosts({ slug })

  if (!posts.length) {
    return res.status(404).json({ message: "Blog post not found" })
  }

  const post = posts[0]

  if (!post.published_at || new Date(post.published_at) > new Date()) {
    return res.status(404).json({ message: "Blog post not found" })
  }

  res.json({ blog_post: post })
}
