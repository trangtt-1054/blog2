import React, { FC } from "react"
import PostCard from "./PostCard"
import styled from "styled-components"

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
        <div style={{ margin: "auto" }}>
          <button onClick={seeMore}>More Rubbish Posts</button>
        </div>
      ) : null}
    </div>
  )
}

export default PostList

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 10px;
`
