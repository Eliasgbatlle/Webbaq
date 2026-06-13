import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getProduct } from "@/lib/medusa"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}

  return {
    title: `${product.title} - WebBAQ`,
    description: product.description,
  }
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const price = product.variants?.[0]?.prices?.find(
    (p) => p.currency_code === "cop"
  ) || product.variants?.[0]?.prices?.[0]

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <Link
          href="/productos"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          ← Volver a productos
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Sin imagen
              </div>
            )}
          </div>

          <div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {product.title}
            </h1>

            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {price && (
              <p className="mb-6 text-3xl font-bold text-primary">
                ${(price.amount / 100).toLocaleString("es-CO")}
                <span className="text-lg font-normal text-muted-foreground">
                  {" "}
                  COP
                </span>
              </p>
            )}

            <Link
              href="/contacto"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Solicitar este servicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
