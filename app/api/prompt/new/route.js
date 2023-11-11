import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async (req, res) => {
  const { userId, title, prompt, tag, img } = await req.json()

  try {
    await connectToDB()
    const newPrompt = new Prompt({
      creator: userId,
      title,
      prompt,
      tag,
      img,
    })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
     })
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 })
  }
}
