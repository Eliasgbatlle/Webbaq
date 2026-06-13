import { MedusaContainer } from "@medusajs/framework/types"
import { BLOG_MODULE } from "../modules/blog"
import { PAGE_MODULE } from "../modules/page"

export default async function seed({ container }: { container: MedusaContainer }) {
  const blogService = container.resolve(BLOG_MODULE)
  const pageService = container.resolve(PAGE_MODULE)

  // Seed blog posts
  const blogPosts = [
    {
      title: "¿Por qué tu negocio necesita una página web en 2026?",
      slug: "por-que-tu-negocio-necesita-pagina-web",
      excerpt:
        "Descubre por tener una página web ya no es opcional para los negocios en Barranquilla y Colombia.",
      content: {
        body: "<p>En la era digital actual, tener presencia en línea no es un lujo, es una necesidad. Cada vez más clientes buscan negocios en internet antes de decidir comprar.</p><h2>La realidad del mercado colombiano</h2><p>Colombia tiene más de 39 millones de usuarios de internet. En Barranquilla, cada vez más personas buscan servicios locales a través de Google.</p><h2>Beneficios de tener una página web</h2><ul><li>Disponibilidad 24/7</li><li>Alcance global con enfoque local</li><li>Credibilidad profesional</li><li>Generación de leads constante</li></ul>",
      },
      author: "Equipo WebBAQ",
      tags: ["diseño web", "marketing digital", "Barranquilla"],
      published_at: new Date("2026-01-15"),
    },
    {
      title: "Guía completa de SEO Local para empresas en Barranquilla",
      slug: "guia-seo-local-barranquilla",
      excerpt:
        "Aprende cómo posicionar tu negocio en Google cuando los clientes buscan tus servicios en Barranquilla.",
      content: {
        body: "<p>El SEO local es la clave para que los clientes de Barranquilla te encuentren primero en Google.</p><h2>¿Qué es el SEO Local?</h2><p>Es el proceso de optimizar tu presencia online para atraer más clientes de búsquedas locales relevantes.</p><h2>Pasos clave</h2><ol><li>Optimiza tu perfil de Google My Business</li><li>Usa palabras clave locales</li><li>Consigue reseñas positivas</li><li>Crea contenido relevante para Barranquilla</li></ol>",
      },
      author: "Equipo WebBAQ",
      tags: ["SEO", "marketing local", "Barranquilla", "Google"],
      published_at: new Date("2026-02-01"),
    },
    {
      title: "Tienda online vs página web informativa: ¿cuál elegir?",
      slug: "tienda-online-vs-pagina-informativa",
      excerpt:
        "Te ayudamos a decidir entre una tienda online con carrito de compras o una página web informativa para tu negocio.",
      content: {
        body: "<p>Una de las decisiones más importantes al crear tu presencia digital es elegir el tipo de sitio web adecuado.</p><h2>Página web informativa</h2><p>Perfecta para negocios de servicios que quieren mostrar su portafolio y recibir contactos.</p><h2>Tienda online</h2><p>Ideal si vendes productos físicos y quieres recibir pagos online.</p><h2>¿Cuál elegir?</h2><p>Depende de tu modelo de negocio. Nosotros te asesoramos sin compromiso.</p>",
      },
      author: "Equipo WebBAQ",
      tags: ["ecommerce", "tienda online", "diseño web"],
      published_at: new Date("2026-03-10"),
    },
  ]

  for (const post of blogPosts) {
    await blogService.createBlogPosts(post)
    console.log(`Blog post created: ${post.slug}`)
  }

  // Seed CMS pages
  const pages = [
    {
      title: "Sobre Nosotros",
      slug: "sobre-nosotros",
      content: {
        body: "<p>WebBAQ nació en Barranquilla con la misión de democratizar el acceso a páginas web profesionales para pequeños y medianos negocios.</p><p>Creemos que tener una presencia digital de calidad no debería ser caro ni complicado.</p>",
      },
      meta_title: "Sobre WebBAQ - Diseño Web en Barranquilla",
      meta_description: "Conoce la historia de WebBAQ y por qué somos la mejor opción para tu página web en Barranquilla.",
      published: true,
    },
    {
      title: "Política de Privacidad",
      slug: "politica-de-privacidad",
      content: {
        body: "<p>En WebBAQ nos tomamos muy en serio la privacidad de tus datos.</p><h2>Información que recopilamos</h2><p>Recopilamos información cuando te registras, navegas en nuestro sitio o completas formularios de contacto.</p><h2>Uso de la información</h2><p>Usamos tu información para mejorar nuestro servicio y comunicarnos contigo.</p>",
      },
      meta_title: "Política de Privacidad - WebBAQ",
      published: true,
    },
  ]

  for (const page of pages) {
    await pageService.createPages(page)
    console.log(`Page created: ${page.slug}`)
  }

  console.log("Seed completed successfully!")
}


