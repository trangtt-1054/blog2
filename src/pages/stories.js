import React from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"

const Stories = props => {
  console.log(props)
  const {
    data: {
      allMarkdownRemark: { edges },
    },
  } = props
  const { uri } = props
  return (
    <Layout location={uri}>
      {edges.map(post => (
        <div>
          <Link to={`/stories/${post.node.frontmatter.slug}`}>
            <h2>{post.node.frontmatter.title}</h2>
          </Link>
          <p>
            <span>{post.node.frontmatter.date}</span>
            {post.node.frontmatter.meta_title}
          </p>
        </div>
      ))}
    </Layout>
  )
}

export default Stories

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            slug
            meta_title
          }
          id
        }
      }
    }
  }
`
