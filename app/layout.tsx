import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { BackgroundVideo } from "@/components/landing/BackgroundVideo"
import { JsonLd } from "@/components/JsonLd"
import { Navigation } from "@/components/landing/navigation"
import { FooterSection } from "@/components/landing/footer-section"

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: '--font-instrument',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains',
  display: 'swap',
  // No aparece en la primera pantalla: no compite con el contenido principal
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webbaq.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'WebBAQ - Diseño Web y SEO en Barranquilla desde $90.000/mes',
  description: '¿Cuánto cuesta una página web en Barranquilla? Desde $90.000/mes, lista en 3-7 días. Diseñamos páginas web para negocios en Barranquilla y las posicionamos en Google. Tiendas online, SEO local, hosting incluido.',
  keywords: [
    'diseño web barranquilla',
    'páginas web para negocios en barranquilla',
    'cuánto cuesta una página web en barranquilla',
    'diseño web barranquilla precio',
    'páginas web barranquilla',
    'seo local barranquilla',
    'tienda online barranquilla',
    'ecommerce colombia',
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'WebBAQ - Diseño Web y SEO en Barranquilla desde $90.000/mes',
    description: 'Diseñamos tu página web profesional y la posicionamos en Google. Tiendas online, SEO local, hosting incluido. Barranquilla y toda Colombia. Lista en 3-7 días.',
    url: siteUrl,
    siteName: 'WebBAQ',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebBAQ - Diseño Web y SEO en Barranquilla desde $90.000/mes',
    description: 'Diseñamos tu página web profesional y la posicionamos en Google. Tiendas online, SEO local, hosting incluido. Barranquilla y toda Colombia.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background`}>
        <JsonLd />
        <BackgroundVideo />
        <Navigation />
        {children}
        <FooterSection />
      </body>
    </html>
  )
}
