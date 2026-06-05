"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Globe, ShoppingCart, Search, Target, RefreshCw, Server } from "lucide-react";
import { services } from "@/lib/services";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  ShoppingCart,
  Search,
  Target,
  RefreshCw,
  Server,
};

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/3 blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span
            className={`inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-emerald-500/50" />
            Servicios
            <span className="w-12 h-px bg-emerald-500/50" />
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.05] mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Todo lo que tu negocio necesita
            <br />
            <span className="text-muted-foreground/60">para crecer en Barranquilla</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Desde diseño web hasta tiendas online con pagos incluidos. Servicios pensados para el mercado de Barranquilla y la región Caribe.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className={`group relative p-8 lg:p-10 border border-foreground/10 bg-card/50 backdrop-blur-sm rounded-2xl hover:border-emerald-500/30 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-500/10 rounded-lg mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>

                <h3 className="text-xl lg:text-2xl font-display mb-3 group-hover:text-emerald-400 transition-colors">
                  {service.shortTitle}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
                  Ver más
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-muted-foreground text-sm mb-4">
            ¿No encuentras lo que buscas? Escríbenos y te asesoramos.
          </p>
          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm font-medium transition-colors"
          >
            Hablar con asesor
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
