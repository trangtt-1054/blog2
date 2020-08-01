import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import Downshift from "downshift"

const gotoPost = post => {
  navigate("/")
}

const Search = () => {
  const data = useStaticQuery(query)
  const [posts, filterPosts] = useState(data.allMdx.edges)
  const searchInput = useRef(null)
  const onChange = value => {
    console.log(value)
    if (value === "") filterPosts(data)
    const searchResults = posts.filter(post =>
      post.node.frontmatter.title.includes(value)
    )
    console.log(value)
    console.log(searchResults)
    filterPosts(searchResults)
    console.log(searchResults)
  }

  return (
    <Downshift
      onChange={gotoPost}
      itemToString={post => (post ? post.title : "")}
    >
      {({ getInputProps, getItemProps, highlightedIndex, getMenuProps }) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              position: "relative",
              margin: 20,
            }}
          >
            <input
              ref={searchInput}
              {...getInputProps({
                name: "search",
                type: "text",
                placeholder: "Search Posts",
                id: "search",
                onChange: e => {
                  e.persist()
                  onChange(e.target.value)
                },
              })}
            />
          </div>
        )
      }}
    </Downshift>
  )
}

export default Search

const query = graphql`
  query searchQuery {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YY")
            title
            slug
            tags
            meta_title
          }
          id
        }
      }
    }
  }
`
