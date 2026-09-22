"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto cuesta una página web en Barranquilla?",
    answer: "Nuestros planes empiezan desde $60.000/mes para una página básica. El plan Presencia con dominio personalizado está desde $90.000/mes, el plan Profesional con catálogo de productos desde $130.000/mes, y si necesitas tienda online con pasarela de pagos, desde $270.000/mes. Todos incluyen hosting, SSL, SEO local y soporte por WhatsApp.",
  },
  {
    question: "¿Cuánto tiempo tarda en estar lista mi web?",
    answer: "Tu página web estará lista en 3 a 7 días hábiles dependiendo del plan y la complejidad. Una vez nos envíes toda la información (logo, fotos, textos), comenzamos inmediatamente el diseño.",
  },
  {
    question: "¿Puedo tener tienda para vender por WhatsApp en Barranquilla?",
    answer: "Sí, el plan Profesional incluye catálogo de productos con integración a WhatsApp Business. Tus clientes pueden ver tus productos y hacer pedidos directamente por WhatsApp.",
  },
  {
    question: "¿Puedo recibir pagos con tarjeta, PSE o Nequi en mi web?",
    answer: "Sí, el plan Negocio Digital incluye pasarela de pagos con PSE, Nequi, tarjetas de crédito y débito. Las ventas se procesan automáticamente sin tu intervención.",
  },
  {
    question: "¿El SEO local de Barranquilla está incluido?",
    answer: "Sí, todos nuestros planes incluyen optimización SEO local para que tu negocio aparezca en Google cuando alguien busque tus productos o servicios en Barranquilla y el Atlántico.",
  },
  {
    question: "¿Atienden negocios fuera de Barranquilla?",
    answer: "Sí, trabajamos con negocios en todo el Atlántico, Colombia y el exterior. Nuestro proceso es 100% remoto por WhatsApp, así que la ubicación no es un problema.",
  },
  {
    question: "¿Puedo cancelar en cualquier momento?",
    answer: "Sí, no hay contrato de permanencia. Puedes cancelar tu suscripción cuando quieras. Solo dejas de pagar y tu página se desactiva al final del período pagado.",
  },
  {
    question: "¿Qué incluye la suscripción mensual?",
    answer: "La suscripción incluye hosting seguro, certificado SSL, mantenimiento técnico, actualizaciones de seguridad, soporte por WhatsApp y hasta 10 modificaciones mensuales de contenido.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function FaqSection() {
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
      id="faq"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Header - Left side */}
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-emerald-400 mb-6">
              <span className="w-12 h-px bg-emerald-500/50" />
              FAQ
            </span>
            <h2
              className={`text-4xl md:text-5xl font-display tracking-tight leading-[1.05] mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              Preguntas frecuentes
            </h2>
            <p className={`text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
              Resolvemos todas tus dudas sobre diseño web, tiendas online y precios en Barranquilla y el Atlántico.
            </p>
          </div>

          {/* FAQ Accordion - Right side */}
          <div className={`lg:col-span-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-foreground/10 px-6 data-[state=open]:border-emerald-500/30 data-[state=open]:bg-emerald-500/5 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 text-base lg:text-lg font-medium [&[data-state=open]]:text-emerald-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
