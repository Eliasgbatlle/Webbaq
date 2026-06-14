import Link from "next/link"
import type { Metadata } from "next"
import { getBlogPosts, type BlogPostSummary } from "@/lib/medusa"
import { ChevronRight } from "lucide-react"

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
            <span className="text-white/80">Blog</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-400 mb-6">
              Artículos y guías
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display tracking-tight leading-[1.05] text-white mb-6">
              Blog
            </h1>
            <p className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed">
              Artículos sobre diseño web, SEO local, marketing digital y consejos para tu negocio en Barranquilla y Colombia.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No hay artículos publicados aún.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group p-8 border border-foreground/10 bg-card/50 backdrop-blur-sm rounded-2xl hover:border-emerald-500/30 transition-all duration-300"
                >
                  <article>
                    <p className="text-sm text-muted-foreground mb-3">
                      {new Date(post.published_at).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="text-xl lg:text-2xl font-display mb-3 group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-full text-sm text-muted-foreground"
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
      </section>
    </main>
  )
}
