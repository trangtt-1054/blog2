import React, { FC } from "react"
import PostCard from "./PostCard"

type Props = {
  myList: any
  hasMore: boolean
  seeMore: () => void
}

const PostList: FC<Props> = props => {
  const { myList, hasMore, seeMore } = props
  return (
    <div>
      {myList.map((post: any) => (
        <PostCard key={post.node.id} post={post} />
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
