"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardList, Send, Palette, Rocket } from "lucide-react";
import { IconMorphAnimation } from "./IconMorphAnimation";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Eliges tu plan",
    description: "Selecciona el plan que mejor se adapta al tamaño y necesidades de tu negocio en Barranquilla.",
  },
  {
    number: "02",
    icon: Send,
    title: "Nos envías tu info",
    description: "Logo, fotos, textos y colores corporativos por WhatsApp. Nosotros hacemos el diseño completo.",
  },
  {
    number: "03",
    icon: Palette,
    title: "Diseñamos tu web",
    description: "Página profesional con SEO local para Barranquilla y el Atlántico. Lista en 3 a 7 días hábiles.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "¡Sales en vivo!",
    description: "Tu web aparece en Google, clientes te encuentran y tú recibes consultas por WhatsApp.",
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-foreground overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header with image */}
        <div className="relative mb-16 lg:mb-0 grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
          {/* Left column - Title */}
          <div className="overflow-hidden pb-0 lg:pb-24 text-center lg:text-left">
            <span className={`inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6 transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}>
              <span className="w-12 h-px bg-emerald-500/50" />
              ¿Cómo funciona?
            </span>
            
            <h2
              className={`text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-display tracking-tight leading-[0.9] transition-all duration-1000 delay-100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
            >
              <span className="block text-foreground">Elige.</span>
              <span className="block text-foreground/30">Envía.</span>
              <span className="block text-foreground/10">¡Listo!</span>
            </h2>
            <p className={`text-lg text-muted-foreground max-w-md mt-8 leading-relaxed transition-all duration-1000 delay-200 mx-auto lg:mx-0 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              Proceso simple y rápido. En menos de una semana tu negocio ya aparece en Google en Barranquilla.
            </p>
          </div>

          {/* Right column - Icon Animation */}
          <div className={`relative h-[280px] lg:h-[500px] transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <IconMorphAnimation activeIndex={activeStep} />
          </div>
        </div>

        {/* Steps - Horizontal Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-foreground/10">
            <div 
              className="h-full bg-emerald-500/50 transition-all duration-700"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isPast = index < activeStep;
              
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`relative text-left p-8 border transition-all duration-500 group ${
                    isActive 
                      ? "bg-emerald-500/10 border-emerald-500" 
                      : isPast
                      ? "bg-card border-emerald-500/30"
                      : "bg-card border-foreground/10 hover:border-foreground/30"
                  } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Step number */}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-6 transition-all duration-300 ${
                    isActive 
                      ? "bg-emerald-500 text-white" 
                      : isPast
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-foreground/10 text-muted-foreground group-hover:bg-foreground/20"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Step number badge */}
                  <span className={`absolute top-4 right-4 text-4xl font-display transition-colors duration-300 ${
                    isActive ? "text-emerald-500" : "text-foreground/10"
                  }`}>
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className={`text-xl lg:text-2xl font-display mb-3 transition-colors duration-300 ${
                    isActive ? "text-emerald-400" : ""
                  }`}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Progress indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/30 overflow-hidden">
                      <div className="h-full bg-emerald-500 animate-progress" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile step indicators */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeStep === index ? "bg-emerald-500 w-8" : "bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 4s linear forwards;
        }
      `}</style>
    </section>
  );
}