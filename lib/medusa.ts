const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000"

async function medusaFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${MEDUSA_URL}/custom${path}`
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Medusa API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export interface BlogPostSummary {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string | null
  author: string
  tags: string[]
  published_at: string
}

export interface BlogPost extends BlogPostSummary {
  content: any
  created_at: string
  updated_at: string
}

export interface ProductSummary {
  id: string
  title: string
  handle: string
  description: string
  thumbnail: string | null
  collection: string | null
}

export interface ProductVariant {
  id: string
  title: string
  sku: string | null
  prices: { amount: number; currency_code: string }[]
}

export interface Product extends ProductSummary {
  images: { url: string }[]
  variants: ProductVariant[]
}

export interface PageSummary {
  id: string
  title: string
  slug: string
  meta_title: string | null
  meta_description: string | null
}

export interface Page extends PageSummary {
  content: any
  published: boolean
  published_at: string | null
}

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  const data = await medusaFetch<{ blog_posts: BlogPostSummary[] }>("/blog")
  return data.blog_posts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const data = await medusaFetch<{ blog_post: BlogPost }>(`/blog/${slug}`)
    return data.blog_post
  } catch {
    return null
  }
}

export async function getProducts(): Promise<ProductSummary[]> {
  const data = await medusaFetch<{ products: ProductSummary[] }>("/products")
  return data.products
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const data = await medusaFetch<{ product: Product }>(`/products/${slug}`)
    return data.product
  } catch {
    return null
  }
}

export async function getPages(): Promise<PageSummary[]> {
  const data = await medusaFetch<{ pages: PageSummary[] }>("/pages")
  return data.pages
}

export async function getPage(slug: string): Promise<Page | null> {
  try {
    const data = await medusaFetch<{ page: Page }>(`/pages/${slug}`)
    return data.page
  } catch {
    return null
  }
}
