import { integer, pgTable, text, timestamp, uuid, numeric } from "drizzle-orm/pg-core"
import { cartTable } from "./cart-schema"

export const cartItemsTable = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  cartId: uuid("cart_id")
    .references(() => cartTable.id, { onDelete: "cascade" })
    .notNull(),
  productId: text("product_id").notNull(),
  name: text("name").notNull(),
  price: numeric("price").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertCartItem = typeof cartItemsTable.$inferInsert
export type SelectCartItem = typeof cartItemsTable.$inferSelect 