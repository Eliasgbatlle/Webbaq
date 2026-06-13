import Link from "next/link"
import type { Metadata } from "next"
import { getBlogPosts, type BlogPostSummary } from "@/lib/medusa"

export const metadata: Metadata = {
  title: "Blog - WebBAQ | Diseño Web y SEO en Barranquilla",
  description:
    "Artículos sobre diseño web, SEO local, marketing digital y consejos para tu negocio en Barranquilla y Colombia.",
}

export default async function BlogPage() {
  let posts: BlogPostSummary[] = []
  try {
    posts = await getBlogPosts()
  } catch {
    console.warn("Medusa server not available, showing fallback")
  }

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
          Artículos sobre diseño web, SEO local, marketing digital y consejos para tu negocio.
        </p>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No hay artículos publicados aún.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-lg border bg-card p-6 transition-colors hover:border-primary"
              >
                <article>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {new Date(post.published_at).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="mb-2 text-xl font-semibold group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mb-4 line-clamp-3 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
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
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
