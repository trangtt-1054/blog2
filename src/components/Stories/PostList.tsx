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
        <div style={{ textAlign: "center" }}>
          <SeeMoreButton onClick={seeMore}>more rubbish</SeeMoreButton>
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

const SeeMoreButton = styled.button`
  border: 4px solid #33302b;
  background: transparent;
  border-radius: 10px;
  height: 44px;
  font-weight: 800;
  color: #33302b;
  font-size: 20px;
  padding: 0 15px 6px;
  &:focus {
    outline: 0;
  }
  &:hover {
    background: #f5d7d4;
  }
`
