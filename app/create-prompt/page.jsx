"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getSession } from "next-auth/react"

import Form from "@components/Form"

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    img: "",
    title: "",
    prompt: "",
    tag: "",
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setPost({ img: reader.result })
      document.getElementById("file-name").textContent = e.target.files[0].name
    }

    if (file) {
      reader.readAsDataURL(file)
    } else {
      setPost({ img: "" })
    }
  }
  //

  const createPrompt = async (e) => {
    //prevent the browser from reloading the page when submitting the form
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          title: post.title,
          img: post.img,
          prompt: post.prompt,
          tag: post.tag,
        }),
      })
      if (response.ok) {
        await refreshSession()
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  const refreshSession = async () => {
    try {
      const refreshedSession = await getSession()
      refreshSession()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const interval = setInterval(refreshSession, 1000 * 60) // Refresh every hour
    return () => clearInterval(interval)
  }, [])

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      handleImageChange={handleImageChange}
    />
  )
}

export default CreatePrompt
