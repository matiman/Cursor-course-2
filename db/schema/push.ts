import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./index"
import * as dotenv from "dotenv"

// Load environment variables
dotenv.config({ path: '.env.local' })

const connectionString = process.env.DATABASE_URL!
const sql = postgres(connectionString, {
  ssl: {
    rejectUnauthorized: false
  }
})

const db = drizzle(sql, { schema })

async function main() {
  try {
    console.log("Pushing schema to database...")
    
    // Drop existing tables
    await sql`DROP TABLE IF EXISTS cart_items CASCADE`
    await sql`DROP TABLE IF EXISTS cart CASCADE`
    
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS cart (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `
    
    await sql`
      CREATE TABLE IF NOT EXISTS cart_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        cart_id UUID NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
        product_id TEXT NOT NULL,
        name TEXT NOT NULL,
        price NUMERIC NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `
    
    console.log("Schema pushed successfully!")
  } catch (error) {
    console.error("Error pushing schema:", error)
  } finally {
    await sql.end()
  }
}

main() 