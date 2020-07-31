import React, { useContext } from "react"
import { Link } from "gatsby"
//import usePagination from "../../hooks/usePagination"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"

const perPage = 3

const PostList = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const { posts } = props
  // const { filtered, hasNextPage, loadNextPage } = usePagination({
  //   list: posts,
  //   perPage,
  // })

  const hasMore = state.pageIndex * perPage < posts.length ? true : false

  const seeMore = () => {
    if (!hasMore) {
      return
    }
    dispatch({ type: "NEXT_PAGE" })
  }

  // const handleClick = () => {
  //   if (!hasNextPage) {
  //     return
  //   }
  //   dispatch({ type: "NEXT_PAGE" })
  // }

  const myList = posts.slice(0, state.pageIndex * perPage)
  console.log(myList)

  //console.log(state)
  return (
    <div>
      <p>page: {state.pageIndex}</p>
      <button onClick={seeMore}>Increase</button>
      {myList.map(post => (
        <div key={post.node.id}>
          <Link to={`/stories/${post.node.frontmatter.slug}`}>
            <h2>{post.node.frontmatter.title}</h2>
          </Link>
          <p>
            {post.node.frontmatter.tags.map((tag, i) => (
              <span key={i} style={{ background: "yellow", marginRight: 10 }}>
                {tag}
              </span>
            ))}
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
