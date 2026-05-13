"use client";

import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export function ContactSection() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate submission delay    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    toast.showSuccess("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
    // Reset form
    // (reset is handled automatically by react-hook-form if you call reset())
  };

  return (
    <section
      id="contact"
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
            Contacto
            <span className="w-12 h-px bg-emerald-500/50" />
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.05] mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            ¿Tienes alguna duda? 
            <br />
            <span className="text-white/40">Estamos aquí para ayudarte</span>
          </h2>
          <p className={`text-xl text-white/60 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            Completa el formulario y te responderemos en menos de 24 horas.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="sr-only">Nombre</label>
              <Input                type="text"
                placeholder="Tu nombre completo"
                required
                {...register("name", { required: "El nombre es obligatorio." })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder-text-white focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="sr-only">Correo electrónico</label>
              <Input
                type="email"
                placeholder="tu@email.com"
                required
                {...register("email", {
                  required: "El correo es obligatorio.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Formato de correo inválido.",
                  },
                })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder-text-white focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="sr-only">Mensaje</label>
              <Textarea
                placeholder="Escribe tu mensaje aquí..."
                required
                rows={5}
                {...register("message", { required: "El mensaje es obligatorio." })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-text-white focus:border-emerald-500 focus:ring-emerald-500 resize-none"
              />
              {errors.message && (
                <p className="text-red-400 text-sm">{errors.message.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 py-2 font-medium transition-colors"
                disabled={setIsSubmitting}
              >
                {setIsSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}