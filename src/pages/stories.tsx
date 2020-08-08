import React, { useContext, useEffect } from "react"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"
import Layout from "../components/Layout"
import PostList from "../components/Stories"

import { graphql } from "gatsby"

const Stories = (props: any) => {
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  useEffect(() => dispatch({ type: "SET_ACTIVE_TAB", payload: "tab-1" }), [])
  console.log(state)
  const {
    data: {
      allMdx: { edges },
    },
  } = props
  const { uri } = props
  return (
    <Layout location={uri}>
      <PostList posts={edges} />
    </Layout>
  )
}

export default Stories

export const query = graphql`
  query {
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
