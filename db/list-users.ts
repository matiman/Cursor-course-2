import { createClerkClient } from "@clerk/backend";
import * as dotenv from "dotenv"

// Load environment variables
dotenv.config({ path: '.env.local' })

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function listUsers() {
  try {
    console.log("Fetching users from Clerk...")
    
    const { data: users } = await clerk.users.getUserList()
    
    if (!users || users.length === 0) {
      console.log("\nNo users found.")
      return
    }

    console.log("\nUsers:")
    users.forEach(user => {
      console.log("\nUser Details:")
      console.log("----------------")
      console.log("ID:", user.id)
      console.log("Name:", user.firstName, user.lastName)
      console.log("Email:", user.emailAddresses[0]?.emailAddress)
      console.log("Created:", new Date(user.createdAt).toLocaleString())
      console.log("Last Sign In:", user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : 'Never')
      console.log("----------------")
    })

    // Search for specific user
    console.log("\nSearching for mathias.abdissa@gmail.com...")
    const specificUser = users.find(user => 
      user.emailAddresses[0]?.emailAddress === "mathias.abdissa@gmail.com"
    )

    if (specificUser) {
      console.log("\nFound user mathias.abdissa@gmail.com!")
      console.log("User ID:", specificUser.id)
      console.log("Name:", specificUser.firstName, specificUser.lastName)
      console.log("Created:", new Date(specificUser.createdAt).toLocaleString())
    } else {
      console.log("\nUser mathias.abdissa@gmail.com not found.")
    }
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}

listUsers() 