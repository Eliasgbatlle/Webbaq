"use client";

import { ArrowUpRight, MessageCircle, Mail, MapPin } from "lucide-react";

const footerLinks = {
  Servicios: [
    { name: "Diseño Web", href: "#features" },
    { name: "E-commerce y Tiendas Virtuales", href: "#pricing" },
    { name: "Posicionamiento SEO Local", href: "#features" },
    { name: "Planes y Precios", href: "#pricing" },
    { name: "Preguntas frecuentes", href: "#faq" },
  ],
  Sectores: [
    { name: "Restaurantes", href: "#sectors" },
    { name: "Tiendas de ropa", href: "#sectors" },
    { name: "Salones y spas", href: "#sectors" },
    { name: "Profesionales", href: "#sectors" },
    { name: "Ver todos", href: "#sectors" },
  ],
};

const socialLinks = [
  { name: "WhatsApp", href: "#", icon: MessageCircle },
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative bg-black">

    <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
        alt="Bioluminescent landscape"
        className="w-full h-full object-cover object-center"
      />
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* Footer content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <span className="text-3xl font-display text-white">WebBAQ</span>
              </a>

              <p className="text-white/50 leading-relaxed mb-8 max-w-sm text-sm">
                Diseño de páginas web y tiendas online en Barranquilla por suscripción mensual. 
                Hosting, mantenimiento y SEO local incluidos.
              </p>

              {/* Contact info */}
              <div className="space-y-4 mb-8">
                <a 
                  href="https://wa.me/573001234567" 
                  className="flex items-center gap-3 text-white/60 hover:text-emerald-400 transition-colors group"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">WhatsApp</span>
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

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all text-white/60 hover:text-emerald-400"
                  >
                    {link.icon ? (
                      <link.icon className="w-5 h-5" />
                    ) : (
                      <span className="text-xs font-medium">{link.name.charAt(0)}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="lg:col-span-2">
                <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white/40 hover:text-emerald-400 transition-colors"
                      >
                        {link.name}
                      </a>
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
              <a 
                href="#pricing" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
              >
                Ver planes y precios
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; 2026 WebBAQ - Diseño de páginas web Barranquilla, Colombia. Precios en COP.
          </p>

          <div className="flex items-center gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Política de privacidad</a>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Sistema operativo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
