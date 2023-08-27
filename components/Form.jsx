import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  handleImageChange,
}) => {
  const [tagInput, setTagInput] = useState(post.tag)
  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      const { value } = inputRef.current

      const words = value.split(" ")

      const hashWords = words.map((word) =>
        word && !word.startsWith("#") ? `#${word}` : word
      )

      const newValue = hashWords.join(" ")

      setPost({ ...post, tag: newValue })
    }
  }, [tagInput])

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='purple_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex 
        flex-col gap-5 mb-4 glassmorphism'
      >
        <label>
          <span
            className='font-satoshi font-semibold 
          text-base text-gray-200'
          >
            Title
          </span>
          <textarea
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder='Write your title here...'
            required
            className='form_titlearea max-h-11'
          />
        </label>
        <div className='flex-center'>
          <img src={post.img} className='max-w-xs flex-center' />
        </div>
        <span
          className='flex space-x-3 text-sm 
        bg_purple_gradient rounded-full text-white'
        >
          <label
            htmlFor='file-upload'
            className='white_img_btn'
            style={{ cursor: "pointer" }}
          >
            Choose Image
          </label>
          <input
            id='file-upload'
            accept='image/*'
            type='file'
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <p className='my-1' id='file-name'>
            No Image Chosen
          </p>
        </span>
        <label>
          <span
            className='font-satoshi font-semibold 
          text-base text-gray-200'
          >
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            required
            className='form_textarea'
          />
        </label>
        <label>
          <span
            className='font-satoshi font-semibold 
          text-base text-gray-200'
          >
            Tag {` `}
            <span className='font-normal text-gray-400 text-sm'>
              (#chatGPT, #fitness, #webdevelopment, #midjourney,
              #stable-difussion)
            </span>
          </span>

          <input
            ref={inputRef}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onBlur={() => {
              const { value } = inputRef.current

              const words = value.split(" ")

              const hashWords = words.map((word) =>
                word && !word.startsWith("#") ? `#${word}` : word
              )

              const newValue = hashWords.join(" ")

              setTagInput(newValue)
            }}
            placeholder='#tag'
            required
            className='form_input'
          />
        </label>
        <div className='flex-end mx-3 mt-0.5 gap-5'>
          <Link href='/' className='text-gray-200 text-sm'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm 
            bg-purple-700 rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
