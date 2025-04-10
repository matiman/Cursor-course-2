"use server"

import { db } from "@/db/db"
import { cartItemsTable, cartTable, InsertCartItem, SelectCartItem } from "@/db/schema"
import { ActionState } from "@/types"
import { eq, and } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

export async function getCartAction(): Promise<ActionState<SelectCartItem[]>> {
  try {
    const { userId } = await auth()
    if (!userId) {
      console.log("User not authenticated")
      return { isSuccess: false, message: "User not authenticated" }
    }

    console.log("Getting cart for user:", userId)

    // Get or create cart
    let [cart] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userId, userId))

    if (!cart) {
      console.log("Creating new cart for user:", userId)
      try {
        [cart] = await db
          .insert(cartTable)
          .values({ userId })
          .returning()
        console.log("New cart created:", cart)
      } catch (error) {
        console.error("Error creating cart:", error)
        if (error instanceof Error) {
          console.error("Error details:", error.message)
          console.error("Error stack:", error.stack)
        }
        throw error
      }
    }

    console.log("Cart found/created:", cart)

    // Get cart items
    try {
      const items = await db
        .select()
        .from(cartItemsTable)
        .where(eq(cartItemsTable.cartId, cart.id))

      console.log("Cart items:", items)

      return {
        isSuccess: true,
        message: "Cart retrieved successfully",
        data: items
      }
    } catch (error) {
      console.error("Error getting cart items:", error)
      if (error instanceof Error) {
        console.error("Error details:", error.message)
        console.error("Error stack:", error.stack)
      }
      throw error
    }
  } catch (error) {
    console.error("Error getting cart:", error)
    if (error instanceof Error) {
      console.error("Error details:", error.message)
      console.error("Error stack:", error.stack)
    }
    return { isSuccess: false, message: "Failed to get cart" }
  }
}

export async function addToCartAction(
  item: Omit<InsertCartItem, "cartId" | "id" | "createdAt" | "updatedAt">
): Promise<ActionState<SelectCartItem>> {
  try {
    const { userId, sessionId } = await auth()
    console.log("Auth state:", { userId, sessionId })
    
    if (!userId) {
      console.log("User not authenticated")
      return { isSuccess: false, message: "User not authenticated" }
    }

    console.log("Adding item to cart:", item)

    // Get or create cart
    let [cart] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userId, userId))

    if (!cart) {
      console.log("Creating new cart for user:", userId)
      try {
        [cart] = await db
          .insert(cartTable)
          .values({ userId })
          .returning()
        console.log("New cart created:", cart)
      } catch (error) {
        console.error("Error creating cart:", error)
        if (error instanceof Error) {
          console.error("Error details:", error.message)
          console.error("Error stack:", error.stack)
        }
        throw error
      }
    }

    console.log("Cart found/created:", cart)

    // Check if item already exists
    const [existingItem] = await db
      .select()
      .from(cartItemsTable)
      .where(
        and(
          eq(cartItemsTable.cartId, cart.id),
          eq(cartItemsTable.productId, item.productId)
        )
      )

    if (existingItem) {
      console.log("Item already exists, updating quantity:", existingItem)
      // Update quantity
      const [updatedItem] = await db
        .update(cartItemsTable)
        .set({ 
          quantity: existingItem.quantity + item.quantity,
          updatedAt: new Date()
        })
        .where(eq(cartItemsTable.id, existingItem.id))
        .returning()

      console.log("Updated item:", updatedItem)

      return {
        isSuccess: true,
        message: "Cart item updated successfully",
        data: updatedItem
      }
    }

    // Add new item
    const newItemData = {
      ...item,
      cartId: cart.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    console.log("Adding new item with data:", newItemData)

    try {
      const [newItem] = await db
        .insert(cartItemsTable)
        .values(newItemData)
        .returning()

      console.log("New item added:", newItem)

      return {
        isSuccess: true,
        message: "Item added to cart successfully",
        data: newItem
      }
    } catch (insertError) {
      console.error("Error inserting item:", insertError)
      if (insertError instanceof Error) {
        console.error("Insert error details:", insertError.message)
        console.error("Insert error stack:", insertError.stack)
      }
      throw insertError
    }
  } catch (error) {
    console.error("Error adding to cart:", error)
    if (error instanceof Error) {
      console.error("Error details:", error.message)
      console.error("Error stack:", error.stack)
    }
    return { isSuccess: false, message: "Failed to add item to cart" }
  }
}

export async function updateCartItemQuantityAction(
  itemId: string,
  quantity: number
): Promise<ActionState<SelectCartItem>> {
  try {
    const { userId } = await auth()
    if (!userId) {
      console.log("User not authenticated")
      return { isSuccess: false, message: "User not authenticated" }
    }

    console.log("Updating quantity for item:", itemId, "to:", quantity)

    const [updatedItem] = await db
      .update(cartItemsTable)
      .set({ 
        quantity,
        updatedAt: new Date()
      })
      .where(eq(cartItemsTable.id, itemId))
      .returning()

    console.log("Updated item:", updatedItem)

    return {
      isSuccess: true,
      message: "Cart item updated successfully",
      data: updatedItem
    }
  } catch (error) {
    console.error("Error updating cart item:", error)
    if (error instanceof Error) {
      console.error("Error details:", error.message)
      console.error("Error stack:", error.stack)
    }
    return { isSuccess: false, message: "Failed to update cart item" }
  }
}

export async function removeFromCartAction(
  itemId: string
): Promise<ActionState<void>> {
  try {
    const { userId } = await auth()
    if (!userId) {
      console.log("User not authenticated")
      return { isSuccess: false, message: "User not authenticated" }
    }

    console.log("Removing item from cart:", itemId)

    await db.delete(cartItemsTable).where(eq(cartItemsTable.id, itemId))

    console.log("Item removed successfully")

    return {
      isSuccess: true,
      message: "Item removed from cart successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error removing from cart:", error)
    if (error instanceof Error) {
      console.error("Error details:", error.message)
      console.error("Error stack:", error.stack)
    }
    return { isSuccess: false, message: "Failed to remove item from cart" }
  }
} 