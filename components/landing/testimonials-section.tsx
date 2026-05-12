"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Desde que pusimos la página web nos llaman más clientes nuevos. El proceso fue muy rápido y el precio es muy justo.",
    author: "Carlos M.",
    location: "Barranquilla",
    business: "Restaurante",
  },
  {
    quote: "Tenía miedo de la tecnología pero fue super fácil. Me mandaron la web lista en 5 días y ya vendo por WhatsApp.",
    author: "Laura P.",
    location: "Barranquilla",
    business: "Tienda de ropa",
  },
  {
    quote: "Buen servicio, cumplieron con el tiempo prometido y el precio es cómodo para un negocio pequeño como el mío.",
    author: "Juan R.",
    location: "Barranquilla",
    business: "Ferretería",
  },
  {
    quote: "Me ayudaron con la página de servicios y ahora recibo citas por la web. Muy recomendados.",
    author: "María S.",
    location: "Soledad",
    business: "Salón de belleza",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-emerald-500 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60 mb-4">
              <span className="w-12 h-px bg-white/30" />
              Lo que dicen nuestros clientes
            </span>
            <h2 className={`text-4xl lg:text-5xl font-display transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              Negocios en Barranquilla
              <span className="block text-white/60">que ya están online</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-3xl font-display">16+</span>
            <span className="text-sm text-white/60">clientes<br />satisfechos</span>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Quote */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Large quote mark */}
              <span className="absolute -left-4 -top-8 text-[150px] font-display text-white/10 leading-none select-none">
                &ldquo;
              </span>
              
              <blockquote 
                key={activeIndex}
                className="relative text-2xl lg:text-4xl font-display leading-[1.3] animate-fadeIn"
              >
                {activeTestimonial.quote}
              </blockquote>

              {/* Author */}
              <div className="mt-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-display text-2xl">
                    {activeTestimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-medium">{activeTestimonial.author}</p>
                  <p className="text-white/60 text-sm">
                    {activeTestimonial.business} - {activeTestimonial.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation & Stats */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-white text-white" />
              ))}
            </div>

            {/* Metric */}
            <div className="p-8 bg-white/10 backdrop-blur-sm">
              <span className="text-6xl font-display block mb-2">98%</span>
              <span className="text-white/60">de clientes recomiendan WebBAQ</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={goPrev}
                className="p-4 border border-white/30 hover:bg-white/10 transition-colors"
                aria-label="Anterior"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex-1 h-1 transition-all ${
                      idx === activeIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="p-4 border border-white/30 hover:bg-white/10 transition-colors"
                aria-label="Siguiente"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
