import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const cartTable = pgTable("cart", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertCart = typeof cartTable.$inferInsert
export type SelectCart = typeof cartTable.$inferSelect 