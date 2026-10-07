// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const messages = sqliteTable("messages", {
 id: text("id").primaryKey(), kind: text("kind").notNull(), name: text("name").notNull(), email: text("email").notNull(), body: text("body").notNull(), createdAt: text("created_at").notNull(), emailStatus: text("email_status").notNull().default("pending")
});
export const limits = sqliteTable("submission_limits", { key: text("key").primaryKey(), count: integer("count").notNull() });
export const comments=sqliteTable("reading_comments",{id:text("id").primaryKey(),readingId:text("reading_id").notNull(),parentId:text("parent_id"),name:text("name").notNull(),body:text("body").notNull(),createdAt:text("created_at").notNull()},t=>[index("idx_reading_comments_reading_created").on(t.readingId,t.createdAt)]);
export const portfolioContent=sqliteTable('portfolio_content',{id:text('id').primaryKey(),draft:text('draft').notNull(),published:text('published'),revision:integer('revision').notNull(),publishedAt:text('published_at')});
