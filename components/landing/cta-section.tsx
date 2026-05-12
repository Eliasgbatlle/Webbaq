"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, MessageCircle } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.2), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
              {/* Left content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mb-6 leading-[1.05]">
                  Empieza a conseguir clientes
                  <br />
                  <span className="text-emerald-400">con tu página web hoy</span>
                </h2>

                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  El 80% de los barranquilleros buscan en Google antes de comprar. 
                  Empieza hoy con 1 mes de prueba a precio reducido.
                </p>

                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8">
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-14 text-base rounded-full group"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Quiero mi página web ahora
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    1 mes de prueba con precio reducido
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    SEO local Barranquilla incluido
                  </span>
                </div>
              </div>

              {/* Right side - IMAGE PLACEHOLDER - CAMBIA ESTA URL POR TU IMAGEN */}
              <div className="hidden lg:flex items-end justify-center w-[500px] h-[500px] -mr-12">
                <img
                  src="/images/bridge.png"
                  alt="Conexión con clientes"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-emerald-500/20" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-t border-r border-emerald-500/20" />
        </div>
      </div>
    </section>
  );
}
