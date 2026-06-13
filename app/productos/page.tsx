import Link from "next/link"
import type { Metadata } from "next"
import { getProducts, type ProductSummary } from "@/lib/medusa"

export const metadata: Metadata = {
  title: "Productos - WebBAQ | Diseño Web y SEO en Barranquilla",
  description:
    "Planes y servicios de diseño web, tiendas online y SEO local para tu negocio en Barranquilla.",
}

export default async function ProductosPage() {
  let products: ProductSummary[] = []
  try {
    products = await getProducts()
  } catch {
    console.warn("Medusa server not available, showing fallback")
  }

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Productos
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
          Planes y servicios de diseño web, tiendas online y SEO local para tu negocio.
        </p>

        {products.length === 0 ? (
          <p className="text-muted-foreground">No hay productos disponibles aún.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.handle}`}
                className="group rounded-lg border bg-card transition-colors hover:border-primary"
              >
                <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
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
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-semibold group-hover:text-primary">
                    {product.title}
                  </h2>
                  <p className="line-clamp-2 text-muted-foreground">
                    {product.description}
                  </p>
                  {product.collection && (
                    <span className="mt-3 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                      {product.collection}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
