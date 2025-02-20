import React, { useContext, useEffect } from "react"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import Layout from "../components/Layout"
import PostPageContainer from "../components/Stories"

import { graphql } from "gatsby"

const Stories = (props: any) => {
  const dispatch = useContext(GlobalDispatchContext)
  useEffect(() => dispatch({ type: "SET_ACTIVE_TAB", payload: "tab-1" }), [])

  const {
    data: {
      allMdx: { edges },
    },
  } = props
  const { uri } = props
  return (
    <Layout location={uri}>
      <PostPageContainer posts={edges} />
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
            featureImage {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          id
        }
      }
    }
  }
`
