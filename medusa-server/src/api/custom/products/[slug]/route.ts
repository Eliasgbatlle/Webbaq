import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { slug } = req.params
  const query = req.scope.resolve("query")

  const { data: products } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "title",
      "handle",
      "description",
      "thumbnail",
      "images.*",
      "variants.*",
      "variants.prices.*",
      "collection.*",
      "categories.*",
    ],
    filters: {
      handle: slug,
    },
  })

  if (!products.length) {
    return res.status(404).json({ message: "Product not found" })
  }

  res.json({ product: products[0] })
}
