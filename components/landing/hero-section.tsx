"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { ArrowRight, MapPin, Clock, Shield, CreditCard } from "lucide-react";

// La animación ASCII es decorativa: va en su propio chunk y no bloquea el primer render
const AsciiScene = dynamic(() => import("./ascii-scene").then((m) => m.AsciiScene), { ssr: false });

const words = ["restaurantes", "tiendas", "salones", "gimnasios"];

function BlurWord({ word, animate }: Readonly<{ word: string; animate: boolean }>) {
  // La primera palabra llega visible en el HTML; las siguientes entran con animación CSS
  return (
    <>
      {word.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={animate ? "hero-blur-letter" : undefined}
          style={{
            display: "inline-block",
            color: "#10b981",
            animationDelay: animate ? `${i * 45}ms` : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [hasRotated, setHasRotated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  // Espera a que la página termine de cargar y el navegador esté libre antes de arrancar la animación
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let idleId: number | undefined;
    const start = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(() => setCanAnimate(true), { timeout: 2000 })
        : window.setTimeout(() => setCanAnimate(true), 200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idleId === undefined) return;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHasRotated(true);
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black py-16">
      {/* Background 3D model */}
      <div className="absolute inset-0 z-0">
        {canAnimate && isHeroVisible && <AsciiScene />}
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
      </div>

      {/* Macbook Scene - Fullscreen absolute */}
      <div className={"absolute inset-0 z-10 pointer-events-none hidden lg:block"}>

      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-10">
        {new Array(8).fill(null).map((_, i) => (
          <div
            key={`hline-${12.5 * (i + 1)}`}
            className="absolute h-px bg-white/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {new Array(12).fill(null).map((_, i) => (
          <div
            key={`vline-${8.33 * (i + 1)}`}
            className="absolute w-px bg-white/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      <div className="relative mt-4 z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="pointer-events-auto">
            {/* Location badge */}
            <div
              className={"mb-8 hero-in"}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-400">
                <MapPin className="w-4 h-4" />
                Barranquilla, Colombia - Desde $90.000/mes
              </span>
            </div>

            {/* Main headline */}
            <div className="mb-8">
              <h1
                className={"text-left text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.05] tracking-tight text-white hero-rise"}
              >
                <span className="block">Diseño web y SEO local</span>
                <span className="block">
                  para{" "}
                  <span className="relative inline-block">
                    <BlurWord key={wordIndex} word={words[wordIndex]} animate={hasRotated} />
                  </span>
                </span>
                <span className="block text-white/60">en Colombia</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className={"text-lg lg:text-xl text-white/60 mb-10 max-w-lg leading-relaxed hero-in [animation-delay:150ms]"}
            >
              Diseñamos tu web, la posicionamos en Google y te ayudamos a conseguir clientes.
            </p>

            {/* CTAs */}
            <div
              className={"flex flex-col sm:flex-row gap-4 mb-10 hero-in [animation-delay:250ms]"}
            >
              <Link href="/contacto">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-14 text-base rounded-full group"
                >
                  Quiero clientes con mi web
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base rounded-full border-white/20 text-white hover:bg-white/10"
                >
                  Ver precios y planes
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className={"flex flex-wrap gap-6 text-sm text-white/50 hero-in [animation-delay:350ms]"}
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
                Desde $90.000/mes
              </span>
            </div>

            {/* Stats bar */}
            <div
              className={"hero-in [animation-delay:450ms]"}
            >
              <div className="max-w-[1400px] mx-auto px-0 lg:px-0 py-6">
                <div className="flex flex-wrap items-center justify-left lg:justify-start gap-5 lg:gap-10">
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
          {/* Right column is empty, just for spacing */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}