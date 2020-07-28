import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

const PostTemplate = props => {
  const { pageContext, data } = props
  console.log(props)
  return (
    <Layout location="/stories">
      <div>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <p>{data.markdownRemark.frontmatter.meta_title}</p>
      </div>
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        date
        slug
        title
        meta_title
      }
      id
    }
  }
`
