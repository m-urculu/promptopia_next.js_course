"use client"
import PromptCard from "./PromptCard"
import { v4 as uuidv4 } from "uuid"
import React, { useState, useEffect, useRef } from "react"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={uuidv4()} //Generate unique id for each post
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  //-----------------------useState's data---------------------------//
  const pageRef = useRef(1)
  const [state, setState] = useState({
    posts: [], // feed posts
    renderedPosts: [], // rendered posts on the screen
    searchText: "", // search text
    searchTimeout: null, // search timeout to debounce search
    searchResults: [], // search results for latest search
    imagePosts: [], // feed posts which contain images
    textPosts: [], // feed posts which only contain texts
    isTextClicked: false, // checks if text filter button clicked
    isImageClicked: false, // checks if image filter button clicked
    data: [],
  })

  //fetch posts from server dynamically
  const fetchPosts = async () => {
    console.log(state.data.length)
    if (state.data.length == 6 || pageRef.current == 1) {
      const response = await fetch(`/api/prompt?page=${pageRef.current}`)
      state.data = await response.json()
      console.log(state.data.length)
      console.log(state.data)
      //filter image and text posts
      const imagePosts = state.data.filter((post) => post.img !== "")
      const textPosts = state.data.filter((post) => post.img === "")
      setState((oldState) => ({
        ...oldState,
        posts: [...state.data, ...oldState.posts],
        renderedPosts: [...state.data, ...oldState.renderedPosts],
        imagePosts,
        textPosts,
      }))
    }
  }

  // handle scrolling logic
  useEffect(() => {
    //next page function
    const nextPage = () => {
      pageRef.current = pageRef.current + 1
    }

    //first page fetch
    if (pageRef.current == 1) {
      console.log(`client page:${pageRef.current}`)
      fetchPosts()
      nextPage()
      console.log(`client page:${pageRef.current}`)
    }

    //handle scrolling function
    const handleScroll = () => {
      const windowHeight =
        window.innerHeight || document.documentElement.offsetHeight
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )
      const windowBottom = windowHeight + window.scrollY
      //trigger
      if (windowBottom >= docHeight) {
        console.log(`client page:${pageRef.current}`)
        fetchPosts() // Call fetchPosts inside the setState callback
        nextPage()
        console.log(`client page:${pageRef.current}`)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // handle Search
  const handleSearchChange = (e) => {
    clearTimeout(state.searchTimeout)

    const newText = e.target.value

    setState((oldState) => ({
      ...oldState,
      searchText: newText,
      searchTimeout: setTimeout(() => {
        const searchResults = filterPrompts(newText)
        setState((oldState) => ({
          ...oldState,
          searchResults,
        }))
      }, 500),
    }))
  }

  // prevent page re-load when pressing enter in the search field
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }

  // filter the prompts by username, prompt and tag.
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i")
    return state.posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }

  //Handle tag click filter
  const handleTagClick = (tagName) => {
    setState((oldState) => ({
      ...oldState,
      searchText: tagName,
      searchResults: filterPrompts(tagName),
    }))
  }

  //ButtonText state function handling both cases in one function
  const handleButtonClick = (postType) => {
    const isVisible =
      postType === "text" ? state.isTextClicked : state.isImageClicked
    const posts = isVisible
      ? state.posts
      : postType === "text"
      ? state.textPosts
      : state.imagePosts

    setState((oldState) => ({
      ...oldState,
      isTextClicked: postType === "text" ? !isVisible : false,
      isImageClicked: postType === "image" ? !isVisible : false,
      renderedPosts: posts,
    }))
  }

  return (
    //... same JSX with updated states and renamed functions//
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={state.searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          required
          className='search_input peer'
        />
      </form>
      <div className='flex mt-10 space-x-10'>
        <button
          type='button'
          onClick={() => handleButtonClick("text")}
          className={`outline_btn ${state.isTextClicked ? "clicked" : ""}`}
        >
          Text
        </button>
        <button
          type='button'
          onClick={() => handleButtonClick("image")}
          className={`outline_btn ${state.isImageClicked ? "clicked" : ""}`}
        >
          Image
        </button>
      </div>

      {state.searchText ? (
        <PromptCardList
          data={state.searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={state.renderedPosts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed
