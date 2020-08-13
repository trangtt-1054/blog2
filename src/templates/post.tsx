import React, { useContext, useEffect, useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import TagList from "../components/TagList"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import styled from "styled-components"

const PostTemplate = (props: any) => {
  const headlineRef = useRef(null)
  const headlineHeight =
    headlineRef.current && headlineRef.current.clientHeight + 6
  console.log(headlineHeight)
  const featureImgOffset = headlineHeight / 2
  const dispatch = useContext(GlobalDispatchContext)
  useEffect(() => dispatch({ type: "SET_ACTIVE_TAB", payload: "tab-1" }), [])

  const {
    data: {
      mdx: { frontmatter, body },
    },
  } = props
  return (
    <Layout location="/stories">
      <PostPage>
        <Banner offset={featureImgOffset}>
          <Headline ref={headlineRef}>
            <h2>{frontmatter.title}</h2>
          </Headline>
          {/* <p>{frontmatter.meta_title}</p>
        <TagList tags={frontmatter.tags} /> */}
          <FeatureImage>
            <Img
              fluid={frontmatter.featureImage.childImageSharp.fluid}
              alt={frontmatter.title}
            ></Img>
          </FeatureImage>
        </Banner>
        <MDXRenderer>{body}</MDXRenderer>
      </PostPage>
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

const PostPage = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 0 13%;
`
const Banner = styled.div`
  display: grid;
  grid-template-rows: 54px 54px auto;
  grid-auto-columns: 50px auto 50px;
  margin-bottom: 30px;
`

const Headline = styled.div`
  grid-row: 1 / span 2;
  grid-column: 2 / 3;
  text-align: center;
  color: red;
  background: white;
  border-radius: 17px;
  width: fit-content;
  margin: auto;
  height: 108px;
  display: flex;
  align-items: center;
  vertical-align: middle;
  padding: 0 20px;
  border: 3px solid #33302b;
  z-index: 10;
  max-width: 500px;
  h2 {
    margin-bottom: 0;
  }
`

const FeatureImage = styled.div`
  width: 80%;
  top: 10px;
  border-radius: 10px;
  border: 3px solid #33302b;
  overflow: hidden;
  text-align: center;
  margin: auto;
  grid-column: 2 / 3;
  grid-row: 2 / span 2;

  img {
    z-index: 1;
  }
`
