import React from "react"
import Layout from "../components/Layout"
import PostList from "../components/Stories"
import { graphql } from "gatsby"

const Stories = props => {
  const {
    data: {
      allMdx: { edges },
    },
  } = props
  const { uri } = props
  return (
    <Layout location={uri}>
      {/* {edges.map(post => (
        <div>
          <Link to={`/stories/${post.node.frontmatter.slug}`}>
            <h2>{post.node.frontmatter.title}</h2>
          </Link>
          <p>
            <span>{post.node.frontmatter.date}</span>
            {post.node.frontmatter.meta_title}
          </p>
        </div>
      ))} */}
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
