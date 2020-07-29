import React from "react"
import { Link } from "gatsby"

const PostList = props => {
  const { posts } = props
  return (
    <div>
      {posts.map(post => (
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
    </div>
  )
}

export default PostList
