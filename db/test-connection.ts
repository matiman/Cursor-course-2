import postgres from "postgres"
import * as dotenv from "dotenv"

// Load environment variables
dotenv.config({ path: '.env.local' })

const connectionString = process.env.DATABASE_URL
console.log("Connection string:", connectionString)

async function testConnection() {
  if (!connectionString) {
    console.error("DATABASE_URL is not defined")
    return
  }

  const sql = postgres(connectionString, {
    ssl: {
      rejectUnauthorized: false
    }
  })

  try {
    const result = await sql`SELECT version()`
    console.log("Connected successfully!")
    console.log("Postgres version:", result[0].version)
  } catch (error) {
    console.error("Connection error:", error)
  } finally {
    await sql.end()
  }
}

testConnection() 