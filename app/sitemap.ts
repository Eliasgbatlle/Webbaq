import { MetadataRoute } from "next";

// Si tienes servicios definidos en alguna parte, impórtalos
// Por ahora usaremos servicios de ejemplo. Ajusta según tu fuente de datos real.
const servicios = [
  { slug: "diseno-web" },
  { slug: "desarrollo-web" },
  { slug: "seo" },
  { slug: "marketing-digital" },
  { slug: "consultoria" },
  { slug: "mantenimiento" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://webaq.es";

  // Páginas estáticas principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Páginas dinámicas de servicios
  const servicePages = servicios.map((servicio) => ({
    url: `${baseUrl}/servicios/${servicio.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...servicePages];
}
