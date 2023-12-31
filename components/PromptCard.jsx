"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState("")

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile")

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000)
  }

  //truncate
  const [truncated, setTruncated] = useState(true)
  const toggleTruncation = () => {
    setTruncated(!truncated)
  }
  //

  const tags = post.tag.split(" ")

  // Rest of the component rendering

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          {post.creator && post.creator.image && (
            <Image
              src={post.creator.image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />
          )}

          <div className='flex flex-col'>
            <p className='font-satoshi font-semibold text-white'>
              {post?.creator?.username}
            </p>
            <p className='font-inter text-sm text-gray-200'>
              {post?.creator?.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt='copy_button'
          />
        </div>
      </div>

      <p className='my-4 text-center text-xl font-bold inline-block align-bottom text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 from-10% via-purple-500 via-30% to-red-400 to-90%'>
        {post.title}
      </p>

      <img
        alt=''
        className=' flex-center gap-4'
        width='360px'
        height='100%'
        src={post.img}
      />

      <p className={`card_text ${truncated ? "truncate-overflow" : ""}`}>
        {post.prompt}
      </p>

      {post.prompt.length > 100 && (
        <button
          className='mb-4 font-inter text-sm text-white/90 cursor-pointer hover:text-blue-500'
          onClick={toggleTruncation}
        >
          {truncated ? "Show More" : "Show Less"}
        </button>
      )}

      <div className='flex flex-row flex-wrap font-inter text-sm text-white/90'>
        {tags.map((tag, index) => (
          <div
            key={index}
            className='mr-2 cursor-pointer hover:text-blue-500'
            onClick={() => handleTagClick && handleTagClick(tag)}
          >
            {`${tag} `}
          </div>
        ))}
      </div>

      {session?.user.id === post?.creator?._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm text-purple-500 cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm text-red-500 cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
