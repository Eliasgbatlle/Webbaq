import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Drawer, Button, Heading, Input, Label, Textarea, toast } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchBlogPost, updateBlogPost, BlogPost } from "../../../../hooks/blog"

type FormData = {
  title: string
  slug: string
  author: string
  excerpt: string
  tags: string
  content_body: string
  published_at: string
}

const BlogPostEditDrawer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormData>({
    title: "",
    slug: "",
    author: "",
    excerpt: "",
    tags: "",
    content_body: "",
    published_at: "",
  })

  useEffect(() => {
    setOpen(true)
    if (!id) return
    fetchBlogPost(id)
      .then((p) => {
        setPost(p)
        setForm({
          title: p.title,
          slug: p.slug,
          author: p.author,
          excerpt: p.excerpt || "",
          tags: p.tags?.join(", ") || "",
          content_body: p.content?.body || "",
          published_at: p.published_at ? p.published_at.split("T")[0] : "",
        })
      })
      .catch(() => toast.error("Error", { description: "Failed to load post" }))
      .finally(() => setLoading(false))
  }, [id])

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => navigate("/blog-posts", { replace: true }), 200)
  }

  const handleSave = async () => {
    if (!id) return
    setSaving(true)
    try {
      const payload: Record<string, any> = {
        title: form.title,
        slug: form.slug,
        author: form.author,
        excerpt: form.excerpt || null,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        content: { body: form.content_body },
      }

      if (form.published_at) {
        payload.published_at = new Date(form.published_at).toISOString()
      } else {
        payload.published_at = null
      }

      await updateBlogPost(id, payload)
      toast.success("Post updated", { description: `"${form.title}" has been saved` })
      navigate("/blog-posts", { replace: true })
    } catch {
      toast.error("Error", { description: "Failed to save post" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return null

  return (
    <Drawer open={open} onOpenChange={(open) => { if (!open) handleClose() }}>
      <Drawer.Content>
        <Drawer.Header>
          <Heading>{post?.title || "Edit Post"}</Heading>
        </Drawer.Header>
        <Drawer.Body>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Author</Label>
              <Input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Excerpt</Label>
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Tags (comma separated)</Label>
              <Input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Content (HTML)</Label>
              <Textarea
                rows={12}
                value={form.content_body}
                onChange={(e) => setForm({ ...form, content_body: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Publish date</Label>
              <Input
                type="date"
                value={form.published_at}
                onChange={(e) => setForm({ ...form, published_at: e.target.value })}
              />
            </div>
          </div>
        </Drawer.Body>
        <Drawer.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}

export const config = defineRouteConfig({
  label: "Edit Post",
})

export default BlogPostEditDrawer
