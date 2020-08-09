import React, { useContext, useState, FC } from "react"
import { Link } from "gatsby"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"
import TagList from "../TagList"

//const perPage = 3

type Props = {
  myList: any
  hasMore: boolean
  seeMore: () => void
}

const PostList: FC<Props> = props => {
  const { myList, hasMore, seeMore } = props
  // const dispatch = useContext(GlobalDispatchContext)
  // const state = useContext(GlobalStateContext)
  // const { posts } = props

  // const getSearchedPosts = (keyword: string) => {
  //   const allPosts = [...posts]
  //   const regex = new RegExp(keyword, "gi")
  //   const searchResults = allPosts.reduce((acc, post) => {
  //     if (post.node.frontmatter.title.match(regex)) {
  //       acc.push(post)
  //     }
  //     return acc
  //   }, [])
  //   return searchResults
  // }

  // const initialSource = state.searchTerm
  //   ? getSearchedPosts(state.searchTerm)
  //   : posts
  // const [postSource, setPostSource] = useState(initialSource)
  // const hasMore = state.pageIndex * perPage < postSource.length ? true : false

  // const seeMore = () => {
  //   if (!hasMore) {
  //     return
  //   }
  //   dispatch({ type: "PAGE_CHANGE", payload: state.pageIndex + 1 })
  // }

  // const handleChange = (e: any) => {
  //   dispatch({ type: "SEARCH", payload: e.target.value })
  //   dispatch({ type: "PAGE_CHANGE", payload: 1 })
  //   setPostSource(getSearchedPosts(e.target.value))
  // }

  // const myList = postSource.slice(0, state.pageIndex * perPage)
  return (
    <div>
      {/* {state.searchTerm && "terms exist"}
      <div style={{ margin: 20 }}>
        <input
          name="search"
          type=""
          id="search"
          placeholder="Search Posts"
          onChange={handleChange}
          value={state.searchTerm}
        />
      </div> */}
      {myList.map((post: any) => (
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
