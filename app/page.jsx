"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("/prompts") // Redirect to the '/prompts' page on load
  }, [])

  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-600'>
          {" "}
          AI Prompts
        </span>
      </h1>
      <p className='desc text-center'>
        Promptopia is an AI tool to discover, create and share creative prompts.
      </p>
    </section>
  )
  // Your component JSX goes here
}

export default Home
