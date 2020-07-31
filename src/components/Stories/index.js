import React, { useContext } from "react"
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
  const hasMore = state.pageIndex * perPage < posts.length ? true : false

  const seeMore = () => {
    if (!hasMore) {
      return
    }
    dispatch({ type: "NEXT_PAGE" })
  }

  const myList = posts.slice(0, state.pageIndex * perPage)

  return (
    <div>
      {/* <p>page: {state.pageIndex}</p>
      <button onClick={seeMore}>Increase</button> */}
      {myList.map(post => (
        <div key={post.node.id}>
          <Link to={`/stories/${post.node.frontmatter.slug}`}>
            <h2>{post.node.frontmatter.title}</h2>
          </Link>
          <p>
            <TagList tags={post.node.frontmatter.tags} />
            <span>{post.node.frontmatter.date}</span>
            {post.node.frontmatter.meta_title}
          </p>
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
