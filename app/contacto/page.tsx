import React from "react"
import type { Metadata } from 'next'
import { ContactPage } from "@/components/contact/contact-page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webbaq.dev";

export const metadata: Metadata = {
  title: 'Contacto - WebBAQ | Diseño Web y SEO en Barranquilla',
  description: 'Contáctanos para crear tu página web profesional en Barranquilla. WhatsApp, email o formulario. Te respondemos en minutos.',
  openGraph: {
    title: 'Contacto - WebBAQ | Diseño Web y SEO en Barranquilla',
    description: 'Contáctanos para crear tu página web profesional en Barranquilla.',
    url: `${siteUrl}/contacto`,
    siteName: 'WebBAQ',
    locale: 'es_CO',
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/contacto`,
  },
}

export default function Page() {
  return <ContactPage />
}
