import React, { useContext, useState } from "react"
import { Link } from "gatsby"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"
import TagList from "../TagList"

const perPage = 3

const PostList = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const { posts } = props

  const allPosts = [...posts]
  const regex = new RegExp(state.searchTerm, "gi")
  const searchResults = allPosts.reduce((acc, post) => {
    if (post.node.frontmatter.title.match(regex)) {
      acc.push(post)
    }
    return acc
  }, [])
  const initialSource = state.searchTerm ? searchResults : posts
  //const [foundPosts, setFoundPosts] = useState([])
  const [postSource, setPostSource] = useState(initialSource)
  const hasMore = state.pageIndex * perPage < postSource.length ? true : false

  const seeMore = () => {
    if (!hasMore) {
      return
    }
    dispatch({ type: "PAGE_CHANGE", payload: state.pageIndex + 1 })
    console.log(state.pageIndex)
  }

  const handleChange = e => {
    console.log(e.target.value)
    dispatch({ type: "SEARCH", payload: e.target.value })
    dispatch({ type: "PAGE_CHANGE", payload: 1 })
    handleSearch(e.target.value)
  }

  const handleSearch = keyword => {
    console.log(keyword)
    //console.log(keyword)
    // if (!keyword) {
    //   console.log("clear search")
    // }
    const allPosts = [...posts]
    const regex = new RegExp(keyword, "gi")
    const searchResults = allPosts.reduce((acc, post) => {
      if (post.node.frontmatter.title.match(regex)) {
        acc.push(post)
      }
      return acc
    }, [])
    console.log(searchResults)
    setPostSource(searchResults)
  }

  // const getSource = () => {
  //   if (state.searchTerm) {
  //     if (foundPosts.length === 0) {
  //       handleSearch(state.searchTerm)
  //     }
  //     return foundPosts
  //   }
  //   return posts
  // }

  //state.searchTerm && handleSearch(state.searchTerm)
  const myList = postSource.slice(0, state.pageIndex * perPage)
  return (
    <div>
      {state.searchTerm && "terms exist"}
      <div style={{ margin: 20 }}>
        <input
          name="search"
          type=""
          id="search"
          placeholder="Search Posts"
          onChange={handleChange}
          value={state.searchTerm}
        />
      </div>
      {/* <p>page: {state.pageIndex}</p>
      <button onClick={seeMore}>Increase</button> */}
      {myList.map(post => (
        <div key={post.node.id}>
          <Link to={`/stories/${post.node.frontmatter.slug}`}>
            <h2>{post.node.frontmatter.title}</h2>
          </Link>
          <div>
            <TagList tags={post.node.frontmatter.tags} />
            <span>{post.node.frontmatter.date}</span>
            {post.node.frontmatter.meta_title}
          </div>
        </div>
      ))}
      {hasMore ? (
        <div style={{ margin: "auto" }}>
          <button onClick={seeMore}>More Rubbish Posts</button>
        </div>
      ) : null}
    </div>
  )
}

export default PostList
