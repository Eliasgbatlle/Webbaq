"use client";

import { useEffect, useRef, useState } from "react";
import { Zap, DollarSign, Search, Wrench, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Entrega en 3 a 7 días",
    description: "Proceso ágil por WhatsApp. Sin reuniones infinitas ni burocracia. Tu negocio online rápido.",
  },
  {
    icon: DollarSign,
    title: "Precio justo y fijo",
    description: "Sin letras pequeñas. Desde $60.000/mes con todo incluido. Sabes exactamente cuánto pagas.",
  },
  {
    icon: Search,
    title: "SEO local incluido",
    description: "Optimizamos para que aparezcas en Google cuando alguien busca lo que vendes en Barranquilla.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento incluido",
    description: "Hosting seguro, SSL, actualizaciones y modificaciones mensuales. Sin sorpresas en la factura.",
  },
  {
    icon: MessageCircle,
    title: "Soporte por WhatsApp",
    description: "Respuesta rápida en horario laboral. Sin tickets complicados ni esperas de días.",
  },
];

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="relative mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6">
                <span className="w-12 h-px bg-emerald-500/50" />
                ¿Por qué WebBAQ?
              </span>
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.05] transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                La agencia web
                <br />
                <span className="text-muted-foreground">que sí entiende tu negocio</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                Somos locales. Sabemos lo que funciona en Colombia y lo que no.
              </p>
            </div>
          </div>
          
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className={`group relative p-8 lg:p-10 border border-foreground/10 bg-card hover:border-emerald-500/30 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-500/10 rounded-lg mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-display mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
      {/* Gradient fade to black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        {/* Subtle dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
    </section>
  );
}
