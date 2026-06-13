import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve("blog")
  const posts = await blogService.listBlogPosts()

  const publishedPosts = posts
    .filter((p: any) => p.published_at && new Date(p.published_at) <= new Date())
    .sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      featured_image: p.featured_image,
      author: p.author,
      tags: p.tags,
      published_at: p.published_at,
    }))

  res.json({ blog_posts: publishedPosts })
}
