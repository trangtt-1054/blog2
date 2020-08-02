import React, { FC } from "react"
import { Link } from "gatsby"

type Props = {
  tags: [string]
}

const TagList: FC<Props> = props => {
  const { tags } = props
  return (
    <div>
      {tags.map((tag, i) => (
        <span key={i} style={{ background: "yellow", marginRight: 10 }}>
          <Link
            // onClick={() => dispatch({ type: "PAGE_CHANGE", payload: 1 })}
            to={`/stories/tags/${tag.toLowerCase()}`}
            style={{ textDecoration: "none" }}
          >
            {tag}
          </Link>
        </span>
      ))}
    </div>
  )
}

export default TagList
