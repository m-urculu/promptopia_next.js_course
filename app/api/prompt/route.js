import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate("creator")

    return new Response(JSON.stringify(prompts), {
      status: 200,
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
