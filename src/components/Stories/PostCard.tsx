import React, { FC, useRef, useEffect, useState } from "react"
import { Link } from "gatsby"
import TagList from "../TagList"
import Img from "gatsby-image"
import styled from "styled-components"
import { light, common } from "../../theme"

type Props = {
  post: any
}

const PostCard: FC<Props> = props => {
  const cardRef = useRef(null)
  const [span, setSpan] = useState(0)
  const {
    post: {
      node: {
        frontmatter: { title, meta_title, slug, tags, featureImage },
      },
    },
  } = props

  const calculateSpan = () => {
    const height = cardRef.current.clientHeight + 36
    const span = Math.ceil(height / 10)
    setSpan(span)
  }

  useEffect(() => calculateSpan(), [cardRef.current])

  return (
    <Card span={span}>
      <div ref={cardRef}>
        <Thumb>
          <Img fluid={featureImage.childImageSharp.fluid} alt={title}></Img>
        </Thumb>
        <div>
          <PostTitle to={`/stories/${slug}`}>{title}</PostTitle>
        </div>
      </div>
    </Card>
  )
}

export default PostCard

const Card = styled.div`
  grid-row-end: ${({ span }) => `span ${span}`};
  width: 100%;
  border: ${light.mainBorder};
  padding: 8px 8px 20px 8px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: white;
`

const Thumb = styled.div`
  width: 100%;
  border-radius: 7px;
  border: ${light.subBorder};
  overflow: hidden;
`
const PostTitle = styled(Link)`
  font-weight: 700;
`
