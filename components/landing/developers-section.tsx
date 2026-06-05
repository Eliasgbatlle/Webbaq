// components/landing/developers-section.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Smartphone, Globe, TrendingUp, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Diseño Responsive",
    description: "Tu web se ve perfecta en celular, tablet y computador."
  },
  {
    icon: Globe,
    title: "SEO Local Optimizado",
    description: "Aparece en Google cuando busquen negocios en Barranquilla."
  },
  {
    icon: TrendingUp,
    title: "Resultados Reales",
    description: "Más visitas, más llamadas, más clientes para tu negocio."
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte Directo",
    description: "Te atendemos por WhatsApp cuando lo necesites."
  },
];

export function DevelopersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="developers" ref={sectionRef} className="relative py-24 lg:flex lg:items-center lg:min-h-screen overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6">
              <span className="w-8 h-px bg-emerald-500/50" />
              Nuestro Compromiso
            </span>
            <h2 className="text-5xl md:text-6xl font-display tracking-tight leading-[0.9] mb-8">
              Diseño profesional.
              <br />
              <span className="text-muted-foreground">Resultados reales.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-md">
              No solo hacemos páginas bonitas. Creamos herramientas de venta que
              funcionan 24/7 para que tu negocio crezca en Barranquilla.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${index * 50 + 200}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-emerald-400" />
                      <h3 className="font-medium">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Se eliminó la columna del Iphone Scene para que quede una sola columna */}
        </div>
      </div>
    </section>
  );
}