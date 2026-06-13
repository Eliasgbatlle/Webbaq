import { model } from "@medusajs/framework/utils"

const Page = model.define("page", {
  id: model.id().primaryKey(),
  title: model.text(),
  slug: model.text().searchable(),
  content: model.json().nullable(),
  meta_title: model.text().nullable(),
  meta_description: model.text().nullable(),
  published: model.boolean().default(false),
  published_at: model.dateTime().nullable(),
})

export default Page
