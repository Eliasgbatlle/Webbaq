import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve("blog")
  const posts = await blogService.listBlogPosts()
  res.json({ blog_posts: posts })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve("blog")
  const post = await blogService.createBlogPosts(req.body)
  res.json({ blog_post: post })
}
