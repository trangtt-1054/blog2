import React, { FC } from "react"
import { Link } from "gatsby"
import TagList from "../TagList"
import Img from "gatsby-image"
import styled from "styled-components"

type Props = {
  post: any
}

const PostCard: FC<Props> = props => {
  const {
    post: {
      node: {
        frontmatter: { title, meta_title, slug, tags, featureImage },
      },
    },
  } = props

  return (
    <Card>
      <Thumb>
        <Img fluid={featureImage.childImageSharp.fluid} alt={title}></Img>
      </Thumb>
      <div>
        <PostTitle to={`/stories/${slug}`}>{title}</PostTitle>
      </div>

      {/* <Link to={`/stories/${post.node.frontmatter.slug}`}>
        <h2>{post.node.frontmatter.title}</h2>
      </Link>
      <div>
        <TagList tags={post.node.frontmatter.tags} />
        <span>{post.node.frontmatter.date}</span>
        {post.node.frontmatter.meta_title}
      </div> */}
    </Card>
  )
}

export default PostCard

const Card = styled.div`
  width: 33.3%;
  border: 4px solid #33302b;
  padding: 8px 8px 20px 8px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`

const Thumb = styled.div`
  width: 100%;
  border-radius: 7px;
  border: 3px solid #33302b;
`
const PostTitle = styled(Link)`
  text-decoration: none;
  color: #33302b;
  font-weight: 700;
`
