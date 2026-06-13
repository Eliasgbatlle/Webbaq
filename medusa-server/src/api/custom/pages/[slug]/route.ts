import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { slug } = req.params
  const pageService = req.scope.resolve("page")
  const pages = await pageService.listPages({ slug, published: true })

  if (!pages.length) {
    return res.status(404).json({ message: "Page not found" })
  }

  res.json({ page: pages[0] })
}
