import React from "react"
import { Link } from "gatsby"
import usePagination from "../../hooks/usePagination"

const perPage = 3

const PostList = props => {
  const { posts } = props
  const { filtered, hasNextPage, loadNextPage } = usePagination({
    list: posts,
    perPage,
  })
  console.log(filtered)
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
          <button onClick={loadNextPage}>More Rubbish Posts</button>
        </div>
      ) : null}
    </div>
  )
}

export default PostList
