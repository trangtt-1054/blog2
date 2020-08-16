import React, { FC } from "react"
import PostCard from "./PostCard"
import styled from "styled-components"
import Button from "../primitive/Button"
import { size } from "../../theme/size"

type Props = {
  myList: any
  hasMore: boolean
  seeMore: () => void
}

const PostList: FC<Props> = props => {
  const { myList, hasMore, seeMore } = props
  return (
    <div>
      <PostGrid>
        {myList.map((post: any) => (
          <PostCard key={post.node.id} post={post} />
        ))}
      </PostGrid>
      {hasMore ? (
        <div style={{ textAlign: "center", paddingTop: 30 }}>
          <Button text="more rubbish" onClick={seeMore} size="main" />
        </div>
      ) : null}
    </div>
  )
}

export default PostList

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;

  ${size("xl")} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`
