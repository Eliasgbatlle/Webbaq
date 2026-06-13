import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getPage, getPages } from "@/lib/medusa"

export async function generateStaticParams() {
  try {
    const pages = await getPages()
    return pages.map((page) => ({ slug: page.slug }))
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
  const page = await getPage(slug)
  if (!page) return {}

  return {
    title: page.meta_title || `${page.title} - WebBAQ`,
    description: page.meta_description || undefined,
  }
}

export default async function CMSPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <article className="mx-auto max-w-3xl px-4">
        <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
          {page.title}
        </h1>
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: page.content?.body || "" }}
        />
      </article>
    </main>
  )
}
