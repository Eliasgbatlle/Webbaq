export interface Service {
  slug: string
  title: string
  shortTitle: string
  description: string
  shortDescription: string
  icon: string
  features: string[]
  benefits: string[]
  idealFor: string[]
  faq: { question: string; answer: string }[]
}

export const services: Service[] = [
  {
    slug: "diseno-web-profesional",
    title: "Diseño Web Profesional en Barranquilla",
    shortTitle: "Diseño Web",
    description:
      "Creamos páginas web profesionales, modernas y optimizadas para SEO local en Barranquilla. Tu negocio online listo en 3 a 7 días.",
    shortDescription:
      "Páginas web profesionales con SEO local, hosting y dominio incluidos. Listas en 3-7 días.",
    icon: "Globe",
    features: [
      "Diseño responsive (celular, tablet, escritorio)",
      "Optimización SEO local para Barranquilla",
      "Hosting y dominio incluidos",
      "Certificado SSL de seguridad",
      "Integración con Google Maps",
      "Formulario de contacto profesional",
      "Galería de imágenes optimizada",
      "Velocidad de carga optimizada",
      "Modificaciones mensuales incluidas",
      "Soporte por WhatsApp incluido",
    ],
    benefits: [
      "Aparece en Google cuando buscan tu negocio en Barranquilla",
      "Tus clientes te encuentran por WhatsApp directo desde la web",
      "Sin conocimientos técnicos - nosotros lo hacemos todo",
      "Tu web se ve perfecta en cualquier dispositivo",
    ],
    idealFor: [
      "Restaurantes y cafeterías en Barranquilla",
      "Tiendas de ropa y accesorios",
      "Salones de belleza y spas",
      "Ferreterías y almacenes",
      "Profesionales independientes",
      "Clínicas y consultorios",
    ],
    faq: [
      {
        question: "¿Cuánto cuesta una página web en Barranquilla?",
        answer: "Desde $90.000/mes con todo incluido: hosting, dominio, SEO local, SSL y soporte por WhatsApp. No hay costos ocultos ni contratos de permanencia.",
      },
      {
        question: "¿Cuánto tiempo tarda en estar lista mi web?",
        answer: "Entre 3 a 7 días hábiles después de que nos envíes tu información (logo, fotos, textos y colores).",
      },
      {
        question: "¿Necesito saber de tecnología?",
        answer: "No, nosotros nos encargamos de todo. Tú solo eliges el plan y nos dices cómo quieres tu página. El resto lo hacemos nosotros.",
      },
    ],
  },
  {
    slug: "tienda-online-ecommerce",
    title: "Tienda Online y Ecommerce en Barranquilla",
    shortTitle: "Tienda Online",
    description:
      "Vende por internet con una tienda online profesional. Acepta pagos con Nequi, PSE y tarjetas. Integración con WhatsApp.",
    shortDescription:
      "Vende online con carrito de compras, pasarela de pagos (Nequi, PSE, tarjeta) y envíos por WhatsApp.",
    icon: "ShoppingCart",
    features: [
      "Catálogo de productos ilimitado",
      "Carrito de compras profesional",
      "Pasarela de pagos (Nequi, PSE, tarjeta)",
      "Gestión de inventario básica",
      "Notificaciones de pedidos por WhatsApp",
      "Fotos y videos de productos optimizados",
      "SEO local para cada producto",
      "Integración con WhatsApp Business",
      "Panel de administración sencillo",
      "Hosting y SSL incluidos",
    ],
    benefits: [
      "Recibe pagos 24/7 sin tu intervención",
      "Tus clientes compran desde su celular",
      "Automatiza tus ventas con pasarela de pagos",
      "Aparece en Google con cada producto",
    ],
    idealFor: [
      "Tiendas de ropa y calzado en Barranquilla",
      "Distribuidoras y bodegas",
      "Tiendas de regalos y detalles",
      "Ventas por catálogo digital",
      "Emprendedores con productos físicos",
      "Negocios de comida preparada",
    ],
    faq: [
      {
        question: "¿Qué métodos de pago puedo ofrecer?",
        answer: "Nequi, PSE (débito bancario) y tarjetas de crédito/débito. Todo integrado sin que tú gestiones nada.",
      },
      {
        question: "¿Puedo vender por WhatsApp también?",
        answer: "Sí, tu tienda se integra con WhatsApp Business para que recibas pedidos y consultas directamente al chat.",
      },
      {
        question: "¿Manejan inventario?",
        answer: "Sí, incluimos gestión de inventario básica para que sepas qué productos tienes disponibles sin complicaciones.",
      },
    ],
  },
  {
    slug: "seo-local-barranquilla",
    title: "SEO Local y Posicionamiento en Google Barranquilla",
    shortTitle: "SEO Local",
    description:
      "Posicionamos tu negocio en Google para que aparezcas cuando tus clientes te buscan en Barranquilla y el Atlántico.",
    shortDescription:
      "Aparece en Google cuando buscan tu negocio en Barranquilla. Optimización SEO local completa.",
    icon: "Search",
    features: [
      "Optimización SEO on-page completa",
      "Google My Business optimizado",
      "Palabras clave locales de Barranquilla",
      "Optimización de velocidad y rendimiento",
      "Meta tags y descripciones optimizadas",
      "Contenido optimizado para búsqueda local",
      "Integración con Google Maps",
      "Monitoreo de posiciones",
      "Reportes mensuales de resultados",
      "Soporte y ajustes continuos",
    ],
    benefits: [
      "Tus clientes en Barranquilla te encuentran primero en Google",
      "Más visitas = más llamadas = más ventas",
      "Competidores locales te llevan ventaja si no apareces",
      "Resultados visibles desde la primera semana",
    ],
    idealFor: [
      "Restaurantes que quieren más clientes locales",
      "Clínicas y consultorios en Barranquilla",
      "Talleres mecánicos y automotrices",
      "Inmobiliarias locales",
      "Abogados y contadores",
      "Cualquier negocio con clientes en Barranquilla",
    ],
    faq: [
      {
        question: "¿Cuánto tiempo tarda en ver resultados del SEO?",
        answer: "Los primeros resultados se ven desde la primera semana, pero el posicionamiento óptimo toma de 2 a 3 meses.",
      },
      {
        question: "¿El SEO local está incluido en todos los planes?",
        answer: "Sí, todos nuestros planes incluyen SEO local para Barranquilla. Es parte fundamental de nuestro servicio.",
      },
      {
        question: "¿Funciona para cualquier tipo de negocio?",
        answer: "Sí, optimizamos para las palabras clave específicas de tu negocio y ubicación en Barranquilla.",
      },
    ],
  },
  {
    slug: "landing-page",
    title: "Landing Pages Profesionales en Barranquilla",
    shortTitle: "Landing Pages",
    description:
      "Páginas de aterrizaje diseñadas para convertir visitantes en clientes. Ideales para campañas, lanzamientos y promociones.",
    shortDescription:
      "Páginas de aterrizaje optimizadas para convertir visitantes en clientes. Para campañas y promociones.",
    icon: "Target",
    features: [
      "Diseño enfocado en conversión",
      "Llamadas a la acción estratégicas",
      "Formularios de captura integrados",
      "Integración con WhatsApp",
      "Optimización SEO para campañas",
      "Velocidad de carga ultrarrápida",
      "Analítica y seguimiento incluidos",
      "Diseño responsive profesional",
      "Pruebas A/B disponibles",
      "Hosting y SSL incluidos",
    ],
    benefits: [
      "Convierte más visitantes en clientes potenciales",
      "Campañas publicitarias más efectivas",
      "Resultados medibles desde el día uno",
      "Ideal para lanzamientos de productos",
    ],
    idealFor: [
      "Campañas de Google Ads en Barranquilla",
      "Lanzamiento de nuevos productos",
      "Eventos y promociones especiales",
      "Captación de leads para inmobiliarias",
      "Webinars y eventos online",
      "Campañas de redes sociales",
    ],
    faq: [
      {
        question: "¿Qué diferencia hay entre una landing page y una web normal?",
        answer: "Una landing page está diseñada para un objetivo específico (vender, capturar leads), mientras que una web muestra toda tu información.",
      },
      {
        question: "¿Puedo integrarla con mis anuncios de Facebook o Google?",
        answer: "Sí, optimizamos tu landing page para que funcione perfectamente con campañas de Google Ads, Facebook e Instagram Ads.",
      },
      {
        question: "¿Cuánto tiempo toma tenerla lista?",
        answer: "Entre 2 a 4 días hábiles. Son páginas más rápidas de producir que un sitio web completo.",
      },
    ],
  },
  {
    slug: "rediseno-web",
    title: "Rediseño Web para Negocios en Barranquilla",
    shortTitle: "Rediseño Web",
    description:
      "Transformamos tu sitio web antiguo en una página moderna, rápida y optimizada para móviles y SEO local.",
    shortDescription:
      "Actualizamos tu sitio web antiguo a una página moderna, rápida y optimizada para celulares y SEO.",
    icon: "RefreshCw",
    features: [
      "Análisis completo del sitio actual",
      "Diseño moderno y profesional",
      "Migración de contenido existente",
      "Optimización para móviles",
      "Mejora de velocidad de carga",
      "SEO completo desde cero",
      "Actualización de seguridad",
      "Nuevo hosting optimizado",
      "SSL renovado",
      "Soporte post-migración",
    ],
    benefits: [
      "Tu web se verá profesional y actualizada",
      "Cargará más rápido - tus clientes no esperarán",
      "Funcionará perfecto en celulares",
      "Mejorará tu posición en Google",
    ],
    idealFor: [
      "Negocios con sitios web desactualizados",
      "Empresas que quieren renovar su imagen digital",
      "Sitios que no funcionan bien en celular",
      "Páginas lentas que pierden clientes",
      "Negocios sin presencia en Google",
      "Empresas que cambiaron de rubro o marca",
    ],
    faq: [
      {
        question: "¿Pierdo mi contenido actual?",
        answer: "No, migramos todo tu contenido importante al nuevo diseño. Nada se pierde.",
      },
      {
        question: "¿Qué pasa con mi dominio y correos?",
        answer: "Los mantenemos igual. Nosotros nos encargamos de toda la migración técnica sin que afecte tu operación.",
      },
      {
        question: "¿Mejorará mi posición en Google?",
        answer: "Sí, al optimizar velocidad, diseño responsive y SEO, tu posición en Google mejorará significativamente.",
      },
    ],
  },
  {
    slug: "hosting-mantenimiento-web",
    title: "Hosting y Mantenimiento Web en Barranquilla",
    shortTitle: "Hosting y Soporte",
    description:
      "Hosting rápido y seguro con mantenimiento mensual. Nos encargamos de que tu web siempre funcione perfecto.",
    shortDescription:
      "Hosting rápido, SSL, mantenimiento mensual y soporte por WhatsApp. Tu web siempre funcionando perfecto.",
    icon: "Server",
    features: [
      "Hosting rápido y estable",
      "Certificado SSL automatizado",
      "Copias de seguridad semanales",
      "Actualizaciones de seguridad",
      "Modificaciones mensuales incluidas",
      "Monitoreo 24/7 de disponibilidad",
      "Soporte técnico por WhatsApp",
      "Optimización de velocidad continua",
      "Migraciones sin costo",
      "Sin contratos de permanencia",
    ],
    benefits: [
      "Tu web siempre disponible para tus clientes",
      "Sin preocupaciones técnicas - nosotros manejamos todo",
      "Modificaciones mensuales sin costo extra",
      "Soporte directo por WhatsApp en horario laboral",
    ],
    idealFor: [
      "Dueños de negocio sin tiempo para administrar su web",
      "Empresas que quieren un sitio siempre actualizado",
      "Negocios que necesitan soporte técnico rápido",
      "Cualquier web que requiera mantenimiento constante",
    ],
    faq: [
      {
        question: "¿Qué incluye el mantenimiento mensual?",
        answer: "Modificaciones de contenido, actualizaciones de seguridad, copias de seguridad, optimización de velocidad y soporte por WhatsApp.",
      },
      {
        question: "¿Puedo cancelar cuando quiera?",
        answer: "Sí, no tenemos contratos de permanencia. Cancela cuando quieras sin penalización.",
      },
      {
        question: "¿Qué pasa si mi web se cae?",
        answer: "Tenemos monitoreo 24/7. Si algo falla, lo detectamos y solucionamos rápidamente. Además, tienes soporte directo por WhatsApp.",
      },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServiceIcon(iconName: string): string {
  const icons: Record<string, string> = {
    Globe: "🌐",
    ShoppingCart: "🛒",
    Search: "🔍",
    Target: "🎯",
    RefreshCw: "🔄",
    Server: "⚙️",
  }
  return icons[iconName] || "🌐"
}
