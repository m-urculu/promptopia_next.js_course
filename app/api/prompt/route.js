import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import User from "@models/user"
import mongoose from "mongoose"

// export const GET = async (request) => {
//   try {
//     await connectToDB()

//     const User = mongoose.models.User || mongoose.model("User", userSchema)

//     const prompts = await Prompt.find({}).populate("creator")

//     return new Response(JSON.stringify(prompts), {
//       status: 200,
//     })
//   } catch (error) {
//     console.error("An error occurred:", error.message)
//     return new Response(
//       JSON.stringify({
//         message: "Failed to fetch all prompts",
//         error: error.message,
//       }),
//       { status: 500 }
//     )
//   }
// }


export const GET = async (request) => {
  try {
    await connectToDB()

    const User = mongoose.models.User || mongoose.model("User", userSchema)

    const prompts = await Prompt.find({}).populate("creator")

    revalidatePath('/api/prompt') // Purge the server cache for the '/api/prompt' path

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Added Cache-Control header
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