const { defineConfig, loadEnv } = require("@medusajs/framework/utils")
const path = require("path")

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.MEDUSA_ADMIN_CORS!,
      authCors: process.env.MEDUSA_ADMIN_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  admin: {
    disable: false,
    path: "/app",
    sources: [path.resolve(process.cwd(), "src/admin")],
  },
  modules: [
    {
      resolve: "@medusajs/product",
      options: {},
    },
    {
      resolve: "@medusajs/pricing",
      options: {},
    },
    {
      resolve: "@medusajs/customer",
      options: {},
    },
    {
      resolve: "@medusajs/sales-channel",
      options: {},
    },
    {
      resolve: "@medusajs/order",
      options: {},
    },
    {
      resolve: "@medusajs/cart",
      options: {},
    },
    {
      resolve: "@medusajs/payment",
      options: {},
    },
    {
      resolve: "@medusajs/fulfillment",
      options: {},
    },
    {
      resolve: "@medusajs/region",
      options: {},
    },
    {
      resolve: "@medusajs/promotion",
      options: {},
    },
    {
      resolve: "@medusajs/workflow-engine-inmemory",
      options: {},
    },
    {
      resolve: "./src/modules/blog",
      options: {},
    },
    {
      resolve: "./src/modules/page",
      options: {},
    },
  ],
})
