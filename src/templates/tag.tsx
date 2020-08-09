import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import PostPageContainer from "../components/Stories"

const TagPageTemplate = (props: any) => {
  const {
    data: {
      allMdx: { edges },
    },
  } = props
  return (
    <Layout location="/stories">
      <PostPageContainer posts={edges} />
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
          }
          id
        }
      }
    }
  }
`
