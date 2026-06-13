import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Button, StatusBadge, usePrompt, toast } from "@medusajs/ui"
import { PencilSquare, Trash } from "@medusajs/icons"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchBlogPost, deleteBlogPost, BlogPost } from "../../../hooks/blog"

const BlogPostDetailPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()
  const prompt = usePrompt()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetchBlogPost(id)
      .then(setPost)
      .catch(() => toast.error("Error", { description: "Failed to load post" }))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!post || !id) return
    const confirmed = await prompt({
      title: "Delete post",
      description: `Are you sure you want to delete "${post.title}"?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    })
    if (!confirmed) return

    setDeleting(true)
    try {
      await deleteBlogPost(id)
      toast.success("Post deleted", { description: `"${post.title}" has been deleted` })
      navigate("/blog-posts")
    } catch {
      toast.error("Error", { description: "Failed to delete post" })
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    )
  }

  if (!post) {
    return (
      <Container>
        <Text>Post not found</Text>
      </Container>
    )
  }

  return (
    <>
      <Outlet />
      <Container>
        <div className="flex items-center justify-between mb-6">
          <div>
            <Heading>{post.title}</Heading>
            <Text className="text-ui-fg-subtle mt-1">
              <StatusBadge color={post.published_at ? "green" : "grey"}>
                {post.published_at ? "Published" : "Draft"}
              </StatusBadge>
              <span className="ml-2">by {post.author}</span>
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => navigate(`/blog-posts/${id}/edit`)}
            >
              <PencilSquare /> Edit
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              <Trash /> {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <Text size="small" weight="plus" className="text-ui-fg-subtle mb-1">
              Slug
            </Text>
            <Text>{post.slug}</Text>
          </div>
          <div>
            <Text size="small" weight="plus" className="text-ui-fg-subtle mb-1">
              Excerpt
            </Text>
            <Text>{post.excerpt || "-"}</Text>
          </div>
          <div>
            <Text size="small" weight="plus" className="text-ui-fg-subtle mb-1">
              Tags
            </Text>
            <Text>{post.tags?.join(", ") || "-"}</Text>
          </div>
          {post.published_at && (
            <div>
              <Text size="small" weight="plus" className="text-ui-fg-subtle mb-1">
                Published at
              </Text>
              <Text>{new Date(post.published_at).toLocaleDateString()}</Text>
            </div>
          )}
          <div>
            <Text size="small" weight="plus" className="text-ui-fg-subtle mb-1">
              Content
            </Text>
            <div
              className="bg-ui-bg-component p-4 rounded-md"
              dangerouslySetInnerHTML={{ __html: post.content?.body || "" }}
            />
          </div>
        </div>
      </Container>
    </>
  )
}

export const config = defineRouteConfig({
  label: "Post Detail",
})

export default BlogPostDetailPage
