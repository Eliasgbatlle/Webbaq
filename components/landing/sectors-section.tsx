"use client";

import { useEffect, useRef, useState } from "react";
import { 
  UtensilsCrossed, 
  Shirt, 
  Scissors, 
  Wrench, 
  Dumbbell, 
  Building2, 
  Scale, 
  Car, 
  Truck, 
  GraduationCap, 
  Stethoscope, 
  PartyPopper 
} from "lucide-react";

const sectors = [
  { icon: UtensilsCrossed, name: "Restaurantes y cafés", description: "Menú y pedidos por WhatsApp" },
  { icon: Shirt, name: "Tiendas de ropa", description: "Catálogo y ventas online" },
  { icon: Scissors, name: "Salones y spas", description: "Reservas online" },
  { icon: Wrench, name: "Ferreterías", description: "Catálogo y cotizaciones" },
  { icon: Dumbbell, name: "Gimnasios", description: "Planes y membresías" },
  { icon: Building2, name: "Inmobiliarias", description: "Listado de propiedades" },
  { icon: Scale, name: "Abogados y contadores", description: "Servicios y tarifas" },
  { icon: Car, name: "Talleres y automotriz", description: "Servicios y citas" },
  { icon: Truck, name: "Distribuidoras", description: "Catálogo y WhatsApp" },
  { icon: GraduationCap, name: "Academias y colegios", description: "Información y matrículas" },
  { icon: Stethoscope, name: "Clínicas y odontología", description: "Citas y servicios online" },
  { icon: PartyPopper, name: "Eventos y catering", description: "Portafolio y cotización" },
];

export function SectorsSection() {
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
      id="sectors"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6">
            <span className="w-12 h-px bg-emerald-500/50" />
            Todos los sectores
            <span className="w-12 h-px bg-emerald-500/50" />
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.05] mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Diseñamos páginas web para
            <br />
            <span className="text-white/40">todo tipo de negocio</span>
          </h2>
          <p className={`text-xl text-white/60 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            Desde restaurantes en el norte hasta ferreterías en Soledad. Conocemos el mercado del Caribe colombiano.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <div 
                key={sector.name}
                className={`group relative p-6 bg-black/50 border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-emerald-500/10 rounded-lg shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm lg:text-base font-medium text-white mb-1 group-hover:text-emerald-400 transition-colors">
                      {sector.name}
                    </h3>
                    <p className="text-xs text-white/40">
                      {sector.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
