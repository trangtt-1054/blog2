import React from "react"

const TagList = props => {
  const { tags } = props
  return (
    <div>
      {tags.map((tag, i) => (
        <span key={i} style={{ background: "yellow", marginRight: 10 }}>
          {tag}
        </span>
      ))}
    </div>
  )
}

export default TagList
