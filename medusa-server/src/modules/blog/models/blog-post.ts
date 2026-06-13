import { model } from "@medusajs/framework/utils"

const BlogPost = model.define("blog_post", {
  id: model.id().primaryKey(),
  title: model.text(),
  slug: model.text().searchable(),
  content: model.json().nullable(),
  excerpt: model.text().nullable(),
  featured_image: model.text().nullable(),
  author: model.text(),
  tags: model.json().nullable(),
  published_at: model.dateTime().nullable(),
})

export default BlogPost
