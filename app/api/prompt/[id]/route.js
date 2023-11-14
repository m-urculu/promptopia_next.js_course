import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import { revalidatePath } from "next/cache"

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate("creator")
    if (!prompt) return new Response("Prompt not found", { status: 404 })

    revalidatePath("/api/prompt") // Purge the server cache for the '/api/prompt' path

    return new Response(JSON.stringify(prompt), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate", // Added Cache-Control header
      },
    })
  } catch (error) {
    console.log(error)
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}

// PATCH (update)

export const PATCH = async (request, { params }) => {
  const { title, img, prompt, tag } = await request.json()

  try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 })

    existingPrompt.title = title
    existingPrompt.img = img
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    revalidatePath("/api/prompt") // Purge the server cache for the '/api/prompt' path

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate", // Added Cache-Control header
      },
    })
  } catch (error) {
    console.log(error)
    return new Response("Failed to update prompt", { status: 500 })
  }
}

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndDelete(params.id)

    revalidatePath("/api/prompt") // Purge the server cache for the '/api/prompt' path

    return new Response("Prompt deleted successfully", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate", // Added Cache-Control header
      },
    })
  } catch (error) {
    console.log(error)
    return new Response("Failed to delete prompt", { status: 500 })
  }
}
