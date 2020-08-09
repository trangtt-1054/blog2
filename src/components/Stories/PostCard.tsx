import React, { FC } from "react"
import { Link } from "gatsby"
import TagList from "../TagList"
import styled from "styled-components"

type Props = {
  post: any
}

const PostCard: FC<Props> = props => {
  const { post } = props
  return (
    <div>
      <Link to={`/stories/${post.node.frontmatter.slug}`}>
        <h2>{post.node.frontmatter.title}</h2>
      </Link>
      <div>
        <TagList tags={post.node.frontmatter.tags} />
        <span>{post.node.frontmatter.date}</span>
        {post.node.frontmatter.meta_title}
      </div>
    </div>
  )
}

export default PostCard

const Card = styled.div`
  width: 200px;
  border: 4px solid #33302b;
`
