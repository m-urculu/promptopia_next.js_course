import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import User from "@models/user"
import mongoose from "mongoose"
import { revalidateTag } from "next/cache"

export const GET = async (request) => {
  try {
    revalidateTag('posts') //purge cache with tag 'posts'

    await connectToDB()

    const User = mongoose.models.User || mongoose.model("User", userSchema)

    const prompts = await Prompt.find({}).populate("creator")

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
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
}
