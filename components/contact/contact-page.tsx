"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, MessageCircle, Mail, MapPin, Check, ArrowRight } from "lucide-react"

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+57 302 2805235",
    href: "https://wa.me/573022805235",
    description: "Respuesta en minutos",
  },
  {
    icon: Mail,
    label: "Email",
    value: "comunicacion@webbaq.dev",
    href: "mailto:comunicacion@webbaq.dev",
    description: "Respuesta en 24 horas",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Barranquilla, Atlántico, CO",
    href: null,
    description: "Atención virtual y presencial",
  },
]

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

const socialLinks = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    username: "+57 302 2805235",
    href: "https://wa.me/573022805235",
    description: "Respuesta en minutos",
    color: "hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    username: "@web.baq",
    href: "https://www.instagram.com/web.baq/",
    description: "Detrás de cámaras y proyectos",
    color: "hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-400",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    username: "WebBAQ",
    href: "https://www.facebook.com/profile.php?id=61573402513858",
    description: "Noticias y actualizaciones",
    color: "hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400",
  },
]

export function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
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
            <span className="text-white/80">Contacto</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-400 mb-6">
              <MessageCircle className="w-4 h-4" /> Hablemos de tu proyecto
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display tracking-tight leading-[1.05] text-white mb-6">
              Contáctanos y <span className="text-emerald-400">crea tu web</span> hoy
            </h1>
            <p className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
              Cuéntanos sobre tu negocio y te daremos una solución a la medida.
              Respondemos en menos de 10 minutos por WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Methods */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6">
                  <span className="w-12 h-px bg-emerald-500/50" /> Información de contacto
                </span>
                <h2 className="text-3xl font-display tracking-tight leading-[1.05] mb-4">
                  Estamos aquí para ayudarte
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Elige el medio que prefieras y te atenderemos personalmente.
                  Sin bots, sin automatizaciones, sin esperas.
                </p>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <div
                    key={method.label}
                    className="p-5 border border-foreground/10 rounded-xl hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <method.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-0.5">{method.label}</p>
                        {method.href ? (
                          <a
                            href={method.href}
                            target={method.href.startsWith("http") ? "_blank" : undefined}
                            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{method.value}</p>
                        )}
                        <p className="text-xs text-muted-foreground/60 mt-0.5">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick CTA */}
              <a
                href="https://wa.me/573022805235"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors group"
              >
                <MessageCircle className="w-5 h-5" />
                Escríbenos por WhatsApp ahora
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Social Section */}
            <div className="lg:col-span-3">
              <div className="p-8 border border-foreground/10 rounded-2xl">
                <h3 className="text-xl font-display mb-2">Síguenos en redes sociales</h3>
                <p className="text-sm text-muted-foreground mb-8">
                  Conoce nuestro trabajo, proyectos recientes y contenido exclusivo sobre diseño web y SEO.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group p-6 border border-foreground/10 rounded-xl transition-all ${social.color}`}
                      >
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className="w-14 h-14 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-base font-medium mb-0.5">{social.label}</p>
                            <p className="text-sm text-emerald-400 group-hover:text-emerald-300 transition-colors">
                              {social.username}
                            </p>
                            <p className="text-xs text-muted-foreground/60 mt-1.5">{social.description}</p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - identical style to landing page */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            className="relative border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent"
          >
            {/* Spotlight effect */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
              onMouseMove={handleMouseMove}
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.2), transparent 40%)`
              }}
            />

            <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-20">
              <div className="flex flex-col items-center justify-center text-center gap-12">
                <div className="flex-1">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mb-6 leading-[1.05]">
                    ¿Prefieres que te llamemos?
                    <br />
                    <span className="text-emerald-400">te contactamos en 24 horas</span>
                  </h2>

                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto">
                    Déjanos tu número y te contactamos para entender tu proyecto y darte una solución a la medida.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <a
                      href="https://wa.me/573022805235"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm font-medium transition-all group"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Quiero que me llamen
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      Respuesta en menos de 24 horas
                    </span>
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      Sin compromiso
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-emerald-500/20" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-t border-r border-emerald-500/20" />
          </div>
        </div>
      </section>
    </main>
  )
}
