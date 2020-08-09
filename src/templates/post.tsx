import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import TagList from "../components/TagList"

const PostTemplate = (props: any) => {
  const { data } = props
  return (
    <Layout location="/stories">
      <div>
        <h1>{data.mdx.frontmatter.title}</h1>
        <p>{data.mdx.frontmatter.meta_title}</p>
        <TagList tags={data.mdx.frontmatter.tags} />
        <div style={{ width: 300 }}>
          <Img
            fluid={data.mdx.frontmatter.featureImage.childImageSharp.fluid}
            alt={data.mdx.frontmatter.title}
          ></Img>
        </div>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date
        slug
        title
        tags
        meta_title
        featureImage {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      id
      body
    }
  }
`
