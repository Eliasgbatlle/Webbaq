import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260609204353 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "blog_post" ("id" text not null, "title" text not null, "slug" text not null, "content" jsonb null, "excerpt" text null, "featured_image" text null, "author" text not null, "tags" jsonb null, "published_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "blog_post_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_blog_post_deleted_at" ON "blog_post" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "blog_post" cascade;`);
  }

}
