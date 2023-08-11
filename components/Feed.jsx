// "use client"

// import { useState, useEffect } from "react"
// import PromptCard from "./PromptCard"

// const PromptCardList = ({ data, handleTagClick }) => {
//   return (
//     <div className='mt-16 prompt_layout'>
//       {data.map((post) => (
//         <PromptCard
//           key={post._id}
//           post={post}
//           handleTagClick={handleTagClick}
//         />
//       ))}
//     </div>
//   )
// }
// const Feed = () => {
//   //-----------------------useState's for storing data---------------------------//
//   // Posts state
//   const [posts, setPosts] = useState([])
//   const [renderedPosts, setRenderedPosts] = useState([])

//   // Search states
//   const [searchText, setSearchText] = useState("")
//   const [searchTimeout, setSearchTimeout] = useState(null)
//   const [searchResults, setSearchResults] = useState([])

//   // Pre-filtered states
//   const [imagePosts, setImagePosts] = useState([])
//   const [textPosts, setTextPosts] = useState([])

//   // On-click states
//   const [isTextClicked, setIsTextClicked] = useState(false)
//   const [isImageClicked, setIsImageClicked] = useState(false)
//   //----------------------------------------------------------------------------//

//   //~-~-~-~-~-~-~-~-~-~-~-~-fetchPosts~-~-~-~-~-~-~-~-~-~-~-~-~-//
//   useEffect(() => {
//     fetchPosts()
//   }, [])
//   //~-~-~-~-~-~--~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-//

//   //------------------------------Fetch data------------------------------------//
//   const fetchPosts = async () => {
//     const response = await fetch("/api/prompt")
//     const data = await response.json()

//     //Store post data
//     setPosts(data)
//     setRenderedPosts(data)

//     //Auto-filter image posts
//     const imagePosts = data.filter((post) => post.img !== "")
//     setImagePosts(imagePosts)

//     //Auto-filter text posts
//     const textPosts = data.filter((post) => post.img === "")
//     setTextPosts(textPosts)

//     console.log(
//       `async fetchPosts called, data:${data}, posts:${posts}, textPosts:${textPosts}, imagePosts:${imagePosts}`
//     )
//   }
//   //----------------------------------------------------------------------------//

//   //---------------------------Search text handler------------------------------//
//   const handleSearchChange = (e) => {
//     clearTimeout(searchTimeout)
//     setSearchText(e.target.value)

//     // debounce method
//     setSearchTimeout(
//       setTimeout(() => {
//         const searchResults = filterPrompts(e.target.value)
//         setSearchResults(searchResults)
//       }, 500)
//     )
//   }
//   // Search filter
//   const filterPrompts = (searchText) => {
//     const regex = new RegExp(searchText, "i")
//     return posts.filter(
//       (item) =>
//         regex.test(item.creator.username) ||
//         regex.test(item.tag) ||
//         regex.test(item.prompt)
//     )
//   }
//   //Handle tag click filter
//   const handleTagClick = (tagName) => {
//     setSearchText(tagName)

//     const searchResult = filterPrompts(tagName)
//     setSearchResults(searchResult)
//   }
//   //----------------------------------------------------------------------------//

//   //----------on-click setPosts to pre-filtered posts (text || image)-----------//
//   const setTextFilter = () => {
//     setIsTextClicked(!isTextClicked)
//     if (!isTextClicked) {
//       setRenderedPosts(textPosts)
//       setIsImageClicked(false)
//     } else if (isTextClicked) {
//       setRenderedPosts(posts)
//     }
//   }
//   const setImageFilter = () => {
//     setIsImageClicked(!isImageClicked)
//     if (!isImageClicked) {
//       setRenderedPosts(imagePosts)
//       setIsTextClicked(false)
//     } else if (isImageClicked) {
//       setRenderedPosts(posts)
//     }
//   }
//   //----------------------------------------------------------------------------//

//   return (
//     <section className='feed'>
//       <form className='relative w-full flex-center'>
//         <input
//           type='text'
//           placeholder='Search for a tag or a username'
//           value={searchText}
//           onChange={handleSearchChange}
//           required
//           className='search_input peer'
//         />
//       </form>
//       <div className='flex mt-10 space-x-10'>
//         <button
//           type='button'
//           onClick={setTextFilter}
//           className={`outline_btn ${isTextClicked ? "clicked" : ""}`}
//         >
//           Text
//         </button>
//         <button
//           type='button'
//           onClick={setImageFilter}
//           className={`outline_btn ${isImageClicked ? "clicked" : ""}`}
//         >
//           Image
//         </button>
//       </div>

//       {searchText ? (
//         <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
//       ) : (
//         <PromptCardList data={renderedPosts} handleTagClick={handleTagClick} />
//       )}
//     </section>
//   )
// }

// export default Feed

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
    const response = await fetch("/api/prompt")
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