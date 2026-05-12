"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

const zones = [
  { name: "El Prado", featured: true },
  { name: "Altos del Prado", featured: true },
  { name: "Centro", featured: false },
  { name: "Barrio Abajo", featured: false },
  { name: "La Boquilla", featured: false },
  { name: "Puerto Colombia", featured: true },
  { name: "Soledad", featured: true },
  { name: "Malambo", featured: false },
  { name: "Galapa", featured: false },
  { name: "Baranoa", featured: false },
  { name: "Sabanalarga", featured: false },
  { name: "Luruaco", featured: false },
  { name: "El Norte", featured: true },
  { name: "Ciudad Jardín", featured: false },
  { name: "Riomar", featured: true },
  { name: "Marbella", featured: false },
  { name: "Villa Country", featured: false },
  { name: "Los Alpes", featured: false },
  { name: "Suroccidente", featured: false },
  { name: "La Manga", featured: false },
];

export function CoverageSection() {
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
      id="coverage"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6">
            <span className="w-12 h-px bg-emerald-500/50" />
            Cobertura
            <span className="w-12 h-px bg-emerald-500/50" />
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.05] mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Diseño web en toda
            <br />
            <span className="text-white/40">Barranquilla y el Atlántico</span>
          </h2>
          <p className={`text-xl text-white/60 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            Atendemos negocios en todos los barrios y municipios del Atlántico. El proceso es 100% remoto por WhatsApp.
          </p>
        </div>

        {/* Zones Grid */}
        <div className="flex flex-wrap justify-center gap-3">
          {zones.map((zone, index) => (
            <div
              key={zone.name}
              className={`inline-flex items-center gap-2 px-4 py-2 border transition-all duration-500 ${
                zone.featured 
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" 
                  : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <MapPin className="w-3 h-3" />
              <span className="text-sm">{zone.name}</span>
            </div>
          ))}
        </div>

        {/* Extended coverage */}
        <div className={`mt-12 flex flex-wrap justify-center gap-6 text-center transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="px-6 py-4 bg-white/5 border border-white/10">
            <span className="text-emerald-400 font-display text-lg">Todo Colombia</span>
            <p className="text-xs text-white/40 mt-1">Proceso 100% remoto</p>
          </div>
          <div className="px-6 py-4 bg-white/5 border border-white/10">
            <span className="text-emerald-400 font-display text-lg">Internacional</span>
            <p className="text-xs text-white/40 mt-1">Negocios latinos en el exterior</p>
          </div>
        </div>
      </div>
    </section>
  );
}
