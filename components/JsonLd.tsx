import React from "react"

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WebBAQ",
    url: "https://webbaq.com",
    description:
      "Diseñamos tu página web profesional y la posicionamos en Google. Tiendas online, SEO local, hosting incluido.",
    image: "https://webbaq.com/placeholder.jpg",
    telephone: "",
    email: "",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barranquilla",
      addressRegion: "Atlántico",
      addressCountry: "CO",
    },
    priceRange: "$$",
    openingHours: "Mo-Fr 08:00-18:00",
    areaServed: [
      {
        "@type": "City",
        name: "Barranquilla",
      },
      {
        "@type": "Country",
        name: "Colombia",
      },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Diseño Web Profesional",
        price: "60000",
        priceCurrency: "COP",
        description: "Página web profesional con SEO incluido. Desde $60.000/mes.",
      },
    ],
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
