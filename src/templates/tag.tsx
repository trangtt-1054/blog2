import React, { useContext, useEffect } from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import PostPageContainer from "../components/Stories"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const TagPageTemplate = (props: any) => {
  const dispatch = useContext(GlobalDispatchContext)
  useEffect(() => dispatch({ type: "SET_ACTIVE_TAB", payload: "tab-1" }), [])
  const {
    data: {
      allMdx: { edges },
    },
  } = props

  return (
    <Layout location="/stories">
      <PostPageContainer posts={edges} pathContext={props.pathContext.tag} />
    </Layout>
  )
}

export default TagPageTemplate

export const taggedPostsQuery = graphql`
  query($tag: String!) {
    allMdx(
      filter: { frontmatter: { tags: { eq: $tag } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            tags
            date(formatString: "MMMM DD, YY")
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
