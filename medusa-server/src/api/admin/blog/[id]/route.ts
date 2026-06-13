import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve("blog")
  const { id } = req.params
  const posts = await blogService.listBlogPosts({ id })
  if (!posts.length) return res.status(404).json({ message: "Blog post not found" })
  res.json({ blog_post: posts[0] })
}

export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve("blog")
  const { id } = req.params
  const posts = await blogService.listBlogPosts({ id })
  if (!posts.length) return res.status(404).json({ message: "Blog post not found" })
  const updated = await blogService.updateBlogPosts({ id, ...req.body })
  res.json({ blog_post: updated })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve("blog")
  const { id } = req.params
  const posts = await blogService.listBlogPosts({ id })
  if (!posts.length) return res.status(404).json({ message: "Blog post not found" })
  await blogService.softDeleteBlogPosts([id])
  res.status(200).json({ success: true })
}
