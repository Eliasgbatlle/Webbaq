"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle, Mail, MapPin } from "lucide-react";

const footerLinks = {
  Servicios: [
    { name: "Diseño Web", href: "/servicios/diseno-web-profesional" },
    { name: "E-commerce y Tiendas Virtuales", href: "/servicios/tienda-online-ecommerce" },
    { name: "Posicionamiento SEO Local", href: "/servicios/seo-local-barranquilla" },
    { name: "Landing Pages", href: "/servicios/landing-page" },
    { name: "Rediseño Web", href: "/servicios/rediseno-web" },
    { name: "Hosting y Soporte", href: "/servicios/hosting-mantenimiento-web" },
  ],
  Empresa: [
    { name: "Contacto", href: "/contacto" },
    { name: "Planes y Precios", href: "/#pricing" },
    { name: "Preguntas frecuentes", href: "/#faq" },
  ],
};

function InstagramIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function FooterSection() {
  return (
    <footer className="relative">
      <div className="relative w-full h-[360px] md:h-[420px] overflow-hidden">
        <img
          src="/images/Footerimg.png"
          alt="Bioluminescent landscape"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient fade to black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </div>

      {/* Footer content */}
      <div className="relative z-10 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Main Footer */}
          <div className="py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
              {/* Brand Column */}
              <div className="lg:col-span-5">
                <Link href="/" className="inline-flex items-center gap-2 mb-6">
                  <span className="text-3xl font-display text-white">WebBAQ</span>
                </Link>

                <p className="text-white/50 leading-relaxed mb-8 max-w-sm text-sm">
                  Diseño de páginas web y tiendas online en Barranquilla por suscripción mensual.
                  Hosting, mantenimiento y SEO local incluidos.
                </p>

                {/* Contact info */}
                <div className="space-y-4 mb-8">
                  <a
                    href="https://wa.me/573022805235"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/60 hover:text-emerald-400 transition-colors group"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">+57 302 2805235</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="mailto:comunicacion@webbaq.dev"
                    className="flex items-center gap-3 text-white/60 hover:text-emerald-400 transition-colors group"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">comunicacion@webbaq.dev</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">Barranquilla, Atlántico, CO</span>
                  </div>
                </div>

                {/* Social Links with real icons */}
                <div className="flex gap-4">
                  <a
                    href="https://wa.me/573022805235"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-lg transition-all text-white/60 hover:text-emerald-400 group"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/web.baq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-lg transition-all text-white/60 hover:text-emerald-400 group"
                    title="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61573402513858"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-lg transition-all text-white/60 hover:text-emerald-400 group"
                    title="Facebook"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Link Columns */}
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title} className="lg:col-span-2">
                  <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/40 hover:text-emerald-400 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* CTA Column */}
              <div className="lg:col-span-3">
                <h3 className="text-sm font-medium text-white mb-6">Empieza hoy</h3>
                <p className="text-sm text-white/40 mb-6">
                  Consigue tu página web profesional con SEO local incluido.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
                >
                  Quiero mi web
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/30">
              &copy; 2026 WebBAQ - Diseño de páginas web Barranquilla, Colombia. Precios en COP.
            </p>

            <div className="flex items-center gap-6 text-sm text-white/30">
              <span className="hover:text-white/60 transition-colors cursor-default">Política de privacidad</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Sistema operativo
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}