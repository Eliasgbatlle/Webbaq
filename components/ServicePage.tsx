import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { services, getServiceBySlug, Service } from "@/lib/services"
import { Check, ArrowRight, ChevronRight, MessageCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function ServiceSchema({ service }: Readonly<{ service: Service }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "WebBAQ",
      url: "https://webbaq.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barranquilla",
        addressRegion: "Atlántico",
        addressCountry: "CO",
      },
    },
    areaServed: [
      { "@type": "City", name: "Barranquilla" },
      { "@type": "City", name: "Soledad" },
      { "@type": "City", name: "Puerto Colombia" },
      { "@type": "State", name: "Atlántico" },
      { "@type": "Country", name: "Colombia" },
    ],
    offers: {
      "@type": "Offer",
      price: "60000",
      priceCurrency: "COP",
      priceValidUntil: "2026-12-31",
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function BreadcrumbSchema({ service }: Readonly<{ service: Service }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://webbaq.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: "https://webbaq.com/#services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://webbaq.com/servicios/${service.slug}`,
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function generateServiceMetadata(service: Service) {
  const baseTitle = service.title
  const baseDescription = service.description
  const url = `https://webbaq.com/servicios/${service.slug}`
  return {
    title: baseTitle,
    description: baseDescription,
    keywords: [
      service.shortTitle.toLowerCase(),
      "barranquilla",
      "atlántico",
      "colombia",
      "diseño web",
      "páginas web",
      "seo local",
      ...service.idealFor.map((i) => i.toLowerCase()),
    ],
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      url,
      siteName: "WebBAQ",
      locale: "es_CO",
      type: "website",
      images: [{ url: "https://webbaq.com/placeholder.jpg", width: 1200, height: 630, alt: `${service.title} - WebBAQ` }],
    },
    twitter: { card: "summary_large_image" as const, title: baseTitle, description: baseDescription, images: ["https://webbaq.com/placeholder.jpg"] },
    alternates: { canonical: url },
  }
}

export function ServicePage({ slug }: Readonly<{ slug: string }>) {
  const service = getServiceBySlug(slug)
  if (!service) notFound()
  const otherServices = services.filter((s) => s.slug !== slug)

  return (
    <>
      <ServiceSchema service={service} />
      <BreadcrumbSchema service={service} />
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
              <Link href="/#services" className="hover:text-emerald-400 transition-colors">Servicios</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">{service.shortTitle}</span>
            </nav>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-400 mb-6">
                <MessageCircle className="w-4 h-4" /> Barranquilla, Colombia
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display tracking-tight leading-[1.05] text-white mb-6">{service.title}</h1>
              <p className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed mb-8">{service.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/573022805235" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm font-medium transition-colors group">
                  Quiero este servicio <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link href="/#pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white hover:bg-white/10 rounded-full text-sm font-medium transition-colors">
                  Ver precios y planes
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Features */}
        <section className="relative py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <span className="inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6"><span className="w-12 h-px bg-emerald-500/50" /> Incluye</span>
                <h2 className="text-3xl md:text-4xl font-display tracking-tight leading-[1.05] mb-8">Todo lo que necesitas para<br /><span className="text-muted-foreground">crecer en Barranquilla</span></h2>
                <ul className="space-y-4">{service.features.map((f) => (<li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" /><span className="text-muted-foreground">{f}</span></li>))}</ul>
              </div>
              <div className="space-y-8">
                <div className="p-8 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl">
                  <h3 className="text-xl font-display mb-6">Beneficios</h3>
                  <ul className="space-y-4">{service.benefits.map((b) => (<li key={b} className="flex items-start gap-3"><ArrowRight className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" /><span className="text-muted-foreground">{b}</span></li>))}</ul>
                </div>
                <div className="p-8 border border-foreground/10 rounded-2xl">
                  <h3 className="text-xl font-display mb-6">Ideal para</h3>
                  <div className="flex flex-wrap gap-2">{service.idealFor.map((item) => (<span key={item} className="px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-full text-sm text-muted-foreground">{item}</span>))}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Other Services */}
        <section className="relative py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display tracking-tight leading-[1.05] mb-4">Otros servicios que te pueden interesar</h2>
              <p className="text-muted-foreground">En WebBAQ tenemos todo lo que tu negocio necesita para estar online.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{otherServices.map((s) => (<Link key={s.slug} href={`/servicios/${s.slug}`} className="group p-6 border border-foreground/10 hover:border-emerald-500/30 rounded-2xl transition-all duration-300 bg-card/50"><h3 className="text-lg font-display mb-2 group-hover:text-emerald-400 transition-colors">{s.shortTitle}</h3><p className="text-sm text-muted-foreground">{s.shortDescription}</p></Link>))}</div>
          </div>
        </section>
        {/* CTA */}
        <section className="relative py-24 bg-emerald-500 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10"><div style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} className="absolute inset-0" /></div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-tight leading-[1.05] mb-6">¿Listo para empezar con <span className="text-white/80">{service.shortTitle.toLowerCase()}</span>?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">Contáctanos hoy y ten tu servicio funcionando en menos de una semana.</p>
            <a href="https://wa.me/573022805235" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 hover:bg-white/90 rounded-full text-sm font-medium transition-all group">Empezar ahora <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></a>
          </div>
        </section>
        {/* FAQ — sin fondo oscuro, usando Accordion como homepage */}
        <section className="relative py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6"><span className="w-12 h-px bg-emerald-500/50" /> FAQ</span>
              <h2 className="text-3xl md:text-4xl font-display tracking-tight leading-[1.05] mb-12">Preguntas frecuentes sobre <span className="text-emerald-400">{service.shortTitle.toLowerCase()}</span></h2>
              <Accordion type="single" collapsible className="space-y-4">
                {service.faq.map((item, idx) => (
                  <AccordionItem key={item.question} value={`item-${idx}`} className="border border-foreground/10 px-6 data-[state=open]:border-emerald-500/30 data-[state=open]:bg-emerald-500/5 transition-colors">
                    <AccordionTrigger className="text-left hover:no-underline py-6 text-base lg:text-lg font-medium [&[data-state=open]]:text-emerald-400">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
