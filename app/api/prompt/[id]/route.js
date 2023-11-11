import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import { Request, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate("creator")
    if (!prompt) return new Response("Prompt not found", { status: 404 })

    return new Response(JSON.stringify(prompt), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
  } catch (error) {
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

    return new Response(JSON.stringify(existingPrompt), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      } })
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 })
  }
}

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndRemove(params.id)

    return new Response("Prompt deleted successfully", { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      } 
    })
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 })
  }
}
