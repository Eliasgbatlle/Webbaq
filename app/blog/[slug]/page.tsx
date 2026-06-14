import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getBlogPost, getBlogPosts } from "@/lib/medusa"
import { ChevronRight, ArrowLeft } from "lucide-react"

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
    <main className="relative min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">{post.title}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
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
                        className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display tracking-tight leading-[1.05] text-white mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al blog
            </Link>
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content?.body || "" }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
