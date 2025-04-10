import postgres from "postgres"
import * as dotenv from "dotenv"

// Load environment variables
dotenv.config({ path: '.env.local' })

const connectionString = process.env.DATABASE_URL!
const sql = postgres(connectionString, {
  ssl: {
    rejectUnauthorized: false
  }
})

async function viewCart(userId: string) {
  try {
    console.log(`Fetching cart for user: ${userId}`)
    
    // First get the cart
    const cart = await sql`
      SELECT * FROM cart WHERE user_id = ${userId}
    `
    
    if (cart.length === 0) {
      console.log("No cart found for this user")
      return
    }

    // Then get cart items
    const cartItems = await sql`
      SELECT ci.* 
      FROM cart_items ci
      JOIN cart c ON ci.cart_id = c.id
      WHERE c.user_id = ${userId}
    `

    console.log("\nCart Items:")
    console.table(cartItems)
  } catch (error) {
    console.error("Error viewing cart:", error)
  } finally {
    await sql.end()
  }
}

viewCart("bestmati1") 