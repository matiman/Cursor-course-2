import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is not set")
}

console.log("Connecting to database...")
console.log("Connection string:", connectionString.substring(0, 20) + "...")

const client = postgres(connectionString, {
  max: 1,
  ssl: "require",
  onnotice: (notice) => {
    console.log("Database notice:", notice)
  },
  onparameter: (parameter) => {
    console.log("Database parameter:", parameter)
  },
  onerror: (error) => {
    console.error("Database error:", error)
  }
})

console.log("Database client created")

export const db = drizzle(client, { schema })

// Test the connection
db.select().from(schema.cartTable).limit(1)
  .then(() => {
    console.log("Database connection successful")
    // Test schema
    console.log("Testing schema...")
    return db.select().from(schema.cartItemsTable).limit(1)
  })
  .then(() => {
    console.log("Schema test successful")
  })
  .catch((error) => {
    console.error("Database connection or schema test failed:", error)
    if (error instanceof Error) {
      console.error("Error details:", error.message)
      console.error("Error stack:", error.stack)
    }
  }) 