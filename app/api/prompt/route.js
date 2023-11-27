import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import mongoose from "mongoose"

// fetch prompts on database

export const GET = async (request) => {
  try {
    //connect to db
    await connectToDB()
    //definitions
    const User = mongoose.models.User || mongoose.model("User", userSchema)
    const url = new URL(request.url)
    const page = url.searchParams.get("page")
    console.log(`server page:${page}`) // Output: 1 // Get the page number from the request query parameters
    const perPage = 6 // Number of prompts per page
    const skip = (page - 1) * perPage // Calculate the number of prompts to skip
    //fetch appropriate prompts
    const prompts = await Prompt.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .populate("creator")
    //return prompts
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
        message: "Failed to fetch prompts",
        error: error.message,
      }),
      { status: 500 }
    )
  }
}
