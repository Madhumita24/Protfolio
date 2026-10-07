// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const messages = sqliteTable("messages", {
 id: text("id").primaryKey(), kind: text("kind").notNull(), name: text("name").notNull(), email: text("email").notNull(), body: text("body").notNull(), createdAt: text("created_at").notNull(), emailStatus: text("email_status").notNull().default("pending")
});
export const limits = sqliteTable("submission_limits", { key: text("key").primaryKey(), count: integer("count").notNull() });
