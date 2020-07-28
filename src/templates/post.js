import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Img from "gatsby-image"

const PostTemplate = props => {
  const { data } = props
  return (
    <Layout location="/stories">
      <div>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <p>{data.markdownRemark.frontmatter.meta_title}</p>
        <div style={{ width: 500, height: "100%" }}>
          <Img
            fluid={
              data.markdownRemark.frontmatter.featureImage.childImageSharp.fluid
            }
            alt={data.markdownRemark.frontmatter.title}
          ></Img>
        </div>
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
        featureImage {
          childImageSharp {
            fluid(maxWidth: 2048) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      id
    }
  }
`
