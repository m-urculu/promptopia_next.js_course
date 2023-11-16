import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import mongoose from "mongoose"

// fetch prompts on database

export const GET = async (request) => {
  const now = new Date()
  const allowedTime = new Date("2023-11-16T22:59:00Z") // Replace with your desired time
  if (now >= allowedTime) {
    console.log(now)
    console.log(allowedTime)
    // Allow the request and return the response
    try {
      await connectToDB()
      const User = mongoose.models.User || mongoose.model("User", userSchema)
      const prompts = await Prompt.find({}).populate("creator")
      return new Response(JSON.stringify(prompts), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate", // Added Cache-Control header
        },
      })
    } catch (error) {
      console.error("An error occurred:", error.message)
      return new Response(
        JSON.stringify({
          message: "Failed to fetch all prompts",
          error: error.message,
        }),
        { status: 500 }
      )
    }
  } else {
    console.error("An error occurred:", error.message)
    return new Response(
      JSON.stringify(undefined, {
        status: 500,
        message: "Failed to fetch all prompts",
        error: error.message,
      })
    )
    // Deny the request or return a custom response
  }
}
