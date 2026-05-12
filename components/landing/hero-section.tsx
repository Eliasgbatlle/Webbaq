"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Shield, CreditCard } from "lucide-react";
import { DeviceAnimation } from "./device-animation";

const words = ["restaurantes", "tiendas", "salones", "gimnasios"];

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );

  useEffect(() => {
    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    
    letters.forEach((_, i) => {
      setTimeout(() => {
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / 500, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates(prev => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }, i * 45);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <>
      {letters.map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: letterStates[i]?.opacity ?? 0,
            filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
            color: "#10b981",
            transition: "color 0.4s ease",
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
      {/* Background video - CAMBIA ESTA URL POR TU PROPIO VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-80"
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div>
            {/* Location badge */}
            <div 
              className={`mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-400">
                <MapPin className="w-4 h-4" />
                Barranquilla, Colombia - Desde $60.000/mes
              </span>
            </div>
            
            {/* Main headline */}
            <div className="mb-8">
              <h1 
                className={`text-left text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.05] tracking-tight text-white transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="block">Diseño web y SEO local</span>
                <span className="block">
                  para{" "}
                  <span className="relative inline-block">
                    <BlurWord word={words[wordIndex]} trigger={wordIndex} />
                  </span>
                </span>
                <span className="block text-white/60">en Colombia</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p 
              className={`text-lg lg:text-xl text-white/60 mb-10 max-w-lg leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Diseñamos tu web, la posicionamos en Google y te ayudamos a conseguir clientes.
            </p>

            {/* CTAs */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 mb-10 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-14 text-base rounded-full group"
              >
                Quiero clientes con mi web
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full border-white/20 text-white hover:bg-white/10"
              >
                Ver precios y planes
              </Button>
            </div>

            {/* Trust badges */}
            <div 
              className={`flex flex-wrap gap-6 text-sm text-white/50 transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Lista en 3-7 días
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Sin contrato
              </span>
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                Desde $60.000/mes
              </span>
            </div>

            {/* Stats bar */}
            <div 
              className={`bg-black/50 backdrop-blur-sm border-t border-white/10 transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 lg:gap-16">
                  {[
                    { value: "16+", label: "Clientes satisfechos en Barranquilla" },
                    { value: "5", label: "Días promedio de entrega" },
                    { value: "1 mes", label: "Prueba a precio reducido" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1 text-center lg:text-left">
                      <span className="text-2xl lg:text-3xl font-display text-white">{stat.value}</span>
                      <span className="text-xs text-white/50 leading-tight max-w-[150px]">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Device Animation */}
          <div 
            className={`relative h-[400px] lg:h-[500px] transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <DeviceAnimation />
          </div>
        </div>
      </div>
      

    </section>
  );
}
