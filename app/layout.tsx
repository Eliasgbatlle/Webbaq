import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'WebBAQ - Diseño Web y SEO Local en Barranquilla | Desde $60.000/mes',
  description: 'Diseñamos tu página web profesional y la posicionamos en Google. Tiendas online, SEO local, hosting incluido. Barranquilla y toda Colombia. Lista en 3-7 días.',
  generator: 'v0.app',
  keywords: ['diseño web barranquilla', 'páginas web barranquilla', 'seo local barranquilla', 'tienda online barranquilla', 'ecommerce colombia'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
