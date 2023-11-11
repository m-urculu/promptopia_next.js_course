import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import { Request, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
 
// export async function POST(Request) {
//   revalidateTag('posts'); // Purge all data with the 'posts' tag
//   const { userId, title, prompt, tag, img } = await req.json()

//   try {
//     await connectToDB()
//     const newPrompt = new Prompt({
//       creator: userId,
//       title,
//       prompt,
//       tag,
//       img,
//     })

//     await newPrompt.save()

//     return new Response(JSON.stringify({ 
//       prompt: newPrompt, 
//       revalidated: true,
//       now: Date.now()
//     }), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//   } catch (error) {
//     return new Response("Failed to create a new prompt", { status: 500 })
//   }
// }

export async function POST(Request) {
  revalidateTag('posts'); // Purge all data with the 'posts' tag
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
    
    return NextResponse.json({ 
      prompt: newPrompt, 
      revalidated: true,
      now: Date.now()
    });
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
