import React, { useEffect, useContext, useState } from "react"
import { Link } from "gatsby"
import usePagination from "../../hooks/usePagination"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"
import { useStaticQuery, graphql } from "gatsby"

const perPage = 3

const PostList = props => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(limit: 3) {
        edges {
          node {
            frontmatter {
              date(formatString: "MMMM DD, YY")
              title
              slug
              meta_title
            }
            id
          }
        }
      }
    }
  `)
  //console.log(data.allMdx.edges)
  const state = useContext(GlobalStateContext)
  useEffect(
    () => dispatch({ type: "FETCH_POSTS", payload: data.allMdx.edges }),
    []
  )
  console.log(state.posts)
  const dispatch = useContext(GlobalDispatchContext)
  const { posts } = props
  const { filtered, hasNextPage, loadNextPage } = usePagination({
    list: posts,
    perPage,
  })

  const handleClick = () => {
    loadNextPage()

    dispatch({ type: "FETCH_POSTS", payload: filtered })
  }
  return (
    <div>
      {filtered.map(post => (
        <div key={post.node.id}>
          <Link to={`/stories/${post.node.frontmatter.slug}`}>
            <h2>{post.node.frontmatter.title}</h2>
          </Link>
          <p>
            <span>{post.node.frontmatter.date}</span>
            {post.node.frontmatter.meta_title}
          </p>
        </div>
      ))}
      {hasNextPage ? (
        <div style={{ margin: "auto" }}>
          <button onClick={handleClick}>More Rubbish Posts</button>
        </div>
      ) : null}
    </div>
  )
}

export default PostList
