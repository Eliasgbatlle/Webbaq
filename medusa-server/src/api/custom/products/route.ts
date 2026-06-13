import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve("query")

  const { data: products } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "title",
      "handle",
      "description",
      "thumbnail",
      "variants.*",
      "collection.title",
    ],
  })

  const mapped = products.map((p: any) => ({
    id: p.id,
    title: p.title,
    handle: p.handle,
    description: p.description,
    thumbnail: p.thumbnail,
    collection: p.collection?.title || null,
  }))

  res.json({ products: mapped })
}
