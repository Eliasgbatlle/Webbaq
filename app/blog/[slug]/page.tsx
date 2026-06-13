import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getBlogPost, getBlogPosts } from "@/lib/medusa"

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts()
    return posts.map((post) => ({ slug: post.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}

  return {
    title: `${post.title} - WebBAQ Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <article className="mx-auto max-w-3xl px-4">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          ← Volver al blog
        </Link>

        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>Por {post.author}</span>
          <span>•</span>
          <time dateTime={post.published_at}>
            {new Date(post.published_at).toLocaleDateString("es-CO", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content?.body || "" }}
        />
      </article>
    </main>
  )
}
