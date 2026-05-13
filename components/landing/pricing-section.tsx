"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, Zap } from "lucide-react";
import { WebBaq3DText } from "./WebBaq3DText";

const plans = [
  {
    name: "Presencia",
    description: "Para negocios que necesitan estar en Google. Una página, bien hecha.",
    options: [
      { name: "Sin dominio personalizado", price: 60000, subdominio: true },
      { name: "Con dominio personalizado", price: 80000, subdominio: false },
    ],
    features: [
      "Página web profesional",
      "SEO local Barranquilla incluido",
      "Hosting incluido",
      "Certificado SSL",
      "Soporte por WhatsApp",
      "10 modificaciones/mes",
    ],
    highlight: false,
  },
  {
    name: "Profesional",
    description: "Muestra tus productos, recibe pedidos por WhatsApp y aparece en Google.",
    options: [
      { name: "Sin dominio personalizado", price: 100000, subdominio: true },
      { name: "Con dominio personalizado", price: 130000, subdominio: false },
      { name: "Con gestión de contenido", price: 200000, subdominio: false, gestion: true },
    ],
    features: [
      "Todo del plan Presencia",
      "Catálogo de productos/servicios",
      "Integración WhatsApp Business",
      "Formulario de contacto",
      "Google Maps integrado",
      "Fotos y videos optimizados",
    ],
    highlight: true,
  },
  {
    name: "Negocio Digital",
    description: "Cobras con PSE, Nequi y tarjeta. Ventas automáticas sin tu intervención.",
    options: [
      { name: "Sin dominio personalizado", price: 220000, subdominio: true },
      { name: "Con dominio personalizado", price: 270000, subdominio: false },
      { name: "Con gestión de contenido", price: 300000, subdominio: false, gestion: true },
    ],
    features: [
      "Todo del plan Profesional",
      "Pasarela de pagos (PSE, Nequi, tarjeta)",
      "Carrito de compras",
      "Gestión de inventario básico",
      "Notificaciones de pedidos",
      "Productos, fotos, videos y más",
    ],
    highlight: false,
  },
];

export function PricingSection() {
  const [selectedOptions, setSelectedOptions] = useState([0, 1, 1]);
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="pricing" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header with image */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
          {/* 3D Text Animation */}
          <div className="lg:col-span-5 relative h-64 lg:h-auto">
            <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              <WebBaq3DText />
            </div>
          </div>

          <div className="lg:col-span-7 lg:text-right">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6">
              Nuestros Planes 2026
              <span className="w-12 h-px bg-emerald-500/50" />
            </span>
            <h2 className={`text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Planes que
              <br />
              <span className="text-stroke text-muted-foreground">funcionan.</span>
            </h2>
            <p className={`text-lg text-muted-foreground max-w-lg mt-8 leading-relaxed lg:ml-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              Elige según el nivel de tu negocio. Todos incluyen hosting, SEO local y soporte por WhatsApp sin costo extra.
            </p>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-4">
          {plans.map((plan, planIndex) => {
            const selectedOption = selectedOptions[planIndex];
            const currentOption = plan.options[selectedOption];
            
            return (
              <div
                key={plan.name}
                className={`relative bg-card border transition-all duration-700 ${
                  plan.highlight 
                    ? "border-emerald-500 lg:scale-105 lg:z-10" 
                    : "border-foreground/10"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${planIndex * 100}ms` }}
              >
                {/* Popular badge */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-8 right-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-xs font-mono uppercase tracking-widest">
                      <Zap className="w-3 h-3" />
                      Más vendido
                    </span>
                  </div>
                )}

                <div className="p-6 lg:p-8">
                  {/* Plan header */}
                  <div className="mb-6 pb-6 border-b border-foreground/10">
                    <h3 className="text-2xl lg:text-3xl font-display mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg text-muted-foreground">Desde</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl lg:text-5xl font-display text-emerald-400">
                        {formatPrice(currentOption.price)}
                      </span>
                      <span className="text-muted-foreground text-sm">/mes</span>
                    </div>
                  </div>

                  {/* Option selector */}
                  <div className="mb-6 space-y-2">
                    {plan.options.map((option, optIndex) => (
                      <button
                        key={option.name}
                        onClick={() => {
                          const newOptions = [...selectedOptions];
                          newOptions[planIndex] = optIndex;
                          setSelectedOptions(newOptions);
                        }}
                        className={`w-full p-3 text-left text-sm border rounded transition-all ${
                          selectedOption === optIndex
                            ? "border-emerald-500 bg-emerald-500/10 text-foreground"
                            : "border-foreground/10 text-muted-foreground hover:border-foreground/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option.name}</span>
                          <span className="font-mono">{formatPrice(option.price)}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                      plan.highlight
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "border border-foreground/20 text-foreground hover:border-emerald-500 hover:text-emerald-400"
                    }`}
                  >
                    Quiero este plan
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className={`mt-12 flex flex-col lg:flex-row lg:items-center lg:justify-center gap-6 text-center transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              Sin contrato de permanencia
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              Cancela cuando quieras
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              1 mes de prueba a precio reducido
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}