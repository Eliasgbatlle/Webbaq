import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const pageService = req.scope.resolve("page")
  const pages = await pageService.listPages({ published: true })

  const publicPages = pages.map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    meta_title: p.meta_title,
    meta_description: p.meta_description,
  }))

  res.json({ pages: publicPages })
}
