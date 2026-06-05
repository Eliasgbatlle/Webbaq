import React from "react"
import type { Metadata } from 'next'
import { ContactPage } from "@/components/contact/contact-page"

export const metadata: Metadata = {
  title: 'Contacto - WebBAQ | Diseño Web y SEO en Barranquilla',
  description: 'Contáctanos para crear tu página web profesional en Barranquilla. WhatsApp, email o formulario. Te respondemos en minutos.',
  openGraph: {
    title: 'Contacto - WebBAQ | Diseño Web y SEO en Barranquilla',
    description: 'Contáctanos para crear tu página web profesional en Barranquilla.',
    url: 'https://webbaq.com/contacto',
    siteName: 'WebBAQ',
    locale: 'es_CO',
    type: 'website',
  },
}

export default function Page() {
  return <ContactPage />
}
