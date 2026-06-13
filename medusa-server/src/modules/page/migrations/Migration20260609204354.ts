import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260609204354 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "page" ("id" text not null, "title" text not null, "slug" text not null, "content" jsonb null, "meta_title" text null, "meta_description" text null, "published" boolean not null default false, "published_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "page_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_page_deleted_at" ON "page" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "page" cascade;`);
  }

}
