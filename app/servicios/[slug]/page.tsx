import { services, getServiceBySlug } from "@/lib/services"
import { ServicePage, generateServiceMetadata } from "@/components/ServicePage"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return generateServiceMetadata(service)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return <ServicePage slug={slug} />
}
