import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import { revalidatePath } from "next/cache"

export const POST = async (req, res) => {
  const { userId, title, prompt, tag, img, date } = await req.json()

  try {
    await connectToDB()
    const newPrompt = new Prompt({
      creator: userId,
      title,
      prompt,
      tag,
      img,
      date,
    })

    const savePrompt = async () => {
      if (newPrompt.creator != undefined) {
        newPrompt.save()
      } else {
        return new Response("Failed to create due to missing User.", {
          status: 500,
        })
      }
    }
    await savePrompt()

    revalidatePath("/api/prompt") // Purge the server cache for the '/api/prompt' path

    return new Response(
      JSON.stringify({
        prompt: newPrompt,
        revalidated: true,
        now: Date.now(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    console.log(error)
    return new Response("Failed to create a new prompt", { status: 500 })
  }
}
