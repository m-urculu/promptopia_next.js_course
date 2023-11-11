"use client"
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  //-----------------------useState's for storing data---------------------------//
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
  })

  useEffect(() => {
    fetchPosts() // initial fetch
  }, [])

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", { 
      next: { tags: ['posts'] },
    })
    const data = await response.json()

    const imagePosts = data.filter((post) => post.img !== "")
    const textPosts = data.filter((post) => post.img === "")

    setState((oldState) => ({
      ...oldState,
      posts: data,
      renderedPosts: data,
      imagePosts,
      textPosts,
    }))
  }

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
      e.preventDefault();
    }
  };

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
