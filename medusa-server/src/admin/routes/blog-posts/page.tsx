import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Table, StatusBadge, usePrompt, toast } from "@medusajs/ui"
import { PencilSquare, Trash } from "@medusajs/icons"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchBlogPosts, deleteBlogPost, BlogPost } from "../../hooks/blog"

const BlogPostsPage = () => {
  const { id } = useParams()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const navigate = useNavigate()
  const prompt = usePrompt()

  const load = () => {
    setLoading(true)
    fetchBlogPosts()
      .then(setPosts)
      .catch(() => toast.error("Error", { description: "Failed to load posts" }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (deleteId: string, title: string) => {
    const confirmed = await prompt({
      title: "Delete post",
      description: `Are you sure you want to delete "${title}"?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    })
    if (!confirmed) return
    setDeleting(deleteId)
    try {
      await deleteBlogPost(deleteId)
      setPosts((prev) => prev.filter((p) => p.id !== deleteId))
      toast.success("Post deleted", { description: `"${title}" has been deleted` })
    } catch {
      toast.error("Error", { description: "Failed to delete post" })
    } finally {
      setDeleting(null)
    }
  }

  if (id) {
    return <Outlet />
  }

  return (
    <>
      <Outlet />
      <Container>
        <div className="flex items-center justify-between mb-6">
          <div>
            <Heading>Blog Posts</Heading>
            <Text className="text-ui-fg-subtle mt-1">
              Manage your blog posts
            </Text>
          </div>
        </div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Published</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <Text className="text-ui-fg-muted">Loading...</Text>
                </Table.Cell>
              </Table.Row>
            ) : posts.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <Text className="text-ui-fg-muted">No records found</Text>
                </Table.Cell>
              </Table.Row>
            ) : (
              posts.map((post) => (
                <Table.Row
                  key={post.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/blog-posts/${post.id}`)}
                >
                  <Table.Cell>
                    <Text size="small" weight="plus">{post.title}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="small">{post.author}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <StatusBadge color={post.published_at ? "green" : "grey"}>
                      {post.published_at ? "Published" : "Draft"}
                    </StatusBadge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="small">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
                        : "-"}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <PencilSquare
                        className="text-ui-fg-interactive cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/blog-posts/${post.id}`)
                        }}
                      />
                      <Trash
                        className={`cursor-pointer ${deleting === post.id ? "opacity-50" : "text-ui-fg-danger"}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(post.id, post.title)
                        }}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </Container>
    </>
  )
}

export const config = defineRouteConfig({
  label: "Blog Posts",
  rank: 100,
})

export default BlogPostsPage
