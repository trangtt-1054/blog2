import React from "react"
import { Link } from "gatsby"

const TagList = props => {
  const { tags } = props
  return (
    <div>
      {tags.map((tag, i) => (
        <span key={i} style={{ background: "yellow", marginRight: 10 }}>
          <Link to={`/stories/tags/${tag.toLowerCase()}`}>{tag}</Link>
        </span>
      ))}
    </div>
  )
}

export default TagList
