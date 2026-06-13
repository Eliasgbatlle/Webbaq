export type BlogPost = {
  id: string
  title: string
  slug: string
  content: any
  excerpt: string | null
  featured_image: string | null
  author: string
  tags: string[] | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch("/admin/blog", { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch blog posts")
  const data = await res.json()
  return data.blog_posts as BlogPost[]
}

export async function fetchBlogPost(id: string): Promise<BlogPost> {
  const res = await fetch(`/admin/blog/${id}`, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch blog post")
  const data = await res.json()
  return data.blog_post as BlogPost
}

export async function updateBlogPost(id: string, payload: Record<string, any>): Promise<void> {
  const res = await fetch(`/admin/blog/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to update blog post")
}

export async function deleteBlogPost(id: string): Promise<void> {
  const res = await fetch(`/admin/blog/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to delete blog post")
}
