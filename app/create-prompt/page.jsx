"use client"

import React from "react"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    promt: "",
    tag: "",
  })

  // Handle Image state
  const [imageSrc, setImageSrc] = useState({
    img: "",
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setImageSrc({ img: reader.result })
      console.log({ img: reader.result })
    }

    if (file) {
      reader.readAsDataURL(file)
    } else {
      setImageSrc({ img: "" })
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
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          img: imageSrc.img,
        }),
      })
      if (response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      handleImageChange={handleImageChange}
      imageSrc={imageSrc}
    />
  )
}

export default CreatePrompt
