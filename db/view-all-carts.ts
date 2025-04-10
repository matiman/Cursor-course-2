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

async function viewAllCarts() {
  try {
    console.log("Fetching all carts and their items...")
    
    // Get all carts
    const carts = await sql`
      SELECT * FROM cart
    `
    
    console.log("\nAll Carts:")
    console.table(carts)

    // Get all cart items
    const cartItems = await sql`
      SELECT ci.*, c.user_id
      FROM cart_items ci
      JOIN cart c ON ci.cart_id = c.id
    `

    console.log("\nAll Cart Items:")
    console.table(cartItems)
  } catch (error) {
    console.error("Error viewing carts:", error)
  } finally {
    await sql.end()
  }
}

viewAllCarts() 